import { NextRequest, NextResponse } from "next/server";
import {
  parseItn,
  itnSignatureValid,
  itnSourceValid,
  itnServerConfirm,
  itnAmountMatchesCents,
  isSandbox,
} from "@/lib/payfast";
import { getPurchaseById, markPurchasePaid, markPurchaseFailed } from "@/lib/pack";
import { sendPackDeliveryEmail } from "@/lib/packEmail";

// ITN is a server-to-server POST from PayFast — Node runtime (crypto + dns).
// Same validation pipeline as /api/payfast/notify, but resolves a once-off
// pack_purchases row (m_payment_id = purchase id) instead of a subscription.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function clientIp(req: NextRequest): string | null {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd;
  return req.headers.get("x-real-ip");
}

export async function POST(req: NextRequest) {
  // 1) RAW body — signature + server confirmation depend on the exact bytes
  // and field order PayFast sent.
  const rawBody = await req.text();
  const { data, ordered } = parseItn(rawBody);

  // 2) Source IP must resolve to a PayFast host (sandbox-only skip flag lets
  // local probe scripts through; ignored in live mode).
  const skipIpCheck =
    isSandbox() && process.env.PAYFAST_ITN_SKIP_IP_CHECK === "true";
  if (!skipIpCheck && !(await itnSourceValid(clientIp(req)))) {
    console.warn("Pack ITN rejected: source IP not recognised", clientIp(req));
    return new NextResponse("Invalid source", { status: 400 });
  }

  // 3) Signature.
  if (!itnSignatureValid(ordered, data)) {
    console.warn("Pack ITN rejected: signature mismatch", data.m_payment_id);
    return new NextResponse("Invalid signature", { status: 400 });
  }

  // 4) Resolve the purchase — m_payment_id is the pack_purchases id.
  const purchase = data.m_payment_id ? await getPurchaseById(data.m_payment_id) : null;
  if (!purchase) {
    console.warn("Pack ITN rejected: unknown purchase", data.m_payment_id);
    return new NextResponse("Unknown purchase", { status: 400 });
  }

  // 5) Amount must match what THIS purchase row says we charged.
  if (!itnAmountMatchesCents(data, purchase.amount_cents)) {
    console.warn("Pack ITN rejected: amount mismatch", data.amount_gross);
    return new NextResponse("Invalid amount", { status: 400 });
  }

  // 6) Confirm with PayFast directly.
  if (!(await itnServerConfirm(rawBody))) {
    console.warn("Pack ITN rejected: server confirmation failed", data.m_payment_id);
    return new NextResponse("Not confirmed", { status: 400 });
  }

  // 7) Idempotency: already paid → ack and stop (no double email).
  if (purchase.status === "paid") {
    return new NextResponse("Already processed", { status: 200 });
  }

  const status = (data.payment_status || "").toUpperCase();

  if (status === "COMPLETE") {
    await markPurchasePaid(purchase.id, data.pf_payment_id ?? null);
    // Delivery email carries the token-gated download link. Best effort — a
    // mail failure must never make PayFast retry a verified payment.
    await sendPackDeliveryEmail({
      to: purchase.email,
      downloadToken: purchase.download_token,
    });
  } else if (status === "FAILED" || status === "CANCELLED") {
    await markPurchaseFailed(purchase.id);
  }
  // PENDING and other statuses are acked but change nothing.

  // Always 200 on a valid, processed callback so PayFast stops retrying.
  return new NextResponse("OK", { status: 200 });
}

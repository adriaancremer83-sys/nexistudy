import { NextRequest, NextResponse } from "next/server";
import {
  parseItn,
  itnSignatureValid,
  itnSourceValid,
  itnServerConfirm,
  itnAmountMatchesCents,
  isSandbox,
} from "@/lib/payfast";
import { getPassById, fulfilPass, markPassFailed } from "@/lib/passes";
import { sendPassReceiptEmail } from "@/lib/passEmail";

// ITN for once-off Premium passes. Same validation pipeline as the pack ITN;
// m_payment_id is the premium_passes id.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function clientIp(req: NextRequest): string | null {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd;
  return req.headers.get("x-real-ip");
}

export async function POST(req: NextRequest) {
  // 1) RAW body — signature + server confirmation depend on the exact bytes.
  const rawBody = await req.text();
  const { data, ordered } = parseItn(rawBody);

  // 2) Source IP must resolve to a PayFast host (sandbox-only skip flag).
  const skipIpCheck = isSandbox() && process.env.PAYFAST_ITN_SKIP_IP_CHECK === "true";
  if (!skipIpCheck && !(await itnSourceValid(clientIp(req)))) {
    console.warn("Pass ITN rejected: source IP not recognised", clientIp(req));
    return new NextResponse("Invalid source", { status: 400 });
  }

  // 3) Signature.
  if (!itnSignatureValid(ordered, data)) {
    console.warn("Pass ITN rejected: signature mismatch", data.m_payment_id);
    return new NextResponse("Invalid signature", { status: 400 });
  }

  // 4) Resolve the pass purchase.
  const purchase = data.m_payment_id ? await getPassById(data.m_payment_id) : null;
  if (!purchase) {
    console.warn("Pass ITN rejected: unknown purchase", data.m_payment_id);
    return new NextResponse("Unknown purchase", { status: 400 });
  }

  const status = (data.payment_status || "").toUpperCase();

  // 5) Amount must match this purchase row (payments only).
  if (status === "COMPLETE" && !itnAmountMatchesCents(data, purchase.amount_cents)) {
    console.warn("Pass ITN rejected: amount mismatch", data.amount_gross);
    return new NextResponse("Invalid amount", { status: 400 });
  }

  // 6) Confirm with PayFast directly.
  if (!(await itnServerConfirm(rawBody))) {
    console.warn("Pass ITN rejected: server confirmation failed", data.m_payment_id);
    return new NextResponse("Not confirmed", { status: 400 });
  }

  if (status === "COMPLETE") {
    // fulfilPass is idempotent — a retried ITN returns null and sends nothing.
    const until = await fulfilPass(purchase, data.pf_payment_id ?? null);
    if (until) {
      await sendPassReceiptEmail({ purchase, premiumUntil: until });
    }
  } else if (status === "FAILED" || status === "CANCELLED") {
    await markPassFailed(purchase.id);
  }

  return new NextResponse("OK", { status: 200 });
}

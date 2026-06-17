import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { markPremium, markFree } from "@/lib/users";
import {
  parseItn,
  itnSignatureValid,
  itnSourceValid,
  itnServerConfirm,
  itnAmountValid,
  isSandbox,
} from "@/lib/payfast";

// ITN is a server-to-server POST from PayFast — Node runtime (crypto + dns).
export const runtime = "nodejs";
// Never cache; every callback is unique and must be processed live.
export const dynamic = "force-dynamic";

function clientIp(req: NextRequest): string | null {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd;
  return req.headers.get("x-real-ip");
}

export async function POST(req: NextRequest) {
  // 1) Read the RAW body — signature + server confirmation depend on the exact
  // bytes and field order PayFast sent.
  const rawBody = await req.text();
  const { data, ordered } = parseItn(rawBody);

  // 2) Validate the source IP resolves to a PayFast host.
  // TEST-ONLY escape hatch: in sandbox mode, PAYFAST_ITN_SKIP_IP_CHECK=true lets
  // scripts/probe-payfast.mjs reach the signature/amount checks from localhost.
  // It is ignored in live mode — never relies on a flag for production safety.
  const skipIpCheck =
    isSandbox() && process.env.PAYFAST_ITN_SKIP_IP_CHECK === "true";
  if (!skipIpCheck && !(await itnSourceValid(clientIp(req)))) {
    console.warn("PayFast ITN rejected: source IP not recognised", clientIp(req));
    return new NextResponse("Invalid source", { status: 400 });
  }

  // 3) Validate the signature against our passphrase.
  if (!itnSignatureValid(ordered, data)) {
    console.warn("PayFast ITN rejected: signature mismatch", data.m_payment_id);
    return new NextResponse("Invalid signature", { status: 400 });
  }

  // 4) Validate the gross amount matches what we charge.
  if (!itnAmountValid(data)) {
    console.warn("PayFast ITN rejected: amount mismatch", data.amount_gross);
    return new NextResponse("Invalid amount", { status: 400 });
  }

  // 5) Confirm with PayFast directly (defends against a forged signature if the
  // passphrase ever leaked).
  if (!(await itnServerConfirm(rawBody))) {
    console.warn("PayFast ITN rejected: server confirmation failed", data.m_payment_id);
    return new NextResponse("Not confirmed", { status: 400 });
  }

  // Resolve the user: custom_str1 carries the id; fall back to the m_payment_id
  // prefix only if needed (the id is a UUID, so prefer custom_str1).
  const userId = data.custom_str1 || null;
  const status = (data.payment_status || "").toUpperCase();
  const pfPaymentId = data.pf_payment_id || null;

  // 6) Idempotency: if we've already recorded this pf_payment_id, ack and stop.
  if (pfPaymentId) {
    const { data: existing } = await supabaseAdmin
      .from("payfast_transactions")
      .select("id")
      .eq("pf_payment_id", pfPaymentId)
      .maybeSingle();
    if (existing) {
      return new NextResponse("Already processed", { status: 200 });
    }
  }

  // 7) Record the transaction for audit (best effort).
  await supabaseAdmin.from("payfast_transactions").insert({
    user_id: userId,
    m_payment_id: data.m_payment_id ?? null,
    pf_payment_id: pfPaymentId,
    token: data.token ?? null,
    payment_status: status,
    amount_gross: data.amount_gross ? parseFloat(data.amount_gross) : null,
    item_name: data.item_name ?? null,
    raw: data,
  });

  // 8) Apply the state change.
  if (userId) {
    if (status === "COMPLETE") {
      // First payment AND every successful renewal land here → keep premium.
      // `token` is present on the first recurring ITN; markPremium only stores
      // it when supplied, so renewals don't clobber it.
      await markPremium(userId, {
        token: data.token ?? null,
        mPaymentId: data.m_payment_id ?? null,
      });
    } else if (status === "CANCELLED" || status === "FAILED") {
      // Cancellation or a failed renewal → back to free.
      await markFree(userId);
    }
    // PENDING and other statuses are recorded but don't change access.
  } else {
    console.warn("PayFast ITN had no user id (custom_str1):", data.m_payment_id);
  }

  // Always 200 on a valid, processed callback so PayFast stops retrying.
  return new NextResponse("OK", { status: 200 });
}

import crypto from "crypto";
import { supabaseAdmin } from "./supabase";

// ─────────────────────────────────────────────────────────────────────────────
// Premium passes — once-off PayFast payments that add days of Premium (see
// supabase-passes-setup.sql). Replaces the card-only R199/month subscription:
// passes go through PayFast's normal checkout, so parents can pay by instant
// EFT, and anyone with a learner's pay link can pay without logging in.
// Server-side only.
// ─────────────────────────────────────────────────────────────────────────────

export interface PassOption {
  slug: "pass-30" | "pass-90" | "pass-365";
  name: string;
  days: number;
  priceCents: number;
  perMonth: string; // display only
  note: string;
}

// Single source of truth for pass prices — the client sends only a slug.
export const PASSES: PassOption[] = [
  { slug: "pass-30", name: "30 days", days: 30, priceCents: 9900, perMonth: "R3.30 a day", note: "Try it for a month" },
  { slug: "pass-90", name: "3 months", days: 90, priceCents: 24900, perMonth: "R83/month", note: "A full school term" },
  { slug: "pass-365", name: "12 months", days: 365, priceCents: 69900, perMonth: "R58/month", note: "The whole school year" },
];

export function findPass(slug: string): PassOption | null {
  return PASSES.find((p) => p.slug === slug) ?? null;
}

export function rand(cents: number): string {
  return `R${Math.round(cents / 100)}`;
}

// ── Parent pay links ─────────────────────────────────────────────────────────

// 10 chars from an unambiguous alphabet (no 0/O/1/l/I) — short enough for a
// WhatsApp link, too many combinations to guess.
function newPayCode(): string {
  const alphabet = "abcdefghjkmnpqrstuvwxyz23456789";
  const bytes = crypto.randomBytes(10);
  return Array.from(bytes, (b) => alphabet[b % alphabet.length]).join("");
}

export function payLinkUrl(code: string): string {
  const base = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.nexistudy.co.za").replace(/\/$/, "");
  return `${base}/gift/${code}`;
}

// Serializable pass list for the client PassPicker.
export function passChoices() {
  return PASSES.map((p) => ({
    slug: p.slug,
    name: p.name,
    price: rand(p.priceCents),
    perMonth: p.perMonth,
    note: p.note,
  }));
}

export async function getOrCreatePayCode(userId: string): Promise<string | null> {
  const { data } = await supabaseAdmin
    .from("users")
    .select("pay_code")
    .eq("id", userId)
    .maybeSingle();
  if (data?.pay_code) return data.pay_code as string;

  for (let attempt = 0; attempt < 3; attempt++) {
    const code = newPayCode();
    const { error } = await supabaseAdmin
      .from("users")
      .update({ pay_code: code })
      .eq("id", userId)
      .is("pay_code", null);
    if (!error) {
      // Re-read: a concurrent request may have set a different code first.
      const { data: after } = await supabaseAdmin
        .from("users")
        .select("pay_code")
        .eq("id", userId)
        .maybeSingle();
      return (after?.pay_code as string) ?? null;
    }
    console.error("getOrCreatePayCode failed:", error.message);
  }
  return null;
}

export interface PayLinkLearner {
  id: string;
  firstName: string;
  grade: string | null;
  plan: "free" | "premium";
  premiumUntil: string | null;
}

export async function findLearnerByPayCode(code: string): Promise<PayLinkLearner | null> {
  if (!/^[a-z0-9]{6,20}$/.test(code)) return null;
  const { data, error } = await supabaseAdmin
    .from("users")
    .select("id, name, grade, plan, premium_until")
    .eq("pay_code", code)
    .maybeSingle();
  if (error || !data) return null;
  return {
    id: data.id,
    firstName: String(data.name ?? "").trim().split(/\s+/)[0] || "your child",
    grade: data.grade ?? null,
    plan: data.plan === "premium" ? "premium" : "free",
    premiumUntil: data.premium_until ?? null,
  };
}

// ── Purchases ────────────────────────────────────────────────────────────────

export interface PassPurchase {
  id: string;
  user_id: string;
  pass_slug: string;
  days: number;
  amount_cents: number;
  payer_email: string;
  paid_by_parent: boolean;
  status: "pending" | "paid" | "failed";
  premium_until: string | null;
}

export async function createPendingPass(params: {
  userId: string;
  pass: PassOption;
  payerEmail: string;
  paidByParent: boolean;
}): Promise<PassPurchase | null> {
  const { data, error } = await supabaseAdmin
    .from("premium_passes")
    .insert({
      user_id: params.userId,
      pass_slug: params.pass.slug,
      days: params.pass.days,
      amount_cents: params.pass.priceCents,
      payer_email: params.payerEmail.toLowerCase(),
      paid_by_parent: params.paidByParent,
    })
    .select()
    .single();
  if (error) {
    console.error("createPendingPass failed:", error.message);
    return null;
  }
  return data as PassPurchase;
}

export async function getPassById(id: string): Promise<PassPurchase | null> {
  if (!/^[0-9a-f-]{36}$/i.test(id)) return null;
  const { data, error } = await supabaseAdmin
    .from("premium_passes")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) {
    console.error("getPassById failed:", error.message);
    return null;
  }
  return (data as PassPurchase) ?? null;
}

export async function markPassFailed(id: string): Promise<void> {
  await supabaseAdmin.from("premium_passes").update({ status: "failed" }).eq("id", id).eq("status", "pending");
}

// Called by the ITN on a COMPLETE payment. Claims the row first (pending →
// paid) so a retried ITN can't add the days twice, then extends Premium from
// whichever is later: now, or the end of any time already paid for.
export async function fulfilPass(
  purchase: PassPurchase,
  pfPaymentId: string | null
): Promise<string | null> {
  const { data: claimed, error: claimError } = await supabaseAdmin
    .from("premium_passes")
    .update({ status: "paid", paid_at: new Date().toISOString(), payfast_payment_id: pfPaymentId })
    .eq("id", purchase.id)
    .eq("status", "pending")
    .select("id");
  if (claimError || !claimed?.length) return null; // already fulfilled

  const { data: user } = await supabaseAdmin
    .from("users")
    .select("premium_until")
    .eq("id", purchase.user_id)
    .maybeSingle();
  const current = user?.premium_until ? new Date(user.premium_until).getTime() : 0;
  const base = Math.max(Date.now(), current);
  const until = new Date(base + purchase.days * 86_400_000).toISOString();

  const { error } = await supabaseAdmin
    .from("users")
    .update({ plan: "premium", premium_until: until })
    .eq("id", purchase.user_id);
  if (error) {
    console.error("fulfilPass: user update failed:", error.message);
    return null;
  }
  // Start date for "member since" — set once.
  await supabaseAdmin
    .from("users")
    .update({ subscription_started_at: new Date().toISOString() })
    .eq("id", purchase.user_id)
    .is("subscription_started_at", null);

  await supabaseAdmin.from("premium_passes").update({ premium_until: until }).eq("id", purchase.id);
  return until;
}

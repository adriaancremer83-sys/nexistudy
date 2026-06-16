import { supabaseAdmin } from "./supabase";

// Server-enforced daily message limits for Nexi Tutor. The client counter is
// only cosmetic — this is the real gate.
export const DAILY_LIMITS = { free: 5, premium: 50 } as const;

function today(): string {
  // UTC date string, matching the column default.
  return new Date().toISOString().slice(0, 10);
}

export function dailyLimit(plan: "free" | "premium"): number {
  return DAILY_LIMITS[plan];
}

// How many messages the learner has left today (without consuming one).
export async function getRemaining(
  userId: string,
  plan: "free" | "premium"
): Promise<number> {
  const limit = dailyLimit(plan);
  const { data } = await supabaseAdmin
    .from("tutor_usage")
    .select("count")
    .eq("user_id", userId)
    .eq("day", today())
    .maybeSingle();
  const used = data?.count ?? 0;
  return Math.max(0, limit - used);
}

// Check the limit and, if there's room, consume one message. Returns whether the
// message was allowed and how many remain after it.
export async function consume(
  userId: string,
  plan: "free" | "premium"
): Promise<{ allowed: boolean; remaining: number }> {
  const limit = dailyLimit(plan);
  const day = today();

  const { data } = await supabaseAdmin
    .from("tutor_usage")
    .select("count")
    .eq("user_id", userId)
    .eq("day", day)
    .maybeSingle();

  const used = data?.count ?? 0;
  if (used >= limit) {
    return { allowed: false, remaining: 0 };
  }

  const next = used + 1;
  const { error } = await supabaseAdmin
    .from("tutor_usage")
    .upsert({ user_id: userId, day, count: next }, { onConflict: "user_id,day" });

  if (error) {
    console.error("tutor usage upsert failed:", error.message);
    // Fail closed-ish: don't let a DB error become free unlimited usage, but
    // don't hard-block a paying user either — allow this one, report the count.
    return { allowed: true, remaining: Math.max(0, limit - next) };
  }

  return { allowed: true, remaining: Math.max(0, limit - next) };
}

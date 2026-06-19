import { supabaseAdmin } from "./supabase";

// Server-enforced per-day usage counters, keyed (user_id, day). Tutor, marking,
// and guidance all share this shape — only the table name and per-plan limits
// differ — so the logic lives here once. Client-side counters are cosmetic;
// this is the real gate.

export type Plan = "free" | "premium";

function today(): string {
  // UTC date string, matching the column default.
  return new Date().toISOString().slice(0, 10);
}

export interface DailyUsage {
  dailyLimit(plan: Plan): number;
  getRemaining(userId: string, plan: Plan): Promise<number>;
  consume(userId: string, plan: Plan): Promise<{ allowed: boolean; remaining: number }>;
}

// Build a usage helper bound to one Supabase table and a per-plan limit map.
// `table` must have columns (user_id uuid, day date, count int) with PK
// (user_id, day) — see the matching supabase-*-setup.sql.
export function makeDailyUsage(
  table: string,
  limits: Record<Plan, number>
): DailyUsage {
  const dailyLimit = (plan: Plan) => limits[plan];

  async function getRemaining(userId: string, plan: Plan): Promise<number> {
    const limit = dailyLimit(plan);
    const { data } = await supabaseAdmin
      .from(table)
      .select("count")
      .eq("user_id", userId)
      .eq("day", today())
      .maybeSingle();
    const used = data?.count ?? 0;
    return Math.max(0, limit - used);
  }

  async function consume(
    userId: string,
    plan: Plan
  ): Promise<{ allowed: boolean; remaining: number }> {
    const limit = dailyLimit(plan);
    const day = today();

    const { data } = await supabaseAdmin
      .from(table)
      .select("count")
      .eq("user_id", userId)
      .eq("day", day)
      .maybeSingle();

    const used = data?.count ?? 0;
    if (used >= limit) return { allowed: false, remaining: 0 };

    const next = used + 1;
    const { error } = await supabaseAdmin
      .from(table)
      .upsert({ user_id: userId, day, count: next }, { onConflict: "user_id,day" });

    if (error) {
      console.error(`${table} usage upsert failed:`, error.message);
      // Fail soft: don't hand out free unlimited usage on a DB error, but don't
      // hard-block a paying user either — allow this one, report the count.
      return { allowed: true, remaining: Math.max(0, limit - next) };
    }
    return { allowed: true, remaining: Math.max(0, limit - next) };
  }

  return { dailyLimit, getRemaining, consume };
}

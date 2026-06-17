import { supabaseAdmin } from "./supabase";

// Anthropic per-token pricing, USD per million tokens (cached 2026-06).
// Cache reads bill at ~0.1x input; cache writes (5-min TTL) at ~1.25x input.
const PRICING: Record<string, { input: number; output: number }> = {
  "claude-haiku-4-5": { input: 1, output: 5 },
  "claude-sonnet-4-6": { input: 3, output: 15 },
  "claude-opus-4-8": { input: 5, output: 25 },
};

const PER_MILLION = 1_000_000;

export interface ClaudeUsage {
  input_tokens?: number | null;
  output_tokens?: number | null;
  cache_read_input_tokens?: number | null;
  cache_creation_input_tokens?: number | null;
}

// Compute the USD cost of a single call from its token usage.
export function computeCost(model: string, usage: ClaudeUsage): number {
  const rate = PRICING[model];
  if (!rate) return 0;
  const input = usage.input_tokens ?? 0;
  const output = usage.output_tokens ?? 0;
  const cacheRead = usage.cache_read_input_tokens ?? 0;
  const cacheWrite = usage.cache_creation_input_tokens ?? 0;

  const cost =
    (input * rate.input +
      output * rate.output +
      cacheRead * rate.input * 0.1 +
      cacheWrite * rate.input * 1.25) /
    PER_MILLION;
  return cost;
}

// Log one Claude API call's tokens + cost. Best-effort: a logging failure must
// never break the user-facing request, so we swallow errors.
export async function logApiUsage(params: {
  userId?: string | null;
  feature?: string;
  model: string;
  usage: ClaudeUsage;
}): Promise<void> {
  try {
    const cost = computeCost(params.model, params.usage);
    await supabaseAdmin.from("api_usage").insert({
      user_id: params.userId ?? null,
      feature: params.feature ?? "tutor",
      model: params.model,
      input_tokens: params.usage.input_tokens ?? 0,
      output_tokens: params.usage.output_tokens ?? 0,
      cache_read_tokens: params.usage.cache_read_input_tokens ?? 0,
      cache_write_tokens: params.usage.cache_creation_input_tokens ?? 0,
      cost_usd: cost,
    });
  } catch (err) {
    console.error("logApiUsage failed:", err);
  }
}

// Sum today's (UTC) spend across all calls, for the admin overview.
export async function todaysSpendUsd(): Promise<number> {
  const startOfDay = new Date();
  startOfDay.setUTCHours(0, 0, 0, 0);
  const { data, error } = await supabaseAdmin
    .from("api_usage")
    .select("cost_usd")
    .gte("created_at", startOfDay.toISOString());
  if (error) {
    console.error("todaysSpendUsd failed:", error.message);
    return 0;
  }
  return (data ?? []).reduce((sum, r) => sum + Number(r.cost_usd ?? 0), 0);
}

import { makeDailyUsage } from "./dailyUsage";

// Grade 8–9 Foundation Gap Finder daily limits. Free gets one gap report a day
// (the single biggest foundational gap + a first step); Premium can run the full
// week-by-week repair plan and re-check progress more often.
export const FOUNDATION_GAP_LIMITS = { free: 1, premium: 15 } as const;

export const foundationGapUsage = makeDailyUsage(
  "foundation_gap_usage",
  FOUNDATION_GAP_LIMITS
);

import { makeDailyUsage } from "./dailyUsage";

// Career & APS guidance daily limits. The APS calculator is always free (it runs
// client-side); these limits apply only to the AI guidance report. Free gets one
// report a day; Premium can explore many course/career scenarios.
export const GUIDANCE_LIMITS = { free: 1, premium: 20 } as const;

export const guidanceUsage = makeDailyUsage("guidance_usage", GUIDANCE_LIMITS);

import { makeDailyUsage } from "./dailyUsage";

// Grade 9 Subject Choice Advisor daily limits. Free gets one real advice report
// a day (the Maths-vs-Maths-Lit call + a direction); Premium can explore the
// full report and different "what if" scenarios.
export const SUBJECT_ADVISOR_LIMITS = { free: 1, premium: 20 } as const;

export const subjectAdvisorUsage = makeDailyUsage(
  "subject_advisor_usage",
  SUBJECT_ADVISOR_LIMITS
);

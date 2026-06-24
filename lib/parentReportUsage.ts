import { makeDailyUsage } from "./dailyUsage";

// Termly Parent Report daily limits. Free gets one report a day (a short
// this-term snapshot); Premium can regenerate the full plain-language report
// (e.g. before a parents' evening, or to track progress through the term).
export const PARENT_REPORT_LIMITS = { free: 1, premium: 10 } as const;

export const parentReportUsage = makeDailyUsage(
  "parent_report_usage",
  PARENT_REPORT_LIMITS
);

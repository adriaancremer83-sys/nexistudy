import { makeDailyUsage } from "./dailyUsage";

// "Mark My Answer" daily limits. Free gets a real taste (one marking a day);
// Premium gets enough for a full study session's worth of past-paper answers.
export const MARKING_LIMITS = { free: 1, premium: 15 } as const;

export const markingUsage = makeDailyUsage("marking_usage", MARKING_LIMITS);

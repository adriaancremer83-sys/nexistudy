"use client";

import { useEffect, useState } from "react";

// 2026 Grade 12 CAPS preliminary exams ("prelims"). Prelims are set per
// province/school, NOT nationally — this targets the Gauteng prelim start
// (29 Aug 2026), since NexiStudy is CAPS/Gauteng-focused for now. Change this
// single date to track another province or year.
const PRELIMS = new Date("2026-08-29T00:00:00+02:00");

function daysUntil(target: Date): number {
  const ms = target.getTime() - Date.now();
  return Math.max(0, Math.ceil(ms / 86_400_000));
}

// A small, self-contained "days to Prelims" widget.
//  - variant="card"   slim card for the dashboard
//  - variant="inline" pill for inline use (e.g. the homepage hero)
// Computes the day count on the client after mount so a statically-rendered
// page never ships a stale number, and there's no hydration mismatch.
export default function ExamCountdown({
  variant = "card",
  className = "",
}: {
  variant?: "card" | "inline";
  className?: string;
}) {
  const [days, setDays] = useState<number | null>(null);
  useEffect(() => {
    setDays(daysUntil(PRELIMS));
  }, []);

  if (days === null) return null;

  const here = days === 0;

  if (variant === "inline") {
    return (
      <p
        className={`inline-flex items-center gap-2 rounded-full border border-[#FFB454]/30 bg-[#FFB454]/[0.08] px-4 py-1.5 text-sm font-semibold text-[#FFB454] ${className}`}
      >
        {here ? (
          "Prelims are here — go get them 🍀"
        ) : (
          <>
            <span className="font-extrabold">{days}</span> days to Prelims
          </>
        )}
      </p>
    );
  }

  return (
    <div
      className={`rounded-2xl border border-[#FFB454]/25 bg-[#FFB454]/[0.06] px-6 py-4 flex items-center justify-between gap-4 ${className}`}
    >
      {here ? (
        <p className="text-sm font-bold text-[#FFB454]">
          Prelims are here — go get them 🍀
        </p>
      ) : (
        <div className="flex items-baseline gap-2.5">
          <span className="text-3xl font-extrabold text-[#FFB454] leading-none">{days}</span>
          <span className="text-sm font-semibold text-white/80">days to Prelims</span>
        </div>
      )}
      <span className="text-[11px] text-white/40 hidden sm:block">29 Aug 2026 · Gauteng prelims</span>
    </div>
  );
}

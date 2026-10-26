"use client";

import { useEffect, useState } from "react";

// 2026 NSC (Matric) final exams, per the DBE Oct/Nov 2026 timetable: first
// written paper Tue 13 Oct (CAT P1 practical), last papers Thu 26 Nov.
// Provinces differ by a day or so at the end — 26 Nov is the national last day.
// Update these two dates when the 2027 timetable is published.
const FINALS_START = new Date("2026-10-13T00:00:00+02:00");
const FINALS_END = new Date("2026-11-27T00:00:00+02:00"); // end of 26 Nov

function daysUntil(target: Date): number {
  const ms = target.getTime() - Date.now();
  return Math.max(0, Math.ceil(ms / 86_400_000));
}

type Phase =
  | { kind: "before"; days: number }
  | { kind: "during"; days: number }
  | { kind: "done" };

function currentPhase(): Phase {
  if (Date.now() < FINALS_START.getTime()) return { kind: "before", days: daysUntil(FINALS_START) };
  if (Date.now() < FINALS_END.getTime()) return { kind: "during", days: daysUntil(FINALS_END) };
  return { kind: "done" };
}

// A small, self-contained Matric finals widget: counts down to the first
// paper, then the days of finals left, then a well-done message.
//  - variant="card"   slim card for the dashboard
//  - variant="inline" pill for inline use (e.g. the homepage hero)
// Computes the phase on the client after mount so a statically-rendered page
// never ships a stale number, and there's no hydration mismatch.
export default function ExamCountdown({
  variant = "card",
  className = "",
}: {
  variant?: "card" | "inline";
  className?: string;
}) {
  const [phase, setPhase] = useState<Phase | null>(null);
  useEffect(() => {
    setPhase(currentPhase());
  }, []);

  if (phase === null) return null;

  const doneText = "Matric finals are done — well done, class of 2026 🎓";
  const label =
    phase.kind === "before"
      ? phase.days === 1 ? "day to Matric finals" : "days to Matric finals"
      : phase.kind === "during"
        ? phase.days === 1 ? "day of Matric finals left" : "days of Matric finals left"
        : "";

  if (variant === "inline") {
    return (
      <p
        className={`inline-flex items-center gap-2 rounded-full border border-[#FFB454]/30 bg-[#FFB454]/[0.08] px-4 py-1.5 text-sm font-semibold text-[#FFB454] ${className}`}
      >
        {phase.kind === "done" ? (
          doneText
        ) : (
          <>
            {phase.kind === "during" && <span>Finals are on ·</span>}
            <span className="font-extrabold">{phase.days}</span> {label}
          </>
        )}
      </p>
    );
  }

  return (
    <div
      className={`rounded-2xl border border-[#FFB454]/25 bg-[#FFB454]/[0.06] px-6 py-4 flex items-center justify-between gap-4 ${className}`}
    >
      {phase.kind === "done" ? (
        <p className="text-sm font-bold text-[#FFB454]">{doneText}</p>
      ) : (
        <div className="flex items-baseline gap-2.5">
          <span className="text-3xl font-extrabold text-[#FFB454] leading-none">{phase.days}</span>
          <span className="text-sm font-semibold text-white/80">{label}</span>
        </div>
      )}
      <span className="text-[11px] text-white/40 hidden sm:block">13 Oct – 26 Nov 2026 · NSC finals</span>
    </div>
  );
}

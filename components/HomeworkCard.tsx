"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { IconDocumentText, IconClock, IconCheck, IconArrowRight } from "@/components/icons";

interface LearnerHomework {
  id: string;
  title: string;
  className: string;
  subject: string;
  numQuestions: number;
  dueDate: string | null;
  done: boolean;
  scorePct: number | null;
}

function formatDue(iso: string): string {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-ZA", { day: "numeric", month: "short" });
}

function isOverdue(iso: string): boolean {
  const due = new Date(iso + "T23:59:59");
  return due.getTime() < Date.now();
}

// Highlighted on the learner dashboard: homework their teacher has set. Pending
// items sit on top with a clear Start button; completed items show their score.
// Renders nothing until there's at least one homework, so it never adds clutter.
export default function HomeworkCard() {
  const [homework, setHomework] = useState<LearnerHomework[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const res = await fetch("/api/homework");
        const data = await res.json();
        if (active && res.ok) setHomework(data.homework ?? []);
      } catch {
        /* silent — the card just won't render */
      } finally {
        if (active) setLoaded(true);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  if (!loaded || homework.length === 0) return null;

  // Pending first, then completed.
  const ordered = [...homework].sort((a, b) => Number(a.done) - Number(b.done));
  const pendingCount = homework.filter((h) => !h.done).length;

  return (
    <div className="rounded-2xl border border-[#FFB454]/30 bg-[#FFB454]/[0.05] overflow-hidden">
      <div className="px-6 py-4 border-b border-[#FFB454]/20 bg-[#FFB454]/[0.06] flex items-center gap-2.5 text-[#FFB454]">
        <IconDocumentText className="w-4 h-4" />
        <h2 className="text-xs font-semibold text-white uppercase tracking-widest">
          Homework from your teacher
        </h2>
        {pendingCount > 0 && (
          <span className="ml-auto text-[10px] font-extrabold uppercase tracking-widest text-[#050D1A] bg-[#FFB454] rounded-full px-2.5 py-0.5">
            {pendingCount} to do
          </span>
        )}
      </div>
      <ul className="divide-y divide-white/[0.06]">
        {ordered.map((hw) => (
          <li key={hw.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-6 py-4">
            <div className="min-w-0">
              <p className="text-white font-semibold text-sm truncate">{hw.title}</p>
              <p className="text-white/45 text-xs mt-0.5">
                {hw.className} · {hw.numQuestions} questions
                {hw.dueDate && (
                  <>
                    {" · "}
                    <span className={`inline-flex items-center gap-1 align-middle ${!hw.done && isOverdue(hw.dueDate) ? "text-red-300" : "text-white/60"}`}>
                      <IconClock className="w-3.5 h-3.5" />
                      Due {formatDue(hw.dueDate)}
                    </span>
                  </>
                )}
              </p>
            </div>
            {hw.done ? (
              <span className="self-start sm:self-auto flex-shrink-0 inline-flex items-center gap-1.5 text-emerald-300 text-xs font-bold">
                <IconCheck className="w-4 h-4" />
                Completed{hw.scorePct !== null ? ` · ${hw.scorePct}%` : ""}
              </span>
            ) : (
              <Link
                href={`/homework/${hw.id}`}
                className="self-start sm:self-auto flex-shrink-0 inline-flex items-center gap-1.5 px-4 py-2 bg-[#FFB454] hover:bg-[#FFC678] text-[#050D1A] text-sm font-extrabold rounded-xl transition-colors"
              >
                Start <IconArrowRight className="w-4 h-4" />
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

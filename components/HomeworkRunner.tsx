"use client";

import { useState } from "react";
import Link from "next/link";
import Nexi from "@/components/Nexi";
import { IconCheck, IconTarget } from "@/components/icons";

interface HomeworkQuestion {
  id: string;
  prompt: string;
  options: string[];
}

interface MarkedQuestion {
  id: string;
  prompt: string;
  options: string[];
  correctIndex: number;
  chosenIndex: number | null;
  correct: boolean;
  explanation: string;
}

interface HomeworkResult {
  title: string;
  total: number;
  correct: number;
  results: MarkedQuestion[];
}

interface Props {
  homeworkId: string;
  title: string;
  questions: HomeworkQuestion[];
  initialResult: HomeworkResult | null; // set when the learner already completed it
}

export default function HomeworkRunner({ homeworkId, title, questions, initialResult }: Props) {
  const [view, setView] = useState<"quiz" | "results">(initialResult ? "results" : "quiz");
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [result, setResult] = useState<HomeworkResult | null>(initialResult);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(finalAnswers: Record<string, number>) {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/homework/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ homeworkId, answers: finalAnswers }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Could not submit your homework.");
        return;
      }
      setResult(data);
      setView("results");
    } catch {
      setError("Connection problem — your answers weren't lost, try submitting again.");
    } finally {
      setLoading(false);
    }
  }

  function choose(questionId: string, optionIndex: number) {
    const next = { ...answers, [questionId]: optionIndex };
    setAnswers(next);
    if (current < questions.length - 1) {
      setCurrent(current + 1);
    } else {
      void submit(next);
    }
  }

  /* ── QUIZ ── */
  if (view === "quiz") {
    const q = questions[current];
    if (!q) return null;
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[#FFB454] text-xs font-bold uppercase tracking-widest mb-1">{title}</p>
            <p className="text-white/40 text-sm">
              Question {current + 1} of {questions.length}
            </p>
          </div>
          <Link href="/dashboard" className="text-white/40 hover:text-white text-sm transition-colors">
            Quit
          </Link>
        </div>

        <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
          <div
            className="h-full rounded-full bg-[#FFB454] transition-[width] duration-300"
            style={{ width: `${(current / questions.length) * 100}%` }}
          />
        </div>

        <div className="glass rounded-2xl p-7">
          <p className="text-white text-lg font-semibold leading-relaxed mb-6">{q.prompt}</p>
          <div className="space-y-3">
            {q.options.map((option, i) => (
              <button
                key={i}
                onClick={() => !loading && choose(q.id, i)}
                disabled={loading}
                className="w-full text-left px-5 py-3.5 rounded-xl border border-white/10 bg-white/[0.03] text-white/80 text-sm hover:border-[#FFB454]/50 hover:bg-[#FFB454]/10 hover:text-white transition-colors disabled:opacity-50"
              >
                <span className="text-[#FFB454] font-bold mr-3">{String.fromCharCode(65 + i)}</span>
                {option}
              </button>
            ))}
          </div>
        </div>

        {loading && (
          <div className="flex flex-col items-center gap-2">
            <Nexi
              pose="thinking"
              width={90}
              height={90}
              className="animate-float h-20 w-auto object-contain"
            />
            <p className="text-white/40 text-sm text-center">Marking your homework…</p>
          </div>
        )}
        {error && (
          <div className="bg-amber-400/10 border border-amber-400/25 rounded-xl px-4 py-3 text-sm text-amber-300">
            {error}
          </div>
        )}
      </div>
    );
  }

  /* ── RESULTS ── */
  if (view === "results" && result) {
    const pct = result.total > 0 ? Math.round((result.correct / result.total) * 100) : 0;
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="glass rounded-2xl p-8 text-center">
          <Nexi
            pose={pct >= 60 ? "celebrate" : "thinking"}
            width={120}
            height={120}
            className="animate-pop mx-auto mb-3 h-28 w-auto object-contain"
          />
          <p className="text-[#FFB454] text-xs font-bold uppercase tracking-widest mb-2">{result.title}</p>
          <p className="text-5xl font-extrabold text-white mb-1">
            {result.correct}/{result.total}
          </p>
          <p className="text-white/70 text-sm font-medium mb-1">
            {pct >= 80
              ? "Outstanding! Your teacher will see this 🎉"
              : pct >= 60
                ? "Nice work — you're getting there!"
                : "Review these and ask Nexi anything you're stuck on."}
          </p>
          <p className="text-white/50 text-sm">{pct}% correct · handed in to your teacher</p>
        </div>

        <div className="space-y-4">
          {result.results.map((r, idx) => (
            <div
              key={r.id}
              className={`rounded-2xl border p-6 ${
                r.correct
                  ? "border-emerald-400/25 bg-emerald-400/[0.04]"
                  : "border-red-400/25 bg-red-400/[0.04]"
              }`}
            >
              <p className="text-white/40 text-xs font-semibold uppercase tracking-widest mb-2">
                Question {idx + 1} · {r.correct ? "Correct" : "Wrong"}
              </p>
              <p className="text-white font-semibold text-sm leading-relaxed mb-3">{r.prompt}</p>
              {!r.correct && r.chosenIndex !== null && (
                <p className="text-red-300/80 text-sm mb-1">
                  Your answer: {String.fromCharCode(65 + r.chosenIndex)} — {r.options[r.chosenIndex]}
                </p>
              )}
              {!r.correct && r.chosenIndex === null && (
                <p className="text-red-300/80 text-sm mb-1">You left this one blank.</p>
              )}
              <p className="text-emerald-300/90 text-sm mb-3 flex items-start gap-1.5">
                <IconCheck className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>
                  {String.fromCharCode(65 + r.correctIndex)} — {r.options[r.correctIndex]}
                </span>
              </p>
              <p className="text-white/50 text-sm leading-relaxed border-t border-white/10 pt-3">
                {r.explanation}
              </p>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/dashboard"
            className="flex-1 px-5 py-3 bg-[#FFB454] hover:bg-[#FFC678] text-[#050D1A] text-sm font-extrabold rounded-xl transition-colors text-center"
          >
            Back to dashboard
          </Link>
          <Link
            href="/practice"
            className="flex-1 px-5 py-3 glass hover:bg-white/10 text-white text-sm font-bold rounded-xl transition-colors text-center"
          >
            Practise more
          </Link>
        </div>
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm mx-auto">
          <IconTarget className="w-4 h-4 text-[#FFB454]" />
          <span className="text-white/70">Your teacher can see which questions the class found hardest.</span>
        </div>
      </div>
    );
  }

  return null;
}

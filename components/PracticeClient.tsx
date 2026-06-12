"use client";

import { useState } from "react";
import Link from "next/link";
import { IconCheck, IconLock, IconTarget, IconArrowRight, IconChevronDown } from "@/components/icons";

interface Topic {
  id: string;
  subject: string;
  name: string;
  attempts: number;
  mastery: number | null;
}

interface QuizQuestion {
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

interface QuizResult {
  total: number;
  correct: number;
  mastery: number;
  results: MarkedQuestion[];
}

interface Props {
  topics: Topic[];
  plan: "free" | "premium";
  quizzesLeft: number | null; // null = unlimited (premium)
}

function masteryColour(mastery: number): string {
  if (mastery < 50) return "bg-red-400";
  if (mastery < 75) return "bg-amber-300";
  return "bg-emerald-400";
}

export default function PracticeClient({ topics, plan, quizzesLeft }: Props) {
  const [view, setView] = useState<"list" | "quiz" | "results">("list");
  const [activeTopic, setActiveTopic] = useState<Topic | null>(null);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [result, setResult] = useState<QuizResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [left, setLeft] = useState(quizzesLeft);
  // Subjects collapse into accordions so the list never dumps every topic at
  // once. Topics arrive ordered by subject, so topics[0] is the first subject —
  // open it by default so the page always shows something to start on.
  const [openSubject, setOpenSubject] = useState<string | null>(
    topics.length > 0 ? topics[0].subject : null
  );

  async function startQuiz(topic: Topic) {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/practice/quiz?topic=${topic.id}`);
      const data = await res.json();
      if (!res.ok) {
        setError(data.message ?? data.error ?? "Could not load the quiz.");
        return;
      }
      setActiveTopic(topic);
      setQuestions(data.questions);
      setCurrent(0);
      setAnswers({});
      setResult(null);
      setView("quiz");
    } catch {
      setError("Connection problem — please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function submit(finalAnswers: Record<string, number>) {
    if (!activeTopic) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/practice/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topicId: activeTopic.id, answers: finalAnswers }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message ?? data.error ?? "Could not mark the quiz.");
        return;
      }
      setResult(data);
      if (left !== null) setLeft(Math.max(0, left - 1));
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

  /* ── TOPIC LIST ── */
  if (view === "list") {
    return (
      <div className="space-y-6">
        {plan === "free" && (
          <div className="glass rounded-2xl px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <p className="text-sm text-white/60">
              {left === 0 ? (
                <>You&apos;ve used your <span className="text-white font-semibold">2 free quizzes</span> for today — back tomorrow, or go unlimited.</>
              ) : (
                <><span className="text-white font-semibold">{left} of 2</span> free quizzes left today. Premium learners practise without limits.</>
              )}
            </p>
            <Link
              href="/pricing"
              className="flex-shrink-0 px-4 py-2 text-sm font-bold text-white bg-[#2D6BE4] hover:bg-[#4A82F0] rounded-full transition-colors"
            >
              Go Premium →
            </Link>
          </div>
        )}

        {error && (
          <div className="bg-amber-400/10 border border-amber-400/25 rounded-xl px-4 py-3 text-sm text-amber-300">
            {error}
          </div>
        )}

        <div className="space-y-3">
          {[...new Set(topics.map((t) => t.subject))].map((subject) => {
            const subjectTopics = topics.filter((t) => t.subject === subject);
            const practised = subjectTopics.filter((t) => t.mastery !== null);
            const avgMastery = practised.length
              ? Math.round(
                  practised.reduce((sum, t) => sum + (t.mastery ?? 0), 0) / practised.length
                )
              : null;
            const open = openSubject === subject;
            return (
              <section
                key={subject}
                className="rounded-2xl border border-white/[0.08] bg-[#0E1F3D] overflow-hidden"
              >
                <button
                  onClick={() => setOpenSubject(open ? null : subject)}
                  aria-expanded={open}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left hover:bg-white/[0.02] transition-colors"
                >
                  <div>
                    <h2 className="text-white font-bold text-lg leading-snug">{subject}</h2>
                    <p className="text-white/40 text-xs mt-1">
                      {subjectTopics.length} {subjectTopics.length === 1 ? "topic" : "topics"}
                      {avgMastery !== null
                        ? ` · ${avgMastery}% average mastery`
                        : " · not started yet"}
                    </p>
                  </div>
                  <IconChevronDown
                    className={`w-5 h-5 text-white/40 flex-shrink-0 transition-transform duration-200 ${
                      open ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {open && (
                  <div className="px-6 pb-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {subjectTopics.map((topic) => {
                      const locked = plan === "free" && left === 0;
                      return (
                        <button
                          key={topic.id}
                          onClick={() => !locked && !loading && startQuiz(topic)}
                          disabled={locked || loading}
                          className={`group text-left rounded-2xl border border-white/[0.08] bg-[#0A1730] p-6 transition-[border-color,box-shadow] duration-300 ${
                            locked
                              ? "opacity-50 cursor-not-allowed"
                              : "hover:border-[#00D4FF]/40 hover:shadow-[0_0_24px_rgba(0,212,255,0.12)]"
                          }`}
                        >
                          <div className="flex items-start justify-between gap-3 mb-4">
                            <h3 className="text-white font-bold text-lg leading-snug">{topic.name}</h3>
                            {locked ? (
                              <IconLock className="w-5 h-5 text-white/30 flex-shrink-0" />
                            ) : (
                              <IconArrowRight className="w-5 h-5 text-[#00D4FF] flex-shrink-0 group-hover:translate-x-0.5 transition-transform" />
                            )}
                          </div>

                          {topic.mastery === null ? (
                            <p className="text-white/40 text-sm">Not practised yet — take your first quiz</p>
                          ) : (
                            <div>
                              <div className="flex items-center justify-between text-xs mb-1.5">
                                <span className="text-white/40 uppercase tracking-widest font-semibold">Mastery</span>
                                <span className="text-white font-bold">{topic.mastery}%</span>
                              </div>
                              <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                                <div
                                  className={`h-full rounded-full ${masteryColour(topic.mastery)}`}
                                  style={{ width: `${topic.mastery}%` }}
                                />
                              </div>
                              <p className="text-white/30 text-xs mt-2">
                                {topic.attempts} {topic.attempts === 1 ? "quiz" : "quizzes"} done
                              </p>
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </section>
            );
          })}
        </div>
      </div>
    );
  }

  /* ── QUIZ ── */
  if (view === "quiz" && activeTopic) {
    const q = questions[current];
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[#00D4FF] text-xs font-bold uppercase tracking-widest mb-1">
              {activeTopic.name}
            </p>
            <p className="text-white/40 text-sm">
              Question {current + 1} of {questions.length}
            </p>
          </div>
          <button
            onClick={() => setView("list")}
            className="text-white/40 hover:text-white text-sm transition-colors"
          >
            Quit
          </button>
        </div>

        <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
          <div
            className="h-full rounded-full bg-[#00D4FF] transition-[width] duration-300"
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
                className="w-full text-left px-5 py-3.5 rounded-xl border border-white/10 bg-white/[0.03] text-white/80 text-sm hover:border-[#00D4FF]/50 hover:bg-[#2D6BE4]/10 hover:text-white transition-colors disabled:opacity-50"
              >
                <span className="text-[#00D4FF] font-bold mr-3">{String.fromCharCode(65 + i)}</span>
                {option}
              </button>
            ))}
          </div>
        </div>

        {loading && <p className="text-white/40 text-sm text-center">Marking your quiz…</p>}
        {error && (
          <div className="bg-amber-400/10 border border-amber-400/25 rounded-xl px-4 py-3 text-sm text-amber-300">
            {error}
          </div>
        )}
      </div>
    );
  }

  /* ── RESULTS ── */
  if (view === "results" && result && activeTopic) {
    const pct = Math.round((result.correct / result.total) * 100);
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="glass rounded-2xl p-8 text-center">
          <p className="text-[#00D4FF] text-xs font-bold uppercase tracking-widest mb-2">
            {activeTopic.name}
          </p>
          <p className="text-5xl font-extrabold text-white mb-1">
            {result.correct}/{result.total}
          </p>
          <p className="text-white/50 text-sm mb-4">{pct}% correct</p>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm">
            <IconTarget className="w-4 h-4 text-[#00D4FF]" />
            <span className="text-white/70">
              Mastery now <span className="text-white font-bold">{result.mastery}%</span>
            </span>
          </div>
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
              <p className="text-emerald-300/90 text-sm mb-3 flex items-start gap-1.5">
                <IconCheck className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>
                  {String.fromCharCode(65 + r.correctIndex)} — {r.options[r.correctIndex]}
                </span>
              </p>
              <p className="text-white/50 text-sm leading-relaxed border-t border-white/10 pt-3">
                {r.explanation}
              </p>
              <QuestionReport questionId={r.id} />
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => startQuiz(activeTopic)}
            disabled={loading || (left !== null && left === 0)}
            className="flex-1 px-5 py-3 bg-[#2D6BE4] hover:bg-[#4A82F0] text-white text-sm font-bold rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Try this topic again
          </button>
          <button
            onClick={() => {
              setView("list");
              // Refresh server-rendered mastery bars on the topic list.
              window.location.reload();
            }}
            className="flex-1 px-5 py-3 glass hover:bg-white/10 text-white text-sm font-bold rounded-xl transition-colors"
          >
            Back to topics
          </button>
        </div>
        {left !== null && left === 0 && (
          <p className="text-white/40 text-sm text-center">
            That was your last free quiz for today.{" "}
            <Link href="/pricing" className="text-[#00D4FF] hover:underline">
              Go Premium for unlimited practice →
            </Link>
          </p>
        )}
      </div>
    );
  }

  return null;
}

// Per-question report control shown under each explanation. Lets a learner
// flag a question they believe is wrong; the server hides it from rotation.
function QuestionReport({ questionId }: { questionId: string }) {
  const [state, setState] = useState<"idle" | "open" | "sending" | "done">("idle");
  const [reason, setReason] = useState("");

  async function send() {
    setState("sending");
    try {
      await fetch("/api/practice/report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ questionId, reason }),
      });
    } catch {
      // Best-effort: even if the network hiccups, don't block the learner.
    }
    setState("done");
  }

  if (state === "done") {
    return (
      <p className="text-white/30 text-xs mt-3">
        Thanks — we&apos;ll review this question. It won&apos;t appear again until we do.
      </p>
    );
  }

  if (state === "open" || state === "sending") {
    return (
      <div className="mt-3 flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="What looks wrong? (optional)"
          className="flex-1 px-3 py-2 rounded-lg bg-white/[0.04] border border-white/10 text-white/80 text-xs placeholder:text-white/30 focus:outline-none focus:border-[#00D4FF]/40"
        />
        <button
          onClick={send}
          disabled={state === "sending"}
          className="px-4 py-2 bg-[#2D6BE4] hover:bg-[#4A82F0] text-white text-xs font-bold rounded-lg transition-colors disabled:opacity-50"
        >
          {state === "sending" ? "Sending…" : "Submit report"}
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => setState("open")}
      className="text-white/25 hover:text-white/60 text-xs mt-3 transition-colors"
    >
      ⚑ Report a problem with this question
    </button>
  );
}

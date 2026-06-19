"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import ReactMarkdown from "react-markdown";
import Reveal from "@/components/Reveal";
import { IconAcademicCap, IconSparkles } from "@/components/icons";

// Grade 9 Subject Choice Advisor — lives in Study Pro's Grade 8–9 view. Reuses
// the Readiness Check marks (passed in as `marks`) plus the learner's dream and
// interests, and helps them choose Grade 10 subjects. Free taste = the Maths vs
// Maths Lit call + a direction; premium = the full report. Gold-accented to
// match the Senior Phase section.

interface SubjectAdvisorProps {
  // Filled Grade 9 marks from the Readiness Check: { name, percent }.
  marks: { name: string; percent: number }[];
}

const INPUT_CLS =
  "w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#FFB454]/40 focus:border-[#FFB454] transition-colors";

export default function SubjectAdvisor({ marks }: SubjectAdvisorProps) {
  const { data: session, status } = useSession();
  const authed = status === "authenticated";
  const plan: "free" | "premium" = session?.user?.plan ?? "free";

  const [dreamCareer, setDreamCareer] = useState("");
  const [interests, setInterests] = useState("");
  const [report, setReport] = useState("");
  const [loading, setLoading] = useState(false);
  const [left, setLeft] = useState<number | null>(null);
  const [limit, setLimit] = useState<number | null>(null);

  useEffect(() => {
    if (status !== "authenticated") return;
    fetch("/api/subject-advisor")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (d) {
          setLeft(d.remaining);
          setLimit(d.limit);
        }
      })
      .catch(() => {});
  }, [status]);

  async function handleAdvice() {
    if (!authed || loading || (left !== null && left <= 0)) return;
    setLoading(true);
    setReport("");
    try {
      const res = await fetch("/api/subject-advisor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ marks, dreamCareer, interests }),
      });

      if (res.status === 429) {
        setLeft(0);
        setReport("You've used your subject-advice reports for today. Premium gives you more.");
        return;
      }
      if (!res.ok || !res.body) {
        const data = await res.json().catch(() => null);
        setReport(data?.error ?? "Sorry — something went wrong. Please try again.");
        return;
      }

      const remaining = res.headers.get("X-Advisor-Remaining");
      if (remaining !== null) setLeft(Number(remaining));

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setReport(acc);
      }
    } catch {
      setReport("Connection problem — please try again.");
    } finally {
      setLoading(false);
    }
  }

  const noneLeft = left !== null && left <= 0;
  const hasMaths = marks.some((m) => /^math/i.test(m.name));

  return (
    <div className="rounded-2xl border border-[#FFB454]/30 bg-[#FFB454]/[0.06] overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#FFB454]/[0.06]">
        <div className="flex items-center gap-2.5 text-[#FFB454]">
          <IconAcademicCap className="w-4 h-4" />
          <h3 className="text-xs font-semibold text-white uppercase tracking-widest">
            Subject Choice Advisor
          </h3>
        </div>
        {authed && left !== null && limit !== null && (
          <span className="text-xs font-semibold px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-white/60">
            {left} / {limit} today
          </span>
        )}
      </div>

      <div className="px-6 py-5 space-y-4">
        <p className="text-sm text-white/55 leading-relaxed">
          Choosing Grade 10 subjects is the biggest call you&apos;ll make in Grade 9 — it decides
          what you can study after matric. Nexi uses your Readiness Check marks above, plus what
          you dream of doing, to help you choose with confidence.
        </p>

        {marks.length === 0 && (
          <p className="text-xs text-[#FFB454] bg-[#FFB454]/10 border border-[#FFB454]/25 rounded-xl px-4 py-3 leading-relaxed">
            Tip: fill in your marks in the Readiness Check above first — especially Mathematics —
            so Nexi&apos;s advice is properly tailored to you.
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[10px] font-semibold uppercase tracking-widest text-white/40 mb-1.5">
              Dream job or field (optional)
            </label>
            <input
              type="text"
              value={dreamCareer}
              onChange={(e) => setDreamCareer(e.target.value)}
              placeholder="e.g. doctor, engineer, lawyer, business…"
              className={INPUT_CLS + " placeholder:text-white/25"}
            />
          </div>
          <div>
            <label className="block text-[10px] font-semibold uppercase tracking-widest text-white/40 mb-1.5">
              What do you enjoy / are good at? (optional)
            </label>
            <input
              type="text"
              value={interests}
              onChange={(e) => setInterests(e.target.value)}
              placeholder="e.g. building things, biology, money, art…"
              className={INPUT_CLS + " placeholder:text-white/25"}
            />
          </div>
        </div>

        {!authed ? (
          <div className="text-center py-2">
            <p className="text-sm text-white/50 mb-2">Sign in to get subject-choice advice.</p>
            <Link href="/login" className="text-sm font-semibold text-[#FFB454] hover:text-white transition-colors">
              Sign in or create a free account →
            </Link>
          </div>
        ) : noneLeft ? (
          <div className="text-center py-2">
            <p className="text-sm text-white/50 mb-2">You&apos;ve used your advice reports for today.</p>
            <Link href="/pricing" className="text-sm font-semibold text-[#FFB454] hover:text-white transition-colors">
              Go Premium for the full report &amp; more →
            </Link>
          </div>
        ) : (
          <button
            onClick={handleAdvice}
            disabled={loading}
            className="w-full px-5 py-3 bg-[#FFB454] hover:bg-[#FFC474] disabled:opacity-40 disabled:cursor-not-allowed text-[#0A1628] font-bold text-sm rounded-xl transition-colors cursor-pointer"
          >
            {loading
              ? "Nexi is thinking…"
              : hasMaths
                ? "Help me choose my subjects"
                : "Help me choose (add your Maths mark for best results)"}
          </button>
        )}

        {(report || loading) && (
          <Reveal>
            <div className="mt-2 pt-4 border-t border-white/10">
              <div className="flex items-center gap-2 text-[#FFB454] mb-3">
                <IconSparkles className="w-4 h-4" />
                <span className="text-xs font-semibold text-white uppercase tracking-widest">Nexi&apos;s advice</span>
              </div>
              {report ? (
                <div className="nexi-md text-white text-sm leading-relaxed">
                  <ReactMarkdown>{report}</ReactMarkdown>
                </div>
              ) : (
                <p className="text-white/50 italic text-sm">Nexi is thinking it through for you…</p>
              )}

              {plan === "free" && report && !loading && (
                <p className="text-[11px] text-white/45 leading-relaxed mt-4">
                  ✨ This is the free taste — the big Maths decision and a direction.{" "}
                  <Link href="/pricing" className="text-[#FFB454] hover:text-white transition-colors font-semibold">
                    Premium
                  </Link>{" "}
                  gives the full report: your 3-subject package, what it unlocks, watch-outs,
                  questions for your school, and a summary for your parents.
                </p>
              )}
            </div>
          </Reveal>
        )}

        <p className="text-[11px] text-white/30 leading-relaxed">
          Schools differ on which subjects they offer and how they group them — always confirm
          your options with your school before deciding.
        </p>
      </div>
    </div>
  );
}

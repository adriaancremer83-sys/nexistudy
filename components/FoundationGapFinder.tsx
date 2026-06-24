"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import ReactMarkdown from "react-markdown";
import Reveal from "@/components/Reveal";
import { IconTarget, IconSparkles } from "@/components/icons";

// Grade 8–9 Foundation Gap Finder — lives in Study Pro's senior view. Reads the
// learner's REAL Grade 9 quiz mastery server-side, finds the cracked building
// blocks, and gives a fix-it plan before Grade 10. Free taste = the single
// biggest gap + a first step; premium = the full week-by-week repair plan.
// Gold-accented to match the Senior Phase section.

interface FoundationGapFinderProps {
  // Filled Grade 9 Readiness Check marks: { name, percent } — a rougher fallback
  // signal for subjects the learner hasn't quizzed yet.
  marks: { name: string; percent: number }[];
}

export default function FoundationGapFinder({ marks }: FoundationGapFinderProps) {
  const { data: session, status } = useSession();
  const authed = status === "authenticated";
  const plan: "free" | "premium" = session?.user?.plan ?? "free";

  const [report, setReport] = useState("");
  const [loading, setLoading] = useState(false);
  const [needsData, setNeedsData] = useState(false);
  const [left, setLeft] = useState<number | null>(null);
  const [limit, setLimit] = useState<number | null>(null);

  useEffect(() => {
    if (status !== "authenticated") return;
    fetch("/api/foundation-gap")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (d) {
          setLeft(d.remaining);
          setLimit(d.limit);
        }
      })
      .catch(() => {});
  }, [status]);

  async function handleFind() {
    if (!authed || loading || (left !== null && left <= 0)) return;
    setLoading(true);
    setReport("");
    setNeedsData(false);
    try {
      const res = await fetch("/api/foundation-gap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ marks }),
      });

      if (res.status === 422) {
        setNeedsData(true);
        return;
      }
      if (res.status === 429) {
        setLeft(0);
        setReport("You've used your Foundation Gap reports for today. Premium gives you more.");
        return;
      }
      if (!res.ok || !res.body) {
        const data = await res.json().catch(() => null);
        setReport(data?.error ?? "Sorry — something went wrong. Please try again.");
        return;
      }

      const remaining = res.headers.get("X-Gap-Remaining");
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

  return (
    <div className="rounded-2xl border border-[#FFB454]/30 bg-[#FFB454]/[0.06] overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#FFB454]/[0.06]">
        <div className="flex items-center gap-2.5 text-[#FFB454]">
          <IconTarget className="w-4 h-4" />
          <h3 className="text-xs font-semibold text-white uppercase tracking-widest">
            Foundation Gap Finder
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
          A shaky mark hides a deeper crack — fractions, basic algebra, a missed concept. Nexi
          reads your real practice-quiz results, finds the broken building blocks, and gives you a
          week-by-week plan to fix them <em>before</em> Grade 10 builds on top.
        </p>

        {!authed ? (
          <div className="text-center py-2">
            <p className="text-sm text-white/50 mb-2">Sign in to find your foundation gaps.</p>
            <Link href="/login" className="text-sm font-semibold text-[#FFB454] hover:text-white transition-colors">
              Sign in or create a free account →
            </Link>
          </div>
        ) : noneLeft ? (
          <div className="text-center py-2">
            <p className="text-sm text-white/50 mb-2">You&apos;ve used your gap reports for today.</p>
            <Link href="/pricing" className="text-sm font-semibold text-[#FFB454] hover:text-white transition-colors">
              Go Premium for the full plan &amp; more →
            </Link>
          </div>
        ) : (
          <button
            onClick={handleFind}
            disabled={loading}
            className="w-full px-5 py-3 bg-[#FFB454] hover:bg-[#FFC474] disabled:opacity-40 disabled:cursor-not-allowed text-[#0A1628] font-bold text-sm rounded-xl transition-colors cursor-pointer"
          >
            {loading ? "Nexi is digging…" : "Find my foundation gaps"}
          </button>
        )}

        {needsData && (
          <div className="rounded-xl border border-[#FFB454]/25 bg-[#FFB454]/10 px-4 py-3.5 text-sm leading-relaxed">
            <p className="text-[#FFB454] font-semibold mb-1">Do a few quizzes first</p>
            <p className="text-white/60">
              Nexi finds your gaps from real practice results. Take a few Grade 9 quizzes — start
              with the subjects you&apos;re least sure of — then come back.{" "}
              <Link href="/practice" className="text-[#FFB454] hover:text-white transition-colors font-semibold">
                Go to practice →
              </Link>
            </p>
          </div>
        )}

        {(report || loading) && (
          <Reveal>
            <div className="mt-2 pt-4 border-t border-white/10">
              <div className="flex items-center gap-2 text-[#FFB454] mb-3">
                <IconSparkles className="w-4 h-4" />
                <span className="text-xs font-semibold text-white uppercase tracking-widest">Nexi&apos;s gap report</span>
              </div>
              {report ? (
                <div className="nexi-md text-white text-sm leading-relaxed">
                  <ReactMarkdown>{report}</ReactMarkdown>
                </div>
              ) : (
                <p className="text-white/50 italic text-sm">Nexi is digging into your results…</p>
              )}

              {plan === "free" && report && !loading && (
                <p className="text-[11px] text-white/45 leading-relaxed mt-4">
                  ✨ This is the free taste — your single biggest gap and a first step.{" "}
                  <Link href="/pricing" className="text-[#FFB454] hover:text-white transition-colors font-semibold">
                    Premium
                  </Link>{" "}
                  gives the full report: every gap in priority order, the week-by-week repair plan,
                  and the strengths to keep sharp.
                </p>
              )}
            </div>
          </Reveal>
        )}

        <p className="text-[11px] text-white/30 leading-relaxed">
          Nexi&apos;s read comes from your practice quizzes — the more topics you try, the sharper it gets.
        </p>
      </div>
    </div>
  );
}

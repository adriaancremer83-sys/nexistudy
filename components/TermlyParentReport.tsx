"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import ReactMarkdown from "react-markdown";
import Reveal from "@/components/Reveal";
import { IconDocumentText, IconSparkles } from "@/components/icons";

// Termly Parent Report — lives in Study Pro's senior view. Turns the learner's
// real practice activity this term into a plain-language report for parents.
// Free = a short snapshot; premium = the full subject-by-subject report + plan.
// Gold-accented to match the Senior Phase section.

export default function TermlyParentReport() {
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
    fetch("/api/parent-report")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (d) {
          setLeft(d.remaining);
          setLimit(d.limit);
        }
      })
      .catch(() => {});
  }, [status]);

  async function handleReport() {
    if (!authed || loading || (left !== null && left <= 0)) return;
    setLoading(true);
    setReport("");
    setNeedsData(false);
    try {
      const res = await fetch("/api/parent-report", { method: "POST" });

      if (res.status === 422) {
        setNeedsData(true);
        return;
      }
      if (res.status === 429) {
        setLeft(0);
        setReport("You've used your parent reports for today. Premium gives you more.");
        return;
      }
      if (!res.ok || !res.body) {
        const data = await res.json().catch(() => null);
        setReport(data?.error ?? "Sorry — something went wrong. Please try again.");
        return;
      }

      const remaining = res.headers.get("X-Report-Remaining");
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
          <IconDocumentText className="w-4 h-4" />
          <h3 className="text-xs font-semibold text-white uppercase tracking-widest">
            Termly Parent Report
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
          A plain-language report for parents, built from this term&apos;s real practice:
          effort, how each subject is trending, what improved, and where the gaps are.
          See the dip before the report card does.
        </p>

        {!authed ? (
          <div className="text-center py-2">
            <p className="text-sm text-white/50 mb-2">Sign in to generate a parent report.</p>
            <Link href="/login" className="text-sm font-semibold text-[#FFB454] hover:text-white transition-colors">
              Sign in or create a free account →
            </Link>
          </div>
        ) : noneLeft ? (
          <div className="text-center py-2">
            <p className="text-sm text-white/50 mb-2">You&apos;ve used your reports for today.</p>
            <Link href="/pricing" className="text-sm font-semibold text-[#FFB454] hover:text-white transition-colors">
              Go Premium for the full report &amp; more →
            </Link>
          </div>
        ) : (
          <button
            onClick={handleReport}
            disabled={loading}
            className="w-full px-5 py-3 bg-[#FFB454] hover:bg-[#FFC474] disabled:opacity-40 disabled:cursor-not-allowed text-[#0A1628] font-bold text-sm rounded-xl transition-colors cursor-pointer"
          >
            {loading ? "Nexi is writing the report…" : "Generate this term's report"}
          </button>
        )}

        {needsData && (
          <div className="rounded-xl border border-[#FFB454]/25 bg-[#FFB454]/10 px-4 py-3.5 text-sm leading-relaxed">
            <p className="text-[#FFB454] font-semibold mb-1">No practice this term yet</p>
            <p className="text-white/60">
              The report is built from real practice quizzes. Do a few this term, then come back
              for a report you can share with your parents.{" "}
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
                <span className="text-xs font-semibold text-white uppercase tracking-widest">Nexi&apos;s parent report</span>
              </div>
              {report ? (
                <div className="nexi-md text-white text-sm leading-relaxed">
                  <ReactMarkdown>{report}</ReactMarkdown>
                </div>
              ) : (
                <p className="text-white/50 italic text-sm">Nexi is going through this term&apos;s practice…</p>
              )}

              {plan === "free" && report && !loading && (
                <p className="text-[11px] text-white/45 leading-relaxed mt-4">
                  ✨ This is the free snapshot.{" "}
                  <Link href="/pricing" className="text-[#FFB454] hover:text-white transition-colors font-semibold">
                    Premium
                  </Link>{" "}
                  gives the full report: subject-by-subject trends, every gap, and a clear plan
                  for how you can support at home.
                </p>
              )}
            </div>
          </Reveal>
        )}

        <p className="text-[11px] text-white/30 leading-relaxed">
          Based on practice activity on NexiStudy this term — a look between report cards, not a
          replacement for your school&apos;s results.
        </p>
      </div>
    </div>
  );
}

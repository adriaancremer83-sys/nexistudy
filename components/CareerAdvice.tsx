"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import ReactMarkdown from "react-markdown";
import Reveal from "@/components/Reveal";
import { IconAcademicCap, IconSparkles } from "@/components/icons";

// Premium "Funding & Career Advice" layer that lives inside Study Pro. It reuses
// the subject marks the learner already entered in the APS calculator (passed in
// as `subjects`) — no second calculator — and adds the part Study Pro can't:
// NSFAS/bursary funding, personalised career direction, and an action plan.
// Free taste 1/day, premium 20/day; the /api/guidance route enforces the limit.

interface CareerAdviceProps {
  // Filled subjects from Study Pro's calculator: { name, percent }.
  subjects: { name: string; percent: number }[];
}

const INPUT_CLS =
  "w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#00D4FF]/40 focus:border-[#00D4FF] transition-colors";

export default function CareerAdvice({ subjects }: CareerAdviceProps) {
  const { data: session, status } = useSession();
  const authed = status === "authenticated";
  const plan: "free" | "premium" = session?.user?.plan ?? "free";

  const [fieldOfInterest, setFieldOfInterest] = useState("");
  const [interests, setInterests] = useState("");
  const [report, setReport] = useState("");
  const [loading, setLoading] = useState(false);
  const [left, setLeft] = useState<number | null>(null);
  const [limit, setLimit] = useState<number | null>(null);

  const enoughSubjects = subjects.length >= 4;

  useEffect(() => {
    if (status !== "authenticated") return;
    fetch("/api/guidance")
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
    if (!authed || loading || !enoughSubjects || (left !== null && left <= 0)) return;
    setLoading(true);
    setReport("");
    try {
      const res = await fetch("/api/guidance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subjects, fieldOfInterest, interests }),
      });

      if (res.status === 429) {
        setLeft(0);
        setReport("You've used your advice reports for today. Premium gives you 20 a day.");
        return;
      }
      if (!res.ok || !res.body) {
        const data = await res.json().catch(() => null);
        setReport(data?.error ?? "Sorry — something went wrong. Please try again.");
        return;
      }

      const remaining = res.headers.get("X-Guidance-Remaining");
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
    <div className="glass rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/5">
        <div className="flex items-center gap-2.5 text-[#00D4FF]">
          <IconAcademicCap className="w-4 h-4" />
          <h3 className="text-xs font-semibold text-white uppercase tracking-widest">
            Funding &amp; Career Advice
          </h3>
        </div>
        {authed && left !== null && limit !== null && (
          <span className="text-xs font-semibold px-3 py-1.5 rounded-full border glass text-white/60">
            {left} / {limit} today
          </span>
        )}
      </div>

      <div className="px-6 py-5 space-y-4">
        <p className="text-xs text-white/40 leading-relaxed">
          Your APS and the courses you qualify for are above. Nexi adds what a calculator
          can&apos;t — how to <span className="text-white/70">pay for it</span> (NSFAS &amp;
          bursaries) and a career direction matched to your marks and what you enjoy.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[10px] font-semibold uppercase tracking-widest text-white/40 mb-1.5">
              Field you&apos;re leaning towards (optional)
            </label>
            <input
              type="text"
              value={fieldOfInterest}
              onChange={(e) => setFieldOfInterest(e.target.value)}
              placeholder="e.g. Engineering, health, business…"
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
              placeholder="e.g. solving problems, helping people…"
              className={INPUT_CLS + " placeholder:text-white/25"}
            />
          </div>
        </div>

        {!authed ? (
          <div className="text-center py-2">
            <p className="text-sm text-white/50 mb-2">Sign in for funding &amp; career advice.</p>
            <Link href="/login" className="text-sm font-semibold text-[#00D4FF] hover:text-white transition-colors">
              Sign in or create a free account →
            </Link>
          </div>
        ) : noneLeft ? (
          <div className="text-center py-2">
            <p className="text-sm text-white/50 mb-2">You&apos;ve used your advice reports for today.</p>
            <Link href="/pricing" className="text-sm font-semibold text-[#00D4FF] hover:text-white transition-colors">
              Go Premium for 20 a day →
            </Link>
          </div>
        ) : (
          <>
            <button
              onClick={handleAdvice}
              disabled={!enoughSubjects || loading}
              className="w-full px-5 py-3 bg-[#2D6BE4] hover:bg-[#4A82F0] disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold text-sm rounded-xl transition-all shadow-lg shadow-[#2D6BE4]/30 hover:shadow-[#00D4FF]/30 cursor-pointer"
            >
              {loading ? "Nexi is thinking…" : "Get funding & career advice"}
            </button>
            {!enoughSubjects && (
              <p className="text-[11px] text-white/40 text-center">
                Enter marks for at least four subjects in the calculator above.
              </p>
            )}
          </>
        )}

        {(report || loading) && (
          <Reveal>
            <div className="mt-2 pt-4 border-t border-white/10">
              <div className="flex items-center gap-2 text-[#00D4FF] mb-3">
                <IconSparkles className="w-4 h-4" />
                <span className="text-xs font-semibold text-white uppercase tracking-widest">Nexi&apos;s advice</span>
              </div>
              {report ? (
                <div className="nexi-md text-white text-sm leading-relaxed">
                  <ReactMarkdown>{report}</ReactMarkdown>
                </div>
              ) : (
                <p className="text-white/50 italic text-sm">Nexi is working through your options…</p>
              )}

              {plan === "free" && report && !loading && (
                <p className="text-[11px] text-white/45 leading-relaxed mt-4">
                  ✨ This is the free taste.{" "}
                  <Link href="/pricing" className="text-[#00D4FF] hover:text-white transition-colors font-semibold">
                    Premium
                  </Link>{" "}
                  gives a full report — career directions, NSFAS &amp; bursary guidance, and a step-by-step plan.
                </p>
              )}
            </div>
          </Reveal>
        )}

        <p className="text-[11px] text-white/30 leading-relaxed">
          Funding rules and deadlines change each year — always confirm current NSFAS thresholds
          and bursary dates on the official sites.
        </p>
      </div>
    </div>
  );
}

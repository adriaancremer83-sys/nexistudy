"use client";

import Link from "next/link";
import { useState, useEffect, useMemo } from "react";
import { useSession } from "next-auth/react";
import ReactMarkdown from "react-markdown";
import Reveal from "@/components/Reveal";
import { computeAps, type SubjectMark } from "@/lib/aps";
import { IconChartBar, IconAcademicCap, IconSparkles } from "@/components/icons";

const SUBJECT_OPTIONS = [
  "Mathematics",
  "Mathematical Literacy",
  "Physical Sciences",
  "Life Sciences",
  "English Home Language",
  "English First Additional Language",
  "Afrikaans Home Language",
  "Afrikaans First Additional Language",
  "isiZulu Home Language",
  "isiXhosa Home Language",
  "Geography",
  "History",
  "Accounting",
  "Business Studies",
  "Economics",
  "Agricultural Sciences",
  "Computer Applications Technology",
  "Information Technology",
  "Engineering Graphics & Design",
  "Tourism",
  "Consumer Studies",
  "Life Orientation",
];

const SELECT_CLS =
  "w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#00D4FF]/40 focus:border-[#00D4FF] transition-colors cursor-pointer";

interface Row {
  name: string;
  percent: string;
}

const DEFAULT_ROWS: Row[] = [
  { name: "Mathematics", percent: "" },
  { name: "English Home Language", percent: "" },
  { name: "Physical Sciences", percent: "" },
  { name: "Life Sciences", percent: "" },
  { name: "Geography", percent: "" },
  { name: "Life Orientation", percent: "" },
  { name: "", percent: "" },
];

export default function GuidancePage() {
  const { data: session, status } = useSession();
  const authed = status === "authenticated";
  const plan: "free" | "premium" = session?.user?.plan ?? "free";

  const [rows, setRows] = useState<Row[]>(DEFAULT_ROWS);
  const [fieldOfInterest, setFieldOfInterest] = useState("");
  const [interests, setInterests] = useState("");

  const [report, setReport] = useState("");
  const [loading, setLoading] = useState(false);
  const [left, setLeft] = useState<number | null>(null);
  const [limit, setLimit] = useState<number | null>(null);

  // Live APS as the learner types — deterministic, always free. A row only
  // counts once it has both a subject and a non-empty mark (empty string would
  // otherwise coerce to 0% and be treated as a real subject).
  const parsedSubjects: SubjectMark[] = useMemo(
    () =>
      rows
        .filter((r) => r.name.trim() && r.percent.trim() !== "")
        .map((r) => ({ name: r.name.trim(), percent: Number(r.percent) }))
        .filter((s) => Number.isFinite(s.percent)),
    [rows]
  );
  const apsResult = useMemo(() => computeAps(parsedSubjects), [parsedSubjects]);
  const enoughSubjects = parsedSubjects.length >= 4;

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

  function setRow(i: number, patch: Partial<Row>) {
    setRows((prev) => prev.map((r, idx) => (idx === i ? { ...r, ...patch } : r)));
  }
  function addRow() {
    setRows((prev) => [...prev, { name: "", percent: "" }]);
  }
  function removeRow(i: number) {
    setRows((prev) => prev.filter((_, idx) => idx !== i));
  }

  async function handleGuidance() {
    if (!authed || loading || !enoughSubjects || (left !== null && left <= 0)) return;
    setLoading(true);
    setReport("");
    try {
      const res = await fetch("/api/guidance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subjects: parsedSubjects,
          fieldOfInterest,
          interests,
        }),
      });

      if (res.status === 429) {
        setLeft(0);
        setReport("You've used your guidance reports for today. Premium gives you 20 a day.");
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
    <div className="min-h-screen">
      {/* HERO */}
      <section className="page-hero py-14 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#00D4FF] text-sm font-semibold mb-2 uppercase tracking-widest">New</p>
          <h1 className="text-4xl sm:text-5xl font-bold mb-3 text-white">
            Career <span className="text-gradient">Guide</span>
          </h1>
          <p className="text-lg text-white/70 leading-snug max-w-2xl mx-auto">
            Work out your APS and get real South African study and career guidance — which
            courses fit you, where to study, and how to pay for it with NSFAS and bursaries.
          </p>
        </div>
      </section>

      <div className="section-divider" />

      <div className="max-w-4xl mx-auto px-4 py-10 space-y-6">
        {/* APS CALCULATOR */}
        <Reveal>
          <div className="glass rounded-2xl overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/5">
              <div className="flex items-center gap-2.5 text-[#00D4FF]">
                <IconChartBar className="w-4 h-4" />
                <h2 className="text-xs font-semibold text-white uppercase tracking-widest">
                  APS Calculator
                </h2>
              </div>
              <span className="text-2xl font-extrabold text-white tabular-nums">
                {apsResult.aps}
                <span className="text-sm font-semibold text-white/40"> / 42</span>
              </span>
            </div>

            <div className="px-6 py-5 space-y-3">
              <p className="text-xs text-white/40 leading-relaxed">
                Enter your subjects and latest marks. APS counts your best six subjects and
                excludes Life Orientation. It&apos;s free and updates as you type.
              </p>

              {rows.map((row, i) => (
                <div key={i} className="flex gap-2 items-center">
                  <select
                    value={row.name}
                    onChange={(e) => setRow(i, { name: e.target.value })}
                    className={SELECT_CLS + " flex-1"}
                  >
                    <option value="">— Select subject —</option>
                    {SUBJECT_OPTIONS.map((s) => <option key={s}>{s}</option>)}
                  </select>
                  <input
                    type="number"
                    inputMode="numeric"
                    min={0}
                    max={100}
                    value={row.percent}
                    onChange={(e) => setRow(i, { percent: e.target.value })}
                    placeholder="%"
                    className={SELECT_CLS + " w-20 text-center placeholder:text-white/25 cursor-text"}
                  />
                  <button
                    onClick={() => removeRow(i)}
                    aria-label="Remove subject"
                    className="flex-shrink-0 w-9 h-9 rounded-lg border border-white/15 text-white/50 hover:text-white hover:border-red-400/50 transition-colors cursor-pointer"
                  >
                    ✕
                  </button>
                </div>
              ))}

              <button
                onClick={addRow}
                className="text-xs font-semibold text-[#00D4FF] hover:text-white transition-colors cursor-pointer"
              >
                + Add subject
              </button>

              {apsResult.countedSubjects.length > 0 && (
                <div className="mt-2 pt-3 border-t border-white/10">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-white/40 mb-2">
                    Counted (best six)
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {apsResult.countedSubjects.map((s) => (
                      <span key={s.name} className="text-[11px] text-white/70 bg-white/5 border border-white/10 rounded-full px-2.5 py-1">
                        {s.name} · {s.percent}% · {s.points}pts
                      </span>
                    ))}
                  </div>
                  {apsResult.excluded.length > 0 && (
                    <p className="text-[10px] text-white/30 mt-2">
                      Not counted: {apsResult.excluded.map((e) => e.name).join(", ")}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </Reveal>

        {/* INTERESTS + ACTION */}
        <Reveal delay={100}>
          <div className="glass rounded-2xl overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/5">
              <div className="flex items-center gap-2.5 text-[#00D4FF]">
                <IconAcademicCap className="w-4 h-4" />
                <h2 className="text-xs font-semibold text-white uppercase tracking-widest">
                  About you
                </h2>
              </div>
              {authed ? (
                left !== null && limit !== null ? (
                  <span className="text-xs font-semibold px-3 py-1.5 rounded-full border glass text-white/60">
                    {left} / {limit} reports today
                  </span>
                ) : null
              ) : (
                <span className="text-xs font-semibold px-3 py-1.5 rounded-full border glass text-white/60">
                  Sign in for guidance
                </span>
              )}
            </div>

            <div className="px-6 py-5 space-y-4">
              <div>
                <label className="block text-[10px] font-semibold uppercase tracking-widest text-white/40 mb-1.5">
                  Field you&apos;re leaning towards (optional)
                </label>
                <input
                  type="text"
                  value={fieldOfInterest}
                  onChange={(e) => setFieldOfInterest(e.target.value)}
                  placeholder="e.g. Engineering, health, business, the arts…"
                  className={SELECT_CLS + " placeholder:text-white/25 cursor-text"}
                />
              </div>
              <div>
                <label className="block text-[10px] font-semibold uppercase tracking-widest text-white/40 mb-1.5">
                  What do you enjoy or are good at? (optional)
                </label>
                <textarea
                  value={interests}
                  onChange={(e) => setInterests(e.target.value)}
                  rows={2}
                  placeholder="e.g. I like solving problems, helping people, working with my hands…"
                  className={SELECT_CLS + " resize-none placeholder:text-white/25 cursor-text"}
                />
              </div>

              {!authed ? (
                <div className="text-center py-2">
                  <p className="text-sm text-white/50 mb-2">Your APS is free above. Sign in for AI guidance.</p>
                  <Link href="/login" className="text-sm font-semibold text-[#00D4FF] hover:text-white transition-colors">
                    Sign in or create a free account →
                  </Link>
                </div>
              ) : noneLeft ? (
                <div className="text-center py-2">
                  <p className="text-sm text-white/50 mb-2">You&apos;ve used your guidance reports for today.</p>
                  <Link href="/pricing" className="text-sm font-semibold text-[#00D4FF] hover:text-white transition-colors">
                    Go Premium for 20 reports a day →
                  </Link>
                </div>
              ) : (
                <>
                  <button
                    onClick={handleGuidance}
                    disabled={!enoughSubjects || loading}
                    className="w-full px-5 py-3 bg-[#2D6BE4] hover:bg-[#4A82F0] disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold text-sm rounded-xl transition-all shadow-lg shadow-[#2D6BE4]/30 hover:shadow-[#00D4FF]/30 cursor-pointer"
                  >
                    {loading ? "Nexi is thinking…" : "Get my guidance"}
                  </button>
                  {!enoughSubjects && (
                    <p className="text-[11px] text-white/40 text-center">Enter marks for at least four subjects above.</p>
                  )}
                </>
              )}
            </div>
          </div>
        </Reveal>

        {/* REPORT */}
        {(report || loading) && (
          <Reveal>
            <div className="glass rounded-2xl overflow-hidden">
              <div className="flex items-center gap-2.5 px-6 py-4 border-b border-white/10 bg-white/5 text-[#00D4FF]">
                <IconSparkles className="w-4 h-4" />
                <h2 className="text-xs font-semibold text-white uppercase tracking-widest">Your guidance</h2>
              </div>
              <div className="px-6 py-5">
                {report ? (
                  <div className="nexi-md text-white text-sm leading-relaxed">
                    <ReactMarkdown>{report}</ReactMarkdown>
                  </div>
                ) : (
                  <p className="text-white/50 italic text-sm">Nexi is working through your options…</p>
                )}

                {plan === "free" && report && !loading && (
                  <p className="text-[11px] text-white/45 leading-relaxed mt-4 pt-4 border-t border-white/10">
                    ✨ This is the free taste.{" "}
                    <Link href="/pricing" className="text-[#00D4FF] hover:text-white transition-colors font-semibold">
                      Premium
                    </Link>{" "}
                    gives a full report — detailed course list, where to study, NSFAS &amp; bursary
                    guidance, and a step-by-step action plan.
                  </p>
                )}
              </div>
            </div>
          </Reveal>
        )}

        <p className="text-[11px] text-white/30 text-center leading-relaxed">
          APS conventions and funding rules differ per institution and change each year —
          always confirm exact requirements, NSFAS thresholds and deadlines on the official sites.
        </p>
      </div>
    </div>
  );
}

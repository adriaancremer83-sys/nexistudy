"use client";

import { useEffect, useState } from "react";
import ShareToClassroom from "@/components/ShareToClassroom";
import { IconChartBar, IconUsers, IconTarget, IconWarning, IconCheck } from "@/components/icons";

const SUBJECTS = [
  "Accounting",
  "Afrikaans",
  "Agricultural Sciences",
  "Business Studies",
  "Computer Applications Technology",
  "Consumer Studies",
  "Economics",
  "English",
  "Geography",
  "Hospitality Studies",
  "Information Technology",
  "Life Sciences",
  "Mathematical Literacy",
  "Mathematics",
  "Physical Sciences",
  "Tourism",
];
const GRADES = ["Grade 10", "Grade 11", "Grade 12"];

interface HeatmapRow {
  topicId: string;
  name: string;
  avgMastery: number;
  learnersPractised: number;
}
interface Heatmap {
  memberCount: number;
  rows: HeatmapRow[];
  practisedAny: boolean;
}
interface TeacherClass {
  id: string;
  name: string;
  subject: string;
  grade: string;
  joinCode: string;
  memberCount: number;
  heatmap: Heatmap | null;
}

const INPUT_CLS =
  "w-full px-4 py-3 bg-white/5 border border-white/15 rounded-xl text-sm text-white placeholder:text-white/25 focus:outline-none focus:ring-2 focus:ring-[#FFB454]/40 focus:border-[#FFB454] transition-colors";
const SELECT_CLS = INPUT_CLS + " cursor-pointer appearance-none";

// Lower mastery = the class is struggling more, so it should read "hotter".
function barColor(mastery: number): string {
  if (mastery < 50) return "bg-red-400";
  if (mastery < 75) return "bg-amber-300";
  return "bg-emerald-400";
}

export default function TeacherClasses() {
  const [classes, setClasses] = useState<TeacherClass[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", subject: "Mathematics", grade: "Grade 12" });
  const [error, setError] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  async function load() {
    try {
      const res = await fetch("/api/teacher/classes");
      const data = await res.json();
      if (res.ok) setClasses(data.classes ?? []);
    } catch {
      /* leave the empty state showing */
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim()) return setError("Give your class a name.");
    setCreating(true);
    setError("");
    try {
      const res = await fetch("/api/teacher/classes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Could not create the class.");
        setCreating(false);
        return;
      }
      setForm({ name: "", subject: form.subject, grade: form.grade });
      setShowForm(false);
      await load();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setCreating(false);
    }
  }

  async function handleDelete(id: string, name: string) {
    if (!confirm(`Delete "${name}"? Learners will be removed from this class. This can't be undone.`)) return;
    await fetch("/api/teacher/classes", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ classId: id }),
    });
    await load();
  }

  function copyCode(id: string, code: string) {
    navigator.clipboard?.writeText(code).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId((cur) => (cur === id ? null : cur)), 1800);
    });
  }

  if (loading) {
    return (
      <div className="rounded-2xl border border-white/[0.08] bg-[#0E1F3D] p-7 text-center">
        <p className="text-white/40 text-sm">Loading your classes…</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* ── HEADER + CREATE TOGGLE ── */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2.5 text-[#FFB454]">
          <IconUsers className="w-4 h-4" />
          <h2 className="text-xs font-semibold text-white uppercase tracking-widest">
            Your Classes
          </h2>
        </div>
        <button
          onClick={() => { setShowForm((s) => !s); setError(""); }}
          className="px-4 py-2 bg-[#FFB454] hover:bg-[#FFC678] text-[#050D1A] text-sm font-extrabold rounded-xl transition-colors cursor-pointer"
        >
          {showForm ? "Cancel" : "+ New Class"}
        </button>
      </div>

      {/* ── CREATE FORM ── */}
      {showForm && (
        <form
          onSubmit={handleCreate}
          className="rounded-2xl border border-[#FFB454]/25 bg-[#0E1F3D] p-7 space-y-4"
        >
          <div>
            <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-1.5">
              Class name
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => { setForm({ ...form, name: e.target.value }); setError(""); }}
              placeholder="e.g. 12A Mathematics"
              maxLength={60}
              className={INPUT_CLS}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-1.5">
                Subject
              </label>
              <select
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                className={SELECT_CLS}
              >
                {SUBJECTS.map((s) => <option key={s} value={s} className="bg-[#0E1F3D]">{s}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-1.5">
                Grade
              </label>
              <select
                value={form.grade}
                onChange={(e) => setForm({ ...form, grade: e.target.value })}
                className={SELECT_CLS}
              >
                {GRADES.map((g) => <option key={g} value={g} className="bg-[#0E1F3D]">{g}</option>)}
              </select>
            </div>
          </div>

          {error && (
            <div className="flex items-start gap-2.5 bg-red-400/10 border border-red-400/30 rounded-xl px-4 py-3">
              <IconWarning className="w-4 h-4 text-red-300 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-red-300">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={creating}
            className="w-full py-3 bg-[#FFB454] hover:bg-[#FFC678] disabled:opacity-60 disabled:cursor-not-allowed text-[#050D1A] font-extrabold rounded-xl transition-colors text-sm cursor-pointer"
          >
            {creating ? "Creating…" : "Create class & get join code"}
          </button>
        </form>
      )}

      {/* ── EMPTY STATE ── */}
      {classes.length === 0 && !showForm && (
        <div className="rounded-2xl border border-white/[0.08] bg-[#0E1F3D] p-10 text-center">
          <div className="w-14 h-14 rounded-xl bg-[#FFB454]/15 border border-[#FFB454]/25 flex items-center justify-center text-[#FFB454] mx-auto mb-4">
            <IconUsers className="w-7 h-7" />
          </div>
          <h3 className="text-white font-bold text-lg mb-1.5">Create your first class</h3>
          <p className="text-white/50 text-sm leading-relaxed max-w-md mx-auto mb-5">
            You&apos;ll get a join code to share with your learners. As they practise on
            NexiStudy, their results roll up into a live heatmap of exactly what your
            class is stuck on.
          </p>
          <button
            onClick={() => setShowForm(true)}
            className="px-5 py-2.5 bg-[#FFB454] hover:bg-[#FFC678] text-[#050D1A] text-sm font-extrabold rounded-xl transition-colors cursor-pointer"
          >
            + New Class
          </button>
        </div>
      )}

      {/* ── CLASS CARDS ── */}
      {classes.map((cls) => (
        <div key={cls.id} className="rounded-2xl border border-white/[0.08] bg-[#0E1F3D] overflow-hidden">

          {/* Card header */}
          <div className="px-6 py-5 border-b border-white/10 bg-white/[0.03] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="min-w-0">
              <h3 className="text-white font-bold text-lg truncate">{cls.name}</h3>
              <p className="text-white/45 text-sm mt-0.5">
                {cls.subject} · {cls.grade} · {cls.memberCount}{" "}
                {cls.memberCount === 1 ? "learner" : "learners"}
              </p>
            </div>
            <button
              onClick={() => handleDelete(cls.id, cls.name)}
              className="self-start sm:self-auto text-white/30 hover:text-red-300 text-xs font-semibold transition-colors cursor-pointer"
            >
              Delete
            </button>
          </div>

          {/* Join code + share */}
          <div className="px-6 py-5 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-white/35 mb-1.5">
                Class join code
              </p>
              <div className="flex items-center gap-3">
                <span className="font-mono text-2xl font-extrabold text-[#FFB454] tracking-[0.2em]">
                  {cls.joinCode}
                </span>
                <button
                  onClick={() => copyCode(cls.id, cls.joinCode)}
                  className="px-3 py-1.5 rounded-lg border border-white/15 hover:border-[#FFB454]/50 text-white/70 hover:text-white text-xs font-semibold transition-colors cursor-pointer"
                >
                  {copiedId === cls.id ? (
                    <span className="flex items-center gap-1 text-emerald-300">
                      <IconCheck className="w-3.5 h-3.5" /> Copied
                    </span>
                  ) : (
                    "Copy"
                  )}
                </button>
              </div>
              <p className="text-white/35 text-xs mt-2 leading-relaxed max-w-xs">
                Learners enter this on their dashboard under &ldquo;Join a class&rdquo;.
              </p>
            </div>
            <ShareToClassroom
              path={`/dashboard?join=${cls.joinCode}`}
              label="Invite via Google Classroom →"
            />
          </div>

          {/* Heatmap */}
          <div className="px-6 py-5">
            <div className="flex items-center gap-2.5 text-[#FFB454] mb-4">
              <IconChartBar className="w-4 h-4" />
              <h4 className="text-xs font-semibold text-white uppercase tracking-widest">
                Class Weak-Spots Heatmap
              </h4>
            </div>

            {cls.memberCount === 0 ? (
              <p className="text-white/45 text-sm leading-relaxed">
                No learners yet. Share the join code above — the heatmap fills in as
                your class starts practising.
              </p>
            ) : !cls.heatmap?.practisedAny ? (
              <p className="text-white/45 text-sm leading-relaxed">
                {cls.memberCount} {cls.memberCount === 1 ? "learner has" : "learners have"} joined,
                but nobody&apos;s practised yet. As soon as they take a {cls.subject} quiz,
                you&apos;ll see exactly which topics need attention.
              </p>
            ) : (
              <ul className="space-y-3.5">
                {cls.heatmap.rows.map((row) => (
                  <li key={row.topicId} className="flex items-center gap-4">
                    <span className="w-44 sm:w-56 text-sm text-white/70 truncate flex-shrink-0">
                      {row.name}
                    </span>
                    <div className="flex-1 h-2.5 bg-white/10 rounded-full overflow-hidden">
                      {row.learnersPractised > 0 && (
                        <div
                          className={`h-full rounded-full ${barColor(row.avgMastery)}`}
                          style={{ width: `${Math.max(row.avgMastery, 4)}%` }}
                        />
                      )}
                    </div>
                    <span className="w-28 text-right flex-shrink-0">
                      {row.learnersPractised > 0 ? (
                        <>
                          <span className="text-sm font-bold text-white">{row.avgMastery}%</span>
                          <span className="block text-[10px] text-white/35">
                            {row.learnersPractised}/{cls.memberCount} practised
                          </span>
                        </>
                      ) : (
                        <span className="text-[10px] text-white/30">Not practised</span>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            )}

            {cls.heatmap?.practisedAny && (
              <div className="flex items-center gap-4 mt-5 pt-4 border-t border-white/10 text-[10px] text-white/40">
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-red-400" /> Needs work</span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-300" /> Getting there</span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-400" /> Strong</span>
                <span className="ml-auto flex items-center gap-1.5 text-white/30">
                  <IconTarget className="w-3.5 h-3.5" /> Weakest topics first
                </span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

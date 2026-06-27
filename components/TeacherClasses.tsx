"use client";

import { useEffect, useState } from "react";
import ShareToClassroom from "@/components/ShareToClassroom";
import { IconChartBar, IconUsers, IconTarget, IconWarning, IconCheck, IconClock, IconDocumentText, IconUser } from "@/components/icons";

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
interface ClassTopic {
  id: string;
  name: string;
}
interface Assignment {
  id: string;
  topicId: string;
  topicName: string;
  numQuestions: number;
  dueDate: string | null;
  createdAt: string;
  attemptedCount: number;
  averageScore: number | null;
}
interface Learner {
  userId: string;
  name: string;
  questionsAttempted: number;
  weakestTopic: string | null;
  weakestMastery: number | null;
}
interface TeacherClass {
  id: string;
  name: string;
  subject: string;
  grade: string;
  joinCode: string;
  memberCount: number;
  heatmap: Heatmap | null;
  topics: ClassTopic[];
  assignments: Assignment[];
  learners: Learner[];
}

const QUESTION_CHOICES = [5, 8, 10, 15, 20];

// Sample data for the zero-learners heatmap preview, so a teacher can see the
// value before anyone has joined. Greyed out + clearly labelled "Example".
const SAMPLE_HEATMAP: { name: string; mastery: number }[] = [
  { name: "Trigonometry", mastery: 41 },
  { name: "Financial Maths", mastery: 57 },
  { name: "Functions & Graphs", mastery: 63 },
  { name: "Euclidean Geometry", mastery: 70 },
  { name: "Algebra & Equations", mastery: 78 },
  { name: "Statistics", mastery: 88 },
];

function formatDue(iso: string): string {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-ZA", { day: "numeric", month: "short", year: "numeric" });
}

function isOverdue(iso: string): boolean {
  const due = new Date(iso + "T23:59:59");
  return due.getTime() < Date.now();
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

  // Per-class "Set Practice Assignment" form state. Only one open at a time.
  const [assignClassId, setAssignClassId] = useState<string | null>(null);
  const [assignForm, setAssignForm] = useState({ topicId: "", numQuestions: 8, dueDate: "" });
  const [assigning, setAssigning] = useState(false);
  const [assignError, setAssignError] = useState("");

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

  function openAssignForm(cls: TeacherClass) {
    setAssignClassId(cls.id);
    setAssignError("");
    setAssignForm({ topicId: cls.topics[0]?.id ?? "", numQuestions: 8, dueDate: "" });
  }

  async function handleAssign(e: React.FormEvent, classId: string) {
    e.preventDefault();
    if (!assignForm.topicId) return setAssignError("Pick a topic to assign.");
    setAssigning(true);
    setAssignError("");
    try {
      const res = await fetch("/api/teacher/assignments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          classId,
          topicId: assignForm.topicId,
          numQuestions: assignForm.numQuestions,
          dueDate: assignForm.dueDate || null,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setAssignError(data.error ?? "Could not set the assignment.");
        setAssigning(false);
        return;
      }
      setAssignClassId(null);
      await load();
    } catch {
      setAssignError("Something went wrong. Please try again.");
    } finally {
      setAssigning(false);
    }
  }

  async function handleDeleteAssignment(assignmentId: string, topicName: string) {
    if (!confirm(`Remove the "${topicName}" assignment?`)) return;
    await fetch("/api/teacher/assignments", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ assignmentId }),
    });
    await load();
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

          {/* Invite your learners — two clearly labelled options */}
          <div className="px-6 py-5 border-b border-white/10">
            <h4 className="text-xs font-semibold text-white uppercase tracking-widest mb-1">
              Invite your learners
            </h4>
            <p className="text-white/45 text-sm mb-4">
              Two ways to get your class in — use whichever is easier.
            </p>

            <div className="grid sm:grid-cols-2 gap-4">

              {/* Option 1 — the join code (always works) */}
              <div className="rounded-xl border border-[#FFB454]/25 bg-[#FFB454]/[0.04] p-4">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-5 h-5 rounded-full bg-[#FFB454] text-[#050D1A] text-[11px] font-extrabold flex items-center justify-center flex-shrink-0">
                    1
                  </span>
                  <span className="text-white font-semibold text-sm">Give them this code</span>
                </div>
                <div className="flex items-center gap-3 mb-3">
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
                <p className="text-white/45 text-xs leading-relaxed">
                  Learners log into NexiStudy, open their dashboard, and type this code into
                  the <span className="text-white/70 font-medium">&ldquo;Join a class&rdquo;</span> box.
                  Works for everyone — no Google needed.
                </p>
              </div>

              {/* Option 2 — Google Classroom (optional) */}
              <div className="rounded-xl border border-white/[0.08] bg-[#0B1A33] p-4">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-5 h-5 rounded-full border border-white/25 text-white/60 text-[11px] font-extrabold flex items-center justify-center flex-shrink-0">
                    2
                  </span>
                  <span className="text-white font-semibold text-sm">Or post it to Google Classroom</span>
                  <span className="ml-auto text-[10px] font-semibold uppercase tracking-widest text-white/30">
                    Optional
                  </span>
                </div>
                <ShareToClassroom
                  path={`/dashboard?join=${cls.joinCode}`}
                  label="Post join link to Classroom"
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-white/15 hover:border-[#FFB454]/50 text-white/80 hover:text-white text-sm font-semibold transition-colors cursor-pointer"
                />
                <p className="text-white/45 text-xs leading-relaxed mt-3">
                  Opens <span className="text-white/70 font-medium">your own</span> Google Classroom and
                  posts a clickable join link to a class you pick. Only handy if you already use
                  Google Classroom with these students — otherwise just share the code.
                </p>
              </div>

            </div>
          </div>

          {/* Set Practice Assignment */}
          <div className="px-6 py-5 border-b border-white/10">
            <div className="flex items-center justify-between gap-4 mb-1">
              <div className="flex items-center gap-2.5 text-[#FFB454]">
                <IconDocumentText className="w-4 h-4" />
                <h4 className="text-xs font-semibold text-white uppercase tracking-widest">
                  Practice Assignments
                </h4>
              </div>
              <button
                onClick={() => (assignClassId === cls.id ? setAssignClassId(null) : openAssignForm(cls))}
                className="px-3.5 py-1.5 bg-[#FFB454] hover:bg-[#FFC678] text-[#050D1A] text-xs font-extrabold rounded-lg transition-colors cursor-pointer"
              >
                {assignClassId === cls.id ? "Cancel" : "+ Set Assignment"}
              </button>
            </div>
            <p className="text-white/45 text-sm mb-4">
              Set a topic for the class to practise — you&apos;ll see how many have
              attempted it and their average score.
            </p>

            {/* Assignment form */}
            {assignClassId === cls.id && (
              cls.topics.length === 0 ? (
                <p className="text-white/45 text-sm mb-4">
                  No topics are available for this subject and grade yet.
                </p>
              ) : (
                <form
                  onSubmit={(e) => handleAssign(e, cls.id)}
                  className="rounded-xl border border-[#FFB454]/25 bg-[#FFB454]/[0.04] p-4 space-y-4 mb-4"
                >
                  <div>
                    <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-1.5">
                      Topic
                    </label>
                    <select
                      value={assignForm.topicId}
                      onChange={(e) => setAssignForm({ ...assignForm, topicId: e.target.value })}
                      className={SELECT_CLS}
                    >
                      {cls.topics.map((t) => (
                        <option key={t.id} value={t.id} className="bg-[#0E1F3D]">{t.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-1.5">
                        Number of questions
                      </label>
                      <select
                        value={assignForm.numQuestions}
                        onChange={(e) => setAssignForm({ ...assignForm, numQuestions: Number(e.target.value) })}
                        className={SELECT_CLS}
                      >
                        {QUESTION_CHOICES.map((n) => (
                          <option key={n} value={n} className="bg-[#0E1F3D]">{n} questions</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-1.5">
                        Due date <span className="text-white/30 normal-case font-normal">(optional)</span>
                      </label>
                      <input
                        type="date"
                        value={assignForm.dueDate}
                        onChange={(e) => setAssignForm({ ...assignForm, dueDate: e.target.value })}
                        className={INPUT_CLS + " [color-scheme:dark]"}
                      />
                    </div>
                  </div>

                  {assignError && (
                    <div className="flex items-start gap-2.5 bg-red-400/10 border border-red-400/30 rounded-xl px-4 py-3">
                      <IconWarning className="w-4 h-4 text-red-300 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-red-300">{assignError}</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={assigning}
                    className="w-full py-3 bg-[#FFB454] hover:bg-[#FFC678] disabled:opacity-60 disabled:cursor-not-allowed text-[#050D1A] font-extrabold rounded-xl transition-colors text-sm cursor-pointer"
                  >
                    {assigning ? "Assigning…" : "Assign to class"}
                  </button>
                </form>
              )
            )}

            {/* Existing assignments + completion tracker */}
            {cls.assignments.length === 0 ? (
              assignClassId !== cls.id && (
                <p className="text-white/40 text-sm">No assignments set yet.</p>
              )
            ) : (
              <ul className="space-y-3">
                {cls.assignments.map((a) => (
                  <li key={a.id} className="rounded-xl border border-white/[0.08] bg-[#0B1A33] p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-white font-semibold text-sm truncate">{a.topicName}</p>
                        <p className="text-white/45 text-xs mt-0.5">
                          {a.numQuestions} questions
                          {a.dueDate && (
                            <>
                              {" · "}
                              <span className={`inline-flex items-center gap-1 align-middle ${isOverdue(a.dueDate) ? "text-red-300" : "text-white/60"}`}>
                                <IconClock className="w-3.5 h-3.5" />
                                Due {formatDue(a.dueDate)}
                              </span>
                            </>
                          )}
                        </p>
                      </div>
                      <button
                        onClick={() => handleDeleteAssignment(a.id, a.topicName)}
                        className="text-white/30 hover:text-red-300 text-xs font-semibold transition-colors cursor-pointer flex-shrink-0"
                      >
                        Remove
                      </button>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 mt-3 pt-3 border-t border-white/10 text-xs">
                      <span className="flex items-center gap-1.5 text-white/60">
                        <IconUsers className="w-3.5 h-3.5 text-[#FFB454]" />
                        {a.attemptedCount}/{cls.memberCount} attempted
                      </span>
                      <span className="flex items-center gap-1.5 text-white/60">
                        <IconChartBar className="w-3.5 h-3.5 text-[#FFB454]" />
                        {a.averageScore !== null ? `Average ${a.averageScore}%` : "No attempts yet"}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
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
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#FFB454] bg-[#FFB454]/15 border border-[#FFB454]/25 rounded-md px-2 py-0.5">
                    Example
                  </span>
                  <p className="text-white/45 text-xs">
                    Your class heatmap will look like this as learners practise.
                  </p>
                </div>
                <ul className="space-y-3.5 opacity-50 select-none pointer-events-none" aria-hidden>
                  {SAMPLE_HEATMAP.map((s) => (
                    <li key={s.name} className="flex items-center gap-4">
                      <span className="w-44 sm:w-56 text-sm text-white/70 truncate flex-shrink-0">
                        {s.name}
                      </span>
                      <div className="flex-1 h-2.5 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${barColor(s.mastery)}`}
                          style={{ width: `${s.mastery}%` }}
                        />
                      </div>
                      <span className="w-28 text-right flex-shrink-0 text-sm font-bold text-white">
                        {s.mastery}%
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="text-white/40 text-xs mt-4">
                  Share the join code above and this fills with your class&apos;s real data.
                </p>
              </div>
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

          {/* Individual learners — see at a glance who needs help */}
          {cls.memberCount > 0 && (
            <div className="px-6 py-5 border-t border-white/10">
              <div className="flex items-center gap-2.5 text-[#FFB454] mb-1">
                <IconUser className="w-4 h-4" />
                <h4 className="text-xs font-semibold text-white uppercase tracking-widest">
                  Learners
                </h4>
              </div>
              <p className="text-white/45 text-sm mb-4">
                See at a glance who needs help before the exam.
              </p>
              <ul className="divide-y divide-white/[0.06]">
                {cls.learners.map((lr) => (
                  <li key={lr.userId} className="flex items-center justify-between gap-4 py-3">
                    <div className="min-w-0">
                      <p className="text-sm text-white/85 font-medium truncate">{lr.name}</p>
                      <p className="text-white/40 text-xs mt-0.5">
                        {lr.questionsAttempted}{" "}
                        {lr.questionsAttempted === 1 ? "question" : "questions"} attempted
                      </p>
                    </div>
                    <div className="text-right flex-shrink-0 max-w-[48%]">
                      {lr.weakestTopic ? (
                        <>
                          <p className="text-[10px] uppercase tracking-wider text-white/30">
                            Weakest topic
                          </p>
                          <p className="text-xs text-amber-300 font-medium truncate">
                            {lr.weakestTopic}
                            {lr.weakestMastery !== null ? ` · ${lr.weakestMastery}%` : ""}
                          </p>
                        </>
                      ) : (
                        <p className="text-xs text-white/30">Not practised yet</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

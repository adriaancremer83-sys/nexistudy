"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Nexi from "@/components/Nexi";
import { IconWarning } from "@/components/icons";

const LANGUAGES = [
  "English",
  "Afrikaans",
  "isiZulu",
  "isiXhosa",
  "Sepedi",
  "Setswana",
  "Sesotho",
  "Xitsonga",
  "siSwati",
  "Tshivenda",
  "isiNdebele",
];

const GRADES = ["Grade 8", "Grade 9", "Grade 10", "Grade 11", "Grade 12"];

const SUBJECTS = [
  "English Home Language",
  "Afrikaans First Additional Language",
  "isiZulu Home Language",
  "Mathematics",
  "Mathematical Literacy",
  "Physical Sciences",
  "Life Sciences",
  "Geography",
  "History",
  "Accounting",
  "Business Studies",
  "Economics",
  "Agricultural Sciences",
  "Computer Applications Technology",
  "Information Technology",
  "Consumer Studies",
  "Hospitality Studies",
  "Tourism",
  "Visual Arts",
  "Life Orientation",
];

const SELECT_CLS =
  "w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#00D4FF]/40 focus:border-[#00D4FF] transition-colors cursor-pointer";

export default function OnboardingPage() {
  const router = useRouter();
  const { data: session, status, update } = useSession();

  const [language, setLanguage] = useState("English");
  const [grade, setGrade] = useState("");
  const [school, setSchool] = useState("");
  const [subjects, setSubjects] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  // Send unauthenticated visitors to login; learners who've already set up go
  // straight to Study Pro. Prefill whatever we already know from the session.
  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
      return;
    }
    if (status === "authenticated") {
      const u = session.user;
      if (u.role === "teacher") {
        router.replace("/teachers/dashboard");
        return;
      }
      if (u.onboarded) {
        router.replace("/studypro");
        return;
      }
      setLanguage(u.language || "English");
      setGrade(u.grade || "");
      setSchool(u.school || "");
      setSubjects(Array.isArray(u.subjects) ? u.subjects : []);
    }
  }, [status, session, router]);

  function toggleSubject(s: string) {
    setError("");
    setSubjects((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!grade) return setError("Please choose your grade.");
    if (subjects.length === 0) return setError("Pick at least one subject you take.");

    setSaving(true);
    setError("");
    try {
      const res = await fetch("/api/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ language, grade, school, subjects }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Could not save your setup. Please try again.");
        setSaving(false);
        return;
      }
      // Refresh the session so the dashboard/Study Pro see the new values
      // without forcing a re-login.
      await update({ language, grade, school, subjects, onboarded: true });
      router.push("/studypro");
    } catch {
      setError("Something went wrong. Please try again.");
      setSaving(false);
    }
  }

  if (status !== "authenticated" || session.user.onboarded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-white/40 text-sm">Loading…</p>
      </div>
    );
  }

  const firstName = (session.user.name ?? "there").split(" ")[0];

  return (
    <div className="min-h-screen page-hero py-14 px-4">
      <div className="max-w-2xl mx-auto">

        {/* Welcome */}
        <div className="flex items-center gap-5 mb-8">
          <div className="animate-float flex-shrink-0">
            <Nexi pose="wave" width={88} height={88} className="h-20 w-auto object-contain" priority />
          </div>
          <div>
            <p className="text-[#00D4FF] text-sm font-semibold mb-1">Welcome to NexiStudy</p>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
              Let&apos;s set you up, {firstName}
            </h1>
            <p className="text-white/50 text-sm mt-1">
              A few quick choices and Nexi tailors everything to you.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="glass rounded-2xl p-6 sm:p-8 space-y-6">

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Language */}
            <div>
              <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">
                I learn best in
              </label>
              <select value={language} onChange={(e) => setLanguage(e.target.value)} className={SELECT_CLS}>
                {LANGUAGES.map((l) => <option key={l}>{l}</option>)}
              </select>
            </div>

            {/* Grade */}
            <div>
              <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">
                My grade
              </label>
              <select value={grade} onChange={(e) => setGrade(e.target.value)} className={SELECT_CLS}>
                <option value="">— Select grade —</option>
                {GRADES.map((g) => <option key={g}>{g}</option>)}
              </select>
            </div>
          </div>

          {/* School */}
          <div>
            <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">
              My school <span className="text-white/30 normal-case font-normal">(optional)</span>
            </label>
            <input
              type="text"
              value={school}
              onChange={(e) => setSchool(e.target.value)}
              placeholder="e.g. Northview High"
              className={SELECT_CLS + " cursor-text placeholder:text-white/25"}
            />
          </div>

          {/* Subjects */}
          <div>
            <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">
              My subjects <span className="text-[#00D4FF] normal-case font-normal">({subjects.length} selected)</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {SUBJECTS.map((s) => {
                const on = subjects.includes(s);
                return (
                  <button
                    key={s}
                    type="button"
                    onClick={() => toggleSubject(s)}
                    aria-pressed={on}
                    className={`px-3.5 py-1.5 rounded-full text-sm border transition-colors ${
                      on
                        ? "bg-[#2D6BE4] border-[#2D6BE4] text-white font-semibold"
                        : "bg-white/[0.03] border-white/15 text-white/60 hover:border-[#00D4FF]/40 hover:text-white"
                    }`}
                  >
                    {s}
                  </button>
                );
              })}
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
            disabled={saving}
            className="w-full py-3.5 bg-[#2D6BE4] hover:bg-[#4A82F0] disabled:opacity-60 disabled:cursor-not-allowed text-white font-extrabold rounded-xl transition-colors text-sm"
          >
            {saving ? "Saving…" : "Save & go to Study Pro →"}
          </button>
          <p className="text-center text-[11px] text-white/35">
            You can change any of this later in Study Pro.
          </p>
        </form>
      </div>
    </div>
  );
}

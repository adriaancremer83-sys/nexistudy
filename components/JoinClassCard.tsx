"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { IconUsers, IconCheck, IconWarning } from "@/components/icons";

interface LearnerClass {
  id: string;
  name: string;
  subject: string;
  grade: string;
}

export default function JoinClassCard({ initialClasses }: { initialClasses: LearnerClass[] }) {
  const searchParams = useSearchParams();
  const [classes, setClasses] = useState<LearnerClass[]>(initialClasses);
  const [code, setCode] = useState("");
  const [joining, setJoining] = useState(false);
  const [error, setError] = useState("");
  const [joined, setJoined] = useState("");

  // Deep link from a teacher's "Invite via Google Classroom" share lands here as
  // /dashboard?join=CODE — prefill so the learner just clicks Join.
  useEffect(() => {
    const fromLink = searchParams.get("join");
    if (fromLink) setCode(fromLink.toUpperCase());
  }, [searchParams]);

  async function handleJoin(e: React.FormEvent) {
    e.preventDefault();
    const clean = code.trim().toUpperCase();
    if (!clean) return setError("Enter your class code.");
    setJoining(true);
    setError("");
    setJoined("");
    try {
      const res = await fetch("/api/classes/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: clean }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Could not join the class.");
        setJoining(false);
        return;
      }
      setJoined(data.className);
      setCode("");
      // Reflect the new class without a full reload — fetch the dashboard data
      // isn't exposed, so just append what we know.
      setClasses((prev) =>
        prev.some((c) => c.name === data.className)
          ? prev
          : [...prev, { id: data.className, name: data.className, subject: "", grade: "" }]
      );
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setJoining(false);
    }
  }

  return (
    <div className="rounded-2xl border border-white/[0.08] bg-[#0E1F3D] p-7">
      <div className="flex items-center gap-2.5 text-[#FFB454] mb-4">
        <IconUsers className="w-4 h-4" />
        <h2 className="text-xs font-semibold text-white uppercase tracking-widest">
          Your Classes
        </h2>
      </div>

      {classes.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-5">
          {classes.map((c) => (
            <span
              key={c.id}
              className="px-3.5 py-1.5 rounded-full text-sm bg-[#FFB454]/10 border border-[#FFB454]/25 text-[#FFB454] font-semibold"
            >
              {c.name}
            </span>
          ))}
        </div>
      )}

      <p className="text-white/50 text-sm leading-relaxed mb-4 max-w-md">
        {classes.length > 0
          ? "Got another code from your teacher? Join another class below."
          : "Your teacher gave you a class code? Enter it here so your practice results help them see what the class needs."}
      </p>

      <form onSubmit={handleJoin} className="flex flex-col sm:flex-row gap-3 max-w-md">
        <input
          type="text"
          value={code}
          onChange={(e) => { setCode(e.target.value.toUpperCase()); setError(""); }}
          placeholder="e.g. K7P2QX"
          maxLength={12}
          className="flex-1 px-4 py-3 bg-white/5 border border-white/15 rounded-xl text-sm text-white font-mono tracking-widest uppercase placeholder:tracking-normal placeholder:font-sans placeholder:text-white/25 focus:outline-none focus:ring-2 focus:ring-[#FFB454]/40 focus:border-[#FFB454] transition-colors"
        />
        <button
          type="submit"
          disabled={joining}
          className="px-6 py-3 bg-[#FFB454] hover:bg-[#FFC678] disabled:opacity-60 disabled:cursor-not-allowed text-[#050D1A] font-extrabold rounded-xl transition-colors text-sm cursor-pointer whitespace-nowrap"
        >
          {joining ? "Joining…" : "Join class"}
        </button>
      </form>

      {error && (
        <div className="flex items-start gap-2.5 bg-red-400/10 border border-red-400/30 rounded-xl px-4 py-3 mt-4 max-w-md">
          <IconWarning className="w-4 h-4 text-red-300 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-red-300">{error}</p>
        </div>
      )}
      {joined && (
        <div className="flex items-start gap-2.5 bg-emerald-400/10 border border-emerald-400/30 rounded-xl px-4 py-3 mt-4 max-w-md">
          <IconCheck className="w-4 h-4 text-emerald-300 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-emerald-200">You&apos;ve joined <strong>{joined}</strong>. Practise away — your teacher will see how the class is doing.</p>
        </div>
      )}
    </div>
  );
}

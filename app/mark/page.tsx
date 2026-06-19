"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useSession } from "next-auth/react";
import ReactMarkdown from "react-markdown";
import Reveal from "@/components/Reveal";
import { IconDocumentText, IconSparkles, IconWarning } from "@/components/icons";

// Subjects where photographing and marking written work is most useful (worked
// solutions, structured answers). Kept focused rather than the full subject list.
const SUBJECTS = [
  "Mathematics",
  "Mathematical Literacy",
  "Physical Sciences",
  "Life Sciences",
  "Accounting",
  "Economics",
  "Business Studies",
  "Geography",
  "History",
  "English Home Language",
  "Afrikaans Home Language",
];
const GRADES = ["Grade 8", "Grade 9", "Grade 10", "Grade 11", "Grade 12"];
const ALLOWED_MEDIA = ["image/jpeg", "image/png", "image/webp"];
const MAX_FILE_BYTES = 5 * 1024 * 1024; // 5MB

const SELECT_CLS =
  "w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#00D4FF]/40 focus:border-[#00D4FF] transition-colors cursor-pointer";

function counterColor(n: number): string {
  if (n >= 3) return "bg-emerald-400/10 text-emerald-300 border-emerald-400/30";
  if (n >= 1) return "bg-amber-400/10 text-amber-300 border-amber-400/30";
  return "bg-red-400/10 text-red-300 border-red-400/30";
}

// Read a File into a bare base64 string (no data: prefix) + its media type.
function fileToBase64(file: File): Promise<{ data: string; mediaType: string }> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = String(reader.result);
      const comma = result.indexOf(",");
      resolve({ data: comma >= 0 ? result.slice(comma + 1) : result, mediaType: file.type });
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

export default function MarkPage() {
  const { data: session, status } = useSession();
  const authed = status === "authenticated";
  const plan: "free" | "premium" = session?.user?.plan ?? "free";

  const [subject, setSubject] = useState("Mathematics");
  const [grade, setGrade] = useState("Grade 12");
  const [questionText, setQuestionText] = useState("");
  const [totalMarks, setTotalMarks] = useState("");

  const [preview, setPreview] = useState<string | null>(null);
  const [imageError, setImageError] = useState("");
  const fileRef = useRef<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [feedback, setFeedback] = useState("");
  const [marking, setMarking] = useState(false);
  const [left, setLeft] = useState<number | null>(null);
  const [limit, setLimit] = useState<number | null>(null);

  // Seed the real remaining count from the server once signed in.
  useEffect(() => {
    if (status !== "authenticated") return;
    fetch("/api/mark")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (d) {
          setLeft(d.remaining);
          setLimit(d.limit);
        }
      })
      .catch(() => {});
  }, [status]);

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    setImageError("");
    const file = e.target.files?.[0];
    if (!file) return;
    if (!ALLOWED_MEDIA.includes(file.type)) {
      setImageError("Please use a JPG, PNG or WebP photo.");
      return;
    }
    if (file.size > MAX_FILE_BYTES) {
      setImageError("That photo is over 5MB. Try a smaller or lower-resolution image.");
      return;
    }
    fileRef.current = file;
    setPreview(URL.createObjectURL(file));
  }

  async function handleMark() {
    if (!authed || marking || !fileRef.current || (left !== null && left <= 0)) return;
    setMarking(true);
    setFeedback("");
    try {
      const image = await fileToBase64(fileRef.current);
      const res = await fetch("/api/mark", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image, subject, grade, questionText, totalMarks }),
      });

      if (res.status === 429) {
        setLeft(0);
        setFeedback("You've used your markings for today. Premium gives you 15 a day.");
        return;
      }
      if (!res.ok || !res.body) {
        const data = await res.json().catch(() => null);
        setFeedback(data?.error ?? "Sorry — something went wrong. Please try again.");
        return;
      }

      const remaining = res.headers.get("X-Markings-Remaining");
      if (remaining !== null) setLeft(Number(remaining));

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setFeedback(acc);
      }
    } catch {
      setFeedback("Connection problem — please try again.");
    } finally {
      setMarking(false);
    }
  }

  const noneLeft = left !== null && left <= 0;

  return (
    <div className="min-h-screen">
      {/* HERO */}
      <section className="page-hero py-14 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#00D4FF] text-sm font-semibold mb-2 uppercase tracking-widest">
            New
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold mb-3 text-white">
            Mark My <span className="text-gradient">Answer</span>
          </h1>
          <p className="text-lg text-white/70 leading-snug max-w-2xl mx-auto">
            Photograph your handwritten answer and Nexi marks it like an NSC examiner —
            method marks, where you lost marks, and exactly how to earn them next time.
          </p>
        </div>
      </section>

      <div className="section-divider" />

      <div className="max-w-4xl mx-auto px-4 py-10 space-y-6">
        {/* SETUP CARD */}
        <Reveal>
          <div className="glass rounded-2xl overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/5">
              <div className="flex items-center gap-2.5 text-[#00D4FF]">
                <IconDocumentText className="w-4 h-4" />
                <h2 className="text-xs font-semibold text-white uppercase tracking-widest">
                  Your answer
                </h2>
              </div>
              {authed ? (
                left !== null && limit !== null ? (
                  <span className={`text-xs font-semibold px-3 py-1.5 rounded-full border ${counterColor(left)}`}>
                    {left} / {limit} today
                  </span>
                ) : null
              ) : (
                <span className="text-xs font-semibold px-3 py-1.5 rounded-full border glass text-white/60">
                  Sign in to mark
                </span>
              )}
            </div>

            <div className="px-6 py-5 space-y-5">
              {/* Subject + grade + total */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[10px] font-semibold uppercase tracking-widest text-white/40 mb-1.5">Subject</label>
                  <select value={subject} onChange={(e) => setSubject(e.target.value)} className={SELECT_CLS}>
                    {SUBJECTS.map((s) => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-semibold uppercase tracking-widest text-white/40 mb-1.5">Grade</label>
                  <select value={grade} onChange={(e) => setGrade(e.target.value)} className={SELECT_CLS}>
                    {GRADES.map((g) => <option key={g}>{g}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-semibold uppercase tracking-widest text-white/40 mb-1.5">Total marks (optional)</label>
                  <input
                    type="number"
                    inputMode="numeric"
                    value={totalMarks}
                    onChange={(e) => setTotalMarks(e.target.value)}
                    placeholder="e.g. 6"
                    className={SELECT_CLS + " placeholder:text-white/25 cursor-text"}
                  />
                </div>
              </div>

              {/* Question text */}
              <div>
                <label className="block text-[10px] font-semibold uppercase tracking-widest text-white/40 mb-1.5">
                  The question (optional, but improves marking)
                </label>
                <textarea
                  value={questionText}
                  onChange={(e) => setQuestionText(e.target.value)}
                  rows={2}
                  placeholder="Type or paste the exam question here…"
                  className={SELECT_CLS + " resize-none placeholder:text-white/25 cursor-text"}
                />
              </div>

              {/* Photo upload */}
              <div>
                <label className="block text-[10px] font-semibold uppercase tracking-widest text-white/40 mb-1.5">
                  Photo of your written answer
                </label>
                <input
                  ref={inputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  capture="environment"
                  onChange={handleFile}
                  className="hidden"
                />
                {!preview ? (
                  <button
                    onClick={() => inputRef.current?.click()}
                    className="w-full border-2 border-dashed border-white/20 hover:border-[#00D4FF]/50 rounded-2xl py-10 text-center transition-colors cursor-pointer"
                  >
                    <p className="text-sm font-semibold text-white">Tap to take or upload a photo</p>
                    <p className="text-xs text-white/40 mt-1">JPG, PNG or WebP · under 5MB</p>
                  </button>
                ) : (
                  <div className="relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={preview} alt="Your answer" className="w-full max-h-96 object-contain rounded-2xl border border-white/10 bg-black/30" />
                    <button
                      onClick={() => inputRef.current?.click()}
                      className="absolute bottom-3 right-3 px-3 py-1.5 rounded-lg bg-[#0A1628]/90 border border-white/20 text-white text-xs font-semibold hover:border-[#00D4FF]/60 transition-colors cursor-pointer"
                    >
                      Change photo
                    </button>
                  </div>
                )}
                {imageError && (
                  <p className="flex items-center gap-1.5 text-xs text-red-300 mt-2">
                    <IconWarning className="w-3.5 h-3.5" /> {imageError}
                  </p>
                )}
              </div>

              {/* Action */}
              {!authed ? (
                <div className="text-center py-2">
                  <p className="text-sm text-white/50 mb-2">Sign in to have Nexi mark your work.</p>
                  <Link href="/login" className="text-sm font-semibold text-[#00D4FF] hover:text-white transition-colors">
                    Sign in or create a free account →
                  </Link>
                </div>
              ) : noneLeft ? (
                <div className="text-center py-2">
                  <p className="text-sm text-white/50 mb-2">You&apos;ve used your markings for today.</p>
                  <Link href="/pricing" className="text-sm font-semibold text-[#00D4FF] hover:text-white transition-colors">
                    Go Premium for 15 markings a day →
                  </Link>
                </div>
              ) : (
                <button
                  onClick={handleMark}
                  disabled={!fileRef.current || marking}
                  className="w-full px-5 py-3 bg-[#2D6BE4] hover:bg-[#4A82F0] disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold text-sm rounded-xl transition-all shadow-lg shadow-[#2D6BE4]/30 hover:shadow-[#00D4FF]/30 cursor-pointer"
                >
                  {marking ? "Nexi is marking…" : "Mark my answer"}
                </button>
              )}
            </div>
          </div>
        </Reveal>

        {/* FEEDBACK */}
        {(feedback || marking) && (
          <Reveal>
            <div className="glass rounded-2xl overflow-hidden">
              <div className="flex items-center gap-2.5 px-6 py-4 border-b border-white/10 bg-white/5 text-[#00D4FF]">
                <IconSparkles className="w-4 h-4" />
                <h2 className="text-xs font-semibold text-white uppercase tracking-widest">Examiner feedback</h2>
              </div>
              <div className="px-6 py-5">
                {feedback ? (
                  <div className="nexi-md text-white text-sm leading-relaxed">
                    <ReactMarkdown>{feedback}</ReactMarkdown>
                  </div>
                ) : (
                  <p className="text-white/50 italic text-sm">Nexi is reading your answer…</p>
                )}

                {plan === "free" && feedback && !marking && (
                  <p className="text-[11px] text-white/45 leading-relaxed mt-4 pt-4 border-t border-white/10">
                    ✨ This is the free taste. {" "}
                    <Link href="/pricing" className="text-[#00D4FF] hover:text-white transition-colors font-semibold">
                      Premium
                    </Link>{" "}
                    gives a full mark-by-mark breakdown, a model answer, and 15 markings a day.
                  </p>
                )}
              </div>
            </div>
          </Reveal>
        )}

        <p className="text-[11px] text-white/30 text-center leading-relaxed">
          Nexi marks to NSC/CAPS standards as a guide. Marks are an estimate — your teacher&apos;s
          official memo is the final word.
        </p>
      </div>
    </div>
  );
}

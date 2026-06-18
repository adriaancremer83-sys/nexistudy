"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { IconChartBar, IconUsers, IconTarget, IconWarning, IconCheck } from "@/components/icons";
import WhatsAppHelp from "@/components/WhatsAppHelp";
import GoogleSignInButton, { AuthDivider } from "@/components/GoogleSignInButton";

const INPUT_CLS =
  "w-full px-4 py-3 bg-white/5 border border-white/15 rounded-xl text-sm text-white placeholder:text-white/25 focus:outline-none focus:ring-2 focus:ring-[#FFB454]/40 focus:border-[#FFB454] transition-colors";

const BENEFITS = [
  {
    icon: IconChartBar,
    title: "See what your class is stuck on",
    desc: "A weak-spots heatmap built from what your learners actually ask Nexi — so Monday's lesson targets the real gaps, not guesses.",
  },
  {
    icon: IconUsers,
    title: "Works with Google Classroom",
    desc: "Share NexiStudy practice straight into your Classroom stream. We complement your classroom — we don't replace it.",
  },
  {
    icon: IconTarget,
    title: "Free for teachers, forever",
    desc: "Teacher accounts cost nothing — no trials, no limits. You bring the teaching; we bring the data.",
  },
];

export default function TeachersPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [mode, setMode] = useState<"signup" | "login">("signup");
  const [form, setForm] = useState({ name: "", school: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Already signed in as a teacher → straight to the dashboard.
  useEffect(() => {
    if (status === "authenticated" && session?.user?.role === "teacher") {
      router.replace("/teachers/dashboard");
    }
  }, [status, session, router]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (mode === "signup") {
        const res = await fetch("/api/teacher-signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        const data = await res.json();
        if (!res.ok) {
          setError(data.error ?? "Something went wrong. Please try again.");
          setLoading(false);
          return;
        }
      }

      const result = await signIn("credentials", {
        email: form.email,
        password: form.password,
        redirect: false,
      });

      if (result?.ok) {
        router.push("/teachers/dashboard");
      } else {
        setError("Invalid email or password.");
        setLoading(false);
      }
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen">

      {/* ── HERO ── */}
      <section className="page-hero py-20 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

          {/* Pitch */}
          <div className="text-center lg:text-left">
            <p className="text-sm font-bold uppercase tracking-widest text-[#FFB454] mb-4">
              For Teachers
            </p>
            <h1 className="text-4xl sm:text-5xl font-extrabold leading-[1.12] mb-6 text-white">
              Teach with data,{" "}
              <span className="italic text-[#FFB454]">not guesswork</span>
            </h1>
            <p className="text-lg text-white/65 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Your learners already ask Nexi for help every evening. A free teacher
              account shows you what your class is collectively struggling with —
              before the test does.
            </p>

            <div className="space-y-5 text-left max-w-md mx-auto lg:mx-0">
              {BENEFITS.map((b) => (
                <div key={b.title} className="flex items-start gap-4">
                  <span className="flex-shrink-0 mt-0.5 text-[#FFB454]">
                    <b.icon className="w-7 h-7" />
                  </span>
                  <div>
                    <h3 className="text-white font-bold text-sm mb-1">{b.title}</h3>
                    <p className="text-white/50 text-sm leading-relaxed">{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Auth card */}
          <div className="w-full max-w-md mx-auto rounded-2xl border border-white/[0.08] bg-[#0E1F3D] p-8">
            <div className="mb-7">
              <h2 className="text-2xl font-extrabold text-white mb-1">
                {mode === "signup" ? "Create your free teacher account" : "Teacher sign in"}
              </h2>
              <p className="text-white/50 text-sm">
                {mode === "signup" ? "Already registered? " : "New to NexiStudy? "}
                <button
                  type="button"
                  onClick={() => { setMode(mode === "signup" ? "login" : "signup"); setError(""); }}
                  className="text-[#FFB454] font-semibold hover:text-white transition-colors cursor-pointer"
                >
                  {mode === "signup" ? "Sign in" : "Create an account"}
                </button>
              </p>
            </div>

            <GoogleSignInButton
              role="teacher"
              callbackUrl="/teachers/dashboard"
              label={mode === "signup" ? "Sign up with Google" : "Sign in with Google"}
            />
            <AuthDivider />

            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === "signup" && (
                <>
                  <div>
                    <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-1.5">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="e.g. Mr. P Naidoo"
                      required
                      autoComplete="name"
                      className={INPUT_CLS}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-1.5">
                      School
                    </label>
                    <input
                      type="text"
                      name="school"
                      value={form.school}
                      onChange={handleChange}
                      placeholder="e.g. Northview High"
                      required
                      className={INPUT_CLS}
                    />
                  </div>
                </>
              )}

              <div>
                <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@school.co.za"
                  required
                  autoComplete="email"
                  className={INPUT_CLS}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-1.5">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder={mode === "signup" ? "At least 6 characters" : "Your password"}
                  required
                  minLength={6}
                  autoComplete={mode === "signup" ? "new-password" : "current-password"}
                  className={INPUT_CLS}
                />
              </div>

              {error && (
                <div className="flex items-start gap-2.5 bg-red-400/10 border border-red-400/30 rounded-xl px-4 py-3">
                  <IconWarning className="w-4 h-4 text-red-300 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-red-300">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-[#FFB454] hover:bg-[#FFC678] disabled:opacity-60 disabled:cursor-not-allowed text-[#050D1A] font-extrabold rounded-xl transition-colors text-sm mt-2 cursor-pointer"
              >
                {loading
                  ? "One moment…"
                  : mode === "signup"
                    ? "Create Free Teacher Account"
                    : "Sign In"}
              </button>
            </form>

            <div className="flex items-center gap-2.5 mt-5 text-xs text-white/40">
              <IconCheck className="w-3.5 h-3.5 text-[#FFB454] flex-shrink-0" />
              Free forever for teachers · POPIA compliant
            </div>
          </div>

        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-16 px-4 border-t border-white/[0.06]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm font-bold uppercase tracking-widest text-[#FFB454] mb-3">
              Up and running in minutes
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              How it works
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                n: "1",
                icon: IconUsers,
                t: "Create a class",
                d: "Pick the subject and grade. You get a short join code — no setup, no admin.",
              },
              {
                n: "2",
                icon: IconCheck,
                t: "Share the code",
                d: "Post it to Google Classroom in one click, or read it out in class. Learners join in seconds.",
              },
              {
                n: "3",
                icon: IconChartBar,
                t: "See the heatmap",
                d: "As your class practises on NexiStudy, the weak-spots heatmap fills with what they're really stuck on.",
              },
            ].map((s) => (
              <div
                key={s.n}
                className="rounded-2xl border border-white/[0.08] bg-[#0E1F3D] p-7 text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-[#FFB454]/15 border border-[#FFB454]/25 text-[#FFB454] flex items-center justify-center mx-auto mb-4">
                  <s.icon className="w-6 h-6" />
                </div>
                <div className="text-[#FFB454] font-extrabold text-sm mb-1">Step {s.n}</div>
                <h3 className="text-white font-bold text-lg mb-2">{s.t}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SAMPLE HEATMAP ── */}
      <section className="py-16 px-4 border-t border-white/[0.06]">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-[#FFB454] mb-3">
              The picture you&apos;ve never had
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-5 leading-tight">
              See exactly what your class is stuck on
            </h2>
            <p className="text-white/60 text-base leading-relaxed mb-6">
              No more guessing which topics to re-teach. NexiStudy turns your learners&apos;
              practice into one clear view — weakest topics first — so Monday&apos;s lesson
              hits the real gaps, not the ones you assume.
            </p>
            <ul className="space-y-3">
              {[
                "Built from real questions your learners answer",
                "Updates automatically as they practise",
                "One heatmap per class — Grade 10, 11 & 12",
              ].map((f) => (
                <li key={f} className="flex items-start gap-3 text-sm text-white/70">
                  <IconCheck className="w-4 h-4 text-[#FFB454] flex-shrink-0 mt-0.5" />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          {/* Illustrative heatmap — real component lives on the teacher dashboard */}
          <div className="rounded-2xl border border-white/[0.08] bg-[#0E1F3D] overflow-hidden">
            <div className="px-6 py-4 border-b border-white/10 bg-white/[0.03] flex items-center justify-between">
              <div className="flex items-center gap-2.5 text-[#FFB454]">
                <IconChartBar className="w-4 h-4" />
                <h3 className="text-xs font-semibold text-white uppercase tracking-widest">
                  12A Mathematics
                </h3>
              </div>
              <span className="text-[10px] font-semibold uppercase tracking-widest text-white/30">
                Example
              </span>
            </div>
            <ul className="p-6 space-y-3.5">
              {[
                { topic: "Trigonometry", mastery: 38, color: "bg-red-400" },
                { topic: "Euclidean Geometry", mastery: 46, color: "bg-red-400" },
                { topic: "Calculus", mastery: 58, color: "bg-amber-300" },
                { topic: "Functions & Graphs", mastery: 67, color: "bg-amber-300" },
                { topic: "Algebra & Equations", mastery: 81, color: "bg-emerald-400" },
                { topic: "Statistics", mastery: 88, color: "bg-emerald-400" },
              ].map((row) => (
                <li key={row.topic} className="flex items-center gap-4">
                  <span className="w-36 sm:w-44 text-sm text-white/70 truncate flex-shrink-0">
                    {row.topic}
                  </span>
                  <div className="flex-1 h-2.5 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${row.color}`}
                      style={{ width: `${row.mastery}%` }}
                    />
                  </div>
                  <span className="w-10 text-right text-sm font-bold text-white flex-shrink-0">
                    {row.mastery}%
                  </span>
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-4 px-6 pb-5 text-[10px] text-white/40">
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-red-400" /> Needs work</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-300" /> Getting there</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-400" /> Strong</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── WORKS WITH GOOGLE CLASSROOM ── */}
      <section className="py-16 px-4 border-t border-white/[0.06]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-sm font-bold uppercase tracking-widest text-[#FFB454] mb-3">
              Works alongside Google Classroom
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 leading-snug">
              We don&apos;t replace your classroom — we cover the gaps
            </h2>
            <p className="text-white/60 text-lg leading-relaxed">
              Keep doing exactly what you do in Google Classroom. NexiStudy picks up where it
              can&apos;t reach: the learner stuck on homework at 9pm, and the question you never
              get a straight answer to — <em>what is my class actually battling with?</em>
            </p>
          </div>

          {/* Two jobs, side by side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="rounded-2xl border border-white/[0.08] bg-[#0E1F3D] p-7">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-white/35 mb-3">
                Google Classroom
              </p>
              <h3 className="text-white font-bold text-xl mb-5">Assign &amp; collect the work</h3>
              <ul className="space-y-3">
                {[
                  "Set homework, share resources, post announcements",
                  "Collect submissions and record marks",
                  "Your system of record — nothing changes",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-3 text-sm text-white/60 leading-relaxed">
                    <IconCheck className="w-4 h-4 text-white/40 flex-shrink-0 mt-0.5" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-[#FFB454]/30 bg-[#FFB454]/[0.04] p-7">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-[#FFB454] mb-3">
                NexiStudy
              </p>
              <h3 className="text-white font-bold text-xl mb-5">Help when they&apos;re stuck — and show you the gaps</h3>
              <ul className="space-y-3">
                {[
                  "Step-by-step tutoring 24/7, in 11 official languages",
                  "Topic practice that learners can do on their own",
                  "A live heatmap of what your class is collectively battling",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-3 text-sm text-white/70 leading-relaxed">
                    <IconCheck className="w-4 h-4 text-[#FFB454] flex-shrink-0 mt-0.5" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* The everyday flow */}
          <div className="mt-6 rounded-2xl border border-white/[0.08] bg-[#0E1F3D] p-7">
            <div className="flex items-center gap-2.5 text-[#FFB454] mb-5">
              <IconTarget className="w-4 h-4" />
              <h3 className="text-xs font-semibold text-white uppercase tracking-widest">
                A normal week
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {[
                {
                  t: "You post homework in Classroom",
                  d: "Same as always. Once, you also drop your NexiStudy class code in the stream.",
                },
                {
                  t: "A learner gets stuck at 9pm",
                  d: "Instead of giving up, they open NexiStudy and get unstuck — no answer copied, the concept actually explained.",
                },
                {
                  t: "You check the heatmap",
                  d: "You see the class is weak on, say, Trigonometry — so your next lesson and assignment hit the real gap.",
                },
              ].map((s, i) => (
                <div key={s.t} className="flex items-start gap-3.5">
                  <span className="flex-shrink-0 w-7 h-7 rounded-lg bg-[#FFB454]/15 border border-[#FFB454]/25 text-[#FFB454] font-extrabold text-xs flex items-center justify-center">
                    {i + 1}
                  </span>
                  <div>
                    <h4 className="text-white font-bold text-sm mb-1">{s.t}</h4>
                    <p className="text-white/50 text-sm leading-relaxed">{s.d}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-white/35 text-xs mt-6 leading-relaxed">
              NexiStudy doesn&apos;t read your Classroom assignments or sync marks — it runs
              alongside as the after-hours help desk and the X-ray of your class.
            </p>
          </div>
        </div>
      </section>

      {/* ── LEARNER REDIRECT + WHATSAPP ── */}
      <section className="py-12 px-4 text-center space-y-4">
        <WhatsAppHelp variant="inline" />
        <p className="text-white/40 text-sm">
          Looking for the learner experience?{" "}
          <Link href="/signup" className="text-[#00D4FF] font-semibold hover:text-white transition-colors">
            Create a learner account
          </Link>
        </p>
      </section>

    </div>
  );
}

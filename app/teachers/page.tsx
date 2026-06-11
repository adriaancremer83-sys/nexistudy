"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { IconChartBar, IconUsers, IconTarget, IconWarning, IconCheck } from "@/components/icons";

const INPUT_CLS =
  "w-full px-4 py-3 bg-white/5 border border-white/15 rounded-xl text-sm text-white placeholder:text-white/25 focus:outline-none focus:ring-2 focus:ring-[#00D4AA]/40 focus:border-[#00D4AA] transition-colors";

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
            <p className="text-sm font-bold uppercase tracking-widest text-[#00D4AA] mb-4">
              For Teachers
            </p>
            <h1 className="text-4xl sm:text-5xl font-extrabold leading-[1.12] mb-6 text-white">
              Teach with data,{" "}
              <span className="italic text-[#00D4AA]">not guesswork</span>
            </h1>
            <p className="text-lg text-white/65 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Your learners already ask Nexi for help every evening. A free teacher
              account shows you what your class is collectively struggling with —
              before the test does.
            </p>

            <div className="space-y-5 text-left max-w-md mx-auto lg:mx-0">
              {BENEFITS.map((b) => (
                <div key={b.title} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#00D4AA]/15 flex items-center justify-center flex-shrink-0 text-[#00D4AA]">
                    <b.icon className="w-5 h-5" />
                  </div>
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
                  className="text-[#00D4AA] font-semibold hover:text-white transition-colors cursor-pointer"
                >
                  {mode === "signup" ? "Sign in" : "Create an account"}
                </button>
              </p>
            </div>

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
                className="w-full py-3.5 bg-[#00D4AA] hover:bg-[#1FE5BE] disabled:opacity-60 disabled:cursor-not-allowed text-[#050D1A] font-extrabold rounded-xl transition-colors text-sm mt-2 cursor-pointer"
              >
                {loading
                  ? "One moment…"
                  : mode === "signup"
                    ? "Create Free Teacher Account"
                    : "Sign In"}
              </button>
            </form>

            <div className="flex items-center gap-2.5 mt-5 text-xs text-white/40">
              <IconCheck className="w-3.5 h-3.5 text-[#00D4AA] flex-shrink-0" />
              Free forever for teachers · POPIA compliant
            </div>
          </div>

        </div>
      </section>

      {/* ── LEARNER REDIRECT NOTE ── */}
      <section className="py-12 px-4 text-center">
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

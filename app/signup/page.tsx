"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { IconCheck, IconWarning } from "@/components/icons";

const INPUT_CLS =
  "w-full px-4 py-3 bg-white/5 border border-white/15 rounded-xl text-sm text-white placeholder:text-white/25 focus:outline-none focus:ring-2 focus:ring-[#00D4FF]/40 focus:border-[#00D4FF] transition-colors";

const GRADES = ["Grade 8", "Grade 9", "Grade 10", "Grade 11", "Grade 12"];
const CURRICULA = ["CAPS", "IEB", "Cambridge"];

export default function SignUpPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    grade: "",
    curriculum: "CAPS",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/signup", {
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

      // Auto sign in after successful signup
      const result = await signIn("credentials", {
        email: form.email,
        password: form.password,
        redirect: false,
      });

      if (result?.ok) {
        router.push("/dashboard");
      } else {
        router.push("/login");
      }
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">

      {/* ── Left panel — branding ── */}
      <div className="hidden lg:flex flex-col justify-center items-center lg:w-5/12 px-12 py-16 text-white relative overflow-hidden border-r border-white/10 bg-white/[0.02]">
        <div className="relative animate-float mb-8">
          <div
            aria-hidden
            className="glow-ring absolute inset-0 m-auto w-[105%] h-[105%] rounded-full"
          />
          <Image
            src="/nexi.png"
            alt="Nexi mascot"
            width={260}
            height={260}
            className="relative object-contain drop-shadow-2xl"
            priority
          />
        </div>
        <h2 className="text-3xl font-bold text-center mb-3">
          Join <span className="text-gradient">NexiStudy</span>
        </h2>
        <p className="text-white/50 text-center text-sm leading-relaxed max-w-xs">
          Smart, personalised study tools built for South African learners.
          Start free — no credit card needed.
        </p>
        <div className="mt-8 flex flex-col gap-3 w-full max-w-xs">
          {["CAPS, IEB & Cambridge aligned", "AI Tutor available 24/7", "APS Calculator + Career Roadmap"].map((f) => (
            <div key={f} className="flex items-center gap-2.5 text-sm text-white/70">
              <IconCheck className="w-4 h-4 text-[#00D4FF] flex-shrink-0" />
              {f}
            </div>
          ))}
        </div>
      </div>

      {/* ── Right panel — form ── */}
      <div className="flex-1 flex flex-col justify-center items-center px-4 py-12">

        {/* Mobile logo */}
        <Link href="/" className="lg:hidden mb-8">
          <span className="text-2xl font-bold text-white">
            Nexi<span className="text-[#00D4FF]">Study</span>
          </span>
        </Link>

        <div className="w-full max-w-md glass rounded-2xl p-8">
          <div className="mb-8 text-center lg:text-left">
            <h1 className="text-3xl font-bold text-white mb-1">Create your account</h1>
            <p className="text-white/50 text-sm">
              Already have one?{" "}
              <Link href="/login" className="text-[#00D4FF] font-semibold hover:text-white transition-colors">
                Sign in
              </Link>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="e.g. Thandi Dlamini"
                required
                autoComplete="name"
                className={INPUT_CLS}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
                autoComplete="email"
                className={INPUT_CLS}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-1.5">
                  Grade
                </label>
                <select
                  name="grade"
                  value={form.grade}
                  onChange={handleChange}
                  required
                  className={INPUT_CLS + " cursor-pointer"}
                >
                  <option value="" disabled>Select grade</option>
                  {GRADES.map((g) => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-1.5">
                  Curriculum
                </label>
                <select
                  name="curriculum"
                  value={form.curriculum}
                  onChange={handleChange}
                  required
                  className={INPUT_CLS + " cursor-pointer"}
                >
                  {CURRICULA.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
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
                placeholder="At least 6 characters"
                required
                minLength={6}
                autoComplete="new-password"
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
              className="w-full py-3.5 bg-[#2D6BE4] hover:bg-[#4A82F0] disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all text-sm shadow-lg shadow-[#2D6BE4]/30 hover:shadow-[#00D4FF]/30 mt-2 cursor-pointer"
            >
              {loading ? "Creating account…" : "Create Free Account"}
            </button>
          </form>

          <p className="text-[10px] text-white/40 text-center mt-5 leading-relaxed">
            By signing up you agree to our Terms of Service and Privacy Policy.
            Your data is protected under POPIA.
          </p>
        </div>
      </div>

    </div>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const INPUT_CLS =
  "w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-[#1B2A4A] placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2D6BE4]/30 focus:border-[#2D6BE4] transition-colors bg-white";

export default function SignUpPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
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
    <div className="min-h-screen bg-[#F0F4FF] flex flex-col lg:flex-row">

      {/* ── Left panel — branding ── */}
      <div className="hidden lg:flex flex-col justify-center items-center bg-[#1B2A4A] lg:w-5/12 px-12 py-16 text-white">
        <Image
          src="/nexi.png"
          alt="Nexi mascot"
          width={260}
          height={260}
          className="object-contain drop-shadow-2xl mb-8"
          priority
        />
        <h2 className="text-3xl font-bold text-center mb-3">
          Join <span className="text-[#2D6BE4]">NexiStudy</span>
        </h2>
        <p className="text-gray-400 text-center text-sm leading-relaxed max-w-xs">
          Smart, personalised study tools built for South African learners.
          Start free — no credit card needed.
        </p>
        <div className="mt-8 flex flex-col gap-3 w-full max-w-xs">
          {["CAPS, IEB & Cambridge aligned", "AI Tutor available 24/7", "APS Calculator + Career Roadmap"].map((f) => (
            <div key={f} className="flex items-center gap-2.5 text-sm text-gray-300">
              <span className="text-[#2D6BE4] font-bold flex-shrink-0">✓</span>
              {f}
            </div>
          ))}
        </div>
      </div>

      {/* ── Right panel — form ── */}
      <div className="flex-1 flex flex-col justify-center items-center px-4 py-12">

        {/* Mobile logo */}
        <Link href="/" className="lg:hidden mb-8">
          <span className="text-2xl font-bold text-[#1B2A4A]">
            Nexi<span className="text-[#2D6BE4]">Study</span>
          </span>
        </Link>

        <div className="w-full max-w-md">
          <div className="mb-8 text-center lg:text-left">
            <h1 className="text-3xl font-bold text-[#1B2A4A] mb-1">Create your account</h1>
            <p className="text-gray-500 text-sm">
              Already have one?{" "}
              <Link href="/login" className="text-[#2D6BE4] font-semibold hover:text-[#2558C5]">
                Sign in
              </Link>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
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
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
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

            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
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
              <div className="flex items-start gap-2.5 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                <span className="text-red-500 mt-0.5 flex-shrink-0">⚠</span>
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-[#2D6BE4] hover:bg-[#2558C5] disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-colors text-sm shadow-md shadow-[#2D6BE4]/20 mt-2"
            >
              {loading ? "Creating account…" : "Create Free Account"}
            </button>
          </form>

          <p className="text-[10px] text-gray-400 text-center mt-5 leading-relaxed">
            By signing up you agree to our Terms of Service and Privacy Policy.
            Your data is protected under POPIA.
          </p>
        </div>
      </div>

    </div>
  );
}

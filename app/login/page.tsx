"use client";

import Nexi from "@/components/Nexi";
import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { IconWarning } from "@/components/icons";
import GoogleSignInButton, { AuthDivider } from "@/components/GoogleSignInButton";

const INPUT_CLS =
  "w-full px-4 py-3 bg-white/5 border border-white/15 rounded-xl text-sm text-white placeholder:text-white/25 focus:outline-none focus:ring-2 focus:ring-[#00D4FF]/40 focus:border-[#00D4FF] transition-colors";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/dashboard";

  const [form, setForm] = useState({ email: "", password: "" });
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

    const result = await signIn("credentials", {
      email: form.email,
      password: form.password,
      redirect: false,
    });

    if (result?.ok) {
      router.push(callbackUrl);
      router.refresh();
    } else {
      setError("Incorrect email or password. Please try again.");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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

      <div>
        <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-1.5">
          Password
        </label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Your password"
          required
          autoComplete="current-password"
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
        {loading ? "Signing in…" : "Sign In"}
      </button>
    </form>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">

      {/* ── Left panel — branding ── */}
      <div className="hidden lg:flex flex-col justify-center items-center lg:w-5/12 px-12 py-16 text-white relative overflow-hidden border-r border-white/10 bg-white/[0.02]">
        <div className="relative animate-float mb-8">
          <div
            aria-hidden
            className="glow-ring absolute inset-0 m-auto w-[105%] h-[105%] rounded-full"
          />
          <Nexi
            pose="wave"
            width={260}
            height={260}
            className="relative object-contain drop-shadow-2xl"
            priority
          />
        </div>
        <h2 className="text-3xl font-bold text-center mb-3">
          Welcome back to{" "}
          <span className="text-gradient">NexiStudy</span>
        </h2>
        <p className="text-white/50 text-center text-sm leading-relaxed max-w-xs">
          Your study companion is ready. Pick up right where you left off.
        </p>
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
            <h1 className="text-3xl font-bold text-white mb-1">Sign in</h1>
            <p className="text-white/50 text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="text-[#00D4FF] font-semibold hover:text-white transition-colors">
                Sign up free
              </Link>
            </p>
          </div>

          <GoogleSignInButton role="learner" callbackUrl="/dashboard" label="Sign in with Google" />
          <AuthDivider />

          <Suspense fallback={<div className="h-40" />}>
            <LoginForm />
          </Suspense>
        </div>
      </div>

    </div>
  );
}

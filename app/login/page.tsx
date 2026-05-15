"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

const INPUT_CLS =
  "w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-[#1B2A4A] placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2D6BE4]/30 focus:border-[#2D6BE4] transition-colors bg-white";

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

  function fillDemo() {
    setForm({ email: "demo@nexistudy.co.za", password: "password123" });
    setError("");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
        <div className="flex items-center justify-between mb-1.5">
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Password
          </label>
          <button
            type="button"
            onClick={fillDemo}
            className="text-[10px] font-semibold text-[#2D6BE4] hover:text-[#2558C5] transition-colors"
          >
            Use demo account
          </button>
        </div>
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
        {loading ? "Signing in…" : "Sign In"}
      </button>
    </form>
  );
}

export default function LoginPage() {
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
          Welcome back to{" "}
          <span className="text-[#2D6BE4]">NexiStudy</span>
        </h2>
        <p className="text-gray-400 text-center text-sm leading-relaxed max-w-xs">
          Your study companion is ready. Pick up right where you left off.
        </p>
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
            <h1 className="text-3xl font-bold text-[#1B2A4A] mb-1">Sign in</h1>
            <p className="text-gray-500 text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="text-[#2D6BE4] font-semibold hover:text-[#2558C5]">
                Sign up free
              </Link>
            </p>
          </div>

          <Suspense fallback={<div className="h-40" />}>
            <LoginForm />
          </Suspense>

          <div className="mt-5 p-4 bg-[#1B2A4A]/5 rounded-xl border border-[#1B2A4A]/8">
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1.5">Demo account</p>
            <p className="text-xs text-gray-500">
              Email: <span className="font-mono text-[#1B2A4A]">demo@nexistudy.co.za</span>
              <br />
              Password: <span className="font-mono text-[#1B2A4A]">password123</span>
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}

"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";

// 2027 waitlist signup for the Survival Pack while it's off sale. Same look as
// PackBuyButton (which comes back when PACK_ON_SALE flips on again).
export default function PackWaitlistForm({
  language,
  cta,
  emailLabel,
  emailPlaceholder,
  saving,
  done,
  className = "",
}: {
  language: "en" | "af";
  cta: string;
  emailLabel: string;
  emailPlaceholder: string;
  saving: string;
  done: string;
  className?: string;
}) {
  const { data: session } = useSession();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [joined, setJoined] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Prefill once from the session without clobbering the parent's typing.
  const value = email === "" && session?.user?.email ? session.user.email : email;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/pack/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: value, language }),
      });
      const body = await res.json();
      if (!res.ok) {
        setError(body.error ?? "Couldn't save that. Please try again.");
      } else {
        setJoined(true);
      }
    } catch {
      setError("Network error. Please try again.");
    }
    setLoading(false);
  }

  if (joined) {
    return (
      <p className={`rounded-xl border border-[#FFB454]/30 bg-[#FFB454]/[0.08] px-5 py-4 text-[#FFB454] font-semibold ${className}`}>
        {done}
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`flex flex-col gap-3 ${className}`}>
      <label className="text-left">
        <span className="block text-xs font-semibold uppercase tracking-widest text-white/50 mb-1.5">
          {emailLabel}
        </span>
        <input
          type="email"
          required
          value={value}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={emailPlaceholder}
          className="w-full rounded-xl border border-white/15 bg-white/[0.06] px-4 py-3 text-white placeholder:text-white/30 focus:border-[#00D4FF]/60 focus:outline-none"
        />
      </label>
      <button
        type="submit"
        disabled={loading}
        aria-busy={loading}
        className="w-full px-6 py-3.5 rounded-xl bg-[#FFB454] text-[#0A1628] font-extrabold text-base hover:opacity-90 transition-opacity cursor-pointer disabled:opacity-70 disabled:cursor-wait"
      >
        {loading ? saving : cta}
      </button>
      {error && <p className="text-xs text-red-400 text-center">{error}</p>}
    </form>
  );
}

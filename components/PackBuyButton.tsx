"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";

// Guest checkout for the Survival Pack — unlike SubscribeButton, no login is
// required: parents buy with just an email (the pack is delivered there).
// POSTs { email } to /api/pack/checkout and submits the returned PayFast
// fields as a hidden form, same redirect pattern as the Tutor upgrade.
export default function PackBuyButton({
  cta,
  emailLabel,
  emailPlaceholder,
  redirecting,
  className = "",
}: {
  cta: string;
  emailLabel: string;
  emailPlaceholder: string;
  redirecting: string;
  className?: string;
}) {
  const { data: session } = useSession();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Prefill once from the session without clobbering the parent's typing.
  const value = email === "" && session?.user?.email ? session.user.email : email;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/pack/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: value }),
      });
      const body = await res.json();
      if (!res.ok) {
        setError(body.error ?? "Couldn't start checkout. Please try again.");
        setLoading(false);
        return;
      }

      const form = document.createElement("form");
      form.method = "POST";
      form.action = body.processUrl;
      for (const [key, val] of Object.entries(body.fields as Record<string, string>)) {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = val;
        form.appendChild(input);
      }
      document.body.appendChild(form);
      form.submit();
    } catch {
      setError("Network error. Please try again.");
      setLoading(false);
    }
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
        {loading ? redirecting : cta}
      </button>
      {error && <p className="text-xs text-red-400 text-center">{error}</p>}
    </form>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";

export interface PassChoice {
  slug: string;
  name: string;
  price: string; // "R99"
  perMonth: string;
  note: string;
}

// Pick a Premium pass and pay once-off through PayFast. Used on /pricing (a
// learner paying for themselves) and /gift/<code> (a parent paying, no login).
// POSTs to /api/pass/checkout and submits the returned PayFast fields as a
// hidden form — same redirect pattern as PackBuyButton.
export default function PassPicker({
  passes,
  code,
  signedIn,
  askEmail,
  defaultPass = "pass-90",
  cta = "Pay",
}: {
  passes: PassChoice[];
  code?: string; // parent pay link — pays for that learner
  signedIn: boolean;
  askEmail: boolean; // parents must give a receipt email
  defaultPass?: string;
  cta?: string;
}) {
  const [selected, setSelected] = useState(defaultPass);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const choice = passes.find((p) => p.slug === selected) ?? passes[0];
  const canPay = Boolean(code) || signedIn;

  async function handlePay(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/pass/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pass: choice.slug, code, email }),
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
    <form onSubmit={handlePay} className="space-y-5">
      <div className="grid gap-3 sm:grid-cols-3" role="radiogroup" aria-label="Choose a pass">
        {passes.map((p) => {
          const active = p.slug === choice.slug;
          return (
            <button
              key={p.slug}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => setSelected(p.slug)}
              className={`relative text-left rounded-2xl p-5 border-2 transition-colors cursor-pointer ${
                active
                  ? "border-[#00D4FF] bg-[#00D4FF]/[0.08]"
                  : "border-white/10 bg-white/[0.03] hover:border-white/25"
              }`}
            >
              {p.slug === "pass-90" && (
                <span className="absolute -top-2.5 right-4 rounded-full bg-[#FFB454] px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-[#0A1628]">
                  Most popular
                </span>
              )}
              <p className="text-white/60 text-xs font-bold uppercase tracking-widest mb-1">{p.name}</p>
              <p className="text-3xl font-extrabold text-white leading-none mb-1">{p.price}</p>
              <p className="text-[#00D4FF] text-xs font-semibold mb-2">{p.perMonth}</p>
              <p className="text-white/45 text-xs">{p.note}</p>
            </button>
          );
        })}
      </div>

      {canPay ? (
        <>
          {askEmail && (
            <label className="block text-left">
              <span className="block text-xs font-semibold uppercase tracking-widest text-white/50 mb-1.5">
                Your email (for the receipt)
              </span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-xl border border-white/15 bg-white/[0.06] px-4 py-3 text-white placeholder:text-white/30 focus:border-[#00D4FF]/60 focus:outline-none"
              />
            </label>
          )}
          <button
            type="submit"
            disabled={loading}
            aria-busy={loading}
            className="w-full px-6 py-4 rounded-xl bg-[#2D6BE4] hover:bg-[#4A82F0] text-white font-extrabold text-base transition-colors cursor-pointer disabled:opacity-70 disabled:cursor-wait"
          >
            {loading ? "Taking you to PayFast…" : `${cta} ${choice.price} — ${choice.name} of Premium`}
          </button>
          <p className="text-center text-xs text-white/40">
            Once-off payment via PayFast · Instant EFT or card · No subscription, nothing to cancel
          </p>
          {error && <p className="text-sm text-red-400 text-center">{error}</p>}
        </>
      ) : (
        <Link
          href="/signup"
          className="block w-full text-center px-6 py-4 rounded-xl bg-[#2D6BE4] hover:bg-[#4A82F0] text-white font-extrabold text-base transition-colors"
        >
          Create a free account to get Premium
        </Link>
      )}
    </form>
  );
}

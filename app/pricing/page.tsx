import Link from "next/link";

// ── Feature lists ─────────────────────────────────────────────────────────────

const FREE_INCLUDED = [
  "7 Tutor chats per day",
  "3 uploads per month",
  "APS Tool (7 subjects)",
  "1 personal goal",
];

const FREE_LOCKED = [
  "Subject Mastery",
  "Study tips & motivation",
];

const PREMIUM_INCLUDED = [
  "Unlimited Tutor chats",
  "Unlimited uploads",
  "Full APS Tool + Career Roadmap",
  "Subject Mastery unlocked",
  "Study tips & motivation unlocked",
  "Ad-free + Premium support",
];

const ANNUAL_INCLUDED = [
  "Everything in Premium",
  "Multiple learners under one account",
  "Priority support",
  "Save 20% on Premium price",
];

// ── FAQ data ──────────────────────────────────────────────────────────────────

const FAQS = [
  {
    q: "Can I cancel anytime?",
    a: "Yes — cancel your Premium subscription at any time with no penalties or fees. You'll keep full access until the end of your current billing period, then automatically move to the Free plan.",
  },
  {
    q: "Is my child's data safe?",
    a: "Absolutely. NexiStudy never sells user data. All personal information is securely stored and encrypted, and we are fully POPIA compliant. Your child's privacy is our priority.",
  },
  {
    q: "Which grades does NexiStudy support?",
    a: "NexiStudy currently supports Grade 10, 11, and 12 learners across the CAPS, IEB, and Cambridge curricula. Support for Grade 8 and 9 is in development and coming soon.",
  },
];

// ── Component ─────────────────────────────────────────────────────────────────

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#F0F4FF]">

      {/* ── HERO ── */}
      <section className="bg-[#1B2A4A] text-white py-20 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <span className="inline-block mb-4 px-4 py-1 rounded-full bg-[#2D6BE4]/20 text-[#7EABFF] text-sm font-medium tracking-wide uppercase">
            Pricing
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 leading-tight">
            Choose the plan that fits{" "}
            <span className="text-[#2D6BE4]">your journey</span>
          </h1>
          <p className="text-gray-300 text-lg leading-relaxed">
            Start free. Upgrade anytime for the full NexiStudy experience.
          </p>
        </div>
      </section>

      {/* ── PLANS ── */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 items-start">

          {/* ── 1. FREE ── */}
          <div className="bg-white rounded-2xl border border-[#1B2A4A]/10 shadow-sm p-8 flex flex-col">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Free Plan</p>
            <div className="flex items-end gap-1 mb-1">
              <span className="text-5xl font-extrabold text-[#1B2A4A]">R0</span>
              <span className="text-sm text-gray-400 mb-1.5">/month</span>
            </div>
            <p className="text-xs font-semibold text-gray-400 mb-6">Forever free</p>

            <ul className="space-y-3 mb-6 flex-1">
              {FREE_INCLUDED.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm text-[#1B2A4A]">
                  <span className="mt-0.5 text-[#2D6BE4] font-bold flex-shrink-0">✓</span>
                  {f}
                </li>
              ))}
              {FREE_LOCKED.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm">
                  <span className="mt-0.5 flex-shrink-0 text-gray-300">🔒</span>
                  <span className="text-gray-300 select-none blur-[2px]">{f}</span>
                </li>
              ))}
            </ul>

            <Link
              href="/signup"
              className="text-center py-3 rounded-xl font-semibold text-sm border-2 border-[#2D6BE4] text-[#2D6BE4] hover:bg-[#2D6BE4] hover:text-white transition-colors"
            >
              Start Free — No Credit Card Needed
            </Link>
          </div>

          {/* ── 2. PREMIUM ── */}
          <div className="bg-[#1B2A4A] rounded-2xl ring-2 ring-[#2D6BE4] shadow-xl p-8 flex flex-col relative overflow-hidden">
            {/* Best Value badge */}
            <div className="absolute top-0 right-0">
              <div className="bg-[#2D6BE4] text-white text-[10px] font-bold uppercase tracking-wider px-4 py-1.5 rounded-bl-xl">
                Best Value 🔥
              </div>
            </div>

            <p className="text-xs font-bold uppercase tracking-widest text-[#7EABFF] mb-3">Premium Plan</p>
            <div className="flex items-end gap-1 mb-1">
              <span className="text-5xl font-extrabold text-white">R199</span>
              <span className="text-sm text-gray-400 mb-1.5">/month</span>
            </div>
            <p className="text-xs font-semibold text-[#2D6BE4] mb-6">Most Popular</p>

            <ul className="space-y-3 mb-8 flex-1">
              {PREMIUM_INCLUDED.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm text-white">
                  <span className="mt-0.5 text-[#2D6BE4] font-bold flex-shrink-0">✓</span>
                  {f}
                </li>
              ))}
            </ul>

            <Link
              href="/signup"
              className="text-center py-3.5 rounded-xl font-bold text-sm bg-[#2D6BE4] hover:bg-[#2558C5] text-white transition-colors shadow-lg shadow-[#2D6BE4]/30"
            >
              Upgrade to Premium
            </Link>
          </div>

          {/* ── 3. ANNUAL / FAMILY ── */}
          <div className="bg-white rounded-2xl border border-[#1B2A4A]/10 shadow-sm p-8 flex flex-col relative overflow-hidden">
            {/* Coming soon ribbon */}
            <div className="absolute top-0 right-0">
              <div className="bg-[#1B2A4A]/10 text-[#1B2A4A] text-[10px] font-bold uppercase tracking-wider px-4 py-1.5 rounded-bl-xl">
                Coming Soon
              </div>
            </div>

            <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Annual / Family</p>
            <div className="flex items-end gap-2 mb-1">
              <span className="text-5xl font-extrabold text-[#1B2A4A]">–20%</span>
            </div>
            <p className="text-xs font-semibold text-[#2D6BE4] mb-6">Save 20% on Premium</p>

            <ul className="space-y-3 mb-8 flex-1">
              {ANNUAL_INCLUDED.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm text-[#1B2A4A]">
                  <span className="mt-0.5 text-[#2D6BE4] font-bold flex-shrink-0">✓</span>
                  {f}
                </li>
              ))}
            </ul>

            <button
              disabled
              className="text-center py-3 rounded-xl font-semibold text-sm border-2 border-[#1B2A4A]/20 text-[#1B2A4A]/40 cursor-not-allowed"
            >
              Notify Me
            </button>
          </div>

        </div>

        <p className="text-center text-xs text-gray-400 mt-8">
          All prices in South African Rand (ZAR) · Billed monthly · Cancel anytime
        </p>
      </section>

      {/* ── FAQ ── */}
      <section className="py-16 px-4 bg-white border-t border-[#1B2A4A]/8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-[#1B2A4A] mb-2">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-500 text-sm">Everything you need to know before getting started.</p>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq) => (
              <details
                key={faq.q}
                className="group bg-[#F0F4FF] rounded-2xl border border-[#1B2A4A]/8 overflow-hidden"
              >
                <summary className="flex items-center justify-between px-6 py-5 cursor-pointer list-none select-none">
                  <span className="font-semibold text-[#1B2A4A] text-sm pr-4">{faq.q}</span>
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#2D6BE4]/10 text-[#2D6BE4] flex items-center justify-center text-sm font-bold transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <div className="px-6 pb-5">
                  <p className="text-sm text-gray-500 leading-relaxed">{faq.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="bg-[#1B2A4A] py-16 px-4 text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Ready to unlock your full potential?
          </h2>
          <p className="text-gray-400 mb-8 text-sm leading-relaxed">
            Join thousands of South African learners already studying smarter with NexiStudy.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/signup"
              className="px-8 py-3.5 bg-[#2D6BE4] hover:bg-[#2558C5] text-white font-bold rounded-xl transition-colors text-sm shadow-lg shadow-[#2D6BE4]/30"
            >
              Start Free Today
            </Link>
            <Link
              href="/nexi-tutor"
              className="px-8 py-3.5 border border-white/20 hover:bg-white/10 text-white font-semibold rounded-xl transition-colors text-sm"
            >
              Try Nexi Tutor
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}

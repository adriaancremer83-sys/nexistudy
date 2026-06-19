import Link from "next/link";
import Reveal from "@/components/Reveal";
import SubscribeButton from "@/components/SubscribeButton";
import { pageMeta } from "@/lib/seo";
import { IconCheck, IconLock } from "@/components/icons";

export const metadata = pageMeta({
  title: "Pricing — Free Plan & Premium",
  description:
    "Start free: AI tutor, APS calculator, NSC past papers, plus a daily taste of AI answer-marking and career guidance. Go Premium (R199/month) for unlimited tutoring, full examiner marking, career & NSFAS guidance, and all 11 languages.",
  path: "/pricing",
});

// ── Feature lists ─────────────────────────────────────────────────────────────

const FREE_INCLUDED = [
  "5 Nexi Tutor chats per day",
  "Mark My Answer — 1 answer marked per day",
  "APS Calculator — know your score",
  "Career Guide — 1 guidance report per day",
  "Tutor in English, Afrikaans & isiZulu",
  "Study streaks & daily motivation",
  "1 personal goal",
];

const FREE_LOCKED = [
  "Nexi's Exam Plan",
  "Weak-spots map & targeted practice",
  "Full examiner marking + model answers",
  "Past-paper walkthroughs",
];

const PREMIUM_INCLUDED = [
  "Unlimited Nexi Tutor chats",
  "Tutor in all 11 official SA languages",
  "Mark My Answer — 15 a day, full mark-by-mark breakdown + model answer",
  "Career Guide — 20 a day: full course, university, NSFAS & bursary plan",
  "Nexi's Exam Plan — a day-by-day route to exam day",
  "Weak-spots map + practice that targets them",
  "Past-paper walkthroughs (CAPS / NSC)",
  "Weekly parent progress report",
  "Grade 8–9: Foundation Gap Finder + termly reports",
  "Ad-free + priority support",
];

const ANNUAL_INCLUDED = [
  "Everything in Premium",
  "Multiple learners under one account",
  "Perfect for Grade 8–12 siblings",
  "Save 20% on Premium price",
];

// ── FAQ data ──────────────────────────────────────────────────────────────────

const FAQS = [
  {
    q: "Why is there a daily chat limit on the Free plan?",
    a: "Every answer Nexi gives is powered by advanced AI that costs us real money per question. The Free plan gives you a genuine daily study session at no cost — and Premium members make unlimited help possible. No tricks, just honest maths.",
  },
  {
    q: "Which languages does Nexi speak?",
    a: "All 11 official South African languages — isiZulu, isiXhosa, Afrikaans, English, Sepedi, Setswana, Sesotho, Xitsonga, siSwati, Tshivenda, and isiNdebele. English, Afrikaans and isiZulu are available free; Premium unlocks reliable tutoring in the full set of 11.",
  },
  {
    q: "What are Mark My Answer and the Career Guide?",
    a: "Mark My Answer lets you photograph a handwritten answer and have Nexi mark it like an NSC examiner — method marks and where you lost marks. The Career Guide works out your APS and suggests courses, universities, NSFAS options and bursaries that fit you. Both are free to try once a day. Premium unlocks 15 markings a day with a full mark-by-mark breakdown and model answer, and 20 career reports a day with a complete study-and-funding plan. The APS calculator itself is always free.",
  },
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
    a: "NexiStudy supports Grade 8 to 12. CAPS is fully live now, and IEB & Cambridge support is coming soon. Nexi Tutor covers Senior Phase (Grade 8–9) subjects like Natural Sciences, EMS, and Technology, plus the full FET curriculum. A Subject Choice Advisor — helping families pick the right subjects at the end of Grade 9 — is in development.",
  },
  {
    q: "Is there a cheaper option than R199 per month?",
    a: "We're working on two: an Exam Season Pass (a once-off pass covering the build-up to mid-year and final exams) and an Annual/Family plan that covers multiple learners at a discount. Join free and we'll let you know the moment they launch.",
  },
];

// ── Component ─────────────────────────────────────────────────────────────────

export default function PricingPage() {
  return (
    <div className="min-h-screen">

      {/* ── HERO ── */}
      <section className="page-hero py-20 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <span className="inline-block mb-4 px-4 py-1 rounded-full glass text-[#00D4FF] text-sm font-medium tracking-wide uppercase">
            Pricing
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 leading-tight text-white">
            Choose the plan that fits{" "}
            <span className="text-gradient">your journey</span>
          </h1>
          <p className="text-white/60 text-lg leading-relaxed">
            Start free. Upgrade anytime for the full NexiStudy experience.
          </p>
        </div>
      </section>

      <div className="section-divider" />

      {/* ── PLANS ── */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 items-start">

          {/* ── 1. FREE ── */}
          <Reveal className="h-full">
            <div className="glass-card p-8 flex flex-col h-full">
              <p className="text-xs font-bold uppercase tracking-widest text-white/40 mb-3">Free Plan</p>
              <div className="flex items-end gap-1 mb-1">
                <span className="text-5xl font-extrabold text-white">R0</span>
                <span className="text-sm text-white/40 mb-1.5">/month</span>
              </div>
              <p className="text-xs font-semibold text-white/40 mb-6">Forever free</p>

              <ul className="space-y-3 mb-6 flex-1">
                {FREE_INCLUDED.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-white">
                    <IconCheck className="w-4 h-4 mt-0.5 text-[#00D4FF] flex-shrink-0" />
                    {f}
                  </li>
                ))}
                {FREE_LOCKED.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm">
                    <IconLock className="w-4 h-4 mt-0.5 flex-shrink-0 text-white/25" />
                    <span className="text-white/25 select-none blur-[2px]">{f}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/signup"
                className="text-center py-3 rounded-xl font-semibold text-sm border-2 border-[#2D6BE4] text-[#7EABFF] hover:bg-[#2D6BE4] hover:text-white transition-colors"
              >
                Start Free — No Credit Card Needed
              </Link>
            </div>
          </Reveal>

          {/* ── 2. PREMIUM ── */}
          <Reveal delay={120} className="h-full">
            <div className="glass-strong rounded-2xl ring-2 ring-[#00D4FF]/60 shadow-[0_0_40px_rgba(0,212,255,0.15)] p-8 flex flex-col h-full relative overflow-hidden">
              {/* Best Value badge */}
              <div className="absolute top-0 right-0">
                <div className="bg-gradient-to-r from-[#2D6BE4] to-[#00D4FF] text-white text-[10px] font-bold uppercase tracking-wider px-4 py-1.5 rounded-bl-xl">
                  Best Value
                </div>
              </div>

              <p className="text-xs font-bold uppercase tracking-widest text-[#00D4FF] mb-3">Premium Plan</p>
              <div className="flex items-end gap-1 mb-1">
                <span className="text-5xl font-extrabold text-white">R199</span>
                <span className="text-sm text-white/40 mb-1.5">/month</span>
              </div>
              <p className="text-xs font-semibold text-[#00D4FF] mb-6">Most Popular</p>

              <ul className="space-y-3 mb-8 flex-1">
                {PREMIUM_INCLUDED.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-white">
                    <IconCheck className="w-4 h-4 mt-0.5 text-[#00D4FF] flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>

              <SubscribeButton
                callbackUrl="/pricing"
                className="animate-pulse-glow w-full text-center py-3.5 rounded-xl font-bold text-sm bg-[#2D6BE4] hover:bg-[#4A82F0] text-white transition-colors cursor-pointer disabled:opacity-70 disabled:cursor-wait"
              >
                Upgrade to Premium — R199/mo
              </SubscribeButton>
            </div>
          </Reveal>

          {/* ── 3. ANNUAL / FAMILY ── */}
          <Reveal delay={240} className="h-full">
            <div className="glass-card p-8 flex flex-col h-full relative overflow-hidden">
              {/* Coming soon ribbon */}
              <div className="absolute top-0 right-0">
                <div className="bg-white/10 text-white/70 text-[10px] font-bold uppercase tracking-wider px-4 py-1.5 rounded-bl-xl">
                  Coming Soon
                </div>
              </div>

              <p className="text-xs font-bold uppercase tracking-widest text-white/40 mb-3">Annual / Family</p>
              <div className="flex items-end gap-2 mb-1">
                <span className="text-5xl font-extrabold text-white">–20%</span>
              </div>
              <p className="text-xs font-semibold text-[#00D4FF] mb-6">Save 20% on Premium</p>

              <ul className="space-y-3 mb-8 flex-1">
                {ANNUAL_INCLUDED.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-white">
                    <IconCheck className="w-4 h-4 mt-0.5 text-[#00D4FF] flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>

              <button
                disabled
                className="text-center py-3 rounded-xl font-semibold text-sm border-2 border-white/15 text-white/30 cursor-not-allowed"
              >
                Notify Me
              </button>
            </div>
          </Reveal>

        </div>

        {/* ── SCHOOLS & CLASS LICENCES ── */}
        <Reveal>
          <div className="max-w-5xl mx-auto mt-8 rounded-2xl border border-[#FFB454]/30 bg-[#FFB454]/[0.05] p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-[#FFB454]/15 text-[#FFB454] text-[10px] font-bold uppercase tracking-wider px-4 py-1.5 rounded-bl-xl">
              Pilot Programme
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#FFB454] mb-2">
                Schools &amp; Classes
              </p>
              <h3 className="text-white font-extrabold text-2xl mb-2">
                One licence. Your whole class.
              </h3>
              <p className="text-white/55 text-sm leading-relaxed max-w-xl">
                Full Premium for up to 35 learners from{" "}
                <span className="text-white font-bold">R2,999/month</span> — that&apos;s
                about <span className="text-[#FFB454] font-bold">R86 per learner</span>{" "}
                instead of R199. Includes the teacher dashboard with the class
                weak-spots heatmap. Billed to the school, termly or annually.
              </p>
            </div>
            <div className="flex flex-col items-stretch gap-2.5 flex-shrink-0">
              <Link
                href="/contact"
                className="text-center px-7 py-3.5 bg-[#FFB454] hover:bg-[#FFC678] text-[#050D1A] font-extrabold text-sm rounded-xl transition-colors"
              >
                Talk to us about a pilot
              </Link>
              <Link
                href="/teachers"
                className="text-center text-xs text-white/50 hover:text-white transition-colors"
              >
                Teachers start free →
              </Link>
            </div>
          </div>
        </Reveal>

        <p className="text-center text-xs text-white/30 mt-8">
          All prices in South African Rand (ZAR) · Billed monthly · Cancel anytime
        </p>
      </section>

      <div className="section-divider" />

      {/* ── FAQ ── */}
      <section className="py-16 px-4">
        <div className="max-w-2xl mx-auto">
          <Reveal className="text-center mb-10">
            <h2 className="text-3xl font-bold text-white mb-2">
              Frequently Asked <span className="text-gradient">Questions</span>
            </h2>
            <p className="text-white/50 text-sm">Everything you need to know before getting started.</p>
          </Reveal>

          <div className="space-y-4">
            {FAQS.map((faq, i) => (
              <Reveal key={faq.q} delay={i * 100}>
                <details className="group glass rounded-2xl overflow-hidden">
                  <summary className="flex items-center justify-between px-6 py-5 cursor-pointer list-none select-none">
                    <span className="font-semibold text-white text-sm pr-4">{faq.q}</span>
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#00D4FF]/15 text-[#00D4FF] flex items-center justify-center text-sm font-bold transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <div className="px-6 pb-5">
                    <p className="text-sm text-white/50 leading-relaxed">{faq.a}</p>
                  </div>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ── FINAL CTA ── */}
      <section className="py-20 px-4 text-center relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-b from-transparent to-[#2D6BE4]/15 pointer-events-none"
        />
        <Reveal className="relative max-w-xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Ready to unlock your <span className="text-gradient">full potential?</span>
          </h2>
          <p className="text-white/50 mb-8 text-sm leading-relaxed">
            Start free — no credit card, no catch. Upgrade only when you&apos;re ready
            for the full plan.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/signup"
              className="animate-pulse-glow px-8 py-3.5 bg-[#2D6BE4] hover:bg-[#4A82F0] text-white font-bold rounded-xl transition-colors text-sm"
            >
              Start Free Today
            </Link>
            <Link
              href="/nexi-tutor"
              className="glass px-8 py-3.5 hover:border-[#00D4FF]/50 hover:bg-white/10 text-white font-semibold rounded-xl transition-all text-sm"
            >
              Try Nexi Tutor
            </Link>
          </div>
        </Reveal>
      </section>

    </div>
  );
}

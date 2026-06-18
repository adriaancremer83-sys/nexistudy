import Link from "next/link";
import Image from "next/image";
import Nexi from "@/components/Nexi";
import ExamCountdown from "@/components/ExamCountdown";
import {
  IconTarget,
  IconAcademicCap,
  IconBolt,
  IconBookOpen,
  IconCpuChip,
  IconGlobe,
  IconCheck,
} from "@/components/icons";

const stats = [
  { value: "CAPS", label: "Live now · IEB & Cambridge coming soon" },
  { value: "Grade 8 – Matric", label: "Every subject, every grade" },
  { value: "11 languages", label: "English, Afrikaans & isiZulu free · all 11 on Premium" },
  { value: "24/7", label: "Help whenever you sit down to study" },
];

const differenceCards = [
  {
    icon: IconTarget,
    accent: "#00D4FF",
    title: "Built around your syllabus",
    desc: "Fully aligned to CAPS — live now, with IEB & Cambridge coming soon. Whether it's Maths, Life Sciences, or History, Nexi knows exactly what your exam will ask.",
  },
  {
    icon: IconAcademicCap,
    accent: "#FFB454",
    title: "Explained like a patient teacher",
    desc: "Step-by-step guidance that feels like a real teacher sitting next to you — never rushed, never judgy, focused on what you actually need.",
  },
  {
    icon: IconBolt,
    accent: "#4A82F0",
    title: "Made to keep you going",
    desc: "Less exam stress, more real confidence. Tools designed around the South African learner journey, from first test to final matric paper.",
  },
];

const steps = [
  {
    number: "1",
    title: "Ask anything",
    desc: "Stuck on trig identities at 9pm? Type your question the way you'd ask a friend. No question is too small or too 'obvious'.",
  },
  {
    number: "2",
    title: "Learn it properly",
    desc: "Nexi walks you through it step by step until it clicks — in English, Afrikaans or isiZulu free, or any of all 11 official languages on Premium.",
  },
  {
    number: "3",
    title: "Walk in ready",
    desc: "Study plans, flashcards, and past-paper practice that build up to exam day. You arrive prepared, not panicked.",
  },
];

const toolkitCards = [
  {
    icon: IconBookOpen,
    tag: "Study Pro",
    title: "Your study roadmap",
    desc: "Structured study plans, smart flashcards, and progress tracking built around your exam schedule.",
    href: "/studypro",
    cta: "Explore Study Pro",
  },
  {
    icon: IconCpuChip,
    tag: "Nexi Tutor",
    title: "Your personal tutor",
    desc: "Ask any question, get instant step-by-step answers. Available 24/7 — no appointments needed.",
    href: "/nexi-tutor",
    cta: "Meet Nexi Tutor",
  },
  {
    icon: IconGlobe,
    tag: "Multilingual",
    title: "Help in your language",
    desc: "English, Afrikaans and isiZulu free; all 11 official languages on Premium — because learning is easier in the language you think in.",
    href: "/nexi-tutor",
    cta: "Try it now",
  },
];

/* Static hand-drawn underline accent — no animation. */
function Squiggle() {
  return (
    <svg
      aria-hidden
      className="absolute -bottom-2 left-0 w-full h-2.5"
      viewBox="0 0 200 10"
      preserveAspectRatio="none"
      fill="none"
    >
      <path
        d="M2 7 Q 30 2 60 6 T 120 5 T 198 4"
        stroke="#FFB454"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* A faithful, static preview of the real Nexi Tutor chat — same bubbles,
   same styling as /nexi-tutor. Shows the product instead of describing it. */
function ChatPreview() {
  return (
    <div className="glass rounded-2xl overflow-hidden shadow-[0_24px_60px_rgba(0,0,0,0.45)]">
      {/* Window bar */}
      <div className="flex items-center gap-3 px-5 py-3.5 border-b border-white/10 bg-white/[0.04]">
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-white/15" />
          <span className="w-3 h-3 rounded-full bg-white/15" />
          <span className="w-3 h-3 rounded-full bg-white/15" />
        </div>
        <div className="flex items-center gap-2 ml-1">
          <span className="text-[11px] font-semibold text-white/50">Mathematics</span>
          <span className="text-white/20">·</span>
          <span className="text-[11px] font-semibold text-white/50">Grade 11</span>
          <span className="text-white/20">·</span>
          <span className="text-[11px] font-semibold text-[#00D4FF]">CAPS</span>
        </div>
      </div>

      {/* Messages */}
      <div className="p-5 space-y-4 bg-[#0A1628]/50">
        {/* Student */}
        <div className="flex items-end gap-3 flex-row-reverse">
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#2D6BE4] flex items-center justify-center ring-2 ring-[#2D6BE4]/30">
            <span className="text-[9px] font-bold text-white leading-none">YOU</span>
          </div>
          <div className="max-w-[78%] rounded-2xl rounded-br-sm px-4 py-2.5 text-sm leading-relaxed bg-gradient-to-br from-[#2D6BE4] to-[#1E4FB8] text-white shadow-lg shadow-[#2D6BE4]/20">
            I&apos;m stuck on this: solve 2&nbsp;sin&nbsp;x = 1 for x between 0° and 360°.
          </div>
        </div>

        {/* Nexi */}
        <div className="flex items-end gap-3">
          <div className="flex-shrink-0 w-8 h-8 rounded-full overflow-hidden bg-[#0E1F3D] ring-2 ring-[#00D4FF]/40">
            <Image src="/images/nexi-idle.webp" alt="Nexi" width={32} height={32} className="w-full h-full object-cover object-top scale-110" />
          </div>
          <div className="max-w-[82%] rounded-2xl rounded-bl-sm px-4 py-3 text-sm leading-relaxed glass text-white/90">
            <p className="mb-2">Let&apos;s take it one step at a time 👇</p>
            <p className="mb-1"><span className="text-[#00D4FF] font-bold">1.</span> Divide both sides by 2: <span className="font-mono text-white">sin&nbsp;x = 0,5</span></p>
            <p className="mb-1"><span className="text-[#00D4FF] font-bold">2.</span> Reference angle: <span className="font-mono text-white">x = 30°</span></p>
            <p className="mb-1"><span className="text-[#00D4FF] font-bold">3.</span> sin is positive in quadrants 1 &amp; 2, so <span className="font-mono text-white">x = 30°</span> or <span className="font-mono text-white">180° − 30° = 150°</span></p>
            <p className="mt-2 text-emerald-300/90 font-semibold">Answer: x = 30° or 150° ✓</p>
          </div>
        </div>
      </div>

      {/* Input (decorative) */}
      <div className="border-t border-white/10 px-4 py-3 flex items-center gap-3 bg-white/[0.02]">
        <div className="flex-1 rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-sm text-white/30">
          Ask Nexi anything…
        </div>
        <div className="px-4 py-2.5 rounded-xl bg-[#2D6BE4] text-white text-sm font-bold">Ask Nexi</div>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <div>

      {/* ── 1. HERO ── */}
      <section className="page-hero relative overflow-hidden px-4 py-24 md:py-20">
        <div className="relative max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center gap-14 md:gap-16 min-h-[calc(100vh-12rem)]">

          {/* Text + CTAs */}
          <div className="flex-1 text-center md:text-left">
            <p className="mb-5 text-sm font-semibold tracking-wide text-white/60">
              Sawubona · Hallo · Molo · Welcome
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.12] mb-6 text-white">
              The study buddy
              <br className="hidden sm:block" /> who knows{" "}
              <span className="italic text-[#00D4FF]">your syllabus</span>
            </h1>
            <p className="text-lg sm:text-xl text-white/65 mb-10 max-w-xl mx-auto md:mx-0 leading-relaxed">
              Nexi is built for South African learners — CAPS now, with IEB and
              Cambridge coming soon — Grade 8 to matric, in the language you think
              in. Sit down stressed, stand up ready.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link
                href="/nexi-tutor"
                className="px-8 py-4 bg-[#2D6BE4] hover:bg-[#4A82F0] text-white font-extrabold rounded-2xl transition-colors text-base shadow-lg shadow-[#2D6BE4]/25"
              >
                Ask Nexi anything
              </Link>
              <Link
                href="/signup"
                className="px-8 py-4 rounded-2xl border border-white/15 hover:border-white/35 text-white font-bold transition-colors text-base"
              >
                Create free account
              </Link>
            </div>
            <p className="mt-5 text-sm text-white/40">
              Free to start · No credit card · Works on any device
            </p>
          </div>

          {/* Mascot — floating, with a static glow pool beneath */}
          <div className="relative flex-shrink-0 flex flex-col items-center w-full md:w-auto">
            <div
              aria-hidden
              className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[320px] h-[100px]"
              style={{ background: "radial-gradient(ellipse closest-side, rgba(0, 212, 255, 0.28), transparent)" }}
            />
            <div className="animate-float relative">
              <Nexi
                pose="wave"
                alt="Nexi, the NexiStudy mascot, waving hello"
                width={400}
                height={400}
                className="w-48 sm:w-60 h-auto md:w-auto md:h-[400px] object-contain"
                priority
              />
            </div>

            {/* Frosted stat cards */}
            <div className="relative z-10 flex gap-3 -mt-4 md:mt-0 md:absolute md:-bottom-5 md:-right-8">
              <div className="rounded-xl border border-white/15 bg-white/[0.08] px-5 py-3 shadow-[0_8px_24px_rgba(0,0,0,0.35)]">
                <p className="text-xl font-extrabold text-white leading-tight">2,400+</p>
                <p className="text-xs text-white/55">Exam questions</p>
              </div>
              <div className="rounded-xl border border-white/15 bg-white/[0.08] px-5 py-3 shadow-[0_8px_24px_rgba(0,0,0,0.35)] md:translate-y-6">
                <p className="text-xl font-extrabold text-white leading-tight">11</p>
                <p className="text-xs text-white/55">Languages</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── 2. STATS STRIP ── */}
      <section className="py-16 px-4 border-y border-white/[0.06]">
        <div className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10 text-center">
          {stats.map((s) => (
            <div key={s.value}>
              <p className="text-lg sm:text-xl font-extrabold text-white mb-1.5">{s.value}</p>
              <p className="text-sm text-white/50 leading-relaxed">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 2b. SEE IT IN ACTION ── */}
      <section className="py-28 px-4">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          <div className="order-2 lg:order-1">
            <ChatPreview />
          </div>
          <div className="order-1 lg:order-2">
            <p className="text-sm font-bold uppercase tracking-widest text-[#FFB454] mb-3">
              See it in action
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 leading-snug">
              Not just the answer — the <span className="text-[#00D4FF]">method</span>
            </h2>
            <p className="text-white/55 text-lg leading-relaxed mb-8">
              Nexi works the way a good teacher does: one clear step at a time, in
              plain language, until it actually clicks. Ask in English, Afrikaans or
              isiZulu free — or any of all 11 official languages on Premium.
            </p>
            <ul className="space-y-4">
              {[
                "Step-by-step working, never just a final number",
                "Pinned to your exact grade, subject and curriculum",
                "Ask follow-ups until it makes sense — no judgement, no rush",
              ].map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <span className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-[#00D4FF]/15 flex items-center justify-center">
                    <IconCheck className="w-3 h-3 text-[#00D4FF]" />
                  </span>
                  <span className="text-white/70 leading-relaxed">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── 3. THE NEXISTUDY DIFFERENCE ── */}
      <section className="py-28 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-2xl mb-16">
            <p className="text-sm font-bold uppercase tracking-widest text-[#FFB454] mb-3">
              Why Nexi
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 leading-snug">
              More than answers — real understanding
            </h2>
            <p className="text-white/55 text-lg leading-relaxed">
              Plenty of apps can give you an answer. Nexi makes sure you could
              answer it yourself next time, when it counts.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {differenceCards.map((card) => (
              <div
                key={card.title}
                className="group rounded-2xl border border-white/[0.08] bg-[#0E1F3D] p-8 transition-colors hover:border-white/20"
              >
                <div className="flex items-center gap-4 mb-6">
                  <span className="flex-shrink-0" style={{ color: card.accent }}>
                    <card.icon className="w-8 h-8" />
                  </span>
                  <span
                    className="h-px flex-1 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
                    style={{ background: `linear-gradient(90deg, ${card.accent}66, transparent)` }}
                  />
                </div>
                <h3 className="text-lg font-bold text-white mb-3 leading-snug">{card.title}</h3>
                <p className="text-white/55 text-[0.95rem] leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. HOW IT WORKS ── */}
      <section className="py-28 px-4 bg-white/[0.02] border-y border-white/[0.06]">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-2xl mb-16">
            <p className="text-sm font-bold uppercase tracking-widest text-[#FFB454] mb-3">
              Getting started
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 leading-snug">
              From &ldquo;I&apos;m stuck&rdquo; to &ldquo;I&apos;ve got this&rdquo; in three steps
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            {steps.map((step) => (
              <div key={step.number}>
                <p className="text-5xl font-extrabold text-[#FFB454]/90 mb-5">{step.number}</p>
                <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                <p className="text-white/55 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. STUDY TOOLKIT ── */}
      <section className="py-28 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-2xl mb-16">
            <p className="text-sm font-bold uppercase tracking-widest text-[#FFB454] mb-3">
              Your toolkit
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 leading-snug">
              Everything you need, in one place
            </h2>
            <p className="text-white/55 text-lg leading-relaxed">
              Designed around how South African learners actually study — between
              school, sport, taxis home, and everything else.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {toolkitCards.map((card) => (
              <Link
                key={card.tag}
                href={card.href}
                className="group rounded-2xl border border-white/[0.08] bg-[#0E1F3D] p-8 flex flex-col transition-colors hover:border-[#2D6BE4]/50 cursor-pointer"
              >
                <div className="flex items-center gap-2.5 mb-5">
                  <card.icon className="w-5 h-5 text-[#00D4FF] flex-shrink-0" />
                  <span className="text-xs font-bold uppercase tracking-widest text-[#FFB454]">
                    {card.tag}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{card.title}</h3>
                <p className="text-white/55 text-[0.95rem] leading-relaxed flex-1">{card.desc}</p>
                <span className="mt-7 text-sm font-bold text-[#00D4FF] group-hover:text-white transition-colors">
                  {card.cta} →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. TRUST / ACCURACY ── */}
      <section className="py-28 px-4 bg-white/[0.02] border-y border-white/[0.06]">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-2xl mb-14">
            <p className="text-sm font-bold uppercase tracking-widest text-[#FFB454] mb-3">
              Why you can trust it
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 leading-snug">
              Every answer, checked like it&apos;s the real exam
            </h2>
            <p className="text-white/55 text-lg leading-relaxed">
              A wrong answer is worse than no answer. So every practice question is
              solved cold by a separate marker — with no answer key in front of them —
              and matched against the official CAPS marking memo before it ever goes
              live. If it doesn&apos;t match, it gets fixed or thrown out.
            </p>
          </div>

          {/* The real verification pipeline (from how the banks are actually built) */}
          <div className="flex flex-wrap items-center gap-3 mb-16">
            {[
              { label: "Drafted", note: "to CAPS & past papers" },
              { label: "Linted", note: "one correct option, no dupes" },
              { label: "Seeded", note: "loaded live" },
              { label: "Blind-verified", note: "solved cold vs the memo", highlight: true },
              { label: "Live", note: "learners see it", done: true },
            ].map((step, i, arr) => (
              <div key={step.label} className="flex items-center gap-3">
                <div
                  className={`rounded-xl border px-4 py-3 ${
                    step.highlight
                      ? "border-[#00D4FF]/50 bg-[#00D4FF]/[0.06]"
                      : step.done
                        ? "border-emerald-400/40 bg-emerald-400/[0.05]"
                        : "border-white/[0.08] bg-[#0E1F3D]"
                  }`}
                >
                  <p
                    className={`text-sm font-bold leading-tight ${
                      step.highlight ? "text-[#00D4FF]" : step.done ? "text-emerald-300" : "text-white"
                    }`}
                  >
                    {step.label}
                  </p>
                  <p className="text-[11px] text-white/45 mt-0.5">{step.note}</p>
                </div>
                {i < arr.length - 1 && <span className="text-white/25 text-lg leading-none">→</span>}
              </div>
            ))}
          </div>

          {/* Honest, verifiable numbers — no invented social proof */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
            {[
              { value: "2,448", label: "Practice questions, every one blind-verified" },
              { value: "16", label: "Subjects, Grade 8 to matric" },
              { value: "CAPS", label: "Curriculum live now — IEB & Cambridge coming soon" },
              { value: "11", label: "Official SA languages (full set on Premium)" },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-3xl sm:text-4xl font-extrabold text-white mb-2">{s.value}</p>
                <p className="text-sm text-white/50 leading-relaxed">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. FINAL CTA ── */}
      <section className="py-28 px-4">
        <div className="max-w-3xl mx-auto rounded-3xl border border-white/[0.08] bg-[#0E1F3D] px-8 py-16 sm:px-16 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-5 leading-snug">
            Exam season is coming.
            <br />
            Let&apos;s make it{" "}
            <span className="relative inline-block whitespace-nowrap">
              your season
              <Squiggle />
            </span>
            .
          </h2>
          <div className="mb-8">
            <ExamCountdown variant="inline" />
          </div>
          <p className="text-white/60 mb-10 text-lg leading-relaxed">
            Create a free account and start with your first subject today.
            No credit card needed — just bring your questions.
          </p>
          <Link
            href="/signup"
            className="inline-block px-10 py-4 bg-[#2D6BE4] hover:bg-[#4A82F0] text-white font-bold rounded-2xl transition-colors text-base"
          >
            Start studying free
          </Link>
        </div>
      </section>

    </div>
  );
}

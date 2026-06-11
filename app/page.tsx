import Link from "next/link";
import Image from "next/image";
import {
  IconTarget,
  IconAcademicCap,
  IconBolt,
  IconBookOpen,
  IconCpuChip,
  IconGlobe,
  IconStar,
} from "@/components/icons";

const stats = [
  { value: "CAPS · IEB · Cambridge", label: "Aligned to all three SA curricula" },
  { value: "Grade 8 – Matric", label: "Every subject, every grade" },
  { value: "11 languages", label: "Help in every official SA language" },
  { value: "24/7", label: "Help whenever you sit down to study" },
];

const differenceCards = [
  {
    icon: IconTarget,
    title: "Built around your syllabus",
    desc: "Fully aligned to CAPS, IEB & Cambridge. Whether it's Maths, Life Sciences, or History — Nexi knows exactly what your exam will ask.",
  },
  {
    icon: IconAcademicCap,
    title: "Explained like a patient teacher",
    desc: "Step-by-step guidance that feels like a real teacher sitting next to you — never rushed, never judgy, focused on what you actually need.",
  },
  {
    icon: IconBolt,
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
    desc: "Nexi walks you through it step by step until it clicks — in any of South Africa's 11 official languages.",
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
    desc: "From isiZulu to Xitsonga — Nexi helps in all 11 official languages, because learning is easier in the language you think in.",
    href: "/nexi-tutor",
    cta: "Try it now",
  },
];

const testimonials = [
  {
    name: "Thandi M.",
    role: "Grade 11 learner, Johannesburg",
    quote:
      "Nexi explained Maths Lit better than anyone in my class. I went from 52% to 74% in one term. I actually enjoy studying now.",
    stars: 5,
  },
  {
    name: "Mrs. Pietersen",
    role: "Parent, Cape Town",
    quote:
      "My daughter uses NexiStudy every evening. Her confidence has improved so much — she no longer dreads exam season.",
    stars: 5,
  },
  {
    name: "Sipho K.",
    role: "Grade 12 learner, Durban",
    quote:
      "I was failing Physical Science. After two weeks with Nexi Tutor I finally understood circuits. This app is a game-changer.",
    stars: 5,
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
              <span className="italic text-[#00D4AA]">your syllabus</span>
            </h1>
            <p className="text-lg sm:text-xl text-white/65 mb-10 max-w-xl mx-auto md:mx-0 leading-relaxed">
              Nexi is built for South African learners — CAPS, IEB and Cambridge,
              Grade 8 to matric, in the language you think in. Sit down stressed,
              stand up ready.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link
                href="/nexi-tutor"
                className="px-8 py-4 bg-[#00D4AA] hover:bg-[#1FE5BE] text-[#050D1A] font-extrabold rounded-2xl transition-colors text-base"
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
              style={{ background: "radial-gradient(ellipse closest-side, rgba(0, 212, 170, 0.35), transparent)" }}
            />
            <div className="animate-float relative">
              <Image
                src="/nexi.png"
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
                <p className="text-xl font-extrabold text-white leading-tight">1,200+</p>
                <p className="text-xs text-white/55">Learners</p>
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
                className="rounded-2xl border border-white/[0.08] bg-[#0E1F3D] p-8 transition-colors hover:border-[#2D6BE4]/50"
              >
                <div className="w-12 h-12 rounded-xl bg-[#2D6BE4]/15 flex items-center justify-center mb-6 text-[#00D4FF]">
                  <card.icon className="w-6 h-6" />
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
                <div className="w-12 h-12 rounded-xl bg-[#2D6BE4]/15 flex items-center justify-center mb-6 text-[#00D4FF]">
                  <card.icon className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#FFB454] mb-2">
                  {card.tag}
                </span>
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

      {/* ── 6. TESTIMONIALS ── */}
      <section className="py-28 px-4 bg-white/[0.02] border-y border-white/[0.06]">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-2xl mb-16">
            <p className="text-sm font-bold uppercase tracking-widest text-[#FFB454] mb-3">
              Real learners
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 leading-snug">
              Marks go up. Stress comes down.
            </h2>
            <p className="text-white/55 text-lg leading-relaxed">
              Across South Africa, learners and parents are seeing the difference.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {testimonials.map((t) => (
              <figure
                key={t.name}
                className="rounded-2xl border border-white/[0.08] bg-[#0E1F3D] p-8 flex flex-col"
              >
                <div className="flex gap-1 mb-5 text-[#FFB454]" aria-label={`${t.stars} out of 5 stars`}>
                  {Array.from({ length: t.stars }).map((_, j) => (
                    <IconStar key={j} className="w-4 h-4" />
                  ))}
                </div>
                <blockquote className="text-white/75 leading-relaxed flex-1 mb-7">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption>
                  <p className="font-bold text-white text-sm">{t.name}</p>
                  <p className="text-sm text-white/45 mt-0.5">{t.role}</p>
                </figcaption>
              </figure>
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
          <p className="text-white/60 mb-10 text-lg leading-relaxed">
            Join thousands of South African learners already studying with Nexi.
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

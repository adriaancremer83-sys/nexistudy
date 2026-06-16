import Nexi from "@/components/Nexi";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import {
  IconTarget,
  IconBookOpen,
  IconTrendingUp,
  IconRocket,
  IconSparkles,
  IconUsers,
} from "@/components/icons";

const VALUE_PILLARS = [
  {
    icon: IconTarget,
    accent: "#00D4FF",
    title: "See exactly where you're losing marks",
    desc: "Every quiz quietly maps the topics you keep getting wrong, so revision goes straight to what's actually costing you — not what you already know.",
  },
  {
    icon: IconBookOpen,
    accent: "#FFB454",
    title: "Understand it, don't just memorise it",
    desc: "Nexi works through problems one step at a time, in plain language, until the method clicks — the way a patient teacher would.",
  },
  {
    icon: IconTrendingUp,
    accent: "#4A82F0",
    title: "Walk into the exam calm",
    desc: "Steady practice against real CAPS exam questions turns exam season from a panic into something you've already rehearsed.",
  },
];

export default function AboutUsPage() {
  return (
    <div className="min-h-screen">

      {/* ── 1. HERO ── */}
      <section className="page-hero py-20 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10 md:gap-14">

          {/* Text */}
          <div className="flex-1 text-center md:text-left order-2 md:order-1">
            <span className="inline-block mb-4 px-4 py-1 rounded-full glass text-[#00D4FF] text-sm font-medium tracking-wide uppercase">
              Our Story
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-5 text-white">
              About <span className="text-gradient">NexiStudy</span>
            </h1>
            <p className="text-lg text-white/60 leading-relaxed max-w-xl">
              Built in South Africa, for South African learners — patient,
              step-by-step help for every grade, subject and curriculum, in all
              11 official languages.
            </p>
          </div>

          {/* Nexi image with glow */}
          <div className="flex-shrink-0 order-1 md:order-2 flex justify-center">
            <div className="relative animate-float">
              <div
                aria-hidden
                className="glow-ring absolute inset-0 m-auto w-[105%] h-[105%] -translate-y-1 rounded-full"
              />
              <Nexi
                pose="idle"
                width={300}
                height={300}
                className="relative w-40 sm:w-52 md:w-auto md:h-64 object-contain drop-shadow-2xl"
                priority
              />
            </div>
          </div>

        </div>
      </section>

      <div className="section-divider" />

      {/* ── 2. MISSION & VISION ── */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">

          <Reveal className="h-full">
            <div className="glass-card p-8 h-full">
              <div className="flex items-center gap-4 mb-5">
                <span className="flex-shrink-0 text-[#00D4FF]">
                  <IconRocket className="w-8 h-8" />
                </span>
                <span className="h-px flex-1 bg-gradient-to-r from-[#00D4FF]/40 to-transparent" />
              </div>
              <h2 className="text-xl font-bold text-white mb-4">Our Mission</h2>
              <p className="text-white/50 text-sm leading-relaxed">
                Good tutoring shouldn&apos;t only be for families who can afford extra
                lessons. We give every South African learner a patient tutor on call —
                pinned to their exact grade and curriculum — at a price that doesn&apos;t
                lock anyone out.
              </p>
            </div>
          </Reveal>

          <Reveal delay={120} className="h-full">
            <div className="glass-card p-8 h-full">
              <div className="flex items-center gap-4 mb-5">
                <span className="flex-shrink-0 text-[#FFB454]">
                  <IconSparkles className="w-8 h-8" />
                </span>
                <span className="h-px flex-1 bg-gradient-to-r from-[#FFB454]/40 to-transparent" />
              </div>
              <h2 className="text-xl font-bold text-white mb-4">Our Vision</h2>
              <p className="text-white/50 text-sm leading-relaxed">
                A South Africa where the Grade 11 learner in a township classroom and
                the one in a city private school open the same patient, accurate tutor
                at 9pm — each in the language they think in.
              </p>
            </div>
          </Reveal>

        </div>
      </section>

      <div className="section-divider" />

      {/* ── 3. THE CHALLENGE ── */}
      <section className="py-16 px-4">
        <Reveal className="max-w-3xl mx-auto text-center">
          <span className="inline-block mb-4 px-4 py-1 rounded-full glass text-[#00D4FF] text-sm font-semibold">
            Why We Exist
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            The Challenge in <span className="text-gradient">Education Today</span>
          </h2>
          <p className="text-white/60 leading-relaxed text-base">
            South African learners face a perfect storm: information overload, overcrowded
            classrooms, and teachers carrying heavy workloads with limited time for individual
            attention. Too many students sit alone the night before an exam — overwhelmed,
            underprepared, and unsure where to start. NexiStudy was built to change that.
          </p>
        </Reveal>
      </section>

      <div className="section-divider" />

      {/* ── 4. CORE PHILOSOPHY ── */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <div className="glass-strong rounded-2xl p-10 md:p-14 flex flex-col md:flex-row items-center gap-10">

              <div className="flex-shrink-0 text-[#00D4FF]">
                <IconUsers className="w-16 h-16" />
              </div>

              <div>
                <span className="inline-block mb-3 text-xs font-bold uppercase tracking-widest text-[#00D4FF]">
                  Core Philosophy
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                  Assisting, Not Replacing
                </h2>
                <p className="text-white/50 leading-relaxed text-sm max-w-xl">
                  We believe in the irreplaceable value of human teachers. NexiStudy is not here to
                  replace the classroom — it&apos;s here to complement it. We lighten the load,
                  sharpen study habits, and free up time so that what happens between a great teacher
                  and a curious student can flourish.
                </p>
              </div>

            </div>
          </Reveal>
        </div>
      </section>

      <div className="section-divider" />

      {/* ── 5. VALUE PILLARS ── */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <Reveal className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
              How We Help <span className="text-gradient">Learners Grow</span>
            </h2>
            <p className="text-white/50 text-sm max-w-lg mx-auto">
              Three principles behind everything NexiStudy does.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {VALUE_PILLARS.map((pillar, i) => (
              <Reveal key={pillar.title} delay={i * 120} className="h-full">
                <div className="group glass-card p-8 h-full">
                  <div className="flex items-center gap-4 mb-5">
                    <span className="flex-shrink-0" style={{ color: pillar.accent }}>
                      <pillar.icon className="w-8 h-8" />
                    </span>
                    <span
                      className="h-px flex-1 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
                      style={{ background: `linear-gradient(90deg, ${pillar.accent}66, transparent)` }}
                    />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3">{pillar.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{pillar.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ── 6. CTA ── */}
      <section className="py-24 px-4 text-center relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-b from-transparent via-[#2D6BE4]/10 to-[#2D6BE4]/20 pointer-events-none"
        />
        <Reveal className="relative max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Let&apos;s Transform <span className="text-gradient">Learning Together</span>
          </h2>
          <p className="text-white/60 mb-8 leading-relaxed">
            Whether you&apos;re a learner chasing your goals or a parent investing in your
            child&apos;s future — NexiStudy is ready when you are.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/signup"
              className="animate-pulse-glow px-9 py-3.5 bg-[#2D6BE4] hover:bg-[#4A82F0] text-white font-bold rounded-xl transition-colors text-sm"
            >
              Start Free Today
            </Link>
            <Link
              href="/pricing"
              className="glass px-9 py-3.5 hover:border-[#00D4FF]/50 hover:bg-white/10 text-white font-bold rounded-xl transition-all text-sm"
            >
              Go Premium
            </Link>
          </div>
        </Reveal>
      </section>

    </div>
  );
}

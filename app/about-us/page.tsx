import Image from "next/image";
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
    title: "Pinpoint Weaknesses",
    desc: "Focus on the subjects and topics that matter most. No more guessing — Nexi shows you exactly where to improve.",
  },
  {
    icon: IconBookOpen,
    title: "Learn Smarter",
    desc: "Structured study plans make revision stress-free. Work through content step by step, at your own pace.",
  },
  {
    icon: IconTrendingUp,
    title: "Grow Confident",
    desc: "Every step builds independence and exam readiness. Watch your marks — and your self-belief — rise.",
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
              Built in South Africa. For South African learners.
              Powered by AI, guided by heart.
            </p>
          </div>

          {/* Nexi image with glow */}
          <div className="flex-shrink-0 order-1 md:order-2 flex justify-center">
            <div className="relative animate-float">
              <div
                aria-hidden
                className="glow-ring absolute inset-0 m-auto w-[105%] h-[105%] -translate-y-1 rounded-full"
              />
              <Image
                src="/nexi.png"
                alt="Nexi mascot"
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
              <div className="w-10 h-10 rounded-xl bg-[#2D6BE4]/20 border border-[#00D4FF]/20 flex items-center justify-center mb-5 text-[#00D4FF]">
                <IconRocket className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-white mb-4">Our Mission</h2>
              <p className="text-white/50 text-sm leading-relaxed">
                At NexiStudy, our mission is simple: to help South African learners unlock their full
                potential. We provide smart, personalised tools that make studying clearer, easier,
                and more motivating.
              </p>
            </div>
          </Reveal>

          <Reveal delay={120} className="h-full">
            <div className="glass-card p-8 h-full">
              <div className="w-10 h-10 rounded-xl bg-[#00D4FF]/15 border border-[#00D4FF]/25 flex items-center justify-center mb-5 text-[#00D4FF]">
                <IconSparkles className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-white mb-4">Our Vision</h2>
              <p className="text-white/50 text-sm leading-relaxed">
                Our vision is bold: to redefine how students learn in South Africa. By combining local
                curriculum expertise with cutting-edge AI, we aim to make quality education accessible,
                engaging, and future-ready for every learner.
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

              <div className="flex-shrink-0 w-20 h-20 rounded-2xl bg-[#2D6BE4]/20 border border-[#00D4FF]/25 flex items-center justify-center text-[#00D4FF]">
                <IconUsers className="w-10 h-10" />
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
                <div className="glass-card p-8 h-full">
                  <div className="w-12 h-12 rounded-xl bg-[#2D6BE4]/20 border border-[#00D4FF]/20 flex items-center justify-center mb-5 text-[#00D4FF]">
                    <pillar.icon className="w-6 h-6" />
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

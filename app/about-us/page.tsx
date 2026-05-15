import Image from "next/image";
import Link from "next/link";

const VALUE_PILLARS = [
  {
    icon: "🎯",
    title: "Pinpoint Weaknesses",
    desc: "Focus on the subjects and topics that matter most. No more guessing — Nexi shows you exactly where to improve.",
  },
  {
    icon: "📖",
    title: "Learn Smarter",
    desc: "Structured study plans make revision stress-free. Work through content step by step, at your own pace.",
  },
  {
    icon: "💪",
    title: "Grow Confident",
    desc: "Every step builds independence and exam readiness. Watch your marks — and your self-belief — rise.",
  },
];

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-[#F0F4FF]">

      {/* ── 1. HERO ── */}
      <section className="bg-[#1B2A4A] text-white py-16 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10 md:gap-14">

          {/* Text */}
          <div className="flex-1 text-center md:text-left order-2 md:order-1">
            <span className="inline-block mb-4 px-4 py-1 rounded-full bg-[#2D6BE4]/20 text-[#7EABFF] text-sm font-medium tracking-wide uppercase">
              Our Story
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-5">
              About <span className="text-[#2D6BE4]">NexiStudy</span>
            </h1>
            <p className="text-lg text-gray-300 leading-relaxed max-w-xl">
              Built in South Africa. For South African learners.
              Powered by AI, guided by heart.
            </p>
          </div>

          {/* Nexi image */}
          <div className="flex-shrink-0 order-1 md:order-2 flex justify-center">
            <Image
              src="/nexi.png"
              alt="Nexi mascot"
              width={300}
              height={300}
              className="w-40 sm:w-52 md:w-auto md:h-64 object-contain drop-shadow-2xl"
              priority
            />
          </div>

        </div>
      </section>

      {/* ── 2. MISSION & VISION ── */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">

          <div className="bg-white rounded-2xl border border-[#1B2A4A]/10 shadow-sm p-8">
            <div className="w-10 h-10 rounded-xl bg-[#2D6BE4]/10 flex items-center justify-center mb-5">
              <span className="text-xl">🚀</span>
            </div>
            <h2 className="text-xl font-bold text-[#1B2A4A] mb-4">Our Mission</h2>
            <p className="text-gray-500 text-sm leading-relaxed">
              At NexiStudy, our mission is simple: to help South African learners unlock their full
              potential. We provide smart, personalised tools that make studying clearer, easier,
              and more motivating.
            </p>
          </div>

          <div className="bg-[#1B2A4A] rounded-2xl border border-white/8 shadow-sm p-8">
            <div className="w-10 h-10 rounded-xl bg-[#2D6BE4]/20 flex items-center justify-center mb-5">
              <span className="text-xl">🌟</span>
            </div>
            <h2 className="text-xl font-bold text-white mb-4">Our Vision</h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              Our vision is bold: to redefine how students learn in South Africa. By combining local
              curriculum expertise with cutting-edge AI, we aim to make quality education accessible,
              engaging, and future-ready for every learner.
            </p>
          </div>

        </div>
      </section>

      {/* ── 3. THE CHALLENGE ── */}
      <section className="py-16 px-4 bg-white border-y border-[#1B2A4A]/8">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block mb-4 px-4 py-1 rounded-full bg-[#F0F4FF] text-[#2D6BE4] text-sm font-semibold border border-[#2D6BE4]/20">
            Why We Exist
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1B2A4A] mb-6">
            The Challenge in Education Today
          </h2>
          <p className="text-gray-500 leading-relaxed text-base">
            South African learners face a perfect storm: information overload, overcrowded
            classrooms, and teachers carrying heavy workloads with limited time for individual
            attention. Too many students sit alone the night before an exam — overwhelmed,
            underprepared, and unsure where to start. NexiStudy was built to change that.
          </p>
        </div>
      </section>

      {/* ── 4. CORE PHILOSOPHY ── */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="bg-[#1B2A4A] rounded-2xl p-10 md:p-14 flex flex-col md:flex-row items-center gap-10">

            <div className="flex-shrink-0 text-6xl select-none">🤝</div>

            <div>
              <span className="inline-block mb-3 text-xs font-bold uppercase tracking-widest text-[#7EABFF]">
                Core Philosophy
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                Assisting, Not Replacing
              </h2>
              <p className="text-gray-400 leading-relaxed text-sm max-w-xl">
                We believe in the irreplaceable value of human teachers. NexiStudy is not here to
                replace the classroom — it&apos;s here to complement it. We lighten the load,
                sharpen study habits, and free up time so that what happens between a great teacher
                and a curious student can flourish.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ── 5. VALUE PILLARS ── */}
      <section className="py-16 px-4 bg-white border-t border-[#1B2A4A]/8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1B2A4A] mb-3">
              How We Help Learners Grow
            </h2>
            <p className="text-gray-500 text-sm max-w-lg mx-auto">
              Three principles behind everything NexiStudy does.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {VALUE_PILLARS.map((pillar) => (
              <div
                key={pillar.title}
                className="bg-[#F0F4FF] rounded-2xl border border-[#1B2A4A]/8 p-8 hover:shadow-md hover:border-[#2D6BE4]/30 transition-all"
              >
                <div className="text-4xl mb-5">{pillar.icon}</div>
                <h3 className="text-lg font-bold text-[#1B2A4A] mb-3">{pillar.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. CTA ── */}
      <section className="bg-[#2D6BE4] py-20 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Let&apos;s Transform Learning Together
          </h2>
          <p className="text-blue-100 mb-8 leading-relaxed">
            Whether you&apos;re a learner chasing your goals or a parent investing in your
            child&apos;s future — NexiStudy is ready when you are.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/signup"
              className="px-9 py-3.5 bg-white text-[#2D6BE4] font-bold rounded-xl hover:bg-blue-50 transition-colors text-sm shadow-lg"
            >
              Start Free Today
            </Link>
            <Link
              href="/pricing"
              className="px-9 py-3.5 border-2 border-white/40 hover:border-white text-white font-bold rounded-xl transition-colors text-sm"
            >
              Go Premium
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}

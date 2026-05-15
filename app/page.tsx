import Link from "next/link";
import Image from "next/image";

const differenceCards = [
  {
    icon: "🎯",
    title: "Personalised support for every subject",
    desc: "Fully aligned to CAPS, IEB & Cambridge curricula. Whether it's Maths, Life Sciences, or History — Nexi knows your syllabus.",
  },
  {
    icon: "🧑‍🏫",
    title: "Clear, step-by-step guidance",
    desc: "Explanations that feel like a real teacher sitting next to you — patient, clear, and focused on what you actually need.",
  },
  {
    icon: "⚡",
    title: "Tools that keep learners motivated",
    desc: "Save time, reduce exam stress, and build real confidence with tools designed for the South African learner journey.",
  },
];

const toolkitCards = [
  {
    icon: "📚",
    tag: "Study Pro",
    title: "Your Study Roadmap",
    desc: "Structured study plans, smart flashcards, and progress tracking built around your exam schedule.",
    href: "/studypro",
    cta: "Explore Study Pro",
  },
  {
    icon: "🤖",
    tag: "Nexi Tutor",
    title: "Your Personal Tutor",
    desc: "Ask any question, get instant step-by-step answers. Available 24/7 — no appointments needed.",
    href: "/nexi-tutor",
    cta: "Meet Nexi Tutor",
  },
  {
    icon: "🌍",
    tag: "Multilingual",
    title: "Nexi Support in Your Language",
    desc: "Switch between English, isiZulu, Afrikaans, and more. Learning is easier in the language you think in.",
    href: "/nexi-tutor",
    cta: "Try It Now",
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

export default function HomePage() {
  return (
    <div className="bg-[#F0F4FF]">

      {/* ── 1. HERO ── */}
      <section className="bg-[#1B2A4A] text-white py-20 px-4">
        <div className="max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center gap-10 md:gap-16">

          {/* Mascot */}
          <div className="flex-shrink-0 flex justify-center w-full md:w-auto">
            <Image
              src="/nexi.png"
              alt="Nexi mascot"
              width={400}
              height={400}
              className="w-48 sm:w-64 md:w-auto md:h-[400px] object-contain drop-shadow-2xl"
              priority
            />
          </div>

          {/* Text + CTAs */}
          <div className="flex-1 text-center md:text-left">
            <span className="inline-block mb-4 px-4 py-1 rounded-full bg-[#2D6BE4]/20 text-[#7EABFF] text-sm font-medium tracking-wide uppercase">
              Built for South African students
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Your Personal{" "}
              <span className="text-[#2D6BE4]">Study Companion</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 mb-10 max-w-2xl leading-relaxed">
              Made for South African learners. Stay on track, boost marks, and
              feel confident on exam day.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link
                href="/nexi-tutor"
                className="px-8 py-3.5 bg-[#2D6BE4] hover:bg-[#2558C5] text-white font-semibold rounded-xl transition-colors text-base shadow-lg shadow-[#2D6BE4]/30"
              >
                Ask Nexi anything...
              </Link>
              <Link
                href="/signup"
                className="px-8 py-3.5 border border-white/25 hover:bg-white/10 text-white font-semibold rounded-xl transition-colors text-base"
              >
                Sign Up Free
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* ── 2. TRUST BAR ── */}
      <section className="bg-white border-b border-[#1B2A4A]/8 py-8 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-6">
            Trusted by South Africa&apos;s leading curriculum systems
          </p>
          <div className="flex flex-wrap items-center justify-center gap-10">
            {[
              { label: "CAPS", sub: "Basic Education" },
              { label: "Cambridge", sub: "International" },
              { label: "IEB", sub: "Independent Exams" },
            ].map((badge) => (
              <div key={badge.label} className="flex flex-col items-center gap-1">
                <div className="h-10 w-10 rounded-full bg-[#1B2A4A] flex items-center justify-center">
                  <span className="text-white text-xs font-bold">{badge.label[0]}</span>
                </div>
                <span className="text-sm font-bold text-[#1B2A4A]">{badge.label}</span>
                <span className="text-xs text-gray-400">{badge.sub}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. THE NEXISTUDY DIFFERENCE ── */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1B2A4A] mb-3">
              The NexiStudy Difference
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              We don&apos;t just answer questions — we build understanding.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {differenceCards.map((card) => (
              <div
                key={card.title}
                className="bg-white rounded-2xl p-8 shadow-sm border border-[#1B2A4A]/8 hover:shadow-md hover:border-[#2D6BE4]/30 transition-all"
              >
                <div className="text-4xl mb-5">{card.icon}</div>
                <h3 className="text-lg font-semibold text-[#1B2A4A] mb-3 leading-snug">
                  {card.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. STUDY TOOLKIT ── */}
      <section className="bg-[#1B2A4A] py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
              Your Complete Study Toolkit
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              Everything in one place, designed around how South African learners actually study.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {toolkitCards.map((card) => (
              <div
                key={card.tag}
                className="bg-[#243660] rounded-2xl p-8 flex flex-col border border-white/8 hover:border-[#2D6BE4]/50 transition-all group"
              >
                <div className="text-4xl mb-4">{card.icon}</div>
                <span className="text-xs font-semibold uppercase tracking-widest text-[#7EABFF] mb-2">
                  {card.tag}
                </span>
                <h3 className="text-xl font-bold text-white mb-3">{card.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed flex-1">{card.desc}</p>
                <Link
                  href={card.href}
                  className="mt-6 inline-block text-sm font-semibold text-[#2D6BE4] group-hover:text-[#7EABFF] transition-colors"
                >
                  {card.cta} →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. TESTIMONIALS ── */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1B2A4A] mb-3">
              Real results from real learners
            </h2>
            <p className="text-gray-500">Across South Africa, students are seeing the difference.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="bg-white rounded-2xl p-8 shadow-sm border border-[#1B2A4A]/8 flex flex-col"
              >
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <span key={i} className="text-yellow-400 text-lg">★</span>
                  ))}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed flex-1 italic mb-6">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div>
                  <p className="font-semibold text-[#1B2A4A] text-sm">{t.name}</p>
                  <p className="text-xs text-gray-400">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. FINAL CTA ── */}
      <section className="bg-[#2D6BE4] py-20 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to study smarter?
          </h2>
          <p className="text-blue-100 mb-8 text-lg">
            Join thousands of South African learners already using NexiStudy.
            No credit card needed.
          </p>
          <Link
            href="/signup"
            className="inline-block px-10 py-4 bg-white text-[#2D6BE4] font-bold rounded-xl hover:bg-blue-50 transition-colors text-base shadow-lg"
          >
            Start Free Today
          </Link>
        </div>
      </section>

    </div>
  );
}

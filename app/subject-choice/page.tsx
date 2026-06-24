import Link from "next/link";
import Reveal from "@/components/Reveal";
import { pageMeta } from "@/lib/seo";
import {
  IconAcademicCap,
  IconTarget,
  IconChartBar,
  IconSparkles,
  IconUsers,
  IconBookOpen,
} from "@/components/icons";

// Single-wedge marketing landing page for the Grade 9 → Grade 10 subject-choice
// decision. Targets parents and learners searching for subject-choice help, and
// funnels them into the Subject Choice Advisor in Study Pro's Senior Phase view.
// Server component → statically prerendered for SEO. Gold-themed to match the
// Senior Phase. FAQ section doubles as keyword-rich content + FAQPage JSON-LD.

export const metadata = pageMeta({
  title: "Grade 9 Subject Choice Advisor — Choose Your Grade 10 Subjects",
  description:
    "Choosing Grade 10 subjects in Grade 9? Get free, evidence-based advice on Maths vs Maths Literacy and which three electives fit you — built for the South African CAPS curriculum.",
  path: "/subject-choice",
});

// Deep-link straight to the Subject Choice Advisor: forces the Senior Phase view
// (even for logged-out visitors) and scrolls to the tool.
const ADVISOR_LINK = "/studypro?phase=senior#subject-advisor";

const HOW_IT_HELPS = [
  {
    icon: IconChartBar,
    title: "Built on your real marks",
    desc: "Nexi reads your actual Grade 9 results — your practice-quiz mastery in Maths, Natural Sciences and EMS — so the advice is evidence, not a guess.",
  },
  {
    icon: IconTarget,
    title: "The big Maths decision, settled",
    desc: "Pure Maths or Mathematical Literacy is the choice that opens or closes the most doors. Nexi gives you a clear, honest call for your situation.",
  },
  {
    icon: IconUsers,
    title: "A plan your parents can follow",
    desc: "The full report names your three electives, what they open up, the watch-outs, and a calm summary parents can read in a minute.",
  },
];

const FAQ = [
  {
    q: "How many subjects do you take in Grade 10?",
    a: "Seven. Four are compulsory — Home Language, First Additional Language, Life Orientation, and either Mathematics or Mathematical Literacy — plus three elective subjects you choose.",
  },
  {
    q: "What's the difference between Mathematics and Mathematical Literacy?",
    a: "Pure Mathematics keeps the most doors open — it's required for engineering, medicine, BSc and science degrees, actuarial science and most BCom Accounting/Finance. Mathematical Literacy is more practical and everyday, but it isn't accepted for those fields. It's the single biggest subject choice you'll make.",
  },
  {
    q: "Can I switch from Maths Literacy to Mathematics later?",
    a: "It's very hard — schools rarely allow the switch and you'd have a lot of catching up to do. That's why it's safer to keep pure Mathematics in Grade 10 if there's any chance you'll want a maths-heavy career.",
  },
  {
    q: "When do Grade 9 learners choose their Grade 10 subjects?",
    a: "Usually in the second half of Grade 9, around Term 3 or 4. Your school hands out a subject-choice form — always confirm exactly which subjects and combinations your school offers.",
  },
  {
    q: "How does NexiStudy's Subject Choice Advisor work?",
    a: "It looks at your real Grade 9 performance — your practice-quiz results and marks — plus your dream career and what you enjoy, then recommends Maths or Maths Literacy and which three electives fit you, with a plain-language summary for your parents.",
  },
  {
    q: "Is it free?",
    a: "Yes — you get free advice on the biggest decision: Maths vs Mathematical Literacy plus a direction to explore. Premium unlocks the full report — your three-subject package, what it opens up, the watch-outs, and questions to ask your school.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

export default function SubjectChoicePage() {
  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* ── 1. HERO ── */}
      <section className="page-hero py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block mb-5 px-4 py-1 rounded-full border border-[#FFB454]/30 bg-[#FFB454]/10 text-[#FFB454] text-sm font-semibold tracking-wide uppercase">
            For Grade 9 learners &amp; parents
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-5 text-white">
            Choosing your <span className="text-[#FFB454]">Grade 10 subjects?</span>
          </h1>
          <p className="text-lg text-white/60 leading-relaxed max-w-2xl mx-auto mb-9">
            It&apos;s the biggest call you make in Grade 9 — it shapes your matric and what you can
            study afterwards. NexiStudy&apos;s Subject Choice Advisor helps you and your family
            choose with confidence, built for the South African CAPS curriculum.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={ADVISOR_LINK}
              className="px-9 py-3.5 bg-[#FFB454] hover:bg-[#FFC474] text-[#0A1628] font-bold rounded-xl transition-colors text-sm"
            >
              Get my free subject advice
            </Link>
            <Link
              href="/signup"
              className="glass px-9 py-3.5 hover:border-[#FFB454]/50 hover:bg-white/10 text-white font-bold rounded-xl transition-all text-sm"
            >
              Create a free account
            </Link>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ── 2. THE STAKES ── */}
      <section className="py-16 px-4">
        <Reveal className="max-w-3xl mx-auto text-center">
          <span className="inline-block mb-4 px-4 py-1 rounded-full glass text-[#FFB454] text-sm font-semibold">
            Why it matters so much
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            One choice can quietly <span className="text-[#FFB454]">close doors</span>
          </h2>
          <p className="text-white/60 leading-relaxed text-base mb-4">
            The Mathematics vs Mathematical Literacy decision is the one that catches families out.
            Mathematical Literacy isn&apos;t accepted for engineering, medicine and health sciences,
            BSc degrees, actuarial science, most BCom Accounting and many other fields — and
            switching back to pure Maths later is very hard.
          </p>
          <p className="text-white/60 leading-relaxed text-base">
            Most learners choose with a half-understood form and a rushed conversation. NexiStudy
            gives you an honest, evidence-based recommendation instead — so you choose knowing
            exactly what each path keeps open.
          </p>
        </Reveal>
      </section>

      <div className="section-divider" />

      {/* ── 3. HOW IT HELPS ── */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <Reveal className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
              Advice that&apos;s actually <span className="text-[#FFB454]">about you</span>
            </h2>
            <p className="text-white/50 text-sm max-w-lg mx-auto">
              Not generic tips — a recommendation grounded in your real Grade 9 performance.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {HOW_IT_HELPS.map((item, i) => (
              <Reveal key={item.title} delay={i * 120} className="h-full">
                <div className="group rounded-2xl border border-[#FFB454]/20 bg-[#0E1F3D] p-8 h-full transition-colors hover:border-[#FFB454]/45">
                  <div className="flex items-center gap-4 mb-5">
                    <span className="flex-shrink-0 text-[#FFB454]">
                      <item.icon className="w-8 h-8" />
                    </span>
                    <span className="h-px flex-1 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 bg-gradient-to-r from-[#FFB454]/40 to-transparent" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ── 4. FREE vs PREMIUM ── */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <Reveal className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
              Start <span className="text-[#FFB454]">free</span>
            </h2>
            <p className="text-white/50 text-sm max-w-lg mx-auto">
              The biggest decision is free. The full plan is Premium.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Reveal className="h-full">
              <div className="rounded-2xl border border-white/10 bg-[#0E1F3D] p-8 h-full">
                <div className="flex items-center gap-2.5 text-[#FFB454] mb-4">
                  <IconBookOpen className="w-5 h-5" />
                  <span className="text-xs font-bold uppercase tracking-widest text-white">Free</span>
                </div>
                <ul className="space-y-3 text-sm text-white/60 leading-relaxed">
                  <li>✅ A clear Maths vs Mathematical Literacy recommendation</li>
                  <li>✅ A stream direction (sciences / commerce / humanities) that fits you</li>
                  <li>✅ Free practice quizzes and your Grade 10 Readiness Check</li>
                </ul>
              </div>
            </Reveal>

            <Reveal delay={120} className="h-full">
              <div className="rounded-2xl border border-[#FFB454]/35 bg-[#FFB454]/[0.07] p-8 h-full">
                <div className="flex items-center gap-2.5 text-[#FFB454] mb-4">
                  <IconSparkles className="w-5 h-5" />
                  <span className="text-xs font-bold uppercase tracking-widest text-white">Premium</span>
                </div>
                <ul className="space-y-3 text-sm text-white/70 leading-relaxed">
                  <li>⭐ Your full three-subject package, with why each one fits you</li>
                  <li>⭐ What it opens up — study paths and careers</li>
                  <li>⭐ Watch-outs and the exact questions to ask your school</li>
                  <li>⭐ A calm summary written for your parents</li>
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ── 5. FAQ (keyword-rich + JSON-LD above) ── */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <Reveal className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
              Grade 9 subject-choice <span className="text-[#FFB454]">questions</span>
            </h2>
          </Reveal>

          <div className="space-y-4">
            {FAQ.map((item, i) => (
              <Reveal key={item.q} delay={i * 60}>
                <div className="rounded-2xl border border-white/10 bg-[#0E1F3D] p-6">
                  <h3 className="text-white font-bold text-base mb-2.5">{item.q}</h3>
                  <p className="text-white/55 text-sm leading-relaxed">{item.a}</p>
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
          className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FFB454]/10 to-[#FFB454]/15 pointer-events-none"
        />
        <Reveal className="relative max-w-2xl mx-auto">
          <div className="flex justify-center mb-5 text-[#FFB454]">
            <IconAcademicCap className="w-12 h-12" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Choose with <span className="text-[#FFB454]">confidence</span>
          </h2>
          <p className="text-white/60 mb-8 leading-relaxed">
            Get your free Maths-vs-Maths-Literacy call and a direction in minutes. Create a free
            account — no card needed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={ADVISOR_LINK}
              className="px-9 py-3.5 bg-[#FFB454] hover:bg-[#FFC474] text-[#0A1628] font-bold rounded-xl transition-colors text-sm"
            >
              Get my free subject advice
            </Link>
            <Link
              href="/pricing"
              className="glass px-9 py-3.5 hover:border-[#FFB454]/50 hover:bg-white/10 text-white font-bold rounded-xl transition-all text-sm"
            >
              See Premium
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}

import Link from "next/link";
import Reveal from "@/components/Reveal";
import { pageMeta } from "@/lib/seo";
import {
  IconChartBar,
  IconAcademicCap,
  IconRocket,
  IconSparkles,
  IconBookOpen,
  IconTrendingUp,
} from "@/components/icons";

// Single-wedge marketing landing page for matric (Grade 12) learners around the
// APS / university-admission decision. Targets high-intent searches like "APS
// calculator" and "what can I study", and funnels into Study Pro's FET view.
// Server component → statically prerendered for SEO. Cyan/blue themed to match
// the FET view. FAQ doubles as keyword-rich content + FAQPage JSON-LD.

export const metadata = pageMeta({
  title: "Matric APS Calculator — See Which University Courses You Qualify For",
  description:
    "Free APS calculator for South African matrics. Work out your Admission Point Score, see the real university courses and qualifications you qualify for, and get funding and career direction — built for the NSC/CAPS curriculum.",
  path: "/matric",
});

// FET view is the default in Study Pro; ?phase=fet forces it even for a logged-in
// Grade 8/9 account, landing on the APS Score tab.
const APS_LINK = "/studypro?phase=fet";

const HOW_IT_HELPS = [
  {
    icon: IconChartBar,
    title: "Your APS in seconds",
    desc: "Punch in your marks and NexiStudy works out your Admission Point Score the way universities do — your best six subjects on the NSC 7-point scale.",
  },
  {
    icon: IconAcademicCap,
    title: "See what you actually qualify for",
    desc: "Stop guessing. NexiStudy matches your score to real degrees, diplomas and certificates across South African universities — so you apply where you have a shot.",
  },
  {
    icon: IconRocket,
    title: "Funding & a career direction",
    desc: "Worried about paying for it? Get pointed toward NSFAS and bursaries, plus honest guidance on careers that fit your marks and what you enjoy.",
  },
];

const FAQ = [
  {
    q: "How is the APS score calculated?",
    a: "Your APS (Admission Point Score) adds up points from your best six subjects, usually excluding Life Orientation. Each subject scores 1 to 7 based on your percentage — 80–100% = 7, 70–79% = 6, 60–69% = 5, 50–59% = 4, and so on. Most universities work to a total out of 42, though some calculate it slightly differently, so always check the specific university.",
  },
  {
    q: "What APS do I need to get into university?",
    a: "It depends on the university and the course. Competitive degrees like Medicine, Engineering and Actuarial Science need very high scores, while many diplomas and degrees accept a wider range. NexiStudy's APS calculator shows you the actual courses you qualify for based on your marks, so you don't have to guess.",
  },
  {
    q: "Does Life Orientation count towards my APS?",
    a: "Most universities leave Life Orientation out of the APS and count your best six of the remaining subjects. A few give it partial credit. Check each university's exact rule.",
  },
  {
    q: "What can I study if my APS is low?",
    a: "Plenty. Universities, universities of technology and TVET colleges offer diplomas, higher certificates and extended or bridging programmes that accept lower scores and can lead into a degree. NexiStudy helps you find the options that fit your marks instead of only the ones that don't.",
  },
  {
    q: "What is NSFAS and how do I fund my studies?",
    a: "NSFAS is the government's National Student Financial Aid Scheme, which funds tuition and living costs for qualifying students from lower-income households. There are also company and university bursaries. NexiStudy's Funding & Career advisor points you toward options to explore — always apply through the official NSFAS and university websites.",
  },
  {
    q: "When should I apply to university?",
    a: "Applications usually open early in your matric year and many close around the middle of the year — well before final exams, and some popular courses close even earlier. Apply as early as you can and confirm each institution's exact dates.",
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

export default function MatricPage() {
  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* ── 1. HERO ── */}
      <section className="page-hero py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block mb-5 px-4 py-1 rounded-full glass text-[#00D4FF] text-sm font-semibold tracking-wide uppercase">
            For matrics
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-5 text-white">
            What can you study <span className="text-gradient">after matric?</span>
          </h1>
          <p className="text-lg text-white/60 leading-relaxed max-w-2xl mx-auto mb-9">
            Your APS score decides which universities and courses you can apply to. Work out your
            score free, see the real qualifications you&apos;ll get in for, and find funding — all
            built for the South African NSC curriculum.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={APS_LINK}
              className="px-9 py-3.5 bg-[#2D6BE4] hover:bg-[#4A82F0] text-white font-bold rounded-xl transition-colors text-sm shadow-lg shadow-[#2D6BE4]/30"
            >
              Calculate my APS free
            </Link>
            <Link
              href="/past-papers"
              className="glass px-9 py-3.5 hover:border-[#00D4FF]/50 hover:bg-white/10 text-white font-bold rounded-xl transition-all text-sm"
            >
              Free past papers
            </Link>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ── 2. THE STAKES ── */}
      <section className="py-16 px-4">
        <Reveal className="max-w-3xl mx-auto text-center">
          <span className="inline-block mb-4 px-4 py-1 rounded-full glass text-[#00D4FF] text-sm font-semibold">
            Why it matters
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Don&apos;t apply <span className="text-gradient">blind</span>
          </h2>
          <p className="text-white/60 leading-relaxed text-base mb-4">
            Every year thousands of matrics apply for courses they were never going to get into — or
            miss courses they easily qualified for — because nobody worked out their APS properly.
            Application fees add up, deadlines pass, and good options slip by.
          </p>
          <p className="text-white/60 leading-relaxed text-base">
            NexiStudy turns your marks into a clear picture: your exact APS, the courses within
            reach, and where to aim. You apply with a plan instead of a guess.
          </p>
        </Reveal>
      </section>

      <div className="section-divider" />

      {/* ── 3. HOW IT HELPS ── */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <Reveal className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
              From your marks to a <span className="text-gradient">real plan</span>
            </h2>
            <p className="text-white/50 text-sm max-w-lg mx-auto">
              Three steps that take you from a report card to a shortlist of courses.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {HOW_IT_HELPS.map((item, i) => (
              <Reveal key={item.title} delay={i * 120} className="h-full">
                <div className="group glass-card p-8 h-full">
                  <div className="flex items-center gap-4 mb-5">
                    <span className="flex-shrink-0 text-[#00D4FF]">
                      <item.icon className="w-8 h-8" />
                    </span>
                    <span className="h-px flex-1 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 bg-gradient-to-r from-[#00D4FF]/40 to-transparent" />
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
              Start <span className="text-gradient">free</span>
            </h2>
            <p className="text-white/50 text-sm max-w-lg mx-auto">
              The tools that get you in the door are free. Premium is for acing the exams.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Reveal className="h-full">
              <div className="rounded-2xl border border-white/10 bg-[#0E1F3D] p-8 h-full">
                <div className="flex items-center gap-2.5 text-[#00D4FF] mb-4">
                  <IconBookOpen className="w-5 h-5" />
                  <span className="text-xs font-bold uppercase tracking-widest text-white">Free</span>
                </div>
                <ul className="space-y-3 text-sm text-white/60 leading-relaxed">
                  <li>✅ APS calculator + the courses you qualify for</li>
                  <li>✅ Funding &amp; career direction (a free taste)</li>
                  <li>✅ Past papers for every subject, and topic practice quizzes</li>
                </ul>
              </div>
            </Reveal>

            <Reveal delay={120} className="h-full">
              <div className="rounded-2xl border border-[#00D4FF]/35 bg-[#00D4FF]/[0.06] p-8 h-full">
                <div className="flex items-center gap-2.5 text-[#00D4FF] mb-4">
                  <IconSparkles className="w-5 h-5" />
                  <span className="text-xs font-bold uppercase tracking-widest text-white">Premium</span>
                </div>
                <ul className="space-y-3 text-sm text-white/70 leading-relaxed">
                  <li>⭐ Unlimited Nexi Tutor — step-by-step help in every subject</li>
                  <li>⭐ Mark My Answer — photograph your work, marked like an examiner</li>
                  <li>⭐ The full funding &amp; career roadmap, and a weak-spots map</li>
                  <li>⭐ Past-paper walkthroughs and exam-season practice</li>
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
              APS &amp; university <span className="text-gradient">questions</span>
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
          className="absolute inset-0 bg-gradient-to-b from-transparent via-[#2D6BE4]/10 to-[#2D6BE4]/20 pointer-events-none"
        />
        <Reveal className="relative max-w-2xl mx-auto">
          <div className="flex justify-center mb-5 text-[#00D4FF]">
            <IconTrendingUp className="w-12 h-12" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Know your <span className="text-gradient">options</span>
          </h2>
          <p className="text-white/60 mb-8 leading-relaxed">
            Calculate your APS and see what you qualify for in minutes. Create a free account — no
            card needed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={APS_LINK}
              className="px-9 py-3.5 bg-[#2D6BE4] hover:bg-[#4A82F0] text-white font-bold rounded-xl transition-colors text-sm shadow-lg shadow-[#2D6BE4]/30"
            >
              Calculate my APS free
            </Link>
            <Link
              href="/pricing"
              className="glass px-9 py-3.5 hover:border-[#00D4FF]/50 hover:bg-white/10 text-white font-bold rounded-xl transition-all text-sm"
            >
              See Premium
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}

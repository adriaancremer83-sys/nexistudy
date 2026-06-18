import Link from "next/link";
import Reveal from "@/components/Reveal";
import { pageMeta } from "@/lib/seo";
import { IconDocumentText, IconSparkles, IconChevronDown } from "@/components/icons";
import { getSubjects, GROUP_ORDER } from "@/lib/pastPapers";

export const metadata = pageMeta({
  title: "NSC Past Exam Papers & Memos — All Subjects, Free",
  description:
    "Download official Grade 12 NSC past exam papers and memos for Mathematics, Physical Sciences, Life Sciences, Accounting, all 11 languages and more — free, organised by grade, subject and year. Grade 10 & 11 exam-style practice included.",
  path: "/past-papers",
});

const GROUP_BLURBS: Record<string, string> = {
  Core: "The gateway subjects every learner writes",
  Sciences: "Physical, Life and Agricultural Sciences",
  Commerce: "Accounting, Business Studies and Economics",
  Humanities: "Geography, History and Tourism",
  Technology: "CAT and Information Technology",
  Languages: "All 11 official languages — HL and FAL",
};

// The national NSC exam is Grade 12 only, so rather than host a back-catalogue
// for Grade 10 & 11 we add papers on request — the panel emails the team — and
// point learners at Nexi's practice quizzes in the meantime.
function RequestPanel({ grade }: { grade: number }) {
  const subject = `Grade ${grade} past paper request`;
  const body =
    `Hi NexiStudy team,\n\nPlease could you add Grade ${grade} past papers for:\n\n` +
    `Subject(s): \nYear(s): \n\nThanks!`;
  const mailto = `mailto:info@nexistudy.co.za?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  return (
    <div className="px-6 pb-6 pt-2">
      <div className="rounded-xl border border-white/[0.06] bg-[#0A1730] p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
        <div className="flex items-start gap-4">
          <span className="text-[#00D4FF] flex-shrink-0">
            <IconDocumentText className="w-8 h-8" />
          </span>
          <div>
            <h3 className="text-white font-bold mb-1">Need a Grade {grade} paper?</h3>
            <p className="text-white/50 text-sm leading-relaxed max-w-lg">
              We add Grade {grade} past papers on request. Tell us the subject and
              year you need and we&apos;ll sort it out — or sharpen up right now with
              Nexi&apos;s CAPS-aligned, blind-verified practice quizzes.
            </p>
          </div>
        </div>
        <div className="flex flex-col items-stretch gap-2 flex-shrink-0">
          <a
            href={mailto}
            className="text-center px-6 py-3 bg-[#2D6BE4] hover:bg-[#4A82F0] text-white font-bold text-sm rounded-xl transition-colors whitespace-nowrap"
          >
            Request papers →
          </a>
          <Link
            href="/practice"
            className="text-center text-xs text-white/50 hover:text-white transition-colors"
          >
            Practise instead →
          </Link>
        </div>
      </div>
    </div>
  );
}

// Summary header shared by every grade dropdown.
function GradeSummary({ grade, sub }: { grade: number; sub: string }) {
  return (
    <summary className="flex items-center justify-between gap-4 px-6 py-5 cursor-pointer list-none select-none hover:bg-white/[0.02] transition-colors">
      <div className="flex items-baseline gap-3 flex-wrap">
        <h2 className="text-white font-bold text-xl">Grade {grade}</h2>
        <span className="text-xs text-white/40">{sub}</span>
      </div>
      <IconChevronDown className="w-5 h-5 text-white/40 flex-shrink-0 transition-transform duration-200 group-open:rotate-180" />
    </summary>
  );
}

export default function PastPapersPage() {
  const subjects = getSubjects();
  const groups = GROUP_ORDER.filter((g) => subjects.some((s) => s.group === g));
  const totalPapers = subjects.reduce((n, s) => n + s.paperCount, 0);
  const yearFrom = Math.min(...subjects.map((s) => s.yearFrom));
  const yearTo = Math.max(...subjects.map((s) => s.yearTo));
  const yearLabel = yearFrom === yearTo ? `${yearTo}` : `${yearFrom}–${yearTo}`;

  return (
    <div className="min-h-screen">
      <section className="page-hero py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <p className="text-[#00D4FF] text-sm font-medium mb-1">Past Papers</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-white">
            NSC Past Exam Papers
          </h1>
          <p className="text-white/40 text-sm mt-2 max-w-xl leading-relaxed">
            Official Grade 12 papers and memos, straight from the Department of
            Basic Education — free, and organised by grade. Pick your grade, then
            your subject, to see every paper by year.
          </p>
        </div>
      </section>

      <div className="section-divider" />

      <div className="max-w-5xl mx-auto px-4 py-10 space-y-4">

        {/* ── GRADE 12 — the real NSC papers ── */}
        <details open className="group rounded-2xl border border-white/[0.08] bg-[#0E1F3D]/60 overflow-hidden">
          <GradeSummary grade={12} sub={`NSC · ${totalPapers} papers with memos · ${yearLabel}`} />
          <div className="px-6 pb-6 pt-2 space-y-10">
            {groups.map((group) => (
              <section key={group}>
                <div className="flex items-baseline justify-between flex-wrap gap-2 mb-4">
                  <h3 className="text-white font-bold text-lg">{group}</h3>
                  <span className="text-xs text-white/30">{GROUP_BLURBS[group]}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {subjects
                    .filter((s) => s.group === group)
                    .map((s) => (
                      <Link
                        key={s.slug}
                        href={`/past-papers/${s.slug}`}
                        className="group/card rounded-2xl border border-white/[0.08] bg-[#0A1730] p-5 transition-[border-color,box-shadow] duration-300 hover:border-[#00D4FF]/40 hover:shadow-[0_0_24px_rgba(0,212,255,0.12)]"
                      >
                        <div className="flex items-center justify-between gap-3 mb-2">
                          <h4 className="text-white font-bold leading-snug">{s.subject}</h4>
                          <IconDocumentText className="w-5 h-5 text-[#00D4FF] flex-shrink-0" />
                        </div>
                        <p className="text-white/40 text-xs">
                          {s.paperCount} {s.paperCount === 1 ? "paper" : "papers"} with memos ·{" "}
                          {s.yearFrom === s.yearTo ? s.yearTo : `${s.yearFrom}–${s.yearTo}`}
                        </p>
                        <span className="inline-block mt-3 text-xs font-semibold text-[#00D4FF] group-hover/card:text-white transition-colors">
                          View papers →
                        </span>
                      </Link>
                    ))}
                </div>
              </section>
            ))}
          </div>
        </details>

        {/* ── GRADE 11 ── */}
        <details className="group rounded-2xl border border-white/[0.08] bg-[#0E1F3D]/60 overflow-hidden">
          <GradeSummary grade={11} sub="Papers on request" />
          <RequestPanel grade={11} />
        </details>

        {/* ── GRADE 10 ── */}
        <details className="group rounded-2xl border border-white/[0.08] bg-[#0E1F3D]/60 overflow-hidden">
          <GradeSummary grade={10} sub="Papers on request" />
          <RequestPanel grade={10} />
        </details>

        <Reveal delay={120}>
          <div className="glass-strong rounded-2xl p-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 !border-[#00D4FF]/25 mt-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 text-[#00D4FF]">
                <IconSparkles className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg mb-1">
                  Don&apos;t just download — actually improve
                </h3>
                <p className="text-white/50 text-sm leading-relaxed max-w-md">
                  With a free NexiStudy account, Nexi quizzes you topic by topic,
                  maps your weak spots, and shows you exactly what to fix before
                  the exam.
                </p>
              </div>
            </div>
            <Link
              href="/signup"
              className="flex-shrink-0 px-6 py-3 bg-[#2D6BE4] hover:bg-[#4A82F0] text-white font-bold text-sm rounded-xl transition-colors whitespace-nowrap"
            >
              Create free account →
            </Link>
          </div>
        </Reveal>

        <p className="text-white/35 text-xs leading-relaxed">
          Can&apos;t find a paper, subject or year?{" "}
          <a
            href={`mailto:info@nexistudy.co.za?subject=${encodeURIComponent("Past paper request")}&body=${encodeURIComponent("Hi NexiStudy team,\n\nPlease could you add the following past paper(s):\n\nGrade: \nSubject(s): \nYear(s): \n\nThanks!")}`}
            className="text-[#00D4FF] hover:text-white transition-colors font-semibold"
          >
            Request it &rarr;
          </a>
        </p>

        <p className="text-white/25 text-xs leading-relaxed">
          Papers and memoranda are published by the Department of Basic Education
          and download directly from education.gov.za.
        </p>
      </div>
    </div>
  );
}

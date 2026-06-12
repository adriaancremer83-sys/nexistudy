import Link from "next/link";
import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import { IconDocumentText, IconSparkles } from "@/components/icons";
import { getSubjects, GROUP_ORDER } from "@/lib/pastPapers";

export const metadata: Metadata = {
  title: "NSC Past Exam Papers — All Subjects, Free | NexiStudy",
  description:
    "Download official Grade 12 NSC past exam papers and memos for Mathematics, Physical Sciences, Life Sciences, Accounting, all 11 languages and more — free, organised by subject and year.",
};

const GROUP_BLURBS: Record<string, string> = {
  Core: "The gateway subjects every learner writes",
  Sciences: "Physical, Life and Agricultural Sciences",
  Commerce: "Accounting, Business Studies and Economics",
  Humanities: "Geography, History and Tourism",
  Technology: "CAT and Information Technology",
  Languages: "All 11 official languages — HL and FAL",
};

export default function PastPapersPage() {
  const subjects = getSubjects();
  const groups = GROUP_ORDER.filter((g) => subjects.some((s) => s.group === g));

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
            Basic Education — free, and organised so you find your subject in
            seconds. Pick a subject to see its papers by year.
          </p>
        </div>
      </section>

      <div className="section-divider" />

      <div className="max-w-5xl mx-auto px-4 py-10 space-y-10">
        {groups.map((group, gi) => (
          <Reveal key={group} delay={60 + gi * 60}>
            <section>
              <div className="flex items-baseline justify-between flex-wrap gap-2 mb-4">
                <h2 className="text-white font-bold text-xl">{group}</h2>
                <span className="text-xs text-white/30">{GROUP_BLURBS[group]}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {subjects
                  .filter((s) => s.group === group)
                  .map((s) => (
                    <Link
                      key={s.slug}
                      href={`/past-papers/${s.slug}`}
                      className="group rounded-2xl border border-white/[0.08] bg-[#0E1F3D] p-5 transition-[border-color,box-shadow] duration-300 hover:border-[#00D4FF]/40 hover:shadow-[0_0_24px_rgba(0,212,255,0.12)]"
                    >
                      <div className="flex items-center justify-between gap-3 mb-2">
                        <h3 className="text-white font-bold leading-snug">{s.subject}</h3>
                        <IconDocumentText className="w-5 h-5 text-[#00D4FF] flex-shrink-0" />
                      </div>
                      <p className="text-white/40 text-xs">
                        {s.paperCount} {s.paperCount === 1 ? "paper" : "papers"} with memos ·{" "}
                        {s.yearFrom === s.yearTo ? s.yearTo : `${s.yearFrom}–${s.yearTo}`}
                      </p>
                      <span className="inline-block mt-3 text-xs font-semibold text-[#00D4FF] group-hover:text-white transition-colors">
                        View papers →
                      </span>
                    </Link>
                  ))}
              </div>
            </section>
          </Reveal>
        ))}

        <Reveal delay={420}>
          <div className="glass-strong rounded-2xl p-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 !border-[#00D4FF]/25">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#2D6BE4]/20 border border-[#00D4FF]/20 flex items-center justify-center flex-shrink-0 text-[#00D4FF]">
                <IconSparkles className="w-6 h-6" />
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

        <p className="text-white/25 text-xs leading-relaxed">
          Papers and memoranda are published by the Department of Basic Education
          and download directly from education.gov.za.
        </p>
      </div>
    </div>
  );
}

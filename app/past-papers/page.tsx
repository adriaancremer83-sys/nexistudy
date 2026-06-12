import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import Link from "next/link";
import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import { IconDocumentText, IconSparkles, IconTarget } from "@/components/icons";
import { PAST_PAPERS } from "@/lib/pastPapers";

export const metadata: Metadata = {
  title: "NSC Past Exam Papers — Free Download | NexiStudy",
  description:
    "Download official Grade 12 NSC Mathematics past exam papers and memos from the Department of Basic Education — free, organised by year.",
};

export default async function PastPapersPage() {
  const session = await getServerSession(authOptions);
  const loggedIn = Boolean(session?.user);

  // Group papers by year, newest first
  const years = [...new Set(PAST_PAPERS.map((p) => p.year))].sort((a, b) => b - a);

  return (
    <div className="min-h-screen">
      <section className="page-hero py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <p className="text-[#00D4FF] text-sm font-medium mb-1">Past Papers</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-white">
            NSC Past Exam Papers
          </h1>
          <p className="text-white/40 text-sm mt-2 max-w-xl leading-relaxed">
            Official papers and memos, straight from the Department of Basic
            Education. Free for everyone — practising with real papers is the
            single best way to prepare for the real thing.
          </p>
        </div>
      </section>

      <div className="section-divider" />

      <div className="max-w-5xl mx-auto px-4 py-10 space-y-6">
        <Reveal>
          <div className="flex items-center justify-between flex-wrap gap-3">
            <h2 className="text-white font-bold text-xl">Grade 12 · Mathematics</h2>
            <span className="text-xs font-semibold uppercase tracking-widest text-white/30">
              More subjects on the way
            </span>
          </div>
        </Reveal>

        {years.map((year, i) => {
          const papers = PAST_PAPERS.filter((p) => p.year === year);
          return (
            <Reveal key={year} delay={80 + i * 80}>
              <div className="rounded-2xl border border-white/[0.08] bg-[#0E1F3D] overflow-hidden">
                <div className="px-6 py-4 border-b border-white/10 bg-white/5 flex items-center gap-2.5 text-[#00D4FF]">
                  <IconDocumentText className="w-4 h-4" />
                  <h3 className="text-xs font-semibold text-white uppercase tracking-widest">
                    {papers[0].session} {year}
                  </h3>
                </div>
                <ul className="divide-y divide-white/[0.06]">
                  {papers.map((p) => (
                    <li
                      key={p.paper}
                      className="px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <span className="text-white font-semibold text-sm">
                        {p.subject} {p.paper}
                      </span>
                      <span className="flex gap-2.5 flex-shrink-0">
                        <a
                          href={p.paperUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 bg-[#2D6BE4] hover:bg-[#4A82F0] text-white text-xs font-bold rounded-lg transition-colors"
                        >
                          Question Paper ↓
                        </a>
                        <a
                          href={p.memoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 glass hover:bg-white/10 text-white/80 hover:text-white text-xs font-bold rounded-lg transition-colors"
                        >
                          Memo ↓
                        </a>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          );
        })}

        {/* Work the paper, then fix the gaps */}
        <Reveal delay={360}>
          <div className="glass-strong rounded-2xl p-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 !border-[#00D4FF]/25">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#2D6BE4]/20 border border-[#00D4FF]/20 flex items-center justify-center flex-shrink-0 text-[#00D4FF]">
                {loggedIn ? <IconTarget className="w-6 h-6" /> : <IconSparkles className="w-6 h-6" />}
              </div>
              <div>
                <h3 className="text-white font-bold text-lg mb-1">
                  {loggedIn
                    ? "Found a section you struggled with?"
                    : "Don't just download — actually improve"}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed max-w-md">
                  {loggedIn
                    ? "Take a quick topic quiz and Nexi will add it to your weak-spots map, then help you fix it before exam day."
                    : "Create a free account and Nexi will quiz you topic by topic, map your weak spots, and show you exactly what to fix before the exam."}
                </p>
              </div>
            </div>
            <Link
              href={loggedIn ? "/practice" : "/signup"}
              className="flex-shrink-0 px-6 py-3 bg-[#2D6BE4] hover:bg-[#4A82F0] text-white font-bold text-sm rounded-xl transition-colors whitespace-nowrap"
            >
              {loggedIn ? "Practise weak topics →" : "Create free account →"}
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

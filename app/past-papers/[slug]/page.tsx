import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import { pageMeta } from "@/lib/seo";
import { IconDocumentText, IconTarget } from "@/components/icons";
import { getSubjects, getSubjectPapers, type PastPaper } from "@/lib/pastPapers";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getSubjects().map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const papers = getSubjectPapers(slug);
  if (papers.length === 0) return {};
  const subject = papers[0].subject;
  return pageMeta({
    title: `${subject} Past Exam Papers & Memos — Free Download`,
    description: `Official Grade 12 NSC ${subject} past exam papers with memos from the Department of Basic Education. Free downloads, organised by year.`,
    path: `/past-papers/${slug}`,
  });
}

const LEVEL_LABELS: Record<string, string> = {
  HL: "Home Language",
  FAL: "First Additional Language",
  SAL: "Second Additional Language",
};

function PaperRow({ p }: { p: PastPaper }) {
  return (
    <li className="px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <span className="text-white font-semibold text-sm">
        {p.paper}
        {p.level && <span className="text-white/40 font-normal"> · {LEVEL_LABELS[p.level] ?? p.level}</span>}
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
  );
}

export default async function SubjectPapersPage({ params }: Props) {
  const { slug } = await params;
  const papers = getSubjectPapers(slug);
  if (papers.length === 0) notFound();

  const subject = papers[0].subject;
  const years = [...new Set(papers.map((p) => p.year))].sort((a, b) => b - a);
  const levelOrder = ["HL", "FAL", "SAL"];

  return (
    <div className="min-h-screen">
      <section className="page-hero py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <Link
            href="/past-papers"
            className="text-[#00D4FF] text-sm font-medium mb-1 inline-block hover:text-white transition-colors"
          >
            ← All subjects
          </Link>
          <h1 className="text-3xl sm:text-4xl font-bold text-white">
            {subject} Past Papers
          </h1>
          <p className="text-white/40 text-sm mt-2 max-w-xl leading-relaxed">
            Official Grade 12 NSC papers and memos, newest first. Work the
            paper under exam conditions, then mark yourself with the memo.
          </p>
        </div>
      </section>

      <div className="section-divider" />

      <div className="max-w-5xl mx-auto px-4 py-10 space-y-6">
        {years.map((year, i) => {
          const yearPapers = papers
            .filter((p) => p.year === year)
            .sort(
              (a, b) =>
                levelOrder.indexOf(a.level ?? "") - levelOrder.indexOf(b.level ?? "") ||
                a.paper.localeCompare(b.paper)
            );
          return (
            <Reveal key={year} delay={60 + i * 60}>
              <div className="rounded-2xl border border-white/[0.08] bg-[#0E1F3D] overflow-hidden">
                <div className="px-6 py-4 border-b border-white/10 bg-white/5 flex items-center gap-2.5 text-[#00D4FF]">
                  <IconDocumentText className="w-4 h-4" />
                  <h2 className="text-xs font-semibold text-white uppercase tracking-widest">
                    {yearPapers[0].session} {year}
                  </h2>
                </div>
                <ul className="divide-y divide-white/[0.06]">
                  {yearPapers.map((p) => (
                    <PaperRow key={`${p.level ?? ""}-${p.paper}`} p={p} />
                  ))}
                </ul>
              </div>
            </Reveal>
          );
        })}

        {subject === "Mathematics" && (
          <Reveal delay={300}>
            <div className="glass-strong rounded-2xl p-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 !border-[#00D4FF]/25">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 text-[#00D4FF]">
                  <IconTarget className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg mb-1">
                    Struggled with a section?
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed max-w-md">
                    Take a quick Maths topic quiz and Nexi will map your weak
                    spots, then help you fix them before exam day.
                  </p>
                </div>
              </div>
              <Link
                href="/practice"
                className="flex-shrink-0 px-6 py-3 bg-[#2D6BE4] hover:bg-[#4A82F0] text-white font-bold text-sm rounded-xl transition-colors whitespace-nowrap"
              >
                Practise Maths topics →
              </Link>
            </div>
          </Reveal>
        )}

        <p className="text-white/25 text-xs leading-relaxed">
          Papers and memoranda are published by the Department of Basic Education
          and download directly from education.gov.za.
        </p>
      </div>
    </div>
  );
}

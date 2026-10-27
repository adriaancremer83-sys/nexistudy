import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import { pageMeta, breadcrumbJsonLd } from "@/lib/seo";
import { IconDocumentText, IconTarget } from "@/components/icons";
import { getSubjects, getSubjectPapers, type PastPaper } from "@/lib/pastPapers";

function yearRange(papers: PastPaper[]): string {
  const years = papers.map((p) => p.year);
  const from = Math.min(...years);
  const to = Math.max(...years);
  return from === to ? String(to) : `${from}–${to}`;
}

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
  const range = yearRange(papers);
  // Afrikaans searchers look for "vraestelle en memorandums" — say it.
  const afrikaans = slug === "afrikaans";
  return pageMeta({
    title: afrikaans
      ? `Graad 12 Afrikaans Vraestelle & Memos (${range}) | Past Papers`
      : `Grade 12 ${subject} Past Papers & Memos (${range})`,
    description: afrikaans
      ? `Gratis amptelike NSS Graad 12 Afrikaans vraestelle en memorandums (${range}) — Huistaal, Eerste en Tweede Addisionele Taal. Free official NSC Afrikaans past papers & memos, with free help from Nexi.`
      : `Free official Grade 12 NSC ${subject} past papers and memos (${range}), November exams — download every paper with its memorandum, then get stuck questions explained step by step by Nexi, free.`,
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
  const group = papers[0].group;
  const years = [...new Set(papers.map((p) => p.year))].sort((a, b) => b - a);
  const range = yearRange(papers);
  const levels = [...new Set(papers.map((p) => p.level).filter(Boolean))] as string[];
  const related = getSubjects().filter((s) => s.group === group && s.slug !== slug);
  const levelOrder = ["HL", "FAL", "SAL"];

  const breadcrumbs = breadcrumbJsonLd([
    ["Home", "/"],
    ["Past Papers", "/past-papers"],
    [`${subject} Past Papers`, `/past-papers/${slug}`],
  ]);

  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <section className="page-hero py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <Link
            href="/past-papers"
            className="text-[#00D4FF] text-sm font-medium mb-1 inline-block hover:text-white transition-colors"
          >
            ← All subjects
          </Link>
          <h1 className="text-3xl sm:text-4xl font-bold text-white">
            {`Grade 12 ${subject} Past Papers & Memos`}
          </h1>
          <p className="text-white/50 text-sm mt-2 max-w-2xl leading-relaxed">
            All {papers.length} official NSC {subject} November exam papers from {range}, each with
            its memorandum
            {levels.length > 0 && <> — {levels.map((l) => LEVEL_LABELS[l] ?? l).join(", ")}</>}.
            Newest first. Work the paper under exam conditions, then mark yourself with the memo.
          </p>
        </div>
      </section>

      <div className="section-divider" />

      <div className="max-w-5xl mx-auto px-4 py-10 space-y-6">
        {/* Past papers are the site's biggest traffic source — turn a download
            into a first conversation with Nexi. */}
        <div className="rounded-2xl border border-[#FFB454]/30 bg-[#FFB454]/[0.06] p-6 flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div>
            <h2 className="text-white font-bold text-lg mb-1">Stuck on a question from this paper?</h2>
            <p className="text-white/55 text-sm leading-relaxed max-w-xl">
              Type it in and Nexi explains it step by step, the CAPS way — or snap your answer and
              get it marked like an NSC examiner would. Free to try.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2.5 flex-shrink-0">
            <Link
              href={`/nexi-tutor?q=${encodeURIComponent(`I'm working through a ${subject} past paper. Please help me with this question: `)}`}
              className="text-center px-5 py-3 bg-[#2D6BE4] hover:bg-[#4A82F0] text-white font-bold text-sm rounded-xl transition-colors whitespace-nowrap"
            >
              Ask Nexi →
            </Link>
            <Link
              href="/mark"
              className="text-center px-5 py-3 glass hover:bg-white/10 text-white font-bold text-sm rounded-xl transition-colors whitespace-nowrap"
            >
              Mark my answer
            </Link>
          </div>
        </div>

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

        <section className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 space-y-3">
          <h2 className="text-white font-bold text-lg">How to get the most out of {subject} past papers</h2>
          <ol className="list-decimal list-inside space-y-1.5 text-white/55 text-sm leading-relaxed">
            <li>Write the most recent paper first, timed, with no notes — exactly like the real exam.</li>
            <li>Mark it yourself with the memo. Circle every question where you lost marks.</li>
            <li>For each circled question, ask Nexi to explain it step by step until you could teach it.</li>
            <li>A week later, redo only the questions you got wrong. Then move on to the next year.</li>
          </ol>
        </section>

        {related.length > 0 && (
          <nav aria-label="Related past papers" className="pt-2">
            <h2 className="text-white/70 font-semibold text-sm mb-3">More {group === "Languages" ? "language" : group.toLowerCase()} past papers</h2>
            <div className="flex flex-wrap gap-2">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/past-papers/${r.slug}`}
                  className="px-3.5 py-2 rounded-lg glass text-white/70 hover:text-white text-xs font-semibold transition-colors"
                >
                  {r.subject} past papers
                </Link>
              ))}
            </div>
          </nav>
        )}

        <p className="text-white/25 text-xs leading-relaxed">
          Papers and memoranda are published by the Department of Basic Education
          and download directly from education.gov.za.
        </p>
      </div>
    </div>
  );
}

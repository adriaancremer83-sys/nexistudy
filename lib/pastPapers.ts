// Official NSC past papers, linked directly from the Department of Basic
// Education (education.gov.za). The data file is generated and verified by
// scripts/scrape-past-papers.mjs + scripts/build-past-papers.mjs — every URL
// is checked to serve a real PDF before it lands here. To refresh or add
// years/subjects, re-run those two scripts and commit the JSON.
import data from "./pastPapersData.json";

export interface PastPaper {
  subject: string;
  slug: string;
  group: string;
  year: number;
  session: string;
  level: string | null; // HL / FAL / SAL for languages, null otherwise
  paper: string;
  paperUrl: string;
  memoUrl: string;
}

export const PAST_PAPERS = data as PastPaper[];

// Display order for the landing page groups
export const GROUP_ORDER = [
  "Core",
  "Sciences",
  "Commerce",
  "Humanities",
  "Technology",
  "Languages",
];

export interface SubjectSummary {
  subject: string;
  slug: string;
  group: string;
  paperCount: number;
  yearFrom: number;
  yearTo: number;
}

export function getSubjects(): SubjectSummary[] {
  const bySlug = new Map<string, SubjectSummary>();
  for (const p of PAST_PAPERS) {
    const existing = bySlug.get(p.slug);
    if (existing) {
      existing.paperCount += 1;
      existing.yearFrom = Math.min(existing.yearFrom, p.year);
      existing.yearTo = Math.max(existing.yearTo, p.year);
    } else {
      bySlug.set(p.slug, {
        subject: p.subject,
        slug: p.slug,
        group: p.group,
        paperCount: 1,
        yearFrom: p.year,
        yearTo: p.year,
      });
    }
  }
  return [...bySlug.values()];
}

export function getSubjectPapers(slug: string): PastPaper[] {
  return PAST_PAPERS.filter((p) => p.slug === slug);
}

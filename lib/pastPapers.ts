// Official NSC past papers, linked directly from the Department of Basic
// Education (education.gov.za). All URLs verified to serve the PDF.
// To add more papers: add entries here — newest year first is not required,
// the page groups and sorts automatically.

export interface PastPaper {
  subject: string;
  grade: string;
  year: number;
  session: string; // e.g. "November"
  paper: string; // e.g. "Paper 1"
  paperUrl: string;
  memoUrl: string;
}

export const PAST_PAPERS: PastPaper[] = [
  // ── Mathematics · Grade 12 · November 2024 ──
  {
    subject: "Mathematics",
    grade: "Grade 12",
    year: 2024,
    session: "November",
    paper: "Paper 1",
    paperUrl:
      "https://www.education.gov.za/LinkClick.aspx?fileticket=8W2dAxBUTQA%3d&tabid=5193&portalid=0&mid=13724",
    memoUrl:
      "https://www.education.gov.za/LinkClick.aspx?fileticket=D_T4clPBpkk%3d&tabid=5193&portalid=0&mid=13724",
  },
  {
    subject: "Mathematics",
    grade: "Grade 12",
    year: 2024,
    session: "November",
    paper: "Paper 2",
    paperUrl:
      "https://www.education.gov.za/LinkClick.aspx?fileticket=ycHWvBVvV2M%3d&tabid=5193&portalid=0&mid=13724",
    memoUrl:
      "https://www.education.gov.za/LinkClick.aspx?fileticket=0DIM92_2Vu8%3d&tabid=5193&portalid=0&mid=13724",
  },
  // ── Mathematics · Grade 12 · November 2023 ──
  {
    subject: "Mathematics",
    grade: "Grade 12",
    year: 2023,
    session: "November",
    paper: "Paper 1",
    paperUrl:
      "https://www.education.gov.za/LinkClick.aspx?fileticket=M_7mZq2zE5o%3d&tabid=4682&portalid=0&mid=12681",
    memoUrl:
      "https://www.education.gov.za/LinkClick.aspx?fileticket=ViEtlf4659c%3d&tabid=4682&portalid=0&mid=12681",
  },
  {
    subject: "Mathematics",
    grade: "Grade 12",
    year: 2023,
    session: "November",
    paper: "Paper 2",
    paperUrl:
      "https://www.education.gov.za/LinkClick.aspx?fileticket=Zoios-rCurI%3d&tabid=4682&portalid=0&mid=12681",
    memoUrl:
      "https://www.education.gov.za/LinkClick.aspx?fileticket=0RJSBcYBmhA%3d&tabid=4682&portalid=0&mid=12681",
  },
  // ── Mathematics · Grade 12 · November 2022 ──
  {
    subject: "Mathematics",
    grade: "Grade 12",
    year: 2022,
    session: "November",
    paper: "Paper 1",
    paperUrl:
      "https://www.education.gov.za/LinkClick.aspx?fileticket=Juy5nA5N3fM%3d&tabid=3294&portalid=0&mid=10986",
    memoUrl:
      "https://www.education.gov.za/LinkClick.aspx?fileticket=gytAGGPYSc8%3d&tabid=3294&portalid=0&mid=10986",
  },
  {
    subject: "Mathematics",
    grade: "Grade 12",
    year: 2022,
    session: "November",
    paper: "Paper 2",
    paperUrl:
      "https://www.education.gov.za/LinkClick.aspx?fileticket=DqfP-i10rEE%3d&tabid=3294&portalid=0&mid=10986",
    memoUrl:
      "https://www.education.gov.za/LinkClick.aspx?fileticket=var8F7VpOmU%3d&tabid=3294&portalid=0&mid=10986",
  },
];

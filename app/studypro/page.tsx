"use client";

import Link from "next/link";
import { useState, useMemo, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import Reveal from "@/components/Reveal";
import ProgressRing from "@/components/ProgressRing";
import CareerAdvice from "@/components/CareerAdvice";
import SubjectAdvisor from "@/components/SubjectAdvisor";
import NudgeHint from "@/components/NudgeHint";
import { IconAcademicCap, IconDocumentText, IconRocket, IconTrendingUp, IconBookOpen, IconBolt, IconTarget, IconSparkles, IconLock, IconChartBar } from "@/components/icons";

// ── APS conversion ──────────────────────────────────────────────────────────
function toAPS(pct: number): number {
  if (pct >= 80) return 7;
  if (pct >= 70) return 6;
  if (pct >= 60) return 5;
  if (pct >= 50) return 4;
  if (pct >= 40) return 3;
  if (pct >= 30) return 2;
  return 1;
}

function apsBadgeColor(pts: number): string {
  if (pts >= 6) return "text-emerald-300 bg-emerald-400/10 border-emerald-400/40";
  if (pts >= 5) return "text-[#00D4FF] bg-[#00D4FF]/10 border-[#00D4FF]/40";
  if (pts >= 4) return "text-amber-300 bg-amber-400/10 border-amber-400/40";
  return "text-red-300 bg-red-400/10 border-red-400/40";
}

function apsBarColor(pts: number): string {
  if (pts >= 6) return "bg-emerald-400";
  if (pts >= 5) return "bg-[#00D4FF]";
  if (pts >= 4) return "bg-amber-400";
  return "bg-red-400";
}

function focusMessage(aps: number): string {
  if (aps <= 2) return "Critical priority — even a small mark improvement adds a point here.";
  if (aps === 3) return "Getting to 50%+ would add +1 APS to your total.";
  if (aps === 4) return "Push to 60%+ to unlock another APS point.";
  return "Strong — reaching 70%+ would boost your score further.";
}

// ── Subject options ─────────────────────────────────────────────────────────
const SUBJECT_OPTIONS = [
  "Afrikaans Home Language",
  "Afrikaans First Additional Language",
  "English Home Language",
  "English First Additional Language",
  "isiZulu Home Language",
  "isiZulu First Additional Language",
  "Mathematics",
  "Mathematical Literacy",
  "Physical Sciences",
  "Life Sciences",
  "Geography",
  "History",
  "Accounting",
  "Business Studies",
  "Economics",
  "Agricultural Sciences",
  "Computer Applications Technology",
  "Information Technology",
  "Engineering Graphics and Design",
  "Visual Arts",
  "Music",
  "Consumer Studies",
  "Hospitality Studies",
  "Tourism",
  "Religion Studies",
  "Life Orientation",
];

const DEFAULT_SUBJECTS = [
  "English Home Language",
  "Afrikaans First Additional Language",
  "Mathematics",
  "Physical Sciences",
  "Life Sciences",
  "Geography",
  "Life Orientation",
];

// ── University selector data ────────────────────────────────────────────────
interface SubjectReq {
  subject: string;
  minPct: number;
  note?: string;
}

interface ProgrammeInfo {
  minAPS: number;
  requirements: SubjectReq[];
}

type ProgrammeMap = Record<string, ProgrammeInfo>;
type UniversityMap = Record<string, ProgrammeMap>;

// Typical subject requirements per programme family. Indicative — exact
// thresholds vary by institution and year.
const REQS: Record<string, SubjectReq[]> = {
  medicine: [
    { subject: "Mathematics", minPct: 60, note: "Maths Lit not accepted" },
    { subject: "Physical Sciences", minPct: 60 },
    { subject: "Life Sciences", minPct: 60 },
    { subject: "English", minPct: 50 },
  ],
  engineering: [
    { subject: "Mathematics", minPct: 70, note: "Maths Lit not accepted" },
    { subject: "Physical Sciences", minPct: 60 },
    { subject: "English", minPct: 50 },
  ],
  law: [{ subject: "English", minPct: 60 }],
  commerce: [
    { subject: "Mathematics", minPct: 60, note: "Maths Lit not accepted" },
    { subject: "English", minPct: 50 },
  ],
  science: [
    { subject: "Mathematics", minPct: 60, note: "Maths Lit not accepted" },
    { subject: "Physical Sciences", minPct: 50 },
    { subject: "English", minPct: 50 },
  ],
  humanities: [{ subject: "English", minPct: 50 }],
  education: [{ subject: "English", minPct: 50 }],
};

function prog(minAPS: number, family: keyof typeof REQS): ProgrammeInfo {
  return { minAPS, requirements: REQS[family] };
}

const UNIVERSITIES: UniversityMap = {
  "University of Cape Town (UCT)": {
    "MBChB – Medicine": prog(42, "medicine"),
    "BEng – Engineering": prog(38, "engineering"),
    "LLB – Law": prog(36, "law"),
    "BCom – Commerce": prog(34, "commerce"),
    "BSc – Science": prog(32, "science"),
    "BA – Humanities": prog(28, "humanities"),
    "BEd – Education": prog(28, "education"),
  },
  "University of the Witwatersrand (Wits)": {
    "MBBCh – Medicine": prog(42, "medicine"),
    "BEng – Engineering": prog(36, "engineering"),
    "LLB – Law": prog(34, "law"),
    "BCom – Commerce": prog(32, "commerce"),
    "BSc – Science": prog(30, "science"),
    "BA – Humanities": prog(28, "humanities"),
  },
  "Stellenbosch University (SU)": {
    "MBChB – Medicine": prog(42, "medicine"),
    "BEng – Engineering": prog(36, "engineering"),
    "LLB – Law": prog(34, "law"),
    "BCom – Commerce": prog(32, "commerce"),
    "BSc – Science": prog(30, "science"),
    "BEd – Education": prog(28, "education"),
  },
  "University of Pretoria (UP)": {
    "MBChB – Medicine": prog(40, "medicine"),
    "BEng – Engineering": prog(34, "engineering"),
    "LLB – Law": prog(32, "law"),
    "BCom – Commerce": prog(30, "commerce"),
    "BSc – Science": prog(28, "science"),
    "BA – Arts": prog(26, "humanities"),
    "BEd – Education": prog(26, "education"),
  },
  "University of Johannesburg (UJ)": {
    "BEng – Engineering": prog(32, "engineering"),
    "LLB – Law": prog(30, "law"),
    "BCom – Commerce": prog(28, "commerce"),
    "BSc – Science": prog(26, "science"),
    "BA – Arts": prog(24, "humanities"),
    "BEd – Education": prog(24, "education"),
  },
  "University of KwaZulu-Natal (UKZN)": {
    "MBChB – Medicine": prog(40, "medicine"),
    "BEng – Engineering": prog(32, "engineering"),
    "LLB – Law": prog(30, "law"),
    "BCom – Commerce": prog(28, "commerce"),
    "BSc – Science": prog(26, "science"),
    "BEd – Education": prog(24, "education"),
  },
  "University of the Free State (UFS)": {
    "MBChB – Medicine": prog(38, "medicine"),
    "LLB – Law": prog(28, "law"),
    "BCom – Commerce": prog(26, "commerce"),
    "BSc – Science": prog(24, "science"),
    "BA – Arts": prog(22, "humanities"),
    "BEd – Education": prog(22, "education"),
  },
  "Rhodes University": {
    "LLB – Law": prog(30, "law"),
    "BCom – Commerce": prog(28, "commerce"),
    "BSc – Science": prog(26, "science"),
    "BA – Humanities": prog(24, "humanities"),
    "BEd – Education": prog(22, "education"),
  },
  "Nelson Mandela University (NMU)": {
    "BEng – Engineering": prog(30, "engineering"),
    "LLB – Law": prog(28, "law"),
    "BCom – Commerce": prog(26, "commerce"),
    "BSc – Science": prog(24, "science"),
    "BA – Arts": prog(22, "humanities"),
    "BEd – Education": prog(22, "education"),
  },
  "North-West University (NWU)": {
    "MBChB – Medicine": prog(38, "medicine"),
    "BEng – Engineering": prog(30, "engineering"),
    "LLB – Law": prog(28, "law"),
    "BCom – Commerce": prog(26, "commerce"),
    "BSc – Science": prog(24, "science"),
    "BEd – Education": prog(22, "education"),
  },
};

// "English" matches Home or First Additional Language; "Mathematics" must be
// pure Maths (deliberately does not match "Mathematical Literacy").
function subjectMatches(required: string, subjectName: string): boolean {
  if (required === "English") return subjectName.startsWith("English");
  return subjectName === required;
}

// ── Flat programme catalogue for Explore Your Options ──────────────────────
interface ProgrammeEntry {
  programme: string;
  university: string;
  minAPS: number;
  type: "Degree" | "Diploma" | "Higher Certificate";
}

const ALL_PROGRAMMES: ProgrammeEntry[] = [
  // ── Degrees ─────────────────────────────────────────────
  { programme: "BCom – Accounting", university: "University of Cape Town (UCT)", minAPS: 36, type: "Degree" },
  { programme: "BCom – Finance", university: "Stellenbosch University (SU)", minAPS: 34, type: "Degree" },
  { programme: "BCom – General", university: "University of Johannesburg (UJ)", minAPS: 28, type: "Degree" },
  { programme: "BCom – Economics", university: "University of Pretoria (UP)", minAPS: 30, type: "Degree" },
  { programme: "BCom – Human Resources", university: "North-West University (NWU)", minAPS: 26, type: "Degree" },
  { programme: "BA – Psychology", university: "University of Pretoria (UP)", minAPS: 28, type: "Degree" },
  { programme: "BA – Social Work", university: "University of KwaZulu-Natal (UKZN)", minAPS: 24, type: "Degree" },
  { programme: "BA – Journalism & Media", university: "Rhodes University", minAPS: 26, type: "Degree" },
  { programme: "BA – Political Science", university: "University of the Free State (UFS)", minAPS: 22, type: "Degree" },
  { programme: "BSc – Computer Science", university: "University of Cape Town (UCT)", minAPS: 34, type: "Degree" },
  { programme: "BSc – Mathematics", university: "University of the Witwatersrand (Wits)", minAPS: 30, type: "Degree" },
  { programme: "BSc – Environmental Science", university: "University of KwaZulu-Natal (UKZN)", minAPS: 24, type: "Degree" },
  { programme: "BSc – Agriculture", university: "Stellenbosch University (SU)", minAPS: 26, type: "Degree" },
  { programme: "BEd – Foundation Phase", university: "North-West University (NWU)", minAPS: 22, type: "Degree" },
  { programme: "BEd – Intermediate Phase", university: "University of the Free State (UFS)", minAPS: 22, type: "Degree" },
  { programme: "BNursing", university: "University of Pretoria (UP)", minAPS: 26, type: "Degree" },
  { programme: "BPharm – Pharmacy", university: "University of the Witwatersrand (Wits)", minAPS: 36, type: "Degree" },
  { programme: "BSocSci – Criminology", university: "University of South Africa (UNISA)", minAPS: 20, type: "Degree" },
  { programme: "BArchSt – Architecture", university: "University of Pretoria (UP)", minAPS: 30, type: "Degree" },
  { programme: "LLB – Law", university: "University of the Free State (UFS)", minAPS: 28, type: "Degree" },
  // ── Diplomas ────────────────────────────────────────────
  { programme: "Diploma in Business Studies", university: "Tshwane University of Technology (TUT)", minAPS: 18, type: "Diploma" },
  { programme: "Diploma in Business Management", university: "Vaal University of Technology (VUT)", minAPS: 18, type: "Diploma" },
  { programme: "Diploma in Financial Management", university: "Cape Peninsula University of Technology (CPUT)", minAPS: 20, type: "Diploma" },
  { programme: "Diploma in Marketing Management", university: "Durban University of Technology (DUT)", minAPS: 18, type: "Diploma" },
  { programme: "Diploma in Human Resource Management", university: "Central University of Technology (CUT)", minAPS: 18, type: "Diploma" },
  { programme: "Diploma in Information Technology", university: "Tshwane University of Technology (TUT)", minAPS: 20, type: "Diploma" },
  { programme: "Diploma in Public Management", university: "Walter Sisulu University (WSU)", minAPS: 16, type: "Diploma" },
  { programme: "Diploma in Accounting Sciences", university: "University of South Africa (UNISA)", minAPS: 18, type: "Diploma" },
  { programme: "Diploma in Hospitality Management", university: "Cape Peninsula University of Technology (CPUT)", minAPS: 18, type: "Diploma" },
  { programme: "Diploma in Tourism Management", university: "Durban University of Technology (DUT)", minAPS: 16, type: "Diploma" },
  // ── Higher Certificates ──────────────────────────────────
  { programme: "Higher Certificate in Education", university: "University of South Africa (UNISA)", minAPS: 14, type: "Higher Certificate" },
  { programme: "Higher Certificate in Business Administration", university: "Cape Peninsula University of Technology (CPUT)", minAPS: 14, type: "Higher Certificate" },
  { programme: "Higher Certificate in Information Technology", university: "Tshwane University of Technology (TUT)", minAPS: 16, type: "Higher Certificate" },
  { programme: "Higher Certificate in Early Childhood Development", university: "Walter Sisulu University (WSU)", minAPS: 12, type: "Higher Certificate" },
  { programme: "Higher Certificate in Bookkeeping", university: "University of Johannesburg (UJ)", minAPS: 16, type: "Higher Certificate" },
  { programme: "Higher Certificate in Event Management", university: "Cape Peninsula University of Technology (CPUT)", minAPS: 14, type: "Higher Certificate" },
];

// ── Types ───────────────────────────────────────────────────────────────────
interface SubjectRow {
  name: string;
  percentage: string;
}

const TYPE_COLORS: Record<ProgrammeEntry["type"], string> = {
  "Degree": "bg-[#2D6BE4]/20 text-[#7EABFF] border border-[#2D6BE4]/30",
  "Diploma": "bg-violet-400/15 text-violet-300 border border-violet-400/30",
  "Higher Certificate": "bg-amber-400/15 text-amber-300 border border-amber-400/30",
};

const SELECT_DARK =
  "w-full bg-white/5 text-white border border-white/15 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#00D4FF]/40 focus:border-[#00D4FF] transition-colors cursor-pointer";

// Grade 10–12 view is split into tabs so only one section shows at a time —
// no more endless scrolling, especially on mobile.
const FET_TABS = [
  { id: "aps", label: "APS Score" },
  { id: "match", label: "Universities" },
  { id: "focus", label: "Focus Areas" },
  { id: "explore", label: "Explore" },
  { id: "advice", label: "Funding & Career" },
] as const;
type FetTab = (typeof FET_TABS)[number]["id"];

// ── Component ───────────────────────────────────────────────────────────────
// ── Grade 8–9 (Senior Phase) content ────────────────────────────────────────
const SENIOR_SUBJECT_CHIPS = [
  "Mathematics",
  "Natural Sciences",
  "Social Sciences",
  "EMS",
  "Technology",
  "Languages",
  "Creative Arts",
  "Life Orientation",
];

const SENIOR_CARDS = [
  {
    icon: IconBookOpen,
    title: "Master the basics with Nexi",
    desc: "Nexi Tutor covers every Senior Phase subject — Maths, Natural Sciences, EMS, Technology and more — in English, Afrikaans & isiZulu free (all 11 on Premium). Stuck on homework? Just ask.",
  },
  {
    icon: IconBolt,
    title: "Build the habit early",
    desc: "Daily streaks and small goals now mean you walk into Grade 10 ahead of the pack. Learners who study a little every day never need to cram.",
  },
  {
    icon: IconTarget,
    title: "Discover your strengths",
    desc: "Notice which subjects feel natural and which need work — that's tomorrow's subject choice taking shape, two years before you have to make it.",
  },
];

// Grade 10 Readiness Check — fixed Senior Phase subject set.
const READINESS_SUBJECTS = [
  "Home Language",
  "First Additional Language",
  "Mathematics",
  "Natural Sciences",
  "Social Sciences",
  "EMS",
  "Technology",
  "Creative Arts",
  "Life Orientation",
];

function readinessBadge(pct: number): { label: string; cls: string } {
  if (pct >= 70) return { label: "Solid", cls: "text-emerald-300 bg-emerald-400/10 border-emerald-400/30" };
  if (pct >= 55) return { label: "Okay", cls: "text-[#00D4FF] bg-[#00D4FF]/10 border-[#00D4FF]/30" };
  if (pct >= 40) return { label: "Shaky", cls: "text-amber-300 bg-amber-400/10 border-amber-400/30" };
  return { label: "Gap", cls: "text-red-300 bg-red-400/10 border-red-400/30" };
}

function readinessMessage(avg: number): string {
  if (avg >= 70) return "You're ready for Grade 10 — keep doing what you're doing.";
  if (avg >= 55) return "On track. Tighten the shaky subjects and you'll walk into Grade 10 confident.";
  if (avg >= 40) return "Some gaps to fix — and Grade 8–9 is exactly the right time to fix them.";
  return "Let's rebuild the basics together. Small steps now make Grade 10 a different story.";
}

// What a weak Senior Phase subject means for Grade 10 choices.
const READINESS_HINTS: Record<string, string> = {
  "Mathematics": "Grade 10 pure Maths builds straight on this — and most degrees need pure Maths.",
  "Natural Sciences": "Physical Sciences and Life Sciences in Grade 10 build directly on Natural Sciences.",
  "EMS": "Thinking of Accounting or Business Studies in Grade 10? EMS is the foundation.",
  "Home Language": "Every subject's exams are written and answered in language — comprehension pays off everywhere.",
  "First Additional Language": "A strong second language lifts marks across the board — and it's compulsory through matric.",
  "Social Sciences": "Grade 10 History and Geography start exactly where this leaves off.",
  "Technology": "EGD and the technical streams in Grade 10 build on Technology.",
};

export default function StudyProPage() {
  const { data: session, status } = useSession();
  const [phase, setPhase] = useState<"fet" | "senior">("fet");
  const [fetTab, setFetTab] = useState<FetTab>("aps");
  // First-time nudge: once APS marks are in, point the learner at the
  // Universities tab. Dismisses permanently once acted on (localStorage). Starts
  // dismissed so returning users never see a flash before the read below.
  const [nudgeDismissed, setNudgeDismissed] = useState(true);
  useEffect(() => {
    try {
      setNudgeDismissed(!!localStorage.getItem("nexi-studypro-nudge"));
    } catch {
      setNudgeDismissed(false);
    }
  }, []);
  function dismissNudge() {
    setNudgeDismissed(true);
    try {
      localStorage.setItem("nexi-studypro-nudge", "1");
    } catch {
      /* ignore */
    }
  }
  function goToUniversities() {
    setFetTab("match");
    dismissNudge();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  const [subjects, setSubjects] = useState<SubjectRow[]>(
    DEFAULT_SUBJECTS.map((name) => ({ name, percentage: "" }))
  );

  // Once, on first authenticated load, seed the calculator from the subjects
  // the learner picked during onboarding (falls back to DEFAULT_SUBJECTS for
  // signed-out visitors or accounts with none saved). Guarded so it never wipes
  // marks the learner has started entering.
  const seededFromUser = useRef(false);
  useEffect(() => {
    if (seededFromUser.current || status !== "authenticated") return;
    seededFromUser.current = true;
    const userSubjects = session.user.subjects;
    if (Array.isArray(userSubjects) && userSubjects.length > 0) {
      setSubjects(userSubjects.map((name) => ({ name, percentage: "" })));
    }
    if (session.user.grade === "Grade 8" || session.user.grade === "Grade 9") {
      setPhase("senior");
    }
  }, [status, session]);
  const [selectedUniversity, setSelectedUniversity] = useState("");
  const [selectedProgramme, setSelectedProgramme] = useState("");
  const [readinessMarks, setReadinessMarks] = useState<Record<string, string>>({});

  // ── Handlers ──────────────────────────────────────────────────────────────
  function updateName(i: number, value: string) {
    setSubjects((prev) => {
      const next = [...prev];
      next[i] = { ...next[i], name: value };
      return next;
    });
  }

  function updatePercentage(i: number, value: string) {
    if (value === "") {
      setSubjects((prev) => {
        const next = [...prev];
        next[i] = { ...next[i], percentage: "" };
        return next;
      });
      return;
    }
    const num = Number(value);
    if (!isNaN(num) && num >= 0 && num <= 100) {
      setSubjects((prev) => {
        const next = [...prev];
        next[i] = { ...next[i], percentage: value };
        return next;
      });
    }
  }

  function handleUniversityChange(value: string) {
    setSelectedUniversity(value);
    setSelectedProgramme("");
  }

  function updateReadinessMark(subject: string, value: string) {
    if (value === "") {
      setReadinessMarks((prev) => ({ ...prev, [subject]: "" }));
      return;
    }
    const num = Number(value);
    if (!isNaN(num) && num >= 0 && num <= 100) {
      setReadinessMarks((prev) => ({ ...prev, [subject]: value }));
    }
  }

  // ── Grade 10 Readiness ────────────────────────────────────────────────────
  const readiness = useMemo(() => {
    const rows = READINESS_SUBJECTS.map((name) => {
      const raw = readinessMarks[name] ?? "";
      const pct = raw === "" ? null : Number(raw);
      return { name, pct };
    });
    const filled = rows.filter((r) => r.pct !== null) as { name: string; pct: number }[];
    const avg = filled.length > 0
      ? Math.round(filled.reduce((sum, r) => sum + r.pct, 0) / filled.length)
      : 0;
    // Up to two weakest subjects below 55% that have a Grade 10 hint.
    const focus = [...filled]
      .filter((r) => r.pct < 55 && READINESS_HINTS[r.name])
      .sort((a, b) => a.pct - b.pct)
      .slice(0, 2);
    return { rows, avg, filledCount: filled.length, focus };
  }, [readinessMarks]);

  // ── APS calculation ───────────────────────────────────────────────────────
  const calc = useMemo(() => {
    const rows = subjects.map((s) => {
      const pct = s.percentage === "" ? null : Number(s.percentage);
      const isLO = s.name === "Life Orientation";
      const aps = pct !== null ? toAPS(pct) : null;
      return { name: s.name, pct, isLO, aps };
    });

    const nonLO = rows.filter((r) => !r.isLO);
    const filled = nonLO.filter((r) => r.aps !== null);
    const sorted = [...filled].sort((a, b) => (b.aps ?? 0) - (a.aps ?? 0));
    const best6 = sorted.slice(0, 6);
    const totalAPS = best6.reduce((sum, r) => sum + (r.aps ?? 0), 0);
    const best6Names = new Set(best6.map((r) => r.name));

    return { rows, totalAPS, best6Names, filledCount: filled.length };
  }, [subjects]);

  // Show the "go to Universities" nudge once the learner has an APS and is still
  // sitting on the APS tab.
  const showNudge =
    phase === "fet" && fetTab === "aps" && calc.totalAPS > 0 && !nudgeDismissed;

  // ── Focus areas: weakest filled non-LO subjects ───────────────────────────
  const focusAreas = useMemo(() => {
    return calc.rows
      .filter((r) => !r.isLO && r.aps !== null)
      .sort((a, b) => (a.aps ?? 0) - (b.aps ?? 0))
      .slice(0, 3);
  }, [calc.rows]);

  // ── Explore options: everything they qualify for + the closest aspirational ─
  const exploreOptions = useMemo(() => {
    if (calc.totalAPS === 0) {
      return { qualifying: [] as ProgrammeEntry[], aspirational: [] as ProgrammeEntry[], qualifyingCount: 0 };
    }
    const withGap = ALL_PROGRAMMES.map((p) => ({ ...p, gap: p.minAPS - calc.totalAPS }));
    // Everything they already qualify for — most prestigious (highest APS) first.
    const qualifying = withGap
      .filter((p) => p.gap <= 0)
      .sort((a, b) => b.minAPS - a.minAPS);
    // The three closest programmes they don't yet qualify for.
    const aspirational = withGap
      .filter((p) => p.gap > 0)
      .sort((a, b) => a.gap - b.gap)
      .slice(0, 3);
    return { qualifying, aspirational, qualifyingCount: qualifying.length };
  }, [calc.totalAPS]);

  // Renders one programme card — shared by the qualifying and aspirational lists.
  function programmeCard(option: ProgrammeEntry, idx: number) {
    const gap = option.minAPS - calc.totalAPS;
    const qualifiesForThis = gap <= 0;
    return (
      <Reveal key={`${option.programme}-${option.university}`} delay={(idx % 3) * 100} className="h-full">
        <div className={`glass-card p-5 flex flex-col h-full ${qualifiesForThis ? "!border-emerald-400/40" : ""}`}>
          <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
            <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${TYPE_COLORS[option.type]}`}>
              {option.type}
            </span>
            {qualifiesForThis ? (
              <span className="text-[10px] font-bold text-emerald-300 bg-emerald-400/15 border border-emerald-400/30 px-2 py-0.5 rounded-full">
                ✓ You qualify
              </span>
            ) : (
              <span className="text-[10px] font-bold text-amber-300 bg-amber-400/15 border border-amber-400/30 px-2 py-0.5 rounded-full">
                {gap} pt{gap !== 1 ? "s" : ""} away
              </span>
            )}
          </div>
          <h3 className="text-white font-bold text-base leading-snug mb-1">{option.programme}</h3>
          <p className="text-white/40 text-xs mb-4 leading-relaxed">{option.university}</p>
          <div className="mt-auto">
            <div className="flex items-center justify-between text-xs text-white/40 mb-1.5">
              <span>Min APS: <span className="text-white font-semibold">{option.minAPS}</span></span>
              <span>Yours: <span className={`font-semibold ${qualifiesForThis ? "text-emerald-300" : "text-[#00D4FF]"}`}>{calc.totalAPS}</span></span>
            </div>
            <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-700 ${qualifiesForThis ? "bg-emerald-400" : "bg-gradient-to-r from-[#2D6BE4] to-[#00D4FF]"}`}
                style={{ width: `${Math.min((calc.totalAPS / option.minAPS) * 100, 100)}%` }}
              />
            </div>
            <p className="text-xs mt-2.5">
              {qualifiesForThis ? (
                <span className="text-emerald-300 font-medium">You meet the minimum requirement.</span>
              ) : (
                <span className="text-white/40">
                  You&apos;re <span className="text-amber-300 font-semibold">{gap} point{gap !== 1 ? "s" : ""}</span> away from qualifying.
                </span>
              )}
            </p>
          </div>
        </div>
      </Reveal>
    );
  }

  // ── University match ──────────────────────────────────────────────────────
  const programmes = selectedUniversity
    ? Object.keys(UNIVERSITIES[selectedUniversity] ?? {})
    : [];

  const programmeInfo =
    selectedUniversity && selectedProgramme
      ? (UNIVERSITIES[selectedUniversity]?.[selectedProgramme] ?? null)
      : null;

  const minAPS = programmeInfo?.minAPS ?? null;

  // Check each required subject against what the learner entered above.
  const reqChecks = useMemo(() => {
    if (!programmeInfo) return [];
    return programmeInfo.requirements.map((req) => {
      const row = subjects.find((s) => subjectMatches(req.subject, s.name));
      const pct = row && row.percentage !== "" ? Number(row.percentage) : null;
      let status: "met" | "low" | "noMark" | "missing";
      if (!row) status = "missing";
      else if (pct === null) status = "noMark";
      else status = pct >= req.minPct ? "met" : "low";
      return { ...req, status, pct };
    });
  }, [programmeInfo, subjects]);

  const reqProblems = reqChecks.filter((r) => r.status === "low" || r.status === "missing").length;
  const allReqsMet = reqChecks.length > 0 && reqChecks.every((r) => r.status === "met");

  const apsQualifies = minAPS !== null && calc.totalAPS >= minAPS;
  const qualifies = apsQualifies && reqProblems === 0;
  const apsGap = minAPS !== null ? minAPS - calc.totalAPS : null;

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen">

      {/* ── 1. HERO ── */}
      <section className="page-hero py-12 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2 text-white">
            Study<span className="text-gradient">Pro</span>
          </h1>
          <p className="text-white/60 text-base mb-6 max-w-xl mx-auto">
            Know where you stand, set your target, and build a path to university.
          </p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <button
              onClick={() => setPhase("fet")}
              className={`px-6 py-2.5 font-semibold rounded-full text-sm transition-colors cursor-pointer ${
                phase === "fet"
                  ? "bg-[#2D6BE4] text-white"
                  : "border border-white/15 text-white/60 hover:text-white hover:border-white/35"
              }`}
            >
              Grade 10–12
            </button>
            <button
              onClick={() => setPhase("senior")}
              className={`px-6 py-2.5 font-semibold rounded-full text-sm transition-colors cursor-pointer ${
                phase === "senior"
                  ? "bg-[#FFB454] text-[#0A1628] font-bold"
                  : "border border-white/15 text-white/60 hover:text-white hover:border-white/35"
              }`}
            >
              Grade 8–9
            </button>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ── GRADE 8–9 (SENIOR PHASE) VIEW ── */}
      {phase === "senior" && (
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <Reveal className="text-center mb-12">
              <p className="text-sm font-bold uppercase tracking-widest text-[#FFB454] mb-3">
                Senior Phase
              </p>
              <h2 className="text-3xl font-bold text-white mb-3">
                Grade 8 &amp; 9 — where matric marks are made
              </h2>
              <p className="text-white/55 max-w-xl mx-auto leading-relaxed">
                No APS pressure yet. These two years are about building rock-solid
                foundations and discovering what you&apos;re good at — before you
                choose the subjects that shape your matric.
              </p>
            </Reveal>

            {/* ── Grade 10 Readiness Check ── */}
            <Reveal className="mb-12">
              <div className="rounded-2xl border border-[#FFB454]/25 bg-[#0E1F3D] overflow-hidden">
                <div className="px-6 py-4 border-b border-white/10 bg-[#FFB454]/[0.06] flex items-center gap-2.5 text-[#FFB454]">
                  <IconChartBar className="w-4 h-4" />
                  <h3 className="text-xs font-semibold text-white uppercase tracking-widest">
                    Grade 10 Readiness Check
                  </h3>
                </div>

                <div className="p-6">
                  <p className="text-white/50 text-sm leading-relaxed mb-6 max-w-xl">
                    Enter your latest term marks. We&apos;ll show you how ready you are
                    for Grade 10 — and which subjects to strengthen before subject
                    choice at the end of Grade 9.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 mb-8">
                    {readiness.rows.map((row) => {
                      const badge = row.pct !== null ? readinessBadge(row.pct) : null;
                      return (
                        <div key={row.name} className="flex items-center justify-between gap-3 py-1.5 border-b border-white/5">
                          <span className="text-sm text-white/80">{row.name}</span>
                          <div className="flex items-center gap-2.5">
                            <div className="relative w-[72px]">
                              <input
                                type="number"
                                min={0}
                                max={100}
                                value={readinessMarks[row.name] ?? ""}
                                onChange={(e) => updateReadinessMark(row.name, e.target.value)}
                                placeholder="0"
                                aria-label={`${row.name} term mark percentage`}
                                className="w-full text-center text-sm font-medium text-white bg-white/5 border border-white/15 rounded-lg py-1.5 focus:outline-none focus:ring-2 focus:ring-[#FFB454]/40 focus:border-[#FFB454] placeholder:text-white/20"
                              />
                              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-white/30">%</span>
                            </div>
                            <span
                              className={`inline-block w-[58px] text-center text-[11px] font-bold px-2 py-1 rounded-full border ${
                                badge ? badge.cls : "text-white/20 border-white/10"
                              }`}
                            >
                              {badge ? badge.label : "—"}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-8 border-t border-white/10 pt-7">
                    <ProgressRing value={readiness.avg} max={100} size={150} strokeWidth={11}>
                      <span className="text-4xl font-extrabold text-white leading-none">{readiness.avg}</span>
                      <span className="text-white/40 text-xs mt-1">/ 100</span>
                    </ProgressRing>
                    <div className="flex-1 text-center sm:text-left">
                      <p className="text-sm font-bold text-white mb-1.5">
                        {readiness.filledCount === 0
                          ? "Enter your marks to see your readiness"
                          : readinessMessage(readiness.avg)}
                      </p>
                      <p className="text-xs text-white/50 mb-4">
                        Based on {readiness.filledCount} of {READINESS_SUBJECTS.length} subjects.
                      </p>
                      {readiness.focus.length > 0 && (
                        <div className="space-y-2 text-left">
                          {readiness.focus.map((f) => (
                            <p key={f.name} className="text-xs text-white/55 leading-relaxed">
                              <span className="text-[#FFB454] font-bold">{f.name} ({f.pct}%):</span>{" "}
                              {READINESS_HINTS[f.name]}
                            </p>
                          ))}
                        </div>
                      )}
                      {readiness.filledCount > 0 && (
                        <Link
                          href="/nexi-tutor"
                          className="inline-block mt-4 text-sm font-bold text-[#FFB454] hover:text-white transition-colors"
                        >
                          Strengthen these with Nexi →
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
              {SENIOR_CARDS.map((card, i) => (
                <Reveal key={card.title} delay={i * 100} className="h-full">
                  <div className="group rounded-2xl border border-[#FFB454]/20 bg-[#0E1F3D] p-7 h-full transition-colors hover:border-[#FFB454]/45">
                    <div className="flex items-center gap-4 mb-5">
                      <span className="flex-shrink-0 text-[#FFB454]">
                        <card.icon className="w-7 h-7" />
                      </span>
                      <span className="h-px flex-1 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 bg-gradient-to-r from-[#FFB454]/40 to-transparent" />
                    </div>
                    <h3 className="text-white font-bold text-base mb-2.5 leading-snug">{card.title}</h3>
                    <p className="text-white/50 text-sm leading-relaxed">{card.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal>
              <div className="flex flex-wrap justify-center gap-2 mb-12">
                {SENIOR_SUBJECT_CHIPS.map((s) => (
                  <span
                    key={s}
                    className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-white/70 text-sm"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </Reveal>

            {/* Premium for Grade 8–9 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              <Reveal className="h-full">
                <div className="rounded-2xl border border-white/[0.08] bg-[#0E1F3D] p-7 h-full relative overflow-hidden">
                  <span className="absolute top-0 right-0 bg-white/10 text-white/60 text-[10px] font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-bl-xl flex items-center gap-1.5">
                    <IconLock className="w-3 h-3" /> Premium · Coming Soon
                  </span>
                  <div className="mb-5 text-[#FFB454]">
                    <IconSparkles className="w-8 h-8" />
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2.5">Foundation Gap Finder</h3>
                  <p className="text-white/50 text-sm leading-relaxed mb-5">
                    Your Readiness Check says Maths is shaky — but <em>which</em> building
                    blocks cracked? Fractions from Grade 6? Basic algebra? The Gap Finder
                    digs down, finds the broken foundations, and repairs them with a
                    week-by-week fix-it plan.
                  </p>
                  <Link
                    href="/pricing"
                    className="text-sm font-bold text-[#FFB454] hover:text-white transition-colors"
                  >
                    See Premium →
                  </Link>
                </div>
              </Reveal>

              <Reveal delay={100} className="h-full">
                <div className="rounded-2xl border border-white/[0.08] bg-[#0E1F3D] p-7 h-full relative overflow-hidden">
                  <span className="absolute top-0 right-0 bg-white/10 text-white/60 text-[10px] font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-bl-xl flex items-center gap-1.5">
                    <IconLock className="w-3 h-3" /> Premium · Coming Soon
                  </span>
                  <div className="mb-5 text-[#FFB454]">
                    <IconDocumentText className="w-8 h-8" />
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2.5">Termly Parent Report</h3>
                  <p className="text-white/50 text-sm leading-relaxed mb-5">
                    A plain-language report for parents every term: marks trend per subject,
                    what improved, where the gaps are, and what Nexi is working on next.
                    See the dip before the report card does.
                  </p>
                  <Link
                    href="/pricing"
                    className="text-sm font-bold text-[#FFB454] hover:text-white transition-colors"
                  >
                    See Premium →
                  </Link>
                </div>
              </Reveal>
            </div>

            {/* Subject Choice Advisor — the flagship Grade 9 → 10 feature */}
            <Reveal>
              <div id="subject-advisor" className="scroll-mt-24">
                <div className="mb-4 text-center">
                  <p className="text-sm font-bold uppercase tracking-widest text-[#FFB454] mb-2">
                    The big decision
                  </p>
                  <h2 className="text-2xl font-bold text-white mb-2">Subject Choice Advisor</h2>
                  <p className="text-white/55 text-sm max-w-xl mx-auto leading-relaxed">
                    At the end of Grade 9 you choose the subjects that shape your matric and your
                    options after school. Let Nexi help you and your family choose with confidence.
                  </p>
                </div>
                <SubjectAdvisor
                  marks={READINESS_SUBJECTS.filter(
                    (n) => (readinessMarks[n] ?? "").trim() !== ""
                  )
                    .map((n) => ({ name: n, percent: Number(readinessMarks[n]) }))
                    .filter((s) => Number.isFinite(s.percent))}
                />
              </div>
            </Reveal>

            {/* First-run nudge: once Readiness marks are in, point them at the advisor */}
            <NudgeHint
              show={readiness.filledCount >= 3}
              storageKey="nexi-nudge-subject-advisor"
              message="Now get your subject-choice advice"
              onAction={() =>
                document
                  .getElementById("subject-advisor")
                  ?.scrollIntoView({ behavior: "smooth", block: "start" })
              }
            />
          </div>
        </section>
      )}

      {phase === "fet" && (
        <>
      {/* Tab strip — one section at a time (horizontally scrollable on mobile) */}
      <div className="max-w-3xl mx-auto px-4 pt-8">
        <div
          role="tablist"
          aria-label="Study Pro sections"
          className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {FET_TABS.map((t) => (
            <button
              key={t.id}
              role="tab"
              aria-selected={fetTab === t.id}
              onClick={() => {
                setFetTab(t.id);
                if (t.id === "match") dismissNudge();
              }}
              className={`flex-shrink-0 px-4 py-2.5 rounded-full text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                fetTab === t.id
                  ? "bg-[#2D6BE4] text-white"
                  : "border border-white/15 text-white/60 hover:text-white hover:border-white/35"
              }${showNudge && t.id === "match" ? " ring-2 ring-[#00D4FF] guide-pulse" : ""}`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {fetTab === "aps" && (
      <>
      {/* ── APS CALCULATOR ── */}
      <section className="py-10 px-4">
        <div className="max-w-3xl mx-auto">
          <Reveal className="text-center mb-10">
            <h2 className="text-3xl font-bold text-white mb-2">APS Calculator</h2>
            <p className="text-white/50 text-sm max-w-lg mx-auto">
              Enter your marks for each subject. We use your best 6 (excluding
              Life Orientation) to calculate your university APS score.
            </p>
          </Reveal>

          <Reveal>
            <div className="glass rounded-2xl overflow-hidden">
              <div className="grid grid-cols-12 gap-2 px-6 py-3 bg-white/5 border-b border-white/10 text-white/70 text-xs font-semibold uppercase tracking-wider">
                <div className="col-span-1 text-center">#</div>
                <div className="col-span-5">Subject</div>
                <div className="col-span-3 text-center">Mark (%)</div>
                <div className="col-span-2 text-center">APS</div>
                <div className="col-span-1 text-center">✓</div>
              </div>

              <div className="divide-y divide-white/5">
                {calc.rows.map((row, i) => {
                  const inBest6 = calc.best6Names.has(row.name) && !row.isLO;
                  return (
                    <div
                      key={i}
                      className={`grid grid-cols-12 gap-2 px-6 py-3 items-center transition-colors ${
                        row.isLO ? "bg-amber-400/5" : inBest6 ? "bg-[#2D6BE4]/10" : ""
                      }`}
                    >
                      <div className="col-span-1 text-center text-xs text-white/30 font-medium">{i + 1}</div>
                      <div className="col-span-5">
                        <select
                          value={subjects[i].name}
                          onChange={(e) => updateName(i, e.target.value)}
                          className="w-full text-[15px] font-semibold text-white bg-transparent border-b border-white/15 focus:border-[#00D4FF] focus:outline-none py-1.5 pr-2 cursor-pointer"
                        >
                          {SUBJECT_OPTIONS.map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                        {row.isLO && (
                          <span className="text-[10px] text-amber-300 font-medium">
                            Recorded — excluded from university APS
                          </span>
                        )}
                      </div>
                      <div className="col-span-3 flex items-center justify-center">
                        <div className="relative w-20">
                          <input
                            type="number"
                            min={0}
                            max={100}
                            value={subjects[i].percentage}
                            onChange={(e) => updatePercentage(i, e.target.value)}
                            placeholder="0"
                            className="w-full text-center text-sm font-medium text-white bg-white/5 border border-white/15 rounded-lg py-1.5 focus:outline-none focus:ring-2 focus:ring-[#00D4FF]/40 focus:border-[#00D4FF] placeholder:text-white/20"
                          />
                          <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-white/30">%</span>
                        </div>
                      </div>
                      <div className="col-span-2 flex justify-center">
                        {row.aps !== null ? (
                          <span className={`inline-flex items-center justify-center w-9 h-9 rounded-full border font-bold text-sm ${apsBadgeColor(row.aps)}`}>
                            {row.aps}
                          </span>
                        ) : (
                          <span className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-white/10 text-white/20 text-sm">—</span>
                        )}
                      </div>
                      <div className="col-span-1 flex justify-center">
                        {inBest6 ? (
                          <span className="text-[#00D4FF] text-base">✓</span>
                        ) : row.isLO ? (
                          <span className="text-amber-300 text-base">★</span>
                        ) : (
                          <span className="text-white/15 text-base">○</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* ── Glowing APS ring ── */}
              <div className="border-t border-white/10 px-6 py-8 bg-white/[0.03] flex flex-col sm:flex-row items-center justify-center gap-8">
                <ProgressRing value={calc.totalAPS} max={42} size={190} strokeWidth={13}>
                  <span className="text-5xl font-extrabold text-white leading-none">{calc.totalAPS}</span>
                  <span className="text-white/40 text-sm mt-1">/ 42 APS</span>
                </ProgressRing>
                <div className="text-center sm:text-left">
                  <p className="text-sm font-semibold text-white mb-1">Your APS Score</p>
                  <p className="text-xs text-white/50 max-w-[220px] leading-relaxed">
                    Based on best {Math.min(calc.filledCount, 6)} of {calc.filledCount} completed
                    subjects (excl. Life Orientation)
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          <div className="flex flex-wrap gap-4 mt-4 text-xs text-white/50">
            <span className="flex items-center gap-1.5"><span className="text-[#00D4FF]">✓</span> Counted in your APS</span>
            <span className="flex items-center gap-1.5"><span className="text-amber-300">★</span> Life Orientation (recorded only)</span>
            <span className="flex items-center gap-1.5"><span className="text-white/20">○</span> Not in best 6</span>
          </div>

          <Reveal className="mt-6">
            <div className="glass rounded-xl overflow-hidden">
              <div className="px-5 py-3 bg-white/5 border-b border-white/10">
                <p className="text-xs font-semibold text-white uppercase tracking-wider">APS Points Scale</p>
              </div>
              <div className="grid grid-cols-7 divide-x divide-white/5 text-center text-xs">
                {[
                  { range: "80–100%", pts: 7, color: "text-emerald-300" },
                  { range: "70–79%", pts: 6, color: "text-emerald-400" },
                  { range: "60–69%", pts: 5, color: "text-[#00D4FF]" },
                  { range: "50–59%", pts: 4, color: "text-[#7EABFF]" },
                  { range: "40–49%", pts: 3, color: "text-amber-300" },
                  { range: "30–39%", pts: 2, color: "text-orange-300" },
                  { range: "0–29%", pts: 1, color: "text-red-300" },
                ].map((r) => (
                  <div key={r.pts} className="py-3 px-1">
                    <p className={`font-bold text-base ${r.color}`}>{r.pts}</p>
                    <p className="text-white/30 text-[10px] mt-0.5 leading-tight">{r.range}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>
      </>
      )}

      {fetTab === "match" && (
      <>
      {/* ── UNIVERSITY & PROGRAMME MATCH ── */}
      <section className="py-10 px-4">
        <div className="max-w-3xl mx-auto">
          <Reveal className="text-center mb-10">
            <h2 className="text-3xl font-bold text-white mb-2">
              Choose Your Dream <span className="text-gradient">University &amp; Programme</span>
            </h2>
            <p className="text-white/50 text-sm max-w-lg mx-auto">
              See whether your current APS qualifies — and how close you are if it doesn&apos;t.
            </p>
          </Reveal>

          <Reveal>
            <div className="glass rounded-2xl overflow-hidden">
              <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-white/50 mb-2">University</label>
                  <select
                    value={selectedUniversity}
                    onChange={(e) => handleUniversityChange(e.target.value)}
                    className={SELECT_DARK}
                  >
                    <option value="">— Select a university —</option>
                    {Object.keys(UNIVERSITIES).map((u) => (
                      <option key={u} value={u}>{u}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-white/50 mb-2">Programme</label>
                  <select
                    value={selectedProgramme}
                    onChange={(e) => setSelectedProgramme(e.target.value)}
                    disabled={!selectedUniversity}
                    className={SELECT_DARK + " disabled:opacity-40 disabled:cursor-not-allowed"}
                  >
                    <option value="">— Select a programme —</option>
                    {programmes.map((p) => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>
              </div>

              {minAPS !== null && (
                <div
                  className={`mx-6 mb-6 rounded-xl p-5 border ${
                    qualifies
                      ? "bg-emerald-400/10 border-emerald-400/30"
                      : apsQualifies
                        ? "bg-amber-400/10 border-amber-400/25"
                        : "bg-red-400/10 border-red-400/25"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-white/50 mb-1">Min APS required</p>
                      <p className="text-4xl font-extrabold text-white">{minAPS}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-white/50 mb-1">Your APS</p>
                      <p className={`text-4xl font-extrabold ${apsQualifies ? "text-emerald-300" : "text-red-300"}`}>{calc.totalAPS}</p>
                    </div>
                    <div className="flex-1 min-w-[160px]">
                      {qualifies ? (
                        <div className="flex items-center gap-3 mt-1">
                          <IconRocket className="w-7 h-7 text-emerald-300 flex-shrink-0" />
                          <div>
                            <p className="text-emerald-300 font-bold text-sm">You qualify!</p>
                            <p className="text-white/50 text-xs">Your APS and subjects meet the requirements for this programme.</p>
                          </div>
                        </div>
                      ) : apsQualifies ? (
                        <div className="flex items-center gap-3 mt-1">
                          <IconTrendingUp className="w-7 h-7 text-amber-300 flex-shrink-0" />
                          <div>
                            <p className="text-amber-300 font-bold text-sm">
                              APS met — {reqProblems} subject requirement{reqProblems !== 1 ? "s" : ""} to sort out
                            </p>
                            <p className="text-white/50 text-xs">See the subject checklist below.</p>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center gap-3 mt-1">
                          <IconTrendingUp className="w-7 h-7 text-amber-300 flex-shrink-0" />
                          <div>
                            <p className="text-red-300 font-bold text-sm">
                              {apsGap !== null && apsGap > 0 ? `${apsGap} more APS point${apsGap > 1 ? "s" : ""} needed` : "Keep improving"}
                            </p>
                            <p className="text-white/50 text-xs">Use Nexi Tutor to target your weakest subjects.</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  {!apsQualifies && apsGap !== null && apsGap > 0 && (
                    <div className="mt-4">
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#2D6BE4] to-[#00D4FF] rounded-full transition-all duration-700"
                          style={{ width: `${Math.min((calc.totalAPS / minAPS) * 100, 100)}%` }}
                        />
                      </div>
                      <p className="text-[10px] text-white/40 mt-1 text-right">{calc.totalAPS} / {minAPS} APS</p>
                    </div>
                  )}

                  {/* ── Subject requirements checklist ── */}
                  {reqChecks.length > 0 && (
                    <div className="mt-5 pt-5 border-t border-white/10">
                      <p className="text-xs font-semibold uppercase tracking-wider text-white/50 mb-3">
                        Required subjects
                      </p>
                      <ul className="space-y-2.5">
                        {reqChecks.map((r) => (
                          <li key={r.subject} className="flex items-center justify-between gap-3 text-sm flex-wrap">
                            <span className="text-white/80">
                              {r.subject} <span className="text-white/40">≥ {r.minPct}%</span>
                              {r.note && (
                                <span className="text-white/35 text-xs"> · {r.note}</span>
                              )}
                            </span>
                            {r.status === "met" && (
                              <span className="text-emerald-300 font-semibold text-xs">
                                ✓ You&apos;re at {r.pct}%
                              </span>
                            )}
                            {r.status === "low" && (
                              <span className="text-amber-300 font-semibold text-xs">
                                {r.pct}% — need {r.minPct}%
                              </span>
                            )}
                            {r.status === "noMark" && (
                              <span className="text-white/40 text-xs">
                                Enter your mark above
                              </span>
                            )}
                            {r.status === "missing" && (
                              <span className="text-red-300 font-semibold text-xs">
                                Not one of your subjects
                              </span>
                            )}
                          </li>
                        ))}
                      </ul>
                      {allReqsMet && (
                        <p className="text-emerald-300/80 text-xs mt-3">
                          You take all the required subjects and your marks meet the minimums.
                        </p>
                      )}
                      {reqChecks.some((r) => r.status === "missing") && (
                        <p className="text-white/40 text-xs mt-3 leading-relaxed">
                          Missing a required subject? Talk to your school about your subject
                          choices as early as possible — some subjects can&apos;t be added late.
                        </p>
                      )}
                    </div>
                  )}
                </div>
              )}

              {!selectedUniversity && (
                <div className="px-6 pb-6 text-center text-white/40 text-sm">
                  Select a university and programme above to see if you qualify.
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </section>
      </>
      )}

      {fetTab === "focus" && (
      <>
      {/* ── YOUR FOCUS AREAS ── */}
      <section className="py-10 px-4">
        <div className="max-w-3xl mx-auto">
          <Reveal className="text-center mb-10">
            <h2 className="text-3xl font-bold text-white mb-2">Your <span className="text-gradient">Focus Areas</span></h2>
            <p className="text-white/50 text-sm max-w-lg mx-auto">
              These are your weakest subjects right now. Improving them has the
              biggest impact on your APS score.
            </p>
          </Reveal>

          {focusAreas.length === 0 ? (
            <Reveal>
              <div className="glass rounded-2xl p-10 text-center">
                <IconDocumentText className="w-10 h-10 text-[#00D4FF] mx-auto mb-3" />
                <p className="text-white font-semibold mb-1">No marks entered yet</p>
                <p className="text-white/40 text-sm">Enter your subject percentages above to see your personalised focus areas.</p>
              </div>
            </Reveal>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {focusAreas.map((row, i) => (
                <Reveal key={row.name} delay={i * 120} className="h-full">
                  <div className="glass-card p-6 flex flex-col h-full">
                    {/* APS badge + subject */}
                    <div className="flex items-center justify-between mb-4">
                      <span className={`inline-flex items-center justify-center w-10 h-10 rounded-full border font-bold text-base ${apsBadgeColor(row.aps ?? 1)}`}>
                        {row.aps}
                      </span>
                      <span className="text-xs font-semibold text-white/40 uppercase tracking-wider">APS point{row.aps !== 1 ? "s" : ""}</span>
                    </div>

                    <h3 className="font-bold text-white text-base mb-1 leading-snug">{row.name}</h3>

                    <p className="text-sm text-white/50 mb-1">
                      Current mark: <span className="font-semibold text-white">{row.pct}%</span>
                    </p>

                    {/* Progress bar, color-coded by APS level */}
                    <div className="my-3">
                      <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-700 ${apsBarColor(row.aps ?? 1)}`}
                          style={{ width: `${Math.min(((row.pct ?? 0) / 100) * 100, 100)}%` }}
                        />
                      </div>
                    </div>

                    <p className="text-xs text-white/40 leading-relaxed mb-5 flex-1">
                      {focusMessage(row.aps ?? 1)}
                    </p>

                    <Link
                      href="/nexi-tutor"
                      className="mt-auto inline-flex items-center gap-1 text-sm font-semibold text-[#00D4FF] hover:text-white transition-colors group"
                    >
                      Improve this subject
                      <span className="group-hover:translate-x-0.5 transition-transform">→</span>
                    </Link>
                  </div>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>
      </>
      )}

      {fetTab === "explore" && (
      <>
      {/* ── EXPLORE YOUR OPTIONS ── */}
      <section className="py-10 px-4">
        <div className="max-w-4xl mx-auto">
          <Reveal className="text-center mb-10">
            <h2 className="text-3xl font-bold text-white mb-2">Explore Your <span className="text-gradient">Options</span></h2>
            <p className="text-white/50 text-sm max-w-lg mx-auto">
              Based on your current APS of{" "}
              <span className="text-white font-bold">{calc.totalAPS}</span>
              {calc.totalAPS > 0
                ? " — here are programmes you qualify for and ones just within reach."
                : " — enter your marks above to see personalised programme suggestions."}
            </p>
          </Reveal>

          {calc.totalAPS === 0 ? (
            <Reveal>
              <div className="glass rounded-2xl p-10 text-center">
                <IconAcademicCap className="w-10 h-10 text-[#00D4FF] mx-auto mb-3" />
                <p className="text-white font-semibold mb-1">Enter your marks above</p>
                <p className="text-white/40 text-sm">We&apos;ll show you programmes matched to your APS score — from higher certificates to degrees.</p>
              </div>
            </Reveal>
          ) : (
            <>
              {/* Headline: how many programmes they qualify for */}
              <Reveal className="mb-8">
                <div className="glass rounded-2xl px-6 py-5 flex items-center justify-center gap-3 text-center">
                  <IconAcademicCap className="w-7 h-7 text-emerald-300 flex-shrink-0" />
                  <p className="text-white/80 text-sm leading-relaxed">
                    With an APS of <span className="text-white font-bold">{calc.totalAPS}</span>, you qualify for{" "}
                    <span className="text-emerald-300 font-bold">{exploreOptions.qualifyingCount}</span>{" "}
                    of <span className="text-white font-semibold">{ALL_PROGRAMMES.length}</span> programmes in our list.
                  </p>
                </div>
              </Reveal>

              {/* Courses you qualify for — the full list, not just a sample */}
              {exploreOptions.qualifying.length > 0 && (
                <div className="mb-10">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-emerald-300 mb-4 flex items-center gap-2">
                    <span className="text-base leading-none">✓</span> Courses you qualify for
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {exploreOptions.qualifying.map((option, idx) => programmeCard(option, idx))}
                  </div>
                </div>
              )}

              {exploreOptions.qualifying.length === 0 && (
                <Reveal className="mb-10">
                  <div className="glass rounded-2xl p-8 text-center">
                    <p className="text-white font-semibold mb-1">You&apos;re almost there</p>
                    <p className="text-white/40 text-sm max-w-md mx-auto">
                      You don&apos;t yet meet the minimum APS for the programmes in our list — but the
                      closest ones are below. Small mark improvements can change this fast.
                    </p>
                  </div>
                </Reveal>
              )}

              {/* The closest programmes just out of reach */}
              {exploreOptions.aspirational.length > 0 && (
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-widest text-amber-300 mb-4 flex items-center gap-2">
                    <IconTrendingUp className="w-4 h-4" /> Just within reach
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {exploreOptions.aspirational.map((option, idx) => programmeCard(option, idx))}
                  </div>
                </div>
              )}

              <p className="text-center text-white/30 text-xs mt-8">
                APS requirements are indicative. Always confirm with the institution directly.
              </p>
            </>
          )}
        </div>
      </section>
      </>
      )}

      {fetTab === "advice" && (
      <>
      {/* ── FUNDING & CAREER ADVICE (premium, free taste) ── */}
      <section className="py-10 px-4">
        <div className="max-w-3xl mx-auto">
          <Reveal className="text-center mb-10">
            <h2 className="text-3xl font-bold text-white mb-2">
              Funding &amp; <span className="text-gradient">Career Advice</span>
            </h2>
            <p className="text-white/50 text-sm max-w-lg mx-auto">
              You know your APS and what you qualify for. Now let Nexi help with the
              rest — how to fund it and which direction fits you.
            </p>
          </Reveal>
          <Reveal>
            <CareerAdvice
              subjects={subjects
                .filter((s) => s.percentage !== "")
                .map((s) => ({ name: s.name, percent: Number(s.percentage) }))}
            />
          </Reveal>
        </div>
      </section>
      </>
      )}

      {/* Floating "next step" hint — appears once APS is filled, on the APS tab */}
      {showNudge && (
        <div className="fixed inset-x-0 bottom-5 z-40 flex justify-center px-4 pointer-events-none">
          <div className="guide-hint-in pointer-events-auto flex items-center gap-1 rounded-full bg-[#2D6BE4] text-white shadow-[0_8px_30px_rgba(0,0,0,0.45)] pl-5 pr-2 py-2">
            <button
              onClick={goToUniversities}
              className="flex items-center gap-2 text-sm font-semibold cursor-pointer"
            >
              Next: see what you qualify for
              <span className="grid place-items-center w-8 h-8 rounded-full bg-white/20">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                </svg>
              </span>
            </button>
            <button
              onClick={dismissNudge}
              aria-label="Dismiss hint"
              className="grid place-items-center w-8 h-8 rounded-full text-white/70 hover:text-white hover:bg-white/10 cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
        </>
      )}

    </div>
  );
}

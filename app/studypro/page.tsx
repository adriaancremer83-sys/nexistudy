"use client";

import Link from "next/link";
import { useState, useMemo } from "react";

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
  if (pts >= 6) return "text-emerald-600 bg-emerald-50 border-emerald-200";
  if (pts >= 5) return "text-blue-600 bg-blue-50 border-blue-200";
  if (pts >= 4) return "text-yellow-600 bg-yellow-50 border-yellow-200";
  return "text-red-500 bg-red-50 border-red-200";
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
type ProgrammeMap = Record<string, number>;
type UniversityMap = Record<string, ProgrammeMap>;

const UNIVERSITIES: UniversityMap = {
  "University of Cape Town (UCT)": {
    "MBChB – Medicine": 42,
    "BEng – Engineering": 38,
    "LLB – Law": 36,
    "BCom – Commerce": 34,
    "BSc – Science": 32,
    "BA – Humanities": 28,
    "BEd – Education": 28,
  },
  "University of the Witwatersrand (Wits)": {
    "MBBCh – Medicine": 42,
    "BEng – Engineering": 36,
    "LLB – Law": 34,
    "BCom – Commerce": 32,
    "BSc – Science": 30,
    "BA – Humanities": 28,
  },
  "Stellenbosch University (SU)": {
    "MBChB – Medicine": 42,
    "BEng – Engineering": 36,
    "LLB – Law": 34,
    "BCom – Commerce": 32,
    "BSc – Science": 30,
    "BEd – Education": 28,
  },
  "University of Pretoria (UP)": {
    "MBChB – Medicine": 40,
    "BEng – Engineering": 34,
    "LLB – Law": 32,
    "BCom – Commerce": 30,
    "BSc – Science": 28,
    "BA – Arts": 26,
    "BEd – Education": 26,
  },
  "University of Johannesburg (UJ)": {
    "BEng – Engineering": 32,
    "LLB – Law": 30,
    "BCom – Commerce": 28,
    "BSc – Science": 26,
    "BA – Arts": 24,
    "BEd – Education": 24,
  },
  "University of KwaZulu-Natal (UKZN)": {
    "MBChB – Medicine": 40,
    "BEng – Engineering": 32,
    "LLB – Law": 30,
    "BCom – Commerce": 28,
    "BSc – Science": 26,
    "BEd – Education": 24,
  },
  "University of the Free State (UFS)": {
    "MBChB – Medicine": 38,
    "LLB – Law": 28,
    "BCom – Commerce": 26,
    "BSc – Science": 24,
    "BA – Arts": 22,
    "BEd – Education": 22,
  },
  "Rhodes University": {
    "LLB – Law": 30,
    "BCom – Commerce": 28,
    "BSc – Science": 26,
    "BA – Humanities": 24,
    "BEd – Education": 22,
  },
  "Nelson Mandela University (NMU)": {
    "BEng – Engineering": 30,
    "LLB – Law": 28,
    "BCom – Commerce": 26,
    "BSc – Science": 24,
    "BA – Arts": 22,
    "BEd – Education": 22,
  },
  "North-West University (NWU)": {
    "MBChB – Medicine": 38,
    "BEng – Engineering": 30,
    "LLB – Law": 28,
    "BCom – Commerce": 26,
    "BSc – Science": 24,
    "BEd – Education": 22,
  },
};

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
  "Degree": "bg-blue-100 text-blue-700",
  "Diploma": "bg-violet-100 text-violet-700",
  "Higher Certificate": "bg-amber-100 text-amber-700",
};

// ── Component ───────────────────────────────────────────────────────────────
export default function StudyProPage() {
  const [subjects, setSubjects] = useState<SubjectRow[]>(
    DEFAULT_SUBJECTS.map((name) => ({ name, percentage: "" }))
  );
  const [selectedUniversity, setSelectedUniversity] = useState("");
  const [selectedProgramme, setSelectedProgramme] = useState("");

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

  // ── Focus areas: weakest filled non-LO subjects ───────────────────────────
  const focusAreas = useMemo(() => {
    return calc.rows
      .filter((r) => !r.isLO && r.aps !== null)
      .sort((a, b) => (a.aps ?? 0) - (b.aps ?? 0))
      .slice(0, 3);
  }, [calc.rows]);

  // ── Explore options: smart mix of qualifying + close aspirational ──────────
  const exploreOptions = useMemo(() => {
    if (calc.totalAPS === 0) return [];

    const withGap = ALL_PROGRAMMES.map((p) => ({
      ...p,
      gap: p.minAPS - calc.totalAPS,
    }));

    // Best 3 they already qualify for (highest min APS = most prestigious)
    const qualifying = withGap
      .filter((p) => p.gap <= 0)
      .sort((a, b) => b.minAPS - a.minAPS)
      .slice(0, 3);

    // 3 closest they don't yet qualify for
    const aspirational = withGap
      .filter((p) => p.gap > 0)
      .sort((a, b) => a.gap - b.gap)
      .slice(0, 3);

    return [...qualifying, ...aspirational].slice(0, 6);
  }, [calc.totalAPS]);

  // ── University match ──────────────────────────────────────────────────────
  const programmes = selectedUniversity
    ? Object.keys(UNIVERSITIES[selectedUniversity] ?? {})
    : [];

  const minAPS =
    selectedUniversity && selectedProgramme
      ? (UNIVERSITIES[selectedUniversity]?.[selectedProgramme] ?? null)
      : null;

  const qualifies = minAPS !== null && calc.totalAPS >= minAPS;
  const apsGap = minAPS !== null ? minAPS - calc.totalAPS : null;

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="bg-[#F0F4FF] min-h-screen">

      {/* ── 1. HERO ── */}
      <section className="bg-[#1B2A4A] text-white py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Study<span className="text-[#2D6BE4]">Pro</span> — Your Personalised
            Roadmap to Success
          </h1>
          <p className="text-gray-300 text-lg mb-8 max-w-xl mx-auto">
            Know where you stand, set your target, and build a clear path to
            university admission.
          </p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <button className="px-6 py-2.5 bg-[#2D6BE4] text-white font-semibold rounded-full text-sm shadow-lg shadow-[#2D6BE4]/30">
              Grade 10–12
            </button>
            <button
              disabled
              className="px-6 py-2.5 bg-white/10 text-gray-400 font-semibold rounded-full text-sm cursor-not-allowed border border-white/10"
            >
              Grade 8–9 — Coming Soon
            </button>
          </div>
        </div>
      </section>

      {/* ── 2. APS CALCULATOR ── */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-[#1B2A4A] mb-2">APS Calculator</h2>
            <p className="text-gray-500 text-sm max-w-lg mx-auto">
              Enter your marks for all 7 subjects. We use your best 6 (excluding
              Life Orientation) to calculate your university APS score.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-[#1B2A4A]/8 overflow-hidden">
            <div className="grid grid-cols-12 gap-2 px-6 py-3 bg-[#1B2A4A] text-white text-xs font-semibold uppercase tracking-wider">
              <div className="col-span-1 text-center">#</div>
              <div className="col-span-5">Subject</div>
              <div className="col-span-3 text-center">Mark (%)</div>
              <div className="col-span-2 text-center">APS</div>
              <div className="col-span-1 text-center">✓</div>
            </div>

            <div className="divide-y divide-gray-100">
              {calc.rows.map((row, i) => {
                const inBest6 = calc.best6Names.has(row.name) && !row.isLO;
                return (
                  <div
                    key={i}
                    className={`grid grid-cols-12 gap-2 px-6 py-3 items-center transition-colors ${
                      row.isLO ? "bg-amber-50/60" : inBest6 ? "bg-blue-50/40" : ""
                    }`}
                  >
                    <div className="col-span-1 text-center text-xs text-gray-400 font-medium">{i + 1}</div>
                    <div className="col-span-5">
                      <select
                        value={subjects[i].name}
                        onChange={(e) => updateName(i, e.target.value)}
                        className="w-full text-sm text-[#1B2A4A] bg-transparent border-b border-gray-200 focus:border-[#2D6BE4] focus:outline-none py-1 pr-2 cursor-pointer"
                      >
                        {SUBJECT_OPTIONS.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                      {row.isLO && (
                        <span className="text-[10px] text-amber-600 font-medium">
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
                          className="w-full text-center text-sm font-medium text-[#1B2A4A] border border-gray-200 rounded-lg py-1.5 focus:outline-none focus:ring-2 focus:ring-[#2D6BE4]/40 focus:border-[#2D6BE4]"
                        />
                        <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-400">%</span>
                      </div>
                    </div>
                    <div className="col-span-2 flex justify-center">
                      {row.aps !== null ? (
                        <span className={`inline-flex items-center justify-center w-9 h-9 rounded-full border font-bold text-sm ${apsBadgeColor(row.aps)}`}>
                          {row.aps}
                        </span>
                      ) : (
                        <span className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-gray-100 text-gray-300 text-sm">—</span>
                      )}
                    </div>
                    <div className="col-span-1 flex justify-center">
                      {inBest6 ? (
                        <span className="text-[#2D6BE4] text-base">✓</span>
                      ) : row.isLO ? (
                        <span className="text-amber-400 text-base">★</span>
                      ) : (
                        <span className="text-gray-200 text-base">○</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="border-t border-[#1B2A4A]/10 px-6 py-5 bg-[#F0F4FF] flex items-center justify-between flex-wrap gap-4">
              <div>
                <p className="text-xs text-gray-500 mb-0.5">
                  Based on best {Math.min(calc.filledCount, 6)} of {calc.filledCount} completed subjects (excl. Life Orientation)
                </p>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-gray-600">Your APS Score</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold text-[#1B2A4A]">{calc.totalAPS}</span>
                    <span className="text-gray-400 text-sm">/ 42</span>
                  </div>
                </div>
              </div>
              <div className="flex-1 min-w-[160px] max-w-xs">
                <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#2D6BE4] rounded-full transition-all duration-500"
                    style={{ width: `${Math.min((calc.totalAPS / 42) * 100, 100)}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                  <span>0</span><span>21</span><span>42</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 mt-4 text-xs text-gray-500">
            <span className="flex items-center gap-1.5"><span className="text-[#2D6BE4]">✓</span> Counted in your APS</span>
            <span className="flex items-center gap-1.5"><span className="text-amber-400">★</span> Life Orientation (recorded only)</span>
            <span className="flex items-center gap-1.5"><span className="text-gray-300">○</span> Not in best 6</span>
          </div>

          <div className="mt-6 bg-white rounded-xl border border-[#1B2A4A]/8 overflow-hidden">
            <div className="px-5 py-3 bg-[#1B2A4A]/5 border-b border-[#1B2A4A]/8">
              <p className="text-xs font-semibold text-[#1B2A4A] uppercase tracking-wider">APS Points Scale</p>
            </div>
            <div className="grid grid-cols-7 divide-x divide-gray-100 text-center text-xs">
              {[
                { range: "80–100%", pts: 7, color: "text-emerald-600" },
                { range: "70–79%", pts: 6, color: "text-emerald-500" },
                { range: "60–69%", pts: 5, color: "text-blue-500" },
                { range: "50–59%", pts: 4, color: "text-blue-400" },
                { range: "40–49%", pts: 3, color: "text-yellow-500" },
                { range: "30–39%", pts: 2, color: "text-orange-500" },
                { range: "0–29%", pts: 1, color: "text-red-500" },
              ].map((r) => (
                <div key={r.pts} className="py-3 px-1">
                  <p className={`font-bold text-base ${r.color}`}>{r.pts}</p>
                  <p className="text-gray-400 text-[10px] mt-0.5 leading-tight">{r.range}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. UNIVERSITY & PROGRAMME MATCH ── */}
      <section className="py-16 px-4 bg-[#1B2A4A]">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-white mb-2">
              Choose Your Dream University & Programme
            </h2>
            <p className="text-gray-400 text-sm max-w-lg mx-auto">
              See whether your current APS qualifies — and how close you are if it doesn&apos;t.
            </p>
          </div>

          <div className="bg-[#243660] rounded-2xl border border-white/8 overflow-hidden">
            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">University</label>
                <select
                  value={selectedUniversity}
                  onChange={(e) => handleUniversityChange(e.target.value)}
                  className="w-full bg-[#1B2A4A] text-white border border-white/15 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#2D6BE4]/50 focus:border-[#2D6BE4]"
                >
                  <option value="">— Select a university —</option>
                  {Object.keys(UNIVERSITIES).map((u) => (
                    <option key={u} value={u}>{u}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">Programme</label>
                <select
                  value={selectedProgramme}
                  onChange={(e) => setSelectedProgramme(e.target.value)}
                  disabled={!selectedUniversity}
                  className="w-full bg-[#1B2A4A] text-white border border-white/15 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#2D6BE4]/50 focus:border-[#2D6BE4] disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <option value="">— Select a programme —</option>
                  {programmes.map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>
            </div>

            {minAPS !== null && (
              <div className={`mx-6 mb-6 rounded-xl p-5 border ${qualifies ? "bg-emerald-900/30 border-emerald-500/30" : "bg-red-900/20 border-red-500/20"}`}>
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">Min APS required</p>
                    <p className="text-4xl font-extrabold text-white">{minAPS}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">Your APS</p>
                    <p className={`text-4xl font-extrabold ${qualifies ? "text-emerald-400" : "text-red-400"}`}>{calc.totalAPS}</p>
                  </div>
                  <div className="flex-1 min-w-[160px]">
                    {qualifies ? (
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-2xl">🎉</span>
                        <div>
                          <p className="text-emerald-400 font-bold text-sm">You qualify!</p>
                          <p className="text-gray-400 text-xs">Your APS meets the minimum for this programme.</p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-2xl">📈</span>
                        <div>
                          <p className="text-red-400 font-bold text-sm">
                            {apsGap !== null && apsGap > 0 ? `${apsGap} more APS point${apsGap > 1 ? "s" : ""} needed` : "Keep improving"}
                          </p>
                          <p className="text-gray-400 text-xs">Use Nexi Tutor to target your weakest subjects.</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                {!qualifies && apsGap !== null && apsGap > 0 && (
                  <div className="mt-4">
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#2D6BE4] rounded-full transition-all duration-500"
                        style={{ width: `${Math.min((calc.totalAPS / minAPS) * 100, 100)}%` }}
                      />
                    </div>
                    <p className="text-[10px] text-gray-500 mt-1 text-right">{calc.totalAPS} / {minAPS} APS</p>
                  </div>
                )}
              </div>
            )}

            {!selectedUniversity && (
              <div className="px-6 pb-6 text-center text-gray-500 text-sm">
                Select a university and programme above to see if you qualify.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── 4. YOUR FOCUS AREAS ── */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-[#1B2A4A] mb-2">Your Focus Areas</h2>
            <p className="text-gray-500 text-sm max-w-lg mx-auto">
              These are your weakest subjects right now. Improving them has the
              biggest impact on your APS score.
            </p>
          </div>

          {focusAreas.length === 0 ? (
            <div className="bg-white rounded-2xl border border-[#1B2A4A]/8 p-10 text-center">
              <p className="text-4xl mb-3">📝</p>
              <p className="text-[#1B2A4A] font-semibold mb-1">No marks entered yet</p>
              <p className="text-gray-400 text-sm">Enter your subject percentages above to see your personalised focus areas.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {focusAreas.map((row) => (
                <div
                  key={row.name}
                  className="bg-white rounded-2xl border border-[#1B2A4A]/8 shadow-sm p-6 flex flex-col"
                >
                  {/* APS badge + subject */}
                  <div className="flex items-center justify-between mb-4">
                    <span className={`inline-flex items-center justify-center w-10 h-10 rounded-full border font-bold text-base ${apsBadgeColor(row.aps ?? 1)}`}>
                      {row.aps}
                    </span>
                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">APS point{row.aps !== 1 ? "s" : ""}</span>
                  </div>

                  <h3 className="font-bold text-[#1B2A4A] text-base mb-1 leading-snug">{row.name}</h3>

                  <p className="text-sm text-gray-500 mb-1">
                    Current mark: <span className="font-semibold text-[#1B2A4A]">{row.pct}%</span>
                  </p>

                  {/* Progress bar to next APS threshold */}
                  <div className="my-3">
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#2D6BE4] rounded-full transition-all duration-500"
                        style={{ width: `${Math.min(((row.pct ?? 0) / 100) * 100, 100)}%` }}
                      />
                    </div>
                  </div>

                  <p className="text-xs text-gray-400 leading-relaxed mb-5 flex-1">
                    {focusMessage(row.aps ?? 1)}
                  </p>

                  <Link
                    href="/nexi-tutor"
                    className="mt-auto inline-flex items-center gap-1 text-sm font-semibold text-[#2D6BE4] hover:text-[#2558C5] transition-colors group"
                  >
                    Improve this subject
                    <span className="group-hover:translate-x-0.5 transition-transform">→</span>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── 5. EXPLORE YOUR OPTIONS ── */}
      <section className="py-16 px-4 bg-[#1B2A4A]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-white mb-2">Explore Your Options</h2>
            <p className="text-gray-400 text-sm max-w-lg mx-auto">
              Based on your current APS of{" "}
              <span className="text-white font-bold">{calc.totalAPS}</span>
              {calc.totalAPS > 0
                ? " — here are programmes you qualify for and ones just within reach."
                : " — enter your marks above to see personalised programme suggestions."}
            </p>
          </div>

          {exploreOptions.length === 0 ? (
            <div className="bg-[#243660] rounded-2xl border border-white/8 p-10 text-center">
              <p className="text-4xl mb-3">🎓</p>
              <p className="text-white font-semibold mb-1">Enter your marks above</p>
              <p className="text-gray-400 text-sm">We&apos;ll show you programmes matched to your APS score — from higher certificates to degrees.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {exploreOptions.map((option, idx) => {
                const gap = option.minAPS - calc.totalAPS;
                const qualifiesForThis = gap <= 0;
                return (
                  <div
                    key={idx}
                    className={`rounded-2xl p-5 border flex flex-col transition-all ${
                      qualifiesForThis
                        ? "bg-[#243660] border-emerald-500/30"
                        : "bg-[#1F3158] border-white/8"
                    }`}
                  >
                    {/* Type + qualify badge */}
                    <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${TYPE_COLORS[option.type]}`}>
                        {option.type}
                      </span>
                      {qualifiesForThis ? (
                        <span className="text-[10px] font-bold text-emerald-400 bg-emerald-900/40 px-2 py-0.5 rounded-full">
                          ✓ You qualify
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold text-amber-400 bg-amber-900/30 px-2 py-0.5 rounded-full">
                          {gap} pt{gap !== 1 ? "s" : ""} away
                        </span>
                      )}
                    </div>

                    {/* Programme & university */}
                    <h3 className="text-white font-bold text-base leading-snug mb-1">{option.programme}</h3>
                    <p className="text-gray-400 text-xs mb-4 leading-relaxed">{option.university}</p>

                    {/* APS info */}
                    <div className="mt-auto">
                      <div className="flex items-center justify-between text-xs text-gray-500 mb-1.5">
                        <span>Min APS: <span className="text-white font-semibold">{option.minAPS}</span></span>
                        <span>Yours: <span className={`font-semibold ${qualifiesForThis ? "text-emerald-400" : "text-[#7EABFF]"}`}>{calc.totalAPS}</span></span>
                      </div>
                      <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${qualifiesForThis ? "bg-emerald-500" : "bg-[#2D6BE4]"}`}
                          style={{ width: `${Math.min((calc.totalAPS / option.minAPS) * 100, 100)}%` }}
                        />
                      </div>

                      {/* Status line */}
                      <p className="text-xs mt-2.5">
                        {qualifiesForThis ? (
                          <span className="text-emerald-400 font-medium">You meet the minimum requirement.</span>
                        ) : (
                          <span className="text-gray-400">
                            You&apos;re <span className="text-amber-400 font-semibold">{gap} point{gap !== 1 ? "s" : ""}</span> away from qualifying.
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {exploreOptions.length > 0 && (
            <p className="text-center text-gray-500 text-xs mt-8">
              APS requirements are indicative. Always confirm with the institution directly.
            </p>
          )}
        </div>
      </section>

    </div>
  );
}

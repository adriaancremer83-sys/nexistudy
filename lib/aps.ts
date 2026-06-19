// South African NSC Admission Point Score (APS) helpers.
//
// The NSC reports each subject on a 7-level achievement scale. Most public
// universities compute an APS by summing the achievement-level points of the
// learner's best six subjects, EXCLUDING Life Orientation (which the majority of
// universities either exclude or count out of a reduced scale). This module uses
// the common "best six excluding Life Orientation" convention.
//
// IMPORTANT: APS conventions differ per university (UCT, Wits and UJ each use
// their own point systems). Treat this as a solid national estimate, not a
// guarantee — always confirm against the specific institution's prospectus.

export interface SubjectMark {
  name: string;
  percent: number; // 0–100
}

export interface ApsResult {
  aps: number; // sum of best-six points (Life Orientation excluded)
  countedSubjects: { name: string; percent: number; level: number; points: number }[];
  excluded: { name: string; percent: number; reason: string }[];
}

// NSC achievement level (1–7) for a percentage mark.
export function achievementLevel(percent: number): number {
  if (percent >= 80) return 7;
  if (percent >= 70) return 6;
  if (percent >= 60) return 5;
  if (percent >= 50) return 4;
  if (percent >= 40) return 3;
  if (percent >= 30) return 2;
  return 1;
}

// Standard APS contribution per subject = the achievement level itself (7 max).
export function pointsForPercent(percent: number): number {
  return achievementLevel(percent);
}

function isLifeOrientation(name: string): boolean {
  return /life\s*orientation|^lo$/i.test(name.trim());
}

// Compute APS from a learner's subjects: best six by points, Life Orientation
// excluded. Returns the breakdown so the UI can show exactly what was counted.
export function computeAps(subjects: SubjectMark[]): ApsResult {
  const cleaned = subjects
    .map((s) => ({ name: s.name.trim(), percent: clampPercent(s.percent) }))
    .filter((s) => s.name.length > 0 && Number.isFinite(s.percent));

  const eligible = cleaned
    .filter((s) => !isLifeOrientation(s.name))
    .map((s) => ({
      name: s.name,
      percent: s.percent,
      level: achievementLevel(s.percent),
      points: pointsForPercent(s.percent),
    }))
    .sort((a, b) => b.points - a.points);

  const counted = eligible.slice(0, 6);
  const dropped = eligible.slice(6);

  const excluded: ApsResult["excluded"] = [
    ...cleaned
      .filter((s) => isLifeOrientation(s.name))
      .map((s) => ({ name: s.name, percent: s.percent, reason: "Life Orientation (not counted in APS)" })),
    ...dropped.map((s) => ({ name: s.name, percent: s.percent, reason: "Outside best six" })),
  ];

  const aps = counted.reduce((sum, s) => sum + s.points, 0);
  return { aps, countedSubjects: counted, excluded };
}

function clampPercent(p: number): number {
  if (!Number.isFinite(p)) return 0;
  return Math.max(0, Math.min(100, Math.round(p)));
}

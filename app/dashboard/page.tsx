import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";
import Nexi from "@/components/Nexi";
import type { Session } from "next-auth";
import Reveal from "@/components/Reveal";
import ProgressRing from "@/components/ProgressRing";
import { IconAcademicCap, IconCpuChip, IconChartBar, IconStar, IconLock, IconTarget, IconDocumentText } from "@/components/icons";
import { getWeakSpots } from "@/lib/practice";
import { getLearnerClasses } from "@/lib/classes";
import { getSubscription } from "@/lib/users";
import SubscribeButton from "@/components/SubscribeButton";
import JoinClassCard from "@/components/JoinClassCard";
import ExamCountdown from "@/components/ExamCountdown";

export const dynamic = "force-dynamic";

type ExtendedUser = NonNullable<Session["user"]>;

// One quote per day of the week, indexed by Date.getDay() (0 = Sunday).
const dailyQuotes = [
  "Sunday: rest, reset, and maybe one cheeky flashcard. You've earned it.",
  "Sharp sharp! New week, new chapter — one page at a time.",
  "Yebo, you've got this. Small daily wins become November victories.",
  "Midweek already — keep going, your future self is cheering.",
  "Almost Friday. Champions push through the days that feel long.",
  "Strong finish! Wrap up the week, then enjoy that weekend properly.",
  "A quiet Saturday session today is a calmer exam hall tomorrow.",
];

function apsStatus(score: number): { label: string; classes: string } {
  if (score >= 30) return { label: "University Ready", classes: "text-emerald-400" };
  if (score >= 20) return { label: "On Track", classes: "text-amber-300" };
  return { label: "Needs attention", classes: "text-red-400" };
}

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) redirect("/login");

  const user = session.user as ExtendedUser;
  if (user.role === "teacher") redirect("/teachers/dashboard");
  // First-time learners pick their language, grade, school & subjects before
  // landing on the dashboard.
  if (!user.onboarded) redirect("/onboarding");

  // Read the LIVE plan from the DB — the session JWT can lag right after an
  // upgrade (same source /account uses), so a learner who just paid doesn't get
  // shown "Free Plan" until their token happens to refresh.
  const { plan } = await getSubscription(user.id);

  const apsScore = user.apsScore ?? 0;
  const apsPct = Math.round((apsScore / 42) * 100);
  const status = apsStatus(apsScore);
  const quote = dailyQuotes[new Date().getDay()];

  const statCards = [
    { label: "APS Score", value: String(apsScore) },
    { label: "Chats Today", value: plan === "premium" ? "Unlimited" : "5/5" },
    { label: "Study Streak", value: "🔥 1 day" },
  ];

  // Real weak spots from quiz history; falls back to example topics for the
  // free-plan blurred preview when the learner hasn't practised yet.
  const weakSpots = await getWeakSpots(user.id);
  const learnerClasses = await getLearnerClasses(user.id);
  const weakSpotPreview =
    weakSpots.length > 0
      ? weakSpots.map((w) => w.name)
      : [
          "Trigonometry identities",
          "Stoichiometry calculations",
          "Essay structure & planning",
          "Algebraic fractions",
        ];

  return (
    <div className="min-h-screen">

      {/* ── WELCOME BANNER ── */}
      <section className="page-hero py-12 px-4">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="min-w-0">
            <p className="text-[#00D4FF] text-sm font-medium mb-1">Welcome back</p>
            <h1 className="text-3xl sm:text-4xl font-bold text-white">{user.name}</h1>
            <p className="text-white/40 text-sm mt-1">
              {user.curriculum} · {user.grade}
            </p>
            <p className="text-white/60 text-sm mt-4 italic max-w-md leading-relaxed">
              &ldquo;{quote}&rdquo;
            </p>
          </div>

          <div className="flex items-center gap-6 flex-shrink-0">
            <div className="flex flex-col items-start gap-3">
              <span
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-bold border ${
                  plan === "premium"
                    ? "bg-[#2D6BE4]/20 text-[#00D4FF] border-[#00D4FF]/40"
                    : "glass text-white/70"
                }`}
              >
                {plan === "premium" && <IconStar className="w-4 h-4" />}
                {plan === "premium" ? "Premium" : "Free Plan"}
              </span>
              {plan === "free" && (
                <SubscribeButton
                  callbackUrl="/dashboard"
                  className="px-4 py-2 text-sm font-bold text-white bg-[#2D6BE4] hover:bg-[#4A82F0] rounded-full transition-colors cursor-pointer disabled:opacity-70 disabled:cursor-wait"
                >
                  Upgrade
                </SubscribeButton>
              )}
            </div>

            {/* Nexi mascot with the gentle float */}
            <div className="animate-float">
              <Nexi
                pose="wave"
                width={150}
                height={150}
                className="h-[150px] w-auto object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ── DASHBOARD CONTENT ── */}
      <div className="max-w-5xl mx-auto px-4 py-10 space-y-6">

        {/* ── EXAM COUNTDOWN ── */}
        <ExamCountdown />

        {/* ── STATS ROW ── */}
        <Reveal>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {statCards.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-white/[0.08] bg-[#0E1F3D] px-5 py-4"
              >
                <p className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-1.5">
                  {stat.label}
                </p>
                <p className="text-xl font-extrabold text-white">{stat.value}</p>
              </div>
            ))}
            <Link
              href="/pricing"
              className="group rounded-xl border border-white/[0.08] bg-[#0E1F3D] px-5 py-4 transition-colors hover:border-[#00D4FF]/40"
            >
              <p className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-1.5">
                Plan
              </p>
              <p className="text-xl font-extrabold text-white flex items-center gap-2">
                {plan === "premium" ? "Premium" : "Free"}
                {plan === "free" && (
                  <span className="text-[#00D4FF] text-base group-hover:translate-x-0.5 transition-transform">
                    →
                  </span>
                )}
              </p>
            </Link>
          </div>
        </Reveal>

        {/* ── APS SUMMARY CARD ── */}
        <Reveal delay={80}>
          <div className="glass rounded-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-white/10 bg-white/5 flex items-center gap-2.5 text-[#00D4FF]">
              <IconAcademicCap className="w-4 h-4" />
              <h2 className="text-xs font-semibold text-white uppercase tracking-widest">APS Score Summary</h2>
            </div>
            <div className="p-6 flex flex-col sm:flex-row items-center gap-8">
              {/* Gradient ring + colour-coded status */}
              <div className="flex flex-col items-center gap-3">
                <ProgressRing value={apsScore} max={42} size={160} strokeWidth={11}>
                  <span className="text-4xl font-extrabold text-white leading-none">{apsScore}</span>
                  <span className="text-white/40 text-xs mt-1">/ 42</span>
                </ProgressRing>
                <p className={`text-sm font-bold ${status.classes}`}>{status.label}</p>
              </div>

              {/* Detail */}
              <div className="flex-1 min-w-0 w-full text-center sm:text-left">
                <p className="text-white/50 text-sm leading-relaxed max-w-sm">
                  You&apos;ve reached <span className="text-white font-semibold">{apsPct}%</span> of the
                  maximum APS score. Keep your marks updated to track your university readiness.
                </p>
              </div>

              {/* CTA */}
              <Link
                href="/studypro"
                className="flex-shrink-0 px-5 py-2.5 bg-[#2D6BE4] hover:bg-[#4A82F0] text-white text-sm font-semibold rounded-xl transition-colors"
              >
                Update Marks →
              </Link>
            </div>

            {apsScore === 0 && (
              <div className="mx-6 mb-6 bg-amber-400/10 border border-amber-400/25 rounded-xl px-4 py-3 text-sm text-amber-300">
                <span className="font-semibold">Head to Study Pro</span> to enter your subject marks and calculate your APS score.
              </div>
            )}
          </div>
        </Reveal>

        {/* ── QUICK LINKS ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

          <Reveal delay={120} className="h-full">
            <Link
              href="/practice"
              className="group rounded-2xl border border-[#00D4FF]/25 bg-[#0E1F3D] p-9 flex items-start gap-5 h-full transition-[border-color,box-shadow] duration-300 hover:border-[#00D4FF]/50 hover:shadow-[0_0_24px_rgba(0,212,255,0.12)]"
            >
              <div className="w-14 h-14 rounded-xl bg-[#2D6BE4]/20 border border-[#00D4FF]/20 flex items-center justify-center flex-shrink-0 text-[#00D4FF] group-hover:bg-[#2D6BE4]/30 transition-colors">
                <IconTarget className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-white font-bold text-xl mb-1.5">Practice Quizzes</h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  Short topic quizzes marked instantly, with explanations for every
                  answer. Each quiz builds your weak-spots map.
                </p>
                <span className="inline-block mt-4 text-sm font-semibold text-[#00D4FF] group-hover:text-white transition-colors">
                  Start practising →
                </span>
              </div>
            </Link>
          </Reveal>

          <Reveal delay={140} className="h-full">
            <Link
              href="/past-papers"
              className="group rounded-2xl border border-white/[0.08] bg-[#0E1F3D] p-9 flex items-start gap-5 h-full transition-[border-color,box-shadow] duration-300 hover:border-[#00D4FF]/40 hover:shadow-[0_0_24px_rgba(0,212,255,0.12)]"
            >
              <div className="w-14 h-14 rounded-xl bg-[#2D6BE4]/20 border border-[#00D4FF]/20 flex items-center justify-center flex-shrink-0 text-[#00D4FF] group-hover:bg-[#2D6BE4]/30 transition-colors">
                <IconDocumentText className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-white font-bold text-xl mb-1.5">Past Papers</h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  Official NSC exam papers and memos, organised by year — the
                  closest thing to the real exam.
                </p>
                <span className="inline-block mt-4 text-sm font-semibold text-[#00D4FF] group-hover:text-white transition-colors">
                  Browse papers →
                </span>
              </div>
            </Link>
          </Reveal>

          <Reveal delay={160} className="h-full">
            <Link
              href="/nexi-tutor"
              className="group rounded-2xl border border-white/[0.08] bg-[#0E1F3D] p-9 flex items-start gap-5 h-full transition-[border-color,box-shadow] duration-300 hover:border-[#00D4FF]/40 hover:shadow-[0_0_24px_rgba(0,212,255,0.12)]"
            >
              <div className="w-14 h-14 rounded-xl bg-[#2D6BE4]/20 border border-[#00D4FF]/20 flex items-center justify-center flex-shrink-0 text-[#00D4FF] group-hover:bg-[#2D6BE4]/30 transition-colors">
                <IconCpuChip className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-white font-bold text-xl mb-1.5">Nexi Tutor</h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  Ask questions, get step-by-step explanations, and learn any topic instantly.
                </p>
                <span className="inline-block mt-4 text-sm font-semibold text-[#00D4FF] group-hover:text-white transition-colors">
                  Start a session →
                </span>
              </div>
            </Link>
          </Reveal>

          <Reveal delay={240} className="h-full">
            <Link
              href="/studypro"
              className="group rounded-2xl border border-white/[0.08] bg-[#0E1F3D] p-9 flex items-start gap-5 h-full transition-[border-color,box-shadow] duration-300 hover:border-[#00D4FF]/40 hover:shadow-[0_0_24px_rgba(0,212,255,0.12)]"
            >
              <div className="w-14 h-14 rounded-xl bg-[#2D6BE4]/20 border border-[#00D4FF]/20 flex items-center justify-center flex-shrink-0 text-[#00D4FF] group-hover:bg-[#2D6BE4]/30 transition-colors">
                <IconChartBar className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-white font-bold text-xl mb-1.5">Study Pro</h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  Calculate your APS, track subject progress, and explore university options.
                </p>
                <span className="inline-block mt-4 text-sm font-semibold text-[#00D4FF] group-hover:text-white transition-colors">
                  Open Study Pro →
                </span>
              </div>
            </Link>
          </Reveal>

        </div>

        {/* ── JOIN A CLASS ── */}
        <Reveal delay={300}>
          <Suspense fallback={null}>
            <JoinClassCard initialClasses={learnerClasses} />
          </Suspense>
        </Reveal>

        {/* ── WEAK SPOTS (premium: real data) ── */}
        {plan === "premium" && (
          <Reveal delay={320}>
            <div className="rounded-2xl border border-white/[0.08] bg-[#0E1F3D] overflow-hidden">
              <div className="px-6 py-4 border-b border-white/10 bg-white/5 flex items-center gap-2.5 text-[#00D4FF]">
                <IconTarget className="w-4 h-4" />
                <h2 className="text-xs font-semibold text-white uppercase tracking-widest">Your Weak Spots</h2>
              </div>
              <div className="p-6">
                {weakSpots.length === 0 ? (
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <p className="text-white/50 text-sm leading-relaxed max-w-md">
                      Take your first practice quiz and Nexi will start mapping
                      exactly which topics need work.
                    </p>
                    <Link
                      href="/practice"
                      className="flex-shrink-0 px-5 py-2.5 bg-[#2D6BE4] hover:bg-[#4A82F0] text-white text-sm font-bold rounded-xl transition-colors"
                    >
                      Take a quiz →
                    </Link>
                  </div>
                ) : (
                  <ul className="space-y-4">
                    {weakSpots.map((spot) => (
                      <li key={spot.id} className="flex items-center gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between text-sm mb-1.5">
                            <span className="text-white font-semibold truncate">{spot.name}</span>
                            <span className="text-white/40 text-xs font-bold">{spot.mastery}%</span>
                          </div>
                          <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                            <div
                              className={`h-full rounded-full ${
                                spot.mastery < 50
                                  ? "bg-red-400"
                                  : spot.mastery < 75
                                    ? "bg-amber-300"
                                    : "bg-emerald-400"
                              }`}
                              style={{ width: `${Math.max(spot.mastery, 4)}%` }}
                            />
                          </div>
                        </div>
                        <Link
                          href="/practice"
                          className="flex-shrink-0 text-sm font-semibold text-[#00D4FF] hover:text-white transition-colors"
                        >
                          Practise →
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </Reveal>
        )}

        {/* ── WEAK SPOTS TEASE (free plan) ── */}
        {plan === "free" && (
          <Reveal delay={320}>
            <div className="rounded-2xl border border-white/[0.08] bg-[#0E1F3D] overflow-hidden">
              <div className="px-6 py-4 border-b border-white/10 bg-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2.5 text-[#00D4FF]">
                  <IconLock className="w-4 h-4" />
                  <h2 className="text-xs font-semibold text-white uppercase tracking-widest">Your Weak Spots</h2>
                </div>
                <span className="text-[10px] font-semibold uppercase tracking-widest text-white/30">
                  Example preview
                </span>
              </div>
              <div className="p-6 flex flex-col sm:flex-row items-start sm:items-center gap-6">
                <ul className="space-y-2.5 flex-shrink-0" aria-hidden>
                  {weakSpotPreview.map((topic) => (
                    <li
                      key={topic}
                      className="text-sm text-white/30 select-none blur-[2px]"
                    >
                      {topic}
                    </li>
                  ))}
                </ul>
                <div className="flex-1">
                  <h3 className="text-white font-bold text-lg mb-1.5">
                    Nexi is learning how you study
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed max-w-md mb-4">
                    Every chat builds your personal weak-spots map. Premium turns it
                    into Nexi&apos;s Exam Plan — a day-by-day route to walking in ready.
                  </p>
                  <Link
                    href="/pricing"
                    className="inline-block px-5 py-2.5 bg-[#2D6BE4] hover:bg-[#4A82F0] text-white text-sm font-bold rounded-xl transition-colors"
                  >
                    Unlock with Premium →
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        )}

        {/* ── FREE PLAN NUDGE ── */}
        {plan === "free" && (
          <Reveal delay={400}>
            <div className="glass-strong rounded-2xl p-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 !border-[#00D4FF]/25">
              <div>
                <p className="text-[#00D4FF] text-xs font-bold uppercase tracking-widest mb-1.5">Unlock More</p>
                <h3 className="text-white font-bold text-lg mb-1">You&apos;re on the Free Plan</h3>
                <p className="text-white/50 text-sm leading-relaxed max-w-md">
                  Upgrade for unlimited chats, Nexi&apos;s Exam Plan, past-paper walkthroughs,
                  the Career Roadmap, and weekly parent progress reports.
                </p>
              </div>
              <Link
                href="/pricing"
                className="flex-shrink-0 px-6 py-3 bg-[#2D6BE4] hover:bg-[#4A82F0] text-white font-bold text-sm rounded-xl transition-colors whitespace-nowrap"
              >
                View Pricing →
              </Link>
            </div>
          </Reveal>
        )}

      </div>
    </div>
  );
}

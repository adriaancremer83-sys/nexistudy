import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import type { Session } from "next-auth";

type ExtendedUser = NonNullable<Session["user"]>;

function apsLabel(score: number): string {
  if (score >= 36) return "University Ready";
  if (score >= 28) return "On Track";
  if (score >= 20) return "Needs Work";
  return "Getting Started";
}

function apsColor(score: number): string {
  if (score >= 36) return "text-emerald-600 bg-emerald-50 border-emerald-200";
  if (score >= 28) return "text-blue-600 bg-blue-50 border-blue-200";
  if (score >= 20) return "text-amber-600 bg-amber-50 border-amber-200";
  return "text-gray-500 bg-gray-50 border-gray-200";
}

function apsBarColor(score: number): string {
  if (score >= 36) return "bg-emerald-500";
  if (score >= 28) return "bg-[#2D6BE4]";
  if (score >= 20) return "bg-amber-400";
  return "bg-gray-300";
}

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) redirect("/login");

  const user = session.user as ExtendedUser;
  const firstName = user.name?.split(" ")[0] ?? "Learner";
  const apsScore = user.apsScore ?? 0;
  const apsPct = Math.round((apsScore / 42) * 100);

  return (
    <div className="min-h-screen bg-[#F0F4FF]">

      {/* ── WELCOME BANNER ── */}
      <section className="bg-[#1B2A4A] text-white py-12 px-4">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="text-[#7EABFF] text-sm font-medium mb-1">Welcome back 👋</p>
            <h1 className="text-3xl sm:text-4xl font-bold">{user.name}</h1>
            <p className="text-gray-400 text-sm mt-1">
              {user.curriculum} · {user.grade}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span
              className={`px-4 py-2 rounded-full text-sm font-bold border ${
                user.plan === "premium"
                  ? "bg-[#2D6BE4]/20 text-[#7EABFF] border-[#2D6BE4]/40"
                  : "bg-white/10 text-gray-300 border-white/15"
              }`}
            >
              {user.plan === "premium" ? "⭐ Premium" : "Free Plan"}
            </span>
            {user.plan === "free" && (
              <Link
                href="/pricing"
                className="px-4 py-2 text-sm font-bold text-white bg-[#2D6BE4] hover:bg-[#2558C5] rounded-full transition-colors"
              >
                Upgrade
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* ── DASHBOARD CONTENT ── */}
      <div className="max-w-5xl mx-auto px-4 py-10 space-y-6">

        {/* ── APS SUMMARY CARD ── */}
        <div className="bg-white rounded-2xl border border-[#1B2A4A]/10 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-[#1B2A4A]/8 bg-[#1B2A4A]/5 flex items-center gap-2">
            <span className="text-base">🎓</span>
            <h2 className="text-xs font-semibold text-[#1B2A4A] uppercase tracking-widest">APS Score Summary</h2>
          </div>
          <div className="p-6 flex flex-col sm:flex-row items-start sm:items-center gap-6">
            {/* Score display */}
            <div className="flex items-end gap-2 flex-shrink-0">
              <span className="text-6xl font-extrabold text-[#1B2A4A] leading-none">{apsScore}</span>
              <span className="text-gray-400 text-lg mb-1">/ 42</span>
            </div>

            {/* Bar + label */}
            <div className="flex-1 min-w-0 w-full">
              <div className="flex items-center justify-between mb-2">
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${apsColor(apsScore)}`}>
                  {apsLabel(apsScore)}
                </span>
                <span className="text-xs text-gray-400">{apsPct}%</span>
              </div>
              <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${apsBarColor(apsScore)}`}
                  style={{ width: `${apsPct}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] text-gray-400 mt-1.5">
                <span>0</span><span>21</span><span>42</span>
              </div>
            </div>

            {/* CTA */}
            <Link
              href="/studypro"
              className="flex-shrink-0 px-5 py-2.5 bg-[#2D6BE4] hover:bg-[#2558C5] text-white text-sm font-semibold rounded-xl transition-colors shadow-sm shadow-[#2D6BE4]/20"
            >
              Update Marks →
            </Link>
          </div>

          {apsScore === 0 && (
            <div className="mx-6 mb-6 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-sm text-amber-700">
              <span className="font-semibold">Head to Study Pro</span> to enter your subject marks and calculate your APS score.
            </div>
          )}
        </div>

        {/* ── QUICK LINKS ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

          <Link
            href="/nexi-tutor"
            className="group bg-[#1B2A4A] rounded-2xl p-7 flex items-start gap-5 border border-white/8 hover:border-[#2D6BE4]/50 transition-all"
          >
            <div className="w-12 h-12 rounded-xl bg-[#2D6BE4]/20 flex items-center justify-center flex-shrink-0 group-hover:bg-[#2D6BE4]/30 transition-colors">
              <span className="text-2xl">🤖</span>
            </div>
            <div>
              <h3 className="text-white font-bold text-lg mb-1">Nexi Tutor</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Ask questions, get step-by-step explanations, and learn any topic instantly.
              </p>
              <span className="inline-block mt-3 text-sm font-semibold text-[#7EABFF] group-hover:text-white transition-colors">
                Start a session →
              </span>
            </div>
          </Link>

          <Link
            href="/studypro"
            className="group bg-white rounded-2xl p-7 flex items-start gap-5 border border-[#1B2A4A]/10 hover:border-[#2D6BE4]/40 hover:shadow-md transition-all"
          >
            <div className="w-12 h-12 rounded-xl bg-[#2D6BE4]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#2D6BE4]/15 transition-colors">
              <span className="text-2xl">📊</span>
            </div>
            <div>
              <h3 className="text-[#1B2A4A] font-bold text-lg mb-1">Study Pro</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Calculate your APS, track subject progress, and explore university options.
              </p>
              <span className="inline-block mt-3 text-sm font-semibold text-[#2D6BE4] group-hover:text-[#2558C5] transition-colors">
                Open Study Pro →
              </span>
            </div>
          </Link>

        </div>

        {/* ── FREE PLAN NUDGE ── */}
        {user.plan === "free" && (
          <div className="bg-gradient-to-r from-[#1B2A4A] to-[#243660] rounded-2xl p-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 border border-[#2D6BE4]/20">
            <div>
              <p className="text-[#7EABFF] text-xs font-bold uppercase tracking-widest mb-1.5">Unlock More</p>
              <h3 className="text-white font-bold text-lg mb-1">You&apos;re on the Free Plan</h3>
              <p className="text-gray-400 text-sm leading-relaxed max-w-md">
                Upgrade to Premium for unlimited Tutor chats, full APS tools, Subject Mastery, and an ad-free experience.
              </p>
            </div>
            <Link
              href="/pricing"
              className="flex-shrink-0 px-6 py-3 bg-[#2D6BE4] hover:bg-[#2558C5] text-white font-bold text-sm rounded-xl transition-colors shadow-lg shadow-[#2D6BE4]/30 whitespace-nowrap"
            >
              View Pricing →
            </Link>
          </div>
        )}

      </div>
    </div>
  );
}

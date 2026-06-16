import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import type { Session } from "next-auth";
import Reveal from "@/components/Reveal";
import ShareToClassroom from "@/components/ShareToClassroom";
import { IconChartBar, IconUsers, IconLock, IconSparkles } from "@/components/icons";

type ExtendedUser = NonNullable<Session["user"]>;

// Example heatmap rows shown blurred as a Premium-style preview until the
// real class data layer ships.
const HEATMAP_PREVIEW = [
  { topic: "Trigonometry identities", intensity: 82 },
  { topic: "Stoichiometry calculations", intensity: 64 },
  { topic: "Essay structure & planning", intensity: 51 },
  { topic: "Electric circuits", intensity: 38 },
  { topic: "Map skills & GIS", intensity: 22 },
];

const COMING_SOON = [
  "Class codes — learners join your class in one step",
  "Weekly class weak-spots heatmap from real Nexi questions",
  "Topic alignment — point Nexi at this week's lesson plan",
  "CAPS quiz generator with Google Forms export",
];

export default async function TeacherDashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) redirect("/teachers");

  const user = session.user as ExtendedUser;
  if (user.role !== "teacher") redirect("/dashboard");

  return (
    <div className="min-h-screen">

      {/* ── WELCOME ── */}
      <section className="page-hero py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <p className="text-[#FFB454] text-sm font-medium mb-1">Teacher Dashboard</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-white">{user.name}</h1>
          <p className="text-white/40 text-sm mt-1">{user.school}</p>
        </div>
      </section>

      <div className="section-divider" />

      <div className="max-w-5xl mx-auto px-4 py-10 space-y-6">

        {/* ── SHARE WITH YOUR CLASS (works today) ── */}
        <Reveal>
          <div className="rounded-2xl border border-white/[0.08] bg-[#0E1F3D] p-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
            <div>
              <div className="flex items-center gap-2.5 text-[#FFB454] mb-2">
                <IconUsers className="w-4 h-4" />
                <h2 className="text-xs font-semibold text-white uppercase tracking-widest">
                  Share with your class
                </h2>
              </div>
              <p className="text-white/50 text-sm leading-relaxed max-w-md">
                Post NexiStudy to your Google Classroom stream so your learners can
                get step-by-step help tonight — in 11 official languages (full set on Premium).
              </p>
            </div>
            <ShareToClassroom />
          </div>
        </Reveal>

        {/* ── CLASS WEAK-SPOTS HEATMAP (preview) ── */}
        <Reveal delay={100}>
          <div className="rounded-2xl border border-white/[0.08] bg-[#0E1F3D] overflow-hidden">
            <div className="px-6 py-4 border-b border-white/10 bg-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2.5 text-[#FFB454]">
                <IconChartBar className="w-4 h-4" />
                <h2 className="text-xs font-semibold text-white uppercase tracking-widest">
                  Class Weak-Spots Heatmap
                </h2>
              </div>
              <span className="text-[10px] font-semibold uppercase tracking-widest text-white/30">
                Example preview
              </span>
            </div>
            <div className="p-6 flex flex-col md:flex-row gap-8 items-start md:items-center">
              <div className="flex-1 w-full space-y-3 select-none blur-[2px]" aria-hidden>
                {HEATMAP_PREVIEW.map((row) => (
                  <div key={row.topic} className="flex items-center gap-4">
                    <span className="w-48 text-sm text-white/60 truncate">{row.topic}</span>
                    <div className="flex-1 h-2.5 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-[#2D6BE4] to-[#FFB454]"
                        style={{ width: `${row.intensity}%` }}
                      />
                    </div>
                    <span className="text-xs text-white/40 w-10 text-right">{row.intensity}%</span>
                  </div>
                ))}
              </div>
              <div className="md:w-64 flex-shrink-0">
                <div className="flex items-center gap-2 text-white/60 mb-2">
                  <IconLock className="w-4 h-4" />
                  <span className="text-sm font-bold text-white">Launching soon</span>
                </div>
                <p className="text-white/50 text-sm leading-relaxed">
                  Once class codes go live, this fills with what <em>your</em> learners
                  are actually asking Nexi — so Monday&apos;s lesson targets the real gaps.
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* ── WHAT'S COMING ── */}
        <Reveal delay={200}>
          <div className="rounded-2xl border border-white/[0.08] bg-[#0E1F3D] p-7">
            <div className="flex items-center gap-2.5 text-[#FFB454] mb-4">
              <IconSparkles className="w-4 h-4" />
              <h2 className="text-xs font-semibold text-white uppercase tracking-widest">
                Coming to your dashboard
              </h2>
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
              {COMING_SOON.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-white/60 leading-relaxed">
                  <span className="text-[#FFB454] mt-0.5">·</span>
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-white/35 text-xs mt-5 leading-relaxed">
              Teacher accounts are free forever. You&apos;ll get an email as each
              feature goes live.
            </p>
          </div>
        </Reveal>

      </div>
    </div>
  );
}

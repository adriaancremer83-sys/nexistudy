import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import type { Session } from "next-auth";
import Reveal from "@/components/Reveal";
import TeacherClasses from "@/components/TeacherClasses";
import WhatsAppHelp from "@/components/WhatsAppHelp";
import { IconSparkles } from "@/components/icons";

export const dynamic = "force-dynamic";

type ExtendedUser = NonNullable<Session["user"]>;

// How the class-code flow works, shown once above the classes so a teacher
// (and a demo video) immediately understands the journey.
const STEPS = [
  { n: "1", t: "Create a class", d: "Pick the subject and grade — takes a few seconds." },
  { n: "2", t: "Share the join code", d: "Post it to Google Classroom or read it out in class." },
  { n: "3", t: "Watch the heatmap fill", d: "As learners practise, see exactly what the class is stuck on." },
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

        {/* ── HOW IT WORKS ── */}
        <Reveal>
          <div className="rounded-2xl border border-white/[0.08] bg-[#0E1F3D] p-7">
            <div className="flex items-center gap-2.5 text-[#FFB454] mb-5">
              <IconSparkles className="w-4 h-4" />
              <h2 className="text-xs font-semibold text-white uppercase tracking-widest">
                How NexiStudy works for your class
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {STEPS.map((s) => (
                <div key={s.n} className="flex items-start gap-3.5">
                  <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-[#FFB454]/15 border border-[#FFB454]/25 text-[#FFB454] font-extrabold text-sm flex items-center justify-center">
                    {s.n}
                  </span>
                  <div>
                    <h3 className="text-white font-bold text-sm mb-0.5">{s.t}</h3>
                    <p className="text-white/50 text-sm leading-relaxed">{s.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* ── CLASSES + LIVE HEATMAP (the real feature) ── */}
        <Reveal delay={100}>
          <TeacherClasses />
        </Reveal>

        {/* ── WHATSAPP HELP ── */}
        <Reveal delay={200}>
          <WhatsAppHelp />
        </Reveal>

      </div>
    </div>
  );
}

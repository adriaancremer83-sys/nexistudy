import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import type { Session } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getSubscription } from "@/lib/users";
import Nexi from "@/components/Nexi";
import Reveal from "@/components/Reveal";
import ParentLinkShare from "@/components/ParentLinkShare";
import { getOrCreatePayCode, payLinkUrl } from "@/lib/passes";
import { IconCheck } from "@/components/icons";

export const metadata: Metadata = {
  title: "Welcome to NexiStudy",
  robots: { index: false, follow: false },
};

type ExtendedUser = NonNullable<Session["user"]>;

// Shown once, straight after onboarding: a new Free learner sees what they
// already have and, tailored to their grade, why Premium is worth it — then
// either upgrades, sends the pitch to a parent on WhatsApp, or carries on free.
// Every claim here mirrors the feature lists on /pricing — keep them in sync.

const FREE_HAVE = [
  "5 Nexi Tutor chats a day",
  "1 answer marked a day",
  "APS calculator & university matcher",
  "NSC past papers",
];

function premiumReasons(grade: string | undefined): { title: string; reasons: [string, string][] } {
  if (grade === "Grade 12") {
    return {
      title: "Finals are on — this is when Premium pays for itself",
      reasons: [
        ["50 tutor chats a day", "Free stops at 5. Revising a whole paper takes more than that."],
        ["Examiner-style marking, 15 a day", "Snap your answer and see exactly where the marks went — with a model answer."],
        ["Past-paper walkthroughs", "Step-by-step through real NSC papers, so you know what the examiner wants."],
        ["NSFAS, bursaries & career advice", "20 reports a day in Study Pro — sort out next year while you write."],
      ],
    };
  }
  if (grade === "Grade 8" || grade === "Grade 9") {
    return {
      title: "Build the foundation now, pick the right subjects later",
      reasons: [
        ["50 tutor chats a day", "Free stops at 5. Ask as many questions as homework needs."],
        ["Full Subject Choice Advisor", "Choose Grade 10 subjects that keep the right careers open."],
        ["Foundation Gap Finder + termly reports", "Find the gaps from earlier grades before they cost marks."],
        ["Termly parent progress report", "Your parents see the progress without having to nag."],
      ],
    };
  }
  return {
    title: "Grade 10 and 11 marks shape your university options",
    reasons: [
      ["50 tutor chats a day", "Free stops at 5. Work through a full chapter in one go."],
      ["Nexi's Exam Plan", "A day-by-day route to exam day, built around your subjects."],
      ["Weak-spots map + targeted practice", "Practice aimed at the topics you actually struggle with."],
      ["Examiner-style marking, 15 a day", "See where you lose marks — with a model answer."],
    ],
  };
}

// One-tap first questions — the fastest way to the moment Nexi proves itself.
// Data showed most new learners never sent a single message, so the first job
// of this page is a first chat, not a sale.
function starterQuestions(grade: string | undefined): string[] {
  if (grade === "Grade 12") {
    return [
      "Help me make a revision plan for the finals papers I still have to write",
      "How do I answer a 'discuss' question for full marks?",
      "Walk me through solving a quadratic inequality step by step",
    ];
  }
  if (grade === "Grade 8" || grade === "Grade 9") {
    return [
      "Explain the exponent laws step by step, with examples",
      "Help me choose my Grade 10 subjects",
      "Quiz me on photosynthesis",
    ];
  }
  return [
    "Explain Newton's second law with an everyday example",
    "How do I balance a chemical equation? Show me step by step",
    "Help me plan my study time for the November exams",
  ];
}

export default async function WelcomePage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/login");
  const user = session.user as ExtendedUser;
  if (user.role === "teacher") redirect("/teachers/dashboard");

  const { plan } = await getSubscription(user.id);
  if (plan === "premium") redirect("/studypro");

  const { title, reasons } = premiumReasons(user.grade ?? undefined);
  const firstName = (user.name ?? "").split(" ")[0];
  const payCode = await getOrCreatePayCode(user.id);

  return (
    <div className="min-h-screen">
      {/* ── YOU'RE IN ── */}
      <section className="page-hero px-4 pt-14 pb-12">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex justify-center mb-5 animate-float">
            <Nexi pose="celebrate" width={120} height={120} className="h-[120px] w-auto object-contain" />
          </div>
          <p className="text-[#00D4FF] text-sm font-bold uppercase tracking-[0.2em] mb-3">You&apos;re in</p>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight mb-4">
            Welcome{firstName ? `, ${firstName}` : ""}!
          </h1>
          <p className="text-white/60 text-lg leading-relaxed mb-8">
            Your free account is ready. Ask Nexi your first question — tap one below or type your own.
          </p>
          <div className="flex flex-col gap-3 max-w-xl mx-auto">
            {starterQuestions(user.grade ?? undefined).map((q) => (
              <Link
                key={q}
                href={`/nexi-tutor?q=${encodeURIComponent(q)}`}
                className="glass-card rounded-xl px-5 py-3.5 text-left text-white/85 text-sm font-semibold hover:!border-[#00D4FF]/50 transition-colors"
              >
                &ldquo;{q}&rdquo; <span className="text-[#00D4FF]">→</span>
              </Link>
            ))}
            <Link
              href="/nexi-tutor"
              className="mt-2 px-8 py-4 rounded-2xl bg-[#2D6BE4] hover:bg-[#4A82F0] text-white font-extrabold transition-colors"
            >
              Ask Nexi my own question
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 pb-20 space-y-8">
        <p className="text-center text-white/40 text-xs uppercase tracking-widest font-bold pt-4">
          When you want more
        </p>

        {/* ── FREE vs PREMIUM ── */}
        <div className="grid gap-5 md:grid-cols-5">
          <Reveal className="md:col-span-2">
            <div className="glass-card rounded-2xl p-7 h-full">
              <p className="text-xs font-bold uppercase tracking-widest text-white/40 mb-4">Free — yours now</p>
              <ul className="space-y-3">
                {FREE_HAVE.map((f) => (
                  <li key={f} className="flex gap-3 text-sm text-white/70">
                    <IconCheck className="w-5 h-5 shrink-0 text-white/40" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={80} className="md:col-span-3">
            <div className="glass-strong rounded-2xl p-7 h-full !border-[#00D4FF]/35">
              <p className="text-xs font-bold uppercase tracking-widest text-[#00D4FF] mb-2">Premium · from R99 once-off</p>
              <h2 className="text-white font-bold text-xl mb-5 leading-snug">{title}</h2>
              <ul className="space-y-4 mb-6">
                {reasons.map(([head, why]) => (
                  <li key={head} className="flex gap-3">
                    <IconCheck className="w-5 h-5 shrink-0 text-[#00D4FF] mt-0.5" />
                    <div>
                      <p className="text-white font-semibold text-sm">{head}</p>
                      <p className="text-white/50 text-sm leading-relaxed">{why}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <Link
                href="/pricing#passes"
                className="inline-block px-6 py-3 rounded-xl bg-[#FFB454] text-[#0A1628] font-extrabold text-sm hover:opacity-90 transition-opacity"
              >
                See Premium passes — from R99, no card needed
              </Link>
            </div>
          </Reveal>
        </div>

        {payCode && (
          <Reveal delay={160}>
            <div className="rounded-2xl border border-[#25D366]/30 bg-[#25D366]/[0.05] p-6 sm:p-8">
              <p className="text-white font-bold text-lg mb-1">Want a parent to pay?</p>
              <p className="text-white/55 text-sm leading-relaxed mb-5">
                Send them your private link. They pay with their own email — no password, no
                account — and Premium switches on for you.
              </p>
              <ParentLinkShare url={payLinkUrl(payCode)} />
            </div>
          </Reveal>
        )}

        <p className="text-center">
          <Link href="/studypro" className="text-white/50 hover:text-white text-sm font-semibold transition-colors">
            Explore Study Pro →
          </Link>
        </p>
      </div>
    </div>
  );
}

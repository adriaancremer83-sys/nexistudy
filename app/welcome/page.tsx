import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import type { Session } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getSubscription } from "@/lib/users";
import Nexi from "@/components/Nexi";
import Reveal from "@/components/Reveal";
import SubscribeButton from "@/components/SubscribeButton";
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
        ["Unlimited Nexi Tutor chats", "Free stops at 5 a day. Revising a whole paper takes more than that."],
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
        ["Unlimited Nexi Tutor chats", "Free stops at 5 a day. Ask as many questions as homework needs."],
        ["Full Subject Choice Advisor", "Choose Grade 10 subjects that keep the right careers open."],
        ["Foundation Gap Finder + termly reports", "Find the gaps from earlier grades before they cost marks."],
        ["Weekly parent progress report", "Your parents see the progress without having to nag."],
      ],
    };
  }
  return {
    title: "Grade 10 and 11 marks shape your university options",
    reasons: [
      ["Unlimited Nexi Tutor chats", "Free stops at 5 a day. Work through a full chapter in one go."],
      ["Nexi's Exam Plan", "A day-by-day route to exam day, built around your subjects."],
      ["Weak-spots map + targeted practice", "Practice aimed at the topics you actually struggle with."],
      ["Examiner-style marking, 15 a day", "See where you lose marks — with a model answer."],
    ],
  };
}

function parentWhatsAppLink(): string {
  const text =
    "Hi! I've joined NexiStudy to help me study. Premium is R199 a month (cancel anytime) — " +
    "it gives me unlimited help from Nexi, examiner-style marking of my answers, and you get " +
    "a weekly progress report. Can we get it? https://www.nexistudy.co.za/pricing";
  return `https://wa.me/?text=${encodeURIComponent(text)}`;
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
          <p className="text-white/60 text-lg leading-relaxed">
            Your free account is ready. Here&apos;s what you already have — and what Premium adds.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 pb-20 space-y-8">
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
              <p className="text-xs font-bold uppercase tracking-widest text-[#00D4FF] mb-2">Premium · R199/month</p>
              <h2 className="text-white font-bold text-xl mb-5 leading-snug">{title}</h2>
              <ul className="space-y-4">
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
            </div>
          </Reveal>
        </div>

        {/* ── VALUE + ACTIONS ── */}
        <Reveal delay={160}>
          <div className="rounded-2xl border border-[#FFB454]/25 bg-[#FFB454]/[0.05] p-7 text-center">
            <p className="text-white font-bold text-lg mb-1">Less than one hour with a private tutor</p>
            <p className="text-white/55 text-sm max-w-xl mx-auto mb-6 leading-relaxed">
              A tutor costs R250–R400 an hour for one subject. Premium is R199 a month for every
              subject, any time of day — and you can cancel anytime.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-stretch sm:items-start">
              <SubscribeButton
                callbackUrl="/welcome"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#2D6BE4] hover:bg-[#4A82F0] text-white font-extrabold transition-colors cursor-pointer disabled:opacity-70 disabled:cursor-wait"
              >
                Go Premium — R199/month
              </SubscribeButton>
              <a
                href={parentWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3.5 rounded-xl border border-[#25D366]/40 text-[#25D366] font-bold hover:bg-[#25D366]/10 transition-colors"
              >
                Ask a parent on WhatsApp
              </a>
            </div>
          </div>
        </Reveal>

        <p className="text-center">
          <Link href="/studypro" className="text-white/50 hover:text-white text-sm font-semibold transition-colors">
            Continue with the free plan →
          </Link>
        </p>
      </div>
    </div>
  );
}

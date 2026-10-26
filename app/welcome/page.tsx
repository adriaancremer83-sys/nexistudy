import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import type { Session } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getSubscription } from "@/lib/users";
import Nexi from "@/components/Nexi";
import Reveal from "@/components/Reveal";
import PassPicker from "@/components/PassPicker";
import ParentLinkShare from "@/components/ParentLinkShare";
import { getOrCreatePayCode, passChoices, payLinkUrl } from "@/lib/passes";
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
              <p className="text-xs font-bold uppercase tracking-widest text-[#00D4FF] mb-2">Premium · from R99 once-off</p>
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
          <div className="rounded-2xl border border-[#FFB454]/25 bg-[#FFB454]/[0.05] p-6 sm:p-8">
            <p className="text-white font-bold text-lg mb-1 text-center">Less than one hour with a private tutor</p>
            <p className="text-white/55 text-sm max-w-xl mx-auto mb-7 leading-relaxed text-center">
              A tutor costs R250–R400 an hour for one subject. A Premium pass covers every subject,
              any time of day. Pay once — no subscription, no card needed.
            </p>
            <PassPicker passes={passChoices()} signedIn askEmail={false} cta="Get Premium —" />
          </div>
        </Reveal>

        {payCode && (
          <Reveal delay={200}>
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
            Continue with the free plan →
          </Link>
        </p>
      </div>
    </div>
  );
}

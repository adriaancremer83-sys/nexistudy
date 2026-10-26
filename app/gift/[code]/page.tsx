import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Nexi from "@/components/Nexi";
import PassPicker from "@/components/PassPicker";
import { IconCheck } from "@/components/icons";
import { findLearnerByPayCode, passChoices } from "@/lib/passes";

export const metadata: Metadata = {
  title: "Give Premium — NexiStudy",
  robots: { index: false, follow: false },
};

// The parent-facing page behind a learner's private pay link. No login: the
// parent picks a pass, gives a receipt email and pays once-off via PayFast.

const WHAT_THEY_GET = [
  ["50 Nexi Tutor chats a day", "Free stops at 5. Step-by-step help in any subject, any time — in all 11 official languages."],
  ["Examiner-style marking", "Photo of an answer → marked like the NSC examiner would, with a model answer. 15 a day."],
  ["Exam Plan & weak-spot practice", "A day-by-day route to exam day, and practice aimed at what they get wrong."],
] as const;

// Grade 8–9 get the termly parent report; seniors get funding & career help.
function fourthBenefit(grade: string | null): readonly [string, string] {
  return grade === "Grade 8" || grade === "Grade 9"
    ? ["A termly progress report for you", "A plain-language report on their real practice this term — see the dip before the report card does."]
    : ["Funding & career guidance", "NSFAS, bursaries and a direction for their marks — sorted while they study."];
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-ZA", { day: "numeric", month: "long", year: "numeric" });
}

export default async function GiftPage({
  params,
  searchParams,
}: {
  params: Promise<{ code: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { code } = await params;
  const query = await searchParams;
  const learner = await findLearnerByPayCode(code);
  if (!learner) notFound();

  const paid = query.paid === "1";
  const cancelled = query.cancelled === "1";
  const activeUntil =
    learner.plan === "premium" && learner.premiumUntil && new Date(learner.premiumUntil) > new Date()
      ? learner.premiumUntil
      : null;

  return (
    <div className="min-h-screen">
      <section className="page-hero px-4 pt-14 pb-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex justify-center mb-5 animate-float">
            <Nexi pose={paid ? "celebrate" : "wave"} width={110} height={110} className="h-[110px] w-auto object-contain" />
          </div>

          {paid ? (
            <>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight mb-4">
                Thank you! 🎉
              </h1>
              <p className="text-white/65 text-lg leading-relaxed max-w-xl mx-auto">
                Your payment went through. {learner.firstName}&apos;s Premium switches on within a
                minute or two, and a receipt is on its way to your email.
              </p>
            </>
          ) : (
            <>
              <p className="text-[#00D4FF] text-sm font-bold uppercase tracking-[0.2em] mb-3">
                NexiStudy Premium
              </p>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight mb-4">
                {learner.firstName} asked you for Premium
              </h1>
              <p className="text-white/60 text-lg leading-relaxed max-w-xl mx-auto">
                NexiStudy is a CAPS-aligned AI study buddy for Grade 8 to matric. Premium turns
                it into a tutor that&apos;s there every evening — for less than one hour with a
                private tutor.
              </p>
            </>
          )}

          {activeUntil && !paid && (
            <p className="inline-block mt-6 px-4 py-2 rounded-xl bg-emerald-400/10 border border-emerald-400/25 text-emerald-300 text-sm">
              {learner.firstName} already has Premium until {formatDate(activeUntil)}. Buying another
              pass adds its days on top.
            </p>
          )}
          {cancelled && (
            <p className="inline-block mt-6 px-4 py-2 rounded-xl bg-amber-400/10 border border-amber-400/25 text-amber-300 text-sm">
              Payment cancelled — no money moved. Ready when you are.
            </p>
          )}
        </div>
      </section>

      {!paid && (
        <div className="max-w-3xl mx-auto px-4 pb-20 space-y-10">
          <section className="grid gap-4 sm:grid-cols-2">
            {[...WHAT_THEY_GET, fourthBenefit(learner.grade)].map(([head, body]) => (
              <div key={head} className="glass-card rounded-2xl p-6 flex gap-3">
                <IconCheck className="w-5 h-5 shrink-0 text-[#00D4FF] mt-0.5" />
                <div>
                  <p className="text-white font-bold mb-1">{head}</p>
                  <p className="text-white/55 text-sm leading-relaxed">{body}</p>
                </div>
              </div>
            ))}
          </section>

          <section className="glass-strong rounded-2xl p-6 sm:p-8 !border-[#00D4FF]/30">
            <h2 className="text-white font-extrabold text-2xl mb-1 text-center">
              Choose {learner.firstName}&apos;s pass
            </h2>
            <p className="text-white/50 text-sm text-center mb-6">
              Pay once. It doesn&apos;t renew, so there&apos;s nothing to cancel later.
            </p>
            <PassPicker passes={passChoices()} code={code} signedIn={false} askEmail cta="Pay" />
          </section>

          <section className="text-center text-sm text-white/45 space-y-1">
            <p>Payments are processed securely by PayFast. NexiStudy never sees your card or bank details.</p>
            <p>
              Questions? Email{" "}
              <a href="mailto:support@nexistudy.co.za" className="text-[#00D4FF] hover:underline">
                support@nexistudy.co.za
              </a>
            </p>
          </section>
        </div>
      )}
    </div>
  );
}

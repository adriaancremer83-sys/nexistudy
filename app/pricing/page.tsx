import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import Reveal from "@/components/Reveal";
import PassPicker from "@/components/PassPicker";
import ParentLinkShare from "@/components/ParentLinkShare";
import { pageMeta } from "@/lib/seo";
import { getSubscription } from "@/lib/users";
import { getOrCreatePayCode, passChoices, payLinkUrl } from "@/lib/passes";
import { IconCheck, IconLock } from "@/components/icons";

export const metadata = pageMeta({
  title: "Pricing — Free Plan & Premium from R99",
  description:
    "Start free: AI tutor, APS calculator, NSC past papers, plus a daily taste of AI answer-marking and career guidance. Go Premium from R99 once-off — no subscription, pay by instant EFT or card — for 50 tutor chats a day, full examiner marking, career & NSFAS guidance, and all 11 languages.",
  path: "/pricing",
});

// ── Feature lists ─────────────────────────────────────────────────────────────

const FREE_INCLUDED = [
  "5 Nexi Tutor chats per day",
  "Mark My Answer — 1 answer marked per day",
  "APS Calculator & university matcher",
  "Funding & career advice — 1 report per day",
  "Tutor in English, Afrikaans & isiZulu",
  "Study streaks & daily motivation",
  "1 personal goal",
];

const FREE_LOCKED = [
  "Nexi's Exam Plan",
  "Weak-spots map & targeted practice",
  "Full examiner marking + model answers",
  "Past-paper walkthroughs",
];

const PREMIUM_INCLUDED = [
  "50 Nexi Tutor chats a day — 10× Free, on Nexi's smartest model",
  "Tutor in all 11 official SA languages",
  "Mark My Answer — 15 a day, full mark-by-mark breakdown + model answer",
  "Funding & career advice in Study Pro — 20 a day: NSFAS, bursaries & a personalised plan",
  "Nexi's Exam Plan — a day-by-day route to exam day",
  "Weak-spots map + practice that targets them",
  "Past-paper walkthroughs (CAPS / NSC)",
  "Grade 8–9: full Subject Choice Advisor, Foundation Gap Finder + termly parent reports",
  "Ad-free + priority support",
];

// ── FAQ data ──────────────────────────────────────────────────────────────────

const FAQS = [
  {
    q: "Is this a subscription?",
    a: "No. Premium is a once-off pass — 30 days, 3 months or 12 months. It never renews by itself and there's nothing to cancel. When it ends you're simply back on the Free plan, and you can buy another pass any time (it adds on to any days you still have).",
  },
  {
    q: "How can I pay? I don't have a credit card.",
    a: "You don't need one. Passes are paid through PayFast, South Africa's trusted payment gateway — instant EFT from any major bank works, as does a debit or credit card. NexiStudy never sees your banking details.",
  },
  {
    q: "Can a parent pay without logging in as their child?",
    a: "Yes. Every learner has a private payment link. Send it to a parent on WhatsApp — they choose a pass, pay with their own email, and Premium switches on for the learner automatically. They get the receipt.",
  },
  {
    q: "Why is there a daily chat limit?",
    a: "Every answer Nexi gives uses advanced AI that costs us real money. Free gives you a genuine daily study session at no cost; Premium gives you 50 chats a day on Nexi's smartest model — enough for a full evening of revision. No tricks.",
  },
  {
    q: "Which languages does Nexi speak?",
    a: "All 11 official South African languages — isiZulu, isiXhosa, Afrikaans, English, Sepedi, Setswana, Sesotho, Xitsonga, siSwati, Tshivenda, and isiNdebele. English, Afrikaans and isiZulu are available free; Premium unlocks reliable tutoring in the full set of 11.",
  },
  {
    q: "What are Mark My Answer and the funding & career advice?",
    a: "Mark My Answer marks a photo of your handwritten answer like an NSC examiner — method marks and where you lost marks. In Study Pro, Nexi also gives funding & career advice (NSFAS, bursaries and a direction for your marks). Both are free once a day; Premium unlocks 15 markings and 20 advice reports a day, in full detail. The APS calculator and university matcher are always free.",
  },
  {
    q: "Is my child's data safe?",
    a: "Absolutely. NexiStudy never sells user data. All personal information is securely stored and encrypted, and we are fully POPIA compliant. Your child's privacy is our priority.",
  },
  {
    q: "Which grades does NexiStudy support?",
    a: "Grade 8 to 12. CAPS is fully live; IEB & Cambridge are coming. Nexi covers Senior Phase (Grade 8–9) and the full FET curriculum — including a Subject Choice Advisor that helps Grade 9s pick the right Grade 10 subjects.",
  },
];

// ── Component ─────────────────────────────────────────────────────────────────

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-ZA", { day: "numeric", month: "long", year: "numeric" });
}

export default async function PricingPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const query = await searchParams;
  const cancelled = query.cancelled === "1";

  // Signed-in learners pay for themselves and get their parent pay link;
  // everyone else sees the passes with a sign-up button.
  const session = await getServerSession(authOptions);
  const signedIn = Boolean(session?.user?.id) && session?.user?.role !== "teacher";
  let isPremium = false;
  let premiumUntil: string | null = null;
  let payUrl: string | null = null;
  if (signedIn && session?.user?.id) {
    const sub = await getSubscription(session.user.id);
    isPremium = sub.plan === "premium";
    premiumUntil = sub.premiumUntil ? formatDate(sub.premiumUntil) : null;
    const code = await getOrCreatePayCode(session.user.id);
    payUrl = code ? payLinkUrl(code) : null;
  }

  return (
    <div className="min-h-screen">

      {/* ── HERO ── */}
      <section className="page-hero py-14 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <span className="inline-block mb-3 px-4 py-1 rounded-full glass text-[#00D4FF] text-sm font-medium tracking-wide uppercase">
            Pricing
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold mb-3 leading-tight text-white">
            Premium from <span className="text-gradient">R99</span>, once-off
          </h1>
          <p className="text-white/60 text-lg leading-relaxed">
            Start free. When you want more, buy a pass — no subscription, no card needed,
            nothing to cancel.
          </p>
        </div>
      </section>

      <div className="section-divider" />

      {/* ── PASSES ── */}
      <section id="passes" className="py-12 px-4 scroll-mt-20">
        <div className="max-w-5xl mx-auto space-y-8">

          {cancelled && (
            <p className="text-center px-4 py-2 rounded-xl bg-amber-400/10 border border-amber-400/25 text-amber-300 text-sm">
              Payment cancelled — no money moved. Ready when you are.
            </p>
          )}

          {isPremium && (
            <p className="text-center px-4 py-3 rounded-xl bg-emerald-400/10 border border-emerald-400/25 text-emerald-300 text-sm">
              You&apos;re on Premium{premiumUntil ? ` until ${premiumUntil}` : ""}. Buying another pass adds its days on top.
            </p>
          )}

          <Reveal>
            <div className="glass-strong rounded-2xl ring-2 ring-[#00D4FF]/50 shadow-[0_0_40px_rgba(0,212,255,0.12)] p-6 sm:p-8">
              <p className="text-xs font-bold uppercase tracking-widest text-[#00D4FF] mb-2 text-center">Premium pass</p>
              <h2 className="text-white font-extrabold text-2xl sm:text-3xl text-center mb-2">
                Pay once. No subscription. No card needed.
              </h2>
              <p className="text-white/50 text-sm text-center mb-7">
                Instant EFT or card through PayFast. Your pass never renews by itself.
              </p>
              <PassPicker passes={passChoices()} signedIn={signedIn} askEmail={false} cta="Get Premium —" />
            </div>
          </Reveal>

          {/* ── PARENT LINK ── */}
          {payUrl ? (
            <Reveal>
              <div className="rounded-2xl border border-[#25D366]/30 bg-[#25D366]/[0.05] p-6 sm:p-8">
                <p className="text-xs font-bold uppercase tracking-widest text-[#25D366] mb-2">Parent paying?</p>
                <h3 className="text-white font-extrabold text-xl mb-2">Send them your private payment link</h3>
                <p className="text-white/55 text-sm leading-relaxed mb-5 max-w-2xl">
                  They don&apos;t need your password or an account. They pick the pass, pay with their
                  own email, and Premium switches on for you automatically.
                </p>
                <ParentLinkShare url={payUrl} />
              </div>
            </Reveal>
          ) : (
            !signedIn && (
              <p className="text-center text-sm text-white/50">
                Paying for your child? Ask them to tap <span className="text-white font-semibold">&ldquo;Send to a parent&rdquo;</span> on
                this page after they sign in — you&apos;ll get a private link to pay without logging in.
              </p>
            )
          )}

          {/* ── FREE vs PREMIUM ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            <Reveal className="h-full">
              <div className="glass-card p-8 flex flex-col h-full">
                <p className="text-xs font-bold uppercase tracking-widest text-white/40 mb-3">Free Plan</p>
                <div className="flex items-end gap-1 mb-6">
                  <span className="text-4xl font-extrabold text-white">R0</span>
                  <span className="text-sm text-white/40 mb-1">forever</span>
                </div>
                <ul className="space-y-3 mb-6 flex-1">
                  {FREE_INCLUDED.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-white">
                      <IconCheck className="w-4 h-4 mt-0.5 text-[#00D4FF] flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                  {FREE_LOCKED.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm">
                      <IconLock className="w-4 h-4 mt-0.5 flex-shrink-0 text-white/25" />
                      <span className="text-white/25 select-none blur-[2px]">{f}</span>
                    </li>
                  ))}
                </ul>
                {!signedIn && (
                  <Link
                    href="/signup"
                    className="text-center py-3 rounded-xl font-semibold text-sm border-2 border-[#2D6BE4] text-[#7EABFF] hover:bg-[#2D6BE4] hover:text-white transition-colors"
                  >
                    Start Free — No Card Needed
                  </Link>
                )}
              </div>
            </Reveal>

            <Reveal delay={120} className="h-full">
              <div className="glass-strong rounded-2xl p-8 flex flex-col h-full !border-[#00D4FF]/30">
                <p className="text-xs font-bold uppercase tracking-widest text-[#00D4FF] mb-3">Premium</p>
                <div className="flex items-end gap-1 mb-6">
                  <span className="text-4xl font-extrabold text-white">from R58</span>
                  <span className="text-sm text-white/40 mb-1">/month</span>
                </div>
                <ul className="space-y-3 flex-1">
                  {PREMIUM_INCLUDED.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-white">
                      <IconCheck className="w-4 h-4 mt-0.5 text-[#00D4FF] flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

        </div>
      </section>

      <section className="pb-12 px-4">
        {/* ── SCHOOLS & CLASS LICENCES ── */}
        <Reveal>
          <div className="max-w-5xl mx-auto mt-8 rounded-2xl border border-[#FFB454]/30 bg-[#FFB454]/[0.05] p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-[#FFB454]/15 text-[#FFB454] text-[10px] font-bold uppercase tracking-wider px-4 py-1.5 rounded-bl-xl">
              Pilot Programme
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#FFB454] mb-2">
                Schools &amp; Classes
              </p>
              <h3 className="text-white font-extrabold text-2xl mb-2">
                One licence. Your whole class.
              </h3>
              <p className="text-white/55 text-sm leading-relaxed max-w-xl">
                Full Premium for up to 35 learners from{" "}
                <span className="text-white font-bold">R2,999/month</span> — that&apos;s
                about <span className="text-[#FFB454] font-bold">R86 per learner</span>{" "}
                instead of R99 each. Includes the teacher dashboard with the class
                weak-spots heatmap. Billed to the school, termly or annually.
              </p>
            </div>
            <div className="flex flex-col items-stretch gap-2.5 flex-shrink-0">
              <Link
                href="/contact"
                className="text-center px-7 py-3.5 bg-[#FFB454] hover:bg-[#FFC678] text-[#050D1A] font-extrabold text-sm rounded-xl transition-colors"
              >
                Talk to us about a pilot
              </Link>
              <Link
                href="/teachers"
                className="text-center text-xs text-white/50 hover:text-white transition-colors"
              >
                Teachers start free →
              </Link>
            </div>
          </div>
        </Reveal>

        <p className="text-center text-xs text-white/30 mt-8">
          All prices in South African Rand (ZAR) · Once-off payments · Nothing renews automatically
        </p>
      </section>

      <div className="section-divider" />

      {/* ── FAQ ── */}
      <section className="py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <Reveal className="text-center mb-10">
            <h2 className="text-3xl font-bold text-white mb-2">
              Frequently Asked <span className="text-gradient">Questions</span>
            </h2>
            <p className="text-white/50 text-sm">Everything you need to know before getting started.</p>
          </Reveal>

          <div className="space-y-4">
            {FAQS.map((faq, i) => (
              <Reveal key={faq.q} delay={i * 100}>
                <details className="group glass rounded-2xl overflow-hidden">
                  <summary className="flex items-center justify-between px-6 py-5 cursor-pointer list-none select-none">
                    <span className="font-semibold text-white text-sm pr-4">{faq.q}</span>
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#00D4FF]/15 text-[#00D4FF] flex items-center justify-center text-sm font-bold transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <div className="px-6 pb-5">
                    <p className="text-sm text-white/50 leading-relaxed">{faq.a}</p>
                  </div>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ── FINAL CTA ── */}
      <section className="py-14 px-4 text-center relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-b from-transparent to-[#2D6BE4]/15 pointer-events-none"
        />
        <Reveal className="relative max-w-xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Ready to unlock your <span className="text-gradient">full potential?</span>
          </h2>
          <p className="text-white/50 mb-6 text-sm leading-relaxed">
            Start free — no card needed. Get Premium from R99 when you&apos;re ready.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/signup"
              className="animate-pulse-glow px-8 py-3.5 bg-[#2D6BE4] hover:bg-[#4A82F0] text-white font-bold rounded-xl transition-colors text-sm"
            >
              Start Free Today
            </Link>
            <Link
              href="/nexi-tutor"
              className="glass px-8 py-3.5 hover:border-[#00D4FF]/50 hover:bg-white/10 text-white font-semibold rounded-xl transition-all text-sm"
            >
              Try Nexi Tutor
            </Link>
          </div>
        </Reveal>
      </section>

    </div>
  );
}

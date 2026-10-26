"use client";

import { useState } from "react";
import Nexi from "@/components/Nexi";
import Link from "next/link";
import PackWaitlistForm from "@/components/PackWaitlistForm";
import Reveal from "@/components/Reveal";

type Lang = "en" | "af";

// All AF copy below is a first draft — Adriaan does a native-speaker pass
// before launch (same rule as the pack documents themselves).
const COPY = {
  en: {
    seasonBadge: "Prelim season 2026 is over · back for 2027",
    kicker: "Matric Prelim Survival Pack",
    h1a: "Seven weeks.",
    h1b: "Ten subjects. One plan.",
    sub: "The printable pack that turns the countdown to prelims into a week-by-week plan — for the learner AND the parent, in English and Afrikaans. The 2026 edition is closed; join the waitlist and we'll email you when the 2027 pack opens.",
    heroCta: "Join the 2027 waitlist",
    heroNote: "One email when it opens. No spam.",
    insideTitle: "What's inside",
    inside: [
      {
        title: "The 7-Week Countdown Planner",
        tag: "The hero document",
        body: "From the start of Term 3 up to prelims, week by week. This is the one that goes on the fridge.",
      },
      {
        title: "10 Subject Strategy Sheets",
        tag: "One per major subject",
        body: "Where the marks live, the easy marks learners throw away, and the mistakes markers punish — for Maths, Maths Lit, Physical Sciences, Life Sciences, Accounting, Business Studies, Geography, History, English and Afrikaans.",
      },
      {
        title: "APS Target Worksheet",
        tag: "For the university goal",
        body: "Turns \"I must do better\" into actual target marks per subject.",
      },
      {
        title: "The Parents' Guide",
        tag: "No jargon",
        body: "How to help without hovering — what to ask, what to cook, when to back off.",
      },
      {
        title: "Sunday WhatsApp Scripts",
        tag: "Bonus",
        body: "Copy-paste weekly check-in messages that don't start a fight.",
      },
    ],
    anchorTitle: "Less than one hour of tutoring",
    anchorBody:
      "One hour with a private tutor costs R250–R400 and covers one subject, once. The Survival Pack costs R199 — once — and structures all ten subjects for the full seven weeks.",
    anchorPrice: "R199",
    anchorPriceNote: "2026 price · once-off · every document · both languages",
    parentsTitle: "Built for parents too",
    parentsBody:
      "You don't need to remember matric maths to be the reason your child stays on track. The pack tells you what's happening each week, what to ask on Sunday evenings, and what actually helps in the last 48 hours before each paper.",
    howTitle: "How it works",
    how: [
      "Join the waitlist with your email.",
      "We email you once when the 2027 pack opens.",
      "Start your seven weeks at the beginning of Term 3.",
    ],
    premiumNote: "Already a Nexi Tutor Premium member? The pack is included with your subscription — find it on your dashboard.",
    faqTitle: "Quick questions",
    faq: [
      {
        q: "Will it match my school's prelim?",
        a: "Prelims are set by your province or school, but they follow the national exam format — the strategy sheets apply to any prelim. The 2027 planner will be dated once the prelim dates are out.",
      },
      {
        q: "Grade 10 or 11?",
        a: "This pack is for matrics. Grade 10 and 11 versions are planned — join the waitlist to hear first.",
      },
      {
        q: "Writing finals right now?",
        a: "The pack is built for prelims, but Nexi Tutor and the past papers are open now — work through the papers you still have to write.",
      },
      {
        q: "Do I need a NexiStudy account?",
        a: "No. Pay with any email address and the pack is delivered there. An account only adds the online extras.",
      },
    ],
    buyTitle: "Join the 2027 waitlist",
    buySub: "Be first to know when the 2027 Survival Pack opens.",
    emailLabel: "Your email",
    emailPlaceholder: "you@example.com",
    cta: "Join the waitlist",
    saving: "Saving…",
    done: "You're on the list — we'll email you when the 2027 pack opens.",
    finalsLink: "Writing finals now? Revise with Nexi Tutor →",
    cancelled: "Payment cancelled — no money moved. Ready when you are.",
    signoff: "Finals are on. Every mark is a decision.",
  },
  af: {
    seasonBadge: "Rekordseisoen 2026 is verby · terug in 2027",
    kicker: "Matriek Rekord Oorlewingspak",
    h1a: "Sewe weke.",
    h1b: "Tien vakke. Een plan.",
    sub: "Die drukbare pak wat die aftelling na die rekordeksamen omskep in 'n week-vir-week plan — vir die leerder ÉN die ouer, in Afrikaans en Engels. Die 2026-uitgawe is gesluit; sluit by die waglys aan en ons e-pos jou wanneer die 2027-pak oopmaak.",
    heroCta: "Sluit by die 2027-waglys aan",
    heroNote: "Een e-pos wanneer dit oopmaak. Geen gemors nie.",
    insideTitle: "Wat's binne-in",
    inside: [
      {
        title: "Die 7-Week Aftelbeplanner",
        tag: "Die hoofdokument",
        body: "Van die begin van die derde kwartaal tot by die rekordeksamen, week vir week. Hierdie een gaan teen die yskas.",
      },
      {
        title: "10 Vakstrategie-blaaie",
        tag: "Een per hoofvak",
        body: "Waar die punte lê, die maklike punte wat leerders weggooi, en die foute wat nasieners straf — vir Wiskunde, Wiskundige Geletterdheid, Fisiese Wetenskappe, Lewenswetenskappe, Rekeningkunde, Besigheidstudies, Geografie, Geskiedenis, Engels en Afrikaans.",
      },
      {
        title: "APS-teiken Werkblad",
        tag: "Vir die universiteitsdoel",
        body: "Verander \"ek moet beter doen\" in werklike teikenpunte per vak.",
      },
      {
        title: "Die Ouergids",
        tag: "Geen vaktaal nie",
        body: "Hoe om te help sonder om oor die skouer te hang — wat om te vra, wanneer om terug te staan.",
      },
      {
        title: "Sondag WhatsApp-boodskappe",
        tag: "Bonus",
        body: "Weeklikse boodskappe om te kopieer en plak — sonder om 'n argument te begin.",
      },
    ],
    anchorTitle: "Minder as een uur se tutorklas",
    anchorBody:
      "Een uur by 'n privaat tutor kos R250–R400 en dek een vak, een keer. Die Oorlewingspak kos R199 — een keer — en struktureer al tien vakke vir die volle sewe weke.",
    anchorPrice: "R199",
    anchorPriceNote: "2026-prys · eenmalig · elke dokument · albei tale",
    parentsTitle: "Ook vir ouers gebou",
    parentsBody:
      "Jy hoef nie matriekwiskunde te onthou om die rede te wees dat jou kind op koers bly nie. Die pak sê vir jou wat elke week gebeur, wat om Sondagaande te vra, en wat werklik help in die laaste 48 uur voor elke vraestel.",
    howTitle: "Hoe dit werk",
    how: [
      "Sluit met jou e-posadres by die waglys aan.",
      "Ons e-pos jou een keer wanneer die 2027-pak oopmaak.",
      "Begin jou sewe weke aan die begin van die derde kwartaal.",
    ],
    premiumNote: "Reeds 'n Nexi Tutor Premium-lid? Die pak is by jou subskripsie ingesluit — kry dit op jou paneelbord.",
    faqTitle: "Vinnige vrae",
    faq: [
      {
        q: "Sal dit by my skool se rekord pas?",
        a: "Rekordeksamens word deur jou provinsie of skool opgestel, maar hulle volg die nasionale eksamenformaat — die strategie-blaaie geld vir enige rekord. Die 2027-beplanner word gedateer sodra die rekorddatums bekend is.",
      },
      {
        q: "Graad 10 of 11?",
        a: "Hierdie pak is vir matrieks. Graad 10- en 11-weergawes word beplan — sluit by die waglys aan om eerste te hoor.",
      },
      {
        q: "Skryf jy nou eindeksamen?",
        a: "Die pak is vir die rekordeksamen gebou, maar Nexi Tutor en die vorige vraestelle is nou oop — werk deur die vraestelle wat jy nog moet skryf.",
      },
      {
        q: "Het ek 'n NexiStudy-rekening nodig?",
        a: "Nee. Betaal met enige e-posadres en die pak word daar afgelewer. 'n Rekening voeg net die aanlyn ekstras by.",
      },
    ],
    buyTitle: "Sluit by die 2027-waglys aan",
    buySub: "Wees die eerste om te hoor wanneer die 2027-Oorlewingspak oopmaak.",
    emailLabel: "Jou e-pos",
    emailPlaceholder: "jy@voorbeeld.com",
    cta: "Sluit aan",
    saving: "Stoor…",
    done: "Jy is op die lys — ons e-pos jou wanneer die 2027-pak oopmaak.",
    finalsLink: "Skryf jy nou eindeksamen? Hersien met Nexi Tutor →",
    cancelled: "Betaling gekanselleer — geen geld het beweeg nie. Reg wanneer jy is.",
    signoff: "Eindeksamens is hier. Elke punt is 'n besluit.",
  },
} as const;

export default function PackLanding({ cancelled }: { cancelled: boolean }) {
  const [lang, setLang] = useState<Lang>("en");
  const t = COPY[lang];

  return (
    <div className="min-h-screen">
      {/* ── HERO ── */}
      <section className="page-hero relative overflow-hidden px-4 pt-16 pb-20 sm:pt-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Language toggle */}
          <div className="flex justify-center gap-2 mb-8">
            {(["en", "af"] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold tracking-wide transition-colors cursor-pointer ${
                  lang === l ? "bg-[#00D4FF] text-[#0a0a1a]" : "glass text-white/60 hover:text-white"
                }`}
              >
                {l === "en" ? "English" : "Afrikaans"}
              </button>
            ))}
          </div>

          {cancelled && (
            <p className="inline-block mb-6 px-4 py-2 rounded-xl bg-amber-400/10 border border-amber-400/25 text-amber-300 text-sm">
              {t.cancelled}
            </p>
          )}

          <div className="flex justify-center mb-5">
            <p className="inline-flex items-center rounded-full border border-[#FFB454]/30 bg-[#FFB454]/[0.08] px-4 py-1.5 text-sm font-semibold text-[#FFB454]">
              {t.seasonBadge}
            </p>
          </div>

          <p className="text-[#00D4FF] text-sm font-bold uppercase tracking-[0.2em] mb-4">{t.kicker}</p>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-white leading-tight mb-6">
            {t.h1a} <span className="text-gradient">{t.h1b}</span>
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto mb-9 leading-relaxed">{t.sub}</p>

          <a
            href="#buy"
            className="inline-block px-9 py-4 rounded-full bg-[#FFB454] text-[#0A1628] font-extrabold text-lg hover:opacity-90 transition-opacity"
          >
            {t.heroCta}
          </a>
          <p className="text-white/40 text-sm mt-4">{t.heroNote}</p>
        </div>
      </section>

      <div className="section-divider" />

      {/* ── WHAT'S INSIDE ── */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">{t.insideTitle}</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            {t.inside.map((item, i) => (
              <Reveal key={item.title} delay={i * 60} className={i === 0 ? "sm:col-span-2" : ""}>
                <div
                  className={`glass-card rounded-2xl p-7 h-full ${
                    i === 0 ? "!border-[#FFB454]/40" : ""
                  }`}
                >
                  <span
                    className={`inline-block text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4 ${
                      i === 0 ? "bg-[#FFB454]/15 text-[#FFB454]" : "bg-[#2D6BE4]/20 text-[#00D4FF]"
                    }`}
                  >
                    {item.tag}
                  </span>
                  <h3 className="text-white font-bold text-xl mb-2">{item.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{item.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICE ANCHOR ── */}
      <section className="py-20 px-4 bg-white/[0.02] border-y border-white/[0.06]">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center gap-10">
          <div className="flex-1 text-center sm:text-left">
            <h2 className="text-3xl font-bold text-white mb-4">{t.anchorTitle}</h2>
            <p className="text-white/60 leading-relaxed max-w-lg">{t.anchorBody}</p>
          </div>
          <div className="glass-strong rounded-2xl px-10 py-8 text-center !border-[#FFB454]/30 shrink-0">
            <p className="text-5xl font-extrabold text-[#FFB454]">{t.anchorPrice}</p>
            <p className="text-white/50 text-xs mt-2 max-w-[180px]">{t.anchorPriceNote}</p>
          </div>
        </div>
      </section>

      {/* ── PARENTS ── */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center gap-10">
          <div className="shrink-0 animate-float">
            <Nexi pose="wave" width={140} height={140} className="h-[140px] w-auto object-contain" />
          </div>
          <div className="text-center sm:text-left">
            <h2 className="text-3xl font-bold text-white mb-4">{t.parentsTitle}</h2>
            <p className="text-white/60 leading-relaxed">{t.parentsBody}</p>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-20 px-4 bg-white/[0.02] border-y border-white/[0.06]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">{t.howTitle}</h2>
          <ol className="grid gap-5 sm:grid-cols-3">
            {t.how.map((step, i) => (
              <li key={step} className="glass-card rounded-2xl p-7 text-center">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#FFB454] text-[#0A1628] font-extrabold mb-4">
                  {i + 1}
                </span>
                <p className="text-white/70 text-sm leading-relaxed">{step}</p>
              </li>
            ))}
          </ol>
          <p className="text-center text-white/40 text-sm mt-8 max-w-xl mx-auto">{t.premiumNote}</p>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-10">{t.faqTitle}</h2>
          <div className="space-y-4">
            {t.faq.map((item) => (
              <details key={item.q} className="glass-card rounded-xl px-6 py-4 group">
                <summary className="text-white font-semibold cursor-pointer list-none flex items-center justify-between gap-4">
                  {item.q}
                  <span className="text-[#00D4FF] group-open:rotate-90 transition-transform">→</span>
                </summary>
                <p className="text-white/55 text-sm leading-relaxed mt-3">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── BUY ── */}
      <section id="buy" className="py-20 px-4 page-hero">
        <div className="max-w-md mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-2">{t.buyTitle}</h2>
          <p className="text-white/50 text-sm mb-8">{t.buySub}</p>
          <PackWaitlistForm
            key={lang}
            language={lang}
            cta={t.cta}
            emailLabel={t.emailLabel}
            emailPlaceholder={t.emailPlaceholder}
            saving={t.saving}
            done={t.done}
          />
          <Link href="/nexi-tutor" className="inline-block mt-6 text-sm font-bold text-[#00D4FF] hover:underline">
            {t.finalsLink}
          </Link>
          <p className="text-white/35 text-sm mt-10 italic">{t.signoff}</p>
        </div>
      </section>
    </div>
  );
}

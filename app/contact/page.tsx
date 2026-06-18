"use client";

import { useState } from "react";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { IconCheck, IconEnvelope, IconChatBubble, IconCpuChip } from "@/components/icons";

// Support routes. The number is never shown as text — only used inside the
// WhatsApp link — so it stays slightly out of reach of scrapers and casual view.
const SUPPORT_EMAIL = "nexi@forgesystems.co.za";
const WHATSAPP_URL =
  "https://wa.me/27734231097?text=" +
  encodeURIComponent("Hi, I'm using NexiStudy and I'd like to report:");

const SUBJECTS = [
  "Bug — something isn't working",
  "Feedback or suggestion",
  "Billing or subscription",
  "Partnership",
  "Press / media",
];

const INPUT_CLS =
  "w-full px-4 py-3 bg-white/5 border border-white/15 rounded-xl text-sm text-white placeholder:text-white/25 focus:outline-none focus:ring-2 focus:ring-[#00D4FF]/40 focus:border-[#00D4FF] transition-colors";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email || !form.subject || !form.message) return;
    // No backend mailbox — open the visitor's email app with everything filled
    // in, addressed to support. Honest and reliable, nothing pretends to send.
    const subject = encodeURIComponent(`[NexiStudy] ${form.subject}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
    window.location.href = `mailto:${SUPPORT_EMAIL}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  return (
    <div className="min-h-screen">

      {/* ── HERO ── */}
      <section className="page-hero py-20 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <span className="inline-block mb-4 px-4 py-1 rounded-full glass text-[#00D4FF] text-sm font-medium tracking-wide uppercase">
            Contact Us
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-white">
            Bugs &amp; <span className="text-gradient">feedback</span>
          </h1>
          <p className="text-white/60 text-lg leading-relaxed">
            NexiStudy is built by a small team. If something&apos;s broken, not working as
            expected, or you&apos;ve got an idea to make it better, we want to hear it.
          </p>
        </div>
      </section>

      <div className="section-divider" />

      {/* ── MAIN ── */}
      <section className="py-16 px-4">
        <div className="max-w-2xl mx-auto">

          {/* ── SCHOOLWORK DISCLAIMER ── */}
          <Reveal>
            <div className="rounded-2xl border border-[#00D4FF]/25 bg-[#00D4FF]/[0.04] p-6 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3.5">
                <span className="flex-shrink-0 text-[#00D4FF] mt-0.5">
                  <IconCpuChip className="w-6 h-6" />
                </span>
                <div>
                  <h2 className="text-white font-bold text-base mb-1">
                    Stuck on schoolwork? That&apos;s Nexi&apos;s job
                  </h2>
                  <p className="text-white/55 text-sm leading-relaxed">
                    We can&apos;t help with homework or subject questions here — your AI tutor
                    Nexi can, any time of day, in your language.
                  </p>
                </div>
              </div>
              <Link
                href="/nexi-tutor"
                className="flex-shrink-0 px-5 py-2.5 bg-[#2D6BE4] hover:bg-[#4A82F0] text-white text-sm font-bold rounded-xl transition-colors whitespace-nowrap"
              >
                Ask Nexi →
              </Link>
            </div>
          </Reveal>

          {/* ── REACH US — EMAIL + WHATSAPP BUTTONS ── */}
          <Reveal delay={80}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <a
                href={`mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent("[NexiStudy] Bug / feedback")}`}
                className="glass-card p-6 flex flex-col items-center text-center gap-2 transition-colors hover:border-[#00D4FF]/40"
              >
                <span className="text-[#00D4FF]"><IconEnvelope className="w-7 h-7" /></span>
                <span className="text-white font-bold text-sm">Email us</span>
                <span className="text-white/45 text-xs">Best for bug reports &amp; detail</span>
              </a>

              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card p-6 flex flex-col items-center text-center gap-2 transition-colors hover:border-emerald-400/40"
              >
                <span className="text-emerald-300"><IconChatBubble className="w-7 h-7" /></span>
                <span className="text-white font-bold text-sm">WhatsApp us</span>
                <span className="text-white/45 text-xs">For a quick message</span>
              </a>
            </div>
          </Reveal>

          {/* ── CONTACT FORM (opens your email app) ── */}
          <Reveal delay={160}>
            <div className="glass rounded-2xl overflow-hidden">
              <div className="px-8 py-5 border-b border-white/10 bg-white/5">
                <h2 className="text-sm font-semibold text-white uppercase tracking-widest">
                  Prefer to type it out?
                </h2>
              </div>

              <div className="p-8">
                {submitted ? (
                  <div className="text-center py-10">
                    <div className="w-16 h-16 rounded-full bg-emerald-400/15 border border-emerald-400/30 flex items-center justify-center mx-auto mb-5 text-emerald-300">
                      <IconCheck className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Almost there</h3>
                    <p className="text-white/50 text-sm leading-relaxed max-w-sm mx-auto">
                      Your email app should have opened with your message ready to send,{" "}
                      <span className="font-semibold text-white">{form.name.split(" ")[0]}</span>.
                      If it didn&apos;t, use the <span className="text-white">Email us</span> button above.
                    </p>
                    <button
                      onClick={() => { setSubmitted(false); setForm({ name: "", email: "", subject: "", message: "" }); }}
                      className="mt-6 text-sm font-semibold text-[#00D4FF] hover:text-white transition-colors cursor-pointer"
                    >
                      Write another
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Name */}
                    <div>
                      <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-1.5">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="e.g. Thandi Dlamini"
                        required
                        className={INPUT_CLS}
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-1.5">
                        Your Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        required
                        className={INPUT_CLS}
                      />
                    </div>

                    {/* Subject */}
                    <div>
                      <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-1.5">
                        What&apos;s it about?
                      </label>
                      <select
                        name="subject"
                        value={form.subject}
                        onChange={handleChange}
                        required
                        className={INPUT_CLS + " cursor-pointer"}
                      >
                        <option value="">— Select —</option>
                        {SUBJECTS.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-1.5">
                        Message
                      </label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        rows={5}
                        placeholder="If it's a bug: what were you doing, and what went wrong? Screenshots help if you can send them by email."
                        required
                        className={INPUT_CLS + " resize-none leading-relaxed"}
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 bg-[#2D6BE4] hover:bg-[#4A82F0] text-white font-bold rounded-xl transition-all text-sm shadow-lg shadow-[#2D6BE4]/30 hover:shadow-[#00D4FF]/30 cursor-pointer"
                    >
                      Send via Email
                    </button>
                    <p className="text-center text-[11px] text-white/35">
                      This opens your email app with the details filled in.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </Reveal>

        </div>
      </section>

    </div>
  );
}

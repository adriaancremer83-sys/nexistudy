"use client";

import { useState } from "react";
import Reveal from "@/components/Reveal";
import { IconCheck, IconEnvelope, IconChatBubble, IconClock } from "@/components/icons";

const SUBJECTS = [
  "General Enquiry",
  "Technical Support",
  "School Partnership",
  "Press",
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
            Get in <span className="text-gradient">Touch</span>
          </h1>
          <p className="text-white/60 text-lg leading-relaxed">
            Have a question, partnership idea, or just want to say hello?
            We&apos;d love to hear from you.
          </p>
        </div>
      </section>

      <div className="section-divider" />

      {/* ── MAIN ── */}
      <section className="py-16 px-4">
        <div className="max-w-2xl mx-auto">

          {/* ── CONTACT FORM ── */}
          <Reveal>
            <div className="glass rounded-2xl overflow-hidden mb-6">
              <div className="px-8 py-5 border-b border-white/10 bg-white/5">
                <h2 className="text-sm font-semibold text-white uppercase tracking-widest">Send us a message</h2>
              </div>

              <div className="p-8">
                {submitted ? (
                  <div className="text-center py-10">
                    <div className="w-16 h-16 rounded-full bg-emerald-400/15 border border-emerald-400/30 flex items-center justify-center mx-auto mb-5 text-emerald-300">
                      <IconCheck className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Message Sent!</h3>
                    <p className="text-white/50 text-sm leading-relaxed max-w-sm mx-auto">
                      Thanks for reaching out, <span className="font-semibold text-white">{form.name.split(" ")[0]}</span>.
                      We&apos;ll get back to you within 24 hours.
                    </p>
                    <button
                      onClick={() => { setSubmitted(false); setForm({ name: "", email: "", subject: "", message: "" }); }}
                      className="mt-6 text-sm font-semibold text-[#00D4FF] hover:text-white transition-colors cursor-pointer"
                    >
                      Send another message
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
                        Email Address
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
                        Subject
                      </label>
                      <select
                        name="subject"
                        value={form.subject}
                        onChange={handleChange}
                        required
                        className={INPUT_CLS + " cursor-pointer"}
                      >
                        <option value="">— Select a subject —</option>
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
                        placeholder="Tell us how we can help..."
                        required
                        className={INPUT_CLS + " resize-none leading-relaxed"}
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 bg-[#2D6BE4] hover:bg-[#4A82F0] text-white font-bold rounded-xl transition-all text-sm shadow-lg shadow-[#2D6BE4]/30 hover:shadow-[#00D4FF]/30 cursor-pointer"
                    >
                      Send Message
                    </button>
                  </form>
                )}
              </div>
            </div>
          </Reveal>

          {/* ── CONTACT INFO CARDS ── */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

            <Reveal delay={100} className="h-full">
              <div className="glass-card p-6 text-center h-full">
                <div className="flex justify-center mb-3 text-[#00D4FF]">
                  <IconEnvelope className="w-7 h-7" />
                </div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-1">Email</p>
                <a
                  href="mailto:hello@nexistudy.co.za"
                  className="text-sm font-semibold text-[#00D4FF] hover:text-white transition-colors break-all"
                >
                  hello@nexistudy.co.za
                </a>
              </div>
            </Reveal>

            <Reveal delay={200} className="h-full">
              <div className="glass-card p-6 text-center h-full">
                <div className="flex justify-center mb-3 text-emerald-300">
                  <IconChatBubble className="w-7 h-7" />
                </div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-1">WhatsApp</p>
                <a
                  href="https://wa.me/27600000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-emerald-300 hover:text-white transition-colors"
                >
                  +27 60 000 0000
                </a>
              </div>
            </Reveal>

            <Reveal delay={300} className="h-full">
              <div className="glass-card p-6 text-center h-full">
                <div className="flex justify-center mb-3 text-amber-300">
                  <IconClock className="w-7 h-7" />
                </div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-1">Response Time</p>
                <p className="text-sm font-semibold text-white">Within 24 hours</p>
                <p className="text-[10px] text-white/40 mt-0.5">Mon – Fri, 8am – 6pm SAST</p>
              </div>
            </Reveal>

          </div>
        </div>
      </section>

    </div>
  );
}

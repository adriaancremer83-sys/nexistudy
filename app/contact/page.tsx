"use client";

import { useState } from "react";

const SUBJECTS = [
  "General Enquiry",
  "Technical Support",
  "School Partnership",
  "Press",
];

const INPUT_CLS =
  "w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-[#1B2A4A] placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2D6BE4]/30 focus:border-[#2D6BE4] transition-colors bg-white";

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
    <div className="min-h-screen bg-[#F0F4FF]">

      {/* ── HERO ── */}
      <section className="bg-[#1B2A4A] text-white py-20 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <span className="inline-block mb-4 px-4 py-1 rounded-full bg-[#2D6BE4]/20 text-[#7EABFF] text-sm font-medium tracking-wide uppercase">
            Contact Us
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Get in <span className="text-[#2D6BE4]">Touch</span>
          </h1>
          <p className="text-gray-300 text-lg leading-relaxed">
            Have a question, partnership idea, or just want to say hello?
            We&apos;d love to hear from you.
          </p>
        </div>
      </section>

      {/* ── MAIN ── */}
      <section className="py-16 px-4">
        <div className="max-w-2xl mx-auto">

          {/* ── CONTACT FORM ── */}
          <div className="bg-white rounded-2xl shadow-sm border border-[#1B2A4A]/10 overflow-hidden mb-6">
            <div className="px-8 py-5 border-b border-[#1B2A4A]/8 bg-[#1B2A4A]/5">
              <h2 className="text-sm font-semibold text-[#1B2A4A] uppercase tracking-widest">Send us a message</h2>
            </div>

            <div className="p-8">
              {submitted ? (
                <div className="text-center py-10">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-5">
                    <span className="text-3xl">✓</span>
                  </div>
                  <h3 className="text-xl font-bold text-[#1B2A4A] mb-2">Message Sent!</h3>
                  <p className="text-gray-500 text-sm leading-relaxed max-w-sm mx-auto">
                    Thanks for reaching out, <span className="font-semibold text-[#1B2A4A]">{form.name.split(" ")[0]}</span>.
                    We&apos;ll get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ name: "", email: "", subject: "", message: "" }); }}
                    className="mt-6 text-sm font-semibold text-[#2D6BE4] hover:text-[#2558C5] transition-colors"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
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
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
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
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                      Subject
                    </label>
                    <select
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      required
                      className={INPUT_CLS}
                    >
                      <option value="">— Select a subject —</option>
                      {SUBJECTS.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
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
                    className="w-full py-3.5 bg-[#2D6BE4] hover:bg-[#2558C5] text-white font-bold rounded-xl transition-colors text-sm shadow-md shadow-[#2D6BE4]/20"
                  >
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* ── CONTACT INFO CARDS ── */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

            <div className="bg-white rounded-2xl border border-[#1B2A4A]/10 shadow-sm p-6 text-center hover:shadow-md hover:border-[#2D6BE4]/30 transition-all">
              <div className="w-11 h-11 rounded-xl bg-[#2D6BE4]/10 flex items-center justify-center mx-auto mb-3">
                <span className="text-xl">✉️</span>
              </div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Email</p>
              <a
                href="mailto:hello@nexistudy.co.za"
                className="text-sm font-semibold text-[#2D6BE4] hover:text-[#2558C5] transition-colors break-all"
              >
                hello@nexistudy.co.za
              </a>
            </div>

            <div className="bg-white rounded-2xl border border-[#1B2A4A]/10 shadow-sm p-6 text-center hover:shadow-md hover:border-[#2D6BE4]/30 transition-all">
              <div className="w-11 h-11 rounded-xl bg-emerald-50 flex items-center justify-center mx-auto mb-3">
                <span className="text-xl">💬</span>
              </div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">WhatsApp</p>
              <a
                href="https://wa.me/27600000000"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-emerald-600 hover:text-emerald-700 transition-colors"
              >
                +27 60 000 0000
              </a>
            </div>

            <div className="bg-white rounded-2xl border border-[#1B2A4A]/10 shadow-sm p-6 text-center hover:shadow-md hover:border-[#2D6BE4]/30 transition-all">
              <div className="w-11 h-11 rounded-xl bg-amber-50 flex items-center justify-center mx-auto mb-3">
                <span className="text-xl">⚡</span>
              </div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Response Time</p>
              <p className="text-sm font-semibold text-[#1B2A4A]">Within 24 hours</p>
              <p className="text-[10px] text-gray-400 mt-0.5">Mon – Fri, 8am – 6pm SAST</p>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}

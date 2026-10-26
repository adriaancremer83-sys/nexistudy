"use client";

import { useState } from "react";

// A learner's private parent-pay link (/gift/<code>) with one-tap WhatsApp
// sharing and copy. Whoever opens the link can pay for this learner's Premium
// without logging in.
export default function ParentLinkShare({ url, compact = false }: { url: string; compact?: boolean }) {
  const [copied, setCopied] = useState(false);

  const message =
    "Hi! I'm studying with NexiStudy. Premium gives me 50 tutor chats a day, " +
    "examiner-style marking of my answers, and an exam plan built around my subjects. " +
    "It's once-off from R99 — no subscription, you can pay by EFT here: " +
    url;
  const whatsapp = `https://wa.me/?text=${encodeURIComponent(message)}`;

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked — the link is visible to copy by hand */
    }
  }

  return (
    <div className={compact ? "space-y-3" : "space-y-4"}>
      <div className="flex flex-col sm:flex-row gap-3">
        <a
          href={whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 text-center px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#2fe074] text-[#0A1628] font-extrabold transition-colors"
        >
          Send to a parent on WhatsApp
        </a>
        <button
          type="button"
          onClick={copy}
          className="px-6 py-3.5 rounded-xl border border-white/20 text-white font-bold hover:border-white/40 transition-colors cursor-pointer"
        >
          {copied ? "Copied ✓" : "Copy link"}
        </button>
      </div>
      {!compact && <p className="text-xs text-white/40 break-all">{url}</p>}
    </div>
  );
}

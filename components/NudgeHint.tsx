"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

// A small floating "what's next" hint pill (bottom-centre). The caller decides
// WHEN it's eligible via `show`; this component handles permanent dismissal in
// localStorage so it only nudges a learner once per flow. Matches the Study Pro
// nudge styling. Uses the finite `guide-hint-in` animation (reduced-motion safe).

interface NudgeHintProps {
  show: boolean;
  storageKey: string;
  message: string;
  // Either navigate to a route (`href`) or run a same-page action (`onAction`,
  // e.g. scroll to a section). Provide exactly one.
  href?: string;
  onAction?: () => void;
}

export default function NudgeHint({ show, storageKey, message, href, onAction }: NudgeHintProps) {
  // Start dismissed so returning learners never see a flash before the read.
  const [dismissed, setDismissed] = useState(true);

  useEffect(() => {
    try {
      setDismissed(!!localStorage.getItem(storageKey));
    } catch {
      setDismissed(false);
    }
  }, [storageKey]);

  function dismiss() {
    setDismissed(true);
    try {
      localStorage.setItem(storageKey, "1");
    } catch {
      /* ignore */
    }
  }

  if (!show || dismissed) return null;

  const arrow = (
    <span className="grid place-items-center w-8 h-8 rounded-full bg-white/20">
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
      </svg>
    </span>
  );

  return (
    <div className="fixed inset-x-0 bottom-5 z-40 flex justify-center px-4 pointer-events-none">
      <div className="guide-hint-in pointer-events-auto flex items-center gap-1 rounded-full bg-[#2D6BE4] text-white shadow-[0_8px_30px_rgba(0,0,0,0.45)] pl-5 pr-2 py-2">
        {href ? (
          <Link href={href} onClick={dismiss} className="flex items-center gap-2 text-sm font-semibold cursor-pointer">
            {message}
            {arrow}
          </Link>
        ) : (
          <button
            onClick={() => {
              onAction?.();
              dismiss();
            }}
            className="flex items-center gap-2 text-sm font-semibold cursor-pointer"
          >
            {message}
            {arrow}
          </button>
        )}
        <button
          onClick={dismiss}
          aria-label="Dismiss hint"
          className="grid place-items-center w-8 h-8 rounded-full text-white/70 hover:text-white hover:bg-white/10 cursor-pointer"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}

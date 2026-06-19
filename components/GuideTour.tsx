"use client";

import { useState, useEffect, useCallback } from "react";

// A lightweight first-run spotlight tour. Highlights one element at a time by
// drawing a bright "hole" over it (a single big box-shadow — no backdrop-filter,
// cheap on low-spec GPUs) with a tooltip card. Runs once per `storageKey`.
//
// Targets are matched by CSS selector (use data-tour="id" on the element). A step
// without a selector renders as a centred card (good for intro/outro). If a
// target isn't found, that step falls back to a centred card so the tour never
// breaks.

export interface TourStep {
  selector?: string;
  title: string;
  body: string;
}

interface GuideTourProps {
  steps: TourStep[];
  storageKey: string;
}

const PAD = 8; // breathing room around the highlighted element
const CARD_W = 300;

export default function GuideTour({ steps, storageKey }: GuideTourProps) {
  const [active, setActive] = useState(false);
  const [i, setI] = useState(0);
  const [rect, setRect] = useState<DOMRect | null>(null);

  // Show once, only if not seen before.
  useEffect(() => {
    try {
      if (steps.length > 0 && !localStorage.getItem(storageKey)) setActive(true);
    } catch {
      /* localStorage blocked — just don't auto-run */
    }
  }, [steps.length, storageKey]);

  const finish = useCallback(() => {
    setActive(false);
    try {
      localStorage.setItem(storageKey, "1");
    } catch {
      /* ignore */
    }
  }, [storageKey]);

  // Measure the current target (and keep it in sync while scrolling/resizing).
  useEffect(() => {
    if (!active) return;
    const step = steps[i];
    const sel = step?.selector;
    if (!sel) {
      setRect(null);
      return;
    }
    const el = document.querySelector(sel) as HTMLElement | null;
    if (!el) {
      setRect(null);
      return;
    }
    el.scrollIntoView({ block: "center", inline: "nearest" });

    const update = () => {
      const e = document.querySelector(sel) as HTMLElement | null;
      setRect(e ? e.getBoundingClientRect() : null);
    };
    // Measure after the scroll lands, then track.
    const raf = requestAnimationFrame(update);
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [active, i, steps]);

  // Escape closes the tour.
  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") finish();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, finish]);

  if (!active || steps.length === 0) return null;

  const step = steps[i];
  const isLast = i === steps.length - 1;
  const hasHole = !!rect;

  // Tooltip position: below the target if there's room, otherwise above; centred
  // when there's no target.
  let cardStyle: React.CSSProperties;
  if (rect) {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const left = Math.min(Math.max(rect.left, 12), Math.max(12, vw - CARD_W - 12));
    const below = rect.bottom + 16 + 160 < vh || rect.top < vh * 0.4;
    cardStyle = below
      ? { top: rect.bottom + PAD + 12, left }
      : { bottom: vh - rect.top + PAD + 12, left };
  } else {
    cardStyle = { top: "50%", left: "50%", transform: "translate(-50%, -50%)" };
  }

  return (
    <div className="fixed inset-0 z-[100]" role="dialog" aria-modal="true" aria-label="Getting-started tour">
      {/* Dim layer. When there's a target, the hole is the box-shadow on the
          ring below; this plain layer only shows for centred steps. */}
      {!hasHole && <div className="absolute inset-0 bg-[#050D1A]/80" />}

      {/* Spotlight ring + hole (box-shadow dims everything outside it). */}
      {hasHole && rect && (
        <div
          aria-hidden
          className="absolute rounded-xl border-2 border-[#00D4FF] transition-[top,left,width,height] duration-200"
          style={{
            top: rect.top - PAD,
            left: rect.left - PAD,
            width: rect.width + PAD * 2,
            height: rect.height + PAD * 2,
            boxShadow: "0 0 0 9999px rgba(5,13,26,0.80)",
          }}
        />
      )}

      {/* Tooltip card */}
      <div
        className="absolute w-[300px] max-w-[calc(100vw-24px)] rounded-2xl border border-white/10 bg-[#0A1628] shadow-[0_12px_40px_rgba(0,0,0,0.5)] p-5"
        style={cardStyle}
      >
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#00D4FF]">
            Step {i + 1} of {steps.length}
          </span>
          <button
            onClick={finish}
            className="text-xs font-semibold text-white/40 hover:text-white transition-colors cursor-pointer"
          >
            Skip
          </button>
        </div>
        <h3 className="text-white font-bold text-base mb-1.5">{step.title}</h3>
        <p className="text-white/55 text-sm leading-relaxed mb-4">{step.body}</p>
        <div className="flex items-center justify-between gap-2">
          <button
            onClick={() => setI((n) => Math.max(0, n - 1))}
            disabled={i === 0}
            className="text-sm font-semibold text-white/50 hover:text-white disabled:opacity-0 transition-colors cursor-pointer"
          >
            Back
          </button>
          <button
            onClick={() => (isLast ? finish() : setI((n) => n + 1))}
            className="px-5 py-2 bg-[#2D6BE4] hover:bg-[#4A82F0] text-white font-semibold text-sm rounded-xl transition-colors cursor-pointer"
          >
            {isLast ? "Got it" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}

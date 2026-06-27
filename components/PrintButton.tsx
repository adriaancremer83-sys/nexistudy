"use client";

// Tiny client control for the worksheet page — triggers the browser print
// dialog, where the teacher can choose "Save as PDF". Hidden when printing.
export default function PrintButton({ className }: { className?: string }) {
  return (
    <button type="button" onClick={() => window.print()} className={className} data-noprint>
      Print / Save as PDF
    </button>
  );
}

"use client";

// Opens Google Classroom's native share dialog. By default it shares the site
// homepage; pass `path` (e.g. "/dashboard?join=ABC123") to deep-link learners
// straight to a class-join link instead.
export default function ShareToClassroom({
  path = "",
  label = "Share to Google Classroom →",
  className = "px-5 py-2.5 bg-[#FFB454] hover:bg-[#FFC678] text-[#050D1A] text-sm font-extrabold rounded-xl transition-colors cursor-pointer whitespace-nowrap",
}: {
  path?: string;
  label?: string;
  className?: string;
}) {
  function handleShare() {
    const target = `${window.location.origin}${path}`;
    const url = encodeURIComponent(target);
    window.open(
      `https://classroom.google.com/share?url=${url}`,
      "_blank",
      "noopener,noreferrer,width=600,height=540"
    );
  }

  return (
    <button onClick={handleShare} className={className}>
      {label}
    </button>
  );
}

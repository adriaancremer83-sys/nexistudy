"use client";

// Opens Google Classroom's native share dialog for the current site.
// Built client-side because the share URL needs the deployed origin.
export default function ShareToClassroom() {
  function handleShare() {
    const url = encodeURIComponent(window.location.origin);
    window.open(
      `https://classroom.google.com/share?url=${url}`,
      "_blank",
      "noopener,noreferrer,width=600,height=540"
    );
  }

  return (
    <button
      onClick={handleShare}
      className="px-5 py-2.5 bg-[#00D4AA] hover:bg-[#1FE5BE] text-[#050D1A] text-sm font-extrabold rounded-xl transition-colors cursor-pointer"
    >
      Share to Google Classroom →
    </button>
  );
}

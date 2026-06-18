"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { IconStar, IconCheck, IconWarning } from "@/components/icons";

export default function ReviewForm() {
  const { data: session, status } = useSession();
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  // Prefill the display name with the learner's first name once we know who they are.
  useEffect(() => {
    if (session?.user?.name) setName((n) => n || session.user.name!.split(" ")[0]);
  }, [session]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (rating < 1) return setError("Tap a star to rate NexiStudy.");
    if (comment.trim().length < 3) return setError("Add a few words about your experience.");
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rating, comment, name }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Could not send your review.");
        setSubmitting(false);
        return;
      }
      setDone(true);
    } catch {
      setError("Something went wrong. Please try again.");
      setSubmitting(false);
    }
  }

  const Header = (
    <div className="px-8 py-5 border-b border-white/10 bg-white/5">
      <h2 className="text-sm font-semibold text-white uppercase tracking-widest">
        What do you think of NexiStudy?
      </h2>
    </div>
  );

  // Not signed in → invite them to log in (reviews are from real learners only).
  if (status !== "loading" && !session) {
    return (
      <div className="glass rounded-2xl overflow-hidden">
        {Header}
        <div className="p-8 text-center">
          <div className="flex justify-center gap-1 mb-4 text-[#FFB454]">
            {[1, 2, 3, 4, 5].map((n) => (
              <IconStar key={n} className="w-6 h-6" />
            ))}
          </div>
          <p className="text-white/60 text-sm leading-relaxed max-w-sm mx-auto mb-6">
            We&apos;d love to hear how NexiStudy is going for you. Reviews come from
            signed-in learners, so log in and tell us what you think.
          </p>
          <div className="flex items-center justify-center gap-3">
            <Link
              href="/login?callbackUrl=/contact"
              className="px-5 py-2.5 bg-[#2D6BE4] hover:bg-[#4A82F0] text-white text-sm font-bold rounded-xl transition-colors"
            >
              Log in
            </Link>
            <Link
              href="/signup"
              className="px-5 py-2.5 border border-white/15 hover:border-[#00D4FF]/50 text-white/80 hover:text-white text-sm font-bold rounded-xl transition-colors"
            >
              Create an account
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="glass rounded-2xl overflow-hidden">
      {Header}
      <div className="p-8">
        {done ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-emerald-400/15 border border-emerald-400/30 flex items-center justify-center mx-auto mb-5 text-emerald-300">
              <IconCheck className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Thank you! 🌟</h3>
            <p className="text-white/50 text-sm leading-relaxed max-w-sm mx-auto">
              Your review has been sent. Once we&apos;ve had a quick look, it may appear
              on our homepage to help other students.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Star picker */}
            <div>
              <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">
                Your rating
              </label>
              <div className="flex items-center gap-1.5" onMouseLeave={() => setHover(0)}>
                {[1, 2, 3, 4, 5].map((n) => {
                  const active = (hover || rating) >= n;
                  return (
                    <button
                      key={n}
                      type="button"
                      onClick={() => { setRating(n); setError(""); }}
                      onMouseEnter={() => setHover(n)}
                      aria-label={`${n} star${n > 1 ? "s" : ""}`}
                      className="p-1 cursor-pointer transition-transform hover:scale-110"
                    >
                      <IconStar
                        className={`w-8 h-8 transition-colors ${active ? "text-[#FFB454]" : "text-white/15"}`}
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Display name */}
            <div>
              <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-1.5">
                Display name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Thandi"
                maxLength={60}
                className="w-full px-4 py-3 bg-white/5 border border-white/15 rounded-xl text-sm text-white placeholder:text-white/25 focus:outline-none focus:ring-2 focus:ring-[#FFB454]/40 focus:border-[#FFB454] transition-colors"
              />
              <p className="text-[11px] text-white/35 mt-1.5">
                Shown with your review. We&apos;ll add your grade automatically.
              </p>
            </div>

            {/* Comment */}
            <div>
              <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-1.5">
                Your review
              </label>
              <textarea
                value={comment}
                onChange={(e) => { setComment(e.target.value); setError(""); }}
                rows={4}
                maxLength={500}
                placeholder="What's working for you? What helped the most?"
                className="w-full px-4 py-3 bg-white/5 border border-white/15 rounded-xl text-sm text-white placeholder:text-white/25 focus:outline-none focus:ring-2 focus:ring-[#FFB454]/40 focus:border-[#FFB454] transition-colors resize-none leading-relaxed"
              />
            </div>

            {error && (
              <div className="flex items-start gap-2.5 bg-red-400/10 border border-red-400/30 rounded-xl px-4 py-3">
                <IconWarning className="w-4 h-4 text-red-300 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-red-300">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3.5 bg-[#FFB454] hover:bg-[#FFC678] disabled:opacity-60 disabled:cursor-not-allowed text-[#050D1A] font-extrabold rounded-xl transition-colors text-sm cursor-pointer"
            >
              {submitting ? "Sending…" : "Submit review"}
            </button>
            <p className="text-center text-[11px] text-white/35">
              Reviews are checked before they appear publicly.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { IconStar, IconCheck } from "@/components/icons";

interface AdminReview {
  id: string;
  name: string;
  grade: string;
  rating: number;
  comment: string;
  status: "pending" | "approved" | "hidden";
  createdAt: string;
}

const STATUS_STYLE: Record<AdminReview["status"], string> = {
  pending: "bg-amber-400/15 text-amber-300 border-amber-400/30",
  approved: "bg-emerald-400/15 text-emerald-300 border-emerald-400/30",
  hidden: "bg-white/10 text-white/40 border-white/15",
};

export default function AdminReviews() {
  const [reviews, setReviews] = useState<AdminReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState<string | null>(null);

  async function load() {
    try {
      const res = await fetch("/api/admin/reviews");
      const data = await res.json();
      if (res.ok) setReviews(data.reviews ?? []);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function setStatus(id: string, status: AdminReview["status"]) {
    setBusy(id);
    try {
      const res = await fetch("/api/admin/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      if (res.ok) {
        setReviews((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
      }
    } finally {
      setBusy(null);
    }
  }

  const pending = reviews.filter((r) => r.status === "pending").length;

  if (loading) {
    return <p className="text-white/40 text-sm">Loading reviews…</p>;
  }
  if (reviews.length === 0) {
    return <p className="text-white/40 text-sm">No reviews yet.</p>;
  }

  return (
    <div className="space-y-3">
      {pending > 0 && (
        <p className="text-amber-300 text-sm font-semibold">
          {pending} awaiting your approval
        </p>
      )}
      {reviews.map((r) => (
        <div key={r.id} className="rounded-xl border border-white/[0.08] bg-[#0E1F3D] p-5">
          <div className="flex items-start justify-between gap-4 mb-2">
            <div className="flex items-center gap-3">
              <div className="flex gap-0.5 text-[#FFB454]">
                {Array.from({ length: r.rating }).map((_, i) => (
                  <IconStar key={i} className="w-4 h-4" />
                ))}
              </div>
              <span className="text-white text-sm font-semibold">
                {r.name}
                {r.grade ? <span className="text-white/40 font-normal"> · {r.grade}</span> : null}
              </span>
            </div>
            <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-md border ${STATUS_STYLE[r.status]}`}>
              {r.status}
            </span>
          </div>
          <p className="text-white/70 text-sm leading-relaxed mb-3">{r.comment}</p>
          <div className="flex items-center gap-2">
            {r.status !== "approved" && (
              <button
                onClick={() => setStatus(r.id, "approved")}
                disabled={busy === r.id}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-400/15 border border-emerald-400/30 text-emerald-300 text-xs font-semibold hover:bg-emerald-400/25 disabled:opacity-50 transition-colors cursor-pointer"
              >
                <IconCheck className="w-3.5 h-3.5" /> Approve
              </button>
            )}
            {r.status !== "hidden" && (
              <button
                onClick={() => setStatus(r.id, "hidden")}
                disabled={busy === r.id}
                className="px-3 py-1.5 rounded-lg border border-white/15 text-white/60 text-xs font-semibold hover:text-white hover:border-white/30 disabled:opacity-50 transition-colors cursor-pointer"
              >
                Hide
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

import { supabaseAdmin } from "./supabase";

export interface Review {
  id: string;
  name: string;
  grade: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface AdminReview extends Review {
  status: "pending" | "approved" | "hidden";
}

export interface ReviewStats {
  count: number;
  average: number; // 0–5, one decimal of meaning
}

// Submit (or update) the signed-in learner's review. Always lands as 'pending'
// so nothing reaches the homepage without an admin approving it.
export async function upsertReview(params: {
  userId: string;
  name: string;
  grade: string;
  rating: number;
  comment: string;
}): Promise<{ ok: boolean; error?: string }> {
  const rating = Math.round(params.rating);
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    return { ok: false, error: "Please pick a star rating." };
  }
  const comment = params.comment.trim();
  if (comment.length < 3) {
    return { ok: false, error: "Please add a short comment." };
  }
  const name = params.name.trim().slice(0, 60) || "NexiStudy learner";

  const { error } = await supabaseAdmin.from("reviews").upsert(
    {
      user_id: params.userId,
      name,
      grade: params.grade ?? "",
      rating,
      comment: comment.slice(0, 500),
      status: "pending",
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id" }
  );
  if (error) {
    console.error("upsertReview failed:", error.message);
    return { ok: false, error: "Could not save your review. Please try again." };
  }
  return { ok: true };
}

// Approved 4–5★ reviews with a comment — the testimonials shown on the homepage.
export async function getApprovedTestimonials(limit = 6): Promise<Review[]> {
  const { data, error } = await supabaseAdmin
    .from("reviews")
    .select("id,name,grade,rating,comment,created_at")
    .eq("status", "approved")
    .gte("rating", 4)
    .order("created_at", { ascending: false })
    .limit(limit);
  if (error) {
    console.error("getApprovedTestimonials failed:", error.message);
    return [];
  }
  return (data ?? []).map((r) => ({
    id: r.id as string,
    name: r.name as string,
    grade: r.grade as string,
    rating: r.rating as number,
    comment: r.comment as string,
    createdAt: r.created_at as string,
  }));
}

// Average + count across ALL approved reviews (3★ approvals still count here).
export async function getReviewStats(): Promise<ReviewStats> {
  const { data, error } = await supabaseAdmin
    .from("reviews")
    .select("rating")
    .eq("status", "approved");
  if (error) {
    console.error("getReviewStats failed:", error.message);
    return { count: 0, average: 0 };
  }
  const rows = data ?? [];
  const count = rows.length;
  const average = count
    ? rows.reduce((sum, r) => sum + (r.rating as number), 0) / count
    : 0;
  return { count, average };
}

// Admin moderation: everything, pending first, newest first.
export async function listReviewsForAdmin(): Promise<AdminReview[]> {
  const { data, error } = await supabaseAdmin
    .from("reviews")
    .select("id,name,grade,rating,comment,status,created_at")
    .order("created_at", { ascending: false });
  if (error) {
    console.error("listReviewsForAdmin failed:", error.message);
    return [];
  }
  const order = { pending: 0, approved: 1, hidden: 2 } as const;
  return (data ?? [])
    .map((r) => ({
      id: r.id as string,
      name: r.name as string,
      grade: r.grade as string,
      rating: r.rating as number,
      comment: r.comment as string,
      status: r.status as AdminReview["status"],
      createdAt: r.created_at as string,
    }))
    .sort((a, b) => order[a.status] - order[b.status]);
}

export async function setReviewStatus(
  id: string,
  status: "approved" | "hidden" | "pending"
): Promise<boolean> {
  const { error } = await supabaseAdmin
    .from("reviews")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", id);
  if (error) {
    console.error("setReviewStatus failed:", error.message);
    return false;
  }
  return true;
}

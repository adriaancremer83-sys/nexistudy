import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { upsertReview } from "@/lib/reviews";

export const dynamic = "force-dynamic";

// Logged-in learners only — keeps spam down and lets us tie a review to a real
// account (one per user). The review is held for admin approval.
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Please log in to leave a review." }, { status: 401 });
  }

  const { rating, comment, name } = await req.json();

  const result = await upsertReview({
    userId: session.user.id,
    name: typeof name === "string" && name.trim() ? name : session.user.name ?? "NexiStudy learner",
    grade: session.user.grade ?? "",
    rating: Number(rating),
    comment: typeof comment === "string" ? comment : "",
  });

  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }
  return NextResponse.json({ success: true });
}

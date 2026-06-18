import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { countQuizzesToday, submitQuiz, FREE_QUIZZES_PER_DAY } from "@/lib/practice";
import { getSubscription } from "@/lib/users";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Please log in first." }, { status: 401 });
  }

  const { topicId, answers } = await req.json();
  if (!topicId || typeof answers !== "object" || answers === null) {
    return NextResponse.json({ error: "Invalid submission." }, { status: 400 });
  }

  // The fetch already checked the limit; allow one extra so an in-progress
  // quiz can still be handed in, but block anything beyond that.
  // Live plan from the DB, not the session JWT (matches the quiz fetch gate).
  const { plan } = await getSubscription(session.user.id);
  if (plan === "free") {
    const used = await countQuizzesToday(session.user.id);
    if (used > FREE_QUIZZES_PER_DAY) {
      return NextResponse.json(
        { error: "limit", message: "Daily free quiz limit reached." },
        { status: 403 }
      );
    }
  }

  const result = await submitQuiz(session.user.id, topicId, answers);
  if (!result) {
    return NextResponse.json({ error: "Could not mark this quiz. Please try again." }, { status: 500 });
  }

  return NextResponse.json(result);
}

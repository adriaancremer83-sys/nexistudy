import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { countQuizzesToday, getQuizQuestions, FREE_QUIZZES_PER_DAY } from "@/lib/practice";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Please log in first." }, { status: 401 });
  }

  const topicId = req.nextUrl.searchParams.get("topic");
  if (!topicId) {
    return NextResponse.json({ error: "Missing topic." }, { status: 400 });
  }

  if (session.user.plan === "free") {
    const used = await countQuizzesToday(session.user.id);
    if (used >= FREE_QUIZZES_PER_DAY) {
      return NextResponse.json(
        { error: "limit", message: "You've used your free quizzes for today. Come back tomorrow, or go Premium for unlimited practice." },
        { status: 403 }
      );
    }
  }

  const questions = await getQuizQuestions(topicId);
  if (questions.length === 0) {
    return NextResponse.json({ error: "No questions for this topic yet." }, { status: 404 });
  }

  return NextResponse.json({ questions });
}

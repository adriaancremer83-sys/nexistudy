import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { getHomeworkForLearner } from "@/lib/homework";

export const dynamic = "force-dynamic";

// The question set (answers stripped) for a learner to answer.
export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Please log in first." }, { status: 401 });
  }

  const id = req.nextUrl.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing homework id." }, { status: 400 });

  const result = await getHomeworkForLearner(session.user.id, id);
  if (!result.ok) {
    return NextResponse.json(
      { error: result.error, alreadyDone: result.alreadyDone ?? false },
      { status: result.alreadyDone ? 409 : 400 }
    );
  }
  return NextResponse.json({ title: result.title, questions: result.questions });
}

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { submitHomework } from "@/lib/homework";

export const dynamic = "force-dynamic";

// Auto-mark a learner's homework against the verified answers and record it.
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Please log in first." }, { status: 401 });
  }

  const { homeworkId, answers } = await req.json();
  if (typeof homeworkId !== "string" || !homeworkId) {
    return NextResponse.json({ error: "Missing homework id." }, { status: 400 });
  }
  if (typeof answers !== "object" || answers === null || Array.isArray(answers)) {
    return NextResponse.json({ error: "Missing answers." }, { status: 400 });
  }

  const result = await submitHomework(session.user.id, homeworkId, answers as Record<string, number>);
  if (!result.ok) {
    return NextResponse.json(
      { error: result.error, alreadyDone: result.alreadyDone ?? false },
      { status: result.alreadyDone ? 409 : 400 }
    );
  }
  return NextResponse.json(result.result);
}

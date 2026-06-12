import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { reportQuestion } from "@/lib/practice";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Please log in first." }, { status: 401 });
  }

  const { questionId, reason } = await req.json();
  if (!questionId || typeof questionId !== "string") {
    return NextResponse.json({ error: "Missing question." }, { status: 400 });
  }

  const ok = await reportQuestion(session.user.id, questionId, String(reason ?? ""));
  if (!ok) {
    return NextResponse.json({ error: "Could not submit your report. Please try again." }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

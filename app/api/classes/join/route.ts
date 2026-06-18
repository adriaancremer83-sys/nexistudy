import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { joinClassByCode } from "@/lib/classes";

export const dynamic = "force-dynamic";

// A learner joins a teacher's class with the short code from the dashboard.
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Please log in first." }, { status: 401 });
  }
  if (session.user.role === "teacher") {
    return NextResponse.json(
      { error: "You're signed in as a teacher — class codes are for learners." },
      { status: 403 }
    );
  }

  const { code } = await req.json();
  if (typeof code !== "string" || !code.trim()) {
    return NextResponse.json({ error: "Enter your class code." }, { status: 400 });
  }

  const result = await joinClassByCode(session.user.id, code);
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }
  return NextResponse.json({ success: true, className: result.className });
}

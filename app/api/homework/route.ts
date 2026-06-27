import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { getLearnerHomework } from "@/lib/homework";

export const dynamic = "force-dynamic";

// List the homework assigned to the logged-in learner across their classes.
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Please log in first." }, { status: 401 });
  }
  if (session.user.role === "teacher") {
    // Teachers manage homework from their dashboard, not this learner feed.
    return NextResponse.json({ homework: [] });
  }

  const homework = await getLearnerHomework(session.user.id);
  return NextResponse.json({ homework });
}

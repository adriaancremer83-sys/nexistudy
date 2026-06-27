import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { createAssignment, deleteAssignment } from "@/lib/classes";

export const dynamic = "force-dynamic";

async function requireTeacher() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return { error: "Please log in first.", status: 401 as const };
  if (session.user.role !== "teacher")
    return { error: "Teacher accounts only.", status: 403 as const };
  return { userId: session.user.id };
}

// Loosely validate a YYYY-MM-DD date string (the <input type="date"> format).
function isValidDateString(s: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(s)) return false;
  const d = new Date(s + "T00:00:00Z");
  return !Number.isNaN(d.getTime());
}

// Set a practice assignment on one of the teacher's classes.
export async function POST(req: NextRequest) {
  const auth = await requireTeacher();
  if ("error" in auth) return NextResponse.json({ error: auth.error }, { status: auth.status });

  const { classId, topicId, numQuestions, dueDate } = await req.json();

  if (typeof classId !== "string" || !classId) {
    return NextResponse.json({ error: "Missing class." }, { status: 400 });
  }
  if (typeof topicId !== "string" || !topicId) {
    return NextResponse.json({ error: "Pick a topic." }, { status: 400 });
  }
  if (!Number.isInteger(numQuestions) || numQuestions < 1 || numQuestions > 50) {
    return NextResponse.json({ error: "Choose a valid number of questions." }, { status: 400 });
  }
  let due: string | null = null;
  if (dueDate !== null && dueDate !== undefined && dueDate !== "") {
    if (typeof dueDate !== "string" || !isValidDateString(dueDate)) {
      return NextResponse.json({ error: "That due date isn't valid." }, { status: 400 });
    }
    due = dueDate;
  }

  const result = await createAssignment(auth.userId, classId, {
    topicId,
    numQuestions,
    dueDate: due,
  });
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }
  return NextResponse.json({ success: true });
}

// Remove an assignment from a class the teacher owns.
export async function DELETE(req: NextRequest) {
  const auth = await requireTeacher();
  if ("error" in auth) return NextResponse.json({ error: auth.error }, { status: auth.status });

  const { assignmentId } = await req.json();
  if (typeof assignmentId !== "string" || !assignmentId) {
    return NextResponse.json({ error: "Missing assignment id." }, { status: 400 });
  }
  const ok = await deleteAssignment(auth.userId, assignmentId);
  if (!ok) return NextResponse.json({ error: "Could not delete the assignment." }, { status: 500 });
  return NextResponse.json({ success: true });
}

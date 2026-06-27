import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { createHomework, deleteHomework, MAX_HOMEWORK_QUESTIONS } from "@/lib/homework";

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

// Create a homework set from verified questions and assign it to the teacher's class.
export async function POST(req: NextRequest) {
  const auth = await requireTeacher();
  if ("error" in auth) return NextResponse.json({ error: auth.error }, { status: auth.status });

  const { classId, title, topicIds, numQuestions, dueDate } = await req.json();

  if (typeof classId !== "string" || !classId) {
    return NextResponse.json({ error: "Missing class." }, { status: 400 });
  }
  if (!Array.isArray(topicIds) || topicIds.some((t) => typeof t !== "string") || topicIds.length === 0) {
    return NextResponse.json({ error: "Pick at least one topic." }, { status: 400 });
  }
  if (!Number.isInteger(numQuestions) || numQuestions < 1 || numQuestions > MAX_HOMEWORK_QUESTIONS) {
    return NextResponse.json({ error: "Choose a valid number of questions." }, { status: 400 });
  }
  let due: string | null = null;
  if (dueDate !== null && dueDate !== undefined && dueDate !== "") {
    if (typeof dueDate !== "string" || !isValidDateString(dueDate)) {
      return NextResponse.json({ error: "That due date isn't valid." }, { status: 400 });
    }
    due = dueDate;
  }

  const result = await createHomework(auth.userId, classId, {
    title: typeof title === "string" ? title : "",
    topicIds,
    numQuestions,
    dueDate: due,
  });
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }
  return NextResponse.json({ success: true });
}

// Remove a homework set from a class the teacher owns.
export async function DELETE(req: NextRequest) {
  const auth = await requireTeacher();
  if ("error" in auth) return NextResponse.json({ error: auth.error }, { status: auth.status });

  const { homeworkId } = await req.json();
  if (typeof homeworkId !== "string" || !homeworkId) {
    return NextResponse.json({ error: "Missing homework id." }, { status: 400 });
  }
  const ok = await deleteHomework(auth.userId, homeworkId);
  if (!ok) return NextResponse.json({ error: "Could not delete the homework." }, { status: 500 });
  return NextResponse.json({ success: true });
}

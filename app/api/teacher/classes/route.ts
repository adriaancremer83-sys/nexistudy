import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import {
  createClass,
  deleteClass,
  getTeacherClasses,
  getClassHeatmap,
  CLASS_SUBJECTS,
  CLASS_GRADES,
} from "@/lib/classes";

export const dynamic = "force-dynamic";

async function requireTeacher() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return { error: "Please log in first.", status: 401 as const };
  if (session.user.role !== "teacher")
    return { error: "Teacher accounts only.", status: 403 as const };
  return { userId: session.user.id };
}

// List the teacher's classes, each with its live weak-spots heatmap.
export async function GET() {
  const auth = await requireTeacher();
  if ("error" in auth) return NextResponse.json({ error: auth.error }, { status: auth.status });

  const classes = await getTeacherClasses(auth.userId);
  const heatmaps = await Promise.all(classes.map((c) => getClassHeatmap(c.id)));

  return NextResponse.json({
    classes: classes.map((c, i) => ({ ...c, heatmap: heatmaps[i] })),
  });
}

// Create a new class and hand back its join code.
export async function POST(req: NextRequest) {
  const auth = await requireTeacher();
  if ("error" in auth) return NextResponse.json({ error: auth.error }, { status: auth.status });

  const { name, subject, grade } = await req.json();

  if (typeof name !== "string" || !name.trim()) {
    return NextResponse.json({ error: "Give your class a name." }, { status: 400 });
  }
  if (!CLASS_SUBJECTS.includes(subject)) {
    return NextResponse.json({ error: "Pick a subject from the list." }, { status: 400 });
  }
  if (!CLASS_GRADES.includes(grade)) {
    return NextResponse.json({ error: "Pick a grade from the list." }, { status: 400 });
  }

  const created = await createClass(auth.userId, {
    name: name.trim().slice(0, 60),
    subject,
    grade,
  });
  if (!created) {
    return NextResponse.json({ error: "Could not create the class. Please try again." }, { status: 500 });
  }
  return NextResponse.json({ class: created });
}

// Remove a class the teacher owns.
export async function DELETE(req: NextRequest) {
  const auth = await requireTeacher();
  if ("error" in auth) return NextResponse.json({ error: auth.error }, { status: auth.status });

  const { classId } = await req.json();
  if (typeof classId !== "string" || !classId) {
    return NextResponse.json({ error: "Missing class id." }, { status: 400 });
  }
  const ok = await deleteClass(auth.userId, classId);
  if (!ok) return NextResponse.json({ error: "Could not delete the class." }, { status: 500 });
  return NextResponse.json({ success: true });
}

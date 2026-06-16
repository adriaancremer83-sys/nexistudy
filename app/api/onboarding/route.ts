import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { updateOnboarding } from "@/lib/users";

const VALID_GRADES = ["Grade 8", "Grade 9", "Grade 10", "Grade 11", "Grade 12"];

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  }

  const { language, grade, school, subjects } = await req.json();

  if (typeof language !== "string" || !language.trim()) {
    return NextResponse.json({ error: "Please choose your language." }, { status: 400 });
  }
  if (!VALID_GRADES.includes(grade)) {
    return NextResponse.json({ error: "Please choose your grade." }, { status: 400 });
  }
  if (!Array.isArray(subjects) || subjects.length === 0) {
    return NextResponse.json({ error: "Pick at least one subject." }, { status: 400 });
  }

  const cleanSubjects = [...new Set(subjects.filter((s) => typeof s === "string" && s.trim()))].slice(0, 12);

  const ok = await updateOnboarding(session.user.id, {
    language: language.trim(),
    grade,
    school: typeof school === "string" ? school.trim() : "",
    subjects: cleanSubjects,
  });

  if (!ok) {
    return NextResponse.json(
      { error: "Could not save your setup. Please try again." },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}

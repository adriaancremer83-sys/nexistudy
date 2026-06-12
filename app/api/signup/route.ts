import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { findUser, createUser } from "@/lib/users";

const VALID_GRADES = ["Grade 8", "Grade 9", "Grade 10", "Grade 11", "Grade 12"];
const VALID_CURRICULA = ["CAPS", "IEB", "Cambridge"];

export async function POST(req: NextRequest) {
  const { name, email, password, grade, curriculum } = await req.json();

  if (!name?.trim() || !email?.trim() || !password?.trim()) {
    return NextResponse.json({ error: "All fields are required." }, { status: 400 });
  }

  if (!VALID_GRADES.includes(grade)) {
    return NextResponse.json({ error: "Please select your grade." }, { status: 400 });
  }

  if (!VALID_CURRICULA.includes(curriculum)) {
    return NextResponse.json({ error: "Please select your curriculum." }, { status: 400 });
  }

  if (password.length < 6) {
    return NextResponse.json({ error: "Password must be at least 6 characters." }, { status: 400 });
  }

  if (await findUser(email)) {
    return NextResponse.json({ error: "An account with this email already exists." }, { status: 409 });
  }

  const hash = bcrypt.hashSync(password, 10);
  const user = await createUser({
    name: name.trim(),
    email: email.trim().toLowerCase(),
    password: hash,
    plan: "free",
    apsScore: 0,
    grade,
    curriculum,
    role: "learner",
    school: "",
  });

  if (!user) {
    return NextResponse.json({ error: "Could not create your account. Please try again." }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { findUser, createUser } from "@/lib/users";

export async function POST(req: NextRequest) {
  const { name, email, password } = await req.json();

  if (!name?.trim() || !email?.trim() || !password?.trim()) {
    return NextResponse.json({ error: "All fields are required." }, { status: 400 });
  }

  if (password.length < 6) {
    return NextResponse.json({ error: "Password must be at least 6 characters." }, { status: 400 });
  }

  if (findUser(email)) {
    return NextResponse.json({ error: "An account with this email already exists." }, { status: 409 });
  }

  const hash = bcrypt.hashSync(password, 10);
  createUser({
    name: name.trim(),
    email: email.trim().toLowerCase(),
    password: hash,
    plan: "free",
    apsScore: 0,
    grade: "Grade 12",
    curriculum: "CAPS",
  });

  return NextResponse.json({ success: true });
}

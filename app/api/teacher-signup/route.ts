import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { findUser, createUser } from "@/lib/users";
import { rateLimit, clientIp } from "@/lib/rateLimit";

export async function POST(req: NextRequest) {
  if (!rateLimit(`tsignup:${clientIp(req)}`, 5, 60 * 60 * 1000)) {
    return NextResponse.json(
      { error: "Too many signup attempts. Please try again later." },
      { status: 429 }
    );
  }

  const { name, email, password, school } = await req.json();

  if (!name?.trim() || !email?.trim() || !password?.trim() || !school?.trim()) {
    return NextResponse.json({ error: "All fields are required." }, { status: 400 });
  }

  if (password.length < 8) {
    return NextResponse.json({ error: "Password must be at least 8 characters." }, { status: 400 });
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
    grade: "",
    curriculum: "CAPS",
    role: "teacher",
    school: school.trim(),
  });

  if (!user) {
    return NextResponse.json({ error: "Could not create your account. Please try again." }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

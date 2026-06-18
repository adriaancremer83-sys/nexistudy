import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { listReviewsForAdmin, setReviewStatus } from "@/lib/reviews";

export const dynamic = "force-dynamic";

async function requireAdmin() {
  const session = await getServerSession(authOptions);
  const adminEmail = process.env.ADMIN_EMAIL?.toLowerCase();
  if (!adminEmail || session?.user?.email?.toLowerCase() !== adminEmail) {
    return false;
  }
  return true;
}

export async function GET() {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }
  const reviews = await listReviewsForAdmin();
  return NextResponse.json({ reviews });
}

export async function POST(req: NextRequest) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }
  const { id, status } = await req.json();
  if (typeof id !== "string" || !["approved", "hidden", "pending"].includes(status)) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  const ok = await setReviewStatus(id, status);
  if (!ok) return NextResponse.json({ error: "Could not update review." }, { status: 500 });
  return NextResponse.json({ success: true });
}

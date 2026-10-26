import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { rateLimit, clientIp } from "@/lib/rateLimit";

// 2027 Survival Pack waitlist (see supabase-pack-waitlist-setup.sql). No auth —
// parents join with just an email, same as guest checkout.
export async function POST(req: NextRequest) {
  if (!rateLimit(`pack-waitlist:${clientIp(req)}`, 5, 60 * 1000)) {
    return NextResponse.json({ error: "Too many tries — please wait a minute." }, { status: 429 });
  }

  let email = "";
  let language: "en" | "af" = "en";
  try {
    const body = await req.json();
    email = String(body?.email ?? "").trim().toLowerCase();
    if (body?.language === "af") language = "af";
  } catch {
    /* fall through to validation */
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  const { error } = await supabaseAdmin
    .from("pack_waitlist")
    .upsert({ email, language }, { onConflict: "email" });
  if (error) {
    console.error("pack waitlist insert failed:", error.message);
    return NextResponse.json({ error: "Couldn't save that. Please try again." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

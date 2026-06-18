import { NextRequest, NextResponse } from "next/server";
import { recordPageView } from "@/lib/analytics";

export const dynamic = "force-dynamic";

// Fire-and-forget page-view beacon from the client. No auth — anyone browsing
// the public site is counted. Stores only an anonymous visitor id + path.
export async function POST(req: NextRequest) {
  try {
    const { path, visitor } = await req.json();
    if (typeof path !== "string" || !path) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }
    await recordPageView(path, typeof visitor === "string" ? visitor : "");
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  return NextResponse.json({ ok: true });
}

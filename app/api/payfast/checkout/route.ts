import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { findUserById } from "@/lib/users";
import { buildCheckout, payfastConfig } from "@/lib/payfast";

// Needs Node (crypto + dns in lib/payfast), not the edge runtime.
export const runtime = "nodejs";

// Returns the signed PayFast fields + process URL for the logged-in user. The
// client posts these to PayFast as a form. m_payment_id is unique per attempt
// and custom_str1 carries the user id so the ITN maps back to this account.
export async function POST() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Please sign in to upgrade." }, { status: 401 });
  }

  const cfg = payfastConfig();
  if (!cfg.merchantId || !cfg.merchantKey) {
    return NextResponse.json(
      { error: "Payments aren't configured yet. Please try again later." },
      { status: 503 }
    );
  }

  const user = await findUserById(session.user.id);
  if (!user) {
    return NextResponse.json({ error: "Account not found." }, { status: 404 });
  }
  if (user.plan === "premium") {
    return NextResponse.json({ error: "You're already on Premium." }, { status: 400 });
  }

  const nameParts = user.name.trim().split(/\s+/);
  const firstName = nameParts[0] || "NexiStudy";
  const lastName = nameParts.slice(1).join(" ") || "Learner";

  const { processUrl, fields } = buildCheckout({
    id: user.id,
    email: user.email,
    firstName,
    lastName,
  });

  return NextResponse.json({ processUrl, fields });
}

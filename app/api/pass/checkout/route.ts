import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { buildPassCheckout, payfastConfig } from "@/lib/payfast";
import { createPendingPass, findLearnerByPayCode, findPass } from "@/lib/passes";
import { findUserById } from "@/lib/users";
import { rateLimit, clientIp } from "@/lib/rateLimit";

// Needs Node (crypto in lib/payfast), not the edge runtime.
export const runtime = "nodejs";

// Starts a once-off Premium pass payment. Two ways in:
//  - { pass, code, email }  a parent (no login) paying via the learner's
//                           /gift/<code> link — email is required for the receipt
//  - { pass, email? }       a logged-in learner paying for themselves
// Returns { processUrl, fields } for the client to POST to PayFast, same shape
// as /api/pack/checkout. The price always comes from lib/passes, never the client.
export async function POST(req: NextRequest) {
  if (!rateLimit(`pass-checkout:${clientIp(req)}`, 10, 60 * 1000)) {
    return NextResponse.json({ error: "Too many tries — please wait a minute." }, { status: 429 });
  }

  const cfg = payfastConfig();
  if (!cfg.merchantId || !cfg.merchantKey) {
    return NextResponse.json(
      { error: "Payments aren't configured yet. Please try again later." },
      { status: 503 }
    );
  }

  let body: { pass?: unknown; code?: unknown; email?: unknown } = {};
  try {
    body = await req.json();
  } catch {
    /* validated below */
  }

  const pass = findPass(String(body.pass ?? ""));
  if (!pass) {
    return NextResponse.json({ error: "Please choose a pass." }, { status: 400 });
  }

  let userId: string;
  let email = String(body.email ?? "").trim().toLowerCase();
  let paidByParent = false;
  let returnPath: string;
  let cancelPath: string;

  const code = String(body.code ?? "").trim();
  if (code) {
    const learner = await findLearnerByPayCode(code);
    if (!learner) {
      return NextResponse.json({ error: "This payment link isn't valid." }, { status: 404 });
    }
    userId = learner.id;
    paidByParent = true;
    returnPath = `/gift/${code}?paid=1`;
    cancelPath = `/gift/${code}?cancelled=1`;
  } else {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Please sign in first." }, { status: 401 });
    }
    const user = await findUserById(session.user.id);
    if (!user) {
      return NextResponse.json({ error: "Account not found." }, { status: 404 });
    }
    userId = user.id;
    if (!email) email = user.email;
    returnPath = "/account?upgrade=success";
    cancelPath = "/pricing?cancelled=1";
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address — your receipt goes there." },
      { status: 400 }
    );
  }

  const purchase = await createPendingPass({ userId, pass, payerEmail: email, paidByParent });
  if (!purchase) {
    return NextResponse.json({ error: "Couldn't start checkout. Please try again." }, { status: 500 });
  }

  const { processUrl, fields } = buildPassCheckout({
    passId: purchase.id,
    email,
    amountCents: pass.priceCents,
    itemName: `NexiStudy Premium — ${pass.name}`,
    returnPath,
    cancelPath,
  });

  return NextResponse.json({ processUrl, fields });
}

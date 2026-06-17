import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { getSubscription, markCancelled } from "@/lib/users";
import { cancelSubscription } from "@/lib/payfast";

export const runtime = "nodejs";

// Cancels the learner's PayFast subscription via the recurring-billing API, then
// marks it cancelled locally. We keep premium access until the paid month lapses
// — the next (now absent) renewal ITN, or a cancellation ITN, drops them to free.
export async function POST() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Please sign in." }, { status: 401 });
  }

  const sub = await getSubscription(session.user.id);
  if (sub.plan !== "premium" && sub.status !== "active") {
    return NextResponse.json(
      { error: "You don't have an active subscription to cancel." },
      { status: 400 }
    );
  }
  if (!sub.token) {
    return NextResponse.json(
      {
        error:
          "We couldn't find your subscription token yet. If you just subscribed, " +
          "give it a minute and try again, or contact support@nexistudy.co.za.",
      },
      { status: 409 }
    );
  }

  const result = await cancelSubscription(sub.token);
  if (!result.ok) {
    return NextResponse.json(
      { error: `PayFast couldn't cancel the subscription: ${result.message}` },
      { status: 502 }
    );
  }

  await markCancelled(session.user.id);
  return NextResponse.json({
    success: true,
    message:
      "Your subscription is cancelled. You'll keep Premium until the end of your " +
      "current billing month, then move to the Free plan.",
  });
}

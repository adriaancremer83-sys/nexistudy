import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { buildPackCheckout, payfastConfig } from "@/lib/payfast";
import { createPendingPurchase, getActiveProduct, MATRIC_PACK_SLUG } from "@/lib/pack";

// Needs Node (crypto in lib/payfast), not the edge runtime.
export const runtime = "nodejs";

// Guest checkout is allowed: all we need is an email. If the buyer happens to
// be logged in, the purchase is also linked to their account. Returns the same
// { processUrl, fields } shape as /api/payfast/checkout so the client can POST
// a hidden form to PayFast (see components/SubscribeButton.tsx).
export async function POST(req: NextRequest) {
  const cfg = payfastConfig();
  if (!cfg.merchantId || !cfg.merchantKey) {
    return NextResponse.json(
      { error: "Payments aren't configured yet. Please try again later." },
      { status: 503 }
    );
  }

  let email = "";
  try {
    const body = await req.json();
    email = String(body?.email ?? "").trim().toLowerCase();
  } catch {
    /* fall through to validation */
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address — the pack is delivered there." },
      { status: 400 }
    );
  }

  // Optional account link — never required (parents buy with just an email).
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id ?? null;

  const product = await getActiveProduct(MATRIC_PACK_SLUG);
  if (!product) {
    return NextResponse.json(
      { error: "The Survival Pack isn't available right now." },
      { status: 503 }
    );
  }

  // Price always comes from the product row — the client never sends an amount.
  const purchase = await createPendingPurchase({
    productId: product.id,
    email,
    userId,
    amountCents: product.price_cents,
  });
  if (!purchase) {
    return NextResponse.json(
      { error: "Couldn't start checkout. Please try again." },
      { status: 500 }
    );
  }

  const { processUrl, fields } = buildPackCheckout({
    purchaseId: purchase.id,
    email,
    amountCents: product.price_cents,
    itemName: product.name,
    downloadToken: purchase.download_token,
  });

  return NextResponse.json({ processUrl, fields });
}

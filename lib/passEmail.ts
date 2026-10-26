import { supabaseAdmin } from "./supabase";
import type { PassPurchase } from "./passes";

// Receipt for a Premium pass, sent by the pass ITN after a verified payment.
// Goes to the payer, plus the learner's own address when a parent paid. Same
// Resend HTTP API + sender as the pack delivery email. Best effort: a mail
// failure never fails the ITN.

const NAVY = "#0A1628";
const GOLD = "#FFB454";

function siteUrl(): string {
  return (
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.NEXTAUTH_URL ??
    "https://www.nexistudy.co.za"
  ).replace(/\/$/, "");
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-ZA", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Africa/Johannesburg",
  });
}

export async function sendPassReceiptEmail(params: {
  purchase: PassPurchase;
  premiumUntil: string;
}): Promise<void> {
  const apiKey = (process.env.RESEND_API_KEY ?? "").trim();
  const from =
    (process.env.PACK_EMAIL_FROM ?? "").trim() || "NexiStudy <onboarding@resend.dev>";
  if (!apiKey) {
    console.warn("[pass] RESEND_API_KEY not set — receipt skipped");
    return;
  }

  const { purchase } = params;
  const { data: learner } = await supabaseAdmin
    .from("users")
    .select("name, email")
    .eq("id", purchase.user_id)
    .maybeSingle();
  // Names are user-entered — escape before they go into HTML.
  const firstName = (String(learner?.name ?? "").trim().split(/\s+/)[0] || "your learner").replace(
    /[<>&"']/g,
    ""
  );
  const until = formatDate(params.premiumUntil);
  const amount = `R${(purchase.amount_cents / 100).toFixed(2)}`;
  const studyUrl = `${siteUrl()}/nexi-tutor`;

  const headline = purchase.paid_by_parent
    ? `${firstName} now has NexiStudy Premium 🎉`
    : "You're on NexiStudy Premium 🎉";
  const intro = purchase.paid_by_parent
    ? `Thank you! ${firstName}'s Premium is active until <b>${until}</b>. It doesn't renew automatically — nothing more will be charged.`
    : `Your Premium is active until <b>${until}</b>. It doesn't renew automatically — nothing more will be charged.`;

  const html = `<!doctype html><html><body style="margin:0;background:#f4f6fb;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6fb;padding:24px 0;"><tr><td align="center">
<table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;background:#ffffff;border-radius:12px;overflow:hidden;">
<tr><td style="background:${NAVY};padding:20px 28px;font-family:Arial,Helvetica,sans-serif;font-size:20px;font-weight:bold;color:#ffffff;">NexiStudy</td></tr>
<tr><td style="padding:28px;font-family:Arial,Helvetica,sans-serif;color:${NAVY};">
<h1 style="margin:0 0 14px;font-size:22px;line-height:30px;">${headline}</h1>
<p style="margin:0 0 18px;font-size:15px;line-height:23px;">${intro}</p>
<table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 22px;font-size:14px;line-height:22px;">
<tr><td style="padding-right:18px;color:#5b6475;">Pass</td><td><b>Premium — ${purchase.days} days</b></td></tr>
<tr><td style="padding-right:18px;color:#5b6475;">Paid</td><td><b>${amount}</b></td></tr>
<tr><td style="padding-right:18px;color:#5b6475;">Premium until</td><td><b>${until}</b></td></tr>
</table>
<a href="${studyUrl}" style="display:inline-block;background:${GOLD};color:${NAVY};font-weight:bold;font-size:15px;text-decoration:none;padding:12px 24px;border-radius:8px;">Start studying with Nexi</a>
<p style="margin:22px 0 0;font-size:12px;line-height:18px;color:#5b6475;">Questions? Reply to this email or write to support@nexistudy.co.za.</p>
</td></tr></table></td></tr></table></body></html>`;

  const text = [
    headline.replace(" 🎉", ""),
    "",
    intro.replace(/<\/?b>/g, ""),
    "",
    `Pass: Premium — ${purchase.days} days`,
    `Paid: ${amount}`,
    `Premium until: ${until}`,
    "",
    `Start studying: ${studyUrl}`,
  ].join("\n");

  const to = new Set([purchase.payer_email]);
  if (purchase.paid_by_parent && learner?.email) to.add(String(learner.email).toLowerCase());

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [...to],
        subject: purchase.paid_by_parent
          ? `${firstName}'s NexiStudy Premium is active`
          : "Your NexiStudy Premium is active",
        html,
        text,
      }),
    });
    if (!res.ok) console.error("[pass] Resend send failed:", res.status, await res.text());
  } catch (err) {
    console.error("[pass] Resend request error:", err);
  }
}

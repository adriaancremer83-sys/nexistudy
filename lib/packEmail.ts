// ─────────────────────────────────────────────────────────────────────────────
// Survival Pack delivery email, sent by the ITN webhook after a payment is
// verified. Uses Resend's plain HTTP API (no SDK dependency). Server-side only.
//
// Env:
//   RESEND_API_KEY   required to actually send; without it we log and no-op so
//                    the webhook never fails because of email config
//   PACK_EMAIL_FROM  verified sender, e.g. "NexiStudy <pack@nexistudy.co.za>"
//
// Per spec, the email carries a LINK to the token-gated download page — never
// attachments, never direct file URLs.
// ─────────────────────────────────────────────────────────────────────────────

function siteUrl(): string {
  return (
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.NEXTAUTH_URL ??
    "http://localhost:3000"
  ).replace(/\/$/, "");
}

export async function sendPackDeliveryEmail(params: {
  to: string;
  downloadToken: string;
}): Promise<boolean> {
  const apiKey = (process.env.RESEND_API_KEY ?? "").trim();
  const from =
    (process.env.PACK_EMAIL_FROM ?? "").trim() ||
    "NexiStudy <onboarding@resend.dev>";
  const downloadUrl = `${siteUrl()}/pack/success?token=${params.downloadToken}`;

  if (!apiKey) {
    console.warn(
      "[pack] RESEND_API_KEY not set — delivery email skipped. Download link:",
      downloadUrl
    );
    return false;
  }

  const html = `
  <div style="font-family: -apple-system, 'Segoe UI', Roboto, Arial, sans-serif; max-width: 560px; margin: 0 auto; padding: 24px; color: #1a1a2e;">
    <h1 style="font-size: 22px; margin: 0 0 4px;">Your Survival Pack is ready 🎒</h1>
    <p style="color: #555; margin: 0 0 20px;">NexiStudy Matric Prelim Survival Pack</p>
    <p>Thank you for your purchase! Your bilingual pack — the 7-Week Countdown Planner,
    all 10 Subject Strategy Sheets, the APS Target Worksheet, the Parents' Guide and
    the Sunday check-in scripts — is waiting for you.</p>
    <p style="text-align: center; margin: 28px 0;">
      <a href="${downloadUrl}"
         style="background: #00D4FF; color: #0a0a1a; text-decoration: none; font-weight: 700; padding: 14px 28px; border-radius: 10px; display: inline-block;">
        Download your pack
      </a>
    </p>
    <p style="font-size: 13px; color: #777;">This link is yours — keep this email safe.
    You can come back and download the documents again any time.</p>
    <p style="font-size: 13px; color: #777;">Prelims: 29 August. Every mark is a decision.</p>
    <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;" />
    <p style="font-size: 12px; color: #999;">NexiStudy · nexistudy.co.za · Grades 8–12, CAPS-aligned</p>
  </div>`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [params.to],
        subject: "Your Matric Prelim Survival Pack — download inside",
        html,
      }),
    });
    if (!res.ok) {
      console.error("[pack] Resend send failed:", res.status, await res.text());
      return false;
    }
    return true;
  } catch (err) {
    console.error("[pack] Resend request error:", err);
    return false;
  }
}

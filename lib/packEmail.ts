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
//
// Layout is table-based with inline CSS only (email clients ignore <style>).
// The copy is EN-only: purchases don't record which language toggle the buyer
// used, and the pack itself is bilingual either way.
// ─────────────────────────────────────────────────────────────────────────────

function siteUrl(): string {
  return (
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.NEXTAUTH_URL ??
    "http://localhost:3000"
  ).replace(/\/$/, "");
}

const NAVY = "#0A1628";
const GOLD = "#e8a13a";
const PAGE_BG = "#f6f7fb";

const COMPONENTS = [
  "The 7-Week Countdown Planner",
  "The Subject Strategy Sheets",
  "The APS Target Worksheet",
  "The Parents' Guide",
  "The Sunday WhatsApp Scripts",
];

export function renderPackEmail(downloadUrl: string): {
  subject: string;
  html: string;
  text: string;
} {
  const logoUrl = `${siteUrl()}/images/nexi-logo-new.png`;

  const componentRows = COMPONENTS.map(
    (name) => `
        <tr>
          <td width="18" valign="top" style="padding:3px 0;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:22px;color:${GOLD};font-weight:bold;">&bull;</td>
          <td style="padding:3px 0;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:22px;color:#33415c;">${name}</td>
        </tr>`
  ).join("");

  const html = `<!doctype html>
<html>
<body style="margin:0;padding:0;background-color:${PAGE_BG};">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:${PAGE_BG};">
    <tr>
      <td align="center" style="padding:28px 12px;">
        <table role="presentation" width="560" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;width:100%;background-color:#ffffff;border-radius:12px;overflow:hidden;">

          <!-- Header band -->
          <tr>
            <td align="center" style="background-color:${NAVY};padding:22px 32px;">
              <img src="${logoUrl}" alt="NexiStudy" height="34" style="display:block;height:34px;border:0;color:#ffffff;font-family:Arial,Helvetica,sans-serif;font-size:20px;font-weight:bold;" />
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:32px 32px 8px;">
              <p style="margin:0 0 4px;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:18px;letter-spacing:2px;text-transform:uppercase;color:${GOLD};font-weight:bold;">Matric Prelim Survival Pack</p>
              <h1 style="margin:0 0 16px;font-family:Arial,Helvetica,sans-serif;font-size:24px;line-height:32px;color:${NAVY};">Your Survival Pack is ready 🎒</h1>
              <p style="margin:0 0 14px;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:23px;color:#33415c;">Thank you for your purchase! Everything is ready to download, in English and Afrikaans:</p>
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 8px;">
                ${componentRows}
              </table>
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td align="center" style="padding:20px 32px 8px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="center" bgcolor="${GOLD}" style="border-radius:10px;">
                    <a href="${downloadUrl}" style="display:inline-block;padding:14px 36px;font-family:Arial,Helvetica,sans-serif;font-size:16px;font-weight:bold;color:${NAVY};text-decoration:none;border-radius:10px;">Download your pack</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding:16px 32px 28px;">
              <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:20px;color:#7a8699;">This link is yours — keep this email safe. You can come back and download the documents again any time.</p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:18px 32px;border-top:1px solid #e7eaf3;">
              <p style="margin:0 0 4px;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:20px;color:${NAVY};font-weight:bold;">Prelims: 29 August. Every mark is a decision.</p>
              <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:18px;color:#7a8699;"><a href="${siteUrl()}" style="color:#7a8699;text-decoration:underline;">nexistudy.co.za</a></p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  const text = [
    "Your Survival Pack is ready",
    "",
    "Thank you for your purchase! Everything is ready to download, in English and Afrikaans:",
    ...COMPONENTS.map((name) => `- ${name}`),
    "",
    `Download your pack: ${downloadUrl}`,
    "",
    "This link is yours — keep this email safe. You can come back and download the documents again any time.",
    "",
    "Prelims: 29 August. Every mark is a decision.",
    "nexistudy.co.za",
  ].join("\n");

  return {
    subject: "Your Matric Prelim Survival Pack — download inside",
    html,
    text,
  };
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

  const { subject, html, text } = renderPackEmail(downloadUrl);

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
        subject,
        html,
        text,
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

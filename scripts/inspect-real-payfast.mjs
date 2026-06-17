// Dump the ACTUAL signature base string our app produces with the REAL
// .env.local credentials, and flag byte-level anomalies that cause PayFast's
// "Generated signature does not match submitted signature".
//
// Run:  node --env-file=.env.local scripts/inspect-real-payfast.mjs
import { buildCheckout, payfastConfig, signatureBaseString } from "../lib/payfast.ts";

const cfg = payfastConfig();

function showRaw(label, v) {
  const s = String(v ?? "");
  const hasEdgeWs = s !== s.trim();
  const nonAscii = [...s].filter((c) => c.charCodeAt(0) > 126).map((c) => c.charCodeAt(0).toString(16));
  console.log(
    `  ${label.padEnd(14)} len=${s.length}` +
      (hasEdgeWs ? "  ⚠ EDGE-WHITESPACE" : "") +
      (nonAscii.length ? `  ⚠ non-ascii[${nonAscii.join(",")}]` : "") +
      `  value=${JSON.stringify(s)}`
  );
}

console.log("=== Resolved PayFast config (from .env.local) ===");
console.log(`  mode:        ${cfg.sandbox ? "sandbox" : "LIVE"}`);
showRaw("merchant_id", cfg.merchantId);
showRaw("merchant_key", cfg.merchantKey);
console.log(
  `  passphrase:    ${cfg.passphrase ? `SET (len=${cfg.passphrase.length}) ${JSON.stringify(cfg.passphrase)}` : "(empty / not used)"}`
);
console.log(`  processUrl:  ${cfg.processUrl}`);
console.log(`  NEXT_PUBLIC_SITE_URL: ${JSON.stringify(process.env.NEXT_PUBLIC_SITE_URL ?? null)}`);
console.log(`  NEXTAUTH_URL:         ${JSON.stringify(process.env.NEXTAUTH_URL ?? null)}`);
console.log("");

// A representative user. Swap in a real failing name/email if one is suspected.
const user = {
  id: "8f14e45f-ceea-467a-9f0a-1234567890ab",
  email: "adriaancremer28@gmail.com",
  firstName: "Adriaan",
  lastName: "Cremer",
};

const { processUrl, fields } = buildCheckout(user);

console.log("=== Fields posted to PayFast (signature is appended LAST) ===");
for (const [k, v] of Object.entries(fields)) showRaw(k, v);
console.log("");

const pairs = Object.entries(fields).filter(([k]) => k !== "signature");
const base = signatureBaseString(pairs, cfg.passphrase);
console.log("=== Exact base string we MD5 (this is what must match PayFast) ===");
console.log(base);
console.log("");
console.log(`signature we submit: ${fields.signature}`);
console.log(`process URL:         ${processUrl}`);
console.log("");
console.log("If every field above is clean (no ⚠), the passphrase matches the");
console.log("sandbox account EXACTLY, and the signature still mismatches, the");
console.log("remaining cause is account-side config, not this base string.");

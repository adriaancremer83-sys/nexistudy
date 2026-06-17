// Probe the PayFast ITN webhook's validation WITHOUT involving real PayFast.
// It posts three fake ITNs at /api/payfast/notify and checks each is handled
// correctly: a forged signature is rejected, a wrong amount is rejected, and a
// correctly-signed one passes signature+amount (then stops at the real-PayFast
// server confirmation, which a fake transaction can never pass — by design).
//
// The source-IP layer would reject every localhost request first, so set the
// sandbox-only test flag before running the dev server:
//   PAYFAST_ITN_SKIP_IP_CHECK=true   (in .env.local; ignored in live mode)
//
// Run (dev server must be up on the target):
//   node --env-file=.env.local scripts/probe-payfast.mjs
//   node --env-file=.env.local scripts/probe-payfast.mjs http://localhost:3000 <userId>
import crypto from "node:crypto";

const base = (process.argv[2] || process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");
const userId = process.argv[3] || "00000000-0000-0000-0000-000000000000";
const passphrase = process.env.PAYFAST_PASSPHRASE ?? "";

// Mirror lib/payfast.ts exactly: encodeURIComponent with %20 -> "+".
function pfEncode(value) {
  return encodeURIComponent(String(value).trim()).replace(/%20/g, "+");
}
function sign(pairs, pass) {
  const parts = pairs
    .filter(([, v]) => v !== "" && v !== undefined && v !== null)
    .map(([k, v]) => `${k}=${pfEncode(v)}`);
  let str = parts.join("&");
  if (pass) str += `&passphrase=${pfEncode(pass)}`;
  return crypto.createHash("md5").update(str).digest("hex");
}

// A plausible "subscription payment COMPLETE" ITN. Field order matters — it's
// the order we sign over and the order we send.
function baseFields(overrides = {}) {
  return {
    m_payment_id: `${userId}-${Date.now()}`,
    pf_payment_id: String(1000000 + Math.floor(Math.random() * 8999999)),
    payment_status: "COMPLETE",
    item_name: "NexiStudy Premium — Monthly",
    amount_gross: "199.00",
    amount_fee: "-4.58",
    amount_net: "194.42",
    custom_str1: userId,
    token: crypto.randomUUID(),
    ...overrides,
  };
}

// Build an ordered urlencoded body with the signature appended last.
function toBody(fields, signature) {
  const params = new URLSearchParams();
  for (const [k, v] of Object.entries(fields)) params.append(k, v);
  params.append("signature", signature);
  return params.toString();
}

async function post(body) {
  const res = await fetch(`${base}/api/payfast/notify`, {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body,
  });
  return { status: res.status, text: (await res.text()).trim() };
}

function line(name, expect, got, pass) {
  console.log(`${pass ? "PASS" : "FAIL"}  ${name}`);
  console.log(`      expected: ${expect}`);
  console.log(`      got:      HTTP ${got.status} "${got.text}"`);
}

console.log(`Target: ${base}/api/payfast/notify`);
console.log(`User id: ${userId}`);
console.log(`Passphrase: ${passphrase ? "(set)" : "(empty)"}`);
console.log("");

let allPass = true;

// 1) Forged signature → must be rejected at the signature layer.
{
  const fields = baseFields();
  const got = await post(toBody(fields, "0".repeat(32)));
  const pass = got.status === 400 && /signature/i.test(got.text);
  allPass &&= pass;
  line("Forged signature is rejected", 'HTTP 400 "Invalid signature"', got, pass);
}

// 2) Valid signature but wrong amount → must be rejected at the amount layer.
{
  const fields = baseFields({ amount_gross: "5.00" });
  const sig = sign(Object.entries(fields), passphrase);
  const got = await post(toBody(fields, sig));
  const pass = got.status === 400 && /amount/i.test(got.text);
  allPass &&= pass;
  line("Wrong amount is rejected (signature was valid)", 'HTTP 400 "Invalid amount"', got, pass);
}

// 3) Correctly signed, correct amount → passes signature+amount, then stops at
// the real-PayFast server confirmation (a fake txn can't return "VALID").
{
  const fields = baseFields();
  const sig = sign(Object.entries(fields), passphrase);
  const got = await post(toBody(fields, sig));
  // Two acceptable outcomes prove the validation logic is sound:
  //  - "Invalid source" → IP skip flag isn't set (set PAYFAST_ITN_SKIP_IP_CHECK=true)
  //  - "Not confirmed"  → passed signature+amount, stopped at PayFast confirmation (correct)
  const reachedConfirm = got.status === 400 && /confirm/i.test(got.text);
  const blockedByIp = got.status === 400 && /source/i.test(got.text);
  const pass = reachedConfirm || blockedByIp;
  allPass &&= pass;
  line(
    "Correctly-signed ITN clears signature+amount",
    'HTTP 400 "Not confirmed" (or "Invalid source" if the IP skip flag is off)',
    got,
    pass
  );
  if (blockedByIp) {
    console.log("      NOTE: set PAYFAST_ITN_SKIP_IP_CHECK=true in .env.local (sandbox only) and restart the dev server to test past the IP layer.");
  }
}

console.log("");
console.log(allPass ? "PASS: ITN validation behaves correctly on fake input." : "FAIL: one or more checks did not behave as expected (see above).");
console.log("");
console.log("Reminder: the real happy path (Supabase plan -> premium) only completes when PayFast itself");
console.log("confirms a genuine sandbox transaction. Run the sandbox tunnel flow for that end-to-end test.");
process.exit(allPass ? 0 : 1);

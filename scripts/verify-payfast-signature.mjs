// Byte-for-byte verification of our PayFast checkout signature against a verbatim
// copy of PayFast's OFFICIAL Node.js reference (the `generateSignature` snippet
// from developers.payfast.co.za, identical to the codersconcepts/SDK community
// implementations).
//
// It imports the REAL functions from ../lib/payfast.ts (Node 24 strips the TS
// types) — not a re-typed copy — so a match proves the shipping code is correct.
//
// Run:  node scripts/verify-payfast-signature.mjs
import crypto from "node:crypto";
import { signature, signatureBaseString } from "../lib/payfast.ts";

// ── 1) PayFast's OFFICIAL reference implementation, pasted verbatim ──────────
// Source: PayFast developer docs "Generate signature" (Node.js) — the canonical
// pfOutput loop. Encodes with encodeURIComponent + %20→"+", trims values, drops
// blanks, appends &passphrase=<encoded> only when a passphrase is supplied, and
// MD5-hashes the resulting (already-encoded) string.
const generateSignature = (data, passPhrase = null) => {
  let pfOutput = "";
  for (let key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      if (data[key] !== "") {
        pfOutput += `${key}=${encodeURIComponent(data[key].trim()).replace(/%20/g, "+")}&`;
      }
    }
  }
  // Remove last ampersand
  let getString = pfOutput.slice(0, -1);
  if (passPhrase !== null) {
    getString += `&passphrase=${encodeURIComponent(passPhrase.trim()).replace(/%20/g, "+")}`;
  }
  return { base: getString, md5: crypto.createHash("md5").update(getString).digest("hex") };
};

// ── 2) The EXACT field set & order our buildCheckout() sends ────────────────
// Fixed test values (so the run is reproducible) covering the tricky cases:
// spaces, an em-dash (multi-byte UTF-8), an email "@", a UUID custom_str1.
const SITE = "https://nexistudy.co.za";
const fields = {
  merchant_id: "10000100",
  merchant_key: "46f0cd694581a",
  return_url: `${SITE}/account?upgrade=success`,
  cancel_url: `${SITE}/pricing?upgrade=cancelled`,
  notify_url: `${SITE}/api/payfast/notify`,
  name_first: "Adriaan",
  name_last: "Cremer",
  email_address: "adriaancremer28@gmail.com",
  m_payment_id: "8f14e45f-ceea-467a-9f0a-1234567890ab-1718700000000",
  amount: "199.00",
  item_name: "NexiStudy Premium — Monthly",
  custom_str1: "8f14e45f-ceea-467a-9f0a-1234567890ab",
  subscription_type: "1",
  recurring_amount: "199.00",
  frequency: "3",
  cycles: "0",
};

// Test BOTH passphrase states — empty (sandbox default) and a value WITH a space
// (stresses the %20→"+" rule on the passphrase too).
const cases = [
  { label: "no passphrase", pass: "" },
  { label: "passphrase with space", pass: "my secret pass 123" },
];

function charDiff(a, b) {
  const n = Math.max(a.length, b.length);
  for (let i = 0; i < n; i++) {
    if (a[i] !== b[i]) {
      return {
        index: i,
        ours: JSON.stringify(a.slice(Math.max(0, i - 12), i + 13)),
        ref: JSON.stringify(b.slice(Math.max(0, i - 12), i + 13)),
        ourChar: JSON.stringify(a[i] ?? "<end>"),
        refChar: JSON.stringify(b[i] ?? "<end>"),
      };
    }
  }
  return null;
}

let allMatch = true;
const pairs = Object.entries(fields);

for (const { label, pass } of cases) {
  // Our REAL code (imported from lib/payfast.ts):
  const ourBase = signatureBaseString(pairs, pass);
  const ourSig = signature(pairs, pass);

  // Reference (passPhrase=null means "omit", matching our blank-passphrase path):
  const ref = generateSignature(fields, pass.trim() ? pass : null);

  const baseMatch = ourBase === ref.base;
  const sigMatch = ourSig === ref.md5;
  const ok = baseMatch && sigMatch;
  allMatch &&= ok;

  console.log("──────────────────────────────────────────────────────────────");
  console.log(`CASE: ${label}`);
  console.log(`  base string match: ${baseMatch ? "YES" : "NO"}`);
  console.log(`  MD5 match:         ${sigMatch ? "YES" : "NO"}`);
  console.log(`  our base: ${ourBase}`);
  console.log(`  ref base: ${ref.base}`);
  console.log(`  our md5:  ${ourSig}`);
  console.log(`  ref md5:  ${ref.md5}`);
  if (!baseMatch) {
    const d = charDiff(ourBase, ref.base);
    console.log(`  >>> FIRST DIFF at index ${d.index}: ours=${d.ourChar} ref=${d.refChar}`);
    console.log(`      ours …${d.ours}…`);
    console.log(`      ref  …${d.ref}…`);
  }
}

console.log("──────────────────────────────────────────────────────────────");
console.log(allMatch
  ? "RESULT: PASS — our signatures are byte-for-byte identical to PayFast's official reference."
  : "RESULT: FAIL — divergence found above.");
process.exit(allMatch ? 0 : 1);

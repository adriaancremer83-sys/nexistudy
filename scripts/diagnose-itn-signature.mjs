// Demonstrate WHY the incoming ITN signature check fails, using a reconstructed
// PayFast subscription ITN. PayFast's ITN posts buyer + unused custom fields as
// EMPTY strings and includes them in ITS signature. Our validator reuses
// signatureBaseString(), which DROPS empty fields — so the hashes diverge.
//
// (The exact field set/order PayFast sends can only be confirmed from the real
// body via logging; this reproduces the documented mechanism.)
//
// Run:  node --env-file=.env.local scripts/diagnose-itn-signature.mjs
import crypto from "node:crypto";
import { parseItn, itnSignatureValid, signatureBaseString } from "../lib/payfast.ts";

const passphrase = (process.env.PAYFAST_PASSPHRASE ?? "").trim();

// Same encoding PayFast/our code use.
const enc = (v) => encodeURIComponent(String(v).trim()).replace(/%20/g, "+");

// A realistic sandbox recurring-subscription COMPLETE ITN, in PayFast's posting
// order. Note the EMPTY fields PayFast echoes for data we never sent.
const itnFields = [
  ["m_payment_id", "8f14e45f-ceea-467a-9f0a-1234567890ab-1781737423502"],
  ["pf_payment_id", "1620224"],
  ["payment_status", "COMPLETE"],
  ["item_name", "NexiStudy Premium — Monthly"],
  ["item_description", ""],            // empty — we never sent one
  ["amount_gross", "199.00"],
  ["amount_fee", "-4.58"],
  ["amount_net", "194.42"],
  ["custom_str1", "8f14e45f-ceea-467a-9f0a-1234567890ab"],
  ["custom_str2", ""],                 // empty
  ["custom_str3", ""],                 // empty
  ["custom_str4", ""],                 // empty
  ["custom_str5", ""],                 // empty
  ["name_first", "Adriaan"],
  ["name_last", "Cremer"],
  ["email_address", "adriaancremer28@gmail.com"],
  ["merchant_id", "10000100"],
  ["token", "f9c84c1e-3b3a-4d6f-9e2a-1a2b3c4d5e6f"],
  ["billing_date", "2026-06-18"],
];

// ── How PayFast generates the ITN signature: ALL posted fields (except
// signature), in order, urlencoded, EMPTIES INCLUDED, then &passphrase=… ──────
function payfastItnSignature(fields, pass) {
  let s = fields.map(([k, v]) => `${k}=${enc(v)}`).join("&");
  if (pass) s += `&passphrase=${enc(pass)}`;
  return { base: s, md5: crypto.createHash("md5").update(s).digest("hex") };
}

const pf = payfastItnSignature(itnFields, passphrase);

// Build the raw POST body exactly as PayFast would send it (signature last).
const rawBody =
  itnFields.map(([k, v]) => `${k}=${enc(v)}`).join("&") + `&signature=${pf.md5}`;

// Now run OUR validator on that body.
const { data, ordered } = parseItn(rawBody);
const ourPairs = ordered.filter(([k]) => k !== "signature");
const ourBase = signatureBaseString(ourPairs, passphrase);
const ourMd5 = crypto.createHash("md5").update(ourBase).digest("hex");
const accepted = itnSignatureValid(ordered, data);

console.log(`passphrase: ${passphrase ? `SET "${passphrase}"` : "(empty)"}`);
console.log("");
console.log("PayFast's base string (empties INCLUDED):");
console.log("  " + pf.base);
console.log("");
console.log("OUR base string (empties DROPPED by signatureBaseString filter):");
console.log("  " + ourBase);
console.log("");
console.log(`PayFast signature (what arrives): ${pf.md5}`);
console.log(`OUR computed signature:           ${ourMd5}`);
console.log("");

// Show exactly which fields we dropped.
const dropped = itnFields.filter(([, v]) => v === "").map(([k]) => k);
console.log(`Fields PayFast signed but we DROPPED: ${dropped.join(", ") || "(none)"}`);
console.log("");
console.log(`itnSignatureValid() accepts this ITN? ${accepted ? "YES" : "NO  ← REJECTED"}`);
console.log("");

// Prove the fix: include empties → matches PayFast.
const fixedBase = ourPairs.map(([k, v]) => `${k}=${enc(v)}`).join("&") +
  (passphrase ? `&passphrase=${enc(passphrase)}` : "");
const fixedMd5 = crypto.createHash("md5").update(fixedBase).digest("hex");
console.log(`If we KEEP empties, our signature = ${fixedMd5}`);
console.log(`Matches PayFast? ${fixedMd5 === pf.md5 ? "YES — this is the fix" : "NO"}`);

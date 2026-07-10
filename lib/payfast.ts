import crypto from "crypto";
import dns from "dns/promises";

// ─────────────────────────────────────────────────────────────────────────────
// PayFast integration helpers.
//
// Everything here runs server-side only (Node runtime) — it touches the merchant
// key, the passphrase, and DNS. Never import this into a client component.
//
// Driven entirely by env vars so we can ship to sandbox first and flip to live
// by changing PAYFAST_MODE + the credentials, with no code change:
//   PAYFAST_MODE          "sandbox" (default) | "live"
//   PAYFAST_MERCHANT_ID   your merchant id
//   PAYFAST_MERCHANT_KEY  your merchant key
//   PAYFAST_PASSPHRASE    the salt passphrase set on your PayFast account (optional
//                         on sandbox, REQUIRED for the recurring/cancel API)
//   NEXT_PUBLIC_SITE_URL  public base url for return/cancel/notify callbacks
// ─────────────────────────────────────────────────────────────────────────────

export const PREMIUM_AMOUNT = "199.00";
export const PREMIUM_ITEM_NAME = "NexiStudy Premium — Monthly";

export function isSandbox(): boolean {
  return (process.env.PAYFAST_MODE ?? "sandbox").toLowerCase() !== "live";
}

export function payfastConfig() {
  const sandbox = isSandbox();
  return {
    sandbox,
    merchantId: (process.env.PAYFAST_MERCHANT_ID ?? "").trim(),
    merchantKey: (process.env.PAYFAST_MERCHANT_KEY ?? "").trim(),
    // Trim so a stray space in the env var becomes "" (= no passphrase) instead
    // of a truthy whitespace value that would corrupt every signature.
    passphrase: (process.env.PAYFAST_PASSPHRASE ?? "").trim(),
    // Where the learner is sent to pay.
    processUrl: sandbox
      ? "https://sandbox.payfast.co.za/eng/process"
      : "https://www.payfast.co.za/eng/process",
    // Server-to-server validation postback.
    validateUrl: sandbox
      ? "https://sandbox.payfast.co.za/eng/query/validate"
      : "https://www.payfast.co.za/eng/query/validate",
    // Recurring-billing API host (cancel/pause/fetch).
    apiHost: "https://api.payfast.co.za",
  };
}

function siteUrl(): string {
  return (
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.NEXTAUTH_URL ??
    "http://localhost:3000"
  ).replace(/\/$/, "");
}

// PayFast's exact urlencoding: encodeURIComponent, but spaces as "+".
// (This matches PayFast's published Node sample — the signature must be built
// with the identical encoding on both sides or validation fails.)
function pfEncode(value: string): string {
  return encodeURIComponent(value.trim()).replace(/%20/g, "+");
}

// The exact string PayFast hashes: ordered key=urlencode(value) pairs, blank
// values dropped, with &passphrase=... appended ONLY when a passphrase is set.
// Exposed so we can log it for debugging signature mismatches.
export function signatureBaseString(
  pairs: [string, string][],
  passphrase: string,
  opts: { keepEmpty?: boolean } = {}
): string {
  const parts = pairs
    // Outgoing checkout (keepEmpty=false): drop blank fields — PayFast's
    // documented outgoing rule, and we never send blanks anyway.
    // Incoming ITN (keepEmpty=true): PayFast signs EVERY posted field including
    // the empty ones it echoes back (item_description, unused custom_str2..5,
    // etc.). Dropping those makes our hash diverge from PayFast's and rejects
    // every valid ITN — the cause of "signature mismatch" on the notify route.
    .filter(([, v]) => opts.keepEmpty || (v !== "" && v !== undefined && v !== null))
    .map(([k, v]) => `${k}=${pfEncode(String(v))}`);
  let str = parts.join("&");
  // A blank/whitespace passphrase must be treated as "no passphrase" — appending
  // "&passphrase=" would make our hash diverge from PayFast's. This is the most
  // common cause of "Generated signature does not match submitted signature".
  const pass = (passphrase ?? "").trim();
  if (pass) {
    str += `&passphrase=${pfEncode(pass)}`;
  }
  return str;
}

// Build the MD5 signature over an ordered list of [key, value] pairs.
// Order matters: for an outgoing request it's the order we submit the fields;
// for an incoming ITN it's the order PayFast posted them.
export function signature(
  pairs: [string, string][],
  passphrase: string,
  opts: { keepEmpty?: boolean } = {}
): string {
  return crypto
    .createHash("md5")
    .update(signatureBaseString(pairs, passphrase, opts))
    .digest("hex");
}

// ── Outgoing: build the signed checkout payload ─────────────────────────────

export interface CheckoutUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface CheckoutPayload {
  processUrl: string;
  fields: Record<string, string>;
}

// Build the full, signed set of fields for an R199/month recurring subscription.
// m_payment_id is unique per attempt; custom_str1 carries the user id so the ITN
// can map the payment straight back to the account (the user id is a UUID, so it
// can't be parsed out of m_payment_id reliably).
export function buildCheckout(user: CheckoutUser): CheckoutPayload {
  const cfg = payfastConfig();
  const base = siteUrl();
  const mPaymentId = `${user.id}-${Date.now()}`;

  // Field order MUST follow PayFast's documented signature order — PayFast
  // reconstructs the hash in that order, not the order we post. The custom_*
  // fields come BEFORE the recurring-billing block (subscription_type ... cycles);
  // putting custom_str1 after them yields "Generated signature does not match".
  // Ref: PayFast custom-integration signature field order.
  const fields: Record<string, string> = {
    merchant_id: cfg.merchantId,
    merchant_key: cfg.merchantKey,
    return_url: `${base}/account?upgrade=success`,
    cancel_url: `${base}/pricing?upgrade=cancelled`,
    notify_url: `${base}/api/payfast/notify`,
    name_first: user.firstName,
    name_last: user.lastName,
    email_address: user.email,
    m_payment_id: mPaymentId,
    amount: PREMIUM_AMOUNT,
    item_name: PREMIUM_ITEM_NAME,
    // Map the payment back to the learner on the ITN — must precede the
    // subscription block per PayFast's documented order.
    custom_str1: user.id,
    // Recurring subscription config: monthly, indefinite.
    subscription_type: "1",
    recurring_amount: PREMIUM_AMOUNT,
    frequency: "3", // 3 = monthly
    cycles: "0", // 0 = until cancelled
  };

  const sigPairs = Object.entries(fields) as [string, string][];
  // Set PAYFAST_DEBUG=true to print the exact string being hashed. Compare it
  // against what PayFast expects to pinpoint a signature mismatch. (Sandbox
  // merchant_key is public, so this is safe to log in sandbox only.)
  if (process.env.PAYFAST_DEBUG === "true") {
    console.log(
      "[PayFast] signature base string:\n" + signatureBaseString(sigPairs, cfg.passphrase)
    );
  }
  fields.signature = signature(sigPairs, cfg.passphrase);

  return { processUrl: cfg.processUrl, fields };
}

// ── Outgoing: once-off Survival Pack checkout ───────────────────────────────

export interface PackCheckoutInput {
  purchaseId: string; // pack_purchases.id — becomes m_payment_id
  email: string;
  amountCents: number; // from pack_products.price_cents, never the client
  itemName: string;
  downloadToken: string; // for the return_url
}

// Once-off payment (no subscription block). Same field order rules as
// buildCheckout: PayFast reconstructs the hash in its documented order.
// m_payment_id carries the purchase id so the ITN maps straight back to the
// pack_purchases row — no custom_str needed.
export function buildPackCheckout(input: PackCheckoutInput): CheckoutPayload {
  const cfg = payfastConfig();
  const base = siteUrl();
  const amount = (input.amountCents / 100).toFixed(2);

  const fields: Record<string, string> = {
    merchant_id: cfg.merchantId,
    merchant_key: cfg.merchantKey,
    return_url: `${base}/pack/success?token=${input.downloadToken}`,
    cancel_url: `${base}/pack?cancelled=1`,
    notify_url: `${base}/api/pack/payfast-itn`,
    email_address: input.email,
    m_payment_id: input.purchaseId,
    amount,
    item_name: input.itemName,
  };

  const sigPairs = Object.entries(fields) as [string, string][];
  if (process.env.PAYFAST_DEBUG === "true") {
    console.log(
      "[PayFast] pack signature base string:\n" +
        signatureBaseString(sigPairs, cfg.passphrase)
    );
  }
  fields.signature = signature(sigPairs, cfg.passphrase);

  return { processUrl: cfg.processUrl, fields };
}

// Amount check against a specific purchase (the pack ITN validates against the
// row's amount_cents, not the subscription's fixed PREMIUM_AMOUNT).
export function itnAmountMatchesCents(data: ItnData, amountCents: number): boolean {
  const gross = parseFloat(data.amount_gross ?? "0");
  return Math.abs(gross - amountCents / 100) < 0.01;
}

// ── Incoming: validate an ITN callback ──────────────────────────────────────

export interface ItnData {
  [key: string]: string;
}

// Parse the raw POST body preserving field order (URLSearchParams keeps the
// order it reads), which the signature check depends on.
export function parseItn(rawBody: string): { data: ItnData; ordered: [string, string][] } {
  const params = new URLSearchParams(rawBody);
  const ordered: [string, string][] = [];
  const data: ItnData = {};
  for (const [k, v] of params.entries()) {
    ordered.push([k, v]);
    data[k] = v;
  }
  return { data, ordered };
}

// 1) Signature: rebuild from every posted field except `signature`, in order.
export function itnSignatureValid(ordered: [string, string][], data: ItnData): boolean {
  const cfg = payfastConfig();
  const pairs = ordered.filter(([k]) => k !== "signature");
  // keepEmpty: PayFast's ITN signature includes the empty fields it posts, so we
  // must too — otherwise every valid ITN is rejected as a signature mismatch.
  const expected = signature(pairs, cfg.passphrase, { keepEmpty: true });
  return expected === (data.signature ?? "").toLowerCase();
}

// 2) Source IP: must resolve to one of PayFast's known hosts.
const PAYFAST_HOSTS = [
  "www.payfast.co.za",
  "sandbox.payfast.co.za",
  "w1w.payfast.co.za",
  "w2w.payfast.co.za",
];

export async function itnSourceValid(remoteIp: string | null): Promise<boolean> {
  if (!remoteIp) return false;
  const ip = remoteIp.split(",")[0].trim();
  const valid = new Set<string>();
  await Promise.all(
    PAYFAST_HOSTS.map(async (host) => {
      try {
        const records = await dns.lookup(host, { all: true });
        for (const r of records) valid.add(r.address);
      } catch {
        /* host unresolvable — skip */
      }
    })
  );
  return valid.has(ip);
}

// 3) Server confirmation: post the data back to PayFast and expect "VALID".
export async function itnServerConfirm(rawBody: string): Promise<boolean> {
  const cfg = payfastConfig();
  try {
    const res = await fetch(cfg.validateUrl, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: rawBody,
    });
    const text = (await res.text()).trim();
    return text === "VALID";
  } catch (err) {
    console.error("PayFast validate postback failed:", err);
    return false;
  }
}

// 4) Amount: the gross must match what we charge (guards against tampering).
export function itnAmountValid(data: ItnData): boolean {
  const gross = parseFloat(data.amount_gross ?? "0");
  return Math.abs(gross - parseFloat(PREMIUM_AMOUNT)) < 0.01;
}

// ── Cancel a subscription via PayFast's recurring-billing API ────────────────

// The API uses its own auth: an MD5 signature over ALL header params + the
// passphrase, sorted alphabetically by key. Requires the passphrase to be set.
function apiTimestamp(): string {
  // ISO 8601 with timezone offset, e.g. 2026-06-17T09:30:00+02:00
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  const offMin = -d.getTimezoneOffset();
  const sign = offMin >= 0 ? "+" : "-";
  const oh = pad(Math.floor(Math.abs(offMin) / 60));
  const om = pad(Math.abs(offMin) % 60);
  return (
    `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}` +
    `T${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}` +
    `${sign}${oh}:${om}`
  );
}

function apiSignature(headers: Record<string, string>, passphrase: string): string {
  const all: Record<string, string> = { ...headers, passphrase };
  const sorted = Object.keys(all).sort();
  const str = sorted.map((k) => `${k}=${pfEncode(all[k])}`).join("&");
  return crypto.createHash("md5").update(str).digest("hex");
}

export interface CancelResult {
  ok: boolean;
  status: number;
  message: string;
}

export async function cancelSubscription(token: string): Promise<CancelResult> {
  const cfg = payfastConfig();
  if (!cfg.passphrase) {
    return {
      ok: false,
      status: 0,
      message:
        "PayFast passphrase is not configured — required to cancel via the API.",
    };
  }
  if (!token) {
    return { ok: false, status: 0, message: "No subscription token on file." };
  }

  const headers: Record<string, string> = {
    "merchant-id": cfg.merchantId,
    version: "v1",
    timestamp: apiTimestamp(),
  };
  const sig = apiSignature(headers, cfg.passphrase);

  // testing=true routes to the sandbox merchant when we're in sandbox mode.
  const url =
    `${cfg.apiHost}/subscriptions/${encodeURIComponent(token)}/cancel` +
    (cfg.sandbox ? "?testing=true" : "");

  try {
    const res = await fetch(url, {
      method: "PUT",
      headers: { ...headers, signature: sig, "content-type": "application/json" },
    });
    const text = await res.text();
    return {
      ok: res.ok,
      status: res.status,
      message: text || (res.ok ? "Cancelled." : "Cancel request failed."),
    };
  } catch (err) {
    console.error("PayFast cancel request failed:", err);
    return { ok: false, status: 0, message: "Could not reach PayFast." };
  }
}

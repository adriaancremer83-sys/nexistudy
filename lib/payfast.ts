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
    merchantId: process.env.PAYFAST_MERCHANT_ID ?? "",
    merchantKey: process.env.PAYFAST_MERCHANT_KEY ?? "",
    passphrase: process.env.PAYFAST_PASSPHRASE ?? "",
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

// Build the MD5 signature over an ordered list of [key, value] pairs.
// Order matters: for an outgoing request it's the order we submit the fields;
// for an incoming ITN it's the order PayFast posted them.
export function signature(
  pairs: [string, string][],
  passphrase: string
): string {
  const parts = pairs
    .filter(([, v]) => v !== "" && v !== undefined && v !== null)
    .map(([k, v]) => `${k}=${pfEncode(String(v))}`);
  let str = parts.join("&");
  if (passphrase) {
    str += `&passphrase=${pfEncode(passphrase)}`;
  }
  return crypto.createHash("md5").update(str).digest("hex");
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

  // Order here is the order the fields are signed AND submitted — keep them in
  // sync. (The <form> we render iterates this same object.)
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
    // Recurring subscription config: monthly, indefinite.
    subscription_type: "1",
    recurring_amount: PREMIUM_AMOUNT,
    frequency: "3", // 3 = monthly
    cycles: "0", // 0 = until cancelled
    // Map the payment back to the learner on the ITN.
    custom_str1: user.id,
  };

  fields.signature = signature(
    Object.entries(fields) as [string, string][],
    cfg.passphrase
  );

  return { processUrl: cfg.processUrl, fields };
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
  const expected = signature(pairs, cfg.passphrase);
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

import { supabaseAdmin } from "./supabase";

// ─────────────────────────────────────────────────────────────────────────────
// Survival Pack data access. Server-side only — every function here goes
// through the service-role client (pack tables have RLS with no public
// policies, and the storage bucket is private). Never import from a client
// component.
// ─────────────────────────────────────────────────────────────────────────────

export const MATRIC_PACK_SLUG = "matric-prelim-2026";
const PACK_BUCKET = "pack-files";
const SIGNED_URL_TTL_SECONDS = 60 * 60; // 1 hour, per spec

export interface PackProduct {
  id: string;
  slug: string;
  name: string;
  price_cents: number;
  active: boolean;
}

export interface PackPurchase {
  id: string;
  product_id: string;
  email: string;
  user_id: string | null;
  payfast_payment_id: string | null;
  amount_cents: number;
  status: "pending" | "paid" | "failed" | "refunded";
  download_token: string;
  download_count: number;
  paid_at: string | null;
}

export interface PackFile {
  id: string;
  storage_path: string;
  title: string;
  language: "en" | "af";
  sort_order: number;
}

export async function getActiveProduct(slug: string): Promise<PackProduct | null> {
  const { data, error } = await supabaseAdmin
    .from("pack_products")
    .select("id, slug, name, price_cents, active")
    .eq("slug", slug)
    .eq("active", true)
    .maybeSingle();

  if (error) {
    console.error("getActiveProduct failed:", error.message);
    return null;
  }
  return (data as PackProduct) ?? null;
}

// One row per attempt, status 'pending'. The amount is copied from the product
// server-side so a tampered client request can never set its own price.
export async function createPendingPurchase(params: {
  productId: string;
  email: string;
  userId: string | null;
  amountCents: number;
}): Promise<PackPurchase | null> {
  const { data, error } = await supabaseAdmin
    .from("pack_purchases")
    .insert({
      product_id: params.productId,
      email: params.email.toLowerCase(),
      user_id: params.userId,
      amount_cents: params.amountCents,
    })
    .select()
    .single();

  if (error) {
    console.error("createPendingPurchase failed:", error.message);
    return null;
  }
  return data as PackPurchase;
}

export async function getPurchaseById(id: string): Promise<PackPurchase | null> {
  const { data, error } = await supabaseAdmin
    .from("pack_purchases")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error("getPurchaseById failed:", error.message);
    return null;
  }
  return (data as PackPurchase) ?? null;
}

export async function getPurchaseByToken(token: string): Promise<PackPurchase | null> {
  const { data, error } = await supabaseAdmin
    .from("pack_purchases")
    .select("*")
    .eq("download_token", token)
    .maybeSingle();

  if (error) {
    console.error("getPurchaseByToken failed:", error.message);
    return null;
  }
  return (data as PackPurchase) ?? null;
}

// Called by the ITN on a COMPLETE payment. The .eq status guard makes it
// idempotent at the DB level: a retried ITN matches zero rows and changes
// nothing (paid_at is never reset).
export async function markPurchasePaid(
  purchaseId: string,
  pfPaymentId: string | null
): Promise<boolean> {
  const { error } = await supabaseAdmin
    .from("pack_purchases")
    .update({
      status: "paid",
      paid_at: new Date().toISOString(),
      payfast_payment_id: pfPaymentId,
    })
    .eq("id", purchaseId)
    .eq("status", "pending");

  if (error) {
    console.error("markPurchasePaid failed:", error.message);
    return false;
  }
  return true;
}

export async function markPurchaseFailed(purchaseId: string): Promise<void> {
  const { error } = await supabaseAdmin
    .from("pack_purchases")
    .update({ status: "failed" })
    .eq("id", purchaseId)
    .eq("status", "pending");
  if (error) console.error("markPurchaseFailed failed:", error.message);
}

// Best-effort visit counter for the download page — never blocks rendering.
export async function bumpDownloadCount(purchase: PackPurchase): Promise<void> {
  const { error } = await supabaseAdmin
    .from("pack_purchases")
    .update({ download_count: purchase.download_count + 1 })
    .eq("id", purchase.id);
  if (error) console.error("bumpDownloadCount failed:", error.message);
}

export async function listPackFiles(productId: string): Promise<PackFile[]> {
  const { data, error } = await supabaseAdmin
    .from("pack_files")
    .select("id, storage_path, title, language, sort_order")
    .eq("product_id", productId)
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("listPackFiles failed:", error.message);
    return [];
  }
  return (data as PackFile[]) ?? [];
}

export interface SignedPackFile {
  title: string;
  language: "en" | "af";
  url: string;
}

// Fresh signed URLs, generated only AFTER the caller has validated the token
// against a paid purchase. The bucket is private; these expire in 1 hour.
export async function signPackFiles(files: PackFile[]): Promise<SignedPackFile[]> {
  const signed: SignedPackFile[] = [];
  for (const file of files) {
    const { data, error } = await supabaseAdmin.storage
      .from(PACK_BUCKET)
      .createSignedUrl(file.storage_path, SIGNED_URL_TTL_SECONDS);
    if (error || !data?.signedUrl) {
      console.error("signPackFiles failed for", file.storage_path, error?.message);
      continue;
    }
    signed.push({ title: file.title, language: file.language, url: data.signedUrl });
  }
  return signed;
}

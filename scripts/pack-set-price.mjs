// One-off price override for live PayFast testing —
// `node scripts/pack-set-price.mjs 500` (R5 test) / `19900` (restore R199).
// Checkout + ITN both read the product row, so this is the only switch.

import { readFileSync } from "node:fs";
import path from "node:path";
import { createClient } from "@supabase/supabase-js";

const ROOT = path.resolve(import.meta.dirname, "..");
const PRODUCT_SLUG = "matric-prelim-2026";

for (const line of readFileSync(path.join(ROOT, ".env.local"), "utf8").split(/\r?\n/)) {
  const m = line.match(/^([A-Z_][A-Z0-9_]*)=(.*)$/);
  if (m && !process.env[m[1]]) process.env[m[1]] = m[2].trim();
}

const cents = Number(process.argv[2]);
if (!Number.isInteger(cents) || cents < 500) {
  console.error("Usage: node scripts/pack-set-price.mjs <price_cents>  (min 500 — PayFast minimum is R5)");
  process.exit(1);
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

const { data: before, error: readError } = await supabase
  .from("pack_products")
  .select("id, price_cents")
  .eq("slug", PRODUCT_SLUG)
  .single();
if (readError || !before) throw new Error(`Product ${PRODUCT_SLUG} not found: ${readError?.message}`);

const { error: updateError } = await supabase
  .from("pack_products")
  .update({ price_cents: cents })
  .eq("id", before.id);
if (updateError) throw new Error(`Update failed: ${updateError.message}`);

console.log(`✓ ${PRODUCT_SLUG}: R${(before.price_cents / 100).toFixed(2)} → R${(cents / 100).toFixed(2)}`);

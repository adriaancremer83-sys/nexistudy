// Survival Pack uploader — `npm run pack:upload [slug] [--lang en|af]`
// Pushes pack-dist/{lang}/{slug}.pdf to the private `pack-files` bucket at
// packs/matric-2026/{lang}/{slug}.pdf and upserts the matching pack_files
// row (matched on product_id + storage_path). Titles/sort come from the
// source markdown front-matter. Requires .env.local (service role key) and
// NODE_OPTIONS=--use-system-ca on this machine (npm script sets it).

import { readFileSync, readdirSync, existsSync } from "node:fs";
import path from "node:path";
import { createClient } from "@supabase/supabase-js";

const ROOT = path.resolve(import.meta.dirname, "..");
const DIST_DIR = path.join(ROOT, "pack-dist");
const CONTENT_DIR = path.join(ROOT, "content", "pack", "matric-2026");
const BUCKET = "pack-files";
const PRODUCT_SLUG = "matric-prelim-2026";
const STORAGE_PREFIX = "packs/matric-2026";

function loadEnv() {
  const file = path.join(ROOT, ".env.local");
  for (const line of readFileSync(file, "utf8").split(/\r?\n/)) {
    const m = line.match(/^([A-Z_][A-Z0-9_]*)=(.*)$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].trim();
  }
}

function frontMatter(mdPath) {
  if (!existsSync(mdPath)) return {};
  const m = readFileSync(mdPath, "utf8").match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) return {};
  const meta = {};
  for (const line of m[1].split(/\r?\n/)) {
    const kv = line.match(/^(\w+):\s*(.*)$/);
    if (kv) meta[kv[1]] = kv[2].trim();
  }
  return meta;
}

async function main() {
  loadEnv();
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("Missing Supabase env vars in .env.local");
  const supabase = createClient(url, key, { auth: { persistSession: false } });

  const args = process.argv.slice(2);
  const langFlag = args.includes("--lang") ? args[args.indexOf("--lang") + 1] : null;
  const slugFilter = args.find((a) => !a.startsWith("--") && a !== langFlag) || null;

  const { data: product, error: productError } = await supabase
    .from("pack_products")
    .select("id")
    .eq("slug", PRODUCT_SLUG)
    .single();
  if (productError || !product) throw new Error(`Product ${PRODUCT_SLUG} not found: ${productError?.message}`);

  let uploaded = 0;
  for (const lang of langFlag ? [langFlag] : ["en", "af"]) {
    const dir = path.join(DIST_DIR, lang);
    if (!existsSync(dir)) continue;
    for (const file of readdirSync(dir).filter((f) => f.endsWith(".pdf"))) {
      const slug = path.basename(file, ".pdf");
      if (slugFilter && slug !== slugFilter) continue;

      const storagePath = `${STORAGE_PREFIX}/${lang}/${slug}.pdf`;
      const bytes = readFileSync(path.join(dir, file));
      const { error: uploadError } = await supabase.storage
        .from(BUCKET)
        .upload(storagePath, bytes, { contentType: "application/pdf", upsert: true });
      if (uploadError) throw new Error(`Upload failed for ${storagePath}: ${uploadError.message}`);

      const meta = frontMatter(path.join(CONTENT_DIR, lang, `${slug}.md`));
      const title = meta.subtitle ? `${meta.title} — ${meta.subtitle}` : meta.title || slug;
      const sortOrder = Number(meta.sort ?? 0);

      // pack_files has no unique constraint on (product_id, storage_path),
      // so upsert manually: update if the row exists, insert otherwise.
      const { data: existing } = await supabase
        .from("pack_files")
        .select("id")
        .eq("product_id", product.id)
        .eq("storage_path", storagePath)
        .maybeSingle();

      const row = { product_id: product.id, storage_path: storagePath, title, language: lang, sort_order: sortOrder };
      const { error: rowError } = existing
        ? await supabase.from("pack_files").update(row).eq("id", existing.id)
        : await supabase.from("pack_files").insert(row);
      if (rowError) throw new Error(`pack_files row failed for ${storagePath}: ${rowError.message}`);

      console.log(`✓ ${storagePath}  →  "${title}" (sort ${sortOrder})`);
      uploaded++;
    }
  }
  if (uploaded === 0) {
    console.error("No PDFs found in pack-dist — run `npm run pack:render` first.");
    process.exit(1);
  }
  console.log(`Done: ${uploaded} file(s) uploaded + registered.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

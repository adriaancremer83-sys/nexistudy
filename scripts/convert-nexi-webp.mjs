import sharp from "sharp";
import { readdir } from "node:fs/promises";
import path from "node:path";

const dir = "public/images";
const files = (await readdir(dir)).filter((f) => /^nexi-.*\.png$/.test(f));
for (const f of files) {
  const src = path.join(dir, f);
  const out = src.replace(/\.png$/, ".webp");
  const info = await sharp(src).webp({ quality: 82, effort: 6 }).toFile(out);
  console.log(`${f} -> ${path.basename(out)}  ${(info.size / 1024).toFixed(0)} KB`);
}

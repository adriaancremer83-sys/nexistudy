// Survival Pack PDF renderer — `npm run pack:render [slug] [--lang en|af]`
// Markdown in content/pack/matric-2026/{lang}/*.md → branded A4 PDFs in
// pack-dist/{lang}/{slug}.pdf. Cover and content pages are rendered as two
// PDFs (full-bleed cover vs. footered content) and merged with pdf-lib.
// Uses the system Chrome/Edge via puppeteer-core — no browser download.

import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync } from "node:fs";
import path from "node:path";
import { Marked } from "marked";
import puppeteer from "puppeteer-core";
import { PDFDocument } from "pdf-lib";
import { coverHtml, bodyHtml, footerTemplate } from "./pack-template.mjs";

const ROOT = path.resolve(import.meta.dirname, "..");
const CONTENT_DIR = path.join(ROOT, "content", "pack", "matric-2026");
const DIST_DIR = path.join(ROOT, "pack-dist");

const CHROME_PATHS = [
  process.env.CHROME_PATH,
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
].filter(Boolean);

function findChrome() {
  const found = CHROME_PATHS.find((p) => existsSync(p));
  if (!found) {
    throw new Error("No Chrome/Edge found. Set CHROME_PATH to a browser executable.");
  }
  return found;
}

function dataUri(relPath) {
  const abs = path.join(ROOT, relPath);
  return `data:image/png;base64,${readFileSync(abs).toString("base64")}`;
}

// Nunito variable woff2 (latin subset) as cached on disk by next/font —
// embedded so Chrome never needs the network. Hashes are content-based
// and stable; if the .next cache is gone, we fall back to Segoe UI.
const FONT_FILES = {
  normal: ".next/dev/static/media/ee40bb094c99a29a-s.p.woff2",
  italic: ".next/dev/static/media/504f699ce71abd8b-s.p.woff2",
};

function buildFontCss() {
  const rules = [];
  for (const [style, rel] of Object.entries(FONT_FILES)) {
    const abs = path.join(ROOT, rel);
    if (!existsSync(abs)) {
      console.warn(`! Nunito ${style} not found at ${rel} — falling back to Segoe UI`);
      continue;
    }
    const uri = `data:font/woff2;base64,${readFileSync(abs).toString("base64")}`;
    rules.push(
      `@font-face { font-family: "Nunito"; font-style: ${style}; font-weight: 200 1000; src: url(${uri}) format("woff2"); }`
    );
  }
  return rules.join("\n");
}

// Minimal front-matter parser: leading `---` block of `key: value` lines.
function parseFrontMatter(raw) {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!m) throw new Error("Missing front-matter block");
  const meta = {};
  for (const line of m[1].split(/\r?\n/)) {
    const kv = line.match(/^(\w+):\s*(.*)$/);
    if (kv) meta[kv[1]] = kv[2].trim();
  }
  return { meta, markdown: raw.slice(m[0].length) };
}

function renderMarkdown(markdown) {
  const marked = new Marked({ gfm: true });
  marked.use({
    renderer: {
      blockquote({ tokens }) {
        const inner = this.parser.parse(tokens);
        const signoff = /Every mark is a decision|Elke punt is 'n besluit/.test(inner);
        return `<div class="callout${signoff ? " signoff" : ""}">${inner}</div>\n`;
      },
    },
  });
  let html = marked.parse(markdown.replace(/<!--\s*pagebreak\s*-->/g, '<div class="pagebreak"></div>'));
  // Badge every VERIFY flag so it can't be missed in review.
  html = html.replace(/⚠\s*VERIFY/g, '<span class="verify">⚠ VERIFY</span>');
  return html;
}

async function renderPdf(page, html, pdfOptions) {
  await page.setContent(html, { waitUntil: "domcontentloaded", timeout: 60_000 });
  await page.evaluate(() => document.fonts.ready);
  return page.pdf({ format: "A4", printBackground: true, ...pdfOptions });
}

async function mergePdfs(coverBytes, bodyBytes) {
  const out = await PDFDocument.create();
  for (const bytes of [coverBytes, bodyBytes]) {
    const doc = await PDFDocument.load(bytes);
    const pages = await out.copyPages(doc, doc.getPageIndices());
    pages.forEach((p) => out.addPage(p));
  }
  return out.save();
}

async function renderDoc(page, assets, lang, file) {
  const raw = readFileSync(file, "utf8");
  const { meta, markdown } = parseFrontMatter(raw);
  meta.lang = meta.lang || lang;
  const slug = meta.slug || path.basename(file, ".md");

  const coverBytes = await renderPdf(page, coverHtml(meta, assets), {
    margin: { top: 0, bottom: 0, left: 0, right: 0 },
  });
  const bodyBytes = await renderPdf(page, bodyHtml(meta, renderMarkdown(markdown), assets), {
    margin: { top: "16mm", bottom: "20mm", left: "17mm", right: "17mm" },
    displayHeaderFooter: true,
    headerTemplate: "<span></span>",
    footerTemplate: footerTemplate(meta),
  });

  const outDir = path.join(DIST_DIR, meta.lang);
  mkdirSync(outDir, { recursive: true });
  const outPath = path.join(outDir, `${slug}.pdf`);
  writeFileSync(outPath, await mergePdfs(coverBytes, bodyBytes));
  console.log(`✓ ${path.relative(ROOT, outPath)}`);
}

async function main() {
  const args = process.argv.slice(2);
  const langFlag = args.includes("--lang") ? args[args.indexOf("--lang") + 1] : null;
  const slugFilter = args.find((a) => !a.startsWith("--") && a !== langFlag) || null;

  const assets = {
    mascot: dataUri("public/images/nexi-wave.png"),
    logo: dataUri("public/images/nexi-logo-new.png"),
    fontCss: buildFontCss(),
  };

  const jobs = [];
  for (const lang of langFlag ? [langFlag] : ["en", "af"]) {
    const dir = path.join(CONTENT_DIR, lang);
    if (!existsSync(dir)) continue;
    for (const f of readdirSync(dir).filter((f) => f.endsWith(".md"))) {
      if (slugFilter && path.basename(f, ".md") !== slugFilter) continue;
      jobs.push({ lang, file: path.join(dir, f) });
    }
  }
  if (jobs.length === 0) {
    console.error("No matching markdown files found.");
    process.exit(1);
  }

  const browser = await puppeteer.launch({ executablePath: findChrome() });
  try {
    const page = await browser.newPage();
    for (const job of jobs) {
      await renderDoc(page, assets, job.lang, job.file);
    }
  } finally {
    await browser.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

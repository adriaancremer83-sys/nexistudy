// Curates the raw DBE scrape into lib/pastPapersData.json:
// pairs every question paper with its memo, keeps a tidy subject set,
// and verifies that every URL actually serves a PDF before including it.
// Run after scrape-past-papers.mjs:
//   NODE_OPTIONS=--use-system-ca node scripts/build-past-papers.mjs
import { readFileSync, writeFileSync } from "fs";

const raw = JSON.parse(readFileSync("scripts/dbe-papers-raw.json", "utf8"));

// Curated subject list -> display group. Order here = display order.
const SUBJECTS = {
  Mathematics: "Core",
  "Mathematical Literacy": "Core",
  "Physical Sciences": "Sciences",
  "Life Sciences": "Sciences",
  "Agricultural Sciences": "Sciences",
  Accounting: "Commerce",
  "Business Studies": "Commerce",
  Economics: "Commerce",
  Geography: "Humanities",
  History: "Humanities",
  Tourism: "Humanities",
  "Computer Application Technology": "Technology",
  "Information Technology": "Technology",
  English: "Languages",
  Afrikaans: "Languages",
  IsiZulu: "Languages",
  IsiXhosa: "Languages",
  IsiNdebele: "Languages",
  Sepedi: "Languages",
  Sesotho: "Languages",
  Setswana: "Languages",
  Siswati: "Languages",
  Tshivenda: "Languages",
  Xitsonga: "Languages",
};

const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

// Pair papers with memos for one subject in one year.
function extractPairs(subject, docs) {
  const pairs = [];
  const isLanguage = SUBJECTS[subject] === "Languages";

  if (isLanguage) {
    // Titles like "IsiZulu HL P1" / "IsiZulu HL P1 Memo"
    const papers = new Map();
    const memos = new Map();
    for (const d of docs) {
      const m = d.title.match(/(HL|FAL|SAL)\s*P(\d)(\s*[Mm]emo)?\s*$/);
      if (!m) continue;
      const key = `${m[1]} P${m[2]}`;
      (m[3] ? memos : papers).set(key, d.url);
    }
    for (const [key, url] of papers) {
      const memoUrl = memos.get(key);
      if (!memoUrl) continue;
      const [level, p] = key.split(" ");
      pairs.push({ level, paper: `Paper ${p.slice(1)}`, paperUrl: url, memoUrl });
    }
  } else {
    // Titles like "Paper 1 (English)" / "Memo 1 (English)" / "Memo 1 (English & Afrikaans)"
    const papers = new Map();
    const memos = new Map();
    for (const d of docs) {
      let m = d.title.match(/^Paper\s*(\d)\s*\(English\)/i);
      if (m) papers.set(m[1], d.url);
      m = d.title.match(/^Memo\s*(\d)\s*\((English|English\s*&\s*Afrikaans|Afrikaans\s*(and|&)\s*English)\)/i);
      if (m && !memos.has(m[1])) memos.set(m[1], d.url);
    }
    for (const [n, url] of papers) {
      const memoUrl = memos.get(n);
      if (!memoUrl) continue;
      pairs.push({ level: null, paper: `Paper ${n}`, paperUrl: url, memoUrl });
    }
  }
  return pairs;
}

// Build the full entry list
const entries = [];
for (const [year, subjects] of Object.entries(raw)) {
  for (const [subject, group] of Object.entries(SUBJECTS)) {
    const docs = subjects[subject];
    if (!docs) {
      console.warn(`  missing: ${subject} ${year}`);
      continue;
    }
    for (const pair of extractPairs(subject, docs)) {
      entries.push({
        subject,
        slug: slugify(subject),
        group,
        year: Number(year),
        session: "November",
        ...pair,
      });
    }
  }
}
console.log(`paired: ${entries.length} paper+memo sets`);

// Verify every URL serves a PDF (range request = 5 bytes each)
async function isPdf(url) {
  try {
    const r = await fetch(url, { headers: { Range: "bytes=0-4" } });
    const buf = Buffer.from(await r.arrayBuffer());
    return buf.toString("latin1").startsWith("%PDF");
  } catch {
    return false;
  }
}

const urls = [...new Set(entries.flatMap((e) => [e.paperUrl, e.memoUrl]))];
console.log(`verifying ${urls.length} URLs...`);
const ok = new Set();
const CONCURRENCY = 8;
for (let i = 0; i < urls.length; i += CONCURRENCY) {
  const batch = urls.slice(i, i + CONCURRENCY);
  const results = await Promise.all(batch.map(isPdf));
  batch.forEach((u, j) => results[j] && ok.add(u));
  process.stdout.write(`\r  ${Math.min(i + CONCURRENCY, urls.length)}/${urls.length} checked, ${ok.size} ok`);
}
console.log();

const verified = entries.filter((e) => ok.has(e.paperUrl) && ok.has(e.memoUrl));
const dropped = entries.length - verified.length;
if (dropped > 0) {
  console.warn(`dropped ${dropped} entries with broken links:`);
  for (const e of entries.filter((x) => !ok.has(x.paperUrl) || !ok.has(x.memoUrl))) {
    console.warn(`  ${e.subject} ${e.year} ${e.level ?? ""} ${e.paper}`);
  }
}

writeFileSync("lib/pastPapersData.json", JSON.stringify(verified, null, 1));
const bySubject = new Map();
for (const e of verified) bySubject.set(e.subject, (bySubject.get(e.subject) ?? 0) + 1);
for (const [s, n] of bySubject) console.log(`  ${s}: ${n} sets`);
console.log(`done: ${verified.length} verified paper+memo sets -> lib/pastPapersData.json`);

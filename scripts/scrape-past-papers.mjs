// Scrapes the official DBE NSC past-paper year pages and writes the raw
// subject/document map to scripts/dbe-papers-raw.json for curation.
// Run: NODE_OPTIONS=--use-system-ca node scripts/scrape-past-papers.mjs
import { writeFileSync } from "fs";

const YEAR_PAGES = {
  2024: "https://www.education.gov.za/2024NSCNovemberpastpapers.aspx",
  2023: "https://www.education.gov.za/Curriculum/NationalSeniorCertificate(NSC)Examinations/2023NSCNovemberpastpapers.aspx",
  2022: "https://www.education.gov.za/Curriculum/NationalSeniorCertificate(NSC)Examinations/2022NovemberExams.aspx",
};

function decode(s) {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&nbsp;/g, " ")
    .replace(/&#39;/g, "'")
    .trim();
}

const out = {};
for (const [year, url] of Object.entries(YEAR_PAGES)) {
  const html = await (await fetch(url)).text();
  const subjects = {};
  // Each subject section starts with its eds_containerTitle heading
  const blocks = html.split(/class="eds_containerTitle">/).slice(1);
  for (const block of blocks) {
    const subject = decode(block.slice(0, block.indexOf("<")));
    if (!subject) continue;
    const docs = [];
    // Title-cell anchors carry the document name + LinkClick URL
    const re = /ctlTitle_\d+" href="([^"]+)">([^<]+)<\/a>/g;
    let m;
    while ((m = re.exec(block)) !== null) {
      docs.push({ title: decode(m[2]), url: "https://www.education.gov.za" + decode(m[1]) });
    }
    if (docs.length > 0) subjects[subject] = docs;
  }
  out[year] = subjects;
  console.log(`${year}: ${Object.keys(subjects).length} subjects, ${Object.values(subjects).flat().length} documents`);
}

writeFileSync("scripts/dbe-papers-raw.json", JSON.stringify(out, null, 1));
console.log("written to scripts/dbe-papers-raw.json");

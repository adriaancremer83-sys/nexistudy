// Branded HTML template for Survival Pack PDFs (see docs in SURVIVAL_PACK.md).
// One template for every document: a full-bleed navy cover page + white
// content pages. Rendered to A4 by scripts/pack-render.mjs.

// Per-language strings. AF tagline still awaiting Adriaan's confirmation
// (see SURVIVAL_PACK.md) — flagged in the AF footer until then.
export const LANG = {
  en: {
    prelims: "Prelims: 29 August",
    tagline: "Every mark is a decision.",
    footerBrand: "NexiStudy — Matric Prelim Survival Pack",
  },
  af: {
    prelims: "Rekord: 29 Augustus",
    tagline: "Elke punt is 'n besluit.",
    footerBrand: "NexiStudy — Matriek Rekord Oorlewingspak",
  },
};

// Nunito is embedded as data URIs by pack-render.mjs (assets.fontCss) so
// rendering never touches the network; falls back to Segoe UI if absent.

// ── Cover page ──────────────────────────────────────────────────
// assets: { mascot, logo } as data URIs.
export function coverHtml(meta, assets) {
  const t = LANG[meta.lang] ?? LANG.en;
  return `<!doctype html><html><head><meta charset="utf-8">
<style>
  ${assets.fontCss}
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body { width: 210mm; height: 297mm; }
  body {
    font-family: "Nunito", "Segoe UI", Arial, sans-serif;
    color: #fff;
    background-color: #060D1A;
    background-image:
      radial-gradient(ellipse 58% 40% at 82% -6%, rgba(0, 170, 255, 0.20), transparent 62%),
      radial-gradient(ellipse 46% 34% at 104% 22%, rgba(255, 150, 64, 0.08), transparent 60%),
      radial-gradient(ellipse 60% 45% at -4% 106%, rgba(28, 74, 168, 0.28), transparent 62%),
      linear-gradient(158deg, #060D1A 0%, #0A1A33 48%, #07142A 100%);
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
    display: flex;
    flex-direction: column;
    padding: 16mm 18mm 14mm;
  }
  .brand-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .brand-row img { height: 11mm; }
  .brand-row .site {
    font-size: 10.5pt;
    font-weight: 700;
    letter-spacing: 0.08em;
    color: rgba(255, 255, 255, 0.65);
  }
  .middle {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
  .mascot-ring {
    width: 52mm;
    height: 52mm;
    border-radius: 50%;
    border: 2px solid rgba(0, 212, 255, 0.30);
    background: radial-gradient(circle at 50% 40%, rgba(0, 212, 255, 0.14), rgba(255, 255, 255, 0.04) 70%);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 14mm;
  }
  .mascot-ring img { width: 40mm; }
  .kicker {
    display: inline-block;
    font-size: 10pt;
    font-weight: 800;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: #FFB454;
    border: 1px solid rgba(255, 180, 84, 0.45);
    border-radius: 999px;
    padding: 2.2mm 6.5mm;
    margin-bottom: 10mm;
  }
  h1 {
    font-size: 41pt;
    font-weight: 900;
    line-height: 1.08;
    letter-spacing: -0.01em;
    max-width: 150mm;
  }
  .subtitle {
    margin-top: 5mm;
    font-size: 15.5pt;
    font-weight: 700;
    background: linear-gradient(95deg, #3D7BF0 0%, #00D4FF 55%, #5FE6FF 100%);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }
  .divider {
    width: 46mm;
    height: 1px;
    margin: 11mm auto 0;
    background: linear-gradient(90deg, transparent, rgba(0, 212, 255, 0.55), transparent);
  }
  .bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-top: 1px solid rgba(255, 255, 255, 0.12);
    padding-top: 5mm;
    font-size: 10pt;
  }
  .bottom .date { font-weight: 800; color: #FFB454; letter-spacing: 0.04em; }
  .bottom .tagline { color: rgba(255, 255, 255, 0.60); font-style: italic; }
</style></head><body>
  <div class="brand-row">
    <img src="${assets.logo}" alt="NexiStudy">
    <span class="site">nexistudy.co.za</span>
  </div>
  <div class="middle">
    <div class="mascot-ring"><img src="${assets.mascot}" alt="Nexi"></div>
    <span class="kicker">${meta.kicker}</span>
    <h1>${meta.title}</h1>
    <div class="subtitle">${meta.subtitle}</div>
    <div class="divider"></div>
  </div>
  <div class="bottom">
    <span class="date">${t.prelims} 2026</span>
    <span class="tagline">${t.tagline}</span>
  </div>
</body></html>`;
}

// ── Content pages ───────────────────────────────────────────────
// contentHtml: markdown already rendered to HTML by pack-render.mjs.
export function bodyHtml(meta, contentHtml, assets) {
  return `<!doctype html><html><head><meta charset="utf-8">
<style>
  ${assets.fontCss}
  * { box-sizing: border-box; }
  body {
    margin: 0;
    font-family: "Nunito", "Segoe UI", Arial, sans-serif;
    font-size: 10.5pt;
    line-height: 1.65;
    color: #22344A;
    counter-reset: section;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  .pagebreak { break-after: page; height: 0; }

  /* Section headings: numbered kicker + accent bar + title */
  h2 {
    counter-increment: section;
    font-size: 19pt;
    font-weight: 900;
    color: #0A1628;
    line-height: 1.2;
    margin: 2mm 0 5mm;
    break-after: avoid;
  }
  h2::before {
    content: "Section 0" counter(section);
    display: block;
    font-size: 8.5pt;
    font-weight: 800;
    letter-spacing: 0.24em;
    text-transform: uppercase;
    color: #2D6BE4;
    margin-bottom: 1.6mm;
  }
  h2::after {
    content: "";
    display: block;
    width: 17mm;
    height: 1.4mm;
    border-radius: 1mm;
    margin-top: 2.6mm;
    background: linear-gradient(90deg, #2D6BE4, #00D4FF);
  }
  h3 { font-size: 12.5pt; font-weight: 800; color: #0A1628; margin: 5mm 0 2mm; break-after: avoid; }

  p { margin: 0 0 3.2mm; }
  strong { font-weight: 800; color: #0A1628; }
  em { font-style: italic; }

  /* Tables */
  table {
    width: 100%;
    border-collapse: collapse;
    margin: 3mm 0 4.5mm;
    font-size: 9.5pt;
    break-inside: avoid;
  }
  th, td {
    padding: 2.4mm 3.2mm;
    text-align: left;
    vertical-align: top;
    border: none;
  }
  thead th {
    background: #0A1628;
    color: #fff;
    font-weight: 800;
    font-size: 9pt;
    letter-spacing: 0.03em;
  }
  thead th:first-child { border-radius: 2mm 0 0 0; }
  thead th:last-child { border-radius: 0 2mm 0 0; }
  tbody tr:nth-child(even) { background: #F2F6FC; }
  tbody tr:nth-child(odd) { background: #FAFCFE; }
  tbody td { border-bottom: 1px solid #E3EAF3; }
  tbody td:first-child { font-weight: 700; color: #0A1628; }
  /* Date ranges and similar short cells shouldn't wrap mid-range */
  td { hyphens: none; }

  /* Numbered lists: gold-badged counters */
  ol { list-style: none; counter-reset: item; margin: 0 0 4mm; padding: 0; }
  ol li {
    counter-increment: item;
    position: relative;
    padding-left: 11mm;
    margin-bottom: 3mm;
    break-inside: avoid;
  }
  ol li::before {
    content: counter(item);
    position: absolute;
    left: 0;
    top: 0.4mm;
    width: 6.5mm;
    height: 6.5mm;
    border-radius: 50%;
    background: linear-gradient(135deg, #FFB454, #F59323);
    color: #0A1628;
    font-weight: 900;
    font-size: 9.5pt;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  ul { margin: 0 0 4mm; padding-left: 6mm; }
  ul li { margin-bottom: 1.8mm; }
  ul li::marker { color: #2D6BE4; }

  /* Callouts (markdown blockquotes) */
  .callout {
    background: #FFF8ED;
    border-left: 1.6mm solid #FFB454;
    border-radius: 0 2.5mm 2.5mm 0;
    padding: 3.6mm 5mm;
    margin: 4mm 0 4.5mm;
    font-weight: 600;
    color: #4A3A22;
    break-inside: avoid;
  }
  .callout p { margin: 0; }

  /* The sign-off line gets the full-brand treatment */
  .callout.signoff {
    background: linear-gradient(120deg, #0A1628 0%, #13294F 100%);
    border-left: none;
    border-radius: 3mm;
    text-align: center;
    color: #fff;
    font-size: 12.5pt;
    font-weight: 800;
    padding: 5.5mm 6mm;
  }
  .callout.signoff p { color: #fff; }

  /* ⚠ VERIFY flags — loud on purpose; removed only by Adriaan */
  .verify {
    display: inline-block;
    background: #FFF3C4;
    border: 1px solid #F59E0B;
    color: #92400E;
    font-size: 7.5pt;
    font-weight: 800;
    letter-spacing: 0.05em;
    border-radius: 1.5mm;
    padding: 0 1.8mm;
    vertical-align: 0.3mm;
    white-space: nowrap;
  }
</style></head><body>
${contentHtml}
</body></html>`;
}

// Puppeteer footer template — its own rendering context: inline styles
// only, system fonts only.
export function footerTemplate(meta) {
  const t = LANG[meta.lang] ?? LANG.en;
  return `<div style="width:100%;font-family:'Segoe UI',Arial,sans-serif;font-size:7.5px;color:#7A8AA0;padding:0 16mm;display:flex;justify-content:space-between;align-items:center;">
    <span>${t.footerBrand}</span>
    <span style="color:#B08430;font-weight:bold;">nexistudy.co.za &nbsp;•&nbsp; ${t.prelims}</span>
    <span>Page <span class="pageNumber"></span> of <span class="totalPages"></span></span>
  </div>`;
}

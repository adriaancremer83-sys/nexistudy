"use client";

import { useState } from "react";

export interface DownloadItem {
  title: string;
  language: "en" | "af";
  url: string;
}

// EN/AF tabbed download list for the pack success page. Receives pre-signed
// URLs from the server component — no Supabase access happens client-side.
export default function PackDownloads({ files }: { files: DownloadItem[] }) {
  const [lang, setLang] = useState<"en" | "af">("en");
  const visible = files.filter((f) => f.language === lang);

  return (
    <div>
      <div className="flex gap-2 mb-5">
        {(["en", "af"] as const).map((l) => (
          <button
            key={l}
            onClick={() => setLang(l)}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors ${
              lang === l
                ? "bg-[#00D4FF] text-[#0a0a1a]"
                : "glass text-white/70 hover:text-white"
            }`}
          >
            {l === "en" ? "English" : "Afrikaans"}
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <p className="text-white/60 text-sm">
          {lang === "en"
            ? "Documents are being loaded — check back shortly."
            : "Dokumente word gelaai — kom binnekort terug."}
        </p>
      ) : (
        <ul className="flex flex-col gap-3">
          {visible.map((file) => (
            <li key={`${file.language}-${file.title}`}>
              <a
                href={file.url}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card flex items-center justify-between gap-4 px-5 py-4 rounded-xl group"
              >
                <span className="text-white font-medium">{file.title}</span>
                <span className="text-[#00D4FF] text-sm font-semibold shrink-0 group-hover:underline">
                  Download PDF ↓
                </span>
              </a>
            </li>
          ))}
        </ul>
      )}

      <p className="text-white/40 text-xs mt-5">
        Download links refresh each time you open this page and stay valid for 1
        hour. Bookmark this page — your link keeps working.
      </p>
    </div>
  );
}

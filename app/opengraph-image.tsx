import { ImageResponse } from "next/og";

// Branded 1200x630 social card used for Open Graph + Twitter previews across the
// whole site (the file convention auto-wires og:image and twitter:image).
export const alt =
  "NexiStudy — CAPS study tools, AI tutor and past papers for South African students";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #050D1A 0%, #0E1F3D 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", fontSize: 88, fontWeight: 800 }}>
          <span style={{ color: "#FFFFFF" }}>Nexi</span>
          <span style={{ color: "#00D4FF" }}>Study</span>
        </div>
        <div
          style={{
            width: 120,
            height: 8,
            borderRadius: 999,
            background: "#FFB454",
            margin: "32px 0",
          }}
        />
        <div style={{ display: "flex", color: "#FFFFFF", fontSize: 44, fontWeight: 700, lineHeight: 1.25, maxWidth: 920 }}>
          CAPS study tools, an AI tutor &amp; free NSC past papers
        </div>
        <div style={{ display: "flex", color: "rgba(255,255,255,0.65)", fontSize: 30, marginTop: 24 }}>
          For South African students · Grade 8 to matric · 11 languages
        </div>
      </div>
    ),
    { ...size }
  );
}

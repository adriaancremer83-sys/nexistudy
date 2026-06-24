import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { getSubjects } from "@/lib/pastPapers";

// Public, indexable routes only. Auth-gated pages (dashboard, account, admin,
// onboarding, practice, teachers/dashboard) are intentionally excluded.
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: { path: string; priority: number; freq: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
    { path: "", priority: 1.0, freq: "weekly" },
    { path: "/studypro", priority: 0.8, freq: "monthly" },
    { path: "/subject-choice", priority: 0.8, freq: "monthly" },
    { path: "/matric", priority: 0.8, freq: "monthly" },
    { path: "/nexi-tutor", priority: 0.8, freq: "monthly" },
    { path: "/past-papers", priority: 0.9, freq: "monthly" },
    { path: "/pricing", priority: 0.7, freq: "monthly" },
    { path: "/teachers", priority: 0.7, freq: "monthly" },
    { path: "/about-us", priority: 0.5, freq: "yearly" },
    { path: "/contact", priority: 0.4, freq: "yearly" },
    { path: "/privacy", priority: 0.3, freq: "yearly" },
    { path: "/signup", priority: 0.5, freq: "yearly" },
    { path: "/login", priority: 0.3, freq: "yearly" },
  ];

  const staticEntries: MetadataRoute.Sitemap = staticPages.map((p) => ({
    url: `${SITE_URL}${p.path}`,
    lastModified: now,
    changeFrequency: p.freq,
    priority: p.priority,
  }));

  const pastPaperEntries: MetadataRoute.Sitemap = getSubjects().map((s) => ({
    url: `${SITE_URL}/past-papers/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticEntries, ...pastPaperEntries];
}

import type { Metadata } from "next";

// Canonical production origin. www is the canonical host (apex 301s to it).
export const SITE_URL = "https://www.nexistudy.co.za";
export const SITE_NAME = "NexiStudy";

// Builds a consistent Metadata object for a page: document title + description,
// a canonical URL, and matching Open Graph / Twitter tags so shared links render
// a clean preview. The social image is inherited site-wide from
// app/opengraph-image.tsx, so it isn't repeated here.
export function pageMeta({
  title,
  description,
  path = "/",
}: {
  title: string;
  description: string;
  path?: string;
}): Metadata {
  const url = path === "/" ? SITE_URL : `${SITE_URL}${path}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      type: "website",
      locale: "en_ZA",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

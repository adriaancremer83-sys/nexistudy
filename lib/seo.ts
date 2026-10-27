import type { Metadata } from "next";

// Canonical production origin. www is the canonical host (apex 301s to it).
export const SITE_URL = "https://www.nexistudy.co.za";
export const SITE_NAME = "NexiStudy";

// BreadcrumbList structured data — Google shows the trail instead of the bare
// URL in results. `items` run from the top level down, as [name, path].
export function breadcrumbJsonLd(items: [string, string][]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map(([name, path], i) => ({
      "@type": "ListItem",
      position: i + 1,
      name,
      item: `${SITE_URL}${path}`,
    })),
  };
}

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

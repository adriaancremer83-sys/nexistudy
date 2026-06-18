import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Private / auth-gated areas and API routes shouldn't be crawled.
        disallow: [
          "/api/",
          "/dashboard",
          "/account",
          "/admin",
          "/onboarding",
          "/practice",
          "/teachers/dashboard",
        ],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}

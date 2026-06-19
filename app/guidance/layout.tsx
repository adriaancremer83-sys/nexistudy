import { pageMeta } from "@/lib/seo";

// Metadata wrapper for the client-component Career & APS Guidance page.
export const metadata = pageMeta({
  title: "Career Guide & APS Calculator — Courses, NSFAS & Bursaries",
  description:
    "Work out your APS score and get personalised South African study and career guidance from Nexi — course and university fit, NSFAS eligibility, and bursaries to chase.",
  path: "/guidance",
});

export default function GuidanceLayout({ children }: { children: React.ReactNode }) {
  return children;
}

import { pageMeta } from "@/lib/seo";

// Metadata wrapper for the client-component Nexi Tutor page.
export const metadata = pageMeta({
  title: "Nexi Tutor — Free AI Study Help in 11 Languages",
  description:
    "Get step-by-step help with Maths, Science and any CAPS subject from Nexi, NexiStudy's AI tutor — available 24/7 in all 11 official South African languages.",
  path: "/nexi-tutor",
});

export default function NexiTutorLayout({ children }: { children: React.ReactNode }) {
  return children;
}

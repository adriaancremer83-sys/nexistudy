import { pageMeta } from "@/lib/seo";

// Metadata wrapper: the page itself is a client component and can't export
// metadata, so this server-component layout supplies it.
export const metadata = pageMeta({
  title: "Study Pro — APS Calculator & Subject Tracker",
  description:
    "Calculate your APS score, track your CAPS subject marks and see which university courses you qualify for. Free for South African Grade 8–12 students.",
  path: "/studypro",
});

export default function StudyProLayout({ children }: { children: React.ReactNode }) {
  return children;
}

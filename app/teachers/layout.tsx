import { pageMeta } from "@/lib/seo";

// Metadata wrapper for the client-component Teachers landing page. (The nested
// /teachers/dashboard is auth-gated and excluded from crawling via robots.)
export const metadata = pageMeta({
  title: "For Teachers — Free Class Dashboards & Weak-Spot Heatmaps",
  description:
    "A free NexiStudy teacher account shows you what your class is collectively stuck on, works alongside Google Classroom, and helps learners when you can't be there.",
  path: "/teachers",
});

export default function TeachersLayout({ children }: { children: React.ReactNode }) {
  return children;
}

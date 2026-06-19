import { pageMeta } from "@/lib/seo";

// Metadata wrapper for the client-component Mark My Answer page.
export const metadata = pageMeta({
  title: "Mark My Answer — AI Exam Marking against the NSC Memo",
  description:
    "Snap a photo of your handwritten Maths, Science or Accounting answer and Nexi marks it like an NSC examiner — method marks, where you lost marks, and a model answer.",
  path: "/mark",
});

export default function MarkLayout({ children }: { children: React.ReactNode }) {
  return children;
}

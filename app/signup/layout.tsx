import { pageMeta } from "@/lib/seo";

// signup/page.tsx is a client component, so its metadata lives here. Without
// it the page inherited the root canonical ("/") and Google treated it as a
// duplicate of the homepage.
export const metadata = pageMeta({
  title: "Create a Free Account",
  description:
    "Join NexiStudy free — a CAPS-aligned AI tutor for Grade 8 to matric in all 11 official languages, plus NSC past papers, answer marking and an APS calculator. No card needed.",
  path: "/signup",
});

export default function SignupLayout({ children }: { children: React.ReactNode }) {
  return children;
}

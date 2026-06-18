import { pageMeta } from "@/lib/seo";

// Metadata wrapper for the client-component Contact page.
export const metadata = pageMeta({
  title: "Contact NexiStudy — Bugs & Feedback",
  description:
    "Found a bug or have feedback on NexiStudy? Reach the team by email or WhatsApp. (For schoolwork help, ask your AI tutor Nexi.)",
  path: "/contact",
});

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}

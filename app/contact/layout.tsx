import { pageMeta } from "@/lib/seo";

// Metadata wrapper for the client-component Contact page.
export const metadata = pageMeta({
  title: "Contact NexiStudy",
  description:
    "Questions, feedback or partnership ideas? Get in touch with the NexiStudy team — we'd love to hear from learners, parents and teachers.",
  path: "/contact",
});

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}

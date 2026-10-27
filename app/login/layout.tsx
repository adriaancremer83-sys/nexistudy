import type { Metadata } from "next";

// login/page.tsx is a client component, so its metadata lives here. A sign-in
// page has no search value — keep it out of the index rather than letting it
// inherit the homepage canonical.
export const metadata: Metadata = {
  title: "Sign In",
  robots: { index: false, follow: true },
  alternates: { canonical: "/login" },
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return children;
}

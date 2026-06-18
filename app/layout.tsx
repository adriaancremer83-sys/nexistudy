import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";
import BackgroundFX from "@/components/BackgroundFX";
import ScrollToTop from "@/components/ScrollToTop";
import PageViewTracker from "@/components/PageViewTracker";
import { SITE_URL, SITE_NAME } from "@/lib/seo";

const nunito = Nunito({
  variable: "--font-app",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const SITE_DESCRIPTION =
  "NexiStudy helps South African Grade 8–12 students study smarter: a CAPS-aligned AI tutor in all 11 official languages, free NSC past papers, topic practice and an APS calculator.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "NexiStudy — CAPS Study Tools, AI Tutor & Past Papers for SA Students",
    template: "%s — NexiStudy",
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "CAPS",
    "NSC past papers",
    "matric",
    "Grade 12",
    "APS calculator",
    "AI tutor",
    "South Africa",
    "study app",
    "exam practice",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "en_ZA",
    url: SITE_URL,
    title: "NexiStudy — CAPS Study Tools, AI Tutor & Past Papers",
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: "NexiStudy — CAPS Study Tools, AI Tutor & Past Papers",
    description: SITE_DESCRIPTION,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${nunito.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <BackgroundFX />
        <Providers>
          <ScrollToTop />
          <PageViewTracker />
          <Navbar />
          <main className="flex-1 relative z-10">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}

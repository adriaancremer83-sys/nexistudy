import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";
import BackgroundFX from "@/components/BackgroundFX";
import ScrollToTop from "@/components/ScrollToTop";

const nunito = Nunito({
  variable: "--font-app",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "NexiStudy",
  description: "Smart learning tools for students — Study Pro, AI Tutor, and more.",
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
          <Navbar />
          <main className="flex-1 relative z-10">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}

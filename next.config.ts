import type { NextConfig } from "next";

// Content Security Policy. 'unsafe-inline' is required for Next.js's hydration
// scripts and React inline styles; everything else is locked to our own origin
// plus the few services the browser legitimately talks to (Supabase, PayFast
// form posts). next/font self-hosts fonts, so no external font origins needed.
const csp = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  "connect-src 'self' https://*.supabase.co",
  "form-action 'self' https://www.payfast.co.za https://sandbox.payfast.co.za",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
];

const nextConfig: NextConfig = {
  // A stray package-lock.json in the home directory makes Next.js infer
  // the wrong workspace root and scan far too many files without this.
  outputFileTracingRoot: __dirname,
  experimental: {
    // Lower webpack's peak memory usage (slightly slower compiles).
    webpackMemoryOptimizations: true,
    // Don't preload every page's modules when the dev server starts.
    preloadEntriesOnStart: false,
    // Skip server source map generation to save memory.
    serverSourceMaps: false,
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;

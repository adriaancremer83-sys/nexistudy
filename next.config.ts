import type { NextConfig } from "next";

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
};

export default nextConfig;

// Best-effort, dependency-free, in-memory rate limiter. On serverless each
// instance keeps its own map (and resets on cold start), so this stops naive
// bursts and casual abuse — not a coordinated distributed attack. For hard
// guarantees, move this to a shared store (e.g. Upstash Redis).

type Bucket = { count: number; resetAt: number };
const buckets = new Map<string, Bucket>();

// Returns true if the request is allowed, false if the limit is exceeded.
export function rateLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();

  // Opportunistic cleanup so the map can't grow unbounded.
  if (buckets.size > 5000) {
    for (const [k, b] of buckets) if (now > b.resetAt) buckets.delete(k);
  }

  const bucket = buckets.get(key);
  if (!bucket || now > bucket.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }
  if (bucket.count >= limit) return false;
  bucket.count += 1;
  return true;
}

// Best-guess client IP behind Vercel's proxy.
export function clientIp(req: Request): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

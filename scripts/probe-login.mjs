// Performs a real credentials login against the live site and reports the result.
// Usage: node scripts/probe-login.mjs [email] [password]
const base = "https://nexistudy.vercel.app";
const email = process.argv[2] ?? "premium@nexistudy.co.za";
const password = process.argv[3] ?? "NexiTest2026";

try {
  const csrfRes = await fetch(`${base}/api/auth/csrf`);
  if (!csrfRes.ok) {
    console.log(`CSRF FAIL status=${csrfRes.status}`);
    process.exit(1);
  }
  const cookies = csrfRes.headers
    .getSetCookie()
    .map((c) => c.split(";")[0])
    .join("; ");
  const { csrfToken } = await csrfRes.json();

  const res = await fetch(`${base}/api/auth/callback/credentials`, {
    method: "POST",
    headers: { cookie: cookies, "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ csrfToken, email, password, json: "true" }),
    redirect: "manual",
  });
  const ok = res.headers.getSetCookie().some((c) => c.includes("session-token"));
  console.log(ok ? `LOGIN OK for ${email}` : `LOGIN FAIL status=${res.status}`);
  process.exit(ok ? 0 : 1);
} catch (err) {
  console.log(`PROBE ERROR: ${err.message}`);
  process.exit(1);
}

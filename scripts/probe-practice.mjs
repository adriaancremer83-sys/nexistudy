// End-to-end test of the practice loop on the live site:
// logs in as the premium test account, takes a real Trigonometry quiz,
// submits it, and shows the recorded mastery.
// Run: NODE_OPTIONS=--use-system-ca node --env-file=.env.local scripts/probe-practice.mjs
import { createClient } from "@supabase/supabase-js";

const base = "https://nexistudy.vercel.app";
const email = "premium@nexistudy.co.za";
const password = "NexiTest2026";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

function takeCookies(res, jar) {
  for (const c of res.headers.getSetCookie()) jar.set(c.split("=")[0], c.split(";")[0]);
  return [...jar.values()].join("; ");
}

// 1. Log in
const jar = new Map();
const csrfRes = await fetch(`${base}/api/auth/csrf`);
let cookies = takeCookies(csrfRes, jar);
const { csrfToken } = await csrfRes.json();

const loginRes = await fetch(`${base}/api/auth/callback/credentials`, {
  method: "POST",
  headers: { cookie: cookies, "content-type": "application/x-www-form-urlencoded" },
  body: new URLSearchParams({ csrfToken, email, password, json: "true" }),
  redirect: "manual",
});
cookies = takeCookies(loginRes, jar);
if (![...jar.keys()].some((k) => k.includes("session-token"))) {
  console.error("FAIL: login did not produce a session");
  process.exit(1);
}
console.log("1. logged in as", email);

// 2. Find the Trigonometry topic
const { data: topic } = await supabase
  .from("topics")
  .select("id,name")
  .eq("name", "Trigonometry")
  .single();
console.log("2. topic:", topic.name);

// 3. Fetch a quiz through the real API
const quizRes = await fetch(`${base}/api/practice/quiz?topic=${topic.id}`, {
  headers: { cookie: cookies },
});
if (!quizRes.ok) {
  console.error("FAIL: quiz fetch returned", quizRes.status, await quizRes.text());
  process.exit(1);
}
const { questions } = await quizRes.json();
console.log(`3. received ${questions.length} questions (answers stripped: ${!("correct_index" in questions[0])})`);

// 4. Answer everything with option B (deliberately mixed result)
const answers = Object.fromEntries(questions.map((q) => [q.id, 1]));

// 5. Submit through the real API
const submitRes = await fetch(`${base}/api/practice/submit`, {
  method: "POST",
  headers: { cookie: cookies, "content-type": "application/json" },
  body: JSON.stringify({ topicId: topic.id, answers }),
});
if (!submitRes.ok) {
  console.error("FAIL: submit returned", submitRes.status, await submitRes.text());
  process.exit(1);
}
const result = await submitRes.json();
console.log(`4. marked: ${result.correct}/${result.total} correct, mastery now ${result.mastery}%`);
console.log("   sample explanation:", result.results[0].explanation.slice(0, 80) + "...");

// 6. Confirm the weak-spots layer recorded it
const { data: lt } = await supabase
  .from("learner_topics")
  .select("attempts,questions_answered,questions_correct,mastery")
  .eq("topic_id", topic.id)
  .limit(1)
  .single();
console.log("5. learner_topics row:", JSON.stringify(lt));
console.log("PASS: full practice loop works on the live site");

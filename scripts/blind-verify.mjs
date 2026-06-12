// Blind verification of a question bank, in two steps.
//
// Step 1 — export (no answers included):
//   NODE_OPTIONS=--use-system-ca node --env-file=.env.local scripts/blind-verify.mjs export "Mathematics" "Grade 12"
//   -> writes scripts/blind/<subject>-questions.json (id, prompt, options only)
//   A FRESH session then solves every question cold and writes
//   scripts/blind/<subject>-answers.json as {"<question id>": <chosen index>, ...}
//
// Step 2 — compare:
//   NODE_OPTIONS=--use-system-ca node --env-file=.env.local scripts/blind-verify.mjs compare "Mathematics" "Grade 12"
//   -> diffs the blind answers against the stored correct_index; any mismatch
//      means the question must be fixed or discarded before the bank is LIVE-OK.
import { createClient } from "@supabase/supabase-js";
import { writeFileSync, readFileSync, mkdirSync } from "fs";

const [mode, subject = "Mathematics", grade = "Grade 12"] = process.argv.slice(2);
const slug = subject.toLowerCase().replace(/[^a-z0-9]+/g, "-");

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

const { data: topics } = await supabase
  .from("topics")
  .select("id,name")
  .eq("subject", subject)
  .eq("grade", grade);
const topicIds = (topics ?? []).map((t) => t.id);
const topicName = new Map((topics ?? []).map((t) => [t.id, t.name]));

const { data: questions } = await supabase
  .from("questions")
  .select("id,topic_id,prompt,options,correct_index")
  .in("topic_id", topicIds);

if (mode === "export") {
  mkdirSync("scripts/blind", { recursive: true });
  const out = (questions ?? []).map((q) => ({
    id: q.id,
    topic: topicName.get(q.topic_id),
    prompt: q.prompt,
    options: q.options,
  }));
  writeFileSync(`scripts/blind/${slug}-questions.json`, JSON.stringify(out, null, 1));
  console.log(`exported ${out.length} questions (answers withheld) -> scripts/blind/${slug}-questions.json`);
} else if (mode === "compare") {
  const answers = JSON.parse(readFileSync(`scripts/blind/${slug}-answers.json`, "utf8"));
  let match = 0;
  let mismatch = 0;
  let missing = 0;
  for (const q of questions ?? []) {
    const blind = answers[q.id];
    if (blind === undefined) {
      missing++;
      console.log(`MISSING answer: [${topicName.get(q.topic_id)}] ${q.prompt.slice(0, 70)}`);
    } else if (blind === q.correct_index) {
      match++;
    } else {
      mismatch++;
      console.log(`MISMATCH: [${topicName.get(q.topic_id)}] ${q.prompt.slice(0, 70)}`);
      console.log(`  stored: ${q.correct_index} (${q.options[q.correct_index]})  blind: ${blind} (${q.options[blind]})`);
    }
  }
  console.log(`\n${match} match, ${mismatch} mismatch, ${missing} missing of ${(questions ?? []).length}`);
  console.log(mismatch + missing === 0 ? "BANK LIVE-OK ✓" : "NOT LIVE-OK — resolve mismatches first");
  process.exit(mismatch + missing === 0 ? 0 : 1);
} else {
  console.log('usage: blind-verify.mjs export|compare "Subject" "Grade 12"');
  process.exit(1);
}

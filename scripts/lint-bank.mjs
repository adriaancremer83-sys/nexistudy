// Mechanical checks on the question bank in Supabase.
// Run: NODE_OPTIONS=--use-system-ca node --env-file=.env.local scripts/lint-bank.mjs [subject] [grade]
import { createClient } from "@supabase/supabase-js";

const subject = process.argv[2] ?? "Mathematics";
const grade = process.argv[3] ?? "Grade 12";

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

let problems = 0;
let total = 0;
for (const topic of topics ?? []) {
  const { data: questions } = await supabase
    .from("questions")
    .select("id,prompt,options,correct_index,explanation")
    .eq("topic_id", topic.id);

  for (const q of questions ?? []) {
    total++;
    const issues = [];
    if (!Array.isArray(q.options) || q.options.length !== 4) issues.push("needs exactly 4 options");
    if (new Set((q.options ?? []).map((o) => String(o).trim().toLowerCase())).size !== (q.options ?? []).length)
      issues.push("duplicate options");
    if (q.correct_index < 0 || q.correct_index > 3) issues.push("correct_index out of range");
    if (!q.explanation || q.explanation.trim().length < 20) issues.push("explanation too short");
    if (!q.prompt || q.prompt.trim().length < 10) issues.push("prompt too short");
    if (issues.length > 0) {
      problems++;
      console.log(`ISSUE [${topic.name}] "${q.prompt.slice(0, 60)}...": ${issues.join("; ")}`);
    }
  }
}
console.log(`${subject} ${grade}: ${total} questions checked, ${problems} with issues`);
process.exit(problems > 0 ? 1 : 0);

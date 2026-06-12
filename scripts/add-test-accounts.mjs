// Adds test accounts to the live Supabase database.
// Run: NODE_OPTIONS=--use-system-ca node --env-file=.env.local scripts/add-test-accounts.mjs
import { createClient } from "@supabase/supabase-js";
import bcrypt from "bcryptjs";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

const accounts = [
  {
    name: "Adriaan (Premium Test)",
    email: "premium@nexistudy.co.za",
    password: "NexiTest2026",
    plan: "premium",
    aps_score: 34,
    grade: "Grade 12",
    curriculum: "CAPS",
    role: "learner",
    school: "",
  },
];

for (const acc of accounts) {
  const { password, ...rest } = acc;
  const row = { ...rest, password_hash: bcrypt.hashSync(password, 10) };
  const { error } = await supabase.from("users").insert(row);
  if (error) {
    if (error.code === "23505") {
      console.log(`exists already: ${acc.email}`);
    } else {
      console.error(`FAIL ${acc.email}: ${error.message}`);
      process.exitCode = 1;
    }
  } else {
    console.log(`created: ${acc.email} (${acc.plan} ${acc.role})`);
  }
}

// Sanity-check all test accounts, including the seeded teacher.
const { data } = await supabase
  .from("users")
  .select("name,email,role,plan,grade,school")
  .in("email", ["premium@nexistudy.co.za", "teacher@nexistudy.co.za", "demo@nexistudy.co.za"]);
console.table(data);

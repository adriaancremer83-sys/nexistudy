// Adds a complimentary (unpaid) premium account to the live Supabase database.
// Run: NODE_OPTIONS=--use-system-ca node --env-file=.env.local scripts/add-joshua-premium.mjs
import { createClient } from "@supabase/supabase-js";
import bcrypt from "bcryptjs";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

const account = {
  name: "Joshua",
  email: "joshua@nexistudy.co.za",
  password: "Joshua2026",
  plan: "premium",
  aps_score: 0,
  grade: "Grade 12",
  curriculum: "CAPS",
  role: "learner",
  school: "",
};

const { password, ...rest } = account;
const row = { ...rest, password_hash: bcrypt.hashSync(password, 10) };

// Upsert-by-email: if Joshua already exists, make sure he's premium with the
// right password rather than erroring out.
const { data: existing } = await supabase
  .from("users")
  .select("id")
  .eq("email", account.email)
  .maybeSingle();

if (existing) {
  const { error } = await supabase
    .from("users")
    .update({ plan: "premium", password_hash: row.password_hash, name: account.name })
    .eq("email", account.email);
  if (error) {
    console.error(`FAIL update ${account.email}: ${error.message}`);
    process.exitCode = 1;
  } else {
    console.log(`updated existing -> premium: ${account.email}`);
  }
} else {
  const { error } = await supabase.from("users").insert(row);
  if (error) {
    console.error(`FAIL ${account.email}: ${error.message}`);
    process.exitCode = 1;
  } else {
    console.log(`created: ${account.email} (premium learner)`);
  }
}

const { data } = await supabase
  .from("users")
  .select("name,email,role,plan,grade")
  .eq("email", account.email);
console.table(data);

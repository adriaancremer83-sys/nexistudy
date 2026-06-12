// One-off check that the app's Supabase code path works end to end.
// Run: NODE_OPTIONS=--use-system-ca node --env-file=.env.local scripts/test-db.mjs
import { createClient } from "@supabase/supabase-js";
import bcrypt from "bcryptjs";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

const { data, error } = await supabase
  .from("users")
  .select("*")
  .eq("email", "demo@nexistudy.co.za")
  .maybeSingle();

if (error) {
  console.error("FAIL: query error:", error.message);
  process.exit(1);
}
if (!data) {
  console.error("FAIL: demo user not found");
  process.exit(1);
}

const ok = bcrypt.compareSync("password123", data.password_hash);
console.log(`found: ${data.name} <${data.email}> role=${data.role} plan=${data.plan}`);
console.log(ok ? "PASS: password verifies" : "FAIL: password does not verify");
process.exit(ok ? 0 : 1);

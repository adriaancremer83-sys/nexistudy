// Verify the premium test account's stored hash matches the expected password.
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
  .eq("email", "premium@nexistudy.co.za")
  .maybeSingle();

if (error || !data) {
  console.error("row not found:", error?.message ?? "no data");
  process.exit(1);
}

console.log(`email: [${data.email}]  plan: ${data.plan}  role: ${data.role}`);
console.log("password 'NexiTest2026' matches:", bcrypt.compareSync("NexiTest2026", data.password_hash));

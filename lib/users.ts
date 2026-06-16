import bcrypt from "bcryptjs";
import { supabaseAdmin } from "./supabase";

export interface AppUser {
  id: string;
  name: string;
  email: string;
  password: string;
  plan: "free" | "premium";
  apsScore: number;
  grade: string;
  curriculum: string;
  role: "learner" | "teacher";
  school: string;
  language: string;
  subjects: string[];
  onboarded: boolean;
}

interface UserRow {
  id: string;
  name: string;
  email: string;
  password_hash: string;
  plan: "free" | "premium";
  aps_score: number;
  grade: string;
  curriculum: string;
  role: "learner" | "teacher";
  school: string;
  // Added by supabase-onboarding-setup.sql — may be absent until that runs, so
  // every read below is defaulted defensively.
  language?: string;
  subjects?: string[] | null;
  onboarded?: boolean;
}

function rowToUser(row: UserRow): AppUser {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    password: row.password_hash,
    plan: row.plan,
    apsScore: row.aps_score,
    grade: row.grade,
    curriculum: row.curriculum,
    role: row.role,
    school: row.school,
    language: row.language ?? "English",
    subjects: Array.isArray(row.subjects) ? row.subjects : [],
    // Default true when the column is missing so nobody is trapped in the
    // onboarding redirect before the migration runs. Real rows drive the flow.
    onboarded: row.onboarded ?? true,
  };
}

// Persist a learner's onboarding choices. Marks the account onboarded so the
// post-login redirect stops sending them to the setup screen.
export async function updateOnboarding(
  userId: string,
  fields: { language: string; grade: string; school: string; subjects: string[] }
): Promise<boolean> {
  const { error } = await supabaseAdmin
    .from("users")
    .update({
      language: fields.language,
      grade: fields.grade,
      school: fields.school,
      subjects: fields.subjects,
      onboarded: true,
    })
    .eq("id", userId);

  if (error) {
    console.error("updateOnboarding failed:", error.message);
    return false;
  }
  return true;
}

export async function findUser(email: string): Promise<AppUser | null> {
  const { data, error } = await supabaseAdmin
    .from("users")
    .select("*")
    .eq("email", email.toLowerCase())
    .maybeSingle();

  if (error) {
    console.error("findUser failed:", error.message);
    return null;
  }
  return data ? rowToUser(data as UserRow) : null;
}

// language / subjects / onboarded are left to the DB defaults at signup — the
// learner fills them in on the onboarding screen after first login.
export async function createUser(
  data: Omit<AppUser, "id" | "language" | "subjects" | "onboarded">
): Promise<AppUser | null> {
  const { data: row, error } = await supabaseAdmin
    .from("users")
    .insert({
      name: data.name,
      email: data.email.toLowerCase(),
      password_hash: data.password,
      plan: data.plan,
      aps_score: data.apsScore,
      grade: data.grade,
      curriculum: data.curriculum,
      role: data.role,
      school: data.school,
    })
    .select()
    .single();

  if (error) {
    console.error("createUser failed:", error.message);
    return null;
  }
  return rowToUser(row as UserRow);
}

export function verifyPassword(plain: string, hash: string): boolean {
  return bcrypt.compareSync(plain, hash);
}

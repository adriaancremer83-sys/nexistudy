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
  };
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

export async function createUser(data: Omit<AppUser, "id">): Promise<AppUser | null> {
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

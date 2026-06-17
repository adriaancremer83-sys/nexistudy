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

export async function findUserById(userId: string): Promise<AppUser | null> {
  const { data, error } = await supabaseAdmin
    .from("users")
    .select("*")
    .eq("id", userId)
    .maybeSingle();

  if (error) {
    console.error("findUserById failed:", error.message);
    return null;
  }
  return data ? rowToUser(data as UserRow) : null;
}

// Subscription state read by the account page (the PayFast token lives here too,
// so cancel can reach the right subscription). Defaulted defensively in case the
// migration hasn't run yet.
export interface SubscriptionInfo {
  plan: "free" | "premium";
  status: "none" | "active" | "cancelled";
  startedAt: string | null;
  token: string | null;
}

export async function getSubscription(userId: string): Promise<SubscriptionInfo> {
  const { data } = await supabaseAdmin
    .from("users")
    .select("plan, subscription_status, subscription_started_at, payfast_token")
    .eq("id", userId)
    .maybeSingle();

  return {
    plan: (data?.plan as "free" | "premium") ?? "free",
    status: (data?.subscription_status as SubscriptionInfo["status"]) ?? "none",
    startedAt: data?.subscription_started_at ?? null,
    token: data?.payfast_token ?? null,
  };
}

// Promote a learner to premium after a verified, successful PayFast payment.
// Only overwrites the token/start date when we actually have them (the first
// recurring ITN carries the token; renewals may not).
export async function markPremium(
  userId: string,
  opts: { token?: string | null; mPaymentId?: string | null }
): Promise<boolean> {
  const update: Record<string, unknown> = {
    plan: "premium",
    subscription_status: "active",
  };
  if (opts.token) update.payfast_token = opts.token;
  if (opts.mPaymentId) update.payfast_m_payment_id = opts.mPaymentId;

  // Set the start date only if it isn't already set (don't reset it on renewal).
  const { data: existing } = await supabaseAdmin
    .from("users")
    .select("subscription_started_at")
    .eq("id", userId)
    .maybeSingle();
  if (!existing?.subscription_started_at) {
    update.subscription_started_at = new Date().toISOString();
  }

  const { error } = await supabaseAdmin.from("users").update(update).eq("id", userId);
  if (error) {
    console.error("markPremium failed:", error.message);
    return false;
  }
  return true;
}

// Drop a learner back to free — on a failed renewal or a cancellation.
export async function markFree(userId: string): Promise<boolean> {
  const { error } = await supabaseAdmin
    .from("users")
    .update({ plan: "free", subscription_status: "cancelled" })
    .eq("id", userId);
  if (error) {
    console.error("markFree failed:", error.message);
    return false;
  }
  return true;
}

// Mark the subscription cancelled but keep premium until the period lapses (the
// learner already paid for the current month). A future failed/cancelled ITN
// downgrades the plan itself.
export async function markCancelled(userId: string): Promise<boolean> {
  const { error } = await supabaseAdmin
    .from("users")
    .update({ subscription_status: "cancelled" })
    .eq("id", userId);
  if (error) {
    console.error("markCancelled failed:", error.message);
    return false;
  }
  return true;
}

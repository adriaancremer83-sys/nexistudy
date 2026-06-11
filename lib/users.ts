import bcrypt from "bcryptjs";

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

// Singleton pattern — survives Next.js hot-reload in development
const g = globalThis as typeof globalThis & { _nexiUsers?: Map<string, AppUser> };

if (!g._nexiUsers) {
  g._nexiUsers = new Map<string, AppUser>();
  // Seed a demo learner account
  g._nexiUsers.set("demo@nexistudy.co.za", {
    id: "demo-1",
    name: "Thandi Dlamini",
    email: "demo@nexistudy.co.za",
    password: bcrypt.hashSync("password123", 10),
    plan: "free",
    apsScore: 28,
    grade: "Grade 12",
    curriculum: "CAPS",
    role: "learner",
    school: "",
  });
  // Seed a demo teacher account
  g._nexiUsers.set("teacher@nexistudy.co.za", {
    id: "demo-t1",
    name: "Mr. Naidoo",
    email: "teacher@nexistudy.co.za",
    password: bcrypt.hashSync("password123", 10),
    plan: "free",
    apsScore: 0,
    grade: "",
    curriculum: "CAPS",
    role: "teacher",
    school: "Northview High",
  });
}

const users: Map<string, AppUser> = g._nexiUsers;

export function findUser(email: string): AppUser | null {
  return users.get(email.toLowerCase()) ?? null;
}

export function createUser(data: Omit<AppUser, "id">): AppUser {
  const user: AppUser = { ...data, id: Date.now().toString() };
  users.set(data.email.toLowerCase(), user);
  return user;
}

export function verifyPassword(plain: string, hash: string): boolean {
  return bcrypt.compareSync(plain, hash);
}

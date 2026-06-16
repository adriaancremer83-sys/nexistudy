import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface User {
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

  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      plan: "free" | "premium";
      apsScore: number;
      grade: string;
      curriculum: string;
      role: "learner" | "teacher";
      school: string;
      language: string;
      subjects: string[];
      onboarded: boolean;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
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
}

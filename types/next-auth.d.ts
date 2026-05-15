import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface User {
    plan: "free" | "premium";
    apsScore: number;
    grade: string;
    curriculum: string;
  }

  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      plan: "free" | "premium";
      apsScore: number;
      grade: string;
      curriculum: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    plan: "free" | "premium";
    apsScore: number;
    grade: string;
    curriculum: string;
  }
}

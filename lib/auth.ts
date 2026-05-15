import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { findUser, verifyPassword } from "./users";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = findUser(credentials.email);
        if (!user) return null;

        const valid = verifyPassword(credentials.password, user.password);
        if (!valid) return null;

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          plan: user.plan,
          apsScore: user.apsScore,
          grade: user.grade,
          curriculum: user.curriculum,
        };
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.plan = user.plan;
        token.apsScore = user.apsScore;
        token.grade = user.grade;
        token.curriculum = user.curriculum;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.plan = token.plan;
        session.user.apsScore = token.apsScore;
        session.user.grade = token.grade;
        session.user.curriculum = token.curriculum;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

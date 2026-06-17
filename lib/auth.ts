import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { findUser, findUserById, verifyPassword } from "./users";

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

        const user = await findUser(credentials.email);
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
          role: user.role ?? "learner",
          school: user.school ?? "",
          language: user.language ?? "English",
          subjects: user.subjects ?? [],
          onboarded: user.onboarded ?? true,
        };
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.plan = user.plan;
        token.apsScore = user.apsScore;
        token.grade = user.grade;
        token.curriculum = user.curriculum;
        token.role = user.role;
        token.school = user.school;
        token.language = user.language;
        token.subjects = user.subjects;
        token.onboarded = user.onboarded;
      }
      // Client calls update(...) after onboarding saves; merge the new values
      // into the token so the session reflects them without a re-login.
      if (trigger === "update" && session) {
        if (session.grade !== undefined) token.grade = session.grade;
        if (session.school !== undefined) token.school = session.school;
        if (session.language !== undefined) token.language = session.language;
        if (session.subjects !== undefined) token.subjects = session.subjects;
        if (session.onboarded !== undefined) token.onboarded = session.onboarded;
        // After a PayFast upgrade the client asks us to re-sync the plan. Read it
        // straight from the DB rather than trusting the client-supplied value.
        if (session.refreshSubscription && token.sub) {
          const fresh = await findUserById(token.sub);
          if (fresh) token.plan = fresh.plan;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub ?? "";
        session.user.plan = token.plan;
        session.user.apsScore = token.apsScore;
        session.user.grade = token.grade;
        session.user.curriculum = token.curriculum;
        session.user.role = token.role;
        session.user.school = token.school;
        session.user.language = token.language;
        session.user.subjects = token.subjects;
        session.user.onboarded = token.onboarded;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

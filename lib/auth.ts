import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { cookies } from "next/headers";
import { findUser, findUserById, findOrCreateOAuthUser, verifyPassword } from "./users";

// Only mount Google SSO once OAuth credentials are configured, so the app still
// runs (with password login) before they're set up. Set GOOGLE_CLIENT_ID and
// GOOGLE_CLIENT_SECRET in the environment to enable it.
const googleConfigured = !!(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET);

export const authOptions: NextAuthOptions = {
  providers: [
    ...(googleConfigured
      ? [
          GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
          }),
        ]
      : []),
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
    // For Google sign-ins, link/create the account in our users table here so a
    // DB row always exists by the time the jwt callback runs. The intended role
    // (teacher vs learner) is carried in a short-lived cookie set by the button
    // that started the flow; default to learner if it's missing.
    async signIn({ user, account, profile }) {
      if (account?.provider !== "google") return true;

      const email = user.email ?? (profile as { email?: string } | null)?.email;
      if (!email) return false;

      let role: "learner" | "teacher" = "learner";
      try {
        const jar = await cookies();
        if (jar.get("nexi_oauth_role")?.value === "teacher") role = "teacher";
      } catch {
        /* no cookie context — fall back to learner */
      }

      const dbUser = await findOrCreateOAuthUser({
        email,
        name: user.name ?? (profile as { name?: string } | null)?.name ?? "",
        role,
      });
      return !!dbUser;
    },
    async jwt({ token, user, account, trigger, session }) {
      // Google sign-in: the `user`/`profile` here is the Google identity, not our
      // record, so load the linked DB user and — critically — set token.sub to
      // OUR user id, since the whole app reads session.user.id from token.sub.
      if (account?.provider === "google") {
        const email = token.email ?? user?.email;
        if (email) {
          const dbUser = await findUser(email);
          if (dbUser) {
            token.sub = dbUser.id;
            token.plan = dbUser.plan;
            token.apsScore = dbUser.apsScore;
            token.grade = dbUser.grade;
            token.curriculum = dbUser.curriculum;
            token.role = dbUser.role;
            token.school = dbUser.school;
            token.language = dbUser.language;
            token.subjects = dbUser.subjects;
            token.onboarded = dbUser.onboarded;
          }
        }
      } else if (user) {
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

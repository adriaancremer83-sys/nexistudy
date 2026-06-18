import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import type { Session } from "next-auth";
import { getTopicsWithMastery, countQuizzesToday, FREE_QUIZZES_PER_DAY } from "@/lib/practice";
import { getSubscription } from "@/lib/users";
import PracticeClient from "@/components/PracticeClient";

export const dynamic = "force-dynamic";

type ExtendedUser = NonNullable<Session["user"]>;

export default async function PracticePage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/login");

  const user = session.user as ExtendedUser;
  if (user.role === "teacher") redirect("/teachers/dashboard");

  // Only ever show the learner's own grade — no fallback to another grade, so a
  // Grade 9 learner never sees Grade 12 banks. Grades without banks get a
  // "coming soon" state below.
  const topics = await getTopicsWithMastery(user.id, user.grade);

  // Live plan from the DB, not the session JWT, so a just-upgraded learner sees
  // unlimited quizzes immediately (matches /account and the practice API gates).
  const { plan } = await getSubscription(user.id);
  const used = plan === "free" ? await countQuizzesToday(user.id) : 0;
  const quizzesLeft =
    plan === "premium" ? null : Math.max(0, FREE_QUIZZES_PER_DAY - used);

  return (
    <div className="min-h-screen">
      <section className="page-hero py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <p className="text-[#00D4FF] text-sm font-medium mb-1">Practice</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-white">
            {user.grade} Practice
          </h1>
          <p className="text-white/40 text-sm mt-2 max-w-xl leading-relaxed">
            Short topic quizzes, marked instantly. Every answer builds your
            weak-spots map so Nexi knows exactly what to fix next.
          </p>
        </div>
      </section>

      <div className="section-divider" />

      <div className="max-w-5xl mx-auto px-4 py-10">
        {topics.length === 0 ? (
          <div className="glass rounded-2xl px-6 py-12 text-center max-w-xl mx-auto">
            <h2 className="text-white font-bold text-xl mb-2">
              Quizzes for {user.grade} are coming soon
            </h2>
            <p className="text-white/50 text-sm leading-relaxed mb-6">
              We&apos;re still building the {user.grade} question bank. In the
              meantime, dig into past papers or ask Nexi anything you&apos;re
              stuck on.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/past-papers"
                className="px-5 py-3 bg-[#2D6BE4] hover:bg-[#4A82F0] text-white text-sm font-bold rounded-xl transition-colors"
              >
                Browse past papers
              </Link>
              <Link
                href="/nexi-tutor"
                className="px-5 py-3 glass hover:bg-white/10 text-white text-sm font-bold rounded-xl transition-colors"
              >
                Chat with Nexi
              </Link>
            </div>
          </div>
        ) : (
          <PracticeClient
            topics={topics}
            plan={plan}
            quizzesLeft={quizzesLeft}
          />
        )}
      </div>
    </div>
  );
}

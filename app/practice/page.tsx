import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import type { Session } from "next-auth";
import { getTopicsWithMastery, countQuizzesToday, FREE_QUIZZES_PER_DAY } from "@/lib/practice";
import PracticeClient from "@/components/PracticeClient";

type ExtendedUser = NonNullable<Session["user"]>;

export default async function PracticePage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/login");

  const user = session.user as ExtendedUser;
  if (user.role === "teacher") redirect("/teachers/dashboard");

  // Mathematics is the launch subject. Show the learner's own grade if we
  // have questions for it, otherwise fall back to Grade 12 (the first bank).
  let topics = await getTopicsWithMastery(user.id, "Mathematics", user.grade);
  let gradeShown = user.grade;
  if (topics.length === 0) {
    topics = await getTopicsWithMastery(user.id, "Mathematics", "Grade 12");
    gradeShown = "Grade 12";
  }

  const used = user.plan === "free" ? await countQuizzesToday(user.id) : 0;
  const quizzesLeft =
    user.plan === "premium" ? null : Math.max(0, FREE_QUIZZES_PER_DAY - used);

  return (
    <div className="min-h-screen">
      <section className="page-hero py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <p className="text-[#00D4FF] text-sm font-medium mb-1">Practice</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-white">
            {gradeShown} Mathematics
          </h1>
          <p className="text-white/40 text-sm mt-2 max-w-xl leading-relaxed">
            Short topic quizzes, marked instantly. Every answer builds your
            weak-spots map so Nexi knows exactly what to fix next.
          </p>
        </div>
      </section>

      <div className="section-divider" />

      <div className="max-w-5xl mx-auto px-4 py-10">
        <PracticeClient
          topics={topics}
          plan={user.plan}
          quizzesLeft={quizzesLeft}
        />
      </div>
    </div>
  );
}

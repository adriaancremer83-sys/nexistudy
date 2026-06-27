import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import type { Session } from "next-auth";
import HomeworkRunner from "@/components/HomeworkRunner";
import { getHomeworkForLearner, getLearnerHomeworkResult } from "@/lib/homework";

export const dynamic = "force-dynamic";

type ExtendedUser = NonNullable<Session["user"]>;

interface Props {
  params: Promise<{ id: string }>;
}

export default async function HomeworkPage({ params }: Props) {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/login");

  const user = session.user as ExtendedUser;
  if (user.role === "teacher") redirect("/teachers/dashboard");
  if (!user.onboarded) redirect("/onboarding");

  const { id } = await params;

  // Already completed? Show the marked review instead of letting them re-do it.
  const existing = await getLearnerHomeworkResult(user.id, id);

  // Otherwise load the fresh question set (answers stripped).
  const fresh = existing ? null : await getHomeworkForLearner(user.id, id);

  const title = existing?.title ?? (fresh?.ok ? fresh.title : "Homework");
  const available = existing !== null || (fresh?.ok ?? false);

  return (
    <div className="min-h-screen">
      <section className="page-hero py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <p className="text-[#FFB454] text-sm font-medium mb-1">Homework</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-white">{title}</h1>
          {available && (
            <p className="text-white/40 text-sm mt-2 max-w-xl leading-relaxed">
              {existing
                ? "You've handed this in — here's how you did, with the answers explained."
                : "Set by your teacher. Answer each question — it's marked instantly and your teacher sees your score."}
            </p>
          )}
        </div>
      </section>

      <div className="section-divider" />

      <div className="max-w-5xl mx-auto px-4 py-10">
        {available ? (
          <HomeworkRunner
            homeworkId={id}
            title={title}
            questions={fresh?.ok ? fresh.questions : []}
            initialResult={existing}
          />
        ) : (
          <div className="glass rounded-2xl px-6 py-12 text-center max-w-xl mx-auto">
            <h2 className="text-white font-bold text-xl mb-2">This homework isn&apos;t available</h2>
            <p className="text-white/50 text-sm leading-relaxed mb-6">
              {fresh && !fresh.ok
                ? fresh.error
                : "It may have been removed, or it isn't set for one of your classes."}
            </p>
            <Link
              href="/dashboard"
              className="px-5 py-3 bg-[#FFB454] hover:bg-[#FFC678] text-[#050D1A] text-sm font-extrabold rounded-xl transition-colors"
            >
              Back to dashboard
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

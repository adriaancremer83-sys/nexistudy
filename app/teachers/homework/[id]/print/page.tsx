import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect, notFound } from "next/navigation";
import type { Session } from "next-auth";
import Link from "next/link";
import PrintButton from "@/components/PrintButton";
import { getHomeworkForPrint } from "@/lib/homework";

export const dynamic = "force-dynamic";

type ExtendedUser = NonNullable<Session["user"]>;

interface Props {
  params: Promise<{ id: string }>;
}

function formatDue(iso: string): string {
  return new Date(iso + "T00:00:00").toLocaleDateString("en-ZA", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

// Clean, light, printable worksheet + answer memo. The teacher opens this and
// uses the browser's Print dialog → "Save as PDF" (no PDF library needed). Print
// CSS hides everything except the sheet, so the dark app chrome doesn't print.
export default async function HomeworkPrintPage({ params }: Props) {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/teachers");

  const user = session.user as ExtendedUser;
  if (user.role !== "teacher") redirect("/dashboard");

  const { id } = await params;
  const hw = await getHomeworkForPrint(user.id, id);
  if (!hw) notFound();

  const letter = (i: number) => String.fromCharCode(65 + i);

  return (
    <div className="min-h-screen bg-[#050D1A] py-8 px-4">
      {/* Print-scoped CSS: show only the worksheet, on white, hide app chrome. */}
      <style>{`
        @media print {
          body * { visibility: hidden !important; }
          #worksheet, #worksheet * { visibility: visible !important; }
          #worksheet { position: absolute; left: 0; top: 0; width: 100%; }
          [data-noprint] { display: none !important; }
        }
      `}</style>

      {/* Screen-only toolbar */}
      <div className="max-w-3xl mx-auto mb-4 flex items-center justify-between gap-4" data-noprint>
        <Link href="/teachers/dashboard" className="text-white/50 hover:text-white text-sm transition-colors">
          ← Back to dashboard
        </Link>
        <PrintButton className="px-5 py-2.5 bg-[#FFB454] hover:bg-[#FFC678] text-[#050D1A] text-sm font-extrabold rounded-xl transition-colors cursor-pointer" />
      </div>

      {/* The sheet — explicitly light so it's independent of the dark theme. */}
      <div
        id="worksheet"
        className="max-w-3xl mx-auto bg-white text-black rounded-lg shadow-xl p-10 print:p-0 print:shadow-none print:rounded-none"
      >
        {/* Header */}
        <div className="border-b-2 border-black pb-4 mb-6">
          <div className="flex items-baseline justify-between gap-4">
            <h1 className="text-2xl font-extrabold">{hw.title}</h1>
            <span className="text-sm text-gray-600">NexiStudy</span>
          </div>
          <p className="text-sm text-gray-700 mt-1">
            {hw.className} · {hw.subject} · {hw.grade}
            {hw.dueDate && <> · Due {formatDue(hw.dueDate)}</>}
          </p>
          <div className="flex gap-8 mt-4 text-sm">
            <span>Name: ______________________________</span>
            <span>Mark: ______ / {hw.questions.length}</span>
          </div>
        </div>

        {/* Questions */}
        <ol className="space-y-5 list-none">
          {hw.questions.map((q, i) => (
            <li key={i} className="break-inside-avoid">
              <p className="font-semibold text-[15px] mb-2">
                {i + 1}. {q.prompt}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-1.5 pl-5">
                {q.options.map((opt, j) => (
                  <p key={j} className="text-[14px]">
                    <span className="font-bold mr-2">{letter(j)}.</span>
                    {opt}
                  </p>
                ))}
              </div>
            </li>
          ))}
        </ol>

        {/* Answer memo — starts on a fresh page when printed */}
        <div className="mt-10 pt-6 border-t-2 border-black break-before-page">
          <h2 className="text-xl font-extrabold mb-1">Answer Memo</h2>
          <p className="text-sm text-gray-600 mb-4">For the teacher — keep separate from learner copies.</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-2 gap-x-6">
            {hw.questions.map((q, i) => (
              <p key={i} className="text-[14px]">
                <span className="font-semibold">{i + 1}.</span>{" "}
                <span className="font-bold">{letter(q.correctIndex)}</span>
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

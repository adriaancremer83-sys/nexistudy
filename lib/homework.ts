import { supabaseAdmin } from "./supabase";

// ── HOMEWORK ────────────────────────────────────────────────────────────────
// A teacher pins an EXACT set of already-verified questions (from the existing
// bank, across one or more topics of the class's subject/grade) as homework.
// Learners answer that fixed set in-app; MCQ/single-answer questions are
// auto-marked against the verified key. The teacher gets a completion report and
// a "most-missed" breakdown, and can print the set as a worksheet + memo.
//
// IMPORTANT: nothing here generates questions. We only SELECT, SEQUENCE and
// FORMAT questions that already passed the blind-verify gate. If the bank can't
// supply enough, we say so honestly rather than padding with anything unverified.

export const HOMEWORK_QUESTION_CHOICES = [5, 8, 10, 15, 20] as const;
export const MAX_HOMEWORK_QUESTIONS = 50;

// ── Shared row shapes ──
interface QuestionRow {
  id: string;
  prompt: string;
  options: string[];
  correct_index: number;
  explanation: string;
}

export interface MarkedHomeworkQuestion {
  id: string;
  prompt: string;
  options: string[];
  correctIndex: number;
  chosenIndex: number | null;
  correct: boolean;
  explanation: string;
}

// ── Teacher: question availability + creation ─────────────────────────────────

// How many verified (un-flagged) questions the bank holds across the given
// topics. Used to honour "tell the teacher honestly" instead of padding.
async function countVerifiedQuestions(topicIds: string[]): Promise<number> {
  if (topicIds.length === 0) return 0;
  const { count, error } = await supabaseAdmin
    .from("questions")
    .select("id", { count: "exact", head: true })
    .in("topic_id", topicIds)
    .eq("flagged", false);
  if (error) {
    console.error("countVerifiedQuestions failed:", error.message);
    return 0;
  }
  return count ?? 0;
}

// Pull `count` verified question ids at random from the given topics, evenly-ish
// spread across the chosen topics so a multi-topic homework isn't all one topic.
async function pickVerifiedQuestionIds(topicIds: string[], count: number): Promise<string[]> {
  const { data, error } = await supabaseAdmin
    .from("questions")
    .select("id,topic_id")
    .in("topic_id", topicIds)
    .eq("flagged", false);
  if (error || !data) {
    console.error("pickVerifiedQuestionIds failed:", error?.message);
    return [];
  }

  // Shuffle within each topic, then round-robin across topics so the set draws
  // fairly from every topic the teacher picked.
  const byTopic = new Map<string, string[]>();
  for (const row of data) {
    const list = byTopic.get(row.topic_id as string) ?? [];
    list.push(row.id as string);
    byTopic.set(row.topic_id as string, list);
  }
  for (const list of byTopic.values()) list.sort(() => Math.random() - 0.5);

  const queues = [...byTopic.values()];
  const picked: string[] = [];
  while (picked.length < count && queues.some((q) => q.length > 0)) {
    for (const q of queues) {
      if (picked.length >= count) break;
      const next = q.shift();
      if (next) picked.push(next);
    }
  }
  return picked;
}

export type CreateHomeworkResult =
  | { ok: true }
  | { ok: false; error: string };

export async function createHomework(
  teacherId: string,
  classId: string,
  fields: { title: string; topicIds: string[]; numQuestions: number; dueDate: string | null }
): Promise<CreateHomeworkResult> {
  // The class must belong to this teacher.
  const { data: cls } = await supabaseAdmin
    .from("classes")
    .select("subject,grade")
    .eq("id", classId)
    .eq("teacher_id", teacherId)
    .maybeSingle();
  if (!cls) return { ok: false, error: "Class not found." };

  if (fields.topicIds.length === 0) {
    return { ok: false, error: "Pick at least one topic." };
  }

  // Every topic must belong to this class's subject + grade question bank.
  const { data: validTopics } = await supabaseAdmin
    .from("topics")
    .select("id")
    .in("id", fields.topicIds)
    .eq("subject", cls.subject as string)
    .eq("grade", cls.grade as string);
  const validIds = (validTopics ?? []).map((t) => t.id as string);
  if (validIds.length === 0) {
    return { ok: false, error: "Pick topics from this class's subject." };
  }

  // Honesty over padding: never assign more questions than the verified bank has.
  const available = await countVerifiedQuestions(validIds);
  if (available === 0) {
    return { ok: false, error: "There are no verified questions for the topic(s) you picked yet." };
  }
  if (fields.numQuestions > available) {
    return {
      ok: false,
      error: `Only ${available} verified ${available === 1 ? "question is" : "questions are"} available for the topic(s) you picked. Lower the number of questions to ${available} or fewer.`,
    };
  }

  const questionIds = await pickVerifiedQuestionIds(validIds, fields.numQuestions);
  if (questionIds.length === 0) {
    return { ok: false, error: "Could not build the homework. Please try again." };
  }

  const title = fields.title.trim().slice(0, 80) || "Homework";
  const { error } = await supabaseAdmin.from("class_homework").insert({
    class_id: classId,
    title,
    question_ids: questionIds,
    due_date: fields.dueDate,
  });
  if (error) {
    console.error("createHomework failed:", error.message);
    return { ok: false, error: "Could not create the homework. Please try again." };
  }
  return { ok: true };
}

export async function deleteHomework(teacherId: string, homeworkId: string): Promise<boolean> {
  // Confirm the homework's class is owned by this teacher before deleting.
  const { data: hw } = await supabaseAdmin
    .from("class_homework")
    .select("class_id")
    .eq("id", homeworkId)
    .maybeSingle();
  if (!hw) return false;
  const { data: cls } = await supabaseAdmin
    .from("classes")
    .select("id")
    .eq("id", hw.class_id as string)
    .eq("teacher_id", teacherId)
    .maybeSingle();
  if (!cls) return false;

  const { error } = await supabaseAdmin.from("class_homework").delete().eq("id", homeworkId);
  if (error) {
    console.error("deleteHomework failed:", error.message);
    return false;
  }
  return true;
}

// ── Teacher: completion report ────────────────────────────────────────────────

export interface MissedQuestion {
  prompt: string;
  wrongCount: number; // submissions that got it wrong or left it blank
}

export interface TeacherHomework {
  id: string;
  title: string;
  numQuestions: number;
  dueDate: string | null;
  createdAt: string;
  completedCount: number; // distinct learners who submitted
  averageScore: number | null; // avg % across submissions, null = none yet
  mostMissed: MissedQuestion[]; // the questions the class got wrong most often
}

// All homework for a class, each with live completion stats and the questions
// the class struggled with most — so the teacher knows what to re-teach.
export async function getClassHomework(classId: string): Promise<TeacherHomework[]> {
  const { data: rows, error } = await supabaseAdmin
    .from("class_homework")
    .select("id,title,question_ids,due_date,created_at")
    .eq("class_id", classId)
    .order("created_at", { ascending: false });
  if (error) {
    console.error("getClassHomework failed:", error.message);
    return [];
  }
  if (!rows || rows.length === 0) return [];

  const homeworkIds = rows.map((r) => r.id as string);
  const allQuestionIds = [...new Set(rows.flatMap((r) => (r.question_ids as string[]) ?? []))];

  const [submissionsRes, questionsRes] = await Promise.all([
    supabaseAdmin
      .from("homework_submissions")
      .select("homework_id,user_id,answers,total,correct")
      .in("homework_id", homeworkIds),
    allQuestionIds.length > 0
      ? supabaseAdmin.from("questions").select("id,prompt,correct_index").in("id", allQuestionIds)
      : Promise.resolve({ data: [] as { id: string; prompt: string; correct_index: number }[] }),
  ]);

  const submissions = (submissionsRes.data ?? []) as {
    homework_id: string;
    user_id: string;
    answers: Record<string, number>;
    total: number;
    correct: number;
  }[];
  const questionById = new Map(
    (questionsRes.data ?? []).map((q) => [q.id as string, q as { id: string; prompt: string; correct_index: number }])
  );

  return rows.map((r) => {
    const qIds = (r.question_ids as string[]) ?? [];
    const subs = submissions.filter((s) => s.homework_id === r.id);
    const avg =
      subs.length > 0
        ? Math.round(
            subs.reduce((sum, s) => sum + (s.total > 0 ? (s.correct / s.total) * 100 : 0), 0) / subs.length
          )
        : null;

    // Wrong-most-often: per question, count submissions whose chosen index isn't
    // the verified correct index (a blank answer counts as wrong).
    const missed: MissedQuestion[] = qIds
      .map((qid) => {
        const q = questionById.get(qid);
        if (!q) return null;
        let wrong = 0;
        for (const s of subs) {
          const chosen = s.answers?.[qid];
          if (chosen !== q.correct_index) wrong += 1;
        }
        return { prompt: q.prompt, wrongCount: wrong };
      })
      .filter((m): m is MissedQuestion => m !== null && m.wrongCount > 0)
      .sort((a, b) => b.wrongCount - a.wrongCount)
      .slice(0, 3);

    return {
      id: r.id as string,
      title: r.title as string,
      numQuestions: qIds.length,
      dueDate: (r.due_date as string | null) ?? null,
      createdAt: r.created_at as string,
      completedCount: subs.length,
      averageScore: avg,
      mostMissed: missed,
    };
  });
}

// ── Learner: list, take, submit ───────────────────────────────────────────────

export interface LearnerHomework {
  id: string;
  title: string;
  className: string;
  subject: string;
  numQuestions: number;
  dueDate: string | null;
  done: boolean;
  scorePct: number | null; // % if done, else null
}

// Homework assigned to the learner across every class they've joined, newest
// first, with whether they've already done it (and their score if so).
export async function getLearnerHomework(userId: string): Promise<LearnerHomework[]> {
  const { data: memberships } = await supabaseAdmin
    .from("class_members")
    .select("class_id")
    .eq("user_id", userId);
  const classIds = (memberships ?? []).map((m) => m.class_id as string);
  if (classIds.length === 0) return [];

  const { data: rows, error } = await supabaseAdmin
    .from("class_homework")
    .select("id,title,question_ids,due_date,created_at,classes(name,subject)")
    .in("class_id", classIds)
    .order("created_at", { ascending: false });
  if (error) {
    console.error("getLearnerHomework failed:", error.message);
    return [];
  }
  if (!rows || rows.length === 0) return [];

  const homeworkIds = rows.map((r) => r.id as string);
  const { data: subs } = await supabaseAdmin
    .from("homework_submissions")
    .select("homework_id,total,correct")
    .eq("user_id", userId)
    .in("homework_id", homeworkIds);
  const subByHw = new Map(
    (subs ?? []).map((s) => [s.homework_id as string, s as { total: number; correct: number }])
  );

  return rows.map((r) => {
    const cls = r.classes as unknown as { name: string; subject: string } | null;
    const sub = subByHw.get(r.id as string);
    return {
      id: r.id as string,
      title: r.title as string,
      className: cls?.name ?? "Your class",
      subject: cls?.subject ?? "",
      numQuestions: ((r.question_ids as string[]) ?? []).length,
      dueDate: (r.due_date as string | null) ?? null,
      done: !!sub,
      scorePct: sub && sub.total > 0 ? Math.round((sub.correct / sub.total) * 100) : null,
    };
  });
}

// Confirm the learner is a member of the class this homework belongs to.
async function learnerCanAccess(userId: string, classId: string): Promise<boolean> {
  const { data } = await supabaseAdmin
    .from("class_members")
    .select("user_id")
    .eq("class_id", classId)
    .eq("user_id", userId)
    .maybeSingle();
  return !!data;
}

// Order a freshly-loaded question set back into the homework's pinned sequence
// (Supabase `.in` doesn't preserve order).
function orderByIds<T extends { id: string }>(rows: T[], ids: string[]): T[] {
  const byId = new Map(rows.map((r) => [r.id, r]));
  return ids.map((id) => byId.get(id)).filter((r): r is T => !!r);
}

export type HomeworkForLearner =
  | { ok: true; title: string; questions: { id: string; prompt: string; options: string[] }[] }
  | { ok: false; error: string; alreadyDone?: boolean };

// The question set a learner answers, with the verified answers stripped out.
export async function getHomeworkForLearner(
  userId: string,
  homeworkId: string
): Promise<HomeworkForLearner> {
  const { data: hw } = await supabaseAdmin
    .from("class_homework")
    .select("id,class_id,title,question_ids")
    .eq("id", homeworkId)
    .maybeSingle();
  if (!hw) return { ok: false, error: "That homework doesn't exist." };
  if (!(await learnerCanAccess(userId, hw.class_id as string))) {
    return { ok: false, error: "This homework isn't for one of your classes." };
  }

  const { data: existing } = await supabaseAdmin
    .from("homework_submissions")
    .select("id")
    .eq("homework_id", homeworkId)
    .eq("user_id", userId)
    .maybeSingle();
  if (existing) return { ok: false, error: "You've already completed this homework.", alreadyDone: true };

  const qIds = (hw.question_ids as string[]) ?? [];
  const { data: questions } = await supabaseAdmin
    .from("questions")
    .select("id,prompt,options")
    .in("id", qIds);
  const ordered = orderByIds((questions ?? []) as { id: string; prompt: string; options: string[] }[], qIds);

  return {
    ok: true,
    title: hw.title as string,
    questions: ordered.map((q) => ({ id: q.id, prompt: q.prompt, options: q.options as string[] })),
  };
}

export interface HomeworkResult {
  title: string;
  total: number;
  correct: number;
  results: MarkedHomeworkQuestion[];
}

function markAgainst(questions: QuestionRow[], qIds: string[], answers: Record<string, number>) {
  const ordered = orderByIds(questions, qIds);
  const results: MarkedHomeworkQuestion[] = ordered.map((q) => {
    const chosen = answers[q.id];
    const chosenIndex =
      Number.isInteger(chosen) && chosen >= 0 && chosen <= 3 ? chosen : null;
    return {
      id: q.id,
      prompt: q.prompt,
      options: q.options as string[],
      correctIndex: q.correct_index,
      chosenIndex,
      correct: chosenIndex === q.correct_index,
      explanation: q.explanation,
    };
  });
  const total = results.length;
  const correct = results.filter((r) => r.correct).length;
  return { results, total, correct };
}

export type SubmitHomeworkResult =
  | { ok: true; result: HomeworkResult }
  | { ok: false; error: string; alreadyDone?: boolean };

// Auto-mark a learner's homework against the verified answers and record it once.
export async function submitHomework(
  userId: string,
  homeworkId: string,
  answers: Record<string, number>
): Promise<SubmitHomeworkResult> {
  const { data: hw } = await supabaseAdmin
    .from("class_homework")
    .select("id,class_id,title,question_ids")
    .eq("id", homeworkId)
    .maybeSingle();
  if (!hw) return { ok: false, error: "That homework doesn't exist." };
  if (!(await learnerCanAccess(userId, hw.class_id as string))) {
    return { ok: false, error: "This homework isn't for one of your classes." };
  }

  const { data: existing } = await supabaseAdmin
    .from("homework_submissions")
    .select("id")
    .eq("homework_id", homeworkId)
    .eq("user_id", userId)
    .maybeSingle();
  if (existing) return { ok: false, error: "You've already completed this homework.", alreadyDone: true };

  const qIds = (hw.question_ids as string[]) ?? [];
  const { data: questions, error } = await supabaseAdmin
    .from("questions")
    .select("id,prompt,options,correct_index,explanation")
    .in("id", qIds);
  if (error || !questions || questions.length === 0) {
    console.error("submitHomework load questions failed:", error?.message);
    return { ok: false, error: "Could not mark this homework. Please try again." };
  }

  const { results, total, correct } = markAgainst(questions as QuestionRow[], qIds, answers);

  // Only persist the answers for questions that actually exist in the set.
  const cleanAnswers: Record<string, number> = {};
  for (const r of results) if (r.chosenIndex !== null) cleanAnswers[r.id] = r.chosenIndex;

  const { error: insertError } = await supabaseAdmin.from("homework_submissions").insert({
    homework_id: homeworkId,
    user_id: userId,
    answers: cleanAnswers,
    total,
    correct,
  });
  if (insertError) {
    // Unique-constraint hit = a double submit raced us; treat as already done.
    if (insertError.code === "23505") {
      return { ok: false, error: "You've already completed this homework.", alreadyDone: true };
    }
    console.error("submitHomework insert failed:", insertError.message);
    return { ok: false, error: "Could not save your homework. Please try again." };
  }

  return { ok: true, result: { title: hw.title as string, total, correct, results } };
}

// A learner's already-submitted homework, re-marked for the review screen.
export async function getLearnerHomeworkResult(
  userId: string,
  homeworkId: string
): Promise<HomeworkResult | null> {
  const { data: hw } = await supabaseAdmin
    .from("class_homework")
    .select("class_id,title,question_ids")
    .eq("id", homeworkId)
    .maybeSingle();
  if (!hw) return null;
  if (!(await learnerCanAccess(userId, hw.class_id as string))) return null;

  const { data: sub } = await supabaseAdmin
    .from("homework_submissions")
    .select("answers")
    .eq("homework_id", homeworkId)
    .eq("user_id", userId)
    .maybeSingle();
  if (!sub) return null;

  const qIds = (hw.question_ids as string[]) ?? [];
  const { data: questions } = await supabaseAdmin
    .from("questions")
    .select("id,prompt,options,correct_index,explanation")
    .in("id", qIds);
  if (!questions) return null;

  const { results, total, correct } = markAgainst(
    questions as QuestionRow[],
    qIds,
    (sub.answers as Record<string, number>) ?? {}
  );
  return { title: hw.title as string, total, correct, results };
}

// ── Teacher: printable worksheet + memo ───────────────────────────────────────

export interface PrintableHomework {
  title: string;
  className: string;
  subject: string;
  grade: string;
  dueDate: string | null;
  questions: { prompt: string; options: string[]; correctIndex: number }[];
}

export async function getHomeworkForPrint(
  teacherId: string,
  homeworkId: string
): Promise<PrintableHomework | null> {
  const { data: hw } = await supabaseAdmin
    .from("class_homework")
    .select("title,question_ids,due_date,classes(name,subject,grade,teacher_id)")
    .eq("id", homeworkId)
    .maybeSingle();
  if (!hw) return null;
  const cls = hw.classes as unknown as {
    name: string;
    subject: string;
    grade: string;
    teacher_id: string;
  } | null;
  if (!cls || cls.teacher_id !== teacherId) return null;

  const qIds = (hw.question_ids as string[]) ?? [];
  const { data: questions } = await supabaseAdmin
    .from("questions")
    .select("id,prompt,options,correct_index")
    .in("id", qIds);
  const ordered = orderByIds(
    (questions ?? []) as { id: string; prompt: string; options: string[]; correct_index: number }[],
    qIds
  );

  return {
    title: hw.title as string,
    className: cls.name,
    subject: cls.subject,
    grade: cls.grade,
    dueDate: (hw.due_date as string | null) ?? null,
    questions: ordered.map((q) => ({
      prompt: q.prompt,
      options: q.options as string[],
      correctIndex: q.correct_index,
    })),
  };
}

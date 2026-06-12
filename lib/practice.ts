import { supabaseAdmin } from "./supabase";

export const QUIZ_SIZE = 8;
export const FREE_QUIZZES_PER_DAY = 2;

export interface TopicWithMastery {
  id: string;
  subject: string;
  grade: string;
  name: string;
  attempts: number;
  mastery: number | null; // null = never practised
  lastPractised: string | null;
}

export interface QuizQuestion {
  id: string;
  prompt: string;
  options: string[];
}

export interface MarkedQuestion {
  id: string;
  prompt: string;
  options: string[];
  correctIndex: number;
  chosenIndex: number | null;
  correct: boolean;
  explanation: string;
}

// Start of "today" in South African time (SAST = UTC+2, no DST), as a UTC ISO string.
function startOfTodaySAST(): string {
  const sastNow = new Date(Date.now() + 2 * 60 * 60 * 1000);
  const midnightUtcMs =
    Date.UTC(sastNow.getUTCFullYear(), sastNow.getUTCMonth(), sastNow.getUTCDate()) -
    2 * 60 * 60 * 1000;
  return new Date(midnightUtcMs).toISOString();
}

export async function countQuizzesToday(userId: string): Promise<number> {
  const { count, error } = await supabaseAdmin
    .from("quiz_attempts")
    .select("id", { count: "exact", head: true })
    .eq("user_id", userId)
    .gte("created_at", startOfTodaySAST());

  if (error) {
    console.error("countQuizzesToday failed:", error.message);
    return 0;
  }
  return count ?? 0;
}

export async function getTopicsWithMastery(
  userId: string,
  subject: string,
  grade: string
): Promise<TopicWithMastery[]> {
  const [topicsRes, masteryRes] = await Promise.all([
    supabaseAdmin
      .from("topics")
      .select("id,subject,grade,name,sort_order")
      .eq("subject", subject)
      .eq("grade", grade)
      .order("sort_order"),
    supabaseAdmin
      .from("learner_topics")
      .select("topic_id,attempts,mastery,last_practised")
      .eq("user_id", userId),
  ]);

  if (topicsRes.error) {
    console.error("getTopicsWithMastery failed:", topicsRes.error.message);
    return [];
  }

  const masteryByTopic = new Map(
    (masteryRes.data ?? []).map((m) => [m.topic_id as string, m])
  );

  return (topicsRes.data ?? []).map((t) => {
    const m = masteryByTopic.get(t.id as string);
    return {
      id: t.id as string,
      subject: t.subject as string,
      grade: t.grade as string,
      name: t.name as string,
      attempts: m ? (m.attempts as number) : 0,
      mastery: m ? (m.mastery as number) : null,
      lastPractised: m ? (m.last_practised as string) : null,
    };
  });
}

// Weakest practised topics first, for the dashboard weak-spots card.
export async function getWeakSpots(userId: string, limit = 4) {
  const { data, error } = await supabaseAdmin
    .from("learner_topics")
    .select("mastery, topics(id,name,subject)")
    .eq("user_id", userId)
    .order("mastery", { ascending: true })
    .limit(limit);

  if (error) {
    console.error("getWeakSpots failed:", error.message);
    return [];
  }
  return (data ?? []).map((row) => {
    const topic = row.topics as unknown as { id: string; name: string; subject: string };
    return { id: topic.id, name: topic.name, subject: topic.subject, mastery: row.mastery as number };
  });
}

// Random selection of questions for a topic, with answers stripped.
export async function getQuizQuestions(topicId: string): Promise<QuizQuestion[]> {
  const { data, error } = await supabaseAdmin
    .from("questions")
    .select("id,prompt,options")
    .eq("topic_id", topicId);

  if (error) {
    console.error("getQuizQuestions failed:", error.message);
    return [];
  }

  const shuffled = (data ?? []).sort(() => Math.random() - 0.5).slice(0, QUIZ_SIZE);
  return shuffled.map((q) => ({
    id: q.id as string,
    prompt: q.prompt as string,
    options: q.options as string[],
  }));
}

// Marks a finished quiz server-side, records the attempt, and updates mastery.
export async function submitQuiz(
  userId: string,
  topicId: string,
  answers: Record<string, number>
): Promise<{ total: number; correct: number; mastery: number; results: MarkedQuestion[] } | null> {
  const questionIds = Object.keys(answers);
  if (questionIds.length === 0) return null;

  const { data: rows, error } = await supabaseAdmin
    .from("questions")
    .select("id,prompt,options,correct_index,explanation")
    .eq("topic_id", topicId)
    .in("id", questionIds);

  if (error || !rows || rows.length === 0) {
    console.error("submitQuiz failed to load questions:", error?.message);
    return null;
  }

  const results: MarkedQuestion[] = rows.map((q) => {
    const chosen = answers[q.id as string];
    const chosenIndex = Number.isInteger(chosen) && chosen >= 0 && chosen <= 3 ? chosen : null;
    return {
      id: q.id as string,
      prompt: q.prompt as string,
      options: q.options as string[],
      correctIndex: q.correct_index as number,
      chosenIndex,
      correct: chosenIndex === (q.correct_index as number),
      explanation: q.explanation as string,
    };
  });

  const total = results.length;
  const correct = results.filter((r) => r.correct).length;
  const scorePct = Math.round((correct / total) * 100);

  const { error: attemptError } = await supabaseAdmin.from("quiz_attempts").insert({
    user_id: userId,
    topic_id: topicId,
    total,
    correct,
  });
  if (attemptError) console.error("submitQuiz attempt insert failed:", attemptError.message);

  // Mastery is a blend: 60% this attempt, 40% history — recent work counts most.
  const { data: existing } = await supabaseAdmin
    .from("learner_topics")
    .select("attempts,questions_answered,questions_correct,mastery")
    .eq("user_id", userId)
    .eq("topic_id", topicId)
    .maybeSingle();

  const mastery = existing
    ? Math.round(0.6 * scorePct + 0.4 * (existing.mastery as number))
    : scorePct;

  const { error: upsertError } = await supabaseAdmin.from("learner_topics").upsert({
    user_id: userId,
    topic_id: topicId,
    attempts: (existing?.attempts ?? 0) + 1,
    questions_answered: (existing?.questions_answered ?? 0) + total,
    questions_correct: (existing?.questions_correct ?? 0) + correct,
    mastery,
    last_practised: new Date().toISOString(),
  });
  if (upsertError) console.error("submitQuiz mastery upsert failed:", upsertError.message);

  return { total, correct, mastery, results };
}

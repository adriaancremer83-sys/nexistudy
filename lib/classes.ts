import { supabaseAdmin } from "./supabase";

// Subjects that actually have a question bank — only these produce a heatmap, so
// the class-creation form is limited to them. Keep in sync with the seed scripts.
export const CLASS_SUBJECTS = [
  "Accounting",
  "Afrikaans",
  "Agricultural Sciences",
  "Business Studies",
  "Computer Applications Technology",
  "Consumer Studies",
  "Economics",
  "English",
  "Geography",
  "Hospitality Studies",
  "Information Technology",
  "Life Sciences",
  "Mathematical Literacy",
  "Mathematics",
  "Physical Sciences",
  "Tourism",
] as const;

export const CLASS_GRADES = ["Grade 10", "Grade 11", "Grade 12"] as const;

export interface TeacherClass {
  id: string;
  name: string;
  subject: string;
  grade: string;
  joinCode: string;
  memberCount: number;
}

export interface HeatmapRow {
  topicId: string;
  name: string;
  avgMastery: number; // 0-100, lower = the class is struggling more
  learnersPractised: number; // how many class members have attempted this topic
}

export interface ClassHeatmap {
  classId: string;
  memberCount: number;
  rows: HeatmapRow[];
  practisedAny: boolean; // false = members exist but nobody has practised yet
}

// Human-friendly join code: 6 chars, no ambiguous 0/O/1/I/L so it reads cleanly
// off a projector or a WhatsApp message.
const CODE_ALPHABET = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";

function randomCode(): string {
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += CODE_ALPHABET[Math.floor(Math.random() * CODE_ALPHABET.length)];
  }
  return code;
}

async function generateUniqueCode(): Promise<string> {
  // Collisions are astronomically unlikely at this scale, but check anyway.
  for (let attempt = 0; attempt < 6; attempt++) {
    const code = randomCode();
    const { data } = await supabaseAdmin
      .from("classes")
      .select("id")
      .eq("join_code", code)
      .maybeSingle();
    if (!data) return code;
  }
  // Fall back to a longer code if we somehow keep colliding.
  return randomCode() + randomCode();
}

export async function createClass(
  teacherId: string,
  fields: { name: string; subject: string; grade: string }
): Promise<TeacherClass | null> {
  const joinCode = await generateUniqueCode();
  const { data, error } = await supabaseAdmin
    .from("classes")
    .insert({
      teacher_id: teacherId,
      name: fields.name,
      subject: fields.subject,
      grade: fields.grade,
      join_code: joinCode,
    })
    .select()
    .single();

  if (error) {
    console.error("createClass failed:", error.message);
    return null;
  }
  return {
    id: data.id as string,
    name: data.name as string,
    subject: data.subject as string,
    grade: data.grade as string,
    joinCode: data.join_code as string,
    memberCount: 0,
  };
}

export async function deleteClass(teacherId: string, classId: string): Promise<boolean> {
  // Scope the delete to the owner so a teacher can only remove their own class.
  const { error } = await supabaseAdmin
    .from("classes")
    .delete()
    .eq("id", classId)
    .eq("teacher_id", teacherId);
  if (error) {
    console.error("deleteClass failed:", error.message);
    return false;
  }
  return true;
}

export async function getTeacherClasses(teacherId: string): Promise<TeacherClass[]> {
  const { data: classes, error } = await supabaseAdmin
    .from("classes")
    .select("id,name,subject,grade,join_code")
    .eq("teacher_id", teacherId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("getTeacherClasses failed:", error.message);
    return [];
  }
  if (!classes || classes.length === 0) return [];

  // One query for all member rows, counted per class in memory.
  const classIds = classes.map((c) => c.id as string);
  const { data: members } = await supabaseAdmin
    .from("class_members")
    .select("class_id")
    .in("class_id", classIds);

  const countByClass = new Map<string, number>();
  for (const m of members ?? []) {
    const id = m.class_id as string;
    countByClass.set(id, (countByClass.get(id) ?? 0) + 1);
  }

  return classes.map((c) => ({
    id: c.id as string,
    name: c.name as string,
    subject: c.subject as string,
    grade: c.grade as string,
    joinCode: c.join_code as string,
    memberCount: countByClass.get(c.id as string) ?? 0,
  }));
}

// The hook: roll every member's per-topic mastery up into a class-level view of
// what the class is collectively stuck on. Lowest average mastery first.
export async function getClassHeatmap(classId: string): Promise<ClassHeatmap | null> {
  const { data: cls, error: clsError } = await supabaseAdmin
    .from("classes")
    .select("id,subject,grade")
    .eq("id", classId)
    .maybeSingle();
  if (clsError || !cls) {
    if (clsError) console.error("getClassHeatmap class load failed:", clsError.message);
    return null;
  }

  const [membersRes, topicsRes] = await Promise.all([
    supabaseAdmin.from("class_members").select("user_id").eq("class_id", classId),
    supabaseAdmin
      .from("topics")
      .select("id,name,sort_order")
      .eq("subject", cls.subject as string)
      .eq("grade", cls.grade as string)
      .order("sort_order"),
  ]);

  const memberIds = (membersRes.data ?? []).map((m) => m.user_id as string);
  const topics = topicsRes.data ?? [];

  const base = (extra: Partial<ClassHeatmap> = {}): ClassHeatmap => ({
    classId,
    memberCount: memberIds.length,
    rows: topics.map((t) => ({
      topicId: t.id as string,
      name: t.name as string,
      avgMastery: 0,
      learnersPractised: 0,
    })),
    practisedAny: false,
    ...extra,
  });

  if (memberIds.length === 0 || topics.length === 0) return base();

  const topicIds = topics.map((t) => t.id as string);
  const { data: mastery, error: masteryError } = await supabaseAdmin
    .from("learner_topics")
    .select("topic_id,mastery")
    .in("user_id", memberIds)
    .in("topic_id", topicIds);
  if (masteryError) {
    console.error("getClassHeatmap mastery load failed:", masteryError.message);
    return base();
  }

  const agg = new Map<string, { sum: number; n: number }>();
  for (const row of mastery ?? []) {
    const id = row.topic_id as string;
    const cur = agg.get(id) ?? { sum: 0, n: 0 };
    cur.sum += row.mastery as number;
    cur.n += 1;
    agg.set(id, cur);
  }

  const rows: HeatmapRow[] = topics.map((t) => {
    const a = agg.get(t.id as string);
    return {
      topicId: t.id as string,
      name: t.name as string,
      avgMastery: a && a.n > 0 ? Math.round(a.sum / a.n) : 0,
      learnersPractised: a?.n ?? 0,
    };
  });

  // Surface the struggles: practised topics ascending by mastery, then the
  // not-yet-practised topics so the teacher still sees the full syllabus.
  rows.sort((x, y) => {
    if (x.learnersPractised === 0 && y.learnersPractised === 0) return 0;
    if (x.learnersPractised === 0) return 1;
    if (y.learnersPractised === 0) return -1;
    return x.avgMastery - y.avgMastery;
  });

  return base({ rows, practisedAny: (mastery ?? []).length > 0 });
}

export async function getClassByCode(code: string) {
  const { data, error } = await supabaseAdmin
    .from("classes")
    .select("id,name,subject,grade,teacher_id")
    .eq("join_code", code.trim().toUpperCase())
    .maybeSingle();
  if (error) {
    console.error("getClassByCode failed:", error.message);
    return null;
  }
  return data;
}

export type JoinResult =
  | { ok: true; className: string }
  | { ok: false; error: string };

export async function joinClassByCode(userId: string, code: string): Promise<JoinResult> {
  const cls = await getClassByCode(code);
  if (!cls) return { ok: false, error: "That class code doesn't exist. Check it and try again." };

  const { error } = await supabaseAdmin
    .from("class_members")
    .upsert(
      { class_id: cls.id as string, user_id: userId },
      { onConflict: "class_id,user_id", ignoreDuplicates: true }
    );
  if (error) {
    console.error("joinClassByCode failed:", error.message);
    return { ok: false, error: "Could not join the class. Please try again." };
  }
  return { ok: true, className: cls.name as string };
}

// ── PRACTICE ASSIGNMENTS ──────────────────────────────────────────────────
// A teacher assigns a topic (+ question count, optional due date) to a class.
// "Completion" is read back from the learners' real quiz_attempts on that topic
// taken on/after the assignment was set — no separate completion table needed.

export interface ClassTopic {
  id: string;
  name: string;
}

export interface ClassAssignment {
  id: string;
  topicId: string;
  topicName: string;
  numQuestions: number;
  dueDate: string | null;
  createdAt: string;
  attemptedCount: number; // distinct class members who attempted since it was set
  averageScore: number | null; // avg % across those attempts, null = none yet
}

export interface ClassLearner {
  userId: string;
  name: string;
  questionsAttempted: number; // across this class's subject/grade topics
  weakestTopic: string | null;
  weakestMastery: number | null;
}

export interface ClassExtras {
  topics: ClassTopic[]; // the class's subject/grade topics, for the assignment picker
  assignments: ClassAssignment[];
  learners: ClassLearner[];
}

const EMPTY_EXTRAS: ClassExtras = { topics: [], assignments: [], learners: [] };

// Everything the class card needs beyond the heatmap: the topic list for the
// assignment picker, the assignments with live completion stats, and the
// per-learner summary list. One cohesive read so the dashboard stays a single
// round-trip per class. (Deliberately separate from getClassHeatmap so the
// existing heatmap behaviour is untouched.)
export async function getClassExtras(classId: string): Promise<ClassExtras> {
  const { data: cls, error: clsError } = await supabaseAdmin
    .from("classes")
    .select("subject,grade")
    .eq("id", classId)
    .maybeSingle();
  if (clsError || !cls) {
    if (clsError) console.error("getClassExtras class load failed:", clsError.message);
    return EMPTY_EXTRAS;
  }

  const [membersRes, topicsRes, assignmentsRes] = await Promise.all([
    supabaseAdmin.from("class_members").select("user_id").eq("class_id", classId),
    supabaseAdmin
      .from("topics")
      .select("id,name,sort_order")
      .eq("subject", cls.subject as string)
      .eq("grade", cls.grade as string)
      .order("sort_order"),
    supabaseAdmin
      .from("class_assignments")
      .select("id,topic_id,num_questions,due_date,created_at")
      .eq("class_id", classId)
      .order("created_at", { ascending: false }),
  ]);

  const memberIds = (membersRes.data ?? []).map((m) => m.user_id as string);
  const topics: ClassTopic[] = (topicsRes.data ?? []).map((t) => ({
    id: t.id as string,
    name: t.name as string,
  }));
  const topicNameById = new Map(topics.map((t) => [t.id, t.name]));
  const topicIds = topics.map((t) => t.id);
  const rawAssignments = assignmentsRes.data ?? [];

  // Pull the data the learner list + completion stats both need.
  let users: { id: string; name: string }[] = [];
  let learnerTopics: { user_id: string; topic_id: string; questions_answered: number; mastery: number }[] = [];
  if (memberIds.length > 0) {
    const [usersRes, ltRes] = await Promise.all([
      supabaseAdmin.from("users").select("id,name").in("id", memberIds),
      topicIds.length > 0
        ? supabaseAdmin
            .from("learner_topics")
            .select("user_id,topic_id,questions_answered,mastery")
            .in("user_id", memberIds)
            .in("topic_id", topicIds)
        : Promise.resolve({ data: [] as typeof learnerTopics }),
    ]);
    users = (usersRes.data ?? []) as typeof users;
    learnerTopics = (ltRes.data ?? []) as typeof learnerTopics;
  }

  // ── Learner summary list ──
  const nameById = new Map(users.map((u) => [u.id, u.name]));
  type Agg = { questions: number; weakName: string | null; weakMastery: number | null };
  const aggByUser = new Map<string, Agg>();
  for (const id of memberIds) aggByUser.set(id, { questions: 0, weakName: null, weakMastery: null });
  for (const lt of learnerTopics) {
    const agg = aggByUser.get(lt.user_id);
    if (!agg) continue;
    agg.questions += lt.questions_answered ?? 0;
    if (agg.weakMastery === null || lt.mastery < agg.weakMastery) {
      agg.weakMastery = lt.mastery;
      agg.weakName = topicNameById.get(lt.topic_id) ?? null;
    }
  }
  const learners: ClassLearner[] = memberIds
    .map((id) => {
      const agg = aggByUser.get(id)!;
      return {
        userId: id,
        name: nameById.get(id) ?? "Learner",
        questionsAttempted: agg.questions,
        weakestTopic: agg.weakName,
        weakestMastery: agg.weakMastery,
      };
    })
    .sort((a, b) => a.name.localeCompare(b.name));

  // ── Assignment completion ──
  // One batched read of the relevant attempts, then aggregate per assignment.
  let attempts: { user_id: string; topic_id: string; total: number; correct: number; created_at: string }[] = [];
  if (memberIds.length > 0 && rawAssignments.length > 0) {
    const assignTopicIds = [...new Set(rawAssignments.map((a) => a.topic_id as string))];
    const earliest = rawAssignments.reduce(
      (min, a) => ((a.created_at as string) < min ? (a.created_at as string) : min),
      rawAssignments[0].created_at as string
    );
    const { data } = await supabaseAdmin
      .from("quiz_attempts")
      .select("user_id,topic_id,total,correct,created_at")
      .in("user_id", memberIds)
      .in("topic_id", assignTopicIds)
      .gte("created_at", earliest);
    attempts = (data ?? []) as typeof attempts;
  }

  const assignments: ClassAssignment[] = rawAssignments.map((a) => {
    const qualifying = attempts.filter(
      (at) => at.topic_id === a.topic_id && at.created_at >= (a.created_at as string)
    );
    const distinct = new Set(qualifying.map((at) => at.user_id));
    const avg =
      qualifying.length > 0
        ? Math.round(
            qualifying.reduce((sum, at) => sum + (at.total > 0 ? (at.correct / at.total) * 100 : 0), 0) /
              qualifying.length
          )
        : null;
    return {
      id: a.id as string,
      topicId: a.topic_id as string,
      topicName: topicNameById.get(a.topic_id as string) ?? "Topic",
      numQuestions: a.num_questions as number,
      dueDate: (a.due_date as string | null) ?? null,
      createdAt: a.created_at as string,
      attemptedCount: distinct.size,
      averageScore: avg,
    };
  });

  return { topics, assignments, learners };
}

export const ASSIGNMENT_QUESTION_CHOICES = [5, 8, 10, 15, 20] as const;

export type CreateAssignmentResult =
  | { ok: true }
  | { ok: false; error: string };

export async function createAssignment(
  teacherId: string,
  classId: string,
  fields: { topicId: string; numQuestions: number; dueDate: string | null }
): Promise<CreateAssignmentResult> {
  // The class must belong to this teacher.
  const { data: cls } = await supabaseAdmin
    .from("classes")
    .select("subject,grade")
    .eq("id", classId)
    .eq("teacher_id", teacherId)
    .maybeSingle();
  if (!cls) return { ok: false, error: "Class not found." };

  // The topic must belong to the class's subject + grade question bank.
  const { data: topic } = await supabaseAdmin
    .from("topics")
    .select("id")
    .eq("id", fields.topicId)
    .eq("subject", cls.subject as string)
    .eq("grade", cls.grade as string)
    .maybeSingle();
  if (!topic) return { ok: false, error: "Pick a topic from this class's subject." };

  const { error } = await supabaseAdmin.from("class_assignments").insert({
    class_id: classId,
    topic_id: fields.topicId,
    num_questions: fields.numQuestions,
    due_date: fields.dueDate,
  });
  if (error) {
    console.error("createAssignment failed:", error.message);
    return { ok: false, error: "Could not set the assignment. Please try again." };
  }
  return { ok: true };
}

export async function deleteAssignment(teacherId: string, assignmentId: string): Promise<boolean> {
  // Confirm the assignment's class is owned by this teacher before deleting.
  const { data: a } = await supabaseAdmin
    .from("class_assignments")
    .select("class_id")
    .eq("id", assignmentId)
    .maybeSingle();
  if (!a) return false;
  const { data: cls } = await supabaseAdmin
    .from("classes")
    .select("id")
    .eq("id", a.class_id as string)
    .eq("teacher_id", teacherId)
    .maybeSingle();
  if (!cls) return false;

  const { error } = await supabaseAdmin.from("class_assignments").delete().eq("id", assignmentId);
  if (error) {
    console.error("deleteAssignment failed:", error.message);
    return false;
  }
  return true;
}

// Classes a learner has joined — shown on their dashboard.
export async function getLearnerClasses(userId: string) {
  const { data, error } = await supabaseAdmin
    .from("class_members")
    .select("classes(id,name,subject,grade)")
    .eq("user_id", userId);
  if (error) {
    console.error("getLearnerClasses failed:", error.message);
    return [];
  }
  return (data ?? [])
    .map((row) => row.classes as unknown as { id: string; name: string; subject: string; grade: string })
    .filter(Boolean);
}

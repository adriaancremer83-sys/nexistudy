// Seeds a full, realistic demo class so the teacher dashboard heatmap looks
// populated for a marketing video / live demo.
//
// Creates (idempotent — safe to re-run):
//   - the demo teacher (teacher@nexistudy.co.za / password123) if missing
//   - a "12A Mathematics" class with a fixed join code (K7P2QX)
//   - 8 demo learners, joined to the class
//   - per-topic mastery for each learner so the heatmap spreads weak -> strong
//
// Run: NODE_OPTIONS=--use-system-ca node --env-file=.env.local scripts/seed-demo-class.mjs
import { createClient } from "@supabase/supabase-js";
import bcrypt from "bcryptjs";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

const SUBJECT = "Mathematics";
const GRADE = "Grade 12";
const JOIN_CODE = "K7P2QX"; // fixed so the demo is reproducible
const CLASS_NAME = "12A Mathematics";

const TEACHER = {
  name: "Mr. Naidoo",
  email: "teacher@nexistudy.co.za",
  password: "password123",
  role: "teacher",
  school: "Northview High",
  grade: "",
};

const LEARNERS = [
  "Thabo Mokoena",
  "Aisha Patel",
  "Lerato Nkosi",
  "Johan van der Merwe",
  "Naledi Khumalo",
  "Sipho Dlamini",
  "Chloé Adams",
  "Ayesha Cassim",
];

// Target class-average mastery per topic (weakest first makes a great heatmap).
// Topics not listed fall back to 60. Each learner gets the target ± jitter.
const TOPIC_TARGET = {
  Trigonometry: 38,
  "Differential Calculus": 47,
  "Probability & Counting": 58,
  "Functions & Graphs": 66,
  "Finance, Growth & Decay": 79,
  "Sequences & Series": 86,
};
// How many of the 8 learners have practised each topic (adds realism vs 8/8).
const TOPIC_PRACTISERS = {
  Trigonometry: 8,
  "Differential Calculus": 7,
  "Probability & Counting": 6,
  "Functions & Graphs": 8,
  "Finance, Growth & Decay": 7,
  "Sequences & Series": 8,
};

// Sample practice assignment the teacher has set — targets the weakest topic so
// the completion tracker tells a story (set 3 days ago, due in a week, 5 of the
// 8 learners have attempted it so far). Scores are per-attempt percentages.
const ASSIGNMENT = {
  topicName: "Trigonometry",
  numQuestions: 10,
  setDaysAgo: 3,
  dueInDays: 7,
  attemptScores: [50, 60, 70, 60, 80], // first 5 learners; avg ~64%
};

// Sample homework the teacher has set on the weakest topic — a FIXED set of 5
// verified questions, auto-marked in-app. 6 of the 8 learners have handed it in,
// with a deliberate spread so the completion + "most-missed" report tells a
// story. Each inner array = the question indices (0-4) that learner got wrong;
// everything else they answered correctly. Wrong counts land at Q1:5, Q2:4,
// Q3:2, Q4:1, Q5:1 -> a clear top-3 to "re-teach". Class avg ~57%.
const HOMEWORK = {
  title: "Trigonometry Homework",
  topicName: "Trigonometry",
  numQuestions: 5,
  setDaysAgo: 2,
  dueInDays: 5,
  wrongByLearner: [
    [0, 1],    // Thabo  -> 3/5
    [0, 1, 2], // Aisha  -> 2/5
    [0, 1, 3], // Lerato -> 2/5
    [0, 2],    // Johan  -> 3/5
    [0, 4],    // Naledi -> 3/5
    [1],       // Sipho  -> 4/5
    // Chloé & Ayesha haven't done it yet -> 6/8 completed
  ],
};

const clamp = (n, lo, hi) => Math.max(lo, Math.min(hi, n));
const jitter = (base) => clamp(base + Math.round((Math.random() - 0.5) * 12), 5, 99);

async function findOrCreateUser(acc) {
  const { data: existing } = await supabase
    .from("users")
    .select("id")
    .eq("email", acc.email)
    .maybeSingle();
  if (existing) return existing.id;

  const { password, ...rest } = acc;
  const { data, error } = await supabase
    .from("users")
    .insert({ ...rest, password_hash: bcrypt.hashSync(password, 10) })
    .select("id")
    .single();
  if (error) throw new Error(`create ${acc.email}: ${error.message}`);
  return data.id;
}

async function main() {
  // 1. Teacher
  const teacherId = await findOrCreateUser(TEACHER);
  console.log(`teacher ready: ${TEACHER.email}`);

  // 2. Topics (must already be seeded by seed-grade12-maths.mjs)
  const { data: topics, error: tErr } = await supabase
    .from("topics")
    .select("id,name,sort_order")
    .eq("subject", SUBJECT)
    .eq("grade", GRADE)
    .order("sort_order");
  if (tErr) throw new Error(`load topics: ${tErr.message}`);
  if (!topics || topics.length === 0) {
    console.error(`No ${GRADE} ${SUBJECT} topics found. Run seed-grade12-maths.mjs first.`);
    process.exit(1);
  }
  console.log(`topics: ${topics.length}`);

  // 3. Class — delete any prior demo class with this code (cascades members), recreate
  await supabase.from("classes").delete().eq("join_code", JOIN_CODE);
  const { data: cls, error: cErr } = await supabase
    .from("classes")
    .insert({
      teacher_id: teacherId,
      name: CLASS_NAME,
      subject: SUBJECT,
      grade: GRADE,
      join_code: JOIN_CODE,
    })
    .select("id")
    .single();
  if (cErr) throw new Error(`create class: ${cErr.message}`);
  const classId = cls.id;
  console.log(`class ready: ${CLASS_NAME} (code ${JOIN_CODE})`);

  // 4. Learners + membership
  const learnerIds = [];
  for (let i = 0; i < LEARNERS.length; i++) {
    const name = LEARNERS[i];
    const email = `learner${i + 1}@demo.nexistudy.co.za`;
    const id = await findOrCreateUser({
      name,
      email,
      password: "password123",
      role: "learner",
      school: TEACHER.school,
      grade: GRADE,
    });
    learnerIds.push(id);
  }
  await supabase
    .from("class_members")
    .upsert(
      learnerIds.map((user_id) => ({ class_id: classId, user_id })),
      { onConflict: "class_id,user_id", ignoreDuplicates: true }
    );
  console.log(`learners joined: ${learnerIds.length}`);

  // 5. Per-topic mastery for the heatmap
  const now = new Date();
  const rows = [];
  for (const topic of topics) {
    const target = TOPIC_TARGET[topic.name] ?? 60;
    const practisers = TOPIC_PRACTISERS[topic.name] ?? learnerIds.length;
    for (let i = 0; i < practisers; i++) {
      const mastery = jitter(target);
      const answered = 16; // 2 quizzes x 8 questions
      rows.push({
        user_id: learnerIds[i],
        topic_id: topic.id,
        class_id: classId,
        attempts: 2,
        questions_answered: answered,
        questions_correct: Math.round((mastery / 100) * answered),
        mastery,
        last_practised: new Date(now.getTime() - i * 3600_000).toISOString(),
      });
    }
  }
  const { error: ltErr } = await supabase
    .from("learner_topics")
    .upsert(rows, { onConflict: "user_id,topic_id" });
  if (ltErr) throw new Error(`seed learner_topics: ${ltErr.message}`);
  console.log(`mastery rows seeded: ${rows.length}`);

  // 6. Summary: the class-average heatmap the teacher will see
  const byTopic = new Map();
  for (const r of rows) {
    const t = topics.find((x) => x.id === r.topic_id).name;
    const cur = byTopic.get(t) ?? { sum: 0, n: 0 };
    cur.sum += r.mastery;
    cur.n += 1;
    byTopic.set(t, cur);
  }
  console.log("\nClass heatmap preview (avg mastery, weakest first):");
  console.table(
    [...byTopic.entries()]
      .map(([topic, { sum, n }]) => ({ topic, avg: Math.round(sum / n), practised: `${n}/8` }))
      .sort((a, b) => a.avg - b.avg)
  );

  // 7. Sample practice assignment + the quiz attempts that feed its completion
  //    tracker. Needs the class_assignments table (supabase-assignments-setup.sql).
  const assignTopic = topics.find((t) => t.name === ASSIGNMENT.topicName);
  if (!assignTopic) {
    console.warn(`\nSkipped assignment: topic "${ASSIGNMENT.topicName}" not found.`);
  } else {
    const setAt = new Date(now.getTime() - ASSIGNMENT.setDaysAgo * 86_400_000);
    const dueDate = new Date(now.getTime() + ASSIGNMENT.dueInDays * 86_400_000)
      .toISOString()
      .slice(0, 10);

    const { error: aErr } = await supabase.from("class_assignments").insert({
      class_id: classId,
      topic_id: assignTopic.id,
      num_questions: ASSIGNMENT.numQuestions,
      due_date: dueDate,
      created_at: setAt.toISOString(),
    });

    if (aErr) {
      if (/class_assignments/.test(aErr.message) && /schema cache|does not exist|find the table/i.test(aErr.message)) {
        console.warn(
          "\n⚠  Assignment NOT seeded — the class_assignments table is missing.\n" +
            "   Run supabase-assignments-setup.sql in the Supabase SQL editor, then re-run this script."
        );
      } else {
        throw new Error(`create assignment: ${aErr.message}`);
      }
    } else {
      // Completion is read from quiz_attempts on the topic, dated after the
      // assignment. Wipe the demo learners' prior attempts so re-runs stay clean.
      await supabase.from("quiz_attempts").delete().in("user_id", learnerIds);
      const attemptRows = ASSIGNMENT.attemptScores.map((score, i) => ({
        user_id: learnerIds[i],
        topic_id: assignTopic.id,
        total: ASSIGNMENT.numQuestions,
        correct: Math.round((score / 100) * ASSIGNMENT.numQuestions),
        created_at: new Date(setAt.getTime() + (i + 1) * 3600_000).toISOString(),
      }));
      const { error: qaErr } = await supabase.from("quiz_attempts").insert(attemptRows);
      if (qaErr) throw new Error(`seed quiz_attempts: ${qaErr.message}`);

      const avg = Math.round(
        ASSIGNMENT.attemptScores.reduce((s, n) => s + n, 0) / ASSIGNMENT.attemptScores.length
      );
      console.log(
        `\nassignment seeded: ${ASSIGNMENT.topicName} (${ASSIGNMENT.numQuestions} questions, due ${dueDate})` +
          ` — ${attemptRows.length}/${learnerIds.length} attempted, avg ${avg}%`
      );
    }
  }

  // 8. Sample homework (a fixed verified question set) + the learner submissions
  //    that feed its completion report + most-missed breakdown. Needs the
  //    class_homework / homework_submissions tables (supabase-homework-setup.sql).
  const hwTopic = topics.find((t) => t.name === HOMEWORK.topicName);
  if (!hwTopic) {
    console.warn(`\nSkipped homework: topic "${HOMEWORK.topicName}" not found.`);
  } else {
    const { data: hwQuestions, error: hqErr } = await supabase
      .from("questions")
      .select("id,correct_index")
      .eq("topic_id", hwTopic.id)
      .eq("flagged", false)
      .order("id")
      .limit(HOMEWORK.numQuestions);
    if (hqErr) throw new Error(`load homework questions: ${hqErr.message}`);

    if (!hwQuestions || hwQuestions.length < HOMEWORK.numQuestions) {
      console.warn(
        `\nSkipped homework: only ${hwQuestions?.length ?? 0} verified ${HOMEWORK.topicName} questions available.`
      );
    } else {
      const setAt = new Date(now.getTime() - HOMEWORK.setDaysAgo * 86_400_000);
      const dueDate = new Date(now.getTime() + HOMEWORK.dueInDays * 86_400_000)
        .toISOString()
        .slice(0, 10);
      const questionIds = hwQuestions.map((q) => q.id);

      const { data: hw, error: hwErr } = await supabase
        .from("class_homework")
        .insert({
          class_id: classId,
          title: HOMEWORK.title,
          question_ids: questionIds,
          due_date: dueDate,
          created_at: setAt.toISOString(),
        })
        .select("id")
        .single();

      if (hwErr) {
        if (/class_homework/.test(hwErr.message) && /schema cache|does not exist|find the table/i.test(hwErr.message)) {
          console.warn(
            "\n⚠  Homework NOT seeded — the class_homework table is missing.\n" +
              "   Run supabase-homework-setup.sql in the Supabase SQL editor, then re-run this script."
          );
        } else {
          throw new Error(`create homework: ${hwErr.message}`);
        }
      } else {
        // Build each submission's answers map: correct index where the learner
        // got it right, a different (wrong) index where they didn't.
        const submissions = HOMEWORK.wrongByLearner.map((wrong, i) => {
          const answers = {};
          for (let j = 0; j < hwQuestions.length; j++) {
            const correct = hwQuestions[j].correct_index;
            answers[hwQuestions[j].id] = wrong.includes(j) ? (correct + 1) % 4 : correct;
          }
          return {
            homework_id: hw.id,
            user_id: learnerIds[i],
            answers,
            total: hwQuestions.length,
            correct: hwQuestions.length - wrong.length,
            created_at: new Date(setAt.getTime() + (i + 1) * 3600_000).toISOString(),
          };
        });
        const { error: hsErr } = await supabase.from("homework_submissions").insert(submissions);
        if (hsErr) throw new Error(`seed homework_submissions: ${hsErr.message}`);

        const avgPct = Math.round(
          (submissions.reduce((s, r) => s + r.correct, 0) / (submissions.length * hwQuestions.length)) * 100
        );
        console.log(
          `\nhomework seeded: ${HOMEWORK.title} (${hwQuestions.length} questions, due ${dueDate})` +
            ` — ${submissions.length}/${learnerIds.length} completed, avg ${avgPct}%`
        );
        console.log("Most-missed preview (the teacher's re-teach list):");
        console.table(
          hwQuestions
            .map((_, j) => ({
              question: `Q${j + 1}`,
              wrong: `${HOMEWORK.wrongByLearner.filter((w) => w.includes(j)).length}/${submissions.length}`,
            }))
            .sort((a, b) => parseInt(b.wrong) - parseInt(a.wrong))
        );
      }
    }
  }

  console.log(`\nDone. Log in as ${TEACHER.email} / password123 -> Teacher Dashboard.`);
}

main().catch((e) => {
  console.error("FAIL:", e.message);
  process.exit(1);
});

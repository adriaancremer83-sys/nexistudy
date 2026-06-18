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
  console.log(`\nDone. Log in as ${TEACHER.email} / password123 -> Teacher Dashboard.`);
}

main().catch((e) => {
  console.error("FAIL:", e.message);
  process.exit(1);
});

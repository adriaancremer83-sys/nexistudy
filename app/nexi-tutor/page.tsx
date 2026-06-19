"use client";

import Image from "next/image";
import Nexi from "@/components/Nexi";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useSession } from "next-auth/react";
import ReactMarkdown from "react-markdown";
import Reveal from "@/components/Reveal";
import NudgeHint from "@/components/NudgeHint";
import { languageAllowed } from "@/lib/languages";
import { IconUser, IconBookOpen, IconCpuChip } from "@/components/icons";

// ── Data ─────────────────────────────────────────────────────────────────────

// Only CAPS is live; IEB & Cambridge are coming soon, so they're not offered yet.
const CURRICULA = ["CAPS"];
const GRADES = ["Grade 8", "Grade 9", "Grade 10", "Grade 11", "Grade 12"];
const SENIOR_GRADES = new Set(["Grade 8", "Grade 9"]);

const SUBJECTS_BY_CURRICULUM: Record<string, string[]> = {
  CAPS: [
    "English Home Language",
    "Afrikaans Home Language",
    "isiZulu Home Language",
    "Mathematics",
    "Mathematical Literacy",
    "Physical Sciences",
    "Life Sciences",
    "Geography",
    "History",
    "Accounting",
    "Business Studies",
    "Economics",
    "Agricultural Sciences",
    "Computer Applications Technology",
    "Information Technology",
    "Engineering Graphics & Design",
    "Life Orientation",
  ],
  IEB: [
    "English Home Language",
    "Afrikaans Home Language",
    "Mathematics",
    "Mathematical Literacy",
    "Physical Sciences",
    "Life Sciences",
    "Geography",
    "History",
    "Accounting",
    "Business Studies",
    "Economics",
    "Computer Science",
    "Life Orientation",
    "Visual Arts",
    "Drama",
  ],
  Cambridge: [
    "English Language",
    "Mathematics",
    "Physics",
    "Chemistry",
    "Biology",
    "Geography",
    "History",
    "Economics",
    "Business Studies",
    "Computer Science",
    "Accounting",
    "Literature in English",
  ],
};

// Senior Phase (Grade 8–9). CAPS and IEB schools follow the national
// Senior Phase subject set; Cambridge uses Lower Secondary.
const SENIOR_SUBJECTS_BY_CURRICULUM: Record<string, string[]> = {
  CAPS: [
    "English Home Language",
    "Afrikaans First Additional Language",
    "isiZulu Home Language",
    "Mathematics",
    "Natural Sciences",
    "Social Sciences (History & Geography)",
    "Economic & Management Sciences (EMS)",
    "Technology",
    "Creative Arts",
    "Life Orientation",
  ],
  IEB: [
    "English Home Language",
    "Afrikaans First Additional Language",
    "isiZulu Home Language",
    "Mathematics",
    "Natural Sciences",
    "Social Sciences (History & Geography)",
    "Economic & Management Sciences (EMS)",
    "Technology",
    "Creative Arts",
    "Life Orientation",
  ],
  Cambridge: [
    "English",
    "Mathematics",
    "Science",
    "Geography",
    "History",
    "ICT & Computing",
    "Global Perspectives",
  ],
};

// Grade 8–9 topics. Subjects not listed here fall back to TOPICS_BY_SUBJECT.
const SENIOR_TOPICS_BY_SUBJECT: Record<string, string[]> = {
  "Mathematics": [
    "Integers & Whole Numbers", "Fractions, Decimals & Percentages",
    "Exponents", "Algebraic Expressions", "Equations",
    "Geometry of Shapes & Angles", "Area, Perimeter & Volume",
    "Graphs (Introduction)", "Data Handling", "Probability",
  ],
  "Natural Sciences": [
    "Matter & Materials", "Energy & Change", "Life & Living", "Planet Earth & Beyond",
  ],
  "Social Sciences (History & Geography)": [
    "Map Skills", "Climate & Vegetation", "Settlement & Migration",
    "The Industrial Revolution", "The Mineral Revolution in SA",
    "World War I & II", "Human Rights & Democracy",
  ],
  "Economic & Management Sciences (EMS)": [
    "The Economy & Circular Flow", "Financial Literacy & Budgets",
    "Accounting Equation Basics", "Entrepreneurship", "Markets, Trade & Inequality",
  ],
  "Technology": [
    "The Design Process", "Structures", "Mechanical Systems & Control",
    "Electrical Systems", "Processing of Materials",
  ],
  "Creative Arts": ["Visual Arts", "Music", "Drama", "Dance"],
  "Afrikaans First Additional Language": [
    "Begripstoets", "Taalstrukture & -konvensies", "Skryfwerk", "Letterkunde",
  ],
  "English": [
    "Reading Comprehension", "Writing Skills", "Grammar & Vocabulary", "Speaking & Listening",
  ],
  "Science": [
    "Scientific Enquiry", "Biology Basics", "Chemistry Basics", "Physics Basics",
  ],
  "ICT & Computing": [
    "Computational Thinking", "Programming Basics", "Spreadsheets & Data", "Online Safety",
  ],
  "Global Perspectives": [
    "Research Skills", "Analysis & Evaluation", "Collaboration & Communication",
  ],
};

function subjectsFor(curriculum: string, grade: string): string[] {
  const source = SENIOR_GRADES.has(grade) ? SENIOR_SUBJECTS_BY_CURRICULUM : SUBJECTS_BY_CURRICULUM;
  return source[curriculum] ?? [];
}

function topicsFor(subject: string, grade: string): string[] {
  if (SENIOR_GRADES.has(grade)) {
    return SENIOR_TOPICS_BY_SUBJECT[subject] ?? TOPICS_BY_SUBJECT[subject] ?? [];
  }
  return TOPICS_BY_SUBJECT[subject] ?? [];
}

const TOPICS_BY_SUBJECT: Record<string, string[]> = {
  "Mathematics": [
    "Algebra", "Functions & Graphs", "Trigonometry",
    "Euclidean Geometry", "Analytical Geometry", "Statistics & Probability",
    "Calculus", "Financial Mathematics", "Sequences & Series",
  ],
  "Mathematical Literacy": [
    "Finance & Budgeting", "Data Handling", "Measurement",
    "Maps, Plans & Scale", "Patterns & Relationships",
  ],
  "Physical Sciences": [
    "Mechanics", "Waves & Sound", "Light & Optics",
    "Electricity & Magnetism", "Organic Chemistry",
    "Chemical Equilibrium", "Electrochemistry", "Atomic Structure",
  ],
  "Physics": [
    "Mechanics", "Thermal Physics", "Waves",
    "Electricity & Magnetism", "Nuclear Physics",
  ],
  "Chemistry": [
    "Atomic Structure", "Chemical Bonding", "Energetics",
    "Kinetics & Equilibrium", "Organic Chemistry", "Electrochemistry",
  ],
  "Biology": [
    "Cell Biology", "Genetics & DNA", "Evolution",
    "Ecology", "Human Physiology", "Plant Biology",
  ],
  "Life Sciences": [
    "Cell Biology", "Genetics & Inheritance", "Evolution",
    "Ecology & Environment", "Human Biology", "Reproduction", "Plants & Photosynthesis",
  ],
  "Geography": [
    "Map Work", "Climate & Weather Systems", "Geomorphology",
    "Settlement & Urban Geography", "Economic Geography", "Population & Migration",
  ],
  "History": [
    "The Cold War", "Apartheid South Africa", "Civil Rights Movement",
    "World War II", "Decolonisation", "Nationalism & Independence",
  ],
  "Accounting": [
    "Financial Statements", "Ledger Accounts", "Cash Flow Statements",
    "Cost Accounting", "Budgets", "Inventory Systems",
  ],
  "Business Studies": [
    "Forms of Ownership", "Marketing", "Human Resources",
    "Operations Management", "Entrepreneurship", "Business Ethics",
  ],
  "Economics": [
    "Micro Economics", "Macro Economics", "Market Structures",
    "International Trade", "Economic Growth & Development", "Money & Banking",
  ],
  "English Home Language": [
    "Poetry Analysis", "Novel Study", "Drama",
    "Language & Grammar", "Essay Writing", "Reading Comprehension",
  ],
  "English Language": [
    "Reading Comprehension", "Directed Writing", "Summary Writing",
    "Composition", "Grammar & Vocabulary",
  ],
  "Afrikaans Home Language": [
    "Poësie-analise", "Romanteks", "Taal & Grammatika",
    "Opstelskrywing", "Begripstoets",
  ],
  "isiZulu Home Language": [
    "Izinkondlo (Poetry)", "Izinganekwane (Folk Tales)",
    "Ulimi (Language)", "Ukubhala (Writing)",
  ],
  "Computer Applications Technology": [
    "Hardware & Software", "Spreadsheets", "Word Processing",
    "Databases", "Networks & Internet", "HTML & Web Design",
  ],
  "Information Technology": [
    "OOP Programming", "Data Structures", "Algorithms",
    "SQL Databases", "Networks", "Systems Development",
  ],
  "Computer Science": [
    "Programming Fundamentals", "Data Structures & Algorithms",
    "Boolean Logic", "Computer Architecture",
  ],
  "Life Orientation": [
    "Personal Development", "Study Skills", "Careers & Planning",
    "Social Issues", "Health & Wellbeing",
  ],
  "Agricultural Sciences": [
    "Plant Production", "Animal Production", "Soil Science", "Agricultural Economics",
  ],
  "Engineering Graphics & Design": [
    "Drawing Standards", "Geometric Drawing", "Orthographic Projection",
    "Isometric Drawing", "Civil Drawing",
  ],
  "Literature in English": [
    "Poetry", "Prose & Short Stories", "Drama", "Stylistic Devices", "Essay Writing",
  ],
  "Visual Arts": ["Drawing", "Painting", "Design", "Art History", "Printmaking"],
  "Drama": ["Performance", "Script Analysis", "Theatre History", "Voice & Movement"],
};

const SA_LANGUAGES = [
  "English",
  "Afrikaans",
  "isiZulu",
  "isiXhosa",
  "Sesotho sa Leboa (Sepedi)",
  "Setswana",
  "Sesotho",
  "Xitsonga",
  "siSwati",
  "Tshivenda",
  "isiNdebele",
];

const FREE_CHAT_LIMIT = 5;

// ── Types ─────────────────────────────────────────────────────────────────────

interface Message {
  role: "nexi" | "student";
  text: string;
  detailed?: boolean; // an escalated, more-detailed (Sonnet) explanation
  feedback?: "yes" | "no"; // the learner's "did this make sense?" answer
}

interface Profile {
  curriculum: string;
  grade: string;
  school: string;
  goal: string;
  subject: string;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

const WELCOME_MSG: Message = {
  role: "nexi",
  text: "Hi! I'm Nexi. Pick your subject and topic above, and I'll explain anything — step by step.",
};

function counterColor(n: number): string {
  if (n >= 4) return "bg-emerald-400/10 text-emerald-300 border-emerald-400/30";
  if (n >= 2) return "bg-amber-400/10 text-amber-300 border-amber-400/30";
  return "bg-red-400/10 text-red-300 border-red-400/30";
}

const SELECT_CLS =
  "w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#00D4FF]/40 focus:border-[#00D4FF] transition-colors cursor-pointer";

// ── Component ─────────────────────────────────────────────────────────────────

export default function NexiTutorPage() {
  const { data: session, status } = useSession();
  const authed = status === "authenticated";
  const plan: "free" | "premium" = session?.user?.plan ?? "free";

  // Profile
  const [profile, setProfile] = useState<Profile>({
    curriculum: "CAPS",
    grade: "Grade 12",
    school: "",
    goal: "",
    subject: "Mathematics",
  });
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState<Profile>(profile);

  // Lesson selector
  const [curriculum, setCurriculum] = useState("CAPS");
  const [grade, setGrade] = useState("Grade 12");
  const [subject, setSubject] = useState("Mathematics");
  const [topic, setTopic] = useState("");
  const [language, setLanguage] = useState("English");

  // Chat
  const [messages, setMessages] = useState<Message[]>([WELCOME_MSG]);
  const [input, setInput] = useState("");
  const [chatsLeft, setChatsLeft] = useState(FREE_CHAT_LIMIT);
  const [chatLimit, setChatLimit] = useState(FREE_CHAT_LIMIT);
  const [sending, setSending] = useState(false);
  const [escalating, setEscalating] = useState(false);
  const [showJump, setShowJump] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  function isNearBottom() {
    const el = scrollRef.current;
    if (!el) return true;
    return el.scrollHeight - el.scrollTop - el.clientHeight < 80;
  }
  function scrollToBottom() {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
    setShowJump(false);
  }

  // Seed the real remaining count from the server once signed in.
  useEffect(() => {
    if (status !== "authenticated") return;
    fetch("/api/tutor")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (d) {
          setChatsLeft(d.remaining);
          setChatLimit(d.limit);
        }
      })
      .catch(() => {});
  }, [status]);

  // Free tier is limited to English / Afrikaans / isiZulu — if a locked language
  // is somehow selected, fall back to English.
  useEffect(() => {
    if (!languageAllowed(plan, language)) setLanguage("English");
  }, [plan, language]);

  const currentSubjects = subjectsFor(curriculum, grade);
  const currentTopics = topicsFor(subject, grade);

  // Auto-resize textarea
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 120)}px`;
  }, [input]);

  // Only follow the stream to the bottom if the learner is already there. If
  // they've scrolled up to reread, leave them be and surface a jump button.
  useEffect(() => {
    if (isNearBottom()) {
      scrollToBottom();
    } else {
      setShowJump(true);
    }
  }, [messages]);

  function handleCurriculumChange(val: string) {
    setCurriculum(val);
    const subs = subjectsFor(val, grade);
    setSubject(subs[0] ?? "");
    setTopic("");
  }

  function handleGradeChange(val: string) {
    setGrade(val);
    const subs = subjectsFor(curriculum, val);
    if (!subs.includes(subject)) setSubject(subs[0] ?? "");
    setTopic("");
  }

  function handleSubjectChange(val: string) {
    setSubject(val);
    setTopic("");
  }

  function setLastNexi(text: string) {
    setMessages((prev) => {
      const next = [...prev];
      // Preserve flags (e.g. `detailed`) while streaming text into the bubble.
      next[next.length - 1] = { ...next[next.length - 1], role: "nexi", text };
      return next;
    });
  }

  // Overwrite the last bubble with a plain Nexi message (drops `detailed`, so an
  // error during escalation doesn't render the "more detailed" label/upsell).
  function replaceLastWithPlain(text: string) {
    setMessages((prev) => {
      const next = [...prev];
      next[next.length - 1] = { role: "nexi", text };
      return next;
    });
  }

  // "Did this make sense?" → Yes records it; No escalates the same question to
  // the smarter model and streams a fresh, more-detailed explanation below.
  async function handleFeedback(index: number, helpful: boolean) {
    setMessages((prev) =>
      prev.map((m, i) => (i === index ? { ...m, feedback: helpful ? "yes" : "no" } : m))
    );
    if (helpful || escalating) return;

    // Re-answer the question this message responded to: take the conversation up
    // to (and including) the student question, dropping this answer itself.
    const context = messages.slice(0, index).map((m) => ({ role: m.role, text: m.text }));
    if (!context.some((m) => m.role === "student")) return;

    setEscalating(true);
    setMessages((prev) => [...prev, { role: "nexi", text: "", detailed: true }]);
    try {
      const res = await fetch("/api/tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: context,
          curriculum,
          grade,
          subject,
          topic,
          language,
          escalate: true,
        }),
      });

      if (res.status === 429) {
        setChatsLeft(0);
        replaceLastWithPlain(
          "You've used your tutor messages for today. Premium gives you more — and answers like this by default."
        );
        return;
      }
      if (!res.ok || !res.body) {
        const data = await res.json().catch(() => null);
        replaceLastWithPlain(
          data?.error ?? "Sorry — couldn't load a more detailed explanation. Please try again."
        );
        return;
      }

      const remaining = res.headers.get("X-Chats-Remaining");
      if (remaining !== null) setChatsLeft(Number(remaining));

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setLastNexi(acc);
      }
    } catch {
      replaceLastWithPlain("Connection problem — please try again.");
    } finally {
      setEscalating(false);
    }
  }

  async function handleSend() {
    if (!input.trim() || sending || escalating || !authed || chatsLeft <= 0) return;
    const text = input.trim();
    const studentMsg: Message = { role: "student", text };
    const history = [...messages, studentMsg];
    setMessages([...history, { role: "nexi", text: "" }]);
    setInput("");
    setSending(true);

    try {
      const res = await fetch("/api/tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: history.map((m) => ({ role: m.role, text: m.text })),
          curriculum,
          grade,
          subject,
          topic,
          language,
        }),
      });

      if (res.status === 429) {
        setChatsLeft(0);
        setLastNexi("You've used your tutor messages for today. Come back tomorrow, or go Premium for more.");
        return;
      }
      if (!res.ok || !res.body) {
        const data = await res.json().catch(() => null);
        setLastNexi(data?.error ?? "Sorry — something went wrong. Please try again.");
        return;
      }

      const remaining = res.headers.get("X-Chats-Remaining");
      if (remaining !== null) setChatsLeft(Number(remaining));

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setLastNexi(acc);
      }
    } catch {
      setLastNexi("Connection problem — please try again.");
    } finally {
      setSending(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  function startEdit() {
    setDraft(profile);
    setEditing(true);
  }

  function saveEdit() {
    setProfile(draft);
    setEditing(false);
  }

  // Once Nexi has actually answered something, nudge the learner to lock it in
  // with a quick quiz (and stop nudging once they've seen it).
  const answeredOnce =
    !sending &&
    !escalating &&
    messages.some((m, i) => i > 0 && m.role === "nexi" && m.text.trim() !== "");

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen">

      {/* ── 1. HERO ── */}
      <section className="page-hero py-10 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-6 md:gap-10">

          {/* Text */}
          <div className="flex-1 text-center md:text-left order-2 md:order-1">
            <h1 className="text-4xl sm:text-5xl font-bold mb-3 text-white">
              Nexi <span className="text-gradient">Tutor</span>
            </h1>
            <p className="text-lg text-white/70 mb-5 leading-snug">
              Smarter, Faster — Always Here for You
            </p>
            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
              {["SA Curriculum", "Steps", "Quizzes", "Examples"].map((badge) => (
                <span
                  key={badge}
                  className="glass px-4 py-1.5 rounded-full text-[#00D4FF] text-sm font-medium"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* Nexi image with glow */}
          <div className="flex-shrink-0 order-1 md:order-2 flex justify-center">
            <div className="relative animate-float">
              <div
                aria-hidden
                className="glow-ring absolute inset-0 m-auto w-[105%] h-[105%] -translate-y-1 rounded-full"
              />
              <Nexi
                pose="idle"
                width={320}
                height={320}
                className="relative w-40 sm:w-56 md:w-auto md:h-72 object-contain drop-shadow-2xl"
                priority
              />
            </div>
          </div>

        </div>
      </section>

      <div className="section-divider" />

      {/* ── MAIN ── */}
      <div className="max-w-4xl mx-auto px-4 py-10 space-y-6">

        {/* ── 2. PROFILE CARD ── */}
        <Reveal>
          <div className="glass rounded-2xl overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/5">
              <div className="flex items-center gap-2.5 text-[#00D4FF]">
                <IconUser className="w-4 h-4" />
                <h2 className="text-xs font-semibold text-white uppercase tracking-widest">My Profile</h2>
              </div>
              {!editing ? (
                <button
                  onClick={startEdit}
                  className="text-xs font-semibold text-[#00D4FF] hover:text-white border border-[#00D4FF]/30 hover:border-[#00D4FF] px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                >
                  Edit
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={() => setEditing(false)}
                    className="text-xs font-semibold text-white/50 hover:text-white border border-white/15 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={saveEdit}
                    className="text-xs font-semibold text-white bg-[#2D6BE4] hover:bg-[#4A82F0] px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                  >
                    Save
                  </button>
                </div>
              )}
            </div>

            <div className="px-6 py-5">
              {!editing ? (
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-5">
                  {[
                    { label: "Curriculum", value: profile.curriculum },
                    { label: "Grade", value: profile.grade },
                    { label: "School", value: profile.school || "—" },
                    { label: "Goal", value: profile.goal || "—" },
                    { label: "Subject", value: profile.subject },
                  ].map((field) => (
                    <div key={field.label}>
                      <p className="text-[10px] font-semibold uppercase tracking-widest text-white/40 mb-1">
                        {field.label}
                      </p>
                      <p className="text-sm font-semibold text-white leading-snug break-words">
                        {field.value}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-white/50 mb-1.5">Curriculum</label>
                    <select
                      value={draft.curriculum}
                      onChange={(e) => setDraft({ ...draft, curriculum: e.target.value })}
                      className={SELECT_CLS}
                    >
                      {CURRICULA.map((c) => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-white/50 mb-1.5">Grade</label>
                    <select
                      value={draft.grade}
                      onChange={(e) => setDraft({ ...draft, grade: e.target.value })}
                      className={SELECT_CLS}
                    >
                      {GRADES.map((g) => <option key={g}>{g}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-white/50 mb-1.5">School</label>
                    <input
                      type="text"
                      value={draft.school}
                      onChange={(e) => setDraft({ ...draft, school: e.target.value })}
                      placeholder="e.g. Northview High"
                      className={SELECT_CLS + " placeholder:text-white/25 cursor-text"}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-white/50 mb-1.5">Goal</label>
                    <input
                      type="text"
                      value={draft.goal}
                      onChange={(e) => setDraft({ ...draft, goal: e.target.value })}
                      placeholder="e.g. Study Medicine at UCT"
                      className={SELECT_CLS + " placeholder:text-white/25 cursor-text"}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-white/50 mb-1.5">Favourite Subject</label>
                    <select
                      value={draft.subject}
                      onChange={(e) => setDraft({ ...draft, subject: e.target.value })}
                      className={SELECT_CLS}
                    >
                      {subjectsFor(draft.curriculum, draft.grade).map((s) => (
                        <option key={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Reveal>

        {/* ── 3. LESSON SELECTOR ── */}
        <Reveal delay={100}>
          <div className="glass rounded-2xl overflow-hidden">
            <div className="flex items-center gap-2.5 px-6 py-4 border-b border-white/10 bg-white/5 text-[#00D4FF]">
              <IconBookOpen className="w-4 h-4" />
              <h2 className="text-xs font-semibold text-white uppercase tracking-widest">Lesson Selector</h2>
            </div>
            <div className="px-6 py-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              <div>
                <label className="block text-[10px] font-semibold uppercase tracking-widest text-white/40 mb-1.5">Curriculum</label>
                <select value={curriculum} onChange={(e) => handleCurriculumChange(e.target.value)} className={SELECT_CLS}>
                  {CURRICULA.map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-semibold uppercase tracking-widest text-white/40 mb-1.5">Grade</label>
                <select value={grade} onChange={(e) => handleGradeChange(e.target.value)} className={SELECT_CLS}>
                  {GRADES.map((g) => <option key={g}>{g}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-semibold uppercase tracking-widest text-white/40 mb-1.5">Subject</label>
                <select value={subject} onChange={(e) => handleSubjectChange(e.target.value)} className={SELECT_CLS}>
                  {currentSubjects.map((s) => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-semibold uppercase tracking-widest text-white/40 mb-1.5">Topic</label>
                <select
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  disabled={currentTopics.length === 0}
                  className={SELECT_CLS + " disabled:opacity-50 disabled:cursor-not-allowed"}
                >
                  <option value="">— All topics —</option>
                  {currentTopics.map((t) => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-semibold uppercase tracking-widest text-white/40 mb-1.5">Language</label>
                <select value={language} onChange={(e) => setLanguage(e.target.value)} className={SELECT_CLS}>
                  {SA_LANGUAGES.map((l) => {
                    const locked = !languageAllowed(plan, l);
                    return (
                      <option key={l} value={l} disabled={locked}>
                        {locked ? `${l} · 🔒 Premium` : l}
                      </option>
                    );
                  })}
                </select>
                {plan !== "premium" && (
                  <p className="text-[10px] text-white/40 mt-1.5 leading-relaxed">
                    English, Afrikaans &amp; isiZulu free ·{" "}
                    <Link href="/pricing" className="text-[#00D4FF] hover:text-white transition-colors">
                      unlock all 11 with Premium
                    </Link>
                  </p>
                )}
              </div>
            </div>
          </div>
        </Reveal>

        {/* ── 4. CHAT ── */}
        <Reveal delay={200}>
          <div className="glass rounded-2xl overflow-hidden">

            {/* Header + counter */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/5">
              <div className="flex items-center gap-2.5 text-[#00D4FF]">
                <IconCpuChip className="w-4 h-4" />
                <h2 className="text-xs font-semibold text-white uppercase tracking-widest">Chat with Nexi</h2>
              </div>
              {authed ? (
                <span className={`text-xs font-semibold px-3 py-1.5 rounded-full border ${counterColor(chatsLeft)}`}>
                  {chatsLeft} / {chatLimit} messages today
                </span>
              ) : (
                <span className="text-xs font-semibold px-3 py-1.5 rounded-full border glass text-white/60">
                  Sign in to chat
                </span>
              )}
            </div>

            {/* Messages */}
            <div className="relative">
            <div
              ref={scrollRef}
              onScroll={() => { if (isNearBottom()) setShowJump(false); }}
              className="h-96 overflow-y-auto p-5 space-y-5 bg-[#0A1628]/40"
            >
              {messages.map((msg, i) => {
                const isLast = i === messages.length - 1;
                const streaming = isLast && (sending || escalating);
                // Show the "did this make sense?" prompt under every answered,
                // non-welcome Nexi message that isn't itself an escalation.
                const showFeedback =
                  msg.role === "nexi" && i > 0 && !msg.detailed && msg.text !== "" && !streaming;
                return (
                <div key={i}>
                <div
                  className={`animate-msg-in flex items-end gap-3 ${msg.role === "student" ? "flex-row-reverse" : "flex-row"}`}
                >
                  {/* Avatar */}
                  {msg.role === "nexi" ? (
                    <div className="animate-avatar-glow flex-shrink-0 w-9 h-9 rounded-full overflow-hidden bg-[#0E1F3D] ring-2 ring-[#00D4FF]/40">
                      <Image
                        src="/images/nexi-idle.webp"
                        alt="Nexi"
                        width={36}
                        height={36}
                        className="w-full h-full object-cover object-top scale-110"
                      />
                    </div>
                  ) : (
                    <div className="flex-shrink-0 w-9 h-9 rounded-full bg-[#2D6BE4] flex items-center justify-center ring-2 ring-[#2D6BE4]/30">
                      <span className="text-[10px] font-bold text-white leading-none">YOU</span>
                    </div>
                  )}

                  {/* Bubble */}
                  <div
                    className={`max-w-xs sm:max-w-md rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                      msg.role === "nexi"
                        ? "glass text-white rounded-bl-sm"
                        : "bg-gradient-to-br from-[#2D6BE4] to-[#1E4FB8] text-white rounded-br-sm shadow-lg shadow-[#2D6BE4]/25"
                    } ${msg.detailed ? "ring-1 ring-[#FFB454]/40" : ""}`}
                  >
                    {msg.role === "nexi" ? (
                      msg.text ? (
                        <div className="nexi-md">
                          {msg.detailed && (
                            <p className="text-[10px] font-bold uppercase tracking-widest text-[#FFB454] mb-2">
                              ✨ More detailed explanation
                            </p>
                          )}
                          <ReactMarkdown>{msg.text}</ReactMarkdown>
                        </div>
                      ) : (
                        <span className="text-white/50 italic">Nexi is thinking…</span>
                      )
                    ) : (
                      msg.text
                    )}
                  </div>
                </div>

                {/* "Did this make sense?" — No escalates to the smarter model */}
                {showFeedback && (
                  <div className="pl-12 mt-1.5">
                    {!msg.feedback ? (
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[11px] text-white/40">Did this make sense?</span>
                        <button
                          onClick={() => handleFeedback(i, true)}
                          className="text-[11px] font-semibold text-white/60 hover:text-white border border-white/15 hover:border-white/30 rounded-full px-2.5 py-0.5 transition-colors cursor-pointer"
                        >
                          Yes
                        </button>
                        <button
                          onClick={() => handleFeedback(i, false)}
                          disabled={escalating}
                          className="text-[11px] font-semibold text-[#00D4FF] hover:text-white border border-[#00D4FF]/30 hover:border-[#00D4FF] rounded-full px-2.5 py-0.5 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-wait"
                        >
                          No, explain more
                        </button>
                      </div>
                    ) : msg.feedback === "yes" ? (
                      <span className="text-[11px] text-white/30">Glad it helped 💙</span>
                    ) : (
                      <span className="text-[11px] text-white/40">
                        Got Nexi to break it down further below ↓
                      </span>
                    )}
                  </div>
                )}

                {/* Free-tier upsell under an escalated explanation */}
                {msg.detailed && !streaming && msg.text !== "" && plan === "free" && (
                  <div className="pl-12 mt-2">
                    <p className="text-[11px] text-white/45 leading-relaxed">
                      ✨ That was Nexi&apos;s smarter Premium model.{" "}
                      <Link
                        href="/pricing"
                        className="text-[#00D4FF] hover:text-white transition-colors font-semibold"
                      >
                        Upgrade
                      </Link>{" "}
                      to get this depth on every answer.
                    </p>
                  </div>
                )}
                </div>
                );
              })}
            </div>
            {showJump && (
              <button
                onClick={scrollToBottom}
                className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3.5 py-1.5 rounded-full bg-[#2D6BE4] hover:bg-[#4A82F0] text-white text-xs font-semibold shadow-lg shadow-black/30 transition-colors"
              >
                ↓ New message
              </button>
            )}
            </div>

            {/* Input */}
            <div className="border-t border-white/10 px-4 py-4">
              {!authed ? (
                <div className="text-center py-2">
                  <p className="text-sm text-white/50 mb-2">
                    Sign in to chat with Nexi and get step-by-step help.
                  </p>
                  <Link
                    href="/login"
                    className="text-sm font-semibold text-[#00D4FF] hover:text-white transition-colors"
                  >
                    Sign in or create a free account →
                  </Link>
                </div>
              ) : chatsLeft <= 0 ? (
                <div className="text-center py-2">
                  <p className="text-sm text-white/50 mb-2">
                    You&apos;ve used your tutor messages for today.
                  </p>
                  <Link
                    href="/pricing"
                    className="text-sm font-semibold text-[#00D4FF] hover:text-white transition-colors"
                  >
                    Go Premium for more daily messages →
                  </Link>
                </div>
              ) : (
                <>
                  <div className="flex gap-3 items-end">
                    <textarea
                      ref={textareaRef}
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder={`Ask Nexi about ${topic || subject}...`}
                      rows={1}
                      disabled={sending}
                      className="flex-1 resize-none bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#00D4FF]/40 focus:border-[#00D4FF] placeholder:text-white/25 leading-relaxed overflow-hidden transition-colors disabled:opacity-60"
                      style={{ minHeight: "44px", maxHeight: "120px" }}
                    />
                    <button
                      onClick={handleSend}
                      disabled={!input.trim() || sending}
                      className="flex-shrink-0 px-5 py-3 bg-[#2D6BE4] hover:bg-[#4A82F0] disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold text-sm rounded-xl transition-all shadow-lg shadow-[#2D6BE4]/30 hover:shadow-[#00D4FF]/30 cursor-pointer"
                    >
                      {sending ? "Thinking…" : "Ask Nexi"}
                    </button>
                  </div>
                  <p className="text-[10px] text-white/30 mt-2 text-center">
                    Press Enter to send · Shift+Enter for new line
                  </p>
                </>
              )}
            </div>
          </div>
        </Reveal>

      </div>

      {/* First-time nudge: turn an explanation into practice */}
      <NudgeHint
        show={answeredOnce}
        storageKey="nexi-nudge-tutor"
        message="Lock it in — take a quick quiz"
        href="/practice"
      />
    </div>
  );
}

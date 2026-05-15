"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";

// ── Data ─────────────────────────────────────────────────────────────────────

const CURRICULA = ["CAPS", "IEB", "Cambridge"];
const GRADES = ["Grade 10", "Grade 11", "Grade 12"];

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

const FREE_CHAT_LIMIT = 10;

// ── Types ─────────────────────────────────────────────────────────────────────

interface Message {
  role: "nexi" | "student";
  text: string;
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
  text: "Hi! I'm Nexi, your personal study buddy. Select your subject and topic above and I'll help you understand anything — step by step!",
};

function counterColor(n: number): string {
  if (n >= 7) return "bg-emerald-50 text-emerald-700 border-emerald-200";
  if (n >= 4) return "bg-amber-50 text-amber-700 border-amber-200";
  return "bg-red-50 text-red-600 border-red-200";
}

const SELECT_CLS =
  "w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-[#1B2A4A] bg-white focus:outline-none focus:ring-2 focus:ring-[#2D6BE4]/30 focus:border-[#2D6BE4]";

// ── Component ─────────────────────────────────────────────────────────────────

export default function NexiTutorPage() {
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
  const chatEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const currentSubjects = SUBJECTS_BY_CURRICULUM[curriculum] ?? [];
  const currentTopics = TOPICS_BY_SUBJECT[subject] ?? [];

  // Auto-resize textarea
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 120)}px`;
  }, [input]);

  // Scroll to latest message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function handleCurriculumChange(val: string) {
    setCurriculum(val);
    const subs = SUBJECTS_BY_CURRICULUM[val] ?? [];
    setSubject(subs[0] ?? "");
    setTopic("");
  }

  function handleSubjectChange(val: string) {
    setSubject(val);
    setTopic("");
  }

  function handleSend() {
    if (!input.trim() || chatsLeft <= 0) return;
    const studentMsg: Message = { role: "student", text: input.trim() };
    const nexiReply: Message = {
      role: "nexi",
      text: `Great question about "${topic || subject}"! Let me break that down step by step for you. [Demo mode — real AI responses coming soon.]`,
    };
    setMessages((prev) => [...prev, studentMsg, nexiReply]);
    setChatsLeft((n) => n - 1);
    setInput("");
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

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-[#F0F4FF]">

      {/* ── 1. HERO ── */}
      <section className="bg-[#1B2A4A] text-white py-14 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-14">

          {/* Text */}
          <div className="flex-1 text-center md:text-left order-2 md:order-1">
            <h1 className="text-4xl sm:text-5xl font-bold mb-3">
              Nexi <span className="text-[#2D6BE4]">Tutor</span>
            </h1>
            <p className="text-xl text-gray-300 mb-7 leading-snug">
              Smarter, Faster — Always Here for You
            </p>
            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
              {["SA Curriculum", "Steps", "Quizzes", "Examples"].map((badge) => (
                <span
                  key={badge}
                  className="px-4 py-1.5 rounded-full bg-[#2D6BE4]/20 text-[#7EABFF] text-sm font-medium border border-[#2D6BE4]/30"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* Nexi image */}
          <div className="flex-shrink-0 order-1 md:order-2 flex justify-center">
            <Image
              src="/nexi.png"
              alt="Nexi mascot"
              width={320}
              height={320}
              className="w-40 sm:w-56 md:w-auto md:h-72 object-contain drop-shadow-2xl"
              priority
            />
          </div>

        </div>
      </section>

      {/* ── MAIN ── */}
      <div className="max-w-4xl mx-auto px-4 py-10 space-y-6">

        {/* ── 2. PROFILE CARD ── */}
        <div className="bg-white rounded-2xl border border-[#1B2A4A]/10 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#1B2A4A]/8 bg-[#1B2A4A]/5">
            <div className="flex items-center gap-2">
              <span className="text-base">👤</span>
              <h2 className="text-xs font-semibold text-[#1B2A4A] uppercase tracking-widest">My Profile</h2>
            </div>
            {!editing ? (
              <button
                onClick={startEdit}
                className="text-xs font-semibold text-[#2D6BE4] hover:text-[#2558C5] border border-[#2D6BE4]/30 hover:border-[#2D6BE4] px-3 py-1.5 rounded-lg transition-colors"
              >
                Edit
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={() => setEditing(false)}
                  className="text-xs font-semibold text-gray-400 hover:text-gray-600 border border-gray-200 px-3 py-1.5 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={saveEdit}
                  className="text-xs font-semibold text-white bg-[#2D6BE4] hover:bg-[#2558C5] px-3 py-1.5 rounded-lg transition-colors"
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
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-1">
                      {field.label}
                    </p>
                    <p className="text-sm font-semibold text-[#1B2A4A] leading-snug break-words">
                      {field.value}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5">Curriculum</label>
                  <select
                    value={draft.curriculum}
                    onChange={(e) => setDraft({ ...draft, curriculum: e.target.value })}
                    className={SELECT_CLS}
                  >
                    {CURRICULA.map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5">Grade</label>
                  <select
                    value={draft.grade}
                    onChange={(e) => setDraft({ ...draft, grade: e.target.value })}
                    className={SELECT_CLS}
                  >
                    {GRADES.map((g) => <option key={g}>{g}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5">School</label>
                  <input
                    type="text"
                    value={draft.school}
                    onChange={(e) => setDraft({ ...draft, school: e.target.value })}
                    placeholder="e.g. Northview High"
                    className={SELECT_CLS + " placeholder:text-gray-300"}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5">Goal</label>
                  <input
                    type="text"
                    value={draft.goal}
                    onChange={(e) => setDraft({ ...draft, goal: e.target.value })}
                    placeholder="e.g. Study Medicine at UCT"
                    className={SELECT_CLS + " placeholder:text-gray-300"}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5">Favourite Subject</label>
                  <select
                    value={draft.subject}
                    onChange={(e) => setDraft({ ...draft, subject: e.target.value })}
                    className={SELECT_CLS}
                  >
                    {(SUBJECTS_BY_CURRICULUM[draft.curriculum] ?? []).map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── 3. LESSON SELECTOR ── */}
        <div className="bg-white rounded-2xl border border-[#1B2A4A]/10 shadow-sm overflow-hidden">
          <div className="flex items-center gap-2 px-6 py-4 border-b border-[#1B2A4A]/8 bg-[#1B2A4A]/5">
            <span className="text-base">📚</span>
            <h2 className="text-xs font-semibold text-[#1B2A4A] uppercase tracking-widest">Lesson Selector</h2>
          </div>
          <div className="px-6 py-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <div>
              <label className="block text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-1.5">Curriculum</label>
              <select value={curriculum} onChange={(e) => handleCurriculumChange(e.target.value)} className={SELECT_CLS}>
                {CURRICULA.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-1.5">Grade</label>
              <select value={grade} onChange={(e) => setGrade(e.target.value)} className={SELECT_CLS}>
                {GRADES.map((g) => <option key={g}>{g}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-1.5">Subject</label>
              <select value={subject} onChange={(e) => handleSubjectChange(e.target.value)} className={SELECT_CLS}>
                {currentSubjects.map((s) => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-1.5">Topic</label>
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
              <label className="block text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-1.5">Language</label>
              <select value={language} onChange={(e) => setLanguage(e.target.value)} className={SELECT_CLS}>
                {SA_LANGUAGES.map((l) => <option key={l}>{l}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* ── 4. CHAT ── */}
        <div className="bg-white rounded-2xl border border-[#1B2A4A]/10 shadow-sm overflow-hidden">

          {/* Header + counter */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#1B2A4A]/8 bg-[#1B2A4A]/5">
            <div className="flex items-center gap-2">
              <span className="text-base">🤖</span>
              <h2 className="text-xs font-semibold text-[#1B2A4A] uppercase tracking-widest">Chat with Nexi</h2>
            </div>
            <span className={`text-xs font-semibold px-3 py-1.5 rounded-full border ${counterColor(chatsLeft)}`}>
              {chatsLeft} / {FREE_CHAT_LIMIT} free chats remaining
            </span>
          </div>

          {/* Messages */}
          <div className="h-96 overflow-y-auto p-5 space-y-5 bg-[#F8FAFF]">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex items-end gap-3 ${msg.role === "student" ? "flex-row-reverse" : "flex-row"}`}
              >
                {/* Avatar */}
                {msg.role === "nexi" ? (
                  <div className="flex-shrink-0 w-9 h-9 rounded-full overflow-hidden bg-[#1B2A4A] ring-2 ring-[#2D6BE4]/20">
                    <Image
                      src="/nexi.png"
                      alt="Nexi"
                      width={36}
                      height={36}
                      className="w-full h-full object-cover object-top scale-110"
                    />
                  </div>
                ) : (
                  <div className="flex-shrink-0 w-9 h-9 rounded-full bg-[#2D6BE4] flex items-center justify-center ring-2 ring-[#2D6BE4]/20">
                    <span className="text-[10px] font-bold text-white leading-none">YOU</span>
                  </div>
                )}

                {/* Bubble */}
                <div
                  className={`max-w-xs sm:max-w-md rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    msg.role === "nexi"
                      ? "bg-white border border-[#1B2A4A]/8 text-[#1B2A4A] rounded-bl-sm shadow-sm"
                      : "bg-[#2D6BE4] text-white rounded-br-sm shadow-sm shadow-[#2D6BE4]/20"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-[#1B2A4A]/8 px-4 py-4">
            {chatsLeft <= 0 ? (
              <div className="text-center py-2">
                <p className="text-sm text-gray-500 mb-2">
                  You&apos;ve used all your free chats for today.
                </p>
                <Link
                  href="/pricing"
                  className="text-sm font-semibold text-[#2D6BE4] hover:text-[#2558C5] transition-colors"
                >
                  Upgrade to Student plan for unlimited access →
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
                    className="flex-1 resize-none border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#1B2A4A] focus:outline-none focus:ring-2 focus:ring-[#2D6BE4]/30 focus:border-[#2D6BE4] placeholder:text-gray-300 leading-relaxed overflow-hidden"
                    style={{ minHeight: "44px", maxHeight: "120px" }}
                  />
                  <button
                    onClick={handleSend}
                    disabled={!input.trim()}
                    className="flex-shrink-0 px-5 py-3 bg-[#2D6BE4] hover:bg-[#2558C5] disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold text-sm rounded-xl transition-colors shadow-sm shadow-[#2D6BE4]/20"
                  >
                    Ask Nexi
                  </button>
                </div>
                <p className="text-[10px] text-gray-400 mt-2 text-center">
                  Press Enter to send · Shift+Enter for new line
                </p>
              </>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

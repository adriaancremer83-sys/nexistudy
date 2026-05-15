export default function StudyProPage() {
  return (
    <div className="min-h-screen bg-[#F0F4FF]">
      <section className="bg-[#1B2A4A] text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">
            Study <span className="text-[#2D6BE4]">Pro</span>
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Advanced study tools designed to maximise retention and minimise
            wasted effort. Smart flashcards, spaced repetition, and detailed
            analytics.
          </p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            { title: "Smart Flashcards", desc: "Create, organise, and study cards with AI-assisted content generation.", icon: "🃏" },
            { title: "Spaced Repetition", desc: "Our algorithm surfaces cards at the optimal moment for long-term memory.", icon: "🔁" },
            { title: "Progress Analytics", desc: "Detailed charts showing your strengths, weak spots, and study streaks.", icon: "📊" },
            { title: "Topic Planner", desc: "Break subjects into manageable chunks with auto-generated study schedules.", icon: "🗓️" },
          ].map((f) => (
            <div key={f.title} className="bg-white rounded-xl p-6 shadow-sm border border-[#1B2A4A]/10">
              <div className="text-3xl mb-3">{f.icon}</div>
              <h3 className="text-lg font-semibold text-[#1B2A4A] mb-2">{f.title}</h3>
              <p className="text-gray-600 text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

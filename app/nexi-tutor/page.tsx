export default function NexiTutorPage() {
  return (
    <div className="min-h-screen bg-[#F0F4FF]">
      <section className="bg-[#1B2A4A] text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">
            Nexi <span className="text-[#2D6BE4]">Tutor</span>
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Your personal AI tutor — available any time, on any subject.
            Ask questions, work through problems, and get step-by-step guidance.
          </p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-sm border border-[#1B2A4A]/10 p-8 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-[#2D6BE4] rounded-full flex items-center justify-center text-white font-bold">N</div>
              <span className="font-semibold text-[#1B2A4A]">Nexi Tutor</span>
            </div>
            <p className="text-gray-600 bg-[#F0F4FF] rounded-xl p-4 inline-block">
              Hi! I&apos;m Nexi, your AI study companion. What subject would you
              like help with today?
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { subject: "Mathematics", icon: "➕" },
              { subject: "Sciences", icon: "🔬" },
              { subject: "History", icon: "📜" },
              { subject: "Languages", icon: "🌍" },
              { subject: "Literature", icon: "📖" },
              { subject: "Coding", icon: "💻" },
            ].map((s) => (
              <button
                key={s.subject}
                className="bg-white border border-[#2D6BE4]/20 hover:border-[#2D6BE4] hover:bg-[#2D6BE4]/5 rounded-xl p-4 text-left transition-all group cursor-pointer"
              >
                <span className="text-2xl">{s.icon}</span>
                <p className="mt-2 font-medium text-[#1B2A4A] group-hover:text-[#2D6BE4] transition-colors">
                  {s.subject}
                </p>
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

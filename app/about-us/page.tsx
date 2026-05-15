export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-[#F0F4FF]">
      <section className="bg-[#1B2A4A] text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">
            About <span className="text-[#2D6BE4]">NexiStudy</span>
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            We&apos;re a team of educators and engineers on a mission to make
            high-quality study tools accessible to every student.
          </p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-[#1B2A4A]/10">
            <h2 className="text-2xl font-bold text-[#1B2A4A] mb-4">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed">
              NexiStudy was built on the belief that every student deserves access to smart, personalised study
              support — not just those who can afford private tutors. We combine cutting-edge AI with
              evidence-based learning science to give you an unfair academic advantage.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-sm border border-[#1B2A4A]/10">
            <h2 className="text-2xl font-bold text-[#1B2A4A] mb-6">Our Values</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                { title: "Accessibility", desc: "Learning tools should be available to everyone, everywhere.", icon: "🌍" },
                { title: "Evidence-Based", desc: "Every feature is grounded in learning science and real research.", icon: "🔬" },
                { title: "Student-First", desc: "We design for students, not metrics. Your success is our metric.", icon: "🎓" },
              ].map((v) => (
                <div key={v.title} className="text-center">
                  <div className="text-3xl mb-2">{v.icon}</div>
                  <h3 className="font-semibold text-[#1B2A4A] mb-1">{v.title}</h3>
                  <p className="text-sm text-gray-600">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

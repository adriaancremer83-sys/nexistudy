export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#F0F4FF]">
      <section className="bg-[#1B2A4A] text-white py-20 px-4 text-center">
        <h1 className="text-4xl font-bold mb-4">
          Get in <span className="text-[#2D6BE4]">Touch</span>
        </h1>
        <p className="text-gray-300 max-w-xl mx-auto">
          Have a question or need support? We&apos;d love to hear from you.
        </p>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-sm border border-[#1B2A4A]/10 p-8">
            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#1B2A4A] mb-1">First Name</label>
                  <input
                    type="text"
                    placeholder="Jane"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2D6BE4] text-[#1B2A4A]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1B2A4A] mb-1">Last Name</label>
                  <input
                    type="text"
                    placeholder="Smith"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2D6BE4] text-[#1B2A4A]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1B2A4A] mb-1">Email</label>
                <input
                  type="email"
                  placeholder="jane@example.com"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2D6BE4] text-[#1B2A4A]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1B2A4A] mb-1">Subject</label>
                <input
                  type="text"
                  placeholder="How can we help?"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2D6BE4] text-[#1B2A4A]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1B2A4A] mb-1">Message</label>
                <textarea
                  rows={5}
                  placeholder="Tell us more..."
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2D6BE4] text-[#1B2A4A] resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-[#2D6BE4] hover:bg-[#2558C5] text-white font-semibold rounded-lg transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            {[
              { label: "Email", value: "hello@nexistudy.com", icon: "✉️" },
              { label: "Support Hours", value: "Mon–Fri, 8am–6pm", icon: "🕐" },
              { label: "Response Time", value: "Within 24 hours", icon: "⚡" },
            ].map((item) => (
              <div key={item.label} className="bg-white rounded-xl p-4 shadow-sm border border-[#1B2A4A]/10">
                <div className="text-2xl mb-1">{item.icon}</div>
                <p className="text-xs text-gray-500 mb-0.5">{item.label}</p>
                <p className="text-sm font-medium text-[#1B2A4A]">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

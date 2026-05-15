import Link from "next/link";

const plans = [
  {
    name: "Free",
    price: "R0",
    period: "/month",
    desc: "Perfect for trying NexiStudy.",
    features: ["20 flashcards", "5 Nexi Tutor chats/day", "Basic analytics", "Community support"],
    cta: "Get Started",
    href: "/signup",
    highlight: false,
  },
  {
    name: "Student",
    price: "R99",
    period: "/month",
    desc: "Everything you need to study seriously.",
    features: ["Unlimited flashcards", "Unlimited Nexi Tutor", "Full analytics", "Study Pro tools", "Priority support"],
    cta: "Start Free Trial",
    href: "/signup",
    highlight: true,
  },
  {
    name: "Pro",
    price: "R199",
    period: "/month",
    desc: "For power users and group study.",
    features: ["Everything in Student", "Group study rooms", "Custom AI personas", "Offline mode", "Dedicated support"],
    cta: "Go Pro",
    href: "/signup",
    highlight: false,
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#F0F4FF]">
      <section className="bg-[#1B2A4A] text-white py-20 px-4 text-center">
        <h1 className="text-4xl font-bold mb-4">Simple, Honest <span className="text-[#2D6BE4]">Pricing</span></h1>
        <p className="text-gray-300 max-w-xl mx-auto">Start free. Upgrade when you need more. Cancel any time.</p>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-2xl p-8 flex flex-col ${
                plan.highlight
                  ? "bg-[#1B2A4A] text-white shadow-xl ring-2 ring-[#2D6BE4]"
                  : "bg-white text-[#1B2A4A] shadow-sm border border-[#1B2A4A]/10"
              }`}
            >
              {plan.highlight && (
                <span className="text-xs font-bold uppercase tracking-widest text-[#2D6BE4] mb-2">Most Popular</span>
              )}
              <h2 className="text-2xl font-bold mb-1">{plan.name}</h2>
              <div className="flex items-end gap-1 mb-2">
                <span className="text-4xl font-extrabold">{plan.price}</span>
                <span className={`text-sm mb-1 ${plan.highlight ? "text-gray-400" : "text-gray-500"}`}>{plan.period}</span>
              </div>
              <p className={`text-sm mb-6 ${plan.highlight ? "text-gray-400" : "text-gray-500"}`}>{plan.desc}</p>
              <ul className="space-y-2 mb-8 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm">
                    <span className="text-[#2D6BE4]">✓</span> {f}
                  </li>
                ))}
              </ul>
              <Link
                href={plan.href}
                className={`text-center py-3 rounded-lg font-semibold transition-colors ${
                  plan.highlight
                    ? "bg-[#2D6BE4] hover:bg-[#2558C5] text-white"
                    : "border-2 border-[#2D6BE4] text-[#2D6BE4] hover:bg-[#2D6BE4] hover:text-white"
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

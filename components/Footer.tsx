import Link from "next/link";

const EXPLORE_LINKS = [
  { label: "Nexi Tutor", href: "/nexi-tutor" },
  { label: "Study Pro", href: "/studypro" },
  { label: "Mark Answer", href: "/mark" },
  { label: "Past Papers", href: "/past-papers" },
  { label: "Pricing", href: "/pricing" },
  { label: "About Us", href: "/about-us" },
];

const ACCOUNT_LINKS = [
  { label: "Create free account", href: "/signup" },
  { label: "Sign in", href: "/login" },
  { label: "For Teachers", href: "/teachers" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="page-hero border-t border-white/[0.06]">
      <div className="max-w-6xl mx-auto px-4 py-14 grid gap-10 sm:grid-cols-2 md:grid-cols-3">

        {/* Brand */}
        <div>
          <p className="text-xl font-extrabold text-white mb-3">
            Nexi<span className="text-[#00D4FF]">Study</span>
          </p>
          <p className="text-sm text-white/50 leading-relaxed max-w-xs">
            The study buddy built for South African learners — CAPS now (IEB &
            Cambridge coming soon), Grade 8 to matric, in 11 official languages
            (full set on Premium).
          </p>
          <p className="text-xs text-white/35 mt-4">Proudly South African</p>
        </div>

        {/* Explore */}
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-white/40 mb-4">
            Explore
          </p>
          <ul className="space-y-2.5">
            {EXPLORE_LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Account */}
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-white/40 mb-4">
            Get started
          </p>
          <ul className="space-y-2.5">
            {ACCOUNT_LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

      </div>

      <div className="border-t border-white/[0.06] py-5 px-4 text-center text-xs text-white/35">
        © 2026 NexiStudy ·{" "}
        <Link href="/privacy" className="hover:text-white transition-colors underline-offset-2 hover:underline">
          Privacy &amp; POPIA
        </Link>{" "}
        · Made for SA learners
      </div>
    </footer>
  );
}

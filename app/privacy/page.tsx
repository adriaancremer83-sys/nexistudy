import Link from "next/link";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Privacy Policy",
  description:
    "How NexiStudy collects, uses and protects your personal information, and your rights under South Africa's POPIA.",
  path: "/privacy",
});

const EFFECTIVE_DATE = "18 June 2026";
const SUPPORT_EMAIL = "nexi@forgesystems.co.za";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-9">
      <h2 className="text-xl font-bold text-white mb-3">{title}</h2>
      <div className="space-y-3 text-white/65 text-[0.95rem] leading-relaxed">{children}</div>
    </section>
  );
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen">
      {/* ── HERO ── */}
      <section className="page-hero py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <p className="text-sm font-bold uppercase tracking-widest text-[#00D4FF] mb-3">
            Privacy &amp; POPIA
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-3">Privacy Policy</h1>
          <p className="text-white/50 text-sm">Last updated: {EFFECTIVE_DATE}</p>
        </div>
      </section>

      <div className="section-divider" />

      <div className="max-w-3xl mx-auto px-4 py-12">
        <p className="text-white/65 text-[0.95rem] leading-relaxed mb-10">
          NexiStudy (&ldquo;we&rdquo;, &ldquo;us&rdquo;) is a study platform for South African
          learners, operated by Forge Systems. This policy explains what personal information we
          collect, how we use and protect it, and the rights you have under the{" "}
          <span className="text-white">Protection of Personal Information Act (POPIA)</span>. We
          only collect what we need to run NexiStudy, and we never sell your information.
        </p>

        <Section title="1. Information we collect">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <span className="text-white font-medium">Account details</span> — your name, email
              address and a securely hashed password (we never store your actual password). If you
              sign in with Google, we receive your name and email from Google.
            </li>
            <li>
              <span className="text-white font-medium">Learning profile</span> — your grade,
              school (optional), subjects, preferred language, and the marks/APS you choose to enter.
            </li>
            <li>
              <span className="text-white font-medium">Learning activity</span> — practice quiz
              results and the topic mastery we calculate from them, and (for teachers) class
              membership.
            </li>
            <li>
              <span className="text-white font-medium">Tutor conversations</span> — the questions
              and any images you send to Nexi, our AI tutor, so it can respond.
            </li>
            <li>
              <span className="text-white font-medium">Reviews</span> — if you submit one, your
              chosen display name, grade, rating and comment.
            </li>
            <li>
              <span className="text-white font-medium">Payment information</span> — if you subscribe,
              payments are handled by PayFast. We do not see or store your card details; we keep only
              a subscription reference and status.
            </li>
            <li>
              <span className="text-white font-medium">Usage analytics</span> — anonymous page-view
              counts with a random visitor identifier. This holds no name, email or IP address.
            </li>
          </ul>
        </Section>

        <Section title="2. How and why we use it">
          <p>We process your information to:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>create and secure your account and log you in;</li>
            <li>provide the tutor, practice, APS calculator, past papers and teacher tools;</li>
            <li>personalise your experience (e.g. your weak-spots map);</li>
            <li>process subscriptions and keep your plan up to date;</li>
            <li>understand overall usage so we can improve NexiStudy;</li>
            <li>respond to bug reports and messages you send us.</li>
          </ul>
          <p>
            Under POPIA we rely on your consent (given when you create an account and use the
            service), the performance of our agreement with you, and our legitimate interest in
            running and improving a safe, working product.
          </p>
        </Section>

        <Section title="3. Who we share it with">
          <p>
            We don&apos;t sell your information. We share it only with the service providers that make
            NexiStudy work, and only as far as needed:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li><span className="text-white font-medium">Supabase</span> — secure database hosting.</li>
            <li><span className="text-white font-medium">Vercel</span> — website hosting and delivery.</li>
            <li><span className="text-white font-medium">PayFast</span> — payment processing for subscriptions.</li>
            <li>
              <span className="text-white font-medium">Anthropic</span> — powers the Nexi AI tutor;
              the messages you send to Nexi are processed by their API to generate a reply.
            </li>
            <li>
              <span className="text-white font-medium">Google</span> — only if you choose &ldquo;Sign
              in with Google&rdquo; or a teacher shares a class link to Google Classroom.
            </li>
          </ul>
          <p>
            Some of these providers process data on servers outside South Africa. Where that happens,
            we rely on providers that offer protection comparable to POPIA. We may also disclose
            information if required by law.
          </p>
        </Section>

        <Section title="4. A note on the AI tutor">
          <p>
            What you type or upload to Nexi is sent to our AI provider to generate an answer. Please
            don&apos;t share sensitive personal information (such as ID numbers, financial details or
            anyone&apos;s health information) in tutor conversations — keep it to your studies.
          </p>
        </Section>

        <Section title="5. How we protect your information">
          <p>
            Passwords are hashed, our database is locked down and reachable only through our secure
            server, traffic is encrypted over HTTPS, and access to systems is limited. No online
            service can promise to be completely unbreakable, but we take reasonable, up-to-date
            steps to keep your information safe and to act quickly if anything goes wrong.
          </p>
        </Section>

        <Section title="6. How long we keep it">
          <p>
            We keep your account information for as long as your account is active. If you ask us to
            delete your account, we remove your personal information except where we&apos;re legally
            required to keep certain records (for example, payment records for tax purposes).
          </p>
        </Section>

        <Section title="7. Learners under 18">
          <p>
            NexiStudy is used by school learners, many of whom are under 18. If you are under 18,
            please use NexiStudy with the knowledge and consent of a parent or guardian. A parent or
            guardian may contact us at any time to access, correct or delete their child&apos;s
            information.
          </p>
        </Section>

        <Section title="8. Your rights under POPIA">
          <p>You have the right to:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>ask what personal information we hold about you;</li>
            <li>ask us to correct or update it;</li>
            <li>ask us to delete your account and information;</li>
            <li>object to certain processing or withdraw your consent;</li>
            <li>
              lodge a complaint with the Information Regulator of South Africa
              (<a href="https://inforegulator.org.za" target="_blank" rel="noopener noreferrer" className="text-[#00D4FF] hover:text-white transition-colors">inforegulator.org.za</a>).
            </li>
          </ul>
          <p>
            To exercise any of these, email us at{" "}
            <a href={`mailto:${SUPPORT_EMAIL}`} className="text-[#00D4FF] hover:text-white transition-colors">{SUPPORT_EMAIL}</a>.
          </p>
        </Section>

        <Section title="9. Cookies & local storage">
          <p>
            We use a small number of essential cookies to keep you signed in, and your browser&apos;s
            local storage to hold an anonymous identifier for page-view counting. We don&apos;t use
            third-party advertising or tracking cookies.
          </p>
        </Section>

        <Section title="10. Changes to this policy">
          <p>
            We may update this policy as NexiStudy grows. When we make a meaningful change, we&apos;ll
            update the date at the top of this page.
          </p>
        </Section>

        <Section title="11. Contact us">
          <p>
            Questions about your privacy, or want to exercise a right above? Email{" "}
            <a href={`mailto:${SUPPORT_EMAIL}`} className="text-[#00D4FF] hover:text-white transition-colors">{SUPPORT_EMAIL}</a>{" "}
            or use our <Link href="/contact" className="text-[#00D4FF] hover:text-white transition-colors">contact page</Link>.
          </p>
        </Section>

        <p className="text-white/35 text-xs leading-relaxed border-t border-white/10 pt-6">
          This policy describes our current practices in good faith. It is provided for transparency
          and is not legal advice.
        </p>
      </div>
    </div>
  );
}

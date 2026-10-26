import PackLanding from "@/components/PackLanding";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Matric Prelim Survival Pack — 2027 waitlist",
  description:
    "Seven weeks, ten subjects, one plan. The printable prelim prep pack for matric learners and their parents, in English and Afrikaans, returns for 2027. Join the waitlist.",
  path: "/pack",
});

export default async function PackPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  return <PackLanding cancelled={params.cancelled === "1"} />;
}

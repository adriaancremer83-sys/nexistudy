import PackLanding from "@/components/PackLanding";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Matric Prelim Survival Pack — R199",
  description:
    "Seven weeks, ten subjects, one plan. A printable prelim prep pack for matric learners and their parents — in English and Afrikaans. R199 once-off.",
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

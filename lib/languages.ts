// Languages where the free-tier model (Haiku) produces reliably correct output.
// Premium (Sonnet) handles all 11 official languages well, so it's ungated.
export const FREE_LANGUAGES = ["English", "Afrikaans", "isiZulu"] as const;

export function languageAllowed(
  plan: "free" | "premium" | undefined,
  language: string
): boolean {
  return plan === "premium" || (FREE_LANGUAGES as readonly string[]).includes(language);
}

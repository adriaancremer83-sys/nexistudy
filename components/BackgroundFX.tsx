// Fixed-position static gradient orbs that sit behind every page.
// Pure CSS — no blur filters, no animation, no client JS.
export default function BackgroundFX() {
  return (
    <div aria-hidden className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div className="orb orb-1 w-[480px] h-[480px] -top-40 -left-40" />
      <div className="orb orb-2 w-[560px] h-[560px] top-1/3 -right-48" />
      <div className="orb orb-3 w-[420px] h-[420px] -bottom-32 left-1/4" />
    </div>
  );
}

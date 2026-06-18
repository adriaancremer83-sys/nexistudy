import { supabaseAdmin } from "./supabase";

export async function recordPageView(path: string, visitor: string): Promise<void> {
  const { error } = await supabaseAdmin.from("page_views").insert({
    path: path.slice(0, 300),
    visitor: (visitor || "").slice(0, 64),
  });
  if (error) console.error("recordPageView failed:", error.message);
}

export interface ViewStats {
  today: number;
  week: number;
  total: number;
  uniqueWeek: number;
  topPages: { path: string; views: number }[];
}

const EMPTY: ViewStats = { today: 0, week: 0, total: 0, uniqueWeek: 0, topPages: [] };

export async function getViewStats(): Promise<ViewStats> {
  const startOfDay = new Date();
  startOfDay.setUTCHours(0, 0, 0, 0);
  const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

  const [totalRes, todayRes, weekRes] = await Promise.all([
    supabaseAdmin.from("page_views").select("id", { count: "exact", head: true }),
    supabaseAdmin
      .from("page_views")
      .select("id", { count: "exact", head: true })
      .gte("created_at", startOfDay.toISOString()),
    supabaseAdmin
      .from("page_views")
      .select("path,visitor")
      .gte("created_at", weekAgo.toISOString()),
  ]);

  // If the table doesn't exist yet, degrade gracefully to zeros.
  if (totalRes.error || todayRes.error || weekRes.error) {
    return EMPTY;
  }

  const rows = weekRes.data ?? [];
  const uniqueWeek = new Set(rows.map((r) => r.visitor as string).filter(Boolean)).size;

  const counts = new Map<string, number>();
  for (const r of rows) {
    const p = r.path as string;
    counts.set(p, (counts.get(p) ?? 0) + 1);
  }
  const topPages = [...counts.entries()]
    .map(([path, views]) => ({ path, views }))
    .sort((a, b) => b.views - a.views)
    .slice(0, 6);

  return {
    today: todayRes.count ?? 0,
    week: rows.length,
    total: totalRes.count ?? 0,
    uniqueWeek,
    topPages,
  };
}

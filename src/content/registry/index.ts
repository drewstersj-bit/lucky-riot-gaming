/**
 * LUCKY RIOT GAMES — registry access layer.
 *
 * The single authoritative entry point. The website catalogue, roadmap and
 * detail pages all read from here. Add a new year by creating a `games/<year>.ts`
 * module and spreading it into `allGames` below — nothing else needs editing,
 * and the roadmap pages discover the year automatically.
 */

import type { GameRecord, RoadmapQuarter } from "./schema";
import { games2027 } from "./games/2027";
import { gamesExisting } from "./games/existing";

export type { GameRecord, GameType, RoadmapQuarter } from "./schema";
export { validateRegistry } from "./schema";
export type { RegistryIssue, DevelopmentStatus, PublicVisibility, GameFeature } from "./schema";

/**
 * The complete registry. To add 2028, create `games/2028.ts` exporting
 * `games2028: GameRecord[]` and add `...games2028` here.
 */
export const allGames: GameRecord[] = [
  ...games2027,
  ...gamesExisting,
];

// ─── Lookups ──────────────────────────────────────────────────────────────

export function getById(id: string): GameRecord | undefined {
  return allGames.find((g) => g.id === id);
}

/** Resolve by current slug OR any previous slug/legacy id (for redirects). */
export function getBySlug(slug: string): GameRecord | undefined {
  return (
    allGames.find((g) => g.slug === slug) ??
    allGames.find((g) => g.legacyIds?.includes(slug))
  );
}

/** Games the website is allowed to render at all. */
export function websiteGames(): GameRecord[] {
  return allGames.filter((g) => g.websiteEnabled);
}

/** Games visible in the public catalogue (coming-soon or published). */
export function catalogueGames(): GameRecord[] {
  return websiteGames().filter(
    (g) => g.publicVisibility === "coming-soon" || g.publicVisibility === "published",
  );
}

/** Games that have a bespoke/generated public detail page. */
export function publishedGames(): GameRecord[] {
  return websiteGames().filter((g) => g.publicVisibility === "published");
}

// ─── Roadmap ────────────────────────────────────────────────────────────────

/** Years that have at least one public roadmap entry, ascending. */
export function roadmapYears(): number[] {
  const years = new Set<number>();
  for (const g of websiteGames()) {
    if (g.roadmapYear > 0 && g.publicVisibility !== "hidden") years.add(g.roadmapYear);
  }
  return [...years].sort((a, b) => a - b);
}

export interface RoadmapQuarterGroup {
  quarter: RoadmapQuarter;
  games: GameRecord[];
}

/** Public roadmap entries for a year, grouped by quarter and ordered by month. */
export function roadmapForYear(year: number): RoadmapQuarterGroup[] {
  const entries = websiteGames()
    .filter((g) => g.roadmapYear === year && g.publicVisibility !== "hidden")
    .sort((a, b) => a.targetReleaseMonth - b.targetReleaseMonth);

  const groups: RoadmapQuarterGroup[] = [];
  for (const q of [1, 2, 3, 4] as RoadmapQuarter[]) {
    const games = entries.filter((g) => g.roadmapQuarter === q);
    if (games.length) groups.push({ quarter: q, games });
  }
  return groups;
}

// ─── Filters ──────────────────────────────────────────────────────────────

export type CatalogueFilter = "all" | "slots" | "video-poker" | "released" | "coming-soon";

export function matchesFilter(g: GameRecord, filter: CatalogueFilter): boolean {
  switch (filter) {
    case "all": return true;
    case "slots": return g.gameType === "slot";
    case "video-poker": return g.gameType === "video-poker";
    case "released": return g.developmentStatus === "released";
    case "coming-soon": return g.publicVisibility === "coming-soon" || (g.publicVisibility === "published" && g.developmentStatus !== "released");
    default: return true;
  }
}

/** Franchise siblings (same franchise), excluding the game itself. */
export function franchiseSiblings(id: string): GameRecord[] {
  const g = getById(id);
  if (!g) return [];
  const root = g.franchiseOf ?? g.id;
  return allGames.filter((x) => x.id !== id && (x.id === root || x.franchiseOf === root));
}

/** Convenience: display label for the provisional release period. */
export function releasePeriodLabel(g: GameRecord): string {
  if (g.roadmapYear <= 0) return "Available";
  const month = ["January","February","March","April","May","June","July","August","September","October","November","December"][g.targetReleaseMonth - 1] ?? "";
  return `${month} ${g.roadmapYear}`;
}

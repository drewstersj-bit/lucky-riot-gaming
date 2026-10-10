/**
 * LUCKY RIOT GAMES — authoritative game registry schema.
 *
 * This is the SINGLE source of truth for game identity, roadmap placement and
 * public presentation. The website catalogue, roadmap and detail pages all
 * consume this registry; no page hardcodes a game list.
 *
 * ─── Identity model (the central rule) ──────────────────────────────────────
 * TECHNICAL identifiers are IMMUTABLE and must never change once a game exists,
 * because they are wired into maths packages, Python modules, Stake publish
 * files, replay data, tests and builds:
 *   - `id`         the permanent engine/project identifier (e.g. "mega-bars")
 *   - `projectPath` the engine repo directory for an existing game
 *   - `legacyIds`  historical ids this game has also been known by
 *
 * MARKETING / PUBLIC identity CAN change over a game's life:
 *   - `title`      the current public display name (e.g. "Glitch City")
 *   - `slug`       the current public URL segment (e.g. "glitch-city")
 *   - `previousNames` prior public titles (for history / redirects)
 *
 * The `slug` differs from the `id` on purpose — a game can be rebranded without
 * touching a single technical identifier. Legacy slugs are handled by redirects
 * at the hosting layer, not by changing `id`.
 */

/** Permanent game category. */
export type GameType = "slot" | "video-poker";

/**
 * Development maturity — tracks ACTUAL engineering progress. This is deliberately
 * independent of `publicVisibility`: a game can be fully playable internally
 * while still scheduled for a later public release.
 */
export type DevelopmentStatus =
  | "concept"
  | "pre-production"
  | "production"
  | "qa"
  | "certification"
  | "ready"
  | "released"
  | "on-hold";

/** What the public website is allowed to show for this game. */
export type PublicVisibility =
  | "hidden" // not shown anywhere public
  | "roadmap" // appears only on the roadmap
  | "coming-soon" // roadmap + catalogue, no play action
  | "published"; // catalogue + detail, play action if playable

export type RoadmapQuarter = 1 | 2 | 3 | 4;

/** A verified key feature shown on the detail page. */
export interface GameFeature {
  title: string;
  description: string;
}

/**
 * Game registry record.
 *
 * Fields that are not yet confirmed MUST be left `undefined`/`null` rather than
 * invented. In particular, do NOT populate maths fields (targetRtp, volatility,
 * maxWin) with speculative values — they stay undefined until the maths is
 * finalised and approved for public display.
 */
export interface GameRecord {
  // ─── Immutable technical identity ─────────────────────────────────────────
  /** Permanent engine/project id. NEVER changes. */
  id: string;
  /** Prior technical ids, if this game was ever re-identified. */
  legacyIds?: string[];
  /** Engine repo directory for an existing game (relative to repo root). */
  projectPath?: string;

  // ─── Mutable public identity ──────────────────────────────────────────────
  /** Current public URL segment. May change on rebrand (old ones redirect). */
  slug: string;
  /** Current public display title. */
  title: string;
  /** Optional tagline/subtitle. */
  subtitle?: string;
  /** Prior public titles (history + marketing). */
  previousNames?: string[];

  // ─── Classification + copy ────────────────────────────────────────────────
  gameType: GameType;
  /** Short theme identifier, e.g. "Cyberpunk / Underground Arcade". */
  theme: string;
  /** 1–2 sentence marketing description. */
  description: string;
  /** One-line description for cards. */
  shortDescription: string;

  // ─── Roadmap placement ────────────────────────────────────────────────────
  roadmapYear: number;
  roadmapQuarter: RoadmapQuarter;
  /** 1–12. Provisional target month, not a confirmed release date. */
  targetReleaseMonth: number;

  // ─── Lifecycle (independent axes) ─────────────────────────────────────────
  developmentStatus: DevelopmentStatus;
  publicVisibility: PublicVisibility;

  // ─── Existing-project linkage ─────────────────────────────────────────────
  /** True when a real engine/maths project backs this record. */
  existingProject: boolean;

  // ─── Verified presentation detail (optional) ──────────────────────────────
  /** Verified key mechanics (for detail page). Omit if unverified. */
  mechanics?: GameFeature[];
  /** Short tags shown on the card / detail page. */
  featureTags?: string[];

  // ─── Maths — PUBLIC ONLY WHEN FINALISED. Leave undefined otherwise. ────────
  volatility?: string;
  /** Fractional RTP, e.g. 0.9308. Undefined until finalised + approved. */
  targetRtp?: number;
  /** Max win multiplier. Undefined until finalised + approved. */
  maxWin?: number;

  // ─── Assets (optional; branded placeholder used when absent) ──────────────
  thumbnail?: string;
  heroImage?: string;
  logo?: string;

  // ─── Franchise relationships ──────────────────────────────────────────────
  /** `id` of a related game (sequel/prequel/same franchise). */
  franchiseOf?: string;

  // ─── Website behaviour ────────────────────────────────────────────────────
  /** Whether the website renders this game at all. */
  websiteEnabled: boolean;
  /** Whether a playable demo exists and a Play action should show. */
  playable: boolean;
}

/** A validation problem found by `validateRegistry`. */
export interface RegistryIssue {
  level: "error" | "warning";
  gameId?: string;
  field?: string;
  message: string;
}

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/**
 * Runtime validation of the registry. Catches the failure modes called out in
 * the roadmap brief: duplicate ids/slugs, bad months, bad categories, missing
 * project paths for existing games, orphaned franchise refs, and inconsistent
 * visibility/playable combinations.
 */
export function validateRegistry(games: GameRecord[]): RegistryIssue[] {
  const issues: RegistryIssue[] = [];
  const seenIds = new Map<string, number>();
  const seenSlugs = new Map<string, number>();
  const ids = new Set(games.map((g) => g.id));

  for (const g of games) {
    // Unique id
    seenIds.set(g.id, (seenIds.get(g.id) ?? 0) + 1);
    // Unique slug
    seenSlugs.set(g.slug, (seenSlugs.get(g.slug) ?? 0) + 1);

    if (!SLUG_RE.test(g.slug)) {
      issues.push({ level: "error", gameId: g.id, field: "slug", message: `invalid slug "${g.slug}" (use kebab-case)` });
    }
    if (!Number.isInteger(g.targetReleaseMonth) || g.targetReleaseMonth < 1 || g.targetReleaseMonth > 12) {
      issues.push({ level: "error", gameId: g.id, field: "targetReleaseMonth", message: `month out of range: ${g.targetReleaseMonth}` });
    }
    if (![1, 2, 3, 4].includes(g.roadmapQuarter)) {
      issues.push({ level: "error", gameId: g.id, field: "roadmapQuarter", message: `invalid quarter: ${g.roadmapQuarter}` });
    }
    if (g.gameType !== "slot" && g.gameType !== "video-poker") {
      issues.push({ level: "error", gameId: g.id, field: "gameType", message: `invalid gameType: ${g.gameType}` });
    }
    if (g.existingProject && !g.projectPath) {
      issues.push({ level: "error", gameId: g.id, field: "projectPath", message: "existing project has no projectPath" });
    }
    if (!g.existingProject && g.playable) {
      issues.push({ level: "error", gameId: g.id, field: "playable", message: "non-existing project cannot be playable" });
    }
    if (g.playable && g.publicVisibility !== "published") {
      issues.push({ level: "warning", gameId: g.id, field: "publicVisibility", message: "playable game is not published" });
    }
    if (g.franchiseOf && !ids.has(g.franchiseOf)) {
      issues.push({ level: "error", gameId: g.id, field: "franchiseOf", message: `franchiseOf references unknown id "${g.franchiseOf}"` });
    }
    // Honesty guard: a non-released game must not expose public maths figures.
    if (g.developmentStatus !== "released" && g.publicVisibility === "published") {
      if (g.targetRtp !== undefined || g.maxWin !== undefined || g.volatility !== undefined) {
        issues.push({ level: "warning", gameId: g.id, message: "maths figures set on a non-released public game — confirm these are approved for display" });
      }
    }
  }

  for (const [id, n] of seenIds) if (n > 1) issues.push({ level: "error", gameId: id, field: "id", message: `duplicate id (${n}×)` });
  for (const [slug, n] of seenSlugs) if (n > 1) issues.push({ level: "error", field: "slug", message: `duplicate slug "${slug}" (${n}×)` });

  return issues;
}

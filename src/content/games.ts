/**
 * Central games catalogue.
 *
 * Add a new title by appending a `Game` object to the `games` array below.
 * Optional fields (logo, artwork, trailerUrl, demoUrl, release, screenshots…)
 * are only rendered in the UI when present, so partial entries are safe.
 */

export type GameCategory = "Online Slot" | "Video Poker";

export type GameStatus = "In Development" | "Coming Soon" | "Released" | "Concept";

/**
 * Game maturity / lifecycle state. This is the single source of truth used
 * consistently across the games catalogue, product pages and customer area.
 *
 * Ordered from earliest to latest lifecycle stage:
 *   CONCEPT              — idea only, NOT playable, no build exists
 *   IN DEVELOPMENT       — being built, not yet playable
 *   PLAYABLE DEVELOPMENT — a playable internal build exists (e.g. Cluckus now)
 *   PLAYTEST             — a protected playtest build is available
 *   CANDIDATE            — a clean release-candidate build is available
 *   COMING SOON          — finished, awaiting public availability
 *   LIVE                 — released and publicly available
 */
export type GameMaturity =
  | "CONCEPT"
  | "IN DEVELOPMENT"
  | "PLAYABLE DEVELOPMENT"
  | "PLAYTEST"
  | "CANDIDATE"
  | "COMING SOON"
  | "LIVE";

/** Presentation metadata for each maturity state (label + accent + playable flag). */
export const maturityMeta: Record<
  GameMaturity,
  { label: string; playable: boolean; tone: "concept" | "dev" | "candidate" | "live" }
> = {
  CONCEPT: { label: "Concept", playable: false, tone: "concept" },
  "IN DEVELOPMENT": { label: "In Development", playable: false, tone: "dev" },
  "PLAYABLE DEVELOPMENT": { label: "Playable Development", playable: true, tone: "dev" },
  PLAYTEST: { label: "Playtest", playable: true, tone: "dev" },
  CANDIDATE: { label: "Candidate", playable: true, tone: "candidate" },
  "COMING SOON": { label: "Coming Soon", playable: false, tone: "candidate" },
  LIVE: { label: "Live", playable: true, tone: "live" },
};

/**
 * Website build profiles. Each maps to a route target and defines what the
 * embedded game is allowed to contain. The website only ever *hosts* the
 * artefact produced by the game-engine repository for the matching profile.
 */
export type GameBuildProfile = "PLAYTEST" | "CUSTOMER" | "PUBLIC";

export interface BuildProfilePolicy {
  profile: GameBuildProfile;
  /** Route pattern relative to site root (<game-id> is substituted). */
  routePattern: string;
  indexable: boolean;
  /** Human-readable description of what the artefact MAY contain. */
  mayContain: string[];
  /** What the artefact MUST NOT contain. */
  mustNotContain: string[];
}

export const buildProfiles: Record<GameBuildProfile, BuildProfilePolicy> = {
  PLAYTEST: {
    profile: "PLAYTEST",
    routePattern: "/games/<game-id>/dev/",
    indexable: false,
    mayContain: [
      "playable game",
      "Lucky Riot Developer Console",
      "scenario library",
      "replay tools",
      "playtest tools",
      "build information",
    ],
    mustNotContain: ["public exposure without access control"],
  },
  CUSTOMER: {
    profile: "CUSTOMER",
    routePattern: "/customer/games/<game-id>/play/",
    indexable: false,
    mayContain: ["clean playable candidate", "candidate build/version information"],
    mustNotContain: [
      "Developer Console",
      "internal maths inspector",
      "scenario tools",
      "internal notes",
    ],
  },
  PUBLIC: {
    profile: "PUBLIC",
    routePattern: "/games/<game-id>/play/",
    indexable: true, // SEO behaviour decided at release stage
    mayContain: ["clean public demo"],
    mustNotContain: [
      "devtools",
      "internal maths information",
      "internal fixtures",
      "debug controls",
    ],
  },
};

/**
 * Generic game deployment contract.
 *
 * This is the ONLY thing the website needs to know about a game build. The
 * Lucky Riot game-engine repository is authoritative for runtime, maths,
 * replay, events, assets and the build itself; it should emit a manifest that
 * satisfies this shape. The website never contains game implementation detail.
 *
 * See `src/content/game-deployments.ts` for the (currently placeholder)
 * registry and `docs`/checkpoint for the exact engine-side requirement.
 */
export interface GameDeploymentManifest {
  /** Canonical game id, e.g. "cluckus-maximus". */
  gameId: string;
  displayName: string;
  /** Semantic-ish version string emitted by the engine build. */
  version: string;
  buildType: GameBuildProfile;
  /**
   * Entry point the website embeds (e.g. an index.html path under a base path
   * the game artefact is deployed to). Empty when no build is wired yet.
   */
  entryPoint: string;
  /** Base path where the artefact's assets live. */
  assetsBasePath: string;
  /** Opaque build metadata (commit, built-at, channel…). Not rendered raw publicly. */
  buildMetadata?: Record<string, string>;
  /** False until a real artefact is wired; UI shows a placeholder when false. */
  available: boolean;
}

/** High-level filter buckets used on the /games page. */
export type GameFilter =
  | "All"
  | "Slots"
  | "Video Poker"
  | "In Development"
  | "Released";

export interface GameScreenshot {
  src: string;
  alt: string;
}

export interface GameRelease {
  /** Freeform, human-readable status text, e.g. "In development". Avoid inventing dates. */
  label?: string;
  /** ISO date string, only when a real, confirmed date exists. */
  date?: string;
}

/** Category accent identity, consistent site-wide (gold/pink/cyan). */
export type CategoryAccentKey = "gold" | "pink" | "cyan";

export function accentForCategory(category: GameCategory): CategoryAccentKey {
  switch (category) {
    case "Online Slot":
      return "gold";
    case "Video Poker":
      return "pink";
    default:
      return "gold";
  }
}

/**
 * Commercial "Game Passport" — clean, verified specification data shown
 * separately from the expressive game presentation.
 *
 * Every field is optional. Only supplied values are rendered; missing fields
 * are hidden rather than invented. Do NOT populate RTP, max win, certification
 * or market availability with speculative values.
 */
export interface GamePassport {
  gameType?: string;
  gridFormat?: string;
  orientation?: string;
  volatility?: string;
  rtpConfigurations?: string[];
  maxWin?: string;
  featureSummary?: string;
  languages?: string[];
  platforms?: string[];
  targetMarkets?: string[];
  certificationStatus?: string;
  releaseStatus?: string;
  demoAvailability?: string;
}

export interface Game {
  /**
   * URL-safe canonical game identifier. Used for the product page route
   * (/games/<slug>/) AND as the game id across dev/customer/deployment
   * (e.g. "cluckus-maximus").
   */
  slug: string;
  title: string;
  category: GameCategory;
  /**
   * Legacy short status (kept for the existing catalogue filters). Prefer
   * `maturity` for lifecycle logic.
   */
  status: GameStatus;
  /** Canonical lifecycle state — single source of truth site-wide. */
  maturity: GameMaturity;
  /** Short marketing description (1–2 sentences). */
  description: string;
  /** Optional longer summary shown on the detail page. */
  summary?: string;
  /** Path to a square/wordmark logo. */
  logo?: string;
  /** Landscape key art (16:9-ish). */
  artworkLandscape?: string;
  /** Portrait key art (mobile-first). */
  artworkPortrait?: string;
  /** Feature/mechanic tags. */
  featureTags?: string[];
  /** Detailed feature breakdown for the detail page. */
  featureBreakdown?: { title: string; description: string }[];
  screenshots?: GameScreenshot[];
  /** External trailer URL (e.g. YouTube). Button only shows when set. */
  trailerUrl?: string;
  /** Playable demo URL. Button only shows when set. */
  demoUrl?: string;
  /** Technical spec key/value pairs for the detail page. */
  technical?: { label: string; value: string }[];
  release?: GameRelease;
  /** Commercial specification panel. Only supplied fields are shown. */
  passport?: GamePassport;
  /** When true a dedicated /games/[slug] detail (product) page is generated. */
  hasDetailPage: boolean;
  /**
   * When true this game has a dedicated hand-built product page at
   * /games/<slug>/ (e.g. Cluckus) rather than the generic [slug] detail page.
   * Kept separate so the generic detail route can skip games with a bespoke page.
   */
  hasProductPage?: boolean;
  /** Optional development progress (0–100) shown on the product page. */
  devProgress?: number;
  /** Concept cards render with a distinct "teaser" treatment. */
  isConcept?: boolean;
}

// ─── Registry-derived catalogue ──────────────────────────────────────────────
// The authoritative source of game identity + roadmap data is the registry
// (src/content/registry). This `games` array is an ADAPTER that projects the
// registry's `GameRecord`s into the `Game` shape the existing pages/components
// consume, so there is a single source of truth and no duplicated game list.
//
// Rich marketing detail (summary, passport, orientation, verified RTP copy)
// that is not yet modelled in the registry schema lives in PRESENTATION, keyed
// by the immutable registry `id`. This keeps technical identity in the registry
// and expressive copy here, without a second list of games.

import {
  websiteGames as registryWebsiteGames,
  type GameRecord,
} from "./registry";

interface Presentation {
  summary?: string;
  passport?: GamePassport;
  featureBreakdown?: { title: string; description: string }[];
  devProgress?: number;
}

/** Expressive copy keyed by immutable registry id (NOT by public slug). */
const PRESENTATION: Record<string, Presentation> = {
  "cluckus-maximus": {
    devProgress: 65,
    summary:
      "Cluckus Maximus: Eggspander is a character-led slot built around persistent progression. As players advance, the grid physically grows and new modifiers come into play, building anticipation towards the headline Maximus Mode.",
    featureBreakdown: [
      { title: "Expanding Grid", description: "The playable area grows as players progress, opening up more ways to land wins and keeping momentum building." },
      { title: "Persistent Progression", description: "Advancement carries forward, giving each session a sense of building towards something larger." },
      { title: "Character Modifiers", description: "Distinct characters introduce their own modifiers, changing how features behave and rewarding experimentation." },
      { title: "Maximus Mode", description: "The headline feature that everything builds towards — the destination that gives the whole game its shape." },
    ],
    passport: {
      gameType: "Video slot",
      gridFormat: "Expanding grid (from 5×5 towards 7×7)",
      orientation: "Landscape and portrait",
      featureSummary: "Expanding grid, persistent progression, character modifiers and the headline Maximus Mode.",
      maxWin: "5,000× potential (design target, subject to change)",
      releaseStatus: "Playable development build",
      certificationStatus: "Not yet certified",
      demoAvailability: "In development",
    },
  },
  // Megabars engine → Glitch City (cyberpunk re-theme, same mechanics).
  "mega-bars": {
    devProgress: 40,
    summary:
      "Glitch City is a neon cyberpunk slot — 5 reels, 3 rows, 10 lines and a clean, high-clarity symbol set. Wins pay on 3 or more adjacent symbols from the left, with a scaling free-spins surge. Currently an early playable development build.",
    featureBreakdown: [
      { title: "10 Lines, Adjacent Pays", description: "Wins land on 3 or more adjacent symbols from the left across 10 lines, with the highest win paid on each line." },
      { title: "Clean Symbol Set", description: "A deliberately minimal set for clear, readable play on a neon grid." },
      { title: "Free Spins Surge", description: "Three or more adjacent trigger symbols launch a free-spins run that scales with the bet tier and can retrigger." },
    ],
    passport: {
      gameType: "Video slot",
      gridFormat: "5 reels × 3 rows, 10 lines",
      orientation: "Landscape and portrait",
      featureSummary: "A clean symbol set across 10 lines with a scaling free-spins surge.",
      releaseStatus: "Playable development build",
      certificationStatus: "Not yet certified",
      demoAvailability: "In development",
    },
  },
  // Bison Fury engine → Ragnarok Riot (Viking/metal re-theme, same mechanics).
  "bison-fury": {
    devProgress: 45,
    summary:
      "Ragnarok Riot is a 5×4, 1024-ways slot where Viking myth meets heavy metal — stacked beasts, wilds on the middle reels and a free-spins feature built around sticky wilds. Each wild that lands in free spins locks in place for a run of respins while the free-spin count holds. Currently an early playable development build.",
    featureBreakdown: [
      { title: "1024 Ways", description: "Wins pay for matching symbols on adjacent reels from the left across all 1024 ways — no fixed paylines." },
      { title: "Stampede Wilds", description: "Wilds land on the middle three reels and substitute for all regular symbols to complete more ways." },
      { title: "Sticky-Wild Free Spins", description: "Every wild that lands in free spins sticks for a run of respins; while sticky wilds are in play the free-spin counter holds and retriggers are possible." },
    ],
    passport: {
      gameType: "Video slot",
      gridFormat: "5 reels × 4 rows, 1024 ways",
      orientation: "Landscape",
      featureSummary: "1024 ways with middle-reel wilds and a sticky-wild free-spins feature (3/4/5 scatters award 8/20/50 free spins).",
      releaseStatus: "Playable development build",
      certificationStatus: "Not yet certified",
      demoAvailability: "In development",
    },
  },
  "video-poker-pro": {
    devProgress: 40,
    summary:
      "Video Poker Pro deals one hand, you hold, and your held cards play across 100 independent hands at once. Three selectable variants share one engine and differ only in paytable and wild rules. Each win can be gambled in a double-or-nothing feature. Currently an early playable development build.",
    featureBreakdown: [
      { title: "100 Hands at Once", description: "Deal and hold once; your held cards carry into 100 hands, each drawing its own fresh replacements for 100 independent results per round." },
      { title: "Three Variants, One Engine", description: "Tens or Better, Deuces Wild and Deuces and Joker share the same look and feel and differ only in their paytable and wild rules." },
      { title: "Double or Nothing", description: "After any win, gamble it in the double feature: pick a card higher than the dealer's to double, with collect and collect-half options and a per-level win cap." },
    ],
    passport: {
      gameType: "Video poker",
      gridFormat: "100 hands, 5-card draw",
      orientation: "Portrait and landscape",
      featureSummary: "Pro 100-hand draw poker across three variants (no-wild / deuces / deuces+joker) with a double-or-nothing gamble.",
      releaseStatus: "Playable development build",
      certificationStatus: "Not yet certified",
      demoAvailability: "In development",
    },
  },
  // Farmyard Frenzy engine → Trash Pandas (raccoon re-theme, same mechanics).
  "farmyard-frenzy": {
    devProgress: 35,
    summary:
      "Trash Pandas is a 5-reel, 3-row, 10-line slot where mischievous urban raccoons raid the junkyard. Three or more scatters award free spins, where every scatter in view collects the valuable cash symbols on the board. A golden collectible adds a bonus, and wilds substitute for the line symbols. Currently an early playable development build.",
    featureBreakdown: [
      { title: "10 Lines, Adjacent Pays", description: "Wins land on matching symbols from the left across 10 lines, with the highest win paid on each line. Wilds substitute for the line symbols." },
      { title: "Scatter Free Spins", description: "Three, four or five scatters anywhere award 10, 15 or 20 free spins played on dedicated reels." },
      { title: "Collect Bonus", description: "During free spins every scatter in view collects all the valuable cash symbols on the board, paid as a multiple of the total bet." },
      { title: "Golden Haul", description: "Landing the golden collectible during free spins adds a bonus multiplier to the collected loot for the game's biggest moments." },
    ],
    passport: {
      gameType: "Video slot",
      gridFormat: "5 reels × 3 rows, 10 lines",
      orientation: "Landscape and portrait",
      featureSummary: "10-line slot with a scatter free-spins feature, a collect bonus and a golden-haul multiplier; 3/4/5 scatters award 10/15/20 free spins.",
      maxWin: "5,000× potential (design target, subject to change)",
      releaseStatus: "Playable development build",
      certificationStatus: "Not yet certified",
      demoAvailability: "In development",
    },
  },
};

function toCategory(t: GameRecord["gameType"]): GameCategory {
  return t === "video-poker" ? "Video Poker" : "Online Slot";
}

/** Map a registry record to the legacy `Game` shape used by the UI. */
function toGame(r: GameRecord): Game {
  const p = PRESENTATION[r.id] ?? {};
  const playable = r.playable && r.publicVisibility === "published";
  const isConcept = r.developmentStatus === "concept";
  return {
    slug: r.slug,
    title: r.title.toUpperCase(),
    category: toCategory(r.gameType),
    status: playable
      ? "In Development"
      : r.developmentStatus === "released"
        ? "Released"
        : isConcept
          ? "Coming Soon"
          : "Coming Soon",
    maturity: playable ? "PLAYABLE DEVELOPMENT" : isConcept ? "CONCEPT" : "IN DEVELOPMENT",
    devProgress: p.devProgress,
    description: r.description,
    summary: p.summary ?? r.description,
    featureTags: r.featureTags,
    featureBreakdown: p.featureBreakdown,
    release: { label: r.roadmapYear > 0 ? `Target ${r.targetReleaseMonth}/${r.roadmapYear}` : "In development" },
    passport: p.passport,
    // Existing projects have bespoke product pages; planned games use the
    // generic /games/[slug] detail route.
    hasDetailPage: !r.existingProject,
    hasProductPage: r.existingProject,
    isConcept: !r.existingProject,
  };
}

/**
 * The catalogue, derived from the authoritative registry. Includes every
 * website-enabled game (existing + planned) so the public portfolio shows the
 * full lineup; planned games render as coming-soon cards with no Play action.
 */
export const games: Game[] = registryWebsiteGames().map(toGame);

/** Games flagged for the "Featured" section on the home page. */
export const featuredGames: Game[] = games;

/** Look up a single game by slug. */
export function getGameBySlug(slug: string): Game | undefined {
  return games.find((game) => game.slug === slug);
}

/** All games that should generate a static (generic) detail page. */
export function getDetailPageGames(): Game[] {
  return games.filter((game) => game.hasDetailPage);
}

/** Lookup by current public slug (kept name for back-compat with pages). */
export function getGameById(gameId: string): Game | undefined {
  return games.find((game) => game.slug === gameId);
}

/** Games that have a bespoke product page at /games/<slug>/. */
export function getProductPageGames(): Game[] {
  return games.filter((game) => game.hasProductPage);
}

/** Map a high-level filter to a predicate. */
export function matchesFilter(game: Game, filter: GameFilter): boolean {
  switch (filter) {
    case "All":
      return true;
    case "Slots":
      return game.category === "Online Slot";
    case "Video Poker":
      return game.category === "Video Poker";
    case "In Development":
      return game.status === "In Development" || game.status === "Coming Soon" || game.status === "Concept";
    case "Released":
      return game.status === "Released";
    default:
      return true;
  }
}

export const gameFilters: GameFilter[] = [
  "All",
  "Slots",
  "Video Poker",
  "In Development",
  "Released",
];

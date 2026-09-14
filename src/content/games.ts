/**
 * Central games catalogue.
 *
 * Add a new title by appending a `Game` object to the `games` array below.
 * Optional fields (logo, artwork, trailerUrl, demoUrl, release, screenshots…)
 * are only rendered in the UI when present, so partial entries are safe.
 */

export type GameCategory = "Online Slot" | "Video Poker" | "Roulette";

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
  | "Roulette"
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
    case "Roulette":
      return "cyan";
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

export const games: Game[] = [
  {
    slug: "cluckus-maximus",
    title: "CLUCKUS MAXIMUS: EGGSPANDER",
    category: "Online Slot",
    status: "In Development",
    maturity: "PLAYABLE DEVELOPMENT",
    devProgress: 65,
    description:
      "An empire-building slot adventure where the playing area expands and the rewards grow as players advance towards Maximus Mode.",
    summary:
      "Cluckus Maximus: Eggspander is a character-led slot built around persistent progression. As players advance, the grid physically grows and new modifiers come into play, building anticipation towards the headline Maximus Mode.",
    featureTags: [
      "Expanding Grid",
      "Persistent Progression",
      "Character Modifiers",
      "5,000× Potential",
    ],
    featureBreakdown: [
      {
        title: "Expanding Grid",
        description:
          "The playable area grows as players progress, opening up more ways to land wins and keeping momentum building.",
      },
      {
        title: "Persistent Progression",
        description:
          "Advancement carries forward, giving each session a sense of building towards something larger.",
      },
      {
        title: "Character Modifiers",
        description:
          "Distinct characters introduce their own modifiers, changing how features behave and rewarding experimentation.",
      },
      {
        title: "Maximus Mode",
        description:
          "The headline feature that everything builds towards — the destination that gives the whole game its shape.",
      },
    ],
    release: { label: "In development" },
    passport: {
      gameType: "Video slot",
      gridFormat: "Expanding grid (from 5×5 towards 7×7)",
      orientation: "Landscape and portrait",
      featureSummary:
        "Expanding grid, persistent progression, character modifiers and the headline Maximus Mode.",
      maxWin: "5,000× potential (design target, subject to change)",
      releaseStatus: "Playable development build",
      certificationStatus: "Not yet certified",
      demoAvailability: "In development",
    },
    // Cluckus has a bespoke product page at /games/cluckus-maximus/, so it does
    // NOT use the generic [slug] detail route (avoids a route collision).
    hasDetailPage: false,
    hasProductPage: true,
  },
  {
    slug: "video-poker-concept",
    title: "Video Poker — Concept",
    category: "Video Poker",
    status: "Concept",
    maturity: "CONCEPT",
    description:
      "A fresh take on video poker, currently at concept stage: the clarity of a classic combined with new presentation, progression and feature ideas.",
    featureTags: ["Classic Clarity", "New Progression", "Modern Presentation"],
    release: { label: "Concept" },
    hasDetailPage: false,
    isConcept: true,
  },
  {
    slug: "roulette-concept",
    title: "Roulette — Concept",
    category: "Roulette",
    status: "Concept",
    maturity: "CONCEPT",
    description:
      "A distinctive interpretation of roulette, currently at concept stage: familiar foundations developed into a visually exciting new experience.",
    featureTags: ["Familiar Foundations", "Distinctive Visuals", "Fresh Mechanics"],
    release: { label: "Concept" },
    hasDetailPage: false,
    isConcept: true,
  },
];

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

/** Canonical game id lookup (same value as slug). */
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
    case "Roulette":
      return game.category === "Roulette";
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
  "Roulette",
  "In Development",
  "Released",
];

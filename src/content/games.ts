/**
 * Central games catalogue.
 *
 * Add a new title by appending a `Game` object to the `games` array below.
 * Optional fields (logo, artwork, trailerUrl, demoUrl, release, screenshots…)
 * are only rendered in the UI when present, so partial entries are safe.
 */

export type GameCategory = "Online Slot" | "Video Poker" | "Roulette";

export type GameStatus = "In Development" | "Coming Soon" | "Released" | "Concept";

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
  /** URL-safe unique identifier, also used for the detail page route. */
  slug: string;
  title: string;
  category: GameCategory;
  status: GameStatus;
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
  /** When true a dedicated /games/[slug] detail page is generated. */
  hasDetailPage: boolean;
  /** Concept cards render with a distinct "teaser" treatment. */
  isConcept?: boolean;
}

export const games: Game[] = [
  {
    slug: "cluckus-maximus-eggspander",
    title: "CLUCKUS MAXIMUS: EGGSPANDER",
    category: "Online Slot",
    status: "In Development",
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
      releaseStatus: "In development",
      certificationStatus: "Not yet certified",
      demoAvailability: "Not yet available",
    },
    hasDetailPage: true,
  },
  {
    slug: "video-poker-concept",
    title: "Video Poker — In Development",
    category: "Video Poker",
    status: "In Development",
    description:
      "A fresh take on video poker in development: the clarity of a classic combined with new presentation, progression and feature ideas.",
    featureTags: ["Classic Clarity", "New Progression", "Modern Presentation"],
    release: { label: "In development" },
    hasDetailPage: false,
    isConcept: true,
  },
  {
    slug: "roulette-concept",
    title: "Roulette — In Development",
    category: "Roulette",
    status: "In Development",
    description:
      "A distinctive interpretation of roulette in development: familiar foundations developed into a visually exciting new experience.",
    featureTags: ["Familiar Foundations", "Distinctive Visuals", "Fresh Mechanics"],
    release: { label: "In development" },
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

/** All games that should generate a static detail page. */
export function getDetailPageGames(): Game[] {
  return games.filter((game) => game.hasDetailPage);
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

import type { CategoryAccentKey, GameStatus } from "./games";

/**
 * "Riot Drops" — game announcements treated like limited-edition releases.
 *
 * Do NOT publish announcement or release dates unless they are confirmed.
 * Unannounced projects use branded "Classified" treatment rather than empty
 * placeholders. Leave `announcementDate` / `releasePeriod` undefined when not
 * confirmed and the UI will simply omit them.
 */
export interface RiotDrop {
  id: string;
  title: string;
  category: string;
  accent: CategoryAccentKey;
  status: GameStatus;
  teaser: string;
  /** Only set when confirmed. */
  announcementDate?: string;
  /** Only set when confirmed (e.g. "Q4 2026"). */
  releasePeriod?: string;
  /** Optional artwork path; falls back to branded "Classified" art when absent. */
  artwork?: string;
  /** When true, present as a mystery "Classified" drop. */
  classified?: boolean;
  /** Link to a detail page if one exists. */
  href?: string;
}

export const riotDropsIntro = {
  heading: "RIOT DROPS",
  intro:
    "New games, announced like they matter. Follow the drops and be first to know when the next Lucky Riot title lands.",
};

export const riotDrops: RiotDrop[] = [
  {
    id: "cluckus-maximus",
    title: "CLUCKUS MAXIMUS: EGGSPANDER",
    category: "Online Slot",
    accent: "gold",
    status: "In Development",
    teaser:
      "An empire-building slot where the grid grows and rewards climb towards Maximus Mode.",
    href: "/games/cluckus-maximus/",
  },
  {
    id: "untitled-video-poker",
    title: "Untitled Video Poker",
    category: "Video Poker",
    accent: "pink",
    status: "In Development",
    teaser: "A classic, rebuilt with progression and personality. Details under wraps.",
    classified: true,
  },
  {
    id: "untitled-roulette",
    title: "Untitled Roulette",
    category: "Roulette",
    accent: "cyan",
    status: "Concept",
    teaser: "Familiar foundations, turned up. Early concept — more to come.",
    classified: true,
  },
];

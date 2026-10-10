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
    id: "glitch-city",
    title: "GLITCH CITY",
    category: "Online Slot",
    accent: "cyan",
    status: "In Development",
    teaser:
      "A neon cyberpunk slot: 10 paylines, a clean symbol set and a free-spins surge through the digital underground.",
    href: "/games/glitch-city/",
  },
  {
    id: "ragnarok-riot",
    title: "RAGNAROK RIOT",
    category: "Online Slot",
    accent: "gold",
    status: "In Development",
    teaser:
      "Viking myth meets heavy metal: a 1024-ways stampede with middle-reel wilds and a sticky-wild free spins feature.",
    href: "/games/ragnarok-riot/",
  },
  {
    id: "trash-pandas",
    title: "TRASH PANDAS",
    category: "Online Slot",
    accent: "gold",
    status: "In Development",
    teaser:
      "Mischievous urban raccoons raid the junkyard: a 10-line slot with a collect-bonus free spins feature.",
    href: "/games/trash-pandas/",
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
];

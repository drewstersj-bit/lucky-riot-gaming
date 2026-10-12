/**
 * LUCKY RIOT GAMES — 2027 portfolio records.
 *
 * The four existing games carry their IMMUTABLE technical `id` (the engine
 * directory / maths profile), with new public `title` + `slug` where rebranded.
 * The eight planned games are registry/roadmap stubs only — no engine project,
 * not playable. Maths figures (rtp/volatility/maxWin) are intentionally omitted
 * for every game until finalised and approved for public display.
 */

import type { GameRecord } from "../schema";

export const games2027: GameRecord[] = [
  // ─── Q1 ─────────────────────────────────────────────────────────────────

  // January — flagship, existing project (unchanged identity).
  {
    id: "cluckus-maximus",
    projectPath: "games/cluckus-maximus",
    slug: "cluckus-maximus",
    title: "Cluckus Maximus: Eggspander",
    subtitle: "Eggspander",
    gameType: "slot",
    theme: "Comedy / Roman Empire",
    description:
      "An empire-building slot where the playing area expands and rewards grow as players advance towards Maximus Mode.",
    shortDescription: "Expanding-grid Roman comedy slot building towards Maximus Mode.",
    roadmapYear: 2027,
    roadmapQuarter: 1,
    targetReleaseMonth: 3,
    developmentStatus: "production",
    publicVisibility: "published",
    existingProject: true,
    featureTags: ["Expanding Grid", "Persistent Progression", "Character Modifiers"],
    mechanics: [
      { title: "Expanding Grid", description: "The playable area grows as players progress, opening up more ways to land wins." },
      { title: "Persistent Progression", description: "Advancement carries forward, giving each session a sense of building towards something larger." },
      { title: "Character Modifiers", description: "Distinct characters introduce their own modifiers, changing how features behave." },
      { title: "Maximus Mode", description: "The headline feature that everything builds towards." },
    ],
    websiteEnabled: true,
    playable: true,
  },

  // February — planned.
  {
    id: "dead-mans-hand",
    slug: "dead-mans-hand",
    title: "Dead Man's Hand",
    gameType: "slot",
    theme: "Supernatural Western / Cursed Poker",
    description:
      "A supernatural western slot where a cursed hand of cards haunts a frontier town.",
    shortDescription: "Supernatural western slot built on a cursed hand of cards.",
    roadmapYear: 2027,
    roadmapQuarter: 1,
    targetReleaseMonth: 2,
    developmentStatus: "concept",
    publicVisibility: "roadmap",
    existingProject: false,
    websiteEnabled: true,
    playable: false,
  },

  // March — existing project (Megabars → Glitch City).
  {
    id: "mega-bars",
    legacyIds: ["megabars"],
    projectPath: "games/mega-bars",
    slug: "glitch-city",
    title: "Glitch City",
    subtitle: "Underground Arcade",
    previousNames: ["Mega Bars", "MegaBars"],
    gameType: "slot",
    theme: "Cyberpunk / Underground Arcade",
    description:
      "A neon cyberpunk slot of bold reels and digital corruption — a stripped-back, high-clarity machine with a free-spins surge.",
    shortDescription: "Cyberpunk 10-line slot with a free-spins surge.",
    logo: "/games/glitch-city/logo.png",
    roadmapYear: 2027,
    roadmapQuarter: 2,
    targetReleaseMonth: 4,
    developmentStatus: "production",
    publicVisibility: "published",
    existingProject: true,
    featureTags: ["5×3 Reels", "10 Lines", "Free Spins", "Adjacent Pays"],
    mechanics: [
      { title: "10 Lines, Adjacent Pays", description: "Wins land on 3 or more adjacent symbols from the left across 10 lines, highest win paid per line." },
      { title: "Clean Symbol Set", description: "A deliberately minimal set for clear, readable play on a neon grid." },
      { title: "Free Spins Surge", description: "Three or more adjacent trigger symbols launch a free-spins run that scales with the bet tier and can retrigger." },
    ],
    websiteEnabled: true,
    playable: true,
  },

  // ─── Q2 ─────────────────────────────────────────────────────────────────

  // May — planned.
  {
    id: "scarab-syndicate",
    slug: "scarab-syndicate",
    logo: "/games/scarab-syndicate/logo.png",
    title: "Scarab Syndicate",
    gameType: "slot",
    theme: "Egyptian Treasure / Tomb Robbers",
    description:
      "An Egyptian tomb-robbing slot following a syndicate after the scarab's treasure.",
    shortDescription: "Egyptian tomb-robber slot chasing the scarab's treasure.",
    roadmapYear: 2027,
    roadmapQuarter: 2,
    targetReleaseMonth: 5,
    developmentStatus: "concept",
    publicVisibility: "roadmap",
    existingProject: false,
    websiteEnabled: true,
    playable: false,
  },

  // January — LEAD TITLE, in active development (Farmyard Frenzy → Trash Pandas
  // → Tycoon Lagoon). First game being built towards release.
  {
    id: "farmyard-frenzy",
    projectPath: "games/tycoon-lagoon",
    slug: "tycoon-lagoon",
    logo: "/games/tycoon-lagoon/logo.png",
    cardBackground: "/games/tycoon-lagoon/card-bg.webp",
    title: "Tycoon Lagoon",
    subtitle: "Big-Catch Fishing",
    previousNames: ["Farmyard Frenzy", "Trash Pandas"],
    gameType: "slot",
    theme: "Tropical Fishing Adventure",
    description:
      "A big-catch fishing slot where every free spin reels in valuable fish — a 10-line grid with a boat-scatter collect bonus and a golden trophy fish.",
    shortDescription: "Tropical fishing slot with a catch-value free-spins collect bonus.",
    roadmapYear: 2027,
    roadmapQuarter: 1,
    targetReleaseMonth: 1,
    developmentStatus: "pre-production",
    publicVisibility: "published",
    existingProject: true,
    featureTags: ["5×3 Reels", "10 Lines", "Collect Bonus", "Free Spins"],
    mechanics: [
      { title: "10 Lines, Adjacent Pays", description: "Wins land on matching symbols from the left across 10 lines; wilds substitute for the line symbols." },
      { title: "Scatter Free Spins", description: "Three, four or five boat scatters anywhere award 10, 15 or 20 free spins played on dedicated reels." },
      { title: "Big-Catch Collect", description: "During free spins every boat scatter in view reels in all the valuable fish on the board, paid as a multiple of the total bet." },
      { title: "Golden Trophy Fish", description: "Landing the golden fish during free spins adds a bonus multiplier to the catch for the game's biggest hauls." },
    ],
    websiteEnabled: true,
    playable: true,
  },

  // June — planned.
  {
    id: "yokai-nights",
    slug: "yokai-nights",
    logo: "/games/yokai-nights/logo.png",
    title: "Yokai Nights",
    gameType: "slot",
    theme: "Japanese Supernatural Folklore",
    description:
      "A moonlit slot drawing on Japanese folklore and its cast of yokai spirits.",
    shortDescription: "Japanese folklore slot of moonlit yokai spirits.",
    roadmapYear: 2027,
    roadmapQuarter: 2,
    targetReleaseMonth: 6,
    developmentStatus: "concept",
    publicVisibility: "roadmap",
    existingProject: false,
    websiteEnabled: true,
    playable: false,
  },

  // ─── Q3 ─────────────────────────────────────────────────────────────────

  // July — existing project (Bison Fury → Ragnarok Riot).
  {
    id: "bison-fury",
    projectPath: "games/bison-fury",
    slug: "ragnarok-riot",
    logo: "/games/ragnarok-riot/logo.png",
    title: "Ragnarok Riot",
    subtitle: "Stampede of Gold",
    previousNames: ["Bison Fury"],
    gameType: "slot",
    theme: "Viking Mythology / Heavy Metal",
    description:
      "A thundering 1024-ways slot where Viking myth meets heavy metal — stacked beasts, a wild stampede and sticky-wild free spins.",
    shortDescription: "Viking heavy-metal 1024-ways slot with sticky-wild free spins.",
    roadmapYear: 2027,
    roadmapQuarter: 3,
    targetReleaseMonth: 7,
    developmentStatus: "production",
    publicVisibility: "published",
    existingProject: true,
    featureTags: ["1024 Ways", "Sticky Wilds", "Free Spins", "5×4 Reels"],
    mechanics: [
      { title: "1024 Ways", description: "Wins pay for matching symbols on adjacent reels from the left across all 1024 ways." },
      { title: "Stampede Wilds", description: "Wilds land on the middle three reels and substitute for all regular symbols." },
      { title: "Sticky-Wild Free Spins", description: "Every wild in free spins sticks for a run of respins while the counter holds; retriggers are possible." },
    ],
    websiteEnabled: true,
    playable: true,
  },

  // August — planned.
  {
    id: "neon-getaway",
    slug: "neon-getaway",
    title: "Neon Getaway",
    gameType: "slot",
    theme: "1980s Miami / Synthwave Heist",
    description:
      "A synthwave heist slot cruising neon-soaked 1980s Miami.",
    shortDescription: "1980s Miami synthwave heist slot.",
    roadmapYear: 2027,
    roadmapQuarter: 3,
    targetReleaseMonth: 8,
    developmentStatus: "concept",
    publicVisibility: "roadmap",
    existingProject: false,
    websiteEnabled: true,
    playable: false,
  },

  // September — planned (video poker).
  {
    id: "riot-poker-royal-flush",
    slug: "riot-poker-royal-flush",
    title: "Riot Poker: Royal Flush",
    gameType: "video-poker",
    theme: "Premium Monochrome Poker",
    description:
      "A premium, monochrome video poker experience focused on the chase for the royal flush.",
    shortDescription: "Premium monochrome video poker.",
    roadmapYear: 2027,
    roadmapQuarter: 3,
    targetReleaseMonth: 9,
    developmentStatus: "concept",
    publicVisibility: "roadmap",
    existingProject: false,
    websiteEnabled: true,
    playable: false,
  },

  // ─── Q4 ─────────────────────────────────────────────────────────────────

  // October — planned.
  {
    id: "mutant-mayhem",
    slug: "mutant-mayhem",
    logo: "/games/mutant-mayhem/logo.png",
    title: "Mutant Mayhem",
    gameType: "slot",
    theme: "Mad Science / B-Movie Horror",
    description:
      "A B-movie horror slot where mad science goes gloriously wrong.",
    shortDescription: "B-movie mad-science horror slot.",
    roadmapYear: 2027,
    roadmapQuarter: 4,
    targetReleaseMonth: 10,
    developmentStatus: "concept",
    publicVisibility: "roadmap",
    existingProject: false,
    websiteEnabled: true,
    playable: false,
  },

  // November — planned.
  {
    id: "santas-naughty-list",
    slug: "santas-naughty-list",
    logo: "/games/santas-naughty-list/logo.png",
    title: "Santa's Naughty List",
    gameType: "slot",
    theme: "Christmas Crime Comedy",
    description:
      "A festive crime-comedy slot where the naughty list is where the fun begins.",
    shortDescription: "Christmas crime-comedy slot.",
    roadmapYear: 2027,
    roadmapQuarter: 4,
    targetReleaseMonth: 11,
    developmentStatus: "concept",
    publicVisibility: "roadmap",
    existingProject: false,
    websiteEnabled: true,
    playable: false,
  },

  // December — planned (video poker).
  {
    id: "dead-mans-poker",
    slug: "dead-mans-poker",
    title: "Dead Man's Poker",
    previousNames: [],
    gameType: "video-poker",
    theme: "Gothic / Supernatural Poker",
    description:
      "A gothic, supernatural take on video poker from the Dead Man's franchise.",
    shortDescription: "Gothic supernatural video poker.",
    roadmapYear: 2027,
    roadmapQuarter: 4,
    targetReleaseMonth: 12,
    developmentStatus: "concept",
    publicVisibility: "roadmap",
    existingProject: false,
    franchiseOf: "dead-mans-hand",
    websiteEnabled: true,
    playable: false,
  },
];

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
    targetReleaseMonth: 1,
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
    roadmapYear: 2027,
    roadmapQuarter: 1,
    targetReleaseMonth: 3,
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

  // April — planned.
  {
    id: "scarab-syndicate",
    slug: "scarab-syndicate",
    title: "Scarab Syndicate",
    gameType: "slot",
    theme: "Egyptian Treasure / Tomb Robbers",
    description:
      "An Egyptian tomb-robbing slot following a syndicate after the scarab's treasure.",
    shortDescription: "Egyptian tomb-robber slot chasing the scarab's treasure.",
    roadmapYear: 2027,
    roadmapQuarter: 2,
    targetReleaseMonth: 4,
    developmentStatus: "concept",
    publicVisibility: "roadmap",
    existingProject: false,
    websiteEnabled: true,
    playable: false,
  },

  // May — existing project (Farmyard Frenzy → Trash Pandas).
  {
    id: "farmyard-frenzy",
    projectPath: "games/farmyard-frenzy",
    slug: "trash-pandas",
    title: "Trash Pandas",
    subtitle: "Junkyard Chaos",
    previousNames: ["Farmyard Frenzy"],
    gameType: "slot",
    theme: "Urban Raccoon Comedy",
    description:
      "A character-led comedy slot where mischievous urban raccoons raid the junkyard, collecting valuables through a free-spins bonus.",
    shortDescription: "Raccoon junkyard comedy slot with a collect-value free-spins bonus.",
    roadmapYear: 2027,
    roadmapQuarter: 2,
    targetReleaseMonth: 5,
    developmentStatus: "production",
    publicVisibility: "published",
    existingProject: true,
    featureTags: ["5×3 Reels", "10 Lines", "Collect Bonus", "Free Spins"],
    mechanics: [
      { title: "10 Lines, Adjacent Pays", description: "Wins land on matching symbols from the left across 10 lines; wilds substitute for the line symbols." },
      { title: "Scatter Free Spins", description: "Three, four or five scatters anywhere award 10, 15 or 20 free spins played on dedicated reels." },
      { title: "Collect Bonus", description: "During free spins every scatter in view collects all the valuable cash symbols on the board." },
      { title: "Golden Haul", description: "Landing the golden collectible during free spins adds a bonus multiplier to the collected loot." },
    ],
    websiteEnabled: true,
    playable: true,
  },

  // June — planned.
  {
    id: "yokai-nights",
    slug: "yokai-nights",
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

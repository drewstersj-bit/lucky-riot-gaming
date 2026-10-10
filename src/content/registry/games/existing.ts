/**
 * Existing games that are NOT part of the 2027 public roadmap.
 *
 * Video Poker Pro is a real, playable existing project but was not included in
 * the approved 2027 roadmap lineup. We keep it registered (so the website still
 * presents it) with a roadmapYear of 0 to mark it as off-roadmap. Its technical
 * id is preserved.
 */

import type { GameRecord } from "../schema";

export const gamesExisting: GameRecord[] = [
  {
    id: "video-poker-pro",
    projectPath: "games/video-poker-pro",
    slug: "video-poker-pro",
    title: "Video Poker Pro",
    gameType: "video-poker",
    theme: "Classic Multi-Hand Video Poker",
    description:
      "Pro-style 100-hand video poker across three variants — Tens or Better, Deuces Wild and Deuces and Joker — plus a double-or-nothing gamble.",
    shortDescription: "100-hand video poker, three variants, double-or-nothing gamble.",
    roadmapYear: 0, // off the public roadmap
    roadmapQuarter: 1,
    targetReleaseMonth: 1,
    developmentStatus: "production",
    publicVisibility: "published",
    existingProject: true,
    featureTags: ["100 Hands", "3 Variants", "Wilds", "Double Feature"],
    mechanics: [
      { title: "100 Hands at Once", description: "Deal and hold once; held cards carry into 100 hands, each drawing fresh replacements for 100 independent results." },
      { title: "Three Variants, One Engine", description: "Tens or Better, Deuces Wild and Deuces and Joker share one engine and differ only in paytable and wild rules." },
      { title: "Double or Nothing", description: "After any win, gamble it in the double feature with collect and collect-half options and a per-level cap." },
    ],
    websiteEnabled: true,
    playable: true,
  },
];

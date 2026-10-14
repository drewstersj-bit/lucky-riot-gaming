import type { Metadata } from "next";
import { GameEmbed } from "@/components/GameEmbed";
import { getDeployment } from "@/content/game-deployments";
import { buildMetadata } from "@/lib/seo";

const GAME_ID = "video-poker-pro";

export const metadata: Metadata = {
  ...buildMetadata({
    title: "Video Poker Pro — Demo",
    description: "Play the Video Poker Pro public demo from Lucky Riot Games.",
    path: `/games/${GAME_ID}/play`,
  }),
  robots: { index: false, follow: false },
};

/**
 * Full-screen public demo. Site chrome is suppressed for this route by
 * ChromeGate, so the game fills the whole viewport edge-to-edge. PUBLIC build
 * profile — clean demo only (no devtools / internal maths / fixtures).
 */
export default function VideoPokerProPublicPlayPage() {
  const manifest = getDeployment(GAME_ID, "PUBLIC");
  return <GameEmbed manifest={manifest} title="Video Poker Pro" sizing="fullscreen" />;
}

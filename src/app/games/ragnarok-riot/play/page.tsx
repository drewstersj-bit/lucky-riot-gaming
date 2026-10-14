import type { Metadata } from "next";
import { GameEmbed } from "@/components/GameEmbed";
import { getDeployment } from "@/content/game-deployments";
import { buildMetadata } from "@/lib/seo";

const GAME_ID = "ragnarok-riot";

export const metadata: Metadata = {
  ...buildMetadata({
    title: "Ragnarok Riot — Demo",
    description: "Play the Ragnarok Riot public demo from Lucky Riot Games.",
    path: `/games/${GAME_ID}/play`,
  }),
  robots: { index: false, follow: false },
};

/**
 * Full-screen public demo. Site chrome is suppressed for this route by
 * ChromeGate, so the game fills the whole viewport edge-to-edge.
 */
export default function RagnarokRiotPublicPlayPage() {
  const manifest = getDeployment(GAME_ID, "PUBLIC");
  return <GameEmbed manifest={manifest} title="Ragnarok Riot" sizing="fullscreen" />;
}

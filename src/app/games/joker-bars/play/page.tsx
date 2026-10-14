import type { Metadata } from "next";
import { GameEmbed } from "@/components/GameEmbed";
import { getDeployment } from "@/content/game-deployments";
import { buildMetadata } from "@/lib/seo";

const GAME_ID = "joker-bars";

export const metadata: Metadata = {
  ...buildMetadata({
    title: "Joker Bars — Demo",
    description: "Play the Joker Bars public demo from Lucky Riot Games.",
    path: `/games/${GAME_ID}/play`,
  }),
  robots: { index: false, follow: false },
};

/**
 * Full-screen public demo. Site chrome is suppressed for this route by
 * ChromeGate, so the game fills the whole viewport edge-to-edge.
 */
export default function JokerBarsPublicPlayPage() {
  const manifest = getDeployment(GAME_ID, "PUBLIC");
  return <GameEmbed manifest={manifest} title="Joker Bars" sizing="fullscreen" />;
}

import type { Metadata } from "next";
import { GameEmbed } from "@/components/GameEmbed";
import { getDeployment } from "@/content/game-deployments";
import { buildMetadata } from "@/lib/seo";

const GAME_ID = "tycoon-lagoon";

export const metadata: Metadata = {
  ...buildMetadata({
    title: "Tycoon Lagoon — Demo",
    description: "Play the Tycoon Lagoon public demo from Lucky Riot Games.",
    path: `/games/${GAME_ID}/play`,
  }),
  robots: { index: false, follow: false },
};

/**
 * Full-screen public demo. The site chrome (header/footer) is suppressed for
 * this route by ChromeGate, so the game fills the whole viewport edge-to-edge.
 */
export default function TycoonLagoonPublicPlayPage() {
  const manifest = getDeployment(GAME_ID, "PUBLIC");
  return <GameEmbed manifest={manifest} title="Tycoon Lagoon" sizing="fullscreen" />;
}

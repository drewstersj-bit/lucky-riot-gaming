import type { Metadata } from "next";
import Link from "next/link";
import { GameEmbed } from "@/components/GameEmbed";
import { getDeployment } from "@/content/game-deployments";
import { buildMetadata } from "@/lib/seo";

const GAME_ID = "cluckus-maximus";

export const metadata: Metadata = {
  ...buildMetadata({
    title: "Cluckus Maximus — Demo",
    description: "Play the Cluckus Maximus public demo from Lucky Riot Games.",
    path: `/games/${GAME_ID}/play`,
  }),
  // SEO for the public demo is decided at release stage; keep it out of the
  // index until a real, released demo build is wired.
  robots: { index: false, follow: false },
};

export default function CluckusPublicPlayPage() {
  // PUBLIC build profile — clean demo only. No devtools, no internal maths,
  // no fixtures, no debug controls (enforced by the artefact + build profile).
  const manifest = getDeployment(GAME_ID, "PUBLIC");

  // Near-native layout: a slim back bar, then the game fills the rest of the
  // viewport edge-to-edge (no 16:9 box, no page padding) so mobile feels like
  // the standalone build. The site header stays above for navigation.
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between gap-3 border-b border-riot-border bg-riot-black/60 px-4 py-2">
        <Link
          href={`/games/${GAME_ID}/`}
          className="text-sm font-semibold text-riot-text-muted hover:text-riot-cyan"
        >
          ← Back
        </Link>
        <h1 id="play-heading" className="truncate font-display text-sm uppercase tracking-wide text-riot-white">
          Cluckus Maximus — Demo
        </h1>
        <span className="text-[10px] uppercase tracking-[0.18em] text-riot-text-muted">18+</span>
      </div>
      <GameEmbed manifest={manifest} title="Cluckus Maximus" sizing="fullscreen" />
    </div>
  );
}

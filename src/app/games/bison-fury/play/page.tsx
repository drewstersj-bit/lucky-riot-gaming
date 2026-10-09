import type { Metadata } from "next";
import Link from "next/link";
import { GameEmbed } from "@/components/GameEmbed";
import { getDeployment } from "@/content/game-deployments";
import { buildMetadata } from "@/lib/seo";

const GAME_ID = "bison-fury";

export const metadata: Metadata = {
  ...buildMetadata({
    title: "Bison Fury — Demo",
    description: "Play the Bison Fury public demo from Lucky Riot Games.",
    path: `/games/${GAME_ID}/play`,
  }),
  // SEO for the public demo is decided at release stage; keep it out of the
  // index until a real, released demo build is wired.
  robots: { index: false, follow: false },
};

export default function BisonFuryPublicPlayPage() {
  // PUBLIC build profile — clean demo only. No devtools, no internal maths,
  // no fixtures, no debug controls (enforced by the artefact + build profile).
  const manifest = getDeployment(GAME_ID, "PUBLIC");

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
          Bison Fury — Demo
        </h1>
        <span className="text-[10px] uppercase tracking-[0.18em] text-riot-text-muted">18+</span>
      </div>
      <GameEmbed manifest={manifest} title="Bison Fury" sizing="fullscreen" />
    </div>
  );
}

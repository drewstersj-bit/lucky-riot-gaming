import type { Metadata } from "next";
import Link from "next/link";
import { GameEmbed } from "@/components/GameEmbed";
import { getDeployment } from "@/content/game-deployments";
import { buildMetadata } from "@/lib/seo";

const GAME_ID = "trash-pandas";

export const metadata: Metadata = {
  ...buildMetadata({
    title: "Trash Pandas — Demo",
    description: "Play the Trash Pandas public demo from Lucky Riot Games.",
    path: `/games/${GAME_ID}/play`,
  }),
  robots: { index: false, follow: false },
};

export default function TrashPandasPublicPlayPage() {
  const manifest = getDeployment(GAME_ID, "PUBLIC");

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between gap-3 border-b border-riot-border bg-riot-black/60 px-4 py-2">
        <Link href={`/games/${GAME_ID}/`} className="text-sm font-semibold text-riot-text-muted hover:text-riot-cyan">← Back</Link>
        <h1 id="play-heading" className="truncate font-display text-sm uppercase tracking-wide text-riot-white">Trash Pandas — Demo</h1>
        <span className="text-[10px] uppercase tracking-[0.18em] text-riot-text-muted">18+</span>
      </div>
      <GameEmbed manifest={manifest} title="Trash Pandas" sizing="fullscreen" />
    </div>
  );
}

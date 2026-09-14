import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
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

  return (
    <Section aria-labelledby="play-heading">
      <Reveal>
        <Link href={`/games/${GAME_ID}/`} className="text-sm font-semibold text-riot-text-muted hover:text-riot-cyan">
          ← Back to Cluckus Maximus
        </Link>
        <h1 id="play-heading" className="mt-4 font-display text-3xl uppercase text-riot-white md:text-4xl">
          Cluckus Maximus — Demo
        </h1>
        <p className="mt-3 max-w-2xl leading-relaxed text-riot-text-muted">
          A clean public demonstration of Cluckus Maximus. This is a demo build for entertainment
          and showcase purposes and does not accept wagers.
        </p>
      </Reveal>
      <Reveal delay={0.06}>
        <div className="mt-8">
          <GameEmbed manifest={manifest} title="Cluckus Maximus" />
        </div>
        <p className="mt-4 text-xs uppercase tracking-[0.2em] text-riot-text-muted">
          Public demo · 18+ · Please gamble responsibly
        </p>
      </Reveal>
    </Section>
  );
}

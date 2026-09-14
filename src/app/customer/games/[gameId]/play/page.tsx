import { notFound } from "next/navigation";
import Link from "next/link";
import { Section } from "@/components/Section";
import { GameEmbed } from "@/components/GameEmbed";
import { getCustomerGame, customerGames } from "@/content/customer";
import { getDeployment } from "@/content/game-deployments";

interface PageProps {
  params: Promise<{ gameId: string }>;
}

export function generateStaticParams() {
  return customerGames.map((g) => ({ gameId: g.gameId }));
}

export default async function CustomerPlayPage({ params }: PageProps) {
  const { gameId } = await params;
  const game = getCustomerGame(gameId);
  if (!game) notFound();

  // CUSTOMER build profile — clean playable candidate only. No Developer
  // Console, no internal maths inspector, no scenario tools, no internal notes.
  const manifest = getDeployment(gameId, "CUSTOMER");

  return (
    <Section aria-labelledby="cust-play-heading">
      <Link href={`/customer/games/${gameId}/`} className="text-sm font-semibold text-riot-text-muted hover:text-riot-cyan">
        ← {game.displayName}
      </Link>
      <h1 id="cust-play-heading" className="mt-4 font-display text-3xl uppercase text-riot-white md:text-4xl">
        Play — {game.displayName}
      </h1>
      <p className="mt-3 max-w-2xl leading-relaxed text-riot-text-muted">
        Approved candidate build. When a candidate is published it will run here. This is a clean
        build with no developer tooling.
      </p>

      <div className="mt-8">
        <GameEmbed manifest={manifest} title={game.displayName} />
      </div>
    </Section>
  );
}

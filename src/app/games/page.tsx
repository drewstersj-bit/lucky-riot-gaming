import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { GamesGrid } from "@/components/GamesGrid";
import { games } from "@/content/games";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Games Portfolio",
  description:
    "Explore the Lucky Riot Games portfolio of original online slots, video poker and roulette titles, including games currently in development.",
  path: "/games",
});

export default function GamesPage() {
  return (
    <Section aria-labelledby="games-heading">
      <Reveal>
        <SectionHeading
          id="games-heading"
          eyebrow="Portfolio"
          title="Our Games"
          intro="Original slots and fresh takes on classic casino games. Use the filters to explore by category or development status."
        />
      </Reveal>
      <div className="mt-10">
        <GamesGrid games={games} />
      </div>
    </Section>
  );
}

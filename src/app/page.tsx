import type { Metadata } from "next";
import { HeroReveal } from "@/components/HeroReveal";
import { ButtonLink } from "@/components/Button";
import { Section, SectionHeading } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { Streak } from "@/components/Streak";
import { CategoryPanels } from "@/components/CategoryPanels";
import { FeaturedGame } from "@/components/FeaturedGame";
import { InsideTheRiot } from "@/components/InsideTheRiot";
import { RiotDrops } from "@/components/RiotDrops";
import { Pillars } from "@/components/Pillars";
import { getGameBySlug } from "@/content/games";
import {
  studioIntro,
  gameCategories,
  insideTheRiot,
  approachPillars,
  partnershipCta,
} from "@/content/home";
import { riotDrops, riotDropsIntro } from "@/content/riot-drops";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Lucky Riot Games | Original Slots and Online Games",
  ...buildMetadata({
    title: "Lucky Riot Games | Built to Break the Pattern",
    description:
      "Lucky Riot Games creates original online slots, video poker and roulette. Serious maths. Beautiful chaos.",
    path: "/",
  }),
};

export default function HomePage() {
  const flagship = getGameBySlug("cluckus-maximus");

  return (
    <>
      {/* 1. Brand-reveal hero */}
      <HeroReveal />

      {/* 2. Featured game */}
      {flagship && (
        <Section aria-labelledby="featured-heading">
          <Reveal>
            <SectionHeading
              id="featured-heading"
              eyebrow="Flagship title"
              title="The First Riot"
              intro="Our debut flagship project, in development now."
            />
            <Streak className="mt-6" />
          </Reveal>
          <Reveal delay={0.06}>
            <div className="mt-10">
              <FeaturedGame game={flagship} />
            </div>
          </Reveal>
        </Section>
      )}

      {/* 3. Game categories */}
      <Section gradient aria-labelledby="categories-heading">
        <Reveal>
          <SectionHeading
            id="categories-heading"
            eyebrow="What we make"
            title="Slots. Poker. Roulette. Turned Up."
            intro={studioIntro.copy}
          />
        </Reveal>
        <div className="mt-12">
          <Reveal>
            <CategoryPanels categories={gameCategories} />
          </Reveal>
        </div>
      </Section>

      {/* 4. Inside the Riot */}
      <Section aria-labelledby="inside-heading">
        <Reveal>
          <SectionHeading
            id="inside-heading"
            eyebrow="Under the hood"
            title={insideTheRiot.heading}
            intro={insideTheRiot.intro}
          />
          <Streak className="mt-6" />
        </Reveal>
        <div className="mt-12">
          <Reveal>
            <InsideTheRiot cards={insideTheRiot.cards} />
          </Reveal>
        </div>
      </Section>

      {/* 5. Our approach */}
      <Section gradient aria-labelledby="approach-heading">
        <Reveal>
          <SectionHeading id="approach-heading" eyebrow="Our approach" title="Built Properly. Played Loudly." />
        </Reveal>
        <div className="mt-12">
          <Pillars pillars={approachPillars} />
        </div>
      </Section>

      {/* 6. Riot Drops */}
      <Section aria-labelledby="drops-heading">
        <Reveal>
          <SectionHeading
            id="drops-heading"
            eyebrow="Announcements"
            title={riotDropsIntro.heading}
            intro={riotDropsIntro.intro}
          />
          <Streak className="mt-6" />
        </Reveal>
        <div className="mt-12">
          <Reveal>
            <RiotDrops drops={riotDrops} />
          </Reveal>
        </div>
      </Section>

      {/* 7. Commercial partnership CTA */}
      <Section gradient aria-labelledby="partner-heading">
        <Reveal>
          <div className="group relative overflow-hidden rounded-xl2 border border-riot-border bg-riot-surface p-8 md:p-14">
            <span className="light-sweep pointer-events-none absolute inset-0" aria-hidden="true" />
            <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-riot-pink/20 blur-3xl" />
            <div className="relative max-w-2xl">
              <h2 id="partner-heading" className="font-display text-3xl uppercase text-riot-white md:text-4xl">
                {partnershipCta.heading}
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-riot-text">{partnershipCta.copy}</p>
              <ButtonLink href={partnershipCta.button.href} size="lg" className="mt-8">
                {partnershipCta.button.label}
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </Section>
    </>
  );
}

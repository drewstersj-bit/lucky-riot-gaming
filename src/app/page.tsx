import type { Metadata } from "next";
import { HeroBackground } from "@/components/HeroBackground";
import { ButtonLink } from "@/components/Button";
import { Section, SectionHeading } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { CategoryCard } from "@/components/CategoryCard";
import { GameCard } from "@/components/GameCard";
import { Pillars } from "@/components/Pillars";
import { featuredGames } from "@/content/games";
import {
  heroContent,
  studioIntro,
  approachPillars,
  partnershipCta,
} from "@/content/home";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Lucky Riot Games | Original Slots and Online Games",
  ...buildMetadata({
    title: "Lucky Riot Games | Original Slots and Online Games",
    description:
      "Lucky Riot Games is an independent studio creating original online slots, video poker, roulette and distinctive new gaming experiences.",
    path: "/",
  }),
};

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[88vh] items-center overflow-hidden">
        <HeroBackground />
        <div className="container-page relative z-10 py-24">
          <div className="max-w-3xl">
            <Reveal>
              <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-riot-border bg-riot-surface/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-lucky-yellow">
                Independent game studio
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="text-display-xl font-extrabold text-riot-white">
                Games Should Never Feel{" "}
                <span className="text-gradient-lucky">Predictable.</span>
              </h1>
              <div className="divider-riot mt-6 w-28 rounded-full" aria-hidden="true" />
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-riot-text md:text-xl">
                {heroContent.supporting}
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                <ButtonLink href={heroContent.primaryCta.href} size="lg">
                  {heroContent.primaryCta.label}
                </ButtonLink>
                <ButtonLink href={heroContent.secondaryCta.href} size="lg" variant="secondary">
                  {heroContent.secondaryCta.label}
                </ButtonLink>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Studio introduction */}
      <Section aria-labelledby="studio-heading">
        <Reveal>
          <SectionHeading
            id="studio-heading"
            eyebrow="Who we are"
            title={studioIntro.heading}
            intro={studioIntro.copy}
          />
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {studioIntro.categories.map((cat, i) => (
            <Reveal key={cat.title} delay={i * 0.08}>
              <CategoryCard title={cat.title} description={cat.description} index={i} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Featured games */}
      <Section gradient aria-labelledby="featured-heading">
        <Reveal>
          <SectionHeading
            id="featured-heading"
            eyebrow="From the studio"
            title="Featured Games"
            intro="A first look at what we're building. More titles are in development."
          />
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredGames.map((game, i) => (
            <Reveal key={game.slug} delay={i * 0.06}>
              <GameCard game={game} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Our approach */}
      <Section aria-labelledby="approach-heading">
        <Reveal>
          <SectionHeading
            id="approach-heading"
            eyebrow="Our approach"
            title="How We Build"
          />
        </Reveal>
        <div className="mt-12">
          <Pillars pillars={approachPillars} />
        </div>
      </Section>

      {/* Partnership CTA */}
      <Section gradient aria-labelledby="partner-heading">
        <Reveal>
          <div className="relative overflow-hidden rounded-xl2 border border-riot-border bg-riot-surface p-8 md:p-14">
            <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-riot-pink/20 blur-3xl" />
            <div className="relative max-w-2xl">
              <h2 id="partner-heading" className="text-display-md font-extrabold text-riot-white">
                {partnershipCta.heading}
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-riot-text">
                {partnershipCta.copy}
              </p>
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

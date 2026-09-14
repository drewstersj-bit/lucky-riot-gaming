import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { Streak } from "@/components/Streak";
import { ButtonLink } from "@/components/Button";
import { MaturityBadge } from "@/components/MaturityBadge";
import { GamePassport } from "@/components/GamePassport";
import { GridExpansionDemo } from "@/components/GridExpansionDemo";
import { getGameById } from "@/content/games";
import { buildMetadata } from "@/lib/seo";

const GAME_ID = "cluckus-maximus";

const game = getGameById(GAME_ID);

export const metadata: Metadata = buildMetadata({
  title: "Cluckus Maximus: Eggspander",
  description:
    "Cluckus Maximus: Eggspander — an original Lucky Riot slot with an expanding 5×5 to 7×7 grid, persistent progression, character modifiers and Maximus Mode. Playable development build.",
  path: `/games/${GAME_ID}`,
});

export default function CluckusProductPage() {
  if (!game) notFound();

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-riot-border surface-gradient">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-lucky-gold/10 blur-3xl"
        />
        <div className="container-page relative py-16 md:py-24">
          <Reveal>
            <Link href="/games/" className="text-sm font-semibold text-riot-text-muted hover:text-riot-cyan">
              ← Back to games
            </Link>
          </Reveal>
          <div className="mt-6 grid items-center gap-10 lg:grid-cols-2">
            <Reveal>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-lucky-gold">
                  {game.category}
                </p>
                <h1 className="mt-3 font-display text-[clamp(2.25rem,5vw,4rem)] uppercase leading-[1.05] text-riot-white">
                  {game.title}
                </h1>
                <Streak className="mt-5" />
                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <MaturityBadge maturity={game.maturity} />
                  <span className="text-xs uppercase tracking-[0.18em] text-riot-text-muted">
                    Flagship title
                  </span>
                </div>
                <p className="mt-6 max-w-xl text-lg leading-relaxed text-riot-text">
                  {game.summary ?? game.description}
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  {/* Public demo route exists but is not yet released. */}
                  <ButtonLink href={`/games/${GAME_ID}/play/`} variant="secondary">
                    Public Demo
                  </ButtonLink>
                  <ButtonLink href="/contact/" variant="ghost">
                    Enquire About This Title
                  </ButtonLink>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="relative aspect-[16/10] overflow-hidden rounded-xl2 border border-riot-border bg-riot-surface shadow-card">
                {game.artworkLandscape ? (
                  <Image
                    src={game.artworkLandscape}
                    alt={`${game.title} key artwork`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                    priority
                  />
                ) : (
                  <ArtworkPlaceholder />
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Core mechanic — grid expansion demo */}
      <Section aria-labelledby="mechanic-heading">
        <Reveal>
          <h2 id="mechanic-heading" className="font-display text-3xl uppercase text-riot-white">
            The Expanding Grid
          </h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-riot-text-muted">
            Cluckus is built around a playing area that grows as players advance — from a 5×5 grid
            towards 7×7 — building momentum on the way to Maximus Mode. Here&apos;s a lightweight
            illustration of how it expands.
          </p>
        </Reveal>
        <Reveal delay={0.06}>
          <div className="mt-10">
            <GridExpansionDemo />
          </div>
        </Reveal>
      </Section>

      {/* Key features */}
      {game.featureBreakdown && game.featureBreakdown.length > 0 && (
        <Section gradient aria-labelledby="features-heading">
          <Reveal>
            <h2 id="features-heading" className="font-display text-3xl uppercase text-riot-white">
              Key Features
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {game.featureBreakdown.map((feature, i) => (
              <Reveal key={feature.title} delay={i * 0.06}>
                <div className="h-full rounded-xl2 border border-riot-border bg-riot-surface p-7 transition-colors hover:border-lucky-gold/50">
                  <h3 className="text-lg font-bold text-riot-white">{feature.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-riot-text-muted">
                    {feature.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Section>
      )}

      {/* Feature tags */}
      {game.featureTags && game.featureTags.length > 0 && (
        <Section aria-labelledby="tags-heading">
          <Reveal>
            <h2 id="tags-heading" className="font-display text-3xl uppercase text-riot-white">
              At a Glance
            </h2>
          </Reveal>
          <ul className="mt-8 flex flex-wrap gap-3">
            {game.featureTags.map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-lucky-gold/40 bg-riot-surface px-4 py-2 text-sm font-medium text-riot-text"
              >
                {tag}
              </li>
            ))}
          </ul>
        </Section>
      )}

      {/* Screenshots (only if provided) */}
      {game.screenshots && game.screenshots.length > 0 && (
        <Section gradient aria-labelledby="screens-heading">
          <Reveal>
            <h2 id="screens-heading" className="font-display text-3xl uppercase text-riot-white">
              Screenshots
            </h2>
          </Reveal>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {game.screenshots.map((shot) => (
              <div
                key={shot.src}
                className="relative aspect-video overflow-hidden rounded-xl2 border border-riot-border bg-riot-surface"
              >
                <Image src={shot.src} alt={shot.alt} fill sizes="33vw" className="object-cover" loading="lazy" />
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Development progress */}
      {typeof game.devProgress === "number" && (
        <Section aria-labelledby="progress-heading">
          <Reveal>
            <h2 id="progress-heading" className="font-display text-3xl uppercase text-riot-white">
              Development Progress
            </h2>
          </Reveal>
          <Reveal delay={0.06}>
            <div className="mt-8 max-w-2xl">
              <div className="flex items-center justify-between text-sm text-riot-text-muted">
                <span>Towards release candidate</span>
                <span className="font-semibold text-lucky-gold">{game.devProgress}%</span>
              </div>
              <div className="mt-3 h-3 w-full overflow-hidden rounded-full bg-riot-charcoal ring-1 ring-riot-border">
                <div
                  className="h-full rounded-full bg-lucky-gradient"
                  style={{ width: `${game.devProgress}%` }}
                />
              </div>
              <p className="mt-4 text-sm leading-relaxed text-riot-text-muted">
                Cluckus Maximus is a playable development build. Progress is indicative and subject
                to change as the game moves towards a release candidate.
              </p>
            </div>
          </Reveal>
        </Section>
      )}

      {/* Game information (commercial passport) */}
      {game.passport && (
        <Section gradient aria-labelledby="info-heading">
          <Reveal>
            <h2 id="info-heading" className="font-display text-3xl uppercase text-riot-white">
              Game Information
            </h2>
            <p className="mt-4 max-w-2xl leading-relaxed text-riot-text-muted">
              Published specification only. Internal configuration, probability tables and
              development data are not shown.
            </p>
          </Reveal>
          <Reveal delay={0.06}>
            <div className="mt-10 max-w-3xl">
              <GamePassport passport={game.passport} />
            </div>
          </Reveal>
        </Section>
      )}

      {/* Partnership CTA */}
      <Section aria-labelledby="cta-heading">
        <Reveal>
          <div className="group relative overflow-hidden rounded-xl2 border border-riot-border bg-riot-surface p-8 md:p-12">
            <span className="light-sweep pointer-events-none absolute inset-0" aria-hidden="true" />
            <div className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full bg-riot-pink/20 blur-3xl" />
            <div className="relative max-w-2xl">
              <h2 id="cta-heading" className="font-display text-3xl uppercase text-riot-white md:text-4xl">
                Start a Riot With Us.
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-riot-text">
                We work with operators, aggregators and platform providers. Get in touch to talk
                about Cluckus Maximus and the wider Lucky Riot portfolio.
              </p>
              <ButtonLink href="/contact/" size="lg" className="mt-8">
                Talk to Lucky Riot
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </Section>
    </>
  );
}

function ArtworkPlaceholder() {
  return (
    <div className="absolute inset-0 flex items-center justify-center surface-gradient">
      <svg viewBox="0 0 240 150" className="h-full w-full opacity-90" aria-hidden="true">
        <defs>
          <linearGradient id="cluckus-art" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFC20A" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#FA0597" stopOpacity="0.3" />
          </linearGradient>
        </defs>
        {[50, 120, 190].map((x, i) => (
          <rect
            key={x}
            x={x - 26}
            y={24 + i * 4}
            width="52"
            height="100"
            rx="10"
            fill="url(#cluckus-art)"
            fillOpacity={0.18 + i * 0.05}
            stroke="#293543"
          />
        ))}
        <circle cx="120" cy="74" r="24" fill="none" stroke="#18C8F2" strokeWidth="1.5" strokeDasharray="4 8" />
      </svg>
    </div>
  );
}

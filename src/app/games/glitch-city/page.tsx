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
import { getGameById } from "@/content/games";
import { buildMetadata } from "@/lib/seo";

const GAME_SLUG = "glitch-city";

const game = getGameById(GAME_SLUG);

export const metadata: Metadata = buildMetadata({
  title: "Glitch City",
  description:
    "Glitch City — an original Lucky Riot slot: a neon cyberpunk machine with bold reels, a clean symbol set and a free-spins surge. Early playable development build.",
  path: `/games/${GAME_SLUG}`,
});

export default function GlitchCityProductPage() {
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
                    In development
                  </span>
                </div>
                <p className="mt-6 max-w-xl text-lg leading-relaxed text-riot-text">
                  {game.summary ?? game.description}
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <ButtonLink href={`/games/${GAME_SLUG}/play/`} variant="secondary">
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
                ) : game.logo ? (
                  <div className="absolute inset-0 flex items-center justify-center surface-gradient">
                    <Image
                      src={game.logo}
                      alt={`${game.title} logo`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-contain p-5 drop-shadow-[0_0_40px_rgba(24,200,242,0.5)]"
                      priority
                    />
                  </div>
                ) : (
                  <ArtworkPlaceholder />
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

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

      {/* Development progress */}
      {typeof game.devProgress === "number" && (
        <Section gradient aria-labelledby="progress-heading">
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
                Glitch City is an early playable development build. Progress is indicative and
                subject to change as the game moves towards a release candidate.
              </p>
            </div>
          </Reveal>
        </Section>
      )}

      {/* Game information (commercial passport) */}
      {game.passport && (
        <Section aria-labelledby="info-heading">
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
      <Section gradient aria-labelledby="cta-heading">
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
                about Glitch City and the wider Lucky Riot portfolio.
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
          <linearGradient id="glitch-art" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#18C8F2" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#FF3DAE" stopOpacity="0.35" />
          </linearGradient>
        </defs>
        {/* Glitch bars nodding to the cyberpunk theme */}
        {[44, 74, 104].map((y, i) => (
          <rect
            key={y}
            x={30 + i * 10}
            y={y}
            width="170"
            height="18"
            rx="3"
            fill="url(#glitch-art)"
            fillOpacity={0.3 + i * 0.12}
            stroke="#293543"
          />
        ))}
        <text x="120" y="34" textAnchor="middle" fill="#18C8F2" fontSize="15" fontWeight="700" opacity="0.6">
          GLITCH
        </text>
      </svg>
    </div>
  );
}

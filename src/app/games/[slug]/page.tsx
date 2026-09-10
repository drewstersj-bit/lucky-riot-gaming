import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { Streak } from "@/components/Streak";
import { ButtonLink } from "@/components/Button";
import { GamePassport } from "@/components/GamePassport";
import { GridExpansionDemo } from "@/components/GridExpansionDemo";
import { accentClasses } from "@/lib/accents";
import { accentForCategory, getDetailPageGames, getGameBySlug } from "@/content/games";
import { buildMetadata } from "@/lib/seo";

interface PageProps {
  params: Promise<{ slug: string }>;
}

/** Generate a static page for every game flagged with hasDetailPage. */
export function generateStaticParams() {
  return getDetailPageGames().map((game) => ({ slug: game.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const game = getGameBySlug(slug);
  if (!game) return {};
  return buildMetadata({
    title: game.title,
    description: game.description,
    path: `/games/${game.slug}`,
  });
}

export default async function GameDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const game = getGameBySlug(slug);
  if (!game || !game.hasDetailPage) notFound();

  // Per-game visual world: each title adopts its category accent while keeping
  // the Lucky Riot navigation, typography and interface system intact.
  const accent = accentForCategory(game.category);
  const a = accentClasses[accent];
  const showGridDemo = game.slug === "cluckus-maximus-eggspander";

  return (
    <>
      {/* Hero — tinted towards the game's world */}
      <section className="relative overflow-hidden border-b border-riot-border surface-gradient">
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full ${a.bgSoft} blur-3xl`}
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
                <p className={`text-xs font-semibold uppercase tracking-[0.2em] ${a.text}`}>
                  {game.category}
                </p>
                <h1 className="mt-3 font-display text-[clamp(2.25rem,5vw,4rem)] uppercase leading-[0.95] text-riot-white">
                  {game.title}
                </h1>
                <Streak className="mt-5" />
                <p className={`mt-5 inline-flex rounded-full border ${a.border} ${a.bgSoft} px-3 py-1 text-xs font-semibold uppercase tracking-wider ${a.text}`}>
                  {game.status}
                </p>
                <p className="mt-6 max-w-xl text-lg leading-relaxed text-riot-text">
                  {game.summary ?? game.description}
                </p>
                {(game.trailerUrl || game.demoUrl) && (
                  <div className="mt-8 flex flex-wrap gap-3">
                    {game.trailerUrl && (
                      <ButtonLink href={game.trailerUrl} external>
                        Watch Trailer
                      </ButtonLink>
                    )}
                    {game.demoUrl && (
                      <ButtonLink href={game.demoUrl} variant="secondary" external>
                        Play Demo
                      </ButtonLink>
                    )}
                  </div>
                )}
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
                  <HeroPlaceholder />
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Inside this game — grid-expansion demonstration for Cluckus */}
      {showGridDemo && (
        <Section aria-labelledby="inside-game-heading">
          <Reveal>
            <h2 id="inside-game-heading" className="font-display text-3xl uppercase text-riot-white">
              Inside the Grid
            </h2>
            <p className="mt-4 max-w-2xl leading-relaxed text-riot-text-muted">
              The playing area expands as players advance towards Maximus Mode. Here&apos;s a
              lightweight look at how the grid grows.
            </p>
          </Reveal>
          <Reveal delay={0.06}>
            <div className="mt-10">
              <GridExpansionDemo />
            </div>
          </Reveal>
        </Section>
      )}

      {/* Feature breakdown */}
      {game.featureBreakdown && game.featureBreakdown.length > 0 && (
        <Section gradient aria-labelledby="features-heading">
          <Reveal>
            <h2 id="features-heading" className="font-display text-3xl uppercase text-riot-white">
              Features
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {game.featureBreakdown.map((feature, i) => (
              <Reveal key={feature.title} delay={i * 0.06}>
                <div className={`h-full rounded-xl2 border border-riot-border bg-riot-surface p-7 transition-colors ${a.hoverBorder}`}>
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
        <Section aria-labelledby="highlights-heading">
          <Reveal>
            <h2 id="highlights-heading" className="font-display text-3xl uppercase text-riot-white">
              At a glance
            </h2>
          </Reveal>
          <ul className="mt-8 flex flex-wrap gap-3">
            {game.featureTags.map((tag) => (
              <li
                key={tag}
                className={`rounded-full border ${a.border} bg-riot-surface px-4 py-2 text-sm font-medium text-riot-text`}
              >
                {tag}
              </li>
            ))}
          </ul>
        </Section>
      )}

      {/* Screenshots */}
      {game.screenshots && game.screenshots.length > 0 && (
        <Section aria-labelledby="screens-heading">
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

      {/* Game Passport — clean commercial specification, visually separated */}
      {game.passport && (
        <Section gradient aria-labelledby="passport-heading">
          <Reveal>
            <h2 id="passport-heading" className="font-display text-3xl uppercase text-riot-white">
              Commercial Details
            </h2>
            <p className="mt-4 max-w-2xl leading-relaxed text-riot-text-muted">
              The numbers behind the noise. Verified specification only — anything not yet confirmed
              is left off.
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
      <Section aria-labelledby="game-cta-heading">
        <Reveal>
          <div className="group relative overflow-hidden rounded-xl2 border border-riot-border bg-riot-surface p-8 md:p-12">
            <span className="light-sweep pointer-events-none absolute inset-0" aria-hidden="true" />
            <div className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full bg-riot-pink/20 blur-3xl" />
            <div className="relative max-w-2xl">
              <h2 id="game-cta-heading" className="font-display text-3xl uppercase text-riot-white md:text-4xl">
                Start a Riot With Us.
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-riot-text">
                We work with operators, aggregators and platform providers. Get in touch to talk
                about distribution and partnership.
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

function HeroPlaceholder() {
  return (
    <div className="absolute inset-0 flex items-center justify-center surface-gradient">
      <svg viewBox="0 0 240 150" className="h-full w-full opacity-90" aria-hidden="true">
        <defs>
          <linearGradient id="detail-art" x1="0" y1="0" x2="1" y2="1">
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
            fill="url(#detail-art)"
            fillOpacity={0.18 + i * 0.05}
            stroke="#293543"
          />
        ))}
        <circle cx="120" cy="74" r="24" fill="none" stroke="#18C8F2" strokeWidth="1.5" strokeDasharray="4 8" />
      </svg>
    </div>
  );
}

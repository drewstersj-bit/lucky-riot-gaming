import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { ButtonLink } from "@/components/Button";
import { getDetailPageGames, getGameBySlug } from "@/content/games";
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

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-riot-border surface-gradient">
        <div className="container-page py-16 md:py-24">
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
                <h1 className="mt-3 text-display-lg font-extrabold text-riot-white">{game.title}</h1>
                <p className="mt-3 inline-flex rounded-full border border-riot-pink/40 bg-riot-pink/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-riot-pink">
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

      {/* Feature breakdown */}
      {game.featureBreakdown && game.featureBreakdown.length > 0 && (
        <Section aria-labelledby="features-heading">
          <Reveal>
            <h2 id="features-heading" className="text-display-md font-extrabold text-riot-white">
              Features
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {game.featureBreakdown.map((feature, i) => (
              <Reveal key={feature.title} delay={i * 0.06}>
                <div className="h-full rounded-xl2 border border-riot-border bg-riot-surface p-7">
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
        <Section gradient aria-labelledby="highlights-heading">
          <Reveal>
            <h2 id="highlights-heading" className="text-display-md font-extrabold text-riot-white">
              At a glance
            </h2>
          </Reveal>
          <ul className="mt-8 flex flex-wrap gap-3">
            {game.featureTags.map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-lucky-gold/30 bg-riot-surface px-4 py-2 text-sm font-medium text-riot-text"
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
            <h2 id="screens-heading" className="text-display-md font-extrabold text-riot-white">
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

      {/* Technical + release */}
      {(game.technical?.length || game.release?.label) && (
        <Section gradient aria-labelledby="tech-heading">
          <Reveal>
            <h2 id="tech-heading" className="text-display-md font-extrabold text-riot-white">
              Technical information
            </h2>
          </Reveal>
          <dl className="mt-8 grid gap-x-8 gap-y-4 sm:grid-cols-2">
            {game.release?.label && (
              <div className="flex justify-between border-b border-riot-border py-3">
                <dt className="text-riot-text-muted">Release status</dt>
                <dd className="font-semibold text-riot-white">{game.release.label}</dd>
              </div>
            )}
            {game.technical?.map((row) => (
              <div key={row.label} className="flex justify-between border-b border-riot-border py-3">
                <dt className="text-riot-text-muted">{row.label}</dt>
                <dd className="font-semibold text-riot-white">{row.value}</dd>
              </div>
            ))}
          </dl>
        </Section>
      )}

      {/* Partnership CTA */}
      <Section aria-labelledby="game-cta-heading">
        <Reveal>
          <div className="relative overflow-hidden rounded-xl2 border border-riot-border bg-riot-surface p-8 md:p-12">
            <div className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full bg-riot-pink/20 blur-3xl" />
            <div className="relative max-w-2xl">
              <h2 id="game-cta-heading" className="text-display-md font-extrabold text-riot-white">
                Interested in this title?
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-riot-text">
                We work with operators, aggregators and platform providers. Get in touch to talk
                about distribution and partnership.
              </p>
              <ButtonLink href="/contact/" size="lg" className="mt-8">
                Start a Conversation
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

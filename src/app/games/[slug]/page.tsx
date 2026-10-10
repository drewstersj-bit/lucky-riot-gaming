import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { Streak } from "@/components/Streak";
import { ButtonLink } from "@/components/Button";
import { MaturityBadge } from "@/components/MaturityBadge";
import { getGameBySlug, getDetailPageGames } from "@/content/games";
import { getBySlug, franchiseSiblings, releasePeriodLabel } from "@/content/registry";
import { buildMetadata } from "@/lib/seo";

/**
 * Generic game detail route — the reusable template for planned/roadmap games
 * that do NOT have a bespoke product page. Existing playable games have their
 * own hand-built pages under /games/<slug>/ and are excluded here (they are not
 * returned by getDetailPageGames()).
 */

export const dynamic = "error";
export const dynamicParams = false;

export function generateStaticParams() {
  return getDetailPageGames().map((g) => ({ slug: g.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const game = getGameBySlug(params.slug);
  const rec = getBySlug(params.slug);
  if (!game || !rec) return {};
  return buildMetadata({
    title: game.title,
    description: `${rec.title} — ${rec.theme}. ${rec.description}`,
    path: `/games/${params.slug}`,
  });
}

export default function GameDetailPage({ params }: { params: { slug: string } }) {
  const game = getGameBySlug(params.slug);
  const rec = getBySlug(params.slug);
  if (!game || !rec) notFound();

  const siblings = franchiseSiblings(rec.id).filter((s) => s.websiteEnabled);
  const period = releasePeriodLabel(rec);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-riot-border surface-gradient">
        <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-lucky-gold/10 blur-3xl" />
        <div className="container-page relative py-16 md:py-24">
          <Reveal>
            <Link href="/games/" className="text-sm font-semibold text-riot-text-muted hover:text-riot-cyan">← Back to games</Link>
          </Reveal>
          <div className="mt-6 grid items-center gap-10 lg:grid-cols-2">
            <Reveal>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-lucky-gold">{game.category}</p>
                <h1 className="mt-3 font-display text-[clamp(2.25rem,5vw,4rem)] uppercase leading-[1.05] text-riot-white">{game.title}</h1>
                <Streak className="mt-5" />
                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <MaturityBadge maturity={game.maturity} />
                  <span className="text-xs uppercase tracking-[0.18em] text-riot-text-muted">{period}</span>
                </div>
                <p className="mt-6 max-w-xl text-lg leading-relaxed text-riot-text">{rec.description}</p>
                <p className="mt-3 max-w-xl text-sm uppercase tracking-[0.18em] text-riot-text-muted">Theme — {rec.theme}</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <ButtonLink href="/roadmap/" variant="secondary">View Roadmap</ButtonLink>
                  <ButtonLink href="/contact/" variant="ghost">Enquire About This Title</ButtonLink>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <PlaceholderArt title={rec.title} logo={rec.logo} />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Status note — honest about development stage */}
      <Section aria-labelledby="status-heading">
        <Reveal>
          <div className="rounded-xl2 border border-riot-cyan/40 bg-riot-cyan/5 p-6">
            <h2 id="status-heading" className="text-sm font-bold uppercase tracking-[0.2em] text-riot-cyan">
              {period === "Available" ? "Available" : "Planned Title"}
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-riot-text">
              {game.title} is a planned entry on the Lucky Riot 2027 roadmap. Artwork, mechanics and
              specifications are in development and will be published here as the title progresses.
              Launch periods are provisional roadmap targets, not confirmed release dates.
            </p>
          </div>
        </Reveal>
      </Section>

      {/* Franchise relationships */}
      {siblings.length > 0 && (
        <Section gradient aria-labelledby="franchise-heading">
          <Reveal>
            <h2 id="franchise-heading" className="font-display text-3xl uppercase text-riot-white">In the Same Series</h2>
          </Reveal>
          <ul className="mt-8 flex flex-wrap gap-3">
            {siblings.map((s) => (
              <li key={s.id}>
                <Link
                  href={`/games/${s.slug}/`}
                  className="rounded-full border border-lucky-gold/40 bg-riot-surface px-4 py-2 text-sm font-medium text-riot-text hover:border-lucky-gold hover:text-riot-white"
                >
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      )}

      {/* CTA */}
      <Section gradient aria-labelledby="cta-heading">
        <Reveal>
          <div className="group relative overflow-hidden rounded-xl2 border border-riot-border bg-riot-surface p-8 md:p-12">
            <span className="light-sweep pointer-events-none absolute inset-0" aria-hidden="true" />
            <div className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full bg-riot-pink/20 blur-3xl" />
            <div className="relative max-w-2xl">
              <h2 id="cta-heading" className="font-display text-3xl uppercase text-riot-white md:text-4xl">Start a Riot With Us.</h2>
              <p className="mt-4 text-lg leading-relaxed text-riot-text">
                We work with operators, aggregators and platform providers. Get in touch to talk about {game.title} and the wider Lucky Riot portfolio.
              </p>
              <ButtonLink href="/contact/" size="lg" className="mt-8">Talk to Lucky Riot</ButtonLink>
            </div>
          </div>
        </Reveal>
      </Section>
    </>
  );
}

/**
 * Hero art. If the game has a logo, feature it prominently on a themed backdrop;
 * otherwise fall back to a branded placeholder with the title text.
 */
function PlaceholderArt({ title, logo }: { title: string; logo?: string }) {
  const gradId = `pa-${title.replace(/[^a-z0-9]/gi, "").toLowerCase()}`;
  return (
    <div className="relative aspect-[16/10] overflow-hidden rounded-xl2 border border-riot-border bg-riot-surface shadow-card">
      <div className="absolute inset-0 flex flex-col items-center justify-center surface-gradient p-6 text-center">
        <svg viewBox="0 0 200 120" className="absolute inset-0 h-full w-full opacity-60" aria-hidden="true">
          <defs>
            <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FFC20A" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#FA0597" stopOpacity="0.28" />
            </linearGradient>
          </defs>
          {[40, 100, 160].map((x, i) => (
            <rect key={x} x={x - 22} y={20 + i * 4} width="44" height="80" rx="8" fill={`url(#${gradId})`} fillOpacity={0.12 + i * 0.04} stroke="#293543" />
          ))}
          <circle cx="100" cy="60" r="18" fill="none" stroke="#18C8F2" strokeWidth="1.5" strokeDasharray="3 6" />
        </svg>
        {logo ? (
          <>
            <Image
              src={logo}
              alt={`${title} logo`}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="relative object-contain p-5 drop-shadow-[0_0_40px_rgba(255,193,10,0.45)]"
              priority
            />
            <span className="relative mt-auto text-[10px] font-semibold uppercase tracking-[0.25em] text-riot-text-muted">Key art in development</span>
          </>
        ) : (
          <>
            <span className="relative font-display text-2xl uppercase tracking-wide text-riot-white">{title}</span>
            <span className="relative mt-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-riot-text-muted">Artwork in development</span>
          </>
        )}
      </div>
    </div>
  );
}

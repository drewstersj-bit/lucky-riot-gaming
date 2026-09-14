import { notFound } from "next/navigation";
import Link from "next/link";
import { Section } from "@/components/Section";
import { MaturityBadge } from "@/components/MaturityBadge";
import { customerGames, customerGameSections, getCustomerGame } from "@/content/customer";

interface PageProps {
  params: Promise<{ gameId: string }>;
}

/** Static params for every customer-visible game. Future-proof for game-02, etc. */
export function generateStaticParams() {
  return customerGames.map((g) => ({ gameId: g.gameId }));
}

export default async function CustomerGamePage({ params }: PageProps) {
  const { gameId } = await params;
  const game = getCustomerGame(gameId);
  if (!game) notFound();

  return (
    <Section aria-labelledby="cust-game-heading">
      <Link href="/customer/games/" className="text-sm font-semibold text-riot-text-muted hover:text-riot-cyan">
        ← Your games
      </Link>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <h1 id="cust-game-heading" className="font-display text-3xl uppercase text-riot-white md:text-4xl">
          {game.displayName}
        </h1>
        <MaturityBadge maturity={game.maturity} />
      </div>
      <p className="mt-2 text-xs font-semibold uppercase tracking-[0.18em] text-lucky-gold">
        {game.category}
      </p>

      {/* Section navigation (anchors within this page). Full section pages can be
          split into sub-routes later without changing the information model. */}
      <nav aria-label="Game sections" className="mt-8 flex flex-wrap gap-2">
        {customerGameSections.map((s) =>
          s.id === "play" ? (
            <Link
              key={s.id}
              href={`/customer/games/${gameId}/play/`}
              className="rounded-full border border-riot-border bg-riot-surface px-4 py-2 text-sm font-semibold text-riot-text hover:border-riot-cyan/60"
            >
              {s.label}
            </Link>
          ) : (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="rounded-full border border-riot-border bg-riot-surface px-4 py-2 text-sm font-semibold text-riot-text hover:border-lucky-gold/50"
            >
              {s.label}
            </a>
          ),
        )}
      </nav>

      {/* OVERVIEW */}
      <section id="overview" className="mt-12 scroll-mt-24">
        <h2 className="font-display text-2xl uppercase text-riot-white">Overview</h2>
        <p className="mt-3 max-w-2xl leading-relaxed text-riot-text-muted">{game.overview}</p>
      </section>

      {/* GAME SPEC */}
      <section id="spec" className="mt-12 scroll-mt-24">
        <h2 className="font-display text-2xl uppercase text-riot-white">Game Spec</h2>
        <p className="mt-2 text-xs uppercase tracking-[0.18em] text-riot-text-muted">Provisional — placeholder values</p>
        <dl className="mt-6 max-w-2xl divide-y divide-riot-border overflow-hidden rounded-xl2 border border-riot-border bg-riot-surface">
          {game.spec.map((row) => (
            <div key={row.label} className="flex justify-between gap-6 p-4">
              <dt className="text-sm text-riot-text-muted">{row.label}</dt>
              <dd className="text-sm font-semibold text-riot-white">{row.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* INTEGRATION */}
      <section id="integration" className="mt-12 scroll-mt-24">
        <h2 className="font-display text-2xl uppercase text-riot-white">Integration</h2>
        <p className="mt-3 max-w-2xl leading-relaxed text-riot-text-muted">{game.integrationStatus}</p>
      </section>

      {/* RELEASES */}
      <section id="releases" className="mt-12 scroll-mt-24">
        <h2 className="font-display text-2xl uppercase text-riot-white">Releases</h2>
        <ul className="mt-6 max-w-2xl space-y-3">
          {game.releaseNotes.map((r) => (
            <li key={r.version} className="rounded-xl2 border border-riot-border bg-riot-surface p-4">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-riot-white">v{r.version}</span>
                {r.date && <span className="text-xs text-riot-text-muted">{r.date}</span>}
              </div>
              <p className="mt-1 text-sm text-riot-text-muted">{r.note}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* DOCUMENTATION */}
      <section id="documentation" className="mt-12 scroll-mt-24">
        <h2 className="font-display text-2xl uppercase text-riot-white">Documentation</h2>
        <ul className="mt-6 grid max-w-3xl gap-4 sm:grid-cols-2">
          {game.documentation.map((d) => (
            <li key={d.label} className="rounded-xl2 border border-riot-border bg-riot-surface p-5">
              <p className="font-semibold text-riot-white">{d.label}</p>
              <p className="mt-1 text-sm text-riot-text-muted">{d.note}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* MARKETING ASSETS */}
      <section id="marketing" className="mt-12 scroll-mt-24">
        <h2 className="font-display text-2xl uppercase text-riot-white">Marketing Assets</h2>
        <ul className="mt-6 grid max-w-3xl gap-4 sm:grid-cols-2">
          {game.marketingAssets.map((m) => (
            <li key={m.label} className="rounded-xl2 border border-riot-border bg-riot-surface p-5">
              <p className="font-semibold text-riot-white">{m.label}</p>
              <p className="mt-1 text-sm text-riot-text-muted">{m.note}</p>
            </li>
          ))}
        </ul>
      </section>
    </Section>
  );
}

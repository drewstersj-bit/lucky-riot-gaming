import Link from "next/link";
import { Section } from "@/components/Section";
import { MaturityBadge } from "@/components/MaturityBadge";
import { customerGames } from "@/content/customer";

export default function CustomerGamesPage() {
  return (
    <Section aria-labelledby="cust-games-heading">
      <h1 id="cust-games-heading" className="font-display text-3xl uppercase text-riot-white md:text-4xl">
        Your Games
      </h1>
      <p className="mt-3 max-w-2xl leading-relaxed text-riot-text-muted">
        Games available to your account. Placeholder content.
      </p>

      <ul className="mt-10 divide-y divide-riot-border overflow-hidden rounded-xl2 border border-riot-border bg-riot-surface">
        {customerGames.map((g) => (
          <li key={g.gameId}>
            <Link
              href={`/customer/games/${g.gameId}/`}
              className="flex items-center justify-between gap-4 p-5 transition-colors hover:bg-riot-charcoal/50"
            >
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-lucky-gold">
                  {g.category}
                </p>
                <p className="mt-1 font-bold text-riot-white">{g.displayName}</p>
              </div>
              <MaturityBadge maturity={g.maturity} />
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}

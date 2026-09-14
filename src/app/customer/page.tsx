import Link from "next/link";
import { Section } from "@/components/Section";
import { MaturityBadge } from "@/components/MaturityBadge";
import { customerGames } from "@/content/customer";

export default function CustomerDashboardPage() {
  return (
    <Section aria-labelledby="dash-heading">
      <h1 id="dash-heading" className="font-display text-3xl uppercase text-riot-white md:text-4xl">
        Dashboard
      </h1>
      <p className="mt-3 max-w-2xl leading-relaxed text-riot-text-muted">
        Your Lucky Riot games, statuses and candidate builds. This is a preview of the customer
        experience; content is placeholder until builds and specifications are published.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {customerGames.map((g) => (
          <Link
            key={g.gameId}
            href={`/customer/games/${g.gameId}/`}
            className="group rounded-xl2 border border-riot-border bg-riot-surface p-6 transition-all hover:-translate-y-1 hover:border-lucky-gold/50"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-lucky-gold">
                {g.category}
              </span>
              <MaturityBadge maturity={g.maturity} />
            </div>
            <h2 className="mt-3 text-lg font-bold text-riot-white group-hover:text-lucky-gold">
              {g.displayName}
            </h2>
            <p className="mt-2 text-sm text-riot-text-muted">
              {g.candidateAvailable ? "Candidate build available" : "No candidate build yet"}
            </p>
          </Link>
        ))}
      </div>
    </Section>
  );
}

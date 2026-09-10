import type { GamePassport as GamePassportData } from "@/content/games";

/**
 * Clean commercial-information panel — visually separated from the expressive
 * game presentation. Only supplied values are rendered; missing fields are
 * hidden rather than invented.
 */
export function GamePassport({ passport }: { passport?: GamePassportData }) {
  if (!passport) return null;

  const rows: { label: string; value: string }[] = [];
  const push = (label: string, value?: string) => {
    if (value && value.trim()) rows.push({ label, value });
  };
  const pushList = (label: string, value?: string[]) => {
    if (value && value.length) rows.push({ label, value: value.join(", ") });
  };

  push("Game type", passport.gameType);
  push("Grid / reel format", passport.gridFormat);
  push("Orientation", passport.orientation);
  push("Volatility", passport.volatility);
  pushList("RTP configurations", passport.rtpConfigurations);
  push("Maximum win", passport.maxWin);
  push("Feature summary", passport.featureSummary);
  pushList("Languages", passport.languages);
  pushList("Platforms", passport.platforms);
  pushList("Target markets", passport.targetMarkets);
  push("Certification status", passport.certificationStatus);
  push("Release status", passport.releaseStatus);
  push("Demo availability", passport.demoAvailability);

  if (rows.length === 0) return null;

  return (
    <div className="overflow-hidden rounded-xl2 border border-riot-border bg-riot-charcoal">
      <div className="flex items-center justify-between border-b border-riot-border bg-riot-surface px-6 py-4">
        <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-riot-text">
          Game Passport
        </h3>
        <span className="text-xs font-semibold uppercase tracking-wider text-riot-text-muted">
          Commercial spec
        </span>
      </div>
      <dl className="divide-y divide-riot-border">
        {rows.map((row) => (
          <div key={row.label} className="grid gap-1 px-6 py-4 sm:grid-cols-[minmax(0,10rem)_1fr] sm:gap-6">
            <dt className="text-sm text-riot-text-muted">{row.label}</dt>
            <dd className="text-sm font-semibold text-riot-white">{row.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

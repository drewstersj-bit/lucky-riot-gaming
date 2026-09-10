import type { CategoryAccentKey } from "@/content/games";
import { accentClasses } from "@/lib/accents";
import { GridExpansionDemo } from "./GridExpansionDemo";

interface RiotCard {
  title: string;
  kind: string;
  accent: CategoryAccentKey;
  description: string;
  hasGridDemo?: boolean;
}

/**
 * "Inside the Riot" — modular cards presenting the mechanics, characters and
 * systems behind the games. The first card carries the live grid-expansion
 * demonstration; the rest are informational and clearly labelled as concepts
 * or works in progress where relevant.
 */
export function InsideTheRiot({ cards }: { cards: RiotCard[] }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {cards.map((card) => {
        const a = accentClasses[card.accent];
        const wide = card.hasGridDemo;
        return (
          <article
            key={card.title}
            className={`group relative overflow-hidden rounded-xl2 border border-riot-border bg-riot-surface p-6 shadow-card transition-all duration-300 hover:-translate-y-1 ${a.hoverBorder} ${
              wide ? "md:col-span-2 lg:col-span-1 lg:row-span-2" : ""
            }`}
          >
            <div className="flex items-center gap-3">
              <span className={`inline-flex rounded-lg ${a.bgSoft} px-2.5 py-1 text-xs font-semibold uppercase tracking-wider ${a.text}`}>
                {card.kind}
              </span>
              <span className={`h-2 w-2 rounded-full ${a.dot}`} aria-hidden="true" />
            </div>
            <h3 className="mt-4 text-lg font-bold text-riot-white">{card.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-riot-text-muted">{card.description}</p>

            {card.hasGridDemo && (
              <div className="mt-6">
                <GridExpansionDemo />
              </div>
            )}
          </article>
        );
      })}
    </div>
  );
}

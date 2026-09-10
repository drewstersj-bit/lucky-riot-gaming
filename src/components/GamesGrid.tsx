"use client";

import { useMemo, useState } from "react";
import { GameCard } from "./GameCard";
import { gameFilters, matchesFilter, type Game, type GameFilter } from "@/content/games";

export function GamesGrid({ games }: { games: Game[] }) {
  const [active, setActive] = useState<GameFilter>("All");

  const filtered = useMemo(
    () => games.filter((game) => matchesFilter(game, active)),
    [games, active],
  );

  return (
    <div>
      {/* Filter controls */}
      <div
        role="group"
        aria-label="Filter games"
        className="flex flex-wrap gap-2"
      >
        {gameFilters.map((filter) => {
          const selected = filter === active;
          return (
            <button
              key={filter}
              type="button"
              aria-pressed={selected}
              onClick={() => setActive(filter)}
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                selected
                  ? "border-transparent bg-lucky-gradient text-riot-text-dark shadow-glow-gold"
                  : "border-riot-border bg-riot-surface text-riot-text hover:border-riot-cyan/60 hover:text-riot-white"
              }`}
            >
              {filter}
            </button>
          );
        })}
      </div>

      {/* Results */}
      <div aria-live="polite">
        {filtered.length > 0 ? (
          <ul className="mt-10 grid list-none gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((game) => (
              <li key={game.slug}>
                <GameCard game={game} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-12 rounded-xl2 border border-dashed border-riot-border bg-riot-surface/50 p-10 text-center text-riot-text-muted">
            No games in this category yet. Check back soon, or{" "}
            <a href="/contact/" className="font-semibold text-riot-cyan underline">
              get in touch
            </a>
            .
          </p>
        )}
      </div>
    </div>
  );
}

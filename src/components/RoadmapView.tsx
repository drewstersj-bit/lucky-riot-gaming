"use client";

import { useState } from "react";
import Link from "next/link";

/** Serializable roadmap entry passed from the server page. */
export interface RoadmapEntry {
  id: string;
  slug: string;
  title: string;
  theme: string;
  gameType: "slot" | "video-poker";
  monthLabel: string;
  statusLabel: string;
  statusTone: "concept" | "dev" | "candidate" | "live";
  hasPage: boolean;
}

export interface RoadmapQuarterData {
  quarter: 1 | 2 | 3 | 4;
  entries: RoadmapEntry[];
}

export interface RoadmapYearData {
  year: number;
  quarters: RoadmapQuarterData[];
}

type TypeFilter = "all" | "slot" | "video-poker";

const QUARTER_LABEL: Record<number, string> = { 1: "Q1 · Jan–Mar", 2: "Q2 · Apr–Jun", 3: "Q3 · Jul–Sep", 4: "Q4 · Oct–Dec" };

function toneClasses(tone: RoadmapEntry["statusTone"]): string {
  switch (tone) {
    case "live": return "bg-state-success/15 text-state-success border-state-success/40";
    case "candidate": return "bg-riot-cyan/15 text-riot-cyan border-riot-cyan/40";
    case "concept": return "bg-lucky-gold/15 text-lucky-yellow border-lucky-gold/30";
    default: return "bg-riot-pink/15 text-riot-pink border-riot-pink/40";
  }
}

export function RoadmapView({ years }: { years: RoadmapYearData[] }) {
  const [activeYear, setActiveYear] = useState<number>(years[0]?.year ?? new Date().getFullYear());
  const [type, setType] = useState<TypeFilter>("all");

  const current = years.find((y) => y.year === activeYear) ?? years[0];

  const quarters = (current?.quarters ?? [])
    .map((q) => ({ ...q, entries: q.entries.filter((e) => type === "all" || e.gameType === type) }))
    .filter((q) => q.entries.length > 0);

  return (
    <div>
      {/* Controls */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Year selector */}
        <div role="group" aria-label="Select roadmap year" className="flex flex-wrap gap-2">
          {years.map((y) => {
            const selected = y.year === activeYear;
            return (
              <button
                key={y.year}
                type="button"
                aria-pressed={selected}
                onClick={() => setActiveYear(y.year)}
                className={`rounded-full border px-5 py-2 text-sm font-bold transition-colors ${
                  selected
                    ? "border-transparent bg-lucky-gradient text-riot-text-dark shadow-glow-gold"
                    : "border-riot-border bg-riot-surface text-riot-text hover:border-riot-cyan/60 hover:text-riot-white"
                }`}
              >
                {y.year}
              </button>
            );
          })}
        </div>

        {/* Type filter */}
        <div role="group" aria-label="Filter by game type" className="flex flex-wrap gap-2">
          {([["all", "All"], ["slot", "Slots"], ["video-poker", "Video Poker"]] as const).map(([value, label]) => {
            const selected = type === value;
            return (
              <button
                key={value}
                type="button"
                aria-pressed={selected}
                onClick={() => setType(value)}
                className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                  selected
                    ? "border-riot-cyan bg-riot-cyan/15 text-riot-cyan"
                    : "border-riot-border bg-riot-surface text-riot-text-muted hover:text-riot-white"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Quarters */}
      <div className="mt-10 space-y-10" aria-live="polite">
        {quarters.length === 0 && (
          <p className="rounded-xl2 border border-dashed border-riot-border bg-riot-surface/50 p-10 text-center text-riot-text-muted">
            No titles match this filter for {activeYear}.
          </p>
        )}
        {quarters.map((q) => (
          <section key={q.quarter} aria-label={QUARTER_LABEL[q.quarter]}>
            <div className="flex items-center gap-4">
              <h2 className="font-display text-xl uppercase tracking-wide text-lucky-gold">{QUARTER_LABEL[q.quarter]}</h2>
              <span className="h-px flex-1 bg-riot-border" />
            </div>
            <ul className="mt-6 grid list-none gap-4 md:grid-cols-2 lg:grid-cols-3">
              {q.entries.map((e) => {
                const Card = (
                  <article className="group flex h-full flex-col rounded-xl2 border border-riot-border bg-riot-surface p-5 transition-all duration-300 hover:-translate-y-1 hover:border-lucky-gold/50 hover:shadow-card-hover">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-semibold uppercase tracking-[0.18em] text-riot-text-muted">{e.monthLabel}</span>
                      <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${toneClasses(e.statusTone)}`}>
                        {e.statusLabel}
                      </span>
                    </div>
                    <h3 className="mt-3 text-lg font-bold leading-tight text-riot-white group-hover:text-lucky-gold">{e.title}</h3>
                    <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-riot-cyan">
                      {e.gameType === "video-poker" ? "Video Poker" : "Online Slot"}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-riot-text-muted">{e.theme}</p>
                  </article>
                );
                return (
                  <li key={e.id}>
                    {e.hasPage ? (
                      <Link href={`/games/${e.slug}/`} className="block h-full">{Card}</Link>
                    ) : (
                      Card
                    )}
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}

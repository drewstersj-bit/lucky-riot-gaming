import Link from "next/link";
import type { CategoryAccentKey } from "@/content/games";
import { accentClasses } from "@/lib/accents";
import { CoinMark } from "./brand/marks";

interface CategoryPanel {
  title: string;
  description: string;
  accent: CategoryAccentKey;
  href: string;
}

/** Distinctive category identity icons. */
function CategoryGlyph({ accent }: { accent: CategoryAccentKey }) {
  if (accent === "gold") return <CoinMark className="h-9 w-9" title="" aria-hidden="true" />;
  if (accent === "pink")
    return (
      <svg viewBox="0 0 48 48" className="h-9 w-9" fill="none" aria-hidden="true">
        {/* Card fan for video poker */}
        <rect x="8" y="12" width="18" height="26" rx="3" transform="rotate(-10 17 25)" stroke="currentColor" strokeWidth="2" />
        <rect x="22" y="12" width="18" height="26" rx="3" transform="rotate(10 31 25)" stroke="currentColor" strokeWidth="2" />
        <circle cx="24" cy="25" r="3" fill="currentColor" />
      </svg>
    );
  return (
    <svg viewBox="0 0 48 48" className="h-9 w-9" fill="none" aria-hidden="true">
      {/* Roulette wheel */}
      <circle cx="24" cy="24" r="16" stroke="currentColor" strokeWidth="2" />
      <circle cx="24" cy="24" r="4" fill="currentColor" />
      <line x1="24" y1="8" x2="24" y2="40" stroke="currentColor" strokeWidth="2" />
      <line x1="8" y1="24" x2="40" y2="24" stroke="currentColor" strokeWidth="2" />
      <line x1="12" y1="12" x2="36" y2="36" stroke="currentColor" strokeWidth="2" />
      <line x1="36" y1="12" x2="12" y2="36" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

export function CategoryPanels({ categories }: { categories: CategoryPanel[] }) {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {categories.map((cat) => {
        const a = accentClasses[cat.accent];
        return (
          <Link
            key={cat.title}
            href={cat.href}
            className={`group relative flex flex-col overflow-hidden rounded-xl2 border border-riot-border bg-riot-surface p-7 shadow-card transition-all duration-300 hover:-translate-y-1 ${a.hoverBorder} hover:${a.glow}`}
          >
            {/* Accent light sweep on hover */}
            <span className="light-sweep pointer-events-none absolute inset-0" aria-hidden="true" />
            {/* Top accent bar reveals the category colour */}
            <span
              className={`pointer-events-none absolute inset-x-0 top-0 h-1 origin-left scale-x-0 ${a.dot} transition-transform duration-300 group-hover:scale-x-100`}
              aria-hidden="true"
            />
            <div className={`mb-5 inline-flex rounded-xl bg-riot-charcoal p-3 ring-1 ring-riot-border transition-colors ${a.text}`}>
              <CategoryGlyph accent={cat.accent} />
            </div>
            <h3 className="text-lg font-bold text-riot-white">{cat.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-riot-text-muted">{cat.description}</p>
            <span className={`mt-5 text-sm font-semibold ${a.text}`}>
              Explore
              <span aria-hidden="true" className="ml-1 inline-block transition-transform group-hover:translate-x-1">
                →
              </span>
            </span>
          </Link>
        );
      })}
    </div>
  );
}

interface CategoryCardProps {
  title: string;
  description: string;
  index: number;
}

/** Icon glyphs keyed by index for the three studio categories. */
const glyphs = [
  // Slots — abstract reels
  <g key="slots">
    <rect x="6" y="10" width="10" height="28" rx="3" />
    <rect x="19" y="10" width="10" height="28" rx="3" />
    <rect x="32" y="10" width="10" height="28" rx="3" />
    <circle cx="11" cy="24" r="2.5" fill="#FA0597" stroke="none" />
    <circle cx="24" cy="20" r="2.5" fill="#FFC20A" stroke="none" />
    <circle cx="37" cy="28" r="2.5" fill="#18C8F2" stroke="none" />
  </g>,
  // Video poker — card fan
  <g key="poker">
    <rect x="8" y="12" width="18" height="26" rx="3" transform="rotate(-10 17 25)" />
    <rect x="22" y="12" width="18" height="26" rx="3" transform="rotate(10 31 25)" />
    <circle cx="24" cy="25" r="3" fill="#FA0597" stroke="none" />
  </g>,
  // Roulette — wheel
  <g key="roulette">
    <circle cx="24" cy="24" r="16" />
    <circle cx="24" cy="24" r="4" fill="#18C8F2" stroke="none" />
    <line x1="24" y1="8" x2="24" y2="40" />
    <line x1="8" y1="24" x2="40" y2="24" />
    <line x1="12" y1="12" x2="36" y2="36" />
    <line x1="36" y1="12" x2="12" y2="36" />
  </g>,
];

export function CategoryCard({ title, description, index }: CategoryCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-xl2 border border-riot-border bg-riot-surface p-7 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-lucky-gold/40 hover:shadow-card-hover">
      <div className="mb-5 inline-flex rounded-xl bg-riot-charcoal p-3 text-lucky-gold ring-1 ring-riot-border transition-colors group-hover:text-lucky-yellow">
        <svg
          viewBox="0 0 48 48"
          className="h-10 w-10"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          {glyphs[index % glyphs.length]}
        </svg>
      </div>
      <h3 className="text-lg font-bold text-riot-white">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-riot-text-muted">{description}</p>
    </div>
  );
}

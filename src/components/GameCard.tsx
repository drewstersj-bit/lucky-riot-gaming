import Image from "next/image";
import Link from "next/link";
import type { Game } from "@/content/games";
import { ButtonLink } from "./Button";

function StatusBadge({ status }: { status: Game["status"] }) {
  // Status is always conveyed as a text label (never colour alone).
  // Green: genuinely released. Pink: in development / coming soon. Gold: concept.
  const tone =
    status === "Released"
      ? "bg-state-success/15 text-state-success border-state-success/40"
      : status === "Concept"
        ? "bg-lucky-gold/15 text-lucky-yellow border-lucky-gold/30"
        : "bg-riot-pink/15 text-riot-pink border-riot-pink/40";
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider ${tone}`}
    >
      {status}
    </span>
  );
}

/** Per-card accent: gold for slots, pink for video poker, cyan for roulette. */
function cardAccent(category: Game["category"]): { border: string; label: string } {
  switch (category) {
    case "Online Slot":
      return { border: "hover:border-lucky-gold/50", label: "text-lucky-gold" };
    case "Video Poker":
      return { border: "hover:border-riot-pink/50", label: "text-riot-pink" };
    case "Roulette":
      return { border: "hover:border-riot-cyan/50", label: "text-riot-cyan" };
    default:
      return { border: "hover:border-lucky-gold/50", label: "text-lucky-gold" };
  }
}

export function GameCard({ game }: { game: Game }) {
  const {
    slug,
    title,
    category,
    status,
    description,
    artworkLandscape,
    logo,
    featureTags,
    trailerUrl,
    demoUrl,
    hasDetailPage,
    isConcept,
  } = game;

  const detailHref = hasDetailPage ? `/games/${slug}` : undefined;
  const accent = cardAccent(category);

  return (
    <article
      className={`group relative flex flex-col overflow-hidden rounded-xl2 border border-riot-border bg-riot-surface shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover ${accent.border} ${
        isConcept ? "border-dashed" : ""
      }`}
    >
      {/* Artwork / abstract fallback */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-riot-surface-raised">
        {artworkLandscape ? (
          <Image
            src={artworkLandscape}
            alt={`${title} key artwork`}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
        ) : (
          <AbstractArt title={title} concept={isConcept} />
        )}
        <div className="absolute left-4 top-4 flex items-center gap-2">
          <StatusBadge status={status} />
        </div>
        {logo && (
          <div className="absolute bottom-4 left-4 h-12 w-24">
            <Image src={logo} alt={`${title} logo`} fill className="object-contain object-left" />
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className={`text-xs font-semibold uppercase tracking-[0.18em] ${accent.label}`}>
          {category}
        </p>
        <h3 className="mt-2 text-xl font-bold leading-tight text-riot-white">
          {detailHref ? (
            <Link href={detailHref} className="hover:text-lucky-gold">
              {title}
            </Link>
          ) : (
            title
          )}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-riot-text-muted">{description}</p>

        {featureTags && featureTags.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-2">
            {featureTags.map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-riot-border bg-riot-charcoal/60 px-3 py-1 text-xs font-medium text-riot-text"
              >
                {tag}
              </li>
            ))}
          </ul>
        )}

        {(detailHref || trailerUrl || demoUrl) && (
          <div className="mt-6 flex flex-wrap gap-3 pt-2">
            {detailHref && (
              <ButtonLink href={detailHref} size="md" variant="secondary">
                View Details
              </ButtonLink>
            )}
            {trailerUrl && (
              <ButtonLink href={trailerUrl} size="md" variant="ghost" external>
                Watch Trailer
              </ButtonLink>
            )}
            {demoUrl && (
              <ButtonLink href={demoUrl} size="md" variant="ghost" external>
                Play Demo
              </ButtonLink>
            )}
          </div>
        )}
      </div>
    </article>
  );
}

/** Decorative abstract artwork used when no key art is supplied. */
function AbstractArt({ title, concept }: { title: string; concept?: boolean }) {
  const gradId = `ga-${title.replace(/[^a-z0-9]/gi, "").toLowerCase()}`;
  return (
    <div className="absolute inset-0 flex items-center justify-center surface-gradient">
      <svg viewBox="0 0 200 120" className="h-full w-full opacity-90" aria-hidden="true">
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFC20A" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#FA0597" stopOpacity="0.3" />
          </linearGradient>
        </defs>
        {[40, 100, 160].map((x, i) => (
          <rect
            key={x}
            x={x - 22}
            y={20 + i * 4}
            width="44"
            height="80"
            rx="8"
            fill={`url(#${gradId})`}
            fillOpacity={0.15 + i * 0.05}
            stroke="#293543"
          />
        ))}
        <circle cx="100" cy="60" r="18" fill="none" stroke="#18C8F2" strokeWidth="1.5" strokeDasharray="3 6" />
      </svg>
      {concept && (
        <span className="absolute bottom-3 right-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-riot-text-muted">
          Concept
        </span>
      )}
    </div>
  );
}

import Image from "next/image";
import type { Game } from "@/content/games";
import { accentForCategory } from "@/content/games";
import { accentClasses } from "@/lib/accents";
import { ButtonLink } from "./Button";

/** Large cinematic presentation of the flagship game. */
export function FeaturedGame({ game }: { game: Game }) {
  const a = accentClasses[accentForCategory(game.category)];
  const detailHref = game.hasDetailPage ? `/games/${game.slug}/` : undefined;

  return (
    <div className="group relative overflow-hidden rounded-xl2 border border-riot-border bg-riot-surface shadow-card">
      <span className="light-sweep pointer-events-none absolute inset-0 z-10" aria-hidden="true" />
      <div className="grid lg:grid-cols-2">
        {/* Artwork */}
        <div className="relative min-h-[16rem] overflow-hidden bg-riot-surface-raised lg:min-h-[26rem]">
          {game.artworkLandscape ? (
            <Image
              src={game.artworkLandscape}
              alt={`${game.title} key artwork`}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
          ) : (
            <FeaturedArt />
          )}
          <div className="absolute left-5 top-5 flex flex-wrap items-center gap-2">
            <span className={`inline-flex items-center rounded-full border ${a.border} ${a.bgSoft} px-3 py-1 text-xs font-semibold uppercase tracking-wider ${a.text}`}>
              {game.status}
            </span>
            <span className="inline-flex items-center rounded-full border border-riot-border bg-riot-black/60 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-riot-text-muted">
              Flagship
            </span>
          </div>
          {game.logo && (
            <div className="absolute bottom-5 left-5 h-16 w-40">
              <Image src={game.logo} alt={`${game.title} logo`} fill className="object-contain object-left" />
            </div>
          )}
        </div>

        {/* Details */}
        <div className="flex flex-col justify-center p-7 md:p-10">
          <p className={`text-xs font-semibold uppercase tracking-[0.2em] ${a.text}`}>{game.category}</p>
          <h3 className="mt-3 font-display text-3xl uppercase leading-tight text-riot-white md:text-4xl">
            {game.title}
          </h3>
          <p className="mt-4 text-base leading-relaxed text-riot-text">
            {game.summary ?? game.description}
          </p>

          {game.featureTags && game.featureTags.length > 0 && (
            <ul className="mt-6 flex flex-wrap gap-2">
              {game.featureTags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full border border-riot-border bg-riot-charcoal/60 px-3 py-1 text-xs font-medium text-riot-text"
                >
                  {tag}
                </li>
              ))}
            </ul>
          )}

          <div className="mt-8 flex flex-wrap gap-3">
            {detailHref && (
              <ButtonLink href={detailHref} size="lg">
                Game Details
              </ButtonLink>
            )}
            {game.trailerUrl && (
              <ButtonLink href={game.trailerUrl} size="lg" variant="secondary" external>
                Watch Trailer
              </ButtonLink>
            )}
            {game.demoUrl && (
              <ButtonLink href={game.demoUrl} size="lg" variant="secondary" external>
                Play Demo
              </ButtonLink>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/** Branded abstract art used when no key artwork is supplied yet. */
function FeaturedArt() {
  return (
    <div className="absolute inset-0 flex items-center justify-center surface-gradient">
      <svg viewBox="0 0 320 260" className="h-full w-full opacity-90" aria-hidden="true">
        <defs>
          <linearGradient id="feat-g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFC20A" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#FA0597" stopOpacity="0.3" />
          </linearGradient>
        </defs>
        {[70, 160, 250].map((x, i) => (
          <rect
            key={x}
            x={x - 34}
            y={40 + i * 6}
            width="68"
            height="180"
            rx="12"
            fill="url(#feat-g)"
            fillOpacity={0.16 + i * 0.05}
            stroke="#293543"
          />
        ))}
        <circle cx="160" cy="130" r="34" fill="none" stroke="#18C8F2" strokeWidth="2" strokeDasharray="5 9" />
      </svg>
    </div>
  );
}

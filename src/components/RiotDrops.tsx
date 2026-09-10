import Image from "next/image";
import Link from "next/link";
import type { RiotDrop } from "@/content/riot-drops";
import { accentClasses } from "@/lib/accents";
import { ButtonLink } from "./Button";

/** "Classified" artwork for unannounced drops — branded, not an empty placeholder. */
function ClassifiedArt({ accent }: { accent: RiotDrop["accent"] }) {
  const a = accentClasses[accent];
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-dark-surface-gradient">
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, #fffdf5 0 2px, transparent 2px 14px)",
        }}
      />
      <div className="relative text-center">
        <p className={`font-display text-2xl uppercase tracking-widest ${a.text}`}>Classified</p>
        <p className="mt-1 text-xs uppercase tracking-[0.3em] text-riot-text-muted">Riot Drop incoming</p>
      </div>
    </div>
  );
}

export function RiotDrops({ drops }: { drops: RiotDrop[] }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {drops.map((drop) => {
        const a = accentClasses[drop.accent];
        return (
          <article
            key={drop.id}
            className={`group relative flex flex-col overflow-hidden rounded-xl2 border border-riot-border bg-riot-surface shadow-card transition-all duration-300 hover:-translate-y-1 ${a.hoverBorder}`}
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden">
              {drop.artwork && !drop.classified ? (
                <Image
                  src={drop.artwork}
                  alt={`${drop.title} artwork`}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                  loading="lazy"
                />
              ) : (
                <ClassifiedArt accent={drop.accent} />
              )}
              <span className={`absolute left-4 top-4 inline-flex items-center rounded-full border ${a.border} ${a.bgSoft} px-3 py-1 text-xs font-semibold uppercase tracking-wider ${a.text}`}>
                {drop.status}
              </span>
            </div>

            <div className="flex flex-1 flex-col p-6">
              <p className={`text-xs font-semibold uppercase tracking-[0.18em] ${a.text}`}>{drop.category}</p>
              <h3 className="mt-2 text-lg font-bold leading-tight text-riot-white">
                {drop.href ? (
                  <Link href={drop.href} className="hover:text-lucky-gold">
                    {drop.title}
                  </Link>
                ) : (
                  drop.title
                )}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-riot-text-muted">{drop.teaser}</p>

              {/* Only render dates when confirmed. */}
              {(drop.announcementDate || drop.releasePeriod) && (
                <dl className="mt-4 space-y-1 text-xs text-riot-text-muted">
                  {drop.announcementDate && (
                    <div className="flex justify-between">
                      <dt>Announced</dt>
                      <dd className="font-semibold text-riot-text">{drop.announcementDate}</dd>
                    </div>
                  )}
                  {drop.releasePeriod && (
                    <div className="flex justify-between">
                      <dt>Expected</dt>
                      <dd className="font-semibold text-riot-text">{drop.releasePeriod}</dd>
                    </div>
                  )}
                </dl>
              )}

              <div className="mt-6 flex flex-wrap gap-3">
                {drop.href && (
                  <ButtonLink href={drop.href} size="md" variant="secondary">
                    View
                  </ButtonLink>
                )}
                <ButtonLink href="/contact/#enquiry" size="md" variant="ghost">
                  Notify Me
                </ButtonLink>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}

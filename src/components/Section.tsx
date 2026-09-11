import type { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  /** Adds the warm radial gradient backdrop. */
  gradient?: boolean;
  "aria-labelledby"?: string;
}

export function Section({
  children,
  className,
  id,
  gradient,
  ...rest
}: SectionProps) {
  return (
    <section
      id={id}
      className={[
        "py-16 md:py-24",
        // Plain sections get a light scrim for text legibility over the brand
        // backdrop; `gradient` sections use the stronger surface wash instead.
        gradient ? "surface-gradient" : "bg-riot-black/40",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...rest}
    >
      <div className="container-page">{children}</div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  id,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  id?: string;
}) {
  return (
    <div className="max-w-3xl">
      {eyebrow && (
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-lucky-gold">
          {eyebrow}
        </p>
      )}
      <h2 id={id} className="text-display-md font-extrabold text-riot-white">
        {title}
      </h2>
      {intro && <p className="mt-5 text-lg leading-relaxed text-riot-text-muted">{intro}</p>}
    </div>
  );
}

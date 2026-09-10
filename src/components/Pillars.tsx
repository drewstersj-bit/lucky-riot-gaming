import { Reveal } from "./Reveal";

interface Pillar {
  title: string;
  description: string;
}

export function Pillars({ pillars }: { pillars: Pillar[] }) {
  return (
    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {pillars.map((pillar, i) => (
        <Reveal as="li" key={pillar.title} delay={i * 0.08}>
          <div className="h-full rounded-xl2 border border-riot-border bg-riot-surface/60 p-6 transition-colors hover:border-lucky-gold/40">
            <span className="text-sm font-bold text-lucky-gold">{String(i + 1).padStart(2, "0")}</span>
            <h3 className="mt-3 text-base font-bold text-riot-white">{pillar.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-riot-text-muted">{pillar.description}</p>
          </div>
        </Reveal>
      ))}
    </ul>
  );
}

import { Section } from "./Section";
import { Reveal } from "./Reveal";
import type { LegalSection } from "@/content/legal";
import { lastUpdated } from "@/content/legal";

export function LegalPage({
  title,
  intro,
  sections,
}: {
  title: string;
  intro?: string;
  sections: LegalSection[];
}) {
  return (
    <Section aria-labelledby="legal-heading">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <h1 id="legal-heading" className="text-display-lg font-extrabold text-riot-white">
            {title}
          </h1>
          <p className="mt-3 text-sm text-riot-text-muted">Last updated: {lastUpdated}</p>
          {intro && <p className="mt-6 text-lg leading-relaxed text-riot-text">{intro}</p>}
        </Reveal>

        <div className="mt-10 space-y-10">
          {sections.map((section, i) => (
            <Reveal key={section.heading} delay={i * 0.04}>
              <section>
                <h2 className="text-xl font-bold text-riot-white">{section.heading}</h2>
                {section.paragraphs.map((p, idx) => (
                  <p key={idx} className="mt-3 leading-relaxed text-riot-text-muted">
                    {p}
                  </p>
                ))}
                {section.bullets && (
                  <ul className="mt-4 list-disc space-y-2 pl-6 text-riot-text-muted">
                    {section.bullets.map((b, idx) => (
                      <li key={idx}>{b}</li>
                    ))}
                  </ul>
                )}
              </section>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}

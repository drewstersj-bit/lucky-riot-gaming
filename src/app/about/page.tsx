import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { ButtonLink } from "@/components/Button";
import { aboutIntro, aboutSections } from "@/content/about";
import { siteConfig } from "@/content/site";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "About the Studio",
  description:
    "Lucky Riot Games develops online games with stronger ideas, clearer identities and more memorable entertainment, combining experienced developers with modern production.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <Section aria-labelledby="about-heading">
        <Reveal>
          <div className="max-w-3xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-lucky-gold">
              About us
            </p>
            <h1 className="text-display-lg font-extrabold text-riot-white">
              A studio built around stronger ideas.
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-riot-text">{aboutIntro}</p>
          </div>
        </Reveal>
      </Section>

      <Section gradient aria-labelledby="what-we-do-heading">
        <Reveal>
          <SectionHeading id="what-we-do-heading" eyebrow="What we do" title="How we work" />
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {aboutSections.map((section, i) => (
            <Reveal key={section.heading} delay={i * 0.06}>
              <article className="h-full rounded-xl2 border border-riot-border bg-riot-surface p-7">
                <h2 className="text-lg font-bold text-riot-white">{section.heading}</h2>
                <p className="mt-3 text-sm leading-relaxed text-riot-text-muted">{section.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section aria-labelledby="company-heading">
        <Reveal>
          <SectionHeading id="company-heading" eyebrow="The details" title="Company information" />
        </Reveal>
        <Reveal delay={0.06}>
          <dl className="mt-8 max-w-2xl divide-y divide-riot-border rounded-xl2 border border-riot-border bg-riot-surface">
            <div className="flex flex-col gap-1 p-5 sm:flex-row sm:justify-between">
              <dt className="text-sm text-riot-text-muted">Registered name</dt>
              <dd className="font-semibold text-riot-white">{siteConfig.legal.entityName}</dd>
            </div>
            <div className="flex flex-col gap-1 p-5 sm:flex-row sm:justify-between">
              <dt className="text-sm text-riot-text-muted">Company number</dt>
              <dd className="font-semibold text-riot-white">{siteConfig.legal.companyNumber}</dd>
            </div>
            <div className="flex flex-col gap-1 p-5 sm:flex-row sm:justify-between">
              <dt className="text-sm text-riot-text-muted">Incorporated</dt>
              <dd className="font-semibold text-riot-white">{siteConfig.legal.incorporatedOn}</dd>
            </div>
            <div className="flex flex-col gap-1 p-5 sm:flex-row sm:justify-between">
              <dt className="text-sm text-riot-text-muted">Registered office</dt>
              <dd className="font-semibold text-riot-white sm:text-right">
                {siteConfig.legal.registeredOffice}
              </dd>
            </div>
          </dl>
        </Reveal>
      </Section>

      <Section gradient aria-labelledby="about-cta-heading">
        <Reveal>
          <div className="relative overflow-hidden rounded-xl2 border border-riot-border bg-riot-surface p-8 md:p-12">
            <div className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full bg-lucky-gold/15 blur-3xl" />
            <div className="relative max-w-2xl">
              <h2 id="about-cta-heading" className="text-display-md font-extrabold text-riot-white">
                Let&apos;s build something distinctive.
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-riot-text">
                We&apos;re open to conversations with operators, aggregators, platform providers and
                partners across the industry.
              </p>
              <ButtonLink href="/contact/" size="lg" className="mt-8">
                Start a Conversation
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </Section>
    </>
  );
}

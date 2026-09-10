import type { Metadata } from "next";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { ContactForm } from "@/components/ContactForm";
import { contactContent, areaOfInterestOptions } from "@/content/contact";
import { siteConfig } from "@/content/site";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Partnership Enquiries",
  description:
    "Contact Lucky Riot Games about game distribution, operator partnerships, aggregation, technology, investment, press or careers.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <Section aria-labelledby="contact-heading">
      {/*
        Hidden static form for Netlify's build-time form detection.
        Netlify scans the deployed HTML for a form with data-netlify="true";
        the interactive React form submits to this same form name.
      */}
      <form name={contactContent.formName} data-netlify="true" data-netlify-honeypot="bot-field" hidden>
        <input type="text" name="name" />
        <input type="text" name="company" />
        <input type="email" name="email" />
        <select name="interest">
          {areaOfInterestOptions.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        <textarea name="message"></textarea>
        <input type="checkbox" name="consent" />
        <input name="bot-field" />
      </form>

      <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
        <Reveal>
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-lucky-gold">
              Get in touch
            </p>
            <h1 id="contact-heading" className="text-display-lg font-extrabold text-riot-white">
              {contactContent.heading}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-riot-text">{contactContent.intro}</p>

            <div className="mt-8 rounded-xl2 border border-riot-border bg-riot-surface/60 p-6">
              <p className="text-sm font-semibold text-riot-text">Prefer email?</p>
              <a
                href={`mailto:${siteConfig.email}`}
                className="mt-1 inline-block text-lg font-bold text-riot-cyan hover:text-riot-cyan/80"
              >
                {siteConfig.email}
              </a>
              {!siteConfig.emailConfirmed && (
                <p className="mt-2 text-xs text-riot-text-muted">
                  Configured address — confirm the mailbox is active before publishing.
                </p>
              )}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div id="enquiry" className="scroll-mt-24 rounded-xl2 border border-riot-border bg-riot-surface p-6 md:p-8 shadow-card">
            <ContactForm />
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

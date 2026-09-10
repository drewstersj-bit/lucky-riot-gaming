import type { Metadata } from "next";
import { Section } from "@/components/Section";
import { ButtonLink } from "@/components/Button";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...buildMetadata({
    title: "Enquiry Received",
    description: "Thank you for contacting Lucky Riot Games. We'll be in touch shortly.",
    path: "/contact/success",
  }),
  robots: { index: false, follow: false },
};

export default function ContactSuccessPage() {
  return (
    <Section aria-labelledby="success-heading">
      <div className="mx-auto max-w-2xl text-center">
        <div className="mx-auto mb-8 inline-flex rounded-full bg-lucky-gold/15 p-5 ring-1 ring-lucky-gold/30">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#FFC20A" strokeWidth="2" aria-hidden="true">
            <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h1 id="success-heading" className="text-display-lg font-extrabold text-riot-white">
          Enquiry received.
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-riot-text">
          Thank you for reaching out to Lucky Riot Games. We&apos;ve received your message and will
          be in touch as soon as we can.
        </p>
        <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
          <ButtonLink href="/games/" size="lg">
            Explore Our Games
          </ButtonLink>
          <ButtonLink href="/" size="lg" variant="secondary">
            Back to Home
          </ButtonLink>
        </div>
      </div>
    </Section>
  );
}

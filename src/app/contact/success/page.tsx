import type { Metadata } from "next";
import { Section } from "@/components/Section";
import { ButtonLink } from "@/components/Button";
import { Mascot } from "@/components/brand/Mascot";
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
        <div className="mx-auto mb-6">
          <Mascot variant="character" size={180} alt="Lucky celebrating your enquiry" />
        </div>
        <h1 id="success-heading" className="font-display text-[clamp(2rem,5vw,3.25rem)] uppercase text-riot-white">
          Message Received. Lucky&apos;s On It.
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-riot-text">
          Thanks for reaching out to Lucky Riot Games. We&apos;ve got your message and will be in
          touch as soon as we can.
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

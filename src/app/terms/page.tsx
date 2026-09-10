import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { termsContent } from "@/content/legal";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Website Terms",
  description: "The terms that apply to your use of the Lucky Riot Games website.",
  path: "/terms",
});

export default function TermsPage() {
  return <LegalPage title="Website Terms" sections={termsContent} />;
}

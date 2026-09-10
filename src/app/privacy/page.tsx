import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { privacyContent } from "@/content/legal";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description: "How Lucky Riot Games handles information collected through this website.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return <LegalPage title="Privacy Policy" sections={privacyContent} />;
}

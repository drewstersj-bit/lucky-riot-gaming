import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { cookiesContent } from "@/content/legal";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Cookie Policy",
  description: "How Lucky Riot Games uses essential and optional cookies on this website.",
  path: "/cookies",
});

export default function CookiesPage() {
  return (
    <LegalPage
      title="Cookie Policy"
      intro="We keep cookies to a minimum. Optional analytics cookies are only loaded after you accept them."
      sections={cookiesContent}
    />
  );
}

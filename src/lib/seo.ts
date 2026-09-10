import type { Metadata } from "next";
import { siteConfig } from "@/content/site";

interface PageSeo {
  title: string;
  description: string;
  /** Path beginning with "/" — used for canonical + OG url. */
  path: string;
}

/**
 * Build per-page metadata with a unique title, description, canonical URL and
 * Open Graph / Twitter card data.
 */
export function buildMetadata({ title, description, path }: PageSeo): Metadata {
  const url = new URL(path, siteConfig.url).toString();
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      locale: "en_GB",
      type: "website",
      images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: siteConfig.name }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [siteConfig.ogImage],
    },
  };
}

/** Organization structured data (JSON-LD). */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    legalName: siteConfig.legal.entityName,
    url: siteConfig.url,
    description: siteConfig.description,
    logo: new URL("/icon.svg", siteConfig.url).toString(),
    foundingDate: "2020-09-16",
    address: {
      "@type": "PostalAddress",
      streetAddress: "7 Stamford Square",
      addressLocality: "Ashton-Under-Lyne",
      addressRegion: "Lancashire",
      postalCode: "OL6 6QU",
      addressCountry: "GB",
    },
    ...(siteConfig.social.linkedin ? { sameAs: [siteConfig.social.linkedin] } : {}),
  };
}

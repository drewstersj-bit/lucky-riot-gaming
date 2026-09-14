import type { MetadataRoute } from "next";
import { siteConfig } from "@/content/site";
import { getDetailPageGames, getProductPageGames } from "@/content/games";

export const dynamic = "force-static";

/**
 * Public sitemap. Deliberately EXCLUDES:
 *   - /games/<id>/dev/       (internal playtest — noindex)
 *   - /games/<id>/play/      (public demo — SEO decided at release stage)
 *   - /customer/*            (customer portal — noindex)
 * Only the public catalogue, product pages and marketing pages are listed.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url.replace(/\/$/, "");
  const staticPaths = ["", "/games", "/about", "/contact", "/privacy", "/cookies", "/terms"];

  const staticEntries: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: `${base}${path}/`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.7,
  }));

  // Generic [slug] detail pages + bespoke product pages (both public/indexable).
  const gameSlugs = new Set<string>([
    ...getDetailPageGames().map((g) => g.slug),
    ...getProductPageGames().map((g) => g.slug),
  ]);

  const gameEntries: MetadataRoute.Sitemap = [...gameSlugs].map((slug) => ({
    url: `${base}/games/${slug}/`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticEntries, ...gameEntries];
}

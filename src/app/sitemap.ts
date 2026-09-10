import type { MetadataRoute } from "next";
import { siteConfig } from "@/content/site";
import { getDetailPageGames } from "@/content/games";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url.replace(/\/$/, "");
  const staticPaths = ["", "/games", "/about", "/contact", "/privacy", "/cookies", "/terms"];

  const staticEntries: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: `${base}${path}/`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.7,
  }));

  const gameEntries: MetadataRoute.Sitemap = getDetailPageGames().map((game) => ({
    url: `${base}/games/${game.slug}/`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticEntries, ...gameEntries];
}

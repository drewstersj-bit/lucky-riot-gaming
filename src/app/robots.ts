import type { MetadataRoute } from "next";
import { siteConfig } from "@/content/site";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  const base = siteConfig.url.replace(/\/$/, "");
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Keep internal/customer areas out of crawlers. Individual pages also set
      // a noindex robots meta tag; these Disallow rules are belt-and-braces.
      disallow: ["/customer/", "/games/cluckus-maximus/dev/"],
    },
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}

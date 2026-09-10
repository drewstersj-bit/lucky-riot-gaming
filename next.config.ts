import type { NextConfig } from "next";

/**
 * Static export configuration for Netlify.
 *
 * - `output: "export"` produces a fully static site in the `out/` directory
 *   with no server-side rendering, which Netlify serves directly.
 * - `images.unoptimized` is required because the Next.js image optimisation
 *   server is not available in a static export.
 * - `trailingSlash` keeps exported routes as directory-style paths
 *   (e.g. /games/ -> /games/index.html) which plays nicely with static hosts.
 */
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;

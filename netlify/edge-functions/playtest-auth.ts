/**
 * Netlify Edge Function — HTTP Basic Auth for the internal PLAYTEST route.
 *
 * Enforced at the edge BEFORE any static file is served, so unauthenticated
 * users never receive the wrapper page OR the game HTML/assets. This is genuine
 * server/edge-enforced access control — NOT client-side JavaScript.
 *
 * Protected paths (see netlify.toml [[edge_functions]] `path` globs):
 *   /games/cluckus-maximus/dev
 *   /games/cluckus-maximus/dev/*        (includes /dev/game/* assets)
 *
 * Credentials come ONLY from Netlify environment variables — never hard-coded,
 * never in the repo, never in client JS:
 *   PLAYTEST_AUTH_USER
 *   PLAYTEST_AUTH_PASS
 *
 * If the env vars are not set, the route is BLOCKED (fail-closed) so a
 * misconfiguration can never accidentally expose the build.
 */

export default async (request: Request): Promise<Response | undefined> => {
  const user = Netlify.env.get("PLAYTEST_AUTH_USER");
  const pass = Netlify.env.get("PLAYTEST_AUTH_PASS");

  // Fail closed: if credentials aren't configured, deny access entirely.
  if (!user || !pass) {
    return new Response("Playtest access is not configured.", {
      status: 503,
      headers: { "content-type": "text/plain; charset=utf-8" },
    });
  }

  const header = request.headers.get("authorization") ?? "";
  const [scheme, encoded] = header.split(" ");

  if (scheme === "Basic" && encoded) {
    let decoded = "";
    try {
      decoded = atob(encoded);
    } catch {
      decoded = "";
    }
    const sep = decoded.indexOf(":");
    const suppliedUser = sep >= 0 ? decoded.slice(0, sep) : "";
    const suppliedPass = sep >= 0 ? decoded.slice(sep + 1) : "";

    if (safeEqual(suppliedUser, user) && safeEqual(suppliedPass, pass)) {
      // Authorised — let the request continue to the static asset.
      return undefined;
    }
  }

  // Not authorised — challenge with Basic Auth. Include noindex for good measure.
  return new Response("Authentication required.", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Lucky Riot Playtest", charset="UTF-8"',
      "content-type": "text/plain; charset=utf-8",
      "X-Robots-Tag": "noindex, nofollow, noarchive",
      "cache-control": "no-store",
    },
  });
};

/** Constant-time-ish string comparison to reduce timing leakage. */
function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}

// Netlify global typing shim (avoids needing the full Netlify Edge types dep).
declare const Netlify: { env: { get(key: string): string | undefined } };

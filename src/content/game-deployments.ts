import fs from "node:fs";
import path from "node:path";
import type { GameBuildProfile, GameDeploymentManifest } from "./games";

/**
 * Game deployment registry (website side).
 *
 * The website consumes deployment manifests produced by the Lucky Riot
 * game-engine repository. It NEVER contains game implementation detail, maths,
 * fixtures or source.
 *
 * PLAYTEST is wired to read the artefact's own `manifest.json` at BUILD TIME
 * from the drop-in folder (`public/games/cluckus-maximus/dev/game/`). If a valid
 * manifest is present it is consumed (version/build id/date are NOT hard-coded).
 * If the folder is empty, PLAYTEST stays `available: false` and the UI shows a
 * clean placeholder. CUSTOMER and PUBLIC remain unavailable in this phase.
 *
 * This module is only evaluated on the server during the static export/build,
 * so the synchronous filesystem read is safe and deterministic.
 *
 * Keyed by `${gameId}:${buildProfile}`.
 */

function key(gameId: string, profile: GameBuildProfile): string {
  return `${gameId}:${profile}`;
}

/** Shape emitted by the game-engine artefact's manifest.json (best-effort). */
interface EngineManifest {
  gameId?: string;
  displayName?: string;
  version?: string;
  buildType?: string;
  entryPoint?: string;
  assetsBasePath?: string;
  // Common build-metadata fields (any subset may be present).
  buildId?: string;
  buildDate?: string;
  builtAt?: string;
  commit?: string;
  channel?: string;
  buildMetadata?: Record<string, string>;
  available?: boolean;
  [k: string]: unknown;
}

/**
 * Public URL path where the PLAYTEST artefact is hosted, and the on-disk path
 * of its manifest (inside public/, copied to out/ at build).
 */
const PLAYTEST_PUBLIC_BASE = "/games/cluckus-maximus/dev/game/";
const PLAYTEST_MANIFEST_DISK = path.join(
  process.cwd(),
  "public",
  "games",
  "cluckus-maximus",
  "dev",
  "game",
  "manifest.json",
);

/**
 * Attempt to read + validate the PLAYTEST artefact manifest at build time.
 * Returns a fully-populated manifest with `available: true` only when the
 * artefact and a valid manifest are actually present.
 */
function readPlaytestManifest(): GameDeploymentManifest {
  const fallback: GameDeploymentManifest = {
    gameId: "cluckus-maximus",
    displayName: "Cluckus Maximus: Eggspander",
    version: "0.0.0-placeholder",
    buildType: "PLAYTEST",
    entryPoint: "",
    assetsBasePath: PLAYTEST_PUBLIC_BASE,
    available: false,
  };

  try {
    if (!fs.existsSync(PLAYTEST_MANIFEST_DISK)) return fallback;
    const raw = fs.readFileSync(PLAYTEST_MANIFEST_DISK, "utf8");
    const m = JSON.parse(raw) as EngineManifest;

    // Validate the required invariants before marking available.
    const okGame = m.gameId === "cluckus-maximus";
    const okType = (m.buildType ?? "").toUpperCase() === "PLAYTEST";
    const okAvailable = m.available !== false; // treat missing as available
    if (!okGame || !okType || !okAvailable) return fallback;

    // Also require the entry HTML to actually exist on disk.
    const entryFile = m.entryPoint && m.entryPoint.trim() ? m.entryPoint : "index.html";
    const entryDisk = path.join(path.dirname(PLAYTEST_MANIFEST_DISK), entryFile);
    if (!fs.existsSync(entryDisk)) return fallback;

    const buildMetadata: Record<string, string> = { ...(m.buildMetadata ?? {}) };
    if (m.buildId) buildMetadata.buildId = m.buildId;
    if (m.commit) buildMetadata.commit = m.commit;
    if (m.channel) buildMetadata.channel = m.channel;
    const buildDate = m.buildDate ?? m.builtAt;
    if (buildDate) buildMetadata.buildDate = buildDate;

    return {
      gameId: "cluckus-maximus",
      displayName: m.displayName?.trim() || fallback.displayName,
      version: m.version?.trim() || "unknown",
      buildType: "PLAYTEST",
      // Served as a same-origin relative URL from the wrapper page.
      entryPoint: `${PLAYTEST_PUBLIC_BASE}${entryFile}`,
      assetsBasePath: PLAYTEST_PUBLIC_BASE,
      buildMetadata: Object.keys(buildMetadata).length ? buildMetadata : undefined,
      available: true,
    };
  } catch {
    // Malformed manifest → stay safely unavailable.
    return fallback;
  }
}

const registry: Record<string, GameDeploymentManifest> = {
  [key("cluckus-maximus", "PLAYTEST")]: readPlaytestManifest(),
  // CUSTOMER build is NOT activated in this phase.
  [key("cluckus-maximus", "CUSTOMER")]: {
    gameId: "cluckus-maximus",
    displayName: "Cluckus Maximus: Eggspander",
    version: "0.0.0-placeholder",
    buildType: "CUSTOMER",
    entryPoint: "",
    assetsBasePath: "/customer/games/cluckus-maximus/play/",
    available: false,
  },
  // PUBLIC demo is NOT activated in this phase.
  [key("cluckus-maximus", "PUBLIC")]: {
    gameId: "cluckus-maximus",
    displayName: "Cluckus Maximus: Eggspander",
    version: "0.0.0-placeholder",
    buildType: "PUBLIC",
    entryPoint: "",
    assetsBasePath: "/games/cluckus-maximus/play/",
    available: false,
  },
};

/** Look up a deployment manifest, or undefined if none is registered. */
export function getDeployment(
  gameId: string,
  profile: GameBuildProfile,
): GameDeploymentManifest | undefined {
  return registry[key(gameId, profile)];
}

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
 * PLAYTEST and PUBLIC builds are wired to read the artefact's own
 * `manifest.json` at BUILD TIME from the drop-in folders:
 *   PLAYTEST → public/games/<gameId>/dev/game/
 *   PUBLIC   → public/games/<gameId>/play/game/
 * If a valid manifest is present it is consumed (version/build id/date are NOT
 * hard-coded). If the folder is empty, the profile stays `available: false` and
 * the UI shows a clean placeholder. CUSTOMER remains unavailable in this phase.
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

/** Public URL base + on-disk manifest path for a game's artefact drop-in. */
function artefactPaths(gameId: string, profile: "PLAYTEST" | "PUBLIC") {
  const segment = profile === "PLAYTEST" ? "dev" : "play";
  const publicBase = `/games/${gameId}/${segment}/game/`;
  const manifestDisk = path.join(
    process.cwd(),
    "public",
    "games",
    gameId,
    segment,
    "game",
    "manifest.json",
  );
  return { publicBase, manifestDisk };
}

/**
 * Read + validate an artefact manifest at build time. Returns a manifest with
 * `available: true` only when the artefact AND a valid manifest of the matching
 * build type are actually present on disk (entry HTML must exist too).
 */
function readManifest(
  gameId: string,
  displayName: string,
  profile: "PLAYTEST" | "PUBLIC",
): GameDeploymentManifest {
  const { publicBase, manifestDisk } = artefactPaths(gameId, profile);

  const fallback: GameDeploymentManifest = {
    gameId,
    displayName,
    version: "0.0.0-placeholder",
    buildType: profile,
    entryPoint: "",
    assetsBasePath: publicBase,
    available: false,
  };

  try {
    if (!fs.existsSync(manifestDisk)) return fallback;
    const raw = fs.readFileSync(manifestDisk, "utf8");
    const m = JSON.parse(raw) as EngineManifest;

    const okGame = m.gameId === gameId;
    const okType = (m.buildType ?? "").toUpperCase() === profile;
    const okAvailable = m.available !== false; // treat missing as available
    if (!okGame || !okType || !okAvailable) return fallback;

    // Require the entry HTML to actually exist on disk.
    const entryFile = m.entryPoint && m.entryPoint.trim() ? m.entryPoint : "index.html";
    const entryDisk = path.join(path.dirname(manifestDisk), entryFile);
    if (!fs.existsSync(entryDisk)) return fallback;

    const buildMetadata: Record<string, string> = { ...(m.buildMetadata ?? {}) };
    if (m.buildId) buildMetadata.buildId = m.buildId;
    if (m.commit) buildMetadata.commit = m.commit;
    if (m.channel) buildMetadata.channel = m.channel;
    const buildDate = m.buildDate ?? m.builtAt;
    if (buildDate) buildMetadata.buildDate = buildDate;

    return {
      gameId,
      displayName: m.displayName?.trim() || fallback.displayName,
      version: m.version?.trim() || "unknown",
      buildType: profile,
      // Served as a same-origin relative URL from the wrapper page.
      entryPoint: `${publicBase}${entryFile}`,
      assetsBasePath: publicBase,
      buildMetadata: Object.keys(buildMetadata).length ? buildMetadata : undefined,
      available: true,
    };
  } catch {
    // Malformed manifest → stay safely unavailable.
    return fallback;
  }
}

/** CUSTOMER placeholder (not activated yet). */
function customerUnavailable(gameId: string, displayName: string): GameDeploymentManifest {
  return {
    gameId,
    displayName,
    version: "0.0.0-placeholder",
    buildType: "CUSTOMER",
    entryPoint: "",
    assetsBasePath: `/customer/games/${gameId}/play/`,
    available: false,
  };
}

const registry: Record<string, GameDeploymentManifest> = {
  // --- Cluckus Maximus ---------------------------------------------------
  [key("cluckus-maximus", "PLAYTEST")]: readManifest(
    "cluckus-maximus",
    "Cluckus Maximus: Eggspander",
    "PLAYTEST",
  ),
  [key("cluckus-maximus", "CUSTOMER")]: customerUnavailable(
    "cluckus-maximus",
    "Cluckus Maximus: Eggspander",
  ),
  [key("cluckus-maximus", "PUBLIC")]: readManifest(
    "cluckus-maximus",
    "Cluckus Maximus: Eggspander",
    "PUBLIC",
  ),

  // --- MegaBars ----------------------------------------------------------
  [key("megabars", "PLAYTEST")]: readManifest("megabars", "MegaBars", "PLAYTEST"),
  [key("megabars", "CUSTOMER")]: customerUnavailable("megabars", "MegaBars"),
  [key("megabars", "PUBLIC")]: readManifest("megabars", "MegaBars", "PUBLIC"),
};

/** Look up a deployment manifest, or undefined if none is registered. */
export function getDeployment(
  gameId: string,
  profile: GameBuildProfile,
): GameDeploymentManifest | undefined {
  return registry[key(gameId, profile)];
}

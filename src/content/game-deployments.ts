import type { GameBuildProfile, GameDeploymentManifest } from "./games";

/**
 * Game deployment registry (website side).
 *
 * The website consumes deployment manifests produced by the Lucky Riot
 * game-engine repository. It NEVER contains game implementation detail, maths,
 * fixtures or source. Until the engine emits real artefacts, every entry is
 * marked `available: false` and the UI shows a clearly-labelled placeholder.
 *
 * When the engine build is wired up, these manifests will be populated (ideally
 * generated at deploy time from an engine-emitted manifest file) with real
 * `entryPoint` / `assetsBasePath` / `version` values. See the checkpoint's
 * "GAME-ENGINE CHANGES REQUIRED" section for the exact contract.
 *
 * Keyed by `${gameId}:${buildProfile}`.
 */

function key(gameId: string, profile: GameBuildProfile): string {
  return `${gameId}:${profile}`;
}

const registry: Record<string, GameDeploymentManifest> = {
  [key("cluckus-maximus", "PLAYTEST")]: {
    gameId: "cluckus-maximus",
    displayName: "Cluckus Maximus: Eggspander",
    version: "0.0.0-placeholder",
    buildType: "PLAYTEST",
    entryPoint: "",
    assetsBasePath: "/games/cluckus-maximus/dev/",
    available: false,
  },
  [key("cluckus-maximus", "CUSTOMER")]: {
    gameId: "cluckus-maximus",
    displayName: "Cluckus Maximus: Eggspander",
    version: "0.0.0-placeholder",
    buildType: "CUSTOMER",
    entryPoint: "",
    assetsBasePath: "/customer/games/cluckus-maximus/play/",
    available: false,
  },
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

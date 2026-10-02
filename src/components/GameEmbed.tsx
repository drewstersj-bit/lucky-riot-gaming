import type { GameDeploymentManifest } from "@/content/games";
import { CoinLoader } from "./brand/CoinLoader";

/**
 * Generic game embed surface.
 *
 * Given a deployment manifest, this either:
 *  - embeds the game artefact's entry point in a sandboxed iframe (when a real
 *    build is wired and `available` is true), or
 *  - shows a clean, clearly-labelled placeholder (until the game-engine
 *    repository provides a deployable artefact).
 *
 * The website never contains game implementation detail — it only hosts the
 * artefact referenced by the manifest. What the artefact is *allowed* to
 * contain is governed by its build profile (see `buildProfiles`).
 */
export function GameEmbed({
  manifest,
  title,
  /**
   * Sizing.
   *  - "aspect"     16:9 box (good for cards/previews).
   *  - "viewport"   tall responsive height suited to a playable game.
   *  - "fullscreen" fills the available viewport (minus any surrounding chrome)
   *                 so a phone sees a near-native, edge-to-edge game. Uses the
   *                 dynamic viewport unit (dvh) so mobile browser bars don't
   *                 clip it.
   */
  sizing = "aspect",
}: {
  manifest: GameDeploymentManifest | undefined;
  title: string;
  sizing?: "aspect" | "viewport" | "fullscreen";
}) {
  const available = manifest?.available && manifest.entryPoint;

  const frameClass =
    sizing === "fullscreen"
      ? "relative w-full overflow-hidden bg-riot-black"
      : sizing === "viewport"
        ? "relative w-full overflow-hidden rounded-xl2 border border-riot-border bg-riot-black h-[70vh] min-h-[420px] max-h-[900px]"
        : "relative aspect-video w-full overflow-hidden rounded-xl2 border border-riot-border bg-riot-black";

  // Fullscreen height is set with an inline style (not a Tailwind arbitrary
  // class) so it always applies regardless of the content scanner. The subtracted
  // 3.5rem accounts for the slim back-bar above the game; the site header sits
  // above that. `100dvh` tracks the dynamic viewport so mobile browser chrome
  // doesn't clip the game.
  const frameStyle =
    sizing === "fullscreen" ? { height: "calc(100dvh - 3.5rem)", minHeight: "420px" } : undefined;

  return (
    <div className={frameClass} style={frameStyle}>
      {available ? (
        <iframe
          src={manifest!.entryPoint}
          title={`${title} — ${manifest!.buildType.toLowerCase()} build`}
          className="absolute inset-0 h-full w-full border-0"
          // Restrict what the embedded artefact can do. Loosen only as the
          // engine build genuinely requires (documented in the contract).
          // - allow-scripts + allow-same-origin: the game runs and reads its
          //   own same-origin assets (books.json, manifest.json, assets/).
          sandbox="allow-scripts allow-same-origin"
          // Media + fullscreen permissions the game needs. `allowFullScreen`
          // (boolean attr) is required alongside allow="fullscreen" for the
          // game's own fullscreen button to work cross-browser.
          allow="autoplay; fullscreen"
          allowFullScreen
          loading="lazy"
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-8 text-center">
          <CoinLoader size={40} label="Awaiting build" />
          <p className="font-display text-xl uppercase text-riot-white">Build Not Yet Wired</p>
          <p className="max-w-md text-sm leading-relaxed text-riot-text-muted">
            This slot is ready to host the game once the Lucky Riot engine publishes a deployable
            artefact for this build profile. No game is embedded yet.
          </p>
          <p className="text-xs uppercase tracking-[0.2em] text-riot-text-muted/70">Placeholder</p>
        </div>
      )}
    </div>
  );
}

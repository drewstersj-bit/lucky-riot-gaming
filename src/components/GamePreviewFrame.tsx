import type { GameDeploymentManifest } from "@/content/games";

/**
 * Auto-spinning mini preview of a real game build.
 *
 * Embeds the game's PUBLIC artefact in a muted, controls-free "preview" mode
 * (the game reads `?preview=1` and runs a continuous auto-spin loop). Used on
 * game detail pages in place of static key-art placeholders so visitors see the
 * actual game alive.
 *
 * When no deployable build is present the caller should fall back to its own
 * placeholder — this component renders nothing unless a build is available.
 */
export function GamePreviewFrame({
  manifest,
  title,
  className,
}: {
  manifest: GameDeploymentManifest | undefined;
  title: string;
  className?: string;
}) {
  const available = manifest?.available && manifest.entryPoint;
  if (!available) return null;

  // Append the preview flag to the artefact entry point. The entry is a
  // same-origin relative URL (e.g. /games/<id>/play/game/index.html).
  const src = `${manifest!.entryPoint}?preview=1`;

  return (
    <div
      className={
        className ??
        "relative aspect-[16/10] overflow-hidden rounded-xl2 border border-riot-border bg-riot-black shadow-card"
      }
    >
      <iframe
        src={src}
        title={`${title} — live preview`}
        aria-label={`${title} auto-playing preview`}
        className="absolute inset-0 h-full w-full border-0"
        // The game reads its own same-origin assets (books.json, manifest,
        // assets/) and runs its renderer. No navigation or popups allowed.
        sandbox="allow-scripts allow-same-origin"
        allow="autoplay"
        loading="lazy"
        tabIndex={-1}
      />
      {/* Transparent cover: the preview is decorative and non-interactive, so
          clicks/taps fall through to the page rather than the muted demo. */}
      <span className="absolute inset-0 z-10" aria-hidden="true" />
      <span className="absolute bottom-2 right-3 z-20 rounded-full bg-riot-black/70 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-riot-text-muted">
        Live preview
      </span>
    </div>
  );
}

"use client";

import { useCallback } from "react";

/**
 * Playtest Studio launcher (internal dev route only).
 *
 * Gives the playtest build a roomy embedded stage PLUS a button to pop the game
 * into its own dedicated window, so you can watch the full game screen while
 * driving the in-game DEV panel (including the Force menu). Opening in a fresh
 * window avoids the cramped embedded frame — especially in portrait — and gives
 * the game its own space.
 *
 * The Force menu + all dev tools live INSIDE the game (the DEV panel), so the
 * popped-out window is the full playtest game with those controls in it. This
 * component only launches it; it holds no game logic.
 */
export function PlaytestStudio({
  entryPoint,
  title,
}: {
  entryPoint: string;
  title: string;
}) {
  const openWindow = useCallback(() => {
    if (!entryPoint) return;
    // Size the window to a generous 16:9-ish studio viewport, capped to the
    // screen. A named target reuses the same window if it's already open.
    const w = Math.min(1400, Math.round((window.screen.availWidth || 1440) * 0.9));
    const h = Math.min(900, Math.round((window.screen.availHeight || 900) * 0.9));
    const left = Math.round(((window.screen.availWidth || w) - w) / 2);
    const top = Math.round(((window.screen.availHeight || h) - h) / 2);
    window.open(
      entryPoint,
      "tycoon-playtest",
      `popup=yes,width=${w},height=${h},left=${left},top=${top},resizable=yes,scrollbars=no`,
    );
  }, [entryPoint]);

  return (
    <div className="flex flex-wrap items-center gap-3">
      <button
        type="button"
        onClick={openWindow}
        disabled={!entryPoint}
        className="inline-flex items-center gap-2 rounded-xl border border-riot-cyan/60 bg-riot-cyan/10 px-5 py-2.5 text-sm font-semibold text-riot-cyan transition-colors hover:bg-riot-cyan/20 disabled:opacity-50"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M14 3h7v7M21 3l-9 9M10 5H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Open {title} in a new window
      </button>
      <p className="text-xs leading-relaxed text-riot-text-muted">
        Opens the full playtest game in its own window — use the in-game{" "}
        <span className="font-semibold text-riot-text">DEV → Force</span> panel to
        drive free spins, big / mega / max wins, golden fish and win bands.
      </p>
    </div>
  );
}

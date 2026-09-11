"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Full-screen coming-soon intro video.
 *
 * Behaviour:
 * - Autoplays muted, loops, plays inline, no native controls.
 * - Poster shows immediately; the video fades in once it starts playing.
 * - Visitor can toggle sound (starts muted; audio only after a click) and
 *   pause/play. Pausing the video also stops its audio.
 * - Respects prefers-reduced-motion: does not autoplay, shows the poster, and
 *   lets the visitor start playback manually.
 * - Pauses when the tab is hidden; resumes only if not manually paused.
 * - If the video fails to load, the poster and all page content remain.
 *
 * Asset note: the on-disk filenames are referenced exactly (case-sensitive on
 * Netlify's Linux hosts):
 *   /video/Lucky_Riot_Intro.mp4
 *   /video/Luck_Riot_Intro_Poster.webp
 *
 * A smaller WebM can be added later as the preferred source by dropping the
 * file in /public/video and uncommenting the <source> below.
 */

const POSTER = "/video/Luck_Riot_Intro_Poster.webp";
const MP4 = "/video/Lucky_Riot_Intro.mp4";
// const WEBM = "/video/Lucky_Riot_Intro.webm"; // add later as preferred source

function SpeakerIcon({ on }: { on: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M11 5 6 9H3v6h3l5 4V5Z" fill="currentColor" stroke="none" />
      {on ? (
        <>
          <path d="M15.5 8.5a5 5 0 0 1 0 7" strokeLinecap="round" />
          <path d="M18 6a9 9 0 0 1 0 12" strokeLinecap="round" />
        </>
      ) : (
        <path d="M16 9l5 6M21 9l-5 6" strokeLinecap="round" />
      )}
    </svg>
  );
}

function PlayPauseIcon({ playing }: { playing: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      {playing ? (
        <>
          <rect x="6" y="5" width="4" height="14" rx="1" />
          <rect x="14" y="5" width="4" height="14" rx="1" />
        </>
      ) : (
        <path d="M8 5v14l11-7z" />
      )}
    </svg>
  );
}

export function ComingSoonVideo() {
  const reduce = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);

  const [started, setStarted] = useState(false); // has playback begun (controls the poster fade)
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [failed, setFailed] = useState(false);
  // Tracks whether the visitor deliberately paused, so tab-visibility logic
  // doesn't auto-resume against their wishes.
  const manuallyPausedRef = useRef(false);

  // Attempt autoplay unless reduced motion is requested.
  useEffect(() => {
    const v = videoRef.current;
    if (!v || reduce) return;
    v.muted = true;
    const p = v.play();
    if (p && typeof p.then === "function") {
      p.then(() => {
        manuallyPausedRef.current = false;
      }).catch(() => {
        // Autoplay blocked — leave the poster; the visitor can press play.
      });
    }
  }, [reduce]);

  // Pause when the tab is hidden; resume only if not manually paused.
  useEffect(() => {
    const onVisibility = () => {
      const v = videoRef.current;
      if (!v) return;
      if (document.hidden) {
        v.pause();
      } else if (!manuallyPausedRef.current && !reduce) {
        v.play().catch(() => {});
      }
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, [reduce]);

  const toggleSound = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    const next = !muted;
    v.muted = next;
    setMuted(next);
    // Turning sound on should ensure the video is actually playing.
    if (!next && v.paused) {
      manuallyPausedRef.current = false;
      v.play().catch(() => {});
    }
  }, [muted]);

  const togglePlay = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      manuallyPausedRef.current = false;
      v.play().catch(() => {});
    } else {
      manuallyPausedRef.current = true;
      v.pause();
      // Stop audio when paused.
      v.muted = true;
      setMuted(true);
    }
  }, []);

  const ctrlBtn =
    "inline-flex h-11 w-11 items-center justify-center rounded-full border border-lucky-gold/40 bg-riot-black/60 text-lucky-gold backdrop-blur transition-colors hover:border-lucky-gold hover:bg-riot-black/80 focus-visible:outline-none";

  return (
    <div className="absolute inset-0 bg-riot-black">
      {/* Poster underneath — always present, prevents layout shift & broken icons.
          On portrait mobile it anchors to the top so Lucky sits high, clear of
          the lower overlay; centred on larger screens. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-riot-black bg-contain bg-top bg-no-repeat md:bg-cover md:bg-center"
        style={{ backgroundImage: `url(${POSTER})` }}
      />

      {/* Video: contain on portrait mobile (no cropping of mascot/logo), cover on larger screens */}
      {!failed && (
        <video
          ref={videoRef}
          autoPlay={!reduce}
          muted
          loop
          playsInline
          preload="metadata"
          poster={POSTER}
          onPlaying={() => {
            setStarted(true);
            setPlaying(true);
          }}
          onPause={() => setPlaying(false)}
          onError={() => setFailed(true)}
          className={`absolute inset-0 h-full w-full object-contain object-top transition-opacity duration-700 md:object-cover md:object-center ${
            started ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* <source src={WEBM} type="video/webm" /> preferred smaller source when available */}
          <source src={MP4} type="video/mp4" />
        </video>
      )}

      {/* Controls: sound + play/pause, lower-right */}
      {!failed && (
        <div className="absolute bottom-4 right-4 z-20 flex items-center gap-2">
          <button type="button" onClick={togglePlay} className={ctrlBtn} aria-label={playing ? "Pause video" : "Play video"}>
            <PlayPauseIcon playing={playing} />
          </button>
          <button
            type="button"
            onClick={toggleSound}
            className={ctrlBtn}
            aria-label={muted ? "Turn sound on" : "Turn sound off"}
            aria-pressed={!muted}
          >
            <SpeakerIcon on={!muted} />
          </button>
        </div>
      )}
    </div>
  );
}

import type { SVGProps } from "react";

/**
 * Lightweight, CSS/SVG-derived brand motifs.
 *
 * These are deliberately simple, on-brand marks (coin, crown, crossed-eye face,
 * single-colour brand mark) that render crisply at any size with no image
 * download. They are NOT attempts to reproduce the detailed mascot artwork —
 * when official vector assets for the full mascot, mascot head, gloved hand or
 * animated coin-spin sequence are supplied, drop them into `public/brand/` and
 * extend `Mascot.tsx` to use them.
 */

const goldGrad = (id: string) => (
  <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
    <stop offset="0%" stopColor="#FFE126" />
    <stop offset="50%" stopColor="#FFC20A" />
    <stop offset="100%" stopColor="#F16F28" />
  </linearGradient>
);

/** A gold coin with a subtle rim — the core Lucky motif. */
export function CoinMark({ title = "Lucky coin", ...props }: SVGProps<SVGSVGElement> & { title?: string }) {
  return (
    <svg viewBox="0 0 64 64" role="img" aria-label={title} {...props}>
      <defs>{goldGrad("coin-g")}</defs>
      <circle cx="32" cy="32" r="30" fill="url(#coin-g)" />
      <circle cx="32" cy="32" r="30" fill="none" stroke="#050609" strokeOpacity="0.25" strokeWidth="2" />
      <circle cx="32" cy="32" r="23" fill="none" stroke="#050609" strokeOpacity="0.35" strokeWidth="2" strokeDasharray="2 5" />
      {/* Suit-style pip nod to the logo's club/spade coins */}
      <path
        d="M32 20c-3 0-5.4 2.4-5.4 5.4 0 2.3 1.4 3.9 3 4.8-1 .3-2 .9-2 2.1 0 1.4 1.9 1.9 4.4 1.9s4.4-.5 4.4-1.9c0-1.2-1-1.8-2-2.1 1.6-.9 3-2.5 3-4.8C37.4 22.4 35 20 32 20Z"
        fill="#050609"
        fillOpacity="0.5"
      />
    </svg>
  );
}

/** A five-point crown — the "Lucky" crown motif. */
export function CrownMark({ title = "Crown", ...props }: SVGProps<SVGSVGElement> & { title?: string }) {
  return (
    <svg viewBox="0 0 64 40" role="img" aria-label={title} {...props}>
      <defs>{goldGrad("crown-g")}</defs>
      <path
        d="M6 34 L10 12 L22 24 L32 6 L42 24 L54 12 L58 34 Z"
        fill="url(#crown-g)"
        stroke="#050609"
        strokeOpacity="0.35"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <circle cx="10" cy="12" r="3.5" fill="url(#crown-g)" stroke="#050609" strokeOpacity="0.35" strokeWidth="1.5" />
      <circle cx="32" cy="6" r="3.5" fill="url(#crown-g)" stroke="#050609" strokeOpacity="0.35" strokeWidth="1.5" />
      <circle cx="54" cy="12" r="3.5" fill="url(#crown-g)" stroke="#050609" strokeOpacity="0.35" strokeWidth="1.5" />
    </svg>
  );
}

/** Crossed-eye + wink face — the mascot's signature expression, simplified. */
export function CrossEyeMark({ title = "Lucky face", ...props }: SVGProps<SVGSVGElement> & { title?: string }) {
  return (
    <svg viewBox="0 0 64 64" role="img" aria-label={title} {...props}>
      <defs>{goldGrad("face-g")}</defs>
      <circle cx="32" cy="32" r="30" fill="url(#face-g)" />
      {/* Winking eye (left) */}
      <path d="M18 28c2-3 7-3 9 0" fill="none" stroke="#050609" strokeWidth="3" strokeLinecap="round" />
      {/* Crossed eye (right) */}
      <path d="M38 24l8 8M46 24l-8 8" stroke="#050609" strokeWidth="3" strokeLinecap="round" />
      {/* Grin */}
      <path d="M20 40c4 7 20 7 24 0" fill="none" stroke="#050609" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

/** Single-colour brand mark (crowned coin) for favicons/mono contexts. */
export function BrandMarkMono({
  title = "Lucky Riot Games",
  ...props
}: SVGProps<SVGSVGElement> & { title?: string }) {
  return (
    <svg viewBox="0 0 64 64" role="img" aria-label={title} {...props}>
      <path
        d="M14 22 L18 10 L26 18 L32 6 L38 18 L46 10 L50 22 Z"
        fill="currentColor"
      />
      <circle cx="32" cy="40" r="18" fill="none" stroke="currentColor" strokeWidth="4" />
      <path d="M25 38l6 6M31 38l-6 6" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
    </svg>
  );
}

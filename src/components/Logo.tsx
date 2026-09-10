import type { SVGProps } from "react";

/**
 * Lucky Riot Games wordmark + emblem.
 *
 * This is a self-contained SVG so the brand renders crisply at any size with
 * no image download. Replace with the official logo asset when available by
 * swapping this component's contents (keep the same props signature).
 */
export function Logo({
  showWordmark = true,
  className,
  ...props
}: SVGProps<SVGSVGElement> & { showWordmark?: boolean }) {
  return (
    <svg
      viewBox={showWordmark ? "0 0 260 48" : "0 0 48 48"}
      role="img"
      aria-label="Lucky Riot Games"
      className={className}
      {...props}
    >
      <defs>
        <linearGradient id="lrg-lucky" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFE126" />
          <stop offset="50%" stopColor="#FFC20A" />
          <stop offset="100%" stopColor="#F16F28" />
        </linearGradient>
        <linearGradient id="lrg-riot" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FA0597" />
          <stop offset="45%" stopColor="#7A238F" />
          <stop offset="100%" stopColor="#18C8F2" />
        </linearGradient>
      </defs>

      {/* Emblem: abstract reel / probability burst */}
      <g>
        <circle cx="24" cy="24" r="21" fill="#0C1118" stroke="url(#lrg-lucky)" strokeWidth="2" />
        <path
          d="M24 7 L28.5 20 L42 20 L31 28 L35 41 L24 33 L13 41 L17 28 L6 20 L19.5 20 Z"
          fill="url(#lrg-lucky)"
        />
        <circle cx="24" cy="24" r="4.2" fill="#050609" stroke="url(#lrg-riot)" strokeWidth="1.6" />
      </g>

      {showWordmark && (
        <g fill="currentColor" fontFamily="var(--font-display), sans-serif">
          <text
            x="58"
            y="21"
            fontSize="16"
            fontWeight="800"
            letterSpacing="0.5"
          >
            LUCKY RIOT
          </text>
          <text
            x="58"
            y="38"
            fontSize="11"
            fontWeight="600"
            letterSpacing="4"
            fill="#AEB7C2"
          >
            G A M E S
          </text>
        </g>
      )}
    </svg>
  );
}

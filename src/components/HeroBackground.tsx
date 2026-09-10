"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Abstract, game-inspired hero backdrop built entirely from SVG + CSS.
 * No video, no heavy assets. Motion is slow and ambient, and disabled entirely
 * when the visitor prefers reduced motion.
 */
export function HeroBackground() {
  const reduce = useReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Base gradient wash */}
      <div className="absolute inset-0 surface-gradient" />

      {/* Concentric probability rings */}
      <motion.svg
        className="absolute left-1/2 top-1/2 h-[140vmax] w-[140vmax] -translate-x-1/2 -translate-y-1/2 opacity-[0.14]"
        viewBox="0 0 800 800"
        initial={false}
        animate={reduce ? undefined : { rotate: 360 }}
        transition={reduce ? undefined : { duration: 240, ease: "linear", repeat: Infinity }}
      >
        {[120, 200, 280, 360].map((r) => (
          <circle
            key={r}
            cx="400"
            cy="400"
            r={r}
            fill="none"
            stroke="#FFC20A"
            strokeWidth="1"
            strokeDasharray="2 14"
          />
        ))}
      </motion.svg>

      {/* Riot glow blobs — slow ambient drift, low opacity controlled bursts */}
      <motion.div
        className="absolute -right-24 top-10 h-80 w-80 rounded-full bg-riot-pink/15 blur-3xl"
        animate={reduce ? undefined : { y: [0, -30, 0], x: [0, 10, 0] }}
        transition={reduce ? undefined : { duration: 16, ease: "easeInOut", repeat: Infinity }}
      />
      <motion.div
        className="absolute left-1/3 top-1/4 h-64 w-64 rounded-full bg-riot-cyan/10 blur-3xl"
        animate={reduce ? undefined : { y: [0, -18, 0], x: [0, -12, 0] }}
        transition={reduce ? undefined : { duration: 22, ease: "easeInOut", repeat: Infinity }}
      />
      <motion.div
        className="absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-lucky-gold/10 blur-3xl"
        animate={reduce ? undefined : { y: [0, 24, 0] }}
        transition={reduce ? undefined : { duration: 20, ease: "easeInOut", repeat: Infinity }}
      />

      {/* Abstract reel columns */}
      <div className="absolute inset-y-0 right-[6%] hidden gap-3 opacity-[0.08] md:flex">
        {[0, 1, 2].map((col) => (
          <motion.div
            key={col}
            className="w-16 rounded-full bg-gradient-to-b from-transparent via-riot-text to-transparent"
            animate={reduce ? undefined : { y: [0, -40, 0] }}
            transition={
              reduce
                ? undefined
                : { duration: 12 + col * 3, ease: "easeInOut", repeat: Infinity }
            }
          />
        ))}
      </div>

      {/* Bottom fade into page background */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-riot-charcoal to-transparent" />
    </div>
  );
}

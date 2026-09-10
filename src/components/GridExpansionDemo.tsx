"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Lightweight demonstration of the Cluckus Maximus expanding grid growing from
 * 5×5 towards 7×7. This is a website animation only — NOT a functioning game.
 *
 * Reduced motion / no-JS: shows the final 7×7 state statically.
 */
const SIZES = [5, 6, 7] as const;

export function GridExpansionDemo() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(reduce ? SIZES.length - 1 : 0);
  const [active, setActive] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Advance the grid only while on-screen and motion is allowed.
  useEffect(() => {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduce]);

  useEffect(() => {
    if (reduce || !active) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % SIZES.length);
    }, 1600);
    return () => window.clearInterval(id);
  }, [reduce, active]);

  const size = SIZES[index];
  const cells = Array.from({ length: 7 * 7 });

  return (
    <div ref={ref}>
      <div
        className="mx-auto grid aspect-square w-full max-w-sm gap-1.5 rounded-xl2 border border-riot-border bg-riot-charcoal p-3"
        style={{ gridTemplateColumns: "repeat(7, minmax(0, 1fr))" }}
        role="img"
        aria-label={`Demonstration: expanding grid currently showing ${size} by ${size}`}
      >
        {cells.map((_, i) => {
          const row = Math.floor(i / 7);
          const col = i % 7;
          // Centre the active sub-grid within the 7×7 frame.
          const offset = Math.floor((7 - size) / 2);
          const withinActive =
            row >= offset && row < offset + size && col >= offset && col < offset + size;
          return (
            <div
              key={i}
              className={`rounded-[4px] transition-all duration-500 ${
                withinActive
                  ? "bg-lucky-gradient opacity-100"
                  : "bg-riot-surface opacity-30"
              }`}
            />
          );
        })}
      </div>
      <p className="mt-4 text-center text-sm font-semibold text-lucky-gold" aria-live="polite">
        {size}×{size} grid
      </p>
      <p className="mt-1 text-center text-xs text-riot-text-muted">
        Demonstration only — a lightweight illustration, not a playable game.
      </p>
    </div>
  );
}

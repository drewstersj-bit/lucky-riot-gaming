import { CoinMark } from "./marks";

/**
 * Simple spinning branded coin for loading states.
 * The 3D flip animation is CSS-driven and disabled under prefers-reduced-motion.
 */
export function CoinLoader({
  size = 48,
  label = "Loading",
}: {
  size?: number;
  label?: string;
}) {
  return (
    <span role="status" aria-live="polite" className="inline-flex flex-col items-center gap-3">
      <span className="animate-coin-spin" style={{ width: size, height: size }}>
        <CoinMark className="h-full w-full" title="" aria-hidden="true" />
      </span>
      <span className="sr-only">{label}</span>
    </span>
  );
}

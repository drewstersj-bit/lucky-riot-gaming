import type { GameMaturity } from "@/content/games";
import { maturityMeta } from "@/content/games";

/**
 * Reusable maturity/status badge. The state is always conveyed as a text
 * label (never colour alone) for accessibility.
 */
export function MaturityBadge({
  maturity,
  className,
}: {
  maturity: GameMaturity;
  className?: string;
}) {
  const meta = maturityMeta[maturity];
  const tone =
    meta.tone === "live"
      ? "bg-state-success/15 text-state-success border-state-success/40"
      : meta.tone === "candidate"
        ? "bg-riot-cyan/15 text-riot-cyan border-riot-cyan/40"
        : meta.tone === "concept"
          ? "bg-lucky-gold/15 text-lucky-yellow border-lucky-gold/30"
          : "bg-riot-pink/15 text-riot-pink border-riot-pink/40";
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider ${tone} ${className ?? ""}`}
    >
      {meta.label}
    </span>
  );
}

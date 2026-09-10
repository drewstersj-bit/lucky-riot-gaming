import type { CategoryAccentKey } from "@/content/games";

/**
 * Central mapping from a category accent key to Tailwind class fragments.
 * Keeps the gold / pink / cyan category identity consistent everywhere.
 */
export interface AccentClasses {
  text: string;
  border: string;
  hoverBorder: string;
  bgSoft: string;
  ring: string;
  glow: string;
  dot: string;
}

export const accentClasses: Record<CategoryAccentKey, AccentClasses> = {
  gold: {
    text: "text-lucky-gold",
    border: "border-lucky-gold/40",
    hoverBorder: "hover:border-lucky-gold/60",
    bgSoft: "bg-lucky-gold/10",
    ring: "ring-lucky-gold/30",
    glow: "shadow-glow-gold",
    dot: "bg-lucky-gold",
  },
  pink: {
    text: "text-riot-pink",
    border: "border-riot-pink/40",
    hoverBorder: "hover:border-riot-pink/60",
    bgSoft: "bg-riot-pink/10",
    ring: "ring-riot-pink/30",
    glow: "shadow-glow-pink",
    dot: "bg-riot-pink",
  },
  cyan: {
    text: "text-riot-cyan",
    border: "border-riot-cyan/40",
    hoverBorder: "hover:border-riot-cyan/60",
    bgSoft: "bg-riot-cyan/10",
    ring: "ring-riot-cyan/30",
    glow: "shadow-glow-cyan",
    dot: "bg-riot-cyan",
  },
};

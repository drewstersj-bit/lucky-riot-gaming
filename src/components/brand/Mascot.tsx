import Image from "next/image";
import { CoinMark, CrownMark, CrossEyeMark, BrandMarkMono } from "./marks";

/**
 * Lucky Riot mascot + brand asset surface.
 *
 * The studio mascot is internally called "Lucky" (the crowned coin character).
 *
 * Supplied assets:
 *   /king_coin.png          -> variant="character" (the standalone Lucky mascot)
 *   /Lucky_Riot_Games.png   -> variant="full" (the logo + wordmark lockup)
 *
 * Named slots for richer assets that can be dropped in later without touching
 * call sites:
 *
 *   public/brand/lucky-head.(png|webp)      -> variant="head"
 *   public/brand/lucky-coin-spin.(webp|gif) -> future animated variant
 *
 * Until those exist we fall back to the supplied assets or the CSS/SVG motifs
 * in `marks.tsx`. We never generate an inaccurate mascot.
 */

export type MascotVariant = "character" | "full" | "head" | "crown" | "coin" | "face" | "mono";

interface MascotProps {
  variant?: MascotVariant;
  /** Rendered width/height in px for the framed image variants. */
  size?: number;
  className?: string;
  /** Set true only for above-the-fold usage (hero). */
  priority?: boolean;
  /** Accessible label; use "" for purely decorative usage. */
  alt?: string;
}

/** The standalone Lucky mascot character (crowned coin). */
const CHARACTER_SRC = "/king_coin.png";
/** The full logo/wordmark lockup. */
const LOGO_SRC = "/Lucky_Riot_Games.png";

export function Mascot({
  variant = "full",
  size = 320,
  className,
  priority = false,
  alt = "Lucky Riot Games",
}: MascotProps) {
  // Simple SVG motifs — no image download.
  if (variant === "crown") return <CrownMark className={className} aria-hidden={alt === ""} />;
  if (variant === "coin") return <CoinMark className={className} aria-hidden={alt === ""} />;
  if (variant === "face") return <CrossEyeMark className={className} aria-hidden={alt === ""} />;
  if (variant === "mono") return <BrandMarkMono className={className} aria-hidden={alt === ""} />;

  // Image-backed variants. `character` is the standalone Lucky mascot; `full`/
  // `head` fall back to the logo lockup until dedicated crops are supplied. The
  // source art sits on a light background, so we present it inside a soft dark
  // glow that blends the edges on our dark surfaces.
  const src = variant === "character" ? CHARACTER_SRC : LOGO_SRC;

  return (
    <div
      className={`relative inline-flex items-center justify-center ${className ?? ""}`}
      style={{ width: size, height: size }}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 rounded-full bg-lucky-gold/10 blur-2xl"
      />
      <Image
        src={src}
        alt={alt}
        width={size}
        height={size}
        priority={priority}
        loading={priority ? undefined : "lazy"}
        className="relative h-full w-full object-contain drop-shadow-[0_10px_40px_rgba(255,194,10,0.18)]"
        sizes={`${size}px`}
      />
    </div>
  );
}

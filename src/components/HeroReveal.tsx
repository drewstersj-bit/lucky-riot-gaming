"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ButtonLink } from "./Button";
import { Mascot } from "./brand/Mascot";
import { CoinMark } from "./brand/marks";
import { heroContent } from "@/content/home";

/**
 * Brand-reveal hero.
 *
 * Sequence (≈2s total): near-black → spinning gold coin → Lucky Riot logo →
 * pink-to-cyan energy streak → the headline lands with a sharp transition.
 *
 * Under prefers-reduced-motion the final composition is shown immediately with
 * no movement. The hero is visually strong with or without animation.
 */
export function HeroReveal() {
  const reduce = useReducedMotion();

  // With reduced motion, everything is visible from frame one.
  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.12, delayChildren: reduce ? 0 : 0.15 } },
  };

  const rise: Variants = reduce
    ? { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } }
    : {
        hidden: { opacity: 0, y: 24 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
      };

  return (
    <section className="relative flex min-h-[92vh] items-center overflow-hidden bg-riot-black">
      {/* Ambient backdrop (dark-first, restrained bursts) */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 surface-gradient" />
        <motion.div
          className="absolute -right-24 top-16 h-80 w-80 rounded-full bg-riot-pink/15 blur-3xl"
          initial={reduce ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: reduce ? 0 : 1.2, delay: reduce ? 0 : 0.6 }}
        />
        <motion.div
          className="absolute left-1/4 bottom-0 h-72 w-72 rounded-full bg-riot-cyan/10 blur-3xl"
          initial={reduce ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: reduce ? 0 : 1.2, delay: reduce ? 0 : 0.8 }}
        />
      </div>

      <div className="container-page relative z-10 grid items-center gap-10 py-20 lg:grid-cols-[1.1fr_0.9fr]">
        {/* Text column */}
        <motion.div variants={container} initial="hidden" animate="show" className="max-w-2xl">
          <motion.p
            variants={rise}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-riot-border bg-riot-surface/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-lucky-gold"
          >
            <CoinMark className="h-4 w-4" title="" aria-hidden="true" />
            {heroContent.supportingLine}
          </motion.p>

          <motion.h1
            variants={rise}
            className="font-display text-[clamp(2.75rem,8vw,6rem)] uppercase leading-[1.05] text-riot-white"
          >
            Built to <span className="text-gradient-lucky">Break</span> the Pattern.
          </motion.h1>

          {/* Pink-to-cyan energy streak */}
          <motion.div
            variants={rise}
            className="streak-riot mt-6 w-40"
            aria-hidden="true"
          />

          <motion.p variants={rise} className="mt-6 max-w-xl text-lg leading-relaxed text-riot-text md:text-xl">
            {heroContent.description}
          </motion.p>

          <motion.div variants={rise} className="mt-9 flex flex-col gap-4 sm:flex-row">
            <ButtonLink href={heroContent.primaryCta.href} size="lg">
              {heroContent.primaryCta.label}
            </ButtonLink>
            <ButtonLink href={heroContent.secondaryCta.href} size="lg" variant="secondary">
              {heroContent.secondaryCta.label}
            </ButtonLink>
          </motion.div>
        </motion.div>

        {/* Mascot / brand reveal column */}
        <div className="relative flex items-center justify-center">
          {/* Spinning coin that lands behind the logo during the reveal */}
          {!reduce && (
            <motion.div
              className="absolute"
              initial={{ opacity: 1, scale: 0.6, rotate: 0 }}
              animate={{ opacity: 0, scale: 1.1, rotate: 540 }}
              transition={{ duration: 1.1, ease: "easeOut" }}
            >
              <CoinMark className="h-40 w-40" title="" aria-hidden="true" />
            </motion.div>
          )}
          <motion.div
            initial={reduce ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: reduce ? 0 : 0.6, delay: reduce ? 0 : 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <Mascot
              variant="character"
              size={460}
              priority
              alt="Lucky, the crowned coin mascot of Lucky Riot Games"
              className="max-w-[80vw]"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

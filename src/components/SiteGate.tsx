"use client";

import { useEffect, useState, type FormEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { siteGate } from "@/content/site";
import { Mascot } from "./brand/Mascot";
import { Button } from "./Button";

const STORAGE_KEY = "lrg-site-unlocked";

/**
 * Pre-launch access gate.
 *
 * Renders a striking, on-brand full-screen splash over the site until the
 * correct credentials are entered. The unlock flag is stored in sessionStorage
 * (cleared when the tab/browser closes). When `siteGate.locked` is false this
 * component renders children immediately and adds no overhead.
 *
 * NOTE: This is obscurity, not security, on a static export. See README for the
 * Netlify Basic Auth alternative for genuine protection.
 */
export function SiteGate({ children }: { children: React.ReactNode }) {
  const [unlocked, setUnlocked] = useState(!siteGate.locked);
  const [ready, setReady] = useState(!siteGate.locked);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!siteGate.locked) return;
    try {
      if (window.sessionStorage.getItem(STORAGE_KEY) === "yes") {
        setUnlocked(true);
      }
    } catch {
      /* ignore storage errors */
    }
    setReady(true);
  }, []);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (username === siteGate.username && password === siteGate.password) {
      try {
        window.sessionStorage.setItem(STORAGE_KEY, "yes");
      } catch {
        /* ignore storage errors */
      }
      setError(null);
      setUnlocked(true);
    } else {
      setError("Incorrect username or password.");
    }
  }

  if (unlocked) return <>{children}</>;

  // Avoid a flash of the splash before sessionStorage is read.
  if (!ready) return null;

  const fieldClass =
    "mt-2 w-full rounded-lg border border-riot-border bg-riot-charcoal px-4 py-3 text-riot-white placeholder-riot-text-muted/60 focus:border-riot-cyan focus:outline-none focus:ring-2 focus:ring-riot-cyan/40";

  return (
    <div className="fixed inset-0 z-[100] overflow-auto bg-riot-black">
      {/* Ambient brand backdrop */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 surface-gradient" />
        <motion.div
          className="absolute -right-24 top-10 h-96 w-96 rounded-full bg-riot-pink/20 blur-3xl"
          animate={reduce ? undefined : { y: [0, -24, 0], opacity: [0.6, 1, 0.6] }}
          transition={reduce ? undefined : { duration: 9, ease: "easeInOut", repeat: Infinity }}
        />
        <motion.div
          className="absolute -left-24 bottom-0 h-96 w-96 rounded-full bg-riot-cyan/15 blur-3xl"
          animate={reduce ? undefined : { y: [0, 20, 0], opacity: [0.5, 0.9, 0.5] }}
          transition={reduce ? undefined : { duration: 11, ease: "easeInOut", repeat: Infinity }}
        />
        <motion.div
          className="absolute left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-lucky-gold/10 blur-3xl"
          animate={reduce ? undefined : { scale: [1, 1.08, 1] }}
          transition={reduce ? undefined : { duration: 8, ease: "easeInOut", repeat: Infinity }}
        />
      </div>

      <div className="relative mx-auto flex min-h-full max-w-6xl flex-col items-center justify-center gap-10 px-5 py-12 lg:grid lg:grid-cols-2 lg:gap-8">
        {/* Lucky — the star of the splash */}
        <motion.div
          className="order-1 flex flex-col items-center text-center lg:items-start lg:text-left"
          initial={reduce ? { opacity: 1 } : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduce ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            animate={reduce ? undefined : { y: [0, -10, 0] }}
            transition={reduce ? undefined : { duration: 5, ease: "easeInOut", repeat: Infinity }}
          >
            <Mascot
              variant="character"
              size={340}
              priority
              alt="Lucky, the crowned coin mascot of Lucky Riot Games"
              className="max-w-[72vw]"
            />
          </motion.div>
        </motion.div>

        {/* Message + access card */}
        <motion.div
          className="order-2 w-full max-w-md"
          initial={reduce ? { opacity: 1 } : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduce ? 0 : 0.6, delay: reduce ? 0 : 0.12, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-lucky-gold">
            Coming Soon
          </p>
          <h1 className="mt-3 font-display text-[clamp(2.5rem,7vw,4.5rem)] uppercase leading-[1.02] text-riot-white">
            Built to <span className="text-gradient-lucky">Break</span> the Pattern.
          </h1>
          <div className="streak-riot mt-5 w-40" aria-hidden="true" />
          <p className="mt-5 text-lg leading-relaxed text-riot-text">
            Serious maths. Beautiful chaos. Lucky Riot Games is almost here.
          </p>

          <div className="mt-8 rounded-xl2 border border-riot-border bg-riot-surface/80 p-6 shadow-card backdrop-blur">
            <p className="text-sm font-semibold text-riot-text">Got early access?</p>
            <form onSubmit={handleSubmit} className="mt-4 space-y-4" noValidate>
              {error && (
                <div role="alert" className="rounded-lg border border-state-error/40 bg-state-error/10 p-3 text-sm text-state-error">
                  {error}
                </div>
              )}

              <div>
                <label htmlFor="gate-user" className="block text-sm font-semibold text-riot-text">
                  Username
                </label>
                <input
                  id="gate-user"
                  type="text"
                  autoComplete="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className={fieldClass}
                />
              </div>

              <div>
                <label htmlFor="gate-pass" className="block text-sm font-semibold text-riot-text">
                  Password
                </label>
                <input
                  id="gate-pass"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={fieldClass}
                />
              </div>

              <Button type="submit" size="lg" className="w-full">
                Enter Site
              </Button>
            </form>
          </div>

          <p className="mt-6 text-xs uppercase tracking-[0.2em] text-riot-text-muted">
            18+ | For business and industry audiences
          </p>
        </motion.div>
      </div>
    </div>
  );
}

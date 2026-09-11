"use client";

import { useEffect, useState, type FormEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { siteGate } from "@/content/site";
import { ComingSoonVideo } from "./ComingSoonVideo";
import { Button } from "./Button";

const STORAGE_KEY = "lrg-site-unlocked";

/**
 * Pre-launch access gate.
 *
 * The full-screen coming-soon experience is the supplied intro video, with a
 * restrained lower overlay (headline, tagline, "Join the Riot"). "Join the
 * Riot" opens the early-access login used to enter the site before launch.
 *
 * The unlock flag is stored in sessionStorage (cleared when the tab/browser
 * closes). When `siteGate.locked` is false this component renders children
 * immediately and adds no overhead.
 *
 * NOTE: This is obscurity, not security, on a static export. See README for the
 * Netlify Basic Auth alternative for genuine protection.
 */
export function SiteGate({ children }: { children: React.ReactNode }) {
  const [unlocked, setUnlocked] = useState(!siteGate.locked);
  const [ready, setReady] = useState(!siteGate.locked);
  const [showLogin, setShowLogin] = useState(false);
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
    <div className="fixed inset-0 z-[100] overflow-hidden bg-riot-black">
      {/* Full-screen intro video (with its own poster + sound/pause controls) */}
      <ComingSoonVideo />

      {/* Restrained lower overlay — positioned so it never covers the central
          logo, mascot, hands or face. Subtle black gradient for readability. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10">
        <div className="h-40 bg-gradient-to-t from-riot-black via-riot-black/70 to-transparent" />
        <div className="bg-riot-black/70 pb-20 pt-2 md:pb-6">
          <motion.div
            className="container-page pointer-events-auto"
            initial={reduce ? { opacity: 1 } : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduce ? 0 : 0.6, delay: reduce ? 0 : 0.3 }}
          >
            <h1 className="font-display text-[clamp(1.75rem,5vw,3.25rem)] uppercase leading-[1.05] text-riot-white">
              Built to <span className="text-gradient-lucky">Break</span> the Pattern.
            </h1>
            <p className="mt-2 text-base text-riot-text md:text-lg">Serious maths. Beautiful chaos.</p>
            <div className="mt-5">
              <Button size="lg" onClick={() => setShowLogin(true)}>
                Join the Riot
              </Button>
            </div>
            <p className="mt-4 text-xs uppercase tracking-[0.2em] text-riot-text-muted">
              18+ | For business and industry audiences
            </p>
          </motion.div>
        </div>
      </div>

      {/* Early-access login (opened by "Join the Riot") */}
      <AnimatePresence>
        {showLogin && (
          <motion.div
            className="absolute inset-0 z-30 flex items-center justify-center bg-riot-black/80 px-5 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.25 }}
            role="dialog"
            aria-modal="true"
            aria-label="Early access"
          >
            <motion.div
              className="relative w-full max-w-md rounded-xl2 border border-riot-border bg-riot-surface p-6 shadow-card md:p-8"
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.98 }}
              transition={{ duration: reduce ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <button
                type="button"
                onClick={() => setShowLogin(false)}
                aria-label="Close"
                className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full text-riot-text-muted hover:bg-riot-charcoal hover:text-riot-white"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
                </svg>
              </button>

              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-lucky-gold">Early access</p>
              <div className="streak-riot mt-3 w-24" aria-hidden="true" />
              <p className="mt-4 text-sm text-riot-text-muted">
                The site is in preview. Enter your access details to continue.
              </p>

              <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
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
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

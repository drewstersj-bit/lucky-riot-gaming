"use client";

import { useEffect, useState, type FormEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { siteGate } from "@/content/site";
import { ComingSoonVideo } from "./ComingSoonVideo";
import { Button, ButtonLink } from "./Button";

const STORAGE_KEY = "lrg-site-unlocked";
const AGE_KEY = "lrg-age-confirmed";

/** Where visitors who are not 18+ are directed. */
const UNDER_18_URL = "https://www.gamblingcommission.gov.uk/public-and-players/safer-gambling";

/**
 * Front-page gate.
 *
 * The full-screen intro video sits behind a restrained lower overlay that
 * frames Lucky Riot as a games-development studio, followed by an age check:
 * "Yes, over 18" enters the site; "No, I'm under 18" redirects to the Gambling
 * Commission safer-gambling resource.
 *
 * Two independent flags are stored in sessionStorage (cleared when the
 * tab/browser closes):
 *   - AGE_KEY  — set once the visitor confirms they are 18+.
 *   - STORAGE_KEY — set once the early-access credentials are accepted
 *     (only relevant while `siteGate.locked` is true).
 *
 * The visitor sees `children` only when age is confirmed AND, if the site is
 * locked for early access, the credentials have been accepted.
 *
 * NOTE: This is obscurity, not security, on a static export. See README for the
 * Netlify Basic Auth alternative for genuine protection.
 */
export function SiteGate({ children }: { children: React.ReactNode }) {
  const [ageConfirmed, setAgeConfirmed] = useState(false);
  const [accessUnlocked, setAccessUnlocked] = useState(!siteGate.locked);
  const [ready, setReady] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const reduce = useReducedMotion();

  // Visitor is in once they are 18+ and (if locked) have early-access.
  const unlocked = ageConfirmed && accessUnlocked;

  useEffect(() => {
    try {
      if (window.sessionStorage.getItem(AGE_KEY) === "yes") {
        setAgeConfirmed(true);
      }
      if (siteGate.locked && window.sessionStorage.getItem(STORAGE_KEY) === "yes") {
        setAccessUnlocked(true);
      }
    } catch {
      /* ignore storage errors */
    }
    setReady(true);
  }, []);

  function confirmAge() {
    try {
      window.sessionStorage.setItem(AGE_KEY, "yes");
    } catch {
      /* ignore storage errors */
    }
    setAgeConfirmed(true);
    // If the site is still locked for early access, prompt for credentials.
    if (siteGate.locked) setShowLogin(true);
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (username === siteGate.username && password === siteGate.password) {
      try {
        window.sessionStorage.setItem(STORAGE_KEY, "yes");
      } catch {
        /* ignore storage errors */
      }
      setError(null);
      setAccessUnlocked(true);
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
              Where Great Games <span className="text-gradient-lucky">Break</span> the Rules.
            </h1>
            <p className="mt-2 text-base text-riot-text md:text-lg">
              Independent thinking. Original ideas. Exceptional execution. We build games designed to stand out.
            </p>
            <p className="mt-4 text-sm text-riot-text-muted">
              This site showcases our game development work. Please confirm you are over 18 to continue.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <Button size="lg" onClick={confirmAge}>
                Yes, over 18
              </Button>
              <ButtonLink href={UNDER_18_URL} external variant="secondary" size="lg">
                No, I&apos;m under 18
              </ButtonLink>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Early-access login (shown after age confirmation while the site is locked) */}
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

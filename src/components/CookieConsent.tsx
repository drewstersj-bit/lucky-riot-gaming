"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Button } from "./Button";
import { Analytics } from "./Analytics";

const STORAGE_KEY = "lrg-cookie-consent";
type Consent = "accepted" | "rejected";

/**
 * Lightweight cookie preference banner.
 * Essential cookies are always active; optional analytics only load after the
 * visitor explicitly accepts. The choice persists in localStorage.
 */
export function CookieConsent() {
  const [consent, setConsent] = useState<Consent | null>(null);
  const [ready, setReady] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY) as Consent | null;
      setConsent(stored);
    } catch {
      setConsent(null);
    }
    setReady(true);
  }, []);

  const choose = (value: Consent) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, value);
    } catch {
      /* ignore storage errors */
    }
    setConsent(value);
  };

  const showBanner = ready && consent === null;

  return (
    <>
      {consent === "accepted" && <Analytics />}

      <AnimatePresence>
        {showBanner && (
          <motion.div
            role="region"
            aria-label="Cookie preferences"
            className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-2xl rounded-xl2 border border-riot-border bg-riot-surface/95 p-5 shadow-2xl backdrop-blur md:inset-x-auto md:right-6 md:bottom-6"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: reduce ? 0 : 0.3, ease: "easeOut" }}
          >
            <p className="text-sm font-bold text-riot-white">We value your privacy</p>
            <p className="mt-2 text-sm leading-relaxed text-riot-text-muted">
              We use essential cookies to run this site. With your consent we also use optional
              analytics cookies to understand aggregate usage. See our{" "}
              <a href="/cookies/" className="font-semibold text-riot-cyan underline hover:text-riot-cyan/80">
                Cookie Policy
              </a>
              .
            </p>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <Button variant="primary" onClick={() => choose("accepted")} className="sm:flex-1">
                Accept optional
              </Button>
              <Button variant="secondary" onClick={() => choose("rejected")} className="sm:flex-1">
                Essential only
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

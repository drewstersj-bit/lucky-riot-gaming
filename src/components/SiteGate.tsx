"use client";

import { useEffect, useState, type FormEvent } from "react";
import { siteGate } from "@/content/site";
import { Logo } from "./Logo";
import { Button } from "./Button";

const STORAGE_KEY = "lrg-site-unlocked";

/**
 * Pre-launch access gate.
 *
 * Renders a full-screen login over the site until the correct credentials are
 * entered. The unlock flag is stored in sessionStorage (cleared when the tab/
 * browser closes). When `siteGate.locked` is false this component renders
 * children immediately and adds no overhead.
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

  // Avoid a flash of the login form before sessionStorage is read.
  if (!ready) return null;

  const fieldClass =
    "mt-2 w-full rounded-lg border border-riot-border bg-riot-charcoal px-4 py-3 text-riot-white placeholder-riot-text-muted/60 focus:border-riot-cyan focus:outline-none focus:ring-2 focus:ring-riot-cyan/40";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center surface-gradient px-5">
      <div className="w-full max-w-md rounded-xl2 border border-riot-border bg-riot-surface p-8 shadow-card">
        <div className="flex justify-center">
          <Logo showWordmark={false} className="h-14 w-14 text-riot-white" />
        </div>
        <h1 className="mt-6 text-center text-2xl font-extrabold text-riot-white">
          Coming Soon
        </h1>
        <p className="mt-2 text-center text-sm leading-relaxed text-riot-text-muted">
          This site is in preview. Please enter your access details to continue.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5" noValidate>
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
    </div>
  );
}

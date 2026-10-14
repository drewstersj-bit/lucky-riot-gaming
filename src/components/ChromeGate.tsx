"use client";

import { usePathname } from "next/navigation";
import { Header } from "./Header";
import { Footer } from "./Footer";

/**
 * Chrome gate.
 *
 * Embedded game routes (the public PLAY demo, the internal DEV playtest, and
 * the customer PLAY embed) must render the game EDGE-TO-EDGE with no site
 * header, footer or page padding — the game owns the whole viewport. Every
 * other route gets the normal site chrome.
 *
 * Matched routes (with or without a trailing slash):
 *   /games/<slug>/play
 *   /games/<slug>/dev
 *   /customer/games/<id>/play
 */
function isEmbeddedGameRoute(pathname: string): boolean {
  const p = pathname.replace(/\/+$/, ""); // strip trailing slash
  return (
    /^\/games\/[^/]+\/(play|dev)$/.test(p) ||
    /^\/customer\/games\/[^/]+\/play$/.test(p)
  );
}

export function ChromeGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const embedded = isEmbeddedGameRoute(pathname ?? "");

  if (embedded) {
    // Full-screen game: no header/footer, no padding. The game fills the viewport.
    return <main id="main" className="h-dvh w-screen overflow-hidden bg-riot-black">{children}</main>;
  }

  return (
    <>
      <Header />
      <main id="main">{children}</main>
      <Footer />
    </>
  );
}

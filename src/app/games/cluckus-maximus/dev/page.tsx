import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/Section";
import { GameEmbed } from "@/components/GameEmbed";
import { getDeployment } from "@/content/game-deployments";
import { buildProfiles } from "@/content/games";

export const metadata: Metadata = {
  title: "Cluckus Maximus — Development Build",
  // Never index or follow internal development routes.
  robots: { index: false, follow: false, nocache: true },
};

/**
 * INTERNAL PLAYTEST ROUTE — /games/cluckus-maximus/dev/
 *
 * This page is the website-side shell for the protected PLAYTEST build. It
 * intentionally does NOT implement authentication in client-side JavaScript
 * (that would be insecure and trivially bypassed). Real access control must be
 * enforced at the hosting/edge layer BEFORE this page is served — see the
 * checkpoint "SECURITY / ACCESS CONTROL" section (Netlify Identity / role-based
 * access, Basic Auth via an edge function, or an authenticating proxy).
 *
 * The embedded artefact (when wired) is the PLAYTEST profile build, which may
 * contain the Developer Console, scenario library, replay and playtest tools.
 */
export default function CluckusDevPlaytestPage() {
  const manifest = getDeployment("cluckus-maximus", "PLAYTEST");
  const policy = buildProfiles.PLAYTEST;

  return (
    <Section aria-labelledby="dev-heading">
      {/* Prominent development identification */}
      <div className="rounded-xl2 border border-riot-pink/50 bg-riot-pink/10 p-5">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-riot-pink">
          ⚠ Development Build — Internal Playtest
        </p>
        <p className="mt-2 text-sm leading-relaxed text-riot-text">
          This is a private internal playtest build of Cluckus Maximus. It is not for public
          distribution and must be served behind hosting-layer access control. This route is
          marked <code className="text-riot-cyan">noindex, nofollow</code>.
        </p>
      </div>

      <div className="mt-8">
        <Link href="/games/cluckus-maximus/" className="text-sm font-semibold text-riot-text-muted hover:text-riot-cyan">
          ← Cluckus product page
        </Link>
        <h1 id="dev-heading" className="mt-4 font-display text-3xl uppercase text-riot-white md:text-4xl">
          Cluckus Maximus — Dev Playtest
        </h1>
      </div>

      {/* Access-control boundary notice (no client-side password) */}
      <div className="mt-6 rounded-xl2 border border-riot-border bg-riot-surface p-6">
        <h2 className="text-sm font-bold uppercase tracking-[0.18em] text-riot-text">Access control</h2>
        <p className="mt-2 text-sm leading-relaxed text-riot-text-muted">
          Access to this route is expected to be enforced at the hosting/edge layer before the page
          loads. No credentials or secrets are held in this frontend. If you can see this page in
          production without having authenticated, the hosting-layer protection is not yet
          configured — see the deployment documentation.
        </p>
      </div>

      {/* Playtest build embed slot */}
      <div className="mt-8">
        <GameEmbed manifest={manifest} title="Cluckus Maximus (Playtest)" />
      </div>

      {/* What this build profile is allowed to contain */}
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div className="rounded-xl2 border border-riot-border bg-riot-surface p-6">
          <h2 className="text-sm font-bold uppercase tracking-[0.18em] text-riot-cyan">May contain</h2>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-riot-text-muted">
            {policy.mayContain.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl2 border border-riot-border bg-riot-surface p-6">
          <h2 className="text-sm font-bold uppercase tracking-[0.18em] text-riot-text">Build target</h2>
          <dl className="mt-3 space-y-2 text-sm">
            <div className="flex justify-between border-b border-riot-border pb-2">
              <dt className="text-riot-text-muted">Profile</dt>
              <dd className="font-semibold text-riot-white">{policy.profile}</dd>
            </div>
            <div className="flex justify-between border-b border-riot-border pb-2">
              <dt className="text-riot-text-muted">Route</dt>
              <dd className="font-semibold text-riot-white">{policy.routePattern}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-riot-text-muted">Indexable</dt>
              <dd className="font-semibold text-riot-white">No</dd>
            </div>
          </dl>
        </div>
      </div>
    </Section>
  );
}

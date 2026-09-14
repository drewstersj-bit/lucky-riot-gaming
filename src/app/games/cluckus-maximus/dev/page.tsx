import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/Section";
import { MaturityBadge } from "@/components/MaturityBadge";
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
 * Website-side shell that embeds the PLAYTEST artefact hosted beneath
 * /games/cluckus-maximus/dev/game/. It does NOT implement authentication in
 * client-side JavaScript (insecure). Real access control is enforced at the
 * hosting/edge layer (Netlify Edge Function Basic Auth — see netlify/edge-
 * functions/playtest-auth.ts and README "Access control").
 *
 * The wrapper never exposes CORE 750 configuration. The Developer Console,
 * scenario library and replay tools live INSIDE the artefact.
 */
export default function CluckusDevPlaytestPage() {
  const manifest = getDeployment("cluckus-maximus", "PLAYTEST");
  const policy = buildProfiles.PLAYTEST;
  const meta = manifest?.buildMetadata ?? {};

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
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <h1 id="dev-heading" className="font-display text-3xl uppercase text-riot-white md:text-4xl">
            Cluckus Maximus: Eggspander
          </h1>
          <MaturityBadge maturity="PLAYTEST" />
        </div>
      </div>

      {/* Build information (from the artefact manifest — never CORE 750 config) */}
      <div className="mt-6 rounded-xl2 border border-riot-border bg-riot-surface p-6">
        <h2 className="text-sm font-bold uppercase tracking-[0.18em] text-riot-text">Build information</h2>
        {manifest?.available ? (
          <dl className="mt-3 grid gap-x-8 gap-y-2 sm:grid-cols-2">
            <div className="flex justify-between border-b border-riot-border pb-2">
              <dt className="text-sm text-riot-text-muted">Build type</dt>
              <dd className="text-sm font-semibold text-riot-white">{manifest.buildType}</dd>
            </div>
            <div className="flex justify-between border-b border-riot-border pb-2">
              <dt className="text-sm text-riot-text-muted">Version</dt>
              <dd className="text-sm font-semibold text-riot-white">{manifest.version}</dd>
            </div>
            {meta.buildId && (
              <div className="flex justify-between border-b border-riot-border pb-2">
                <dt className="text-sm text-riot-text-muted">Build identifier</dt>
                <dd className="text-sm font-semibold text-riot-white">{meta.buildId}</dd>
              </div>
            )}
            {meta.commit && (
              <div className="flex justify-between border-b border-riot-border pb-2">
                <dt className="text-sm text-riot-text-muted">Commit</dt>
                <dd className="text-sm font-semibold text-riot-white">{meta.commit}</dd>
              </div>
            )}
            {meta.buildDate && (
              <div className="flex justify-between border-b border-riot-border pb-2">
                <dt className="text-sm text-riot-text-muted">Build date</dt>
                <dd className="text-sm font-semibold text-riot-white">{meta.buildDate}</dd>
              </div>
            )}
            {meta.channel && (
              <div className="flex justify-between border-b border-riot-border pb-2">
                <dt className="text-sm text-riot-text-muted">Channel</dt>
                <dd className="text-sm font-semibold text-riot-white">{meta.channel}</dd>
              </div>
            )}
          </dl>
        ) : (
          <p className="mt-2 text-sm leading-relaxed text-riot-text-muted">
            No PLAYTEST artefact is currently present. Drop the compiled build into{" "}
            <code className="text-riot-cyan">public/games/cluckus-maximus/dev/game/</code> and
            rebuild — build details will appear here from its manifest.
          </p>
        )}
      </div>

      {/* Playtest game embed (tall viewport sizing; no double scrollbars) */}
      <div className="mt-8">
        <GameEmbed manifest={manifest} title="Cluckus Maximus (Playtest)" sizing="viewport" />
      </div>

      {/* Access-control reminder (protection is at the edge, not here) */}
      <div className="mt-8 rounded-xl2 border border-riot-border bg-riot-surface p-6">
        <h2 className="text-sm font-bold uppercase tracking-[0.18em] text-riot-text">Access control</h2>
        <p className="mt-2 text-sm leading-relaxed text-riot-text-muted">
          This route and all nested game assets are protected at the hosting/edge layer (Netlify
          Edge Function Basic Auth). No credentials or secrets are held in this frontend. If you can
          reach this page in production without authenticating, the edge protection is not yet
          configured — see the deployment documentation.
        </p>
      </div>

      {/* What this build profile may contain */}
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

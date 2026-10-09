import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/Section";
import { MaturityBadge } from "@/components/MaturityBadge";
import { GameEmbed } from "@/components/GameEmbed";
import { getDeployment } from "@/content/game-deployments";
import { buildProfiles } from "@/content/games";

export const metadata: Metadata = {
  title: "Video Poker Pro — Development Build",
  robots: { index: false, follow: false, nocache: true },
};

/**
 * INTERNAL PLAYTEST ROUTE — /games/video-poker-pro/dev/
 *
 * Website-side shell that embeds the PLAYTEST artefact hosted beneath
 * /games/video-poker-pro/dev/game/. Access control is enforced at the
 * hosting/edge layer (Netlify Edge Function Basic Auth), not in client JS.
 */
export default function VideoPokerProDevPlaytestPage() {
  const manifest = getDeployment("video-poker-pro", "PLAYTEST");
  const policy = buildProfiles.PLAYTEST;
  const meta = manifest?.buildMetadata ?? {};

  return (
    <Section aria-labelledby="dev-heading">
      <div className="rounded-xl2 border border-riot-pink/50 bg-riot-pink/10 p-5">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-riot-pink">
          ⚠ Development Build — Internal Playtest
        </p>
        <p className="mt-2 text-sm leading-relaxed text-riot-text">
          This is a private internal playtest build of Video Poker Pro. It is not for public
          distribution and must be served behind hosting-layer access control. This route is marked{" "}
          <code className="text-riot-cyan">noindex, nofollow</code>.
        </p>
      </div>

      <div className="mt-8">
        <Link href="/games/video-poker-pro/" className="text-sm font-semibold text-riot-text-muted hover:text-riot-cyan">
          ← Video Poker Pro product page
        </Link>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <h1 id="dev-heading" className="font-display text-3xl uppercase text-riot-white md:text-4xl">
            Video Poker Pro
          </h1>
          <MaturityBadge maturity="PLAYTEST" />
        </div>
      </div>

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
            {meta.buildDate && (
              <div className="flex justify-between border-b border-riot-border pb-2">
                <dt className="text-sm text-riot-text-muted">Build date</dt>
                <dd className="text-sm font-semibold text-riot-white">{meta.buildDate}</dd>
              </div>
            )}
          </dl>
        ) : (
          <p className="mt-2 text-sm leading-relaxed text-riot-text-muted">
            No PLAYTEST artefact is currently present. Drop the compiled build into{" "}
            <code className="text-riot-cyan">public/games/video-poker-pro/dev/game/</code> and
            rebuild — build details will appear here from its manifest.
          </p>
        )}
      </div>

      <div className="mt-8">
        <GameEmbed manifest={manifest} title="Video Poker Pro (Playtest)" sizing="viewport" />
      </div>

      <div className="mt-8 rounded-xl2 border border-riot-border bg-riot-surface p-6">
        <h2 className="text-sm font-bold uppercase tracking-[0.18em] text-riot-text">Access control</h2>
        <p className="mt-2 text-sm leading-relaxed text-riot-text-muted">
          This route and all nested game assets are protected at the hosting/edge layer (Netlify
          Edge Function Basic Auth). No credentials or secrets are held in this frontend.
        </p>
      </div>

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

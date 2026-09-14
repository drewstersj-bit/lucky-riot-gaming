import type { Metadata } from "next";
import Link from "next/link";

/**
 * Customer portal shell.
 *
 * The entire /customer/* area is noindex/nofollow. This layout provides the
 * portal chrome only — it does NOT implement authentication. Genuine auth/authz
 * must be added at the hosting/edge layer and/or a real application auth layer
 * (see checkpoint "SECURITY / ACCESS CONTROL"). No secrets or customer-specific
 * assets are held in this frontend.
 */
export const metadata: Metadata = {
  title: "Customer Portal",
  robots: { index: false, follow: false, nocache: true },
};

export default function CustomerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-[70vh]">
      {/* Portal sub-header (distinct from the public site header, which remains) */}
      <div className="border-b border-riot-border bg-riot-surface/60">
        <div className="container-page flex flex-wrap items-center justify-between gap-3 py-4">
          <div className="flex items-center gap-3">
            <Link href="/customer/" className="font-display text-lg uppercase text-riot-white">
              Customer Portal
            </Link>
            <span className="rounded-full border border-riot-cyan/40 bg-riot-cyan/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-riot-cyan">
              Preview
            </span>
          </div>
          <nav aria-label="Customer portal" className="flex items-center gap-4 text-sm">
            <Link href="/customer/" className="text-riot-text-muted hover:text-riot-white">
              Dashboard
            </Link>
            <Link href="/customer/games/" className="text-riot-text-muted hover:text-riot-white">
              Games
            </Link>
          </nav>
        </div>
      </div>

      {/* Architecture notice — no fake auth */}
      <div className="container-page pt-6">
        <div className="rounded-xl2 border border-lucky-gold/40 bg-lucky-gold/10 p-4 text-sm text-riot-text">
          <strong className="font-semibold text-lucky-yellow">Architecture preview.</strong>{" "}
          This portal shell is not yet protected by authentication. Access control will be added at
          the hosting and application layers before real customer data is served. All data shown is
          placeholder.
        </div>
      </div>

      {children}
    </div>
  );
}

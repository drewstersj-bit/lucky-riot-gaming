import Link from "next/link";
import { Logo } from "./Logo";
import { footerNav } from "@/content/navigation";
import { siteConfig } from "@/content/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-riot-border bg-riot-black">
      <div className="container-page py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div className="max-w-sm">
            <Link href="/" aria-label="Lucky Riot Games home" className="inline-flex">
              <Logo className="h-9 w-auto text-riot-white" />
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-riot-text-muted">
              An independent studio creating original online slots, video poker, roulette and
              distinctive new gaming experiences.
            </p>
            {siteConfig.social.linkedin && (
              <a
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-riot-text hover:text-riot-cyan"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.53C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.74V1.73C24 .77 23.2 0 22.22 0z" />
                </svg>
                LinkedIn
              </a>
            )}
          </div>

          {footerNav.map((group) => (
            <nav key={group.title} aria-label={group.title}>
              <h2 className="text-sm font-bold uppercase tracking-[0.18em] text-lucky-gold">
                {group.title}
              </h2>
              <ul className="mt-4 space-y-3">
                {group.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-riot-text-muted transition-colors hover:text-riot-white"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 rounded-xl2 border border-riot-border bg-riot-charcoal/60 p-5 text-sm text-riot-text-muted">
          <p>
            <strong className="font-semibold text-riot-text">
              Lucky Riot Games is a game development studio and does not accept wagers or operate a
              gambling service through this website.
            </strong>
          </p>
        </div>

        <div className="mt-8 border-t border-riot-border pt-6 text-sm text-riot-text-muted">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <p>© {year} {siteConfig.legal.entityName}. All rights reserved.</p>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
              <span>For business and industry audiences</span>
              <span aria-hidden="true" className="hidden md:inline">
                •
              </span>
              <span className="font-semibold text-riot-text">18+ | Please gamble responsibly</span>
            </div>
          </div>
          <p className="mt-4 text-xs leading-relaxed text-riot-text-muted/80">
            {siteConfig.legal.entityName} is a company registered in {siteConfig.legal.jurisdiction}
            {" "}(company no. {siteConfig.legal.companyNumber}). Registered office:{" "}
            {siteConfig.legal.registeredOffice}.
          </p>
        </div>
      </div>
    </footer>
  );
}

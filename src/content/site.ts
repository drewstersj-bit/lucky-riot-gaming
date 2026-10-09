/**
 * Centralised, editable site configuration.
 *
 * Update contact details, social links and metadata here. These values are
 * intentionally NOT secrets and are safe to commit.
 */

export const siteConfig = {
  name: "Lucky Riot Games",
  shortName: "Lucky Riot",
  /** Canonical production URL. Overridable via NEXT_PUBLIC_SITE_URL at build time. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://luckyriotgames.co.uk",
  tagline: "Original Slots and Online Games",
  description:
    "Lucky Riot Games is an independent studio creating original online slots, video poker and distinctive new gaming experiences.",
  /**
   * Verified legal entity details (source: UK Companies House, company 12884658).
   * "Lucky Riot Games" is the studio/trading brand; the registered company is
   * "Lucky Riot Gaming Limited".
   */
  legal: {
    entityName: "Lucky Riot Gaming Limited",
    companyNumber: "12884658",
    incorporatedOn: "16 September 2020",
    registeredOffice: "7 Stamford Square, Ashton-Under-Lyne, Lancashire, England, OL6 6QU",
    jurisdiction: "England & Wales",
  },
  /**
   * Primary business contact email, shown everywhere the site displays a
   * contact address (footer, contact page, legal pages, structured data).
   * Set `emailConfirmed` to true once the mailbox is confirmed active, which
   * removes the "confirm the mailbox" note on the contact page.
   */
  email: "andy@luckyriotgames.co.uk",
  emailConfirmed: true,
  social: {
    /** Configurable LinkedIn company URL. Leave empty to hide the link. */
    linkedin: "",
  },
  ogImage: "/og-image.svg",
} as const;

export type SiteConfig = typeof siteConfig;

/**
 * Pre-launch access gate (temporary).
 *
 * IMPORTANT: This is a client-side gate for a fully static site. The credentials
 * below are bundled into the JavaScript and are therefore NOT strong security —
 * they deter casual visitors but can be read by anyone who inspects the source.
 * For real protection use Netlify's built-in Password protection / Basic Auth
 * (see README). Remove this gate at launch by setting NEXT_PUBLIC_SITE_LOCKED
 * to "false" (or deleting the env var) and redeploying.
 */
export const siteGate = {
  /** Locked when the env var is exactly "true"; unlocked otherwise. */
  locked: process.env.NEXT_PUBLIC_SITE_LOCKED === "true",
  username: "LuckyRiot02",
  password: "WIP123",
} as const;

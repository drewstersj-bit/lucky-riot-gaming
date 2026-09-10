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
    "Lucky Riot Games is an independent studio creating original online slots, video poker, roulette and distinctive new gaming experiences.",
  /**
   * Primary business contact email.
   *
   * NOTE: This address has NOT been confirmed as active in the project.
   * It is provided here as editable configuration. Confirm the mailbox exists
   * before publishing, or replace with a verified address.
   */
  email: "hello@luckyriotgames.co.uk",
  emailConfirmed: false,
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

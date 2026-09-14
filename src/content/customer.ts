/**
 * Customer portal content (placeholder architecture).
 *
 * IMPORTANT: All commercial values here are PLACEHOLDERS to establish the
 * portal UI. They are clearly labelled as such in the UI and must be replaced
 * with real, verified data (and, where relevant, real certification) before
 * being shown to actual customers. Do NOT present placeholder RTP, max win,
 * volatility, market or certification values as fact.
 */

import type { GameMaturity } from "./games";

export interface CustomerGameSummary {
  gameId: string;
  displayName: string;
  category: string;
  maturity: GameMaturity;
  /** Whether a candidate build is available to the customer. */
  candidateAvailable: boolean;
}

/** Games currently visible to a (placeholder) authenticated customer. */
export const customerGames: CustomerGameSummary[] = [
  {
    gameId: "cluckus-maximus",
    displayName: "Cluckus Maximus: Eggspander",
    category: "Online Slot",
    maturity: "PLAYABLE DEVELOPMENT",
    candidateAvailable: false,
  },
];

/** Section tabs available on a customer game page. */
export const customerGameSections = [
  { id: "overview", label: "Overview" },
  { id: "play", label: "Play" },
  { id: "spec", label: "Game Spec" },
  { id: "integration", label: "Integration" },
  { id: "releases", label: "Releases" },
  { id: "documentation", label: "Documentation" },
  { id: "marketing", label: "Marketing Assets" },
] as const;

export type CustomerGameSectionId = (typeof customerGameSections)[number]["id"];

/**
 * Placeholder per-game customer detail. Every value is provisional.
 */
export interface CustomerGameDetail {
  gameId: string;
  displayName: string;
  category: string;
  maturity: GameMaturity;
  overview: string;
  spec: { label: string; value: string }[];
  integrationStatus: string;
  releaseNotes: { version: string; date?: string; note: string }[];
  documentation: { label: string; note: string }[];
  marketingAssets: { label: string; note: string }[];
}

export const customerGameDetails: Record<string, CustomerGameDetail> = {
  "cluckus-maximus": {
    gameId: "cluckus-maximus",
    displayName: "Cluckus Maximus: Eggspander",
    category: "Online Slot",
    maturity: "PLAYABLE DEVELOPMENT",
    overview:
      "Cluckus Maximus is currently a playable development build. A clean release candidate will be published to this portal when available. All specification values below are provisional.",
    spec: [
      { label: "Game type", value: "Video slot" },
      { label: "Grid format", value: "Expanding grid (5×5 → 7×7)" },
      { label: "Orientation", value: "Landscape and portrait" },
      { label: "Max win", value: "5,000× (design target — provisional)" },
      { label: "RTP variants", value: "To be confirmed" },
      { label: "Volatility", value: "To be confirmed" },
      { label: "Supported markets", value: "To be confirmed" },
    ],
    integrationStatus: "Not yet available. Integration details will be published at candidate stage.",
    releaseNotes: [
      { version: "0.0.0", note: "Placeholder — release notes will appear here once builds are published to the portal." },
    ],
    documentation: [
      { label: "Rules / paytable", note: "Available at candidate stage." },
      { label: "Technical documentation", note: "Available at candidate stage." },
    ],
    marketingAssets: [
      { label: "Logo pack", note: "Available at candidate stage." },
      { label: "Key art", note: "Available at candidate stage." },
    ],
  },
};

export function getCustomerGame(gameId: string): CustomerGameDetail | undefined {
  return customerGameDetails[gameId];
}

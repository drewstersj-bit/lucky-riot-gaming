/** Editable home-page copy. */

export const heroContent = {
  headline: "BUILT TO BREAK THE PATTERN.",
  supportingLine: "Serious maths. Beautiful chaos.",
  description:
    "Lucky Riot Games creates original slots, video poker and roulette experiences for players who expect more than another familiar spin.",
  primaryCta: { label: "Meet the Games", href: "/games" },
  secondaryCta: { label: "Start a Riot With Us", href: "/contact" },
};

/** Approved short brand phrases, reused across the site. */
export const brandPhrases = {
  breakThePattern: "Built to Break the Pattern",
  mathsChaos: "Serious maths. Beautiful chaos.",
  predictable: "Predictable isn't our thing.",
  builtPlayed: "Built properly. Played loudly.",
  unfamiliar: "Familiar games deserve unfamiliar ideas.",
  noiseThinking: "The noise gets the attention. The thinking keeps players engaged.",
  turnedUp: "Slots. Poker. Roulette. Turned up.",
  neverJustASpin: "Never just another spin.",
};

/** Game category accent identity — consistent across the whole site. */
export type CategoryAccent = "gold" | "pink" | "cyan";

export const gameCategories: {
  title: string;
  description: string;
  accent: CategoryAccent;
  href: string;
}[] = [
  {
    title: "Original Slots",
    description: "Big characters, clear mechanics and features built around entertainment.",
    accent: "gold",
    href: "/games",
  },
  {
    title: "Video Poker Reimagined",
    description:
      "The clarity of a classic, rebuilt with progression, personality and new ways to play.",
    accent: "pink",
    href: "/games",
  },
  {
    title: "Roulette With a Twist",
    description: "Familiar foundations transformed into distinctive new game experiences.",
    accent: "cyan",
    href: "/games",
  },
];

export const studioIntro = {
  heading: "Slots. Poker. Roulette. Turned Up.",
  copy: "Lucky Riot combines disciplined game design, dependable mathematics and modern production with bold characters, original mechanics and high-energy presentation. Familiar games deserve unfamiliar ideas.",
};

/** "Inside the Riot" — the mechanics/systems showcase. */
export const insideTheRiot = {
  heading: "INSIDE THE RIOT",
  intro:
    "The noise gets the attention. The thinking keeps players engaged. Explore the mechanics, characters and systems behind our games.",
  cards: [
    {
      title: "Expanding Reel Grids",
      kind: "Mechanic",
      accent: "gold" as CategoryAccent,
      description:
        "Grids that physically grow as players progress, opening new ways to land wins. Demonstrated below with Cluckus Maximus.",
      hasGridDemo: true,
    },
    {
      title: "Character Modifiers",
      kind: "System",
      accent: "pink" as CategoryAccent,
      description:
        "Distinct characters introduce their own rules, changing how features behave and rewarding experimentation.",
    },
    {
      title: "Persistent Progression",
      kind: "System",
      accent: "cyan" as CategoryAccent,
      description:
        "Advancement that carries forward, giving each session a sense of building towards something larger.",
    },
    {
      title: "Bonus Features",
      kind: "Mechanic",
      accent: "gold" as CategoryAccent,
      description:
        "Readable, high-anticipation features designed around clear moments worth remembering.",
    },
    {
      title: "Roulette Variations",
      kind: "Concept",
      accent: "cyan" as CategoryAccent,
      description:
        "Familiar foundations reworked into distinctive presentations. Early concepts in development.",
    },
    {
      title: "Video-Poker Mechanics",
      kind: "Concept",
      accent: "pink" as CategoryAccent,
      description:
        "The clarity of a classic combined with new progression and personality. Work in progress.",
    },
  ],
};

export const approachPillars = [
  {
    title: "Original by Design",
    description: "Every project begins with a clear creative and mechanical identity.",
  },
  {
    title: "Built for Players",
    description: "Strong anticipation, readable features and moments worth remembering.",
  },
  {
    title: "Serious Maths",
    description: "Dependable mathematics and disciplined design underneath the noise.",
  },
  {
    title: "Ready to Collaborate",
    description: "Designed to work with operators, aggregators and distribution partners.",
  },
];

export const partnershipCta = {
  heading: "START A RIOT WITH US.",
  copy: "We're looking to connect with operators, aggregators, platform providers and partners who want games with a stronger point of view.",
  button: { label: "Talk to Lucky Riot", href: "/contact" },
};

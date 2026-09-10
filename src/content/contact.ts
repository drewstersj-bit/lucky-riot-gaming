/** Editable contact-page configuration. */

export const areaOfInterestOptions = [
  "Game Distribution",
  "Operator Partnership",
  "Aggregation",
  "Technology",
  "Investment",
  "Press",
  "Careers",
  "Other",
] as const;

export type AreaOfInterest = (typeof areaOfInterestOptions)[number];

export const contactContent = {
  heading: "Partnership Enquiries",
  intro:
    "We're building a portfolio of distinctive online games and would love to hear from operators, aggregators, platform providers, investors and industry partners. Tell us a little about you and we'll be in touch.",
  /** Netlify form name — referenced by the hidden detection form too. */
  formName: "partnership-enquiry",
};

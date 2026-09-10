/**
 * Editable legal-page content.
 *
 * These are plain-language starting points written for a UK, business-facing,
 * non-operator studio website. They are not legal advice — have them reviewed
 * before relying on them, and fill in any bracketed placeholders.
 */

import { siteConfig } from "./site";

export interface LegalSection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}

export const lastUpdated = "September 2026";

export const privacyContent: LegalSection[] = [
  {
    heading: "Overview",
    paragraphs: [
      `This policy explains how ${siteConfig.legal.entityName} (trading as ${siteConfig.name}) handles information when you visit this website. We are a game development studio. This website is aimed at businesses and industry audiences and does not accept wagers, deposits or player registrations.`,
      `The data controller is ${siteConfig.legal.entityName}, company number ${siteConfig.legal.companyNumber}, registered office ${siteConfig.legal.registeredOffice}.`,
    ],
  },
  {
    heading: "Information we collect",
    paragraphs: [
      "We collect only the information you choose to provide and a limited amount of technical information needed to operate the site.",
    ],
    bullets: [
      "Enquiry details you submit through our contact form (such as your name, company, work email, area of interest and message).",
      "Consent choices you make in our cookie banner.",
      "Standard technical data such as your browser type, which may be processed by our hosting provider to serve and secure the site.",
    ],
  },
  {
    heading: "How we use information",
    paragraphs: [
      "We use enquiry details to respond to your message and to explore potential partnerships. We do not sell your information.",
    ],
  },
  {
    heading: "Cookies and analytics",
    paragraphs: [
      "We use only essential cookies by default. Optional analytics cookies are loaded solely after you accept them in the cookie banner. See our Cookie Policy for details.",
    ],
  },
  {
    heading: "Your rights",
    paragraphs: [
      "Depending on your location, you may have rights to access, correct or delete the personal information we hold about you. To make a request, contact us using the details below.",
    ],
  },
  {
    heading: "Contact",
    paragraphs: [
      `For any privacy question, contact ${siteConfig.name} at ${siteConfig.email}.`,
    ],
  },
];

export const cookiesContent: LegalSection[] = [
  {
    heading: "What cookies are",
    paragraphs: [
      "Cookies are small files stored on your device that help websites function and understand how they are used. This site keeps cookie use to a minimum.",
    ],
  },
  {
    heading: "Essential cookies",
    paragraphs: [
      "These are required for the site to work — for example, remembering your cookie preferences. They are always active and do not require consent.",
    ],
  },
  {
    heading: "Optional analytics cookies",
    paragraphs: [
      "If you accept optional cookies, we may load a privacy-conscious analytics tool to understand aggregate usage. No analytics scripts load until you give consent, and you can change your choice at any time.",
    ],
  },
  {
    heading: "Managing your choices",
    paragraphs: [
      "You can accept or reject optional cookies using the banner shown on your first visit. You can also clear cookies through your browser settings at any time.",
    ],
  },
];

export const termsContent: LegalSection[] = [
  {
    heading: "About this website",
    paragraphs: [
      `This website is operated by ${siteConfig.legal.entityName} (trading as ${siteConfig.name}) as an informational and business-facing resource about our game development studio.`,
    ],
  },
  {
    heading: "Company information",
    paragraphs: [
      `${siteConfig.legal.entityName} is a private limited company registered in ${siteConfig.legal.jurisdiction} under company number ${siteConfig.legal.companyNumber}.`,
      `Registered office: ${siteConfig.legal.registeredOffice}.`,
    ],
  },
  {
    heading: "No gambling service",
    paragraphs: [
      `${siteConfig.name} is a game development studio and does not accept wagers, deposits or player registrations, and does not operate a gambling service through this website.`,
    ],
  },
  {
    heading: "Intellectual property",
    paragraphs: [
      "All game names, artwork, logos and content on this site are the property of Lucky Riot Games or its partners and may not be reproduced without permission.",
    ],
  },
  {
    heading: "Accuracy of information",
    paragraphs: [
      "We aim to keep information accurate and current, but titles shown may be in development and details are subject to change. Nothing on this site is a commitment, warranty or offer.",
    ],
  },
  {
    heading: "External links",
    paragraphs: [
      "This site may link to third-party websites. We are not responsible for the content or practices of those sites.",
    ],
  },
  {
    heading: "Responsible gambling",
    paragraphs: [
      "Our games are intended for players aged 18 and over. Please gamble responsibly.",
    ],
  },
];

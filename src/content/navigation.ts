export interface NavItem {
  label: string;
  href: string;
}

/** Primary header navigation (the "Work With Us" CTA is rendered separately). */
export const primaryNav: NavItem[] = [
  { label: "Games", href: "/games" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

/** Footer navigation groups. */
export const footerNav: { title: string; items: NavItem[] }[] = [
  {
    title: "Studio",
    items: [
      { label: "Games", href: "/games" },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Legal",
    items: [
      { label: "Privacy", href: "/privacy" },
      { label: "Cookies", href: "/cookies" },
      { label: "Terms", href: "/terms" },
    ],
  },
];

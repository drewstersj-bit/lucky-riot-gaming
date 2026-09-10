"use client";

import Script from "next/script";

/**
 * Consent-gated analytics loader.
 *
 * Only rendered after the visitor accepts optional cookies. The provider and
 * measurement ID are configurable via environment variables:
 *   NEXT_PUBLIC_ANALYTICS_PROVIDER  ("ga" | "plausible")
 *   NEXT_PUBLIC_ANALYTICS_ID
 *
 * With no configuration set, nothing is loaded.
 */
export function Analytics() {
  const provider = process.env.NEXT_PUBLIC_ANALYTICS_PROVIDER;
  const id = process.env.NEXT_PUBLIC_ANALYTICS_ID;

  if (!provider || !id) return null;

  if (provider === "ga") {
    return (
      <>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${id}`}
          strategy="afterInteractive"
        />
        <Script id="ga-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${id}', { anonymize_ip: true });
          `}
        </Script>
      </>
    );
  }

  if (provider === "plausible") {
    return (
      <Script
        defer
        data-domain={id}
        src="https://plausible.io/js/script.js"
        strategy="afterInteractive"
      />
    );
  }

  return null;
}

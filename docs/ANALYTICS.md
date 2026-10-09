# Analytics — installed tags

GA4 is loaded directly from `index.html` with measurement ID
`G-KF8SKVR2W9`. The page also loads Google Tag Manager (`GTM-KMN4PFR3`),
Microsoft Clarity, and Matomo. The configurable loader in `src/lib/analytics.ts`
is separate and remains dormant unless its environment variables are set.

## GA4 implementation

The Google tag is part of the initial HTML and does not require Vercel
environment variables. Because Google Tag Manager is also active, check its
container configuration to ensure it is not independently sending page views
to `G-KF8SKVR2W9`.

## Verifying
1. View source on any page and confirm the `G-KF8SKVR2W9` tag is present.
2. GA4 → Admin → DebugView should register a test visit.
3. Check the GTM container for any duplicate GA4 configuration.

## Then, immediately
Update `/privacy-policy` to describe the analytics and tracking tools actually
used, their cookies/data handling, and any applicable consent choices. The
cookie and legal details still need confirmation in `drafts/privacy-policy.md`.

## Configurable analytics loader

`src/lib/analytics.ts` supports GA4 or Plausible via
`VITE_ANALYTICS_PROVIDER` and `VITE_ANALYTICS_ID`. It is not needed for the
direct GA4 tag above. If activated, review its behavior alongside the existing
tags to avoid duplicate collection.

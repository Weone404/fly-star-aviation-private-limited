# Analytics — the choice, and how to activate it

**Status: nothing is installed.** No GA4, no Plausible, no Meta Pixel, no
Clarity. `src/lib/analytics.ts` is wired and dormant: with no environment
variables set it injects no script, makes no request and writes no cookie. Until
you choose, this site is unmeasured — which is also why nothing in this campaign
has a before-and-after number attached to it yet.

Activation is two environment variables in Vercel. No code changes.

## The two options, honestly

|  | **GA4** | **Plausible** |
|---|---|---|
| Cost | Free | ~$9/month at this traffic |
| Search Console link | Native — GSC queries appear inside GA4 | None; you read GSC separately |
| Cookies | Yes (`_ga`, `_ga_*`) | None |
| Consent banner | Effectively required for EU visitors; a live question under India's DPDP Act | Not required — nothing personal is stored |
| Privacy policy burden | Must name Google as a processor, describe cookies, offer opt-out | One sentence |
| Data retention | Google's, 2–14 months configurable | Yours, unlimited |
| Learning curve | Steep. Explore reports, custom events, a lot of surface | One page |
| What you actually need it for | Which pages get traffic, from which queries, and whether enquiries rise | Same |

### The case for GA4
Free, and the Search Console integration matters more here than it usually does.
This campaign's success criteria are largely GSC metrics — impressions on the
recovered URLs, queries on the sourced corrections — and having those beside
behaviour data in one place removes a manual join.

### The case for Plausible
It is cookieless, so it sidesteps the consent question entirely rather than
managing it. Given you are already a data fiduciary under the DPDP Act for
enquiry data, and the privacy policy is currently blocked on this decision, the
simpler posture has real value: one paragraph instead of a section, no banner, no
opt-out mechanism to build. It is also a single page you will actually read,
which for a site this size is worth more than depth you will not use.

### The honest recommendation
**Plausible, unless budget is the deciding factor.** The GSC integration is the
only real advantage GA4 has here, and you will be opening Search Console directly
anyway for the URL Inspection and Pages reports. Against that, GA4 costs you a
consent banner, a longer privacy policy, and a processor to name — on a site
where the entire measurement need is "which pages get read, and do enquiries go
up."

If ₹800-odd a month is not worth spending, GA4 is a perfectly reasonable choice
and this loader supports it identically. The decision is yours; nothing in the
code prefers one.

## Activating

Vercel → Project → Settings → Environment Variables, then redeploy.

**GA4** — create a property at analytics.google.com, take the measurement ID:
```
VITE_ANALYTICS_PROVIDER = ga4
VITE_ANALYTICS_ID       = G-XXXXXXXXXX
```

**Plausible** — add the site at plausible.io, then:
```
VITE_ANALYTICS_PROVIDER = plausible
VITE_ANALYTICS_ID       = flystar.co.in
```

To turn it off again, remove both and redeploy. Half a config is treated as off:
a provider with no ID loads nothing rather than a broken tag.

## Verifying
1. View source on any page. With analytics off, no `googletagmanager` or
   `plausible.io` script tag is present.
2. After activating: GA4 → Admin → DebugView, or the Plausible dashboard, should
   register your own visit within a minute.
3. Confirm the tag loads *after* first paint — it is injected on
   `requestIdleCallback`, so it must not appear in the initial HTML.

## Then, immediately
Update `/privacy-policy` to name what you actually run. That page is blocked on
this decision, and it cannot describe cookies you have not chosen. See the
`[CONFIRM]` list in `drafts/privacy-policy.md`.

## What this loader deliberately does not do
- **No consent banner.** If you choose GA4 and want one, that is a separate
  build, and the loader would need to wait on consent before injecting.
- **No event tracking.** Page views only. Enquiry-submission events are worth
  adding once a provider is chosen, because "did enquiries rise" is the one
  number this campaign is actually judged on.
- **No second provider at once.** One at a time, on purpose.

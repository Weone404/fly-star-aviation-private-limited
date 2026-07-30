# Schema / Structured Data Findings — flystar.co.in

## Present (in index.html, static)
Valid JSON-LD `@graph` — 4 blocks, all parsed valid, ~14KB:
- Organization (#organization) — foundingDate 2008, telephone, sameAs (Google/FB/IG/YouTube/YourStory/Justdial)
- WebSite (#website) + SearchAction
- Place (#place) — PostalAddress (Dwarka, New Delhi 110077), GeoCoordinates
- EducationalOrganization (#localbusiness) — hours, contactPoint, knowsAbout, areaServed India
- Service ×2 (CPL, Cadet), Course ×2 (CPL, ATPL)
- BreadcrumbList — Home → CPL Training

## Issues
1. **[High] Same graph on every route.** Because it's hardcoded in `index.html`, `/about`, `/services/mro`, `/blogs/*` all serve the Organization + **CPL breadcrumb** + CPL/ATPL Course schema — incorrect page context.
2. **[Medium] Keyword-stuffed `name`.** e.g. Organization/Place/EducationalOrganization `name` = "Flying Star Aviator Private Limited | Best Cadet Pilot Training Institute in India - DGCA CPL Flight Training in Delhi". Use brand name; move keywords to `description`.
3. **[Medium] Missing per-page schema:** Course on each course page, Service on each service page, FAQPage where FAQs exist, BlogPosting on blog articles, per-location LocalBusiness.
4. **[Low] `image`** uses an external `lh3.googleusercontent.com` URL — self-host for stability.

## Recommendation
Move Organization + WebSite to a site-wide include; emit page-specific schema (correct BreadcrumbList + page-type entity) per route, ideally server-rendered.

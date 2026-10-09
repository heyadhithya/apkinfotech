# Verified website results — 9 October 2026

Tested the final local production build with Node v24.19.0 and Chromium,
not a live Vercel deployment. No product dependencies or services were added.

## Build and setup

- `npm run check`: exit 0; ESLint, 10 native tests, type generation/TypeScript,
  and Next.js production build all pass. All seven programme routes generated.
- `npm run smoke -- http://127.0.0.1:3001`: exit 0; homepage, seven course pages,
  enquiry/privacy/terms, robots/sitemap/assets, unknown-course 404, production
  canonical/indexing and security header all pass. Sitemap has 11 URLs.
- Fresh shell `bash -lc 'python3 scripts/check-setup.py'`: exit 0; 27 skills,
  RTK 0.50.0, Impeccable 0.1.12. Persistent IMPECCABLE_HOME remains
  `/workspace/apkinfotech/.tools/impeccable`; no temporary export was used.
- `git diff --check`: passed. No setup/start-skill, network, privacy,
  AGENTS.md, application dependency or lockfile changes.

Native tests emit an existing, non-failing MODULE_TYPELESS_PACKAGE_JSON warning
because Node 24 reparses TypeScript imports as ESM.

## Browser and accessibility

The final production run checks all 11 public pages at 320, 360, 390, 768, 1024, and 1440px:
66 route/viewport combinations, each HTTP 200, one h1, and no horizontal overflow.
Every main image was scrolled into view and decoded before full-page captures.
No unexpected browser console errors or page exceptions occurred. The deliberate
unknown-course navigation returns 404; its expected resource error is excluded.

14 axe scans cover all 11 pages, the photo dialog, invalid enquiry and draft review
with WCAG 2/2.1/2.2 A/AA tags and the experimental visible-label/name rule enabled.
Result: 0 violations. Two further scans of configured-service failure/success states
also return 0 violations. Automated results do not certify full WCAG 2.2 AA compliance.
Manual assistive-technology testing remains unperformed.

Production browser workflows pass:

- Three-featured/seven-course expansion, search, clear filters, empty-state recovery.
- Mobile menu initial focus, Escape, returned focus, active section navigation.
- Native-modal photo viewing, Escape dismissal, returned launcher focus.
- Programme query preselection, field/consent validation and first-invalid focus.
- Honest WhatsApp draft, course/contact text, explicit handoff and edit reset.
- Unknown-course 404 and reduced-motion scrolling.

A separate temporary test server renders the configured form; intercepted API
responses simulate loading, upstream failure, uncertain-submission draft,
retry and acceptance. No external lead service receives data. JavaScript-disabled
forced submission uses POST with no contact details in the site URL and is safely
rejected by the JSON-only endpoint. Real lead receipt remains unverified until
APK configures a verified service. Server tests independently cover foreign
origins, proxy bind-address handling, JSON/body/field restrictions, honeypot,
consent, upstream rejection/acceptance, HTTPS destinations and rate limits.

## Lighthouse

Lighthouse was run sequentially after browser work against the final local
production server. Mobile uses Lighthouse's default simulated mobile settings;
desktop uses its official desktop preset with a 1440×900 viewport. The final run,
not a selected best run, is recorded below.

| Page/profile | Performance | Accessibility | Best practices | SEO | LCP | CLS | TBT |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| home-mobile | 96 | 100 | 100 | 100 | 2.82s | 0.00000 | 54.0ms |
| home-desktop | 100 | 100 | 100 | 100 | 0.56s | 0.00005 | 0.0ms |
| course-mobile | 98 | 100 | 100 | 100 | 2.23s | 0.00000 | 39.0ms |
| enquire-mobile | 98 | 100 | 100 | 100 | 2.26s | 0.00044 | 35.0ms |

All measured category scores exceed the requested 90/95 thresholds. Home mobile
LCP 2.82s misses the ≤2.5s target in this final simulated run; measured CLS is 0.
INP is a field metric and was not measured; TBT is not represented as INP.
Local lab results do not establish real-user Core Web Vitals or production CDN
performance. Earlier measurement found homepage CLS 0.325; moving the loading
boundary to the dynamic enquiry route eliminated that shift.

## Review and remaining dependencies

Independent engineering review found and verified fixes for pre-hydration GET
privacy leakage and misleading failure-draft wording. Independent design review
scored its three finishing fixes resolved and returned `disposition: ship`.
Missing visual-comp/reference-card provenance and blocked reference fidelity
remain disclosed in the specification/DESIGN.md; no seed was fabricated.
One source-detector warning about an accent border was removed by changing that
aside to an ordinary surface border; the detector was not rerun to manufacture
a green count. The original browser-extension 42 report cannot be independently
reproduced from its count-only screenshot.

No company lead-service credential is configured. WhatsApp drafts and the
verified official Google Form remain functional fallbacks; real delivery,
provider retention and durable rate protections need confirmation before
activating direct lead submission. Unverified fees, timings, trainers,
partnerships, student outcomes and testimonials remain omitted or questions
for the team, as documented in LAUNCH.md.

The Vercel production URL returns HTTP 403 from this environment's proxy, and no
Vercel token is available. Source is prepared for the existing Git integration;
Git push does not prove deployment completion. Live deployment, real form receipt,
search inclusion, manual WCAG evaluation and field INP remain unverified.

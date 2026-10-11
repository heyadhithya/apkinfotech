# Portal verification — 11 October 2026

Branch: feature/student-learning-portal. Local implementation only; no push,
production deployment or external service provisioning.

## Passed

- `npm run check`: ESLint, 28 Node tests, Next type generation/TypeScript and
  production build. Existing public-site tests retained. Build generated 18 pages.
- `npm run test:integration`: real production Next server on port 3191, disposable
  SQLite, synthetic students A/B and staff. Auth, Secure/HttpOnly/SameSite cookies,
  no-store, foreign/missing Origin rejection, forged role/owner rejection,
  unauthenticated/student-to-staff denial, profile isolation, concurrent duplicate
  applications/enrollment, closed listings, staff decisions, ordered curriculum,
  prerequisite denial, completion idempotency/concurrency, assignments/feedback,
  unpublished gates, republish persistence, revoked/expired sessions all passed.
- `npm run smoke -- http://localhost:3100`: original marketing homepage, seven
  course routes, enquiry/legal/SEO/assets, unknown-course 404, security header,
  canonical/indexing and 11 sitemap URLs passed against production server.
- `PORTAL_SCREENSHOTS=/workspace/outputs/portal node scripts/portal-browser.mjs`:
  isolated production server on 3192, Chromium/Playwright. Homepage portal link,
  student signup, profile save/reload, internship application, enrollment,
  completion, assignment submission, staff acceptance, student accepted state,
  staff course/module/lesson creation, assignment feedback all passed. No uncaught
  browser errors. Student and staff mobile overflow assertions passed at 390px.
- axe-core WCAG 2 A/AA + WCAG 2.1 AA: no violations on tested login, student
  learning desktop/mobile, staff curriculum desktop and assignment mobile main
  regions. This is automated coverage, not a full assistive-technology audit.
- Independent security review found and fixed inherited action-name false success,
  ignored demo flag updates and global authentication lockout. Regression tests
  cover each. Stored-role resolution and ownership are verified against real DB.
- Fresh-process database persistence, concurrent processes applying once, demo seed
  idempotency/no credentials, production/Vercel fail-closed guards tested.

Browser tool dependencies were already available in this execution environment;
Playwright/axe-core and a Chromium executable are required to rerun that optional
script elsewhere. CHROMIUM_PATH overrides `/usr/bin/chromium`. Screenshots default
to `.data/browser-evidence`, or set PORTAL_SCREENSHOTS. No browser packages were
added to application runtime dependencies.

## Evidence / limitations

Screenshots: login-desktop.png, student-internships.png, student-learning.png,
student-mobile.png, staff-applicants.png, staff-curriculum.png, staff-mobile.png.
All accounts and content in screenshots are synthetic. Port 3000 development
server is local to this workspace; there is no verified public preview URL.

Design detector flagged additional portal tonal/status colors and dense single-line
CSS border heuristics; portal now reuses brand navy/gold/muted/line variables and
common type sizes. Accent borders are on square banner/auth surfaces or flat tabs,
not rounded cards. Remaining semantic success/error tones are intentional. The
existing design system is preserved; no imagery or claims were replaced.

During verification, one browser test initially timed out because its exact
accessible-label selector included select option text; using the form's named
select resolved the harness issue. A navigation interception bug was fixed and
verified by entering the portal from the homepage. Earlier build filesystem-trace
warning was removed using the documented runtime-path tracing opt-out. Existing
Node typeless-package warnings remain; they do not fail checks.

Not run: real provider email, production deployment, real payment/files, staff MFA,
manual screen-reader audit, load/penetration testing or production disaster recovery.
See README.md in this directory for exact production blockers and domain limits.

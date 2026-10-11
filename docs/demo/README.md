# Seven-role pre-production demo

Run `npm run demo -- --port 3200`, then visit `/demo`. For a production build,
set `PORTAL_DEMO_MODE=true` during both `npm run build` and `npm start`.
The flag serves the demo at `/` and `/demo` and disables indexing.

Choose Student, Academics, Placement & HR, CTO, Administrator, Finance or Business.
No passwords or real credentials are needed. All accounts, applications, lessons,
projects, leads and financial records are synthetic. Changes persist in this
browser tab's sessionStorage; Reset demo restores the seed. Closing the tab may
lose changes. This is not shared company storage or a production login system.

Student profiles, applications, sequential learning and assignments connect to
staff course management and HR reviews. CTO manages delivery projects; admin
manages sample identities and activity; finance simulates invoices and expenses;
business manages a lead pipeline. No email, money movement or external CRM writes
occur. The real SQLite `/portal` remains separate and refuses Vercel execution.
Do not enter real personal or financial data. CIN remains awaiting verification.

Verification commands:
- `npm run check` — lint, 40 tests, types and production build.
- `npm run test:integration` — isolated real portal HTTP regression coverage.
- `PORTAL_DEMO_MODE=true npm run build` — demo build.
- `PORTAL_DEMO_MODE=true VERCEL=1 npm start -- --port 3001` followed by
  `node scripts/demo-smoke.mjs http://localhost:3001` — real-auth isolation.
- `DEMO_BASE_URL=http://localhost:3001 node scripts/demo-browser.mjs` — all roles,
  browser persistence, learning, HR, project creation, admin, finance, CRM,
  cross-role updates, reset, mobile overflow and automated axe accessibility.
  Requires the environment's Playwright, axe-core and Chromium.

Deployment is authorized only to existing project apkinfotech, production alias
https://apkinfotech.vercel.app. Original production rollback candidate:
`dpl_J6y5cVZsGLb8vn9WPqgueHvPbSHC`, source `3c29de8d2ccdb62d1ee8625cffff12014bb82189`.
Source ZIP export remains unapproved. No database or paid services provisioned.

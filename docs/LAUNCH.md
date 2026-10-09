# Website launch and content

The site runs on Node 24 and the existing Next.js/Vercel stack. `npm run check`
runs lint, native tests, type checking, and the production build. Start that build
with `npm run start`; `npm run smoke` checks the homepage, all seven courses,
enquiry/legal pages, SEO files, assets, canonical/indexing, and a 404.

## Enquiries

No lead service is currently configured. The form validates contact details and
explicit consent, creates a readable WhatsApp draft, and opens WhatsApp only on
a separate visitor action. It never reports a completed submission in this mode.
The verified official Google Form is always available as a registration fallback.

To enable direct submission, APK must select and verify a company-controlled
public HTTPS endpoint and its privacy/retention practices. Set
`ENQUIRY_WEBHOOK_URL` and, when required, `ENQUIRY_WEBHOOK_TOKEN` securely in
Vercel environment settings, then redeploy. Do not put credentials in repository
files or client bundles. `.env.example` contains names only.

The endpoint receives a JSON POST with name, email, optional phone, course ID,
verified courseTitle, optional message, consent:true, source, and submittedAt.
An optional token is sent in the Authorization bearer header. Only a successful
2xx response produces an accepted-enquiry message. Redirects are rejected,
delivery times out after 8 seconds, and failures offer retry/WhatsApp/Google Form.
Test real receipt and failure behaviour with the selected service before using
online submission. No service response body is shown to visitors or logged.

The API validates every field, rejects non-JSON/cross-origin requests, caps bodies
at 16 KiB, checks a honeypot, and limits attempts to 5 per minute. The hashed network
counter lives in process memory and resets across restarts or Vercel instances.
It is a best-effort limiter, not durable distributed protection. Configure rate
limiting/spam protection in the chosen service or Vercel firewall before enabling
the lead service at scale. Only the hosting platform's forwarded address is
trusted in Vercel; other environments share a local request counter.

## Production search and sharing

`SITE_URL` defaults to the existing public production site,
https://apkinfotech.vercel.app. Update it to the verified final domain when that
changes, and redeploy. Production has index/follow, 11 canonical sitemap routes,
robots.txt, course/breadcrumb and organization data, favicons, and a 1200×630
social preview made from the original official logo. Development and Vercel
preview builds block indexing; `SEARCH_INDEXING=off` blocks other staging builds.
Validate canonical URLs and indexing on the live production domain after deployment.

## Content requiring APK confirmation

The seven official courses and their listed topics are in
`src/app/course-data.ts`; actual archive descriptions are in
`src/app/activity-data.ts`. Source evidence remains in
`docs/official-site-sources.json` and `docs/photo-sources.json`.

The source material does not verify full syllabuses/module order, eligibility,
fees, duration, delivery format, current batch dates, assigned trainers, specific
course project deliverables, certifications, working hours, partnerships,
placement outcomes, or testimonials. Pages direct visitors to confirm these
facts with the team. No trainer/partner/testimonial section is populated without
approved evidence. Archive project-review photos are shown as evidence of past
activity; no named project or student outcome is invented. The GPS photo venue
is not treated as a current office or extra branch.

The privacy notice describes actual technical handling. APK must confirm the
selected lead service, retention/contact handling, and enrolment/refund terms;
update the notices when those practices change. No payments, accounts, or LMS
have been added. Browser conversion events contain only action and course ID,
remain within the browser, and have no external analytics consumer installed.

Environment install/start settings, privacy Only me, and network policy remain
unchanged. A Git push can trigger the user's existing Vercel integration; a push
alone does not prove deployment completed. Live deployment inspection is blocked
by this environment's Vercel network access and absent Vercel credentials.

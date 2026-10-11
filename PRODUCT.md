# APK Infotech
<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js 16 App Router, React 19, TypeScript, and npm on Node 24. The implemented
enterprise training website uses self-hosted Manrope, optimized local documentary
photos, shared navigation/footer, static programme pages, and a conditional
Node.js enquiry endpoint. The repository is connected to the user’s Vercel account.

## Users

The user is a freelancer improving a client website. Visitors explore technical
training, career preparation, and internship information and contact APK Infotech.
Specific learner backgrounds, preferred languages, and entry requirements remain
unconfirmed.

## Product Purpose

A complete enterprise training website with course discovery, seven programme
detail pages, factual about content, past activities with photo viewing,
internship enquiries, FAQ, official contacts, and privacy/website terms pages.
The approved direction takes corporate cues from AWS Training and IBM while
preserving the official APK navy-and-gold identity. Live reference fidelity is
unverified; reference requests were blocked. The authorized local student internship and learning portal extends this scope; see the portal section below.

## Positioning

Technical training and career preparation in Mannivakkam, Chennai. No verified
client differentiation, outcome statistics, placement guarantees, ratings,
testimonials, trainer profiles, or accreditation claims have been supplied.

## Operating Context

Repository: https://github.com/heyadhithya/apkinfotech.
Development uses Codex Cloud and repository-local workflows. Official courses,
branding, contacts, and office information were verified on 2026-10-09 and recorded
in `docs/official-site-sources.json`. Canonical URL uses `SITE_URL` with the Vercel
site fallback. Production permits indexing except preview deployments or an
explicit indexing-off setting; development/preview disable it. The implementation
includes page metadata, canonical links, social preview/favicon/logo assets,
Organization/Course/Breadcrumb structured data, robots, and an eleven-URL sitemap
(home, seven courses, enquiry, privacy, terms); the sitemap is empty when indexing
is disabled. These capabilities do not establish search-engine inclusion or a
verified custom-domain deployment.

## Capabilities and Constraints

Home shows three featured programmes with an accessible expand-to-seven action.
Category/search filters intersect; a native programme finder sits within a
course-section disclosure. Internal course/enquiry routes preserve selected course
context. Shared navigation provides six section links and an enquiry action, with
mobile focus/Escape handling and route/hash current-state semantics. Archive
filtering, native activity disclosures, and a photo dialog retain past-activity
labels. About and internship content describe verified facts and questions to
confirm rather than inventing availability.

The enquiry form requires name, email, a listed programme/help option, and explicit
consent; phone and message are optional. It validates fields and preserves retry
context. With no configured company lead service, it prepares a reviewable,
unsent WhatsApp draft in the browser; only an explicit subsequent action opens
WhatsApp. The visitor decides whether to send there. The verified official Google
Form is an alternative. A valid configured HTTPS `ENQUIRY_WEBHOOK_URL` enables
server forwarding and only upstream acceptance produces a success message;
optional token authentication is supported. No live lead-service credentials were
supplied, and receipt/storage by a real company service has not been verified.
The application has no local enquiry database or PII logging. Rate limiting uses
a temporary hashed network identifier; conversion events stay in the browser.
No external analytics or advertising trackers are installed. The portal uses an essential session cookie.
External service privacy/retention must be confirmed with the company.

The marketing enquiry flow does not process payments or enroll users. The separate
portal provides accounts, learning enrollment, lessons and dashboards. Registration of interest does not
reserve a seat, confirm a batch, or guarantee employment.

Implemented canonical programme paths:

- `/courses/full-stack` — Full Stack Web Development
- `/courses/agentic-ai` — Agentic AI with Gen AI
- `/courses/vlsi` — VLSI Design
- `/courses/cyber-security` — Cyber Security
- `/courses/robotics` — Robotics and PCB Design
- `/courses/placement` — Placement Readiness Program
- `/courses/get` — Graduate Engineering Training (GET)

Other routes: `/`, `/enquire`, `/privacy`, and `/terms`. Course detail pages use
confirmed topics and explicitly request confirmation of the full syllabus,
eligibility, duration/format, fees, batch dates, trainer/support, and certification.

## Brand Commitments

Use the genuine APK Infotech IT Solutions Pvt Ltd full logo, retrieved from the
official site, without redrawing or recoloring it. Preserve the white/navy/gold
enterprise system, readable self-hosted Manrope, documentary photography with
truthful captions, and restrained accessible motion. `DESIGN.md` records actual
tokens, responsive behavior, and components; its schemaVersion 2 sidecar contains
extensions and renderable examples.

## Evidence on Hand

The user supplied an archive of 80 photos and two videos covering past workshops,
internships, project reviews, and college engagement. Selected sources are in
`docs/photo-sources.json`. Archive GPS labels identify a photographed venue, not
the current office. Verified official office: No. 65, 5th Street, Ram Nagar,
Mannivakkam, Chennai, Tamil Nadu 600048. Official email: official@apkinfotech.in;
phones: +91 89394 10255 and +91 63812 72033. Call ahead before visiting.

Current fees, batch schedules, duration, entry requirements, certification,
trainers, learner support, placement outcomes, testimonials, and accreditation
remain unverified. Retention periods and complete enrolment/refund terms are also
unconfirmed. Obtain client-approved evidence before publishing those claims.

## Product Principles

- Make confirmed topics, unknown details, and the visitor’s next action clear.
- Keep facts and documentary captions grounded in supplied or official evidence.
- Distinguish a draft, server acceptance, registration of interest, and enrolment.
- Preserve accessible keyboard, mobile, error, retry, and reduced-motion flows.
- Do not expand a visual reference into unapproved LMS or business capabilities.

## Student internship and learning portal — authorized 2026-10-11

`/portal` extends the existing brand with an Operate-mode student/staff workspace.
It uses a local persistent SQLite backend, secure student signup/session handling,
profiles, internship applications/statuses, staff management, course enrollment,
ordered modules/lessons, progress and text assignments/feedback. Demo records are
opt-in and labelled; no real opportunities or accredited outcomes are invented.

Portal setup, permissions, domain rules and production blockers are documented in
`docs/portal/README.md`. This release is a local evaluation build, not a deployed
service: Vercel ephemeral storage is refused; production needs durable hosting,
verified origin, account recovery/verification, staff MFA and privacy decisions.
No payments, external employers, uploads or email delivery were added.

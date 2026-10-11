# Student internship and learning portal

Local full-stack release, added 11 October 2026. APK manages opportunities and
learning content. The original marketing website and enquiry workflow remain.
The portal is available at `/portal`; staff and students see their own workspace.

## Run locally (Node 24)

```sh
npm ci
npm run portal:seed       # optional, synthetic content only; no accounts
npm run portal:staff      # interactive local staff setup; hidden password input
npm run dev
```

Open `http://localhost:3000/portal`. Create a student account in the UI. The seed
creates two clearly labelled demo opportunities and two short practice courses;
it never creates default users/passwords. Staff setup refuses to overwrite an
existing user or run with NODE_ENV=production. Use synthetic personal data while
evaluating. Local data is persisted in ignored `.data/portal.sqlite` and its WAL.
Do not copy that database into source control or a shared source artifact.

Set `PORTAL_ORIGIN` to the exact browser origin when using another port. The
local default is `http://localhost:3000`; `127.0.0.1` is a different origin.
`PORTAL_DB_PATH` can select a separate absolute database path.

For a local production build:

```sh
npm run build
PORTAL_DB_PATH="$PWD/.data/portal.sqlite" PORTAL_ORIGIN=http://localhost:3000 npm start
```

Cookies are Secure in production; browsers permit this on localhost. A real
remote server requires HTTPS. Production refuses missing database/origin config;
Vercel hosting is refused because its local filesystem is not durable.

## Working features

- Student signup/sign-in/sign-out; salted scrypt passwords, hashed opaque sessions,
  seven-day expiry and server-side logout revocation. Signup creates students only.
- Persisted profile, published/closed opportunity details, motivation/application,
  duplicate prevention, tracking and withdrawal before a final decision.
- Staff opportunities (draft/published/closed), applicant profiles and decisions.
- Open enrollment in published courses, ordered modules and lessons, persisted
  completion/progress, text assignments and staff feedback.
- Staff course/module/lesson create/edit, ordering and course publication controls.
- Accessible labelled forms, responsive dashboards and explicit error states.

## Deliberate domain rules

Enrollment is open and free for published courses; it is separate from internship
selection. Course content is plain text. No files or embedded HTML are executed.
Lesson completion and assignment submission require enrollment, a published
course, and all earlier lessons completed, ordered by module then lesson position.
Reading data includes published enrolled curriculum; the UI guides sequential
reading. Modules/lessons have unique positions within their parent; to swap two
positions, first move one to an unused position. Cross-course moves are refused.

Progress is completed current lessons / all current lessons; adding a lesson can
reduce the percentage and introduce a new prerequisite. Completion is idempotent.
Unpublishing hides modules/lesson bodies and prevents completion/submission while
preserving enrollment and progress. Enrolled students retain the course title and
description with an unavailable label; do not put confidential drafts in these
fields. Republish restores access. Applied internships remain visible even if
unpublished so students retain status tracking. Draft opportunities accept no
new applications. Deadlines end at 23:59:59.999 UTC on the stated date.

An application is unique per student/opportunity, including after withdrawal.
Staff may move submitted/reviewing applications to reviewing/accepted/rejected.
Accepted/rejected/withdrawn are final. A student can withdraw submitted/reviewing.
Transitions are recorded in application_history. Assignment resubmission replaces
the text, clears previous feedback and returns it to submitted. No notifications
are sent. Success means the database transaction committed, not enrollment in an
external programme or confirmation of a real vacancy.

## Verification

```sh
npm run check              # lint + unit/domain tests + typecheck + production build
npm run test:integration   # starts isolated production server on 3191, tests, cleans up
npm start                  # separate terminal, with portal config if testing portal
npm run smoke              # existing public-site production regression checks
```

Integration tests create only disposable synthetic users/content in a temporary
database. They exercise real HTTP, roles, CSRF, student A/B isolation, staff CRUD,
duplicate requests, ordered learning, assignments, unpublish/republish, cookies,
logout, expiry and failed writes. `PORTAL_TEST_PORT` changes the test server port.

Browser evidence and its exact run are recorded in `VERIFICATION.md`. Browser
screenshots show synthetic people only and are not evidence of a live deployment.

## Production blockers (do not deploy this database backend to Vercel)

1. Choose persistent single-server hosting with HTTPS, storage permissions,
   backups and restore tests, or migrate the domain adapter/schema to a managed
   database for multi-instance/serverless hosting. This release uses Node SQLite.
2. Confirm the public origin and operational admin bootstrap/account management;
   add staff MFA, verified email, recovery and password change/reset before real
   enrollment. There is no automated account deletion or staff lifecycle UI.
3. Configure an edge/reverse-proxy client rate limit and resource limits. Current
   account/mutation throttles persist in SQLite and expensive hashing is bounded
   per process; these are not a distributed bot/registration abuse defence.
4. Approve privacy notice, retention/deletion policy, actual opportunities and
   curriculum. Replace demo content deliberately. No accreditation/outcome claims.
5. Establish migrations, monitoring and audit retention for ongoing operations.
   Current schema creation initializes a new database; it is not a versioned
   production migration framework. Staff curriculum changes have no audit history.

Not included: external employers, payments, résumé/video/file uploads, certificates,
attendance, quizzes/grading, email delivery, full-text search at scale, pagination.
The protected snapshot is appropriate for a small local pilot; add scoped queries
and pagination before operating a large school. No push or deployment is authorized.

# APK student internship and learning portal

Authorized 2026-10-11: implement now with sensible defaults; no push, deployment,
external provisioning, production migration or external credential creation.

## Design
Extend the existing Next.js app and navy/gold brand. APK is the sole operator.
Students register/sign in, maintain a profile, apply to internships, follow status,
enroll in published learning courses, read ordered modules/lessons, complete them,
and submit text assignments. Staff manage listings, applications, courses, modules,
lessons and review assignment submissions. Existing marketing/enquiry stays intact.

Use Node 24 built-in SQLite on a persistent local disk with foreign keys, WAL,
transactions and unique constraints. No new hosted account required. This is a
single-server backend; Vercel ephemeral storage is explicitly unsupported. Default
DB under ignored .data; fail closed on Vercel or production without explicit path.
Passwords use salted scrypt; opaque random sessions stored hashed, expiry, HttpOnly
SameSite cookies; same-origin mutation checks. Session identity is resolved server
side; every service checks role and ownership. No client-supplied user/role trusted.
Public registration only creates students. Staff bootstrap via explicit local CLI.
Demo seed is opt-in synthetic learning/opportunity content, no embedded passwords.

## Tasks / ownership
1. Integration owner: shared types/contract, auth/session, API, app wiring, documentation.
2. Storage worker: database schema, domain service, seed and domain tests.
3. Student UI worker: student portal pages/components and scoped student CSS.
4. Staff UI worker: staff management component and scoped staff CSS.
5. Integration owner: lint, tests, typecheck, build, HTTP/browser workflows and fixes.

Shared types in src/lib/portal/types.ts are the contract. UI calls GET /api/portal
for an authenticated snapshot; POST /api/portal {action,payload} for mutations.
GET /api/portal/session returns {user:null|User}; auth POST endpoints register,
login, logout. POST responses {ok:true,...} or {error:string}, never fake success.

## Verification
Baseline: 10 existing tests passed. Add real temporary SQLite tests for persistence,
unique applications/enrollments, roles, cross-user denials, lesson ordering/progress,
and assignment review. Check actual HTTP auth, cookie/CSRF behavior and both roles.
Inspect desktop/mobile with browser if available. Run npm run check + smoke.

## Decisions / progress
- Use local feature branch feature/student-learning-portal in saved checkout.
- No external employer marketplace, payments, files or video uploads in this release.
  Profile includes portfolio URL; assignments use bounded text submissions.
- Course content is plain text (no arbitrary HTML execution).
- Production mail verification/recovery and persistent hosting remain launch work.
- All implementation tasks complete; integration/browser/security verification passed (see VERIFICATION.md).
- Unpublished enrolled courses retain metadata but deny content and progress writes.
- Independent review found inherited action names, demo flag update persistence, and
  shared auth lockout. Regression tests added and fixes applied.

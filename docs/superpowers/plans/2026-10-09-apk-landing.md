# APK landing page Implementation Plan

> Use executing-plans for inline execution, as the user requested building now.

**Goal:** Build a Coursera-inspired landing page showcasing APK Infotech's past activities with real supplied photography.
**Architecture:** Next.js server page plus one client activity-discovery component. Local media, no new product dependencies or backend.
**Tech Stack:** Next.js, React, TypeScript, authored CSS.
**Spec:** docs/superpowers/specs/2026-10-09-apk-landing-design.md

## Global constraints
- Archive contents show past activities, not current course availability.
- Preserve real photography, no invented results, pricing, reviews, or contacts.
- Mannivakkam is a photographed venue, not proof of a branch list.
- No deployments or commits; preserve environment settings.

## Review focus
- Mobile navigation, keyboard focus and filter usability.
- Empty search and resetting combined filters.
- Real media loading and readable image crops.
- Historical wording throughout; no current enrolment promises.
- Map links and external enquiries must have genuine destinations.

## Tasks
- [x] Prepare selected optimized archive assets and origin inventory.
- [x] Write a browser smoke test for the new hero and activity filtering; run it against the starter and observe failure.
- [x] Implement semantic landing sections and interactive activity cards; update page metadata and smoke script for the new content.
- [x] Run lint, type checking, build, setup check, browser interaction tests and desktop/mobile captures.
- [x] Inspect captures, batch any fixes, request independent review and document the final design.

Ruling: User's “build it” directs immediate inline execution, rather than another approval round. Existing isolated cloud checkout is used. No worktree or commit is needed.

Validation: npm run check passed; fresh-shell setup check passed (27 skills); production smoke HTTP 200; browser search, no-results, clear filters, categories, native details, mobile navigation, photo loading and desktop/mobile overflow checks passed. Independent review: ship, both visual findings resolved. No commits or publication.

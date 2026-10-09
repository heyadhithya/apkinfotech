# Development Setup Implementation Plan

> For agentic workers: use Superpowers executing-plans to complete and verify the remaining tasks.

**Goal:** Prepare the approved Next.js starter, relevant skills, Vercel deployment,
Linear planning, and a verified Codex Cloud development environment.

**Architecture:** One Next.js application at the repository root. Repository-local
skills, npm lockfile, and CI travel with every checkout. Vercel deploys GitHub
changes; Linear tracks work. Cloud configuration prepares tools and starts Next.

**Tech Stack:** Next.js App Router, TypeScript, npm, Node 24, Vercel, Linear.

**Spec:** `PRODUCT.md` and `docs/adr/0001-nextjs-and-vercel.md`.

## Tasks

- [ ] Add the minimal starter, lockfile, smoke check, and relevant Matt Pocock
  skills. Update Cloud setup, CI, agent commands, and product context. Verify
  setup, lint, type checking, build, and the running production server.
- [ ] Create the Linear project and initial scoped backlog. Connect the GitHub
  repository to a Vercel project and observe a ready starter deployment.
- [ ] Republish Cloud with the latest main, persistent tool cache, dependency
  installation, and app startup instructions. Run a fresh-task verification and
  document the daily workflow, URLs, remaining decisions, and integration limits.

## Review Focus

- A fresh Cloud shell must find the Impeccable cache without a temporary export.
- The starter must not invent client facts or appear to be a completed site.
- Vercel must deploy the intended repository and branch without repo secrets.
- Linear tickets must remain in the confirmed scope and avoid duplicates.
- Published Cloud configuration must match the final starter commit.

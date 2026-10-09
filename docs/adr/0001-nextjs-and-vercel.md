# 0001: Next.js starter and Vercel

Date: 2026-10-09. Status: accepted by the user in the setup conversation.

Use Next.js App Router with TypeScript and npm, deployed on the user's Vercel
account. Start with a minimal, noindex development page. Build the real client
website in Codex Cloud after the brief and client content are confirmed.

Use Vercel's GitHub integration for previews and production deployments so Cloud
development does not require copying Vercel account credentials into the repo.
Use Linear for planning. Payments, a database, learner accounts, and a full LMS
remain outside the approved starter scope.

Next.js 16.4's lint dependencies currently require ESLint 9 and TypeScript below
6.1. Keep the compatible pinned versions until that upstream support changes;
ESLint 9 currently emits an end-of-support notice during installation.

Seven-role pre-production demo: see [demo operation and release notes](docs/demo/README.md).

# APK Infotech

The implemented site now includes a local full-stack student internship and learning
portal at `/portal`. See [portal setup, features and production blockers](docs/portal/README.md)
and [build progress](BUILD_PROGRESS.md). Node 24 and a persistent SQLite file are required.


Website project for a freelance client: a course-focused landing page with
placement support and job readiness content. Product scope is recorded in
[PRODUCT.md](PRODUCT.md). The public training website is implemented in Next.js App Router.
Earlier starter setup notes below are retained for environment context.

The repository is prepared for Codex Cloud with **Impeccable**, **Superpowers**,
**Ponytail full**, **Matt Pocock skills including Grill Me**, and **RTK**.

```bash
bash scripts/cloud-setup.sh
python3 scripts/check-setup.py
npm run dev
```

See [Cloud setup and first task](docs/CLOUD.md),
[agent instructions](AGENTS.md), and [tool versions and sources](docs/TOOLS.md).
Run `npm run check` for lint, types, and a production build. See
[the daily workflow](docs/WORKFLOW.md) for Linear issues, Cloud development,
Vercel previews, and release checks. The starter is marked noindex and contains
no unverified client content.

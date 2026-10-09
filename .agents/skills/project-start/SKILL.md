---
name: project-start
description: Start or resume work in the APK Infotech Cloud environment and check the project tooling before product tasks.
---

Read `AGENTS.md`, `PRODUCT.md`, and `docs/CLOUD.md` from the repository root.
Run `python3 scripts/check-setup.py`. If tools are missing and installation is
permitted by the environment, run `bash scripts/cloud-setup.sh` and check again.
Do not report readiness on a failed check; report the exact missing prerequisite.

Use Node 24 and run `npm ci` if dependencies are absent. For a UI task, start
`npm run dev -- --hostname 0.0.0.0` using the host's long-running command facility
and wait for an HTTP 200 response on port 3000. Reuse an existing healthy server
instead of starting a duplicate. Use the host's preview/port-forwarding capability
when available. Report the actual preview URL; do not invent one.

The app is only a minimal starter. Resolve missing product decisions using
`grill-me` before implementing the client website. Do not invent client content,
credentials, testimonials, course details, or placement claims.

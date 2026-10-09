---
name: project-start
description: Start or resume work in the APK Infotech Cloud environment and check the project tooling before product tasks.
---

Read `AGENTS.md`, `PRODUCT.md`, and `docs/CLOUD.md` from the repository root.
Run `python3 scripts/check-setup.py`. If tools are missing and installation is
permitted by the environment, run `bash scripts/cloud-setup.sh` and check again.
Do not report readiness on a failed check; report the exact missing prerequisite.

No app or dev server exists yet. Ask for the actual requested task and resolve
missing product decisions using `grill-me` when appropriate. Do not invent a
framework, server command, content, credentials, or placement claims.

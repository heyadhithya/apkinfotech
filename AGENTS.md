# APK Infotech

Read `PRODUCT.md` before product work and `docs/CLOUD.md` for environment setup.
This repository currently contains agent tooling and product context; there is
no application scaffold or selected framework yet.

## Working rules

- Use Ponytail full by default: make the smallest complete change, reuse existing
  code, and skip unrequested features, abstractions, and dependencies.
- Read the relevant skills under `.agents/skills/` before using them. Start with
  `using-superpowers`, then use the applicable planning, debugging, testing, and
  verification skills. Scale process to the task; an explicitly authorized setup
  or fix does not need a second permission request.
- Use `grill-me` / `grilling` when asked to stress-test requirements or when a
  product decision prevents correct implementation. Inspect available facts
  first, recommend answers, and wait for decisions. Installing these skills
  does not itself start a product interview or authorize an app build.
- For UI work, use `impeccable`: load its context, preserve confirmed product
  truth, establish the design direction, implement accessible responsive flows,
  and inspect the result at desktop and mobile sizes.
- Skill references to a `Skill` tool mean read the named `SKILL.md` when that
  tool is unavailable. Use tools actually exposed by the host; do not pretend
  local plugin hooks, app connectors, or subagents exist in Cloud.
- User instructions take precedence over skills. Ask only for genuinely missing
  decisions or wider scope. Do not invent courses, fees, placement rates,
  accreditation, partner logos, testimonials, or client claims.
- Do not overwrite the user's changes. Never commit secrets or `.env` files.

## Commands and evidence

- Prepare tools: `bash scripts/cloud-setup.sh`.
- Check setup: `python3 scripts/check-setup.py`.
- Use `.tools/bin/rtk git status`, `.tools/bin/rtk git diff`, and other supported
  RTK commands to condense output. Use `rg` for searches. When filtered output is
  unusable, recover the raw output with `.tools/bin/rtk proxy <command>`.
- RTK is called explicitly in Cloud; automatic local command-rewrite hooks are
  not assumed. Do not install global hooks or change trust settings as a side effect.
- There are no app build/test/dev commands yet. When a stack is chosen, add its
  lockfile, update setup and CI for it, and document the actual commands here.
- Before claiming completion, run the relevant checks and report their results.
  Finish with what was skipped or unverified and any material remaining risk.

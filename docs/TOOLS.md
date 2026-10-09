# Tool sources

Skill packages are vendored so new Cloud tasks do not need to install them at
agent startup. Preserve upstream license files and references when updating.

| Tool | Source and pinned revision | Installation |
| --- | --- | --- |
| Impeccable | [pbakaus/impeccable](https://github.com/pbakaus/impeccable), installed skill 4.5.1, engine 0.1.12 | Official engine installer, project scope, Codex provider, no hooks |
| Superpowers | [obra/superpowers](https://github.com/obra/superpowers/tree/8ca22dba9a94f28898bbce59f2537ff4d87c747d), commit `8ca22dba9a94f28898bbce59f2537ff4d87c747d` | Complete upstream `skills/` tree copied into `.agents/skills/` |
| Ponytail | [DietrichGebert/ponytail](https://github.com/DietrichGebert/ponytail/tree/9cc65d03aa2da1db7121b912d03596409ee340b8), version 5.1.0, commit `9cc65d03aa2da1db7121b912d03596409ee340b8` | Upstream `skills/ponytail/SKILL.md`; full mode set in `AGENTS.md` |
| Matt Pocock skills | [mattpocock/skills](https://github.com/mattpocock/skills/tree/b0618bc436ad893b3c5e84e55fba86586d34a404), commit `b0618bc436ad893b3c5e84e55fba86586d34a404` | `grill-me`, `grilling`, `grill-with-docs`, `domain-modeling`, `to-spec`, `to-tickets`, `code-review`, `handoff`, and `setup-matt-pocock-skills` with their supporting files |
| RTK | [rtk-ai/rtk v0.50.0](https://github.com/rtk-ai/rtk/releases/tag/v0.50.0) | Release archive verified against the SHA-256 digest recorded in setup |

Licenses are in `docs/licenses/`. Upstream skill instructions are retained;
`AGENTS.md` explains host tool adaptation and precedence. Plugin hook systems are
not vendored or enabled. Impeccable's official installer installed a local
engine binary; Git excludes it, and setup uses the shipped checksum-verifying
launcher to prepare a fresh cloud machine.

After changing tool versions, update the pins and setup checks together. Run
setup twice, then verify from a clean checkout with a fresh tool cache before
publishing the updated environment.

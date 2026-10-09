# Codex Cloud

The repository contains the skills and product brief needed by a fresh Cloud
task. Local plugin installations are not copied to a cloud machine.

## Environment configuration

1. In ChatGPT, choose **Work in > Cloud > Select environment > Create environment**,
   or open **Settings > Codex Cloud > Environments**.
2. Select `heyadhithya/apkinfotech`, branch `main`.
3. During setup, ask Codex to use this install command:

   ```bash
   bash scripts/cloud-setup.sh
   ```

4. Use the repository's `project-start` skill as the start instructions. It checks
   tooling and starts the existing Next.js server for UI tasks.
5. Run `python3 scripts/check-setup.py`, review the configuration and setup
   results, then publish the environment. In a new task, select that environment.

No project secrets, API keys, database, hosting account, or paid service are
required for this initial setup. Keep environment privacy at **Only me** unless
the user requests sharing. Preserve the existing network policy. Downloads need
GitHub release access during installation; the installed skills work offline.
Impeccable live/browser features may require additional network access later.

The script supports Linux x86_64 and arm64, installs a pinned checksum-verified
RTK binary under `.tools/bin`, warms Impeccable's engine cache, and runs `npm ci`.
It can be run again on a prepared environment. Tool binaries and caches are ignored by Git.
The agent uses RTK explicitly; this does not claim Cloud hook support.

Use Node 24. Persist `IMPECCABLE_HOME` as the absolute checkout path followed by
`/.tools/impeccable` (currently `/workspace/apkinfotech/.tools/impeccable`) in Cloud
environment variables. This runtime's home directory is not writable. Setup and
the check command also default to the ignored project cache. Verify from a fresh
shell and a new task after publishing.

For the legacy Code Review/integrations environment, set the setup script to
`bash scripts/cloud-setup.sh` and the maintenance script to that same command.
These settings are entered in the Cloud UI; no repository TOML is advertised as
automatically creating a cloud environment.

## First task

```text
Read AGENTS.md and PRODUCT.md. Use Ponytail full and Superpowers.
Use $grill-me to resolve the APK Infotech website brief before implementation.
Ask for the existing client website, approved content, stack/deployment choice,
and the first visitor action. The stack is already Next.js and Vercel.
Use Impeccable for the agreed UI work.
```

Use `$impeccable shape landing page` to work through UI requirements,
`$impeccable audit` to inspect an implemented interface, and
`$impeccable polish` for its finishing pass. Plain language naming the skill
also works when the host's picker uses a different invocation syntax.

## Official documentation

- [Cloud environments](https://learn.chatgpt.com/docs/environments/cloud-environments)
- [Repository skills](https://learn.chatgpt.com/docs/build-skills)
- [Legacy cloud setup](https://learn.chatgpt.com/docs/environments/cloud-environment)

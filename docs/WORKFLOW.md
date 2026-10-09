# Developing APK Infotech

## What each service does

- GitHub holds the source, skills, lockfile, checks, and reviewed changes.
- Linear holds the brief and development issues. It does not store the app.
- Codex Cloud checks out the repository into an isolated workspace, installs
  tools and npm dependencies, reads `AGENTS.md`, and implements the chosen task.
- Vercel builds repository changes into review previews and production releases.

## Daily workflow

1. Pick a scoped issue in the APK Infotech Linear project. Start with the brief:
   supply the existing client website, approved assets, course details, and the
   intended visitor action. Use `grill-me` to resolve decisions before building.
2. In ChatGPT, select **Work in > Cloud**, then the **apkinfotech** environment.
   Give Codex the Linear issue URL or paste its description if the connector is
   unavailable. Tell it to read `AGENTS.md` and the issue's acceptance criteria.
3. Work on a branch named with the Linear identifier, such as
   `adh-123-course-page`. Use Impeccable for UI work, Superpowers for applicable
   engineering steps, and Ponytail to keep the change small.
4. Run `python3 scripts/check-setup.py` and `npm run check`. Start the built app
   with `npm run start` and run `npm run smoke` while the starter remains in place.
   Update that smoke check when the real homepage replaces the starter.
5. Push/open a PR using the host's GitHub controls. Inspect Vercel's branch
   preview on desktop and mobile, including keyboard navigation and real flows.
6. Review and merge the approved PR. Vercel's connected production branch is
   `main`. A push to main can release changes automatically; do not use it as
   a scratch branch. Check the ready deployment and live page before closing
   the Linear issue.

The current page is a development placeholder. Remove its noindex metadata only
when the client site is ready for public indexing. Do not add real-looking fake
course offerings or placement claims to make a demo appear complete.

## Skills to use deliberately

| Need | Skill |
| --- | --- |
| Clarify and challenge requirements | `grill-me`, `grilling` |
| Clarify while recording terminology and decisions | `grill-with-docs`, `domain-modeling` |
| Turn agreed discussion into a spec or tickets | `to-spec`, `to-tickets` |
| Design, audit, or polish the interface | `impeccable` |
| Plan, debug, test, and verify engineering work | Relevant Superpowers skills |
| Review against standards and the originating spec | `code-review` |
| Continue work in another task | `handoff` |
| Keep implementation minimal | `ponytail` full, always |

## Access and credentials

GitHub-based Vercel deployment avoids copying deployment tokens into Cloud or
GitHub Actions. No database, payment provider, mail service, or app API key is
needed by this starter. Add credentials only when an agreed feature requires
them, using each service's secret settings rather than repository files.

The Linear browser session and the ChatGPT Linear connector are separate.
If the connector reports reauthentication, reconnect Linear in ChatGPT Apps
before expecting Cloud tasks to read or update issues directly. Creating a board
does not connect Codex delegation or GitHub status sync; enable and verify those
workspace integrations separately if desired.

When dependencies or tooling change, update the lockfile, run checks, edit the
Cloud environment, and republish it. Existing Cloud tasks keep their own state;
start a new task to verify a refreshed environment.

# Cluckus Maximus — PLAYTEST artefact drop-in

This folder is where the **compiled** Cluckus Maximus PLAYTEST artefact is placed
so the website can host it at:

```
/games/cluckus-maximus/dev/game/
```

## Rules

- **Only compiled artefacts** go here. Never place game-engine source code, and
  never compile the game-engine project from the website repository.
- The artefact contents are **git-ignored** (see root `.gitignore`). Only this
  `README.md` and `.gitkeep` are tracked. The artefact is copied to `out/` at
  build time by Next.js (everything under `public/` is exported as-is).

## Temporary integration method (Phase 8.3)

Until GitHub release retrieval is wired into CI, copy the PLAYTEST artefact here
manually (or via a local script) from the game-engine build output:

```
# from the game-engine repo, its build produces:
dist/deploy/cluckus-maximus/playtest/
  index.html
  manifest.json
  books.json
  favicon.svg
  assets/

# copy that folder's CONTENTS into this website folder:
public/games/cluckus-maximus/dev/game/
  index.html
  manifest.json
  books.json
  favicon.svg
  assets/
```

Example (run from the website repo root, adjust the source path):

```powershell
# PowerShell
Copy-Item -Recurse -Force `
  ..\lucky-riot-engine\dist\deploy\cluckus-maximus\playtest\* `
  .\public\games\cluckus-maximus\dev\game\
```

```bash
# bash
cp -R ../lucky-riot-engine/dist/deploy/cluckus-maximus/playtest/. \
      ./public/games/cluckus-maximus/dev/game/
```

## What the website does with it

- At build time the website reads `manifest.json` from this folder (see
  `scripts/read-game-manifests` behaviour baked into
  `src/content/game-deployments.ts`). If a valid manifest is present with
  `gameId: "cluckus-maximus"`, `buildType: "PLAYTEST"`, `available: true`, the
  registry marks the PLAYTEST build available and the dev page embeds
  `./game/index.html` in a sandboxed iframe.
- If this folder is empty (only README/.gitkeep), the dev page shows the clean
  "build not yet wired" placeholder instead. Nothing breaks.

## Do NOT

- Do not commit the artefact.
- Do not place CUSTOMER or PUBLIC builds here.
- Do not rely on `noindex` for access control — the route must be protected by
  the Netlify Edge Function Basic Auth (see `netlify/edge-functions/` and the
  README "Access control" section).

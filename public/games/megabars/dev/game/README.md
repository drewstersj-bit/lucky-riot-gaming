# MegaBars — PLAYTEST artefact drop-in

This folder hosts the **compiled** MegaBars PLAYTEST artefact at:

```
/games/megabars/dev/game/
```

## ⚠ Current contents are a PLACEHOLDER

Right now this folder contains a **copy of the Cluckus Maximus client/front-end**,
used only to validate the website integration pipeline (manifest read → embed →
edge auth) before the real MegaBars build exists. The embedded game will visibly
be Cluckus until replaced.

The maths profile for MegaBars lives in the game-engine project
(`C:\stake_engine\games\Megabars`) — maths/source never belongs in the website
repo. When the engine produces a real MegaBars PLAYTEST artefact, replace this
folder's contents with it.

## Rules

- **Only compiled artefacts** go here. Never place game-engine source or maths.
- Contents are **git-ignored** (see root `.gitignore`); only `README.md` and
  `.gitkeep` are tracked. The artefact is copied to `out/` at build time.
- `manifest.json` must have `gameId: "megabars"` and `buildType: "PLAYTEST"` or
  the website registry will treat the build as unavailable.

## Replace with the real build

```powershell
# from the website repo root, once the engine emits the real artefact:
Remove-Item -Recurse -Force .\public\games\megabars\dev\game\* -Exclude README.md,.gitkeep
Copy-Item -Recurse -Force `
  C:\stake_engine\games\Megabars\dist\deploy\megabars\playtest\* `
  .\public\games\megabars\dev\game\
```

Then rebuild (`pnpm build`) and redeploy.

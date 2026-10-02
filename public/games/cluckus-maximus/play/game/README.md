# Cluckus Maximus — PUBLIC demo artefact drop-in

This folder hosts the **compiled PUBLIC demo** artefact so the website serves it at:

```
/games/cluckus-maximus/play/game/
```

The public demo page at `/games/cluckus-maximus/play/` embeds `./game/index.html`
in a sandboxed iframe (see `src/app/games/cluckus-maximus/play/page.tsx` and
`src/components/GameEmbed.tsx`).

## How this is wired (chosen method)

Mirrors the existing PLAYTEST integration:

1. **Artefact drop-in** — the engine's `public` build output is copied here
   (contents only: `index.html`, `manifest.json`, `books.json`, `favicon.svg`,
   `assets/`, `generated/`). Git-ignored (see root `.gitignore`
   `public/games/*/play/game/**`); only this README / `.gitkeep` are tracked.
   Next.js copies `public/` into `out/` at build, so a locally-dropped artefact
   still deploys.
2. **Registry** — `src/content/game-deployments.ts` → `readPublicManifest()`
   reads this folder's `manifest.json` at build time and marks the PUBLIC build
   `available: true` only when `gameId=cluckus-maximus`, `buildType=PUBLIC`, and
   `index.html` exist. Empty folder → clean "Build Not Yet Wired" placeholder.
3. **CSP** — `netlify.toml` has a scoped block for
   `/games/cluckus-maximus/play/game/*` allowing the slot engine's `blob:` + wasm
   (public/indexable; no auth, no noindex on the artefact).

## Refresh the demo after a new engine build

```powershell
# 1. In the engine repo, build the clean public artefact:
#    cd <engine>\games\cluckus-maximus\frontend ; node scripts/build-deploy.mjs public
# 2. Copy its CONTENTS here (adjust the engine path):
Copy-Item -Recurse -Force `
  C:\stake_engine\games\cluckus-maximus\frontend\dist\deploy\cluckus-maximus\public\* `
  C:\Lucky_Riot_Gaming\public\games\cluckus-maximus\play\game\
# 3. Rebuild the website: pnpm build
```

## Changing the method later (not locked in)

This embedded same-site approach is fully reversible and independent of the
lighter alternatives:

- **Switch off PUBLIC embed:** set the PUBLIC entry back to `available: false`
  in `game-deployments.ts` (or empty this folder) → page shows the placeholder.
- **Use a `demoUrl` link instead** (README "How to activate a demo"): add a
  `demoUrl` to the game entry in `src/content/games.ts`; independent mechanism.
- **CI release retrieval:** when wired, CI fetches the artefact into this folder
  instead of a manual copy; nothing else changes.

## Visibility notes

- The `/play/` page is currently `robots: noindex` (SEO held until release) and
  the whole site is behind `NEXT_PUBLIC_SITE_LOCKED` (WIP gate). Reachable with
  the link + gate, not publicly discoverable. Flip both when ready for launch.

## Do NOT

- Do not commit the artefact. Do not place game source here. Do not place the
  PLAYTEST build here (that lives in `../../dev/game/`).

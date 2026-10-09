# Farmyard Frenzy — dev game artefact

Hosted at `/games/farmyard-frenzy/dev/game/` and embedded by the dev playtest
wrapper (`/games/farmyard-frenzy/dev/`).

## Contents

The real PLAYTEST engine artefact (Svelte 5 + Pixi 8) produced by the
game-engine repo (`C:\stake_engine\games\farmyard-frenzy\frontend`, playtest
profile). It plays the authoritative `books.json` and includes the in-game dev
panel. The frontend only presents outcomes — it never computes maths.

- 5 reels × 3 rows, 10 lines
- symbols: farm animals (Sheep / Pig / Cow / Farmer), card ranks (10 J Q K A),
  Egg, Barn (scatter), Wild, Golden Egg
- 3 / 4 / 5 Barn scatters award 10 / 15 / 20 free spins; eggs collect on Barn
  scatters in free spins; Golden Egg adds a bonus

The authoritative maths (RTP, reels, paytable, feature) lives ONLY in the
game-engine repo and must never be copied here.

## Replace with a new engine build

Rebuild and re-drop from the engine's `dist/` (keep `README.md` / `.gitkeep`):

```powershell
python tasks.py game-build farmyard-frenzy
python tasks.py game-deploy farmyard-frenzy
```

The registry reads `manifest.json`; it requires `gameId: "farmyard-frenzy"` and
`buildType: "PLAYTEST"`.

## Git

The dev artefact contents are git-ignored (root `.gitignore`); only this
`README.md` and `.gitkeep` are tracked. Next.js copies `public/` into `out/` at
build so the demo deploys without being committed as source.

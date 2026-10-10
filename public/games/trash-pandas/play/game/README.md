# Farmyard Frenzy — public demo artefact

Hosted at `/games/farmyard-frenzy/play/game/` and embedded by the public play
wrapper (`/games/farmyard-frenzy/play/`).

## Contents

A clean, self-contained FARMYARD FRENZY build (Svelte 5 + Pixi 8) produced by
the game-engine repo (`C:\stake_engine\games\farmyard-frenzy\frontend`, public
profile). It plays the authoritative `books.json` (produced by `math/run.py`):
the frontend only presents outcomes, it never computes maths.

- 5 reels × 3 rows, 10 lines
- symbols: farm animals (Sheep / Pig / Cow / Farmer), card ranks (10 J Q K A),
  Egg, Barn (scatter), Wild, Golden Egg
- line pays on the longest adjacent run from the left; Wild substitutes for the
  line symbols
- 3 / 4 / 5 Barn scatters award 10 / 15 / 20 free spins
- during free spins every Barn in view collects all Egg cash values on the
  board; a Golden Egg adds a bonus to the collect
- dev tooling is excluded from the public profile

The authoritative maths (RTP, reels, paytable, feature) lives ONLY in the
game-engine repo and must never be copied here.

## Git

Unlike the git-ignored dev artefact, this PUBLIC demo IS committed (via a
`.gitignore` exception) so a Netlify-from-git build serves the playable game.
Rebuild and re-drop from the engine's `dist-public/` when the build changes.

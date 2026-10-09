# Bison Fury — public demo artefact

Hosted at `/games/bison-fury/play/game/` and embedded by the public play wrapper
(`/games/bison-fury/play/`).

## Contents

A clean, self-contained BISON FURY build (Svelte 5 + Pixi 8) produced by the
game-engine repo (`C:\stake_engine\games\bison-fury\frontend`, `VITE_BUILD_PROFILE=public`).
It plays the authoritative `books.json` (produced by `math/run.py`): the frontend
only presents outcomes, it never computes maths.

- 5 reels × 4 rows, 1024 ways
- 11 regular symbols + wild (middle reels only) + scatter
- ways-pay left-to-right; sticky-wild free spins (3/4/5 scatters -> 8/20/50)
- dev tooling is excluded from the public profile

The authoritative maths (RTP, reels, paytable, feature) lives ONLY in the
game-engine repo and must never be copied here.

## Git

Unlike the git-ignored dev artefact, this PUBLIC demo IS committed (via a
`.gitignore` exception) so a Netlify-from-git build serves the playable game.
Rebuild and re-drop from the engine's `dist/` when the build changes.

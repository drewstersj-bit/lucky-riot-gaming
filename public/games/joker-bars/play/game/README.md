# MegaBars — public demo artefact

Hosted at `/games/megabars/play/game/` and embedded by the public play wrapper
(`/games/megabars/play/`).

## Contents

A clean, self-contained MEGA BARS build (Svelte 5 + Pixi 8) produced by the
game-engine repo (`C:\stake_engine\games\mega-bars\frontend`, `VITE_BUILD_PROFILE=public`).
It plays the authoritative `books.json` (produced by `math/run.py`): the frontend
only presents outcomes, it never computes maths.

- 5 reels × 3 rows, 10 lines
- symbols: PIC1 / PIC2 (paying bars), BLANK (no pay), FREESPIN (feature trigger)
- line pays on the longest adjacent run; free spins trigger on 3+ left-anchored FREESPIN
- dev tooling is excluded from the public profile

The authoritative maths (RTP, reels, paytable, feature) lives ONLY in the
game-engine repo and must never be copied here.

## Git

Unlike the git-ignored dev artefact, this PUBLIC demo IS committed (via a
`.gitignore` exception) so a Netlify-from-git build serves the playable game.
Rebuild and re-drop from the engine's `dist/` when the build changes.

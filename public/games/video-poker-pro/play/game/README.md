# Video Poker Pro — public demo artefact

Hosted at `/games/video-poker-pro/play/game/` and embedded by the public play
wrapper (`/games/video-poker-pro/play/`).

## Contents

A clean, self-contained Video Poker Pro build (Svelte 5 + Pixi 8) produced by
the game-engine repo (`C:\stake_engine\games\video-poker-pro\frontend`,
`VITE_BUILD_PROFILE=public`). It reads the authoritative `index.json` (produced
by `math/run.py` / `gen_index.py`) for the variant paytables and rules; the
frontend only presents outcomes and pays strictly on the published paytable.

- Pro-style 100-hand draw poker
- three variants sharing one engine: Tens or Better (no wild), Deuces Wild (2s
  wild), Deuces and Joker (2s + joker wild, 53-card deck)
- deal → hold (auto or manual) → draw across 100 independent hands
- double-or-nothing gamble feature with collect / collect-half and a per-level cap
- 100-hand mini-grid rendered on a single Pixi WebGL canvas
- dev tooling is excluded from the public profile

The authoritative maths (paytables, hand evaluator, strategy, RTP) lives ONLY in
the game-engine repo and must never be copied here.

## Git

Unlike the git-ignored dev artefact, this PUBLIC demo IS committed (via a
`.gitignore` exception) so a Netlify-from-git build serves the playable game.
Rebuild and re-drop from the engine's `dist-public/` when the build changes.

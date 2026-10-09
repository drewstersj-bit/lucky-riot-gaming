# Video Poker Pro — internal playtest artefact

Hosted at `/games/video-poker-pro/dev/game/` and embedded by the internal dev
wrapper (`/games/video-poker-pro/dev/`). Protected at the hosting/edge layer.

## Contents

The PLAYTEST build (`VITE_BUILD_PROFILE=playtest`, the engine's `dist/`): same
game as the public demo, with the developer panel included. Reads the
authoritative `index.json`.

## Git

This dev artefact is git-ignored (only the PUBLIC demo is committed). Drop the
engine's `dist/` here for local/edge-protected playtesting; it is not published
via git.

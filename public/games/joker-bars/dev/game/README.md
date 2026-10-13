# MegaBars — dev game artefact

Hosted at `/games/megabars/dev/game/` and embedded by the dev playtest wrapper
(`/games/megabars/dev/`).

## ⚠ Current contents are a WEBSITE-SIDE VISUAL DEMO

`index.html` is a small self-contained slot built **on the website side** purely
to show the correct MegaBars look-and-feel:

- 5 reels × 3 rows, 10 lines
- the four real symbols: **BAR** (top pay), **O** (pay), **0** blank (no pay),
  **FREE SPINS** trigger
- wins on 3+ adjacent symbols from the left, highest paid per line
- a simple free-spins feature (3+ adjacent FS triggers; auto-plays; can retrigger)

**It is NOT the certified engine maths.** The reel strips and pay values in
`index.html` are illustrative for presentation only. The authoritative maths
(RTP, reel construction, paytable, feature maths) lives in the game-engine
project at `C:\stake_engine\games\Megabars` and must never be copied here.

## Replace with the real engine build

When the engine produces a real MegaBars PLAYTEST artefact, delete the demo and
drop the compiled artefact in (keep `README.md` / `.gitkeep`):

```powershell
Remove-Item -Recurse -Force .\public\games\megabars\dev\game\* -Exclude README.md,.gitkeep
Copy-Item -Recurse -Force C:\stake_engine\games\Megabars\dist\deploy\megabars\playtest\* .\public\games\megabars\dev\game\
```

Then rebuild (`pnpm build`). The registry reads `manifest.json`; it requires
`gameId: "megabars"` and `buildType: "PLAYTEST"`.

## Git

The artefact contents are git-ignored (root `.gitignore`); only this `README.md`
and `.gitkeep` are tracked. Next.js copies `public/` into `out/` at build so the
demo deploys without being committed as source.

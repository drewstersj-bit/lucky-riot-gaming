# Lucky Riot Games — Website

The public marketing website for **Lucky Riot Games**, an independent studio developing original online slots, video poker, roulette and other distinctive online gaming experiences.

The site is a statically exported [Next.js](https://nextjs.org) application (App Router + TypeScript + Tailwind CSS), built for automatic deployment to Netlify.

> Lucky Riot Games is a **game development studio**, not a gambling operator. This website does not accept wagers, deposits or player registrations.

---

## Tech stack

- **Next.js (App Router)** with **static export** (`output: "export"`) — no server-side rendering
- **TypeScript** (strict)
- **Tailwind CSS** with centralised design tokens
- **framer-motion** for restrained, reduced-motion-aware animation
- **pnpm** package manager
- **ESLint** for linting
- Deploys to **Netlify**, with **Netlify Forms** for the contact form

---

## Local installation

Requirements: **Node.js 20+** and **pnpm 10+** (`corepack enable` will provide the pinned pnpm version).

```bash
pnpm install
```

### Development commands

```bash
pnpm dev        # start the dev server at http://localhost:3000
pnpm lint       # run ESLint
pnpm typecheck  # run the TypeScript compiler (no emit)
pnpm build      # production build + static export to ./out
```

### Production build

```bash
pnpm build
```

This generates a fully static site in the `out/` directory. You can preview it with any static file server, e.g.:

```bash
npx serve out
```

---

## Environment variables

Copy `.env.example` to `.env.local` and fill in values as needed. **Never commit real secrets.**

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL used for metadata, canonical tags, sitemap and Open Graph. Defaults to `https://luckyriotgames.co.uk`. |
| `NEXT_PUBLIC_ANALYTICS_PROVIDER` | Optional analytics provider: `ga` or `plausible`. Leave blank to disable analytics. |
| `NEXT_PUBLIC_ANALYTICS_ID` | Optional analytics measurement ID (e.g. `G-XXXXXXXXXX` for GA, or your domain for Plausible). |

Analytics scripts **only load after the visitor accepts optional cookies** via the cookie banner. With no analytics variables set, nothing is loaded.

Set the same variables in **Netlify → Site settings → Environment variables** for production builds.

---

## GitHub repository setup

1. Create an empty repository on GitHub (e.g. `lucky-riot-games`).
2. From this project directory:

   ```bash
   git init
   git add .
   git commit -m "Initial Lucky Riot Games website"
   git branch -M main
   git remote add origin https://github.com/<your-org>/<your-repo>.git
   git push -u origin main
   ```

The production branch is **`main`**. Feature work should go on branches and open pull requests against `main`.

### Continuous integration

`.github/workflows/ci.yml` runs on every pull request and push to `main`:

- `pnpm lint`
- `pnpm typecheck`
- `pnpm build` (static export)
- Confirms `out/index.html` exists

No deployment credentials are stored in the repository — Netlify handles deployment via its GitHub integration.

---

## Netlify connection

1. In Netlify, choose **Add new site → Import an existing project** and select your GitHub repository.
2. Netlify reads `netlify.toml`, so the build settings are pre-filled:
   - **Build command:** `pnpm build`
   - **Publish directory:** `out`
   - **Node version:** 20 (via `NODE_VERSION`)
3. Add any environment variables (see above) under **Site settings → Environment variables**.
4. Deploy. Every push to `main` creates a **production deployment**; every pull request generates a **deploy preview**.

`netlify.toml` also configures security headers, cache-control rules for static assets, a `/home → /` redirect, and lets Netlify serve the custom `out/404.html` automatically.

### Custom domain: luckyriotgames.co.uk

1. In Netlify: **Site settings → Domain management → Add a domain** and enter `luckyriotgames.co.uk`.
2. Netlify will show the DNS records to configure at your domain registrar. Typically:
   - An **apex** record (`luckyriotgames.co.uk`) pointing to Netlify (an `A` record to Netlify's load balancer, or an `ALIAS`/`ANAME` if your DNS supports it).
   - A **`www`** `CNAME` pointing to your Netlify subdomain (e.g. `your-site.netlify.app`).
3. Set your preferred primary domain (apex or `www`) in Netlify; it will redirect the other automatically.
4. Enable **HTTPS** (Netlify provisions a free Let's Encrypt certificate once DNS resolves).

> DNS is **not** changed automatically by this project. Apply the records shown in the Netlify dashboard at your registrar.

---

## Netlify form handling

The contact form uses **Netlify Forms**:

- A hidden static form (in `src/app/contact/page.tsx`) provides the markup Netlify detects at build time. It declares the form name `partnership-enquiry`, all fields, and a `bot-field` honeypot.
- The interactive React form (`src/components/ContactForm.tsx`) submits `application/x-www-form-urlencoded` data to `/` with a matching `form-name`, then redirects to the branded success page at `/contact/success/`.
- Spam protection uses Netlify's honeypot (`data-netlify-honeypot="bot-field"`).

View submissions in **Netlify → Forms**. To receive email notifications, configure a notification under **Forms → Settings and notifications**.

---

## Content editing guide

All editable content lives in `src/content/`. No component changes are required for routine updates.

### How to add a game

Edit `src/content/games.ts` and append a `Game` object to the `games` array:

```ts
{
  slug: "my-new-game",              // URL-safe, unique
  title: "MY NEW GAME",
  category: "Online Slot",           // "Online Slot" | "Video Poker" | "Roulette"
  status: "In Development",           // "In Development" | "Coming Soon" | "Released" | "Concept"
  description: "One or two sentences.",
  featureTags: ["Feature A", "Feature B"],
  hasDetailPage: true,                // true generates /games/my-new-game/
}
```

Optional fields (`logo`, `artworkLandscape`, `artworkPortrait`, `summary`, `featureBreakdown`, `screenshots`, `trailerUrl`, `demoUrl`, `technical`, `release`) only render when present, so partial entries are safe. Games with `hasDetailPage: true` automatically get a static detail page and a sitemap entry.

### How to replace artwork

1. Add image files to `public/` (e.g. `public/games/my-new-game-landscape.webp`). Prefer **WebP** or **AVIF**.
2. Reference them in the game entry:

   ```ts
   artworkLandscape: "/games/my-new-game-landscape.webp",
   artworkPortrait: "/games/my-new-game-portrait.webp",
   logo: "/games/my-new-game-logo.svg",
   screenshots: [
     { src: "/games/my-new-game-1.webp", alt: "Descriptive alt text" },
   ],
   ```

If no artwork is provided, an abstract branded placeholder is shown automatically.

### How to activate a demo

Add a `demoUrl` to the game entry. The **Play Demo** button appears automatically:

```ts
demoUrl: "https://demo.example.com/my-new-game",
```

Remove the field to hide the button again.

### How to add trailers

Add a `trailerUrl` (e.g. a YouTube link). The **Watch Trailer** button appears automatically:

```ts
trailerUrl: "https://www.youtube.com/watch?v=XXXXXXXXXXX",
```

### Pre-launch password protection

The site can be gated behind a login screen until you're ready to go public.

**Current setup (client-side gate):**
- Controlled by the `NEXT_PUBLIC_SITE_LOCKED` env var (set to `"true"` in `netlify.toml` and `.env.example`).
- Credentials live in `src/content/site.ts` (`siteGate`): username `LuckyRiot02`, password `WIP123`.
- When locked, the whole site shows a login overlay and is marked `noindex, nofollow` so search engines don't crawl it. The unlock persists for the browser session.

**To go public at launch:** set `NEXT_PUBLIC_SITE_LOCKED` to `"false"` (in `netlify.toml` or Netlify → Environment variables) and redeploy. No code changes needed.

> ⚠️ **Security note:** because this is a static export, the client-side gate is *obscurity, not security* — the credentials are present in the JavaScript bundle and can be read by anyone who inspects the source. It deters casual visitors only.
>
> **For genuine protection**, use Netlify's built-in password protection instead (available on paid plans): **Site settings → Access & security → Visitor access / Password protection**. This enforces HTTP Basic Auth at the edge before any file is served, so credentials never reach the browser. You can use it alongside or instead of the client-side gate. Set a site-wide password (or per-branch passwords for deploy previews) there, and set `NEXT_PUBLIC_SITE_LOCKED` to `"false"` to avoid a double login.

### How to update contact and social links

Edit `src/content/site.ts`:

```ts
email: "hello@luckyriotgames.co.uk",  // displayed contact email
emailConfirmed: false,                 // set true once the mailbox is verified
social: {
  linkedin: "",                        // set the LinkedIn company URL to show the link
},
```

The footer LinkedIn link only renders when `social.linkedin` is set. The copyright year updates automatically.

### Legal and marketing copy

- Home-page copy: `src/content/home.ts`
- About copy: `src/content/about.ts`
- Contact copy and form options: `src/content/contact.ts`
- Privacy / Cookies / Terms: `src/content/legal.ts`

---

## Design tokens

Colours, typography, spacing and shadows are centralised in `tailwind.config.ts` and mirrored as CSS variables in `src/app/globals.css`. The palette is derived from the Lucky Riot brand: near-black/charcoal backgrounds (`ink`), warm off-white text (`cream`), balanced `gold` details and a vibrant `riot` accent.

---

## Accessibility & performance

- Semantic HTML, keyboard navigation and visible focus states
- Accessible mobile menu (focus management, `Escape` to close, scroll lock)
- Full `prefers-reduced-motion` support (animations disabled when requested)
- WCAG AA-oriented colour contrast
- Static export, unoptimised-but-appropriately-sized images, lazy-loaded below-the-fold media
- No autoplay media, no heavy hero video

---

## Project structure

```
.
├─ .github/workflows/ci.yml     # CI: lint, typecheck, build
├─ netlify.toml                 # Netlify build, headers, caching, redirects
├─ next.config.ts               # Static export config
├─ public/                      # Static assets (icons, OG image, manifest, game art)
└─ src/
   ├─ app/                      # Routes (App Router)
   ├─ components/               # Reusable, strongly typed components
   ├─ content/                  # Editable content (TS data files)
   └─ lib/                      # SEO helpers, structured data
```

---

## Licence

© Lucky Riot Games. All rights reserved.

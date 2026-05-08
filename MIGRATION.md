# Migration: Next.js 15 → SvelteKit (Svelte 5)

This document tracks the in-progress migration from Next.js (App Router) to SvelteKit. It is the authoritative log of decisions, deviations, and known gaps. Update it as you work.

> **Status**: In progress on `feat/sveltekit-migration`. Work proceeds phase by phase; the branch is not in a deployable state until Phase 10 lands.

---

## Phase tracker

| # | Phase | Status |
| - | ----- | ------ |
| 0 | Branch + skeleton (config, app.html/css/d.ts, package.json) | done |
| 1 | Server foundation (auth, db, env, hooks.server.ts) | done |
| 2 | Component library + Svelte 5 hooks (`shadcn-svelte`, `bits-ui`, runes utilities) | done |
| 3 | Public routes — partial: home, navbar/footer/theme, `(static)` layout + pricing. About/contact/copyright/privacy/tos and blog/profiles/marketplace/scout deferred. | partial |
| 4 | Auth flows (sign-in, signup, forgot-password, verify-user, waitlist) | done |
| 5 | User dashboard — shell done (layout + sidebar + home + settings index). CRUD sub-routes (products/tools full forms, settings/profile editor) are placeholders pointing to `_legacy/`. | partial |
| 6 | Admin section — shell done (layout with role guard + stats home + navigate). Data tables (users/products/tools/messages) are placeholders. | partial |
| 7 | Dev-tools collection — index + filter + tool slug routing done. Each of the 9 tools shows a "being migrated" placeholder; per-tool ports (canvas, pdf-lib, FileReader, etc.) are deferred. | partial |
| 8 | API routes — all 7 ported (`/api/auth/{[...all],signup,forgot-password,recaptcha}`, `/api/contact`, `/api/users/delete`, `/api/tools/{,delete,generate}`, `/api/helpers/token`). | done |
| 9 | Sitemap (`/sitemap.xml`) + manifest (`/manifest.webmanifest`) | done |
| 10 | Production hardening — Dockerfile rewritten for adapter-node + bun. Lint config + .prettierrc in place. Smoke tests deferred. | partial |

## Repository layout during migration

| Path | Purpose |
| ---- | ------- |
| `src/routes/` | New SvelteKit routes — populated incrementally per phase. |
| `src/lib/` | Shared utilities (db, server-fetch, auth, models, blog/scout/marketplace helpers). |
| `src/lib/server/` | Server-only modules. `auth.ts` lives here. |
| `src/lib/components/` | Svelte components (will be populated in Phase 2). |
| `src/lib/hooks/` | Svelte 5 runes utilities (will be populated in Phase 2). |
| `src/models/` | Mongoose models — kept verbatim, framework-agnostic. |
| `src/utils/`, `src/types/`, `src/constants/`, `src/assets/` | Kept as-is. |
| `static/` | Public assets (renamed from `public/`). |
| `_legacy/` | Original Next.js source kept for reference. **Will be deleted at Phase 10**. Excluded from `tsconfig.json` and Vite. |

## Tooling decisions

- **Framework**: SvelteKit `^2.22` with Svelte `^5.40` (runes only). Adapter: `@sveltejs/adapter-node` (matches the existing `output: "standalone"` Next config and Docker setup).
- **Build**: Vite 7. Tailwind v4 via `@tailwindcss/vite` (replaces `@tailwindcss/postcss`).
- **Forms**: `sveltekit-superforms` + `formsnap` + `zod`. Replaces `react-hook-form` + `@hookform/resolvers`.
- **UI primitives**: `bits-ui` (the official Svelte port of Radix). Components will be added under `src/lib/components/ui/` via `shadcn-svelte` CLI in Phase 2.
- **Icons**: `lucide-svelte`. (`react-icons` consumers will be migrated to inline SVG or `lucide-svelte`.)
- **Theme**: `mode-watcher` (replaces `next-themes`). Theme flash-prevention is in `src/app.html`.
- **Toasts**: `svelte-sonner` (single source — `react-hot-toast` callers will be migrated to it).
- **Tables**: `@tanstack/table-core` directly (the same author's `svelte-table` adapter is unmaintained; we'll use the headless core with Svelte snippets).
- **Charts**: `layerchart` (replaces `recharts`).
- **Carousel**: `embla-carousel-svelte` (same Embla core, official Svelte adapter).
- **Cmd palette**: `cmdk-sv`. **Drawer**: `vaul-svelte`.
- **DnD**: `svelte-dnd-action`.
- **Search params**: `sveltekit-search-params` (replaces `nuqs`).
- **Progress bar**: `nprogress`, driven by `beforeNavigate`/`afterNavigate` in the root layout.
- **Markdown**: `marked` for runtime rendering; `mdsvex` is *not* introduced (current blog posts are stored as DB content, not `.mdx` files).
- **Email templates**: no `react-email` templates exist in the repo (`src/emails/` only contained a JWT helper, now in `_legacy/src_emails`). Email rendering happens at the external mail server; no migration needed.

## Environment variables

SvelteKit prefixes public env vars with `PUBLIC_` (not `NEXT_PUBLIC_`). The following renames need to be made in deployment configuration **before launch**. Old names continue to work via `process.env` at runtime, but new code uses `$env/static/public` (which requires the `PUBLIC_` prefix).

| Old (Next) | New (SvelteKit) |
| ---------- | --------------- |
| `NEXT_PUBLIC_BASE_URL` | `PUBLIC_BASE_URL` |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | `PUBLIC_CLOUDINARY_CLOUD_NAME` |
| `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET` | `PUBLIC_CLOUDINARY_UPLOAD_PRESET` |
| `NEXT_PUBLIC_CLOUDINARY_FOLDER` | `PUBLIC_CLOUDINARY_FOLDER` |
| `NEXT_PUBLIC_ENV` | `PUBLIC_ENV` |
| `NEXT_PUBLIC_WEBSITE_NAME` | `PUBLIC_WEBSITE_NAME` |
| `NEXT_PUBLIC_WEBSITE_URL` | `PUBLIC_WEBSITE_URL` |

Server-side variables (BASE_URL, MONGODB_URI, BETTER_AUTH_*, GOOGLE_*, GITHUB_*, JWT_SECRET, BASE_MAIL_SERVER_URL, SERVER_IDENTITY, CLOUDINARY_API_*, GUMROAD_*, GOOGLE_ANALYTICS_ID, WEBSITE_NAME, WEBSITE_DOMAIN) keep their existing names.

## Routing map

Comprehensive Next → SvelteKit mapping is in the implementation plan. Examples:

| Next.js | SvelteKit |
| ------- | --------- |
| `app/page.tsx` | `src/routes/+page.svelte` |
| `app/layout.tsx` | `src/routes/+layout.svelte` + `+layout.server.ts` |
| `app/(static)/about/page.tsx` | `src/routes/(static)/about/+page.svelte` |
| `app/blog/articles/[slug]/page.tsx` | `src/routes/blog/articles/[slug]/+page.{svelte,server.ts}` |
| `app/api/auth/[...all]/route.ts` | `src/routes/api/auth/[...all]/+server.ts` (✓ done) |
| `app/sitemap.xml/route.ts` | `src/routes/sitemap.xml/+server.ts` (pending) |
| `app/manifest.ts` | `static/manifest.webmanifest` (✓ done) |
| `middleware.ts` | `src/hooks.server.ts` (✓ done) |

## Behavioral deviations

These are intentional differences from the Next.js version. Each is called out so reviewers can audit them.

1. **ISR (`export const revalidate = N`)** has no SvelteKit-native equivalent on `adapter-node`. Replaced with `setHeaders({ "cache-control": "s-maxage=N, stale-while-revalidate=…" })`. Behavior matches only when fronted by a CDN that honors those directives (Cloudflare, Vercel). On bare Node, every request is fresh — acceptable on a low-traffic blog and admin dashboard.
2. **Metadata generation**. `generateMetadata` becomes a `meta` field returned from the page's `+page.server.ts` `load` function. Root `+layout.svelte` reads `$page.data.meta` and renders `<svelte:head>`. This avoids per-page boilerplate at the cost of slightly different control flow.
3. **Server actions** (`"use server"` exports) become SvelteKit form actions in `+page.server.ts`. Form code is rewritten, not transliterated, since `react-hook-form`'s imperative API has no Svelte equivalent.
4. **Animation parity**. `framer-motion` springs are replaced with `svelte/motion` equivalents. Spring constants may need tuning to feel identical; differences are tracked per-component.
5. **`useOptimistic` / React 19 transitions** — not used in this codebase, no replacement needed.
6. **Theme provider**. `next-themes` flash-prevention script is replaced with an inline IIFE in `src/app.html` that sets `data-theme` from `localStorage` before paint, plus `mode-watcher` for the toggle UI.
7. **Worker threads** (`app/api/tools/route.ts`). Available on adapter-node. **Not portable to Edge runtimes** if the deployment target ever changes.
8. **shadcn-svelte visual delta**. Component primitives match shadcn-React closely (~99%) but are not byte-identical. Differences are patched per-component as they're caught.
9. **Public directory**. Renamed `public/` → `static/` (SvelteKit convention). Asset URLs unchanged (still `/foo.png`).

## Outstanding migration risks

- **`nexo-mdx` and `nexo-html2jsx`** are first-party packages. They emit React JSX. Phase 7 (dev-tools) and Phase 3 (blog rendering) need to either consume their output as code-strings or have alternate output paths. Audit at the start of those phases.
- **`@tanstack/svelte-table`** lags behind `@tanstack/react-table` in features; we use `@tanstack/table-core` directly to avoid version skew.
- **`better-auth` `nextCookies()` plugin** is replaced with `sveltekitCookies(getRequestEvent)` from `better-auth/integrations/svelte-kit`. The session cookie format is unchanged, so existing sessions in production should continue to work after deploy.

## Resume checklist for whoever continues this branch

1. `bun install` (the new `package.json` removes Next/React deps).
2. `bun run check` — currently passes only Phase 0/1 surface; will pick up new errors as routes are ported.
3. `bun run dev` and visit `/` — should render the placeholder home.
4. Pick the next phase from the tracker table above.
5. Reference the original Next.js code under `_legacy/` while porting — the structure mirrors the old `app/`, `src/`, `@/` layout.
6. Update this `MIGRATION.md` whenever you change a tooling decision or discover a new deviation.

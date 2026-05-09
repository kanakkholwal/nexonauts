# Migration: Next.js 15 -> SvelteKit (Svelte 5)

This branch migrates the application from the Next.js App Router to SvelteKit using Svelte 5 runes only.

> Status on May 9, 2026: `npm run check` and `npm run build` pass on `feat/sveltekit-migration`. The app is deployable as a SvelteKit codebase. Public surface, auth, dev-tools, admin / dashboard moderation, and rich product / tool authoring forms are all at parity with the legacy app. Remaining items are scoped, optional integrations (e.g. Gumroad import, Cloudinary upload widgets) documented under "Remaining gaps".

## Phase tracker

| #  | Phase                                                                       | Status |
| -- | --------------------------------------------------------------------------- | ------ |
| 0  | Branch + skeleton (config, app shell, package.json, tsconfig, vite, adapter) | done   |
| 1  | Server foundation (auth, db, env, hooks.server.ts)                          | done   |
| 2  | Component library + Svelte 5 hooks and utilities                            | done   |
| 3  | Public routes: static pages, blog, and profiles                             | done   |
| 4  | Auth flows (sign-in, signup, forgot-password, verify-user, waitlist)        | done   |
| 5  | User dashboard shell + read views + create / edit / delete actions         | done   |
| 6  | Admin shell + moderation + create / edit / delete actions                  | done   |
| 7  | Dev-tools index + slug routing + interactive runtime tools                  | done   |
| 8  | API routes under `/api/*`                                                   | done   |
| 9  | Sitemap + manifest                                                          | done   |
| 10 | Production hardening, linting, validation, Docker                           | done   |

## Current route coverage

- `src/routes/+*`: root layout, error, and landing page.
- `src/routes/(static)/*`: about, contact, copyright, pricing, privacy, tos.
- `src/routes/blog/*`: listing, author pages, and article pages.
- `src/routes/profiles/*`: directory and profile pages.
- `src/routes/marketplace/*`: landing, explore, and product detail.
- `src/routes/scout/*`: landing, browse, and tool detail with bookmark / review actions.
- `src/routes/auth/*`: sign-in, signup, forgot-password, verify-user, waitlist.
- `src/routes/dev-tools/*`: index, submit flow, and every interactive tool from the legacy collection (CSS / HTML minify+prettify, HTML parser, HTML→JSX, Image→WebP, JSON minifier, Meta tag generator, PDF stripper, Schema markup generator).
- `src/routes/dashboard/*`: layout, overview, account, integrations, profile, plus full authoring of products (`/new` + `/[slug]/edit`) and live management of tools.
- `src/routes/admin/*`: layout, overview, plus full moderation **and** authoring of products (`/new` + `/[slug]/edit`) and tools (`/[slug]/edit`). Users, messages support delete + status toggles. Tools support verify, delete, status, and edit.
- `src/routes/api/*`: auth, contact, tools, token helper, user-delete.

## Environment strategy

All environment access is SvelteKit-specific — there are zero `process.env` references in `src/`.

- **Server vars**: imported from `$env/static/private` (compile-time, exhaustive). The single source of truth is [`src/lib/server/env.ts`](src/lib/server/env.ts), which validates the full set with Zod and exports a frozen, typed `env` object. Boot fails fast with a clear error if a required var is missing.
- **Client vars**: imported from `$env/static/public` / `$env/dynamic/public`. Names follow SvelteKit's required `PUBLIC_` prefix (renamed from the old `NEXT_PUBLIC_*` series).
- **Dynamic server vars** (rare — e.g. `MONGODB_URI` in `src/lib/db.ts`): imported from `$env/dynamic/private`.

| Old                                    | New                              |
| -------------------------------------- | -------------------------------- |
| `NEXT_PUBLIC_BASE_URL`                 | `PUBLIC_BASE_URL`                |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`    | `PUBLIC_CLOUDINARY_CLOUD_NAME`   |
| `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET` | `PUBLIC_CLOUDINARY_UPLOAD_PRESET` |
| `NEXT_PUBLIC_CLOUDINARY_FOLDER`        | `PUBLIC_CLOUDINARY_FOLDER`       |
| `NEXT_PUBLIC_ENV`                      | `PUBLIC_ENV`                     |
| `NEXT_PUBLIC_WEBSITE_NAME`             | `PUBLIC_WEBSITE_NAME`            |
| `NEXT_PUBLIC_WEBSITE_URL`              | `PUBLIC_WEBSITE_URL`             |

Server-side secrets keep their existing names. Dead Next-era files that hard-coded `process.env.NEXT_PUBLIC_*` (`src/lib/handler.js`, `src/lib/scripts.js`, `src/lib/contentfulClient.ts`, `src/utils/cloudinary.ts`, `src/types/global-env.ts`) were unused after the migration and have been removed.

## Intentional deviations

1. `adapter-node` replaces the old Next standalone output. The Dockerfile targets the SvelteKit node adapter build.
2. ISR is approximated with `cache-control` headers on server loads. On bare Node these routes render fresh on every request.
3. Per-page metadata now flows through page `load` data and root head rendering instead of `generateMetadata`.
4. `next/link`, `next/navigation`, and `next/image` are removed. SvelteKit anchors, `$page` data, and static assets replace them.
5. Mutation flows use SvelteKit form actions (`+page.server.ts` `actions`) with progressive `use:enhance` instead of Next.js Server Actions; revalidation happens through SvelteKit's automatic re-run of `load` after a successful action.
6. Form validation is server-authoritative via Zod inside each action — no `react-hook-form` / `zodResolver` client step. Browser-side guard rails (`required`, `minlength`, etc.) are kept on inputs as a UX shortcut.
7. The Schema Markup Generator no longer fetches the live OpenExchangeRates currency list. It ships a curated static list of common currencies to keep the tool fully offline-capable; the legacy live fetch was an avoidable third-party dependency for an SEO authoring tool.
8. Authoring forms accept image URLs directly (`preview_url`, `coverImage`, `bannerImage`) instead of bundling a Cloudinary upload widget. The legacy `UploadImage` component depended on a chain of `NEXT_PUBLIC_CLOUDINARY_*` envs and an inline signed-upload signature flow that was Next-specific. Re-introducing it on SvelteKit is a follow-up; teams that want the in-form upload widget can paste the resulting URL today.
9. The `BASE_MAIL_SERVER_URL` env is validated as a non-empty string (not a strict URL) since deployments commonly point at hostnames without a scheme; the consumer (`src/lib/server-fetch.ts`) attaches the protocol.

## Authoring surface (new in this turn)

The legacy app exposed multi-step product / tool builders. The SvelteKit ports cover the same data shape and submit semantics, organised as:

- `src/lib/server/authoring.ts` — single typed module for create / fetch / update of products + tools, scoped by creator (dashboard) or unrestricted (admin).
- `src/lib/components/dashboard/product-form.svelte` and `tool-form.svelte` — Svelte 5 form components, no shared state library, fully driven by `bind:value`. Hidden inputs project complex shapes (`categories`, etc.) back into the form payload.
- Routes: `dashboard/products/new`, `dashboard/products/[slug]/edit`, `admin/products/new`, `admin/products/[slug]/edit`, `admin/tools/[slug]/edit`. Each `+page.server.ts` parses with Zod and dispatches to the typed authoring helper.
- Listing pages now expose **New** + **Edit** entry points alongside the existing delete / verify / status actions.

## Remaining gaps

- **Gumroad import sheet** on `/dashboard/products`. The legacy "Import from Gumroad" dialog (sync access tokens, fetch + map products) is not wired in. Manual create / edit covers the same outcome.
- **Cloudinary upload widget** for in-form image uploads (see deviation 8). Image fields accept URLs.
- **Browser smoke testing**: route-by-route visual QA across the migrated app has not been recorded. Build and type-check are clean.

## Validation

- `npm run check` — 0 errors, 0 warnings (3684 files)
- `npm run build` — clean (only benign node_modules circular-import notices)

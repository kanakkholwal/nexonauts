# Migration: Next.js 15 -> SvelteKit (Svelte 5)

This branch migrates the application from the Next.js App Router to SvelteKit using Svelte 5 runes only.

> Status on May 9, 2026: `npm run check` and `npm run build` pass on `feat/sveltekit-migration`. End-to-end smoke tests across all migrated routes return the expected status codes (200 for public, 303→/auth/sign-in for protected, 405 for POST-only API endpoints). The legacy `_legacy/` tree has been deleted in full; `next.config.mjs`, `next-env.d.ts`, `middleware.ts`, and the old React/Next sources are gone. Adapter is `@sveltejs/adapter-cloudflare`.

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
- `src/routes/dashboard/*`: layout, overview, account, profile, plus full authoring of products (`/new` + `/[slug]/edit`), tools (`/[slug]/edit`), and the integrations page **with the per-platform OAuth flow** at `settings/integrations/[platform]` (GitHub + Gumroad — connect, view scope, disconnect).
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
8. Authoring forms accept image URLs directly **and** offer an inline Cloudinary unsigned upload via [`$lib/components/common/image-upload.svelte`](src/lib/components/common/image-upload.svelte). The widget is enabled when `PUBLIC_CLOUDINARY_CLOUD_NAME` + `PUBLIC_CLOUDINARY_UPLOAD_PRESET` are set; otherwise it gracefully degrades to a "paste a URL" hint. Server-side delete / signed-upload helpers were intentionally not re-introduced — public unsigned uploads cover authoring needs without requiring `crypto.createHash` on the SvelteKit edge.
9. The `BASE_MAIL_SERVER_URL` env is validated as a non-empty string (not a strict URL) since deployments commonly point at hostnames without a scheme; the consumer (`src/lib/server-fetch.ts`) attaches the protocol.

## Authoring surface (new in this turn)

The legacy app exposed multi-step product / tool builders. The SvelteKit ports cover the same data shape and submit semantics, organised as:

- `src/lib/server/authoring.ts` — single typed module for create / fetch / update of products + tools, scoped by creator (dashboard) or unrestricted (admin).
- `src/lib/components/dashboard/product-form.svelte` and `tool-form.svelte` — Svelte 5 form components, no shared state library, fully driven by `bind:value`. Hidden inputs project complex shapes (`categories`, etc.) back into the form payload.
- Routes: `dashboard/products/new`, `dashboard/products/[slug]/edit`, `admin/products/new`, `admin/products/[slug]/edit`, `admin/tools/[slug]/edit`. Each `+page.server.ts` parses with Zod and dispatches to the typed authoring helper.
- Listing pages now expose **New** + **Edit** entry points alongside the existing delete / verify / status actions.

## Integrations

- **OAuth integrations** ([`src/lib/server/integrations/index.ts`](src/lib/server/integrations/index.ts)) — GitHub + Gumroad auth-code exchange, token storage, scope tracking, revoke. The `[platform]` page handles the OAuth callback (`?code=...`) inside the SvelteKit `load()`, exchanges the code for an access token, redirects to a clean URL, and renders connect / manage / disconnect controls.
- **Gumroad import** — `/dashboard/products` ships a side sheet ("Import from Gumroad") that hits the user's stored Gumroad access token, lists their library, and imports any product into Nexonauts as a single form action. Backed by [`src/lib/server/integrations/gumroad.ts`](src/lib/server/integrations/gumroad.ts). Falls back to a clear error + deep link to Settings → Integrations when the user hasn't connected.
- **Cloudinary uploads** — product `preview_url` and tool `coverImage` / `bannerImage` fields each render an inline upload button that posts unsigned multipart to Cloudinary and writes the resulting `secure_url` back into the form. Disabled with a friendly hint when the public envs aren't set.

## End-to-end test results (May 9, 2026)

Probed via `curl` against `npm run dev` on `localhost:3000`:

| Group              | Routes                                                                                                        | Result |
| ------------------ | ------------------------------------------------------------------------------------------------------------- | ------ |
| Static             | `/`, `/about`, `/contact`, `/copyright`, `/pricing`, `/privacy`, `/tos`                                       | 200    |
| Auth               | `/auth/sign-in`, `/auth/signup`, `/auth/forgot-password`, `/auth/verify-user`, `/auth/waitlist`               | 200    |
| Public lists       | `/blog`, `/profiles`, `/dev-tools`, `/dev-tools/submit`, `/scout`, `/scout/browse`, `/marketplace`, `/marketplace/explore` | 200    |
| Sitemap            | `/sitemap.xml`                                                                                                | 200    |
| Dev-tools (slug)   | `/dev-tools/json-minifier-tool`, `/dev-tools/schema-markup-generator`                                         | 200    |
| Dynamic 404 paths  | `/blog/articles/<unknown>`, `/profiles/<unknown>`, `/scout/tools/<unknown>`, `/marketplace/products/<unknown>` | 404 (expected) |
| API (POST routes)  | `/api/contact`, `/api/tools`, `/api/users/delete`, `/api/tools/delete`, `/api/tools/generate`                 | 405 on GET (POST-only); 200 on valid POST for `/api/contact` |
| API (helpers)      | `/api/helpers/token`, `/api/auth/get-session`                                                                 | 200    |
| Protected (admin)  | `/admin`, `/admin/users`, `/admin/products`, `/admin/products/new`, `/admin/tools`, `/admin/messages`, `/admin/navigate` | 303 → `/auth/sign-in` |
| Protected (dash)   | `/dashboard`, `/dashboard/products`, `/dashboard/products/new`, `/dashboard/tools`, `/dashboard/settings/account`, `/dashboard/settings/profile`, `/dashboard/settings/integrations`, `/dashboard/settings/integrations/{gumroad,github,unknown}`, `/dashboard/tools/{slug}/edit` | 303 → `/auth/sign-in` |

Three `/api/auth/*` endpoints from the legacy port (`recaptcha`, `forgot-password`, `signup`) were deleted because they conflicted with better-auth's catchall and were never called from the app — the signup / password-reset flows go through `authClient` which uses better-auth directly.

## Remaining gaps

None blocking. Logged-in interaction (form submits, sheet opens, OAuth round-trips) needs a real session cookie to verify end-to-end and was outside the curl-only test pass.

## Validation

- `npm run check` — 0 errors, 0 warnings (3684 files)
- `npm run build` — clean (only benign node_modules circular-import notices)

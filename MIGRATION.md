# Migration: Next.js 15 -> SvelteKit (Svelte 5)

This branch migrates the application from the Next.js App Router to SvelteKit using Svelte 5 runes only.

> Status on May 8, 2026: `npm run check` and `npm run build` pass on `feat/sveltekit-migration`. The app is deployable as a SvelteKit codebase, but a few areas still intentionally ship reduced functionality compared with the original Next.js implementation.

## Phase tracker

| # | Phase | Status |
| - | ----- | ------ |
| 0 | Branch + skeleton (config, app shell, package.json, tsconfig, vite, adapter) | done |
| 1 | Server foundation (auth, db, env, hooks.server.ts) | done |
| 2 | Component library + Svelte 5 hooks and utilities | done |
| 3 | Public routes: static pages, blog, and profiles | done |
| 4 | Auth flows (sign-in, signup, forgot-password, verify-user, waitlist) | done |
| 5 | User dashboard shell + read-only management views | partial |
| 6 | Admin shell + read-only moderation views | partial |
| 7 | Dev-tools index and slug routing | partial |
| 8 | API routes under `/api/*` | done |
| 9 | Sitemap + manifest | done |
| 10 | Production hardening, linting, validation, Docker | partial |

## Current route coverage

- `src/routes/+*`: root layout, error, and landing page are migrated.
- `src/routes/(static)/*`: about, contact, copyright, pricing, privacy, tos are migrated.
- `src/routes/blog/*`: listing, author pages, and article pages are migrated.
- `src/routes/profiles/*`: directory and profile pages are migrated.
- `src/routes/auth/*`: sign-in, signup, forgot-password, verify-user, waitlist are migrated.
- `src/routes/dashboard/*`: layout and overview are migrated; products, tools, account, integrations, and profile settings now render live read-only data.
- `src/routes/admin/*`: layout and overview are migrated; users, products, tools, and messages now render live read-only data.
- `src/routes/api/*`: auth, contact, tools, token helper, and user-delete endpoints are migrated.

## Intentional deviations

1. `adapter-node` replaces the old Next standalone output. The Dockerfile targets the SvelteKit node adapter build.
2. ISR is approximated with `cache-control` headers on server loads. On bare Node these routes render fresh on every request.
3. Per-page metadata now flows through page `load` data and root head rendering instead of `generateMetadata`.
4. `next/link`, `next/navigation`, and `next/image` are removed. SvelteKit anchors, `$page` data, and static assets replace them.
5. Public env vars now use the `PUBLIC_` prefix where SvelteKit requires compile-time exposure.
6. The original Next.js dashboard/admin CRUD editors are not fully ported yet. This branch ships live read-only management views instead of placeholder text.
7. The dev-tools collection pages route correctly, but the individual interactive tool UIs and submit workflow are still reduced compared with the original implementation.

## Environment variable renames

| Old | New |
| --- | --- |
| `NEXT_PUBLIC_BASE_URL` | `PUBLIC_BASE_URL` |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | `PUBLIC_CLOUDINARY_CLOUD_NAME` |
| `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET` | `PUBLIC_CLOUDINARY_UPLOAD_PRESET` |
| `NEXT_PUBLIC_CLOUDINARY_FOLDER` | `PUBLIC_CLOUDINARY_FOLDER` |
| `NEXT_PUBLIC_ENV` | `PUBLIC_ENV` |
| `NEXT_PUBLIC_WEBSITE_NAME` | `PUBLIC_WEBSITE_NAME` |
| `NEXT_PUBLIC_WEBSITE_URL` | `PUBLIC_WEBSITE_URL` |

Server-side secrets keep their existing names.

## Remaining gaps

- Marketplace and scout public sections are still not ported into SvelteKit routes.
- Dashboard/admin pages currently favor read-only visibility over full form parity.
- Dev-tools slug pages and submit flow still need the original interactive implementations ported.
- Browser smoke testing and route-by-route visual QA are still pending.

## Validation

- `npm run check`
- `npm run build`

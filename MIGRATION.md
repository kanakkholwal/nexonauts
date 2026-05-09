# Migration: Next.js 15 -> SvelteKit (Svelte 5)

This branch migrates the application from the Next.js App Router to SvelteKit using Svelte 5 runes only.

> Status on May 9, 2026: `npm run check` and `npm run build` pass on `feat/sveltekit-migration`. The app is deployable as a SvelteKit codebase. Public surface, auth, dev-tools, and basic admin/dashboard moderation are at parity with the legacy app. Remaining gaps are concentrated in the rich product/tool authoring forms (create/edit), which remain follow-up work.

## Phase tracker

| #  | Phase                                                                       | Status |
| -- | --------------------------------------------------------------------------- | ------ |
| 0  | Branch + skeleton (config, app shell, package.json, tsconfig, vite, adapter) | done   |
| 1  | Server foundation (auth, db, env, hooks.server.ts)                          | done   |
| 2  | Component library + Svelte 5 hooks and utilities                            | done   |
| 3  | Public routes: static pages, blog, and profiles                             | done   |
| 4  | Auth flows (sign-in, signup, forgot-password, verify-user, waitlist)        | done   |
| 5  | User dashboard shell + read views + delete actions                          | done   |
| 6  | Admin shell + moderation views + delete / verify / status actions           | done   |
| 7  | Dev-tools index + slug routing + interactive runtime tools                  | done   |
| 8  | API routes under `/api/*`                                                   | done   |
| 9  | Sitemap + manifest                                                          | done   |
| 10 | Production hardening, linting, validation, Docker                           | done   |

## Current route coverage

- `src/routes/+*`: root layout, error, and landing page are migrated.
- `src/routes/(static)/*`: about, contact, copyright, pricing, privacy, tos are migrated.
- `src/routes/blog/*`: listing, author pages, and article pages are migrated.
- `src/routes/profiles/*`: directory and profile pages are migrated.
- `src/routes/marketplace/*`: landing, explore, and product detail routes are migrated.
- `src/routes/scout/*`: landing, browse, and tool detail routes are migrated, including bookmark and review actions on tool pages.
- `src/routes/auth/*`: sign-in, signup, forgot-password, verify-user, waitlist are migrated.
- `src/routes/dev-tools/*`: index, submit flow, and every interactive tool from the legacy collection are migrated (CSS / HTML minify+prettify, HTML parser, HTML→JSX, Image→WebP, JSON minifier, Meta tag generator, PDF stripper, **Schema markup generator**).
- `src/routes/dashboard/*`: layout and overview are migrated; products, tools, account, integrations, and profile settings render live data, and creator-owned products / tools support delete via SvelteKit form actions.
- `src/routes/admin/*`: layout and overview are migrated; users, products, tools, and messages render live data and expose moderation actions: delete user, delete product, delete tool, toggle tool verification, mark message read/unread, delete message.
- `src/routes/api/*`: auth, contact, tools, token helper, and user-delete endpoints are migrated.

## Intentional deviations

1. `adapter-node` replaces the old Next standalone output. The Dockerfile targets the SvelteKit node adapter build.
2. ISR is approximated with `cache-control` headers on server loads. On bare Node these routes render fresh on every request.
3. Per-page metadata now flows through page `load` data and root head rendering instead of `generateMetadata`.
4. `next/link`, `next/navigation`, and `next/image` are removed. SvelteKit anchors, `$page` data, and static assets replace them.
5. Public env vars now use the `PUBLIC_` prefix where SvelteKit requires compile-time exposure.
6. Mutation flows use SvelteKit form actions (`+page.server.ts` `actions`) with progressive `use:enhance` instead of Next.js Server Actions; revalidation happens through SvelteKit's automatic re-run of `load` after a successful action.
7. The Schema Markup Generator no longer fetches the live OpenExchangeRates currency list. It ships a curated static list of common currencies to keep the tool fully offline-capable; the legacy live fetch was an avoidable third-party dependency for a SEO authoring tool.
8. Admin / dashboard authoring forms (create / edit) for `products` and `tools` are not yet ported. Read views and delete actions are live; richer multi-step authoring (schema builder, Gumroad import, step-driven tool submission) remains follow-up work and is documented under "Remaining gaps".

## Environment variable renames

| Old                                  | New                              |
| ------------------------------------ | -------------------------------- |
| `NEXT_PUBLIC_BASE_URL`               | `PUBLIC_BASE_URL`                |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`  | `PUBLIC_CLOUDINARY_CLOUD_NAME`   |
| `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET` | `PUBLIC_CLOUDINARY_UPLOAD_PRESET` |
| `NEXT_PUBLIC_CLOUDINARY_FOLDER`      | `PUBLIC_CLOUDINARY_FOLDER`       |
| `NEXT_PUBLIC_ENV`                    | `PUBLIC_ENV`                     |
| `NEXT_PUBLIC_WEBSITE_NAME`           | `PUBLIC_WEBSITE_NAME`            |
| `NEXT_PUBLIC_WEBSITE_URL`            | `PUBLIC_WEBSITE_URL`             |

Server-side secrets keep their existing names.

## Remaining gaps

These are deliberate follow-ups, not blockers. Each is documented above with a deviation rationale.

- **Authoring forms (dashboard & admin):** dedicated `new` / `[slug]/edit` routes for `products` and `tools` (multi-step builder, validation, image upload), and the Gumroad import sheet on `/dashboard/products`. Today, creators and admins can list, view, verify, and delete records, but new entries originate elsewhere (e.g. the public submit flow at `/dev-tools/submit` for tools).
- **Browser smoke testing:** route-by-route visual QA across the migrated app has not been recorded. Build and type-check are clean, but a manual pass through every dashboard / admin / dev-tools route remains worthwhile before a production cut.

## Validation

- `npm run check`
- `npm run build`

---
name: project_docs_compiler
description: Docvia (docvia.dev) — framework-agnostic markdown docs compiler with IR-based pipeline; OSS today, managed cloud planned 2026
metadata:
  type: project
---

Standalone product owned by user, sub-product under Nexonauts brand. Public name: **Docvia**. URLs: docvia.dev, docs.docvia.dev.

## What it is

- IR-based markdown documentation compiler. Markdown → parse → validate → IR → render via framework-native adapters (React, Svelte, Vue, Next.js).
- Tagline: "The polish of a hosted platform. None of the lock-in." Implicit target: Mintlify.
- Distinctive features: 0kb markdown parser shipped to client (compilation-first), content-hash incremental cache, typed frontmatter via Zod, 5 pipeline hooks (`beforeParse`/`afterParse`/`beforeTransform`/`afterTransform`/`beforeRender`), section-level Orama search with BYO-AI-keys semantic option, directive-based custom components registered in `docvia.config.ts`.
- Three operating modes sharing one `CompileService`: **Build** (full tree), **Dev** (incremental), **SSR** (per-request, edge-capable). SSR mode is first-class.
- Programmatic API exists today: `import { docs } from "docvia/source"; docs.getPage([slug]); docs.pageTree`.

## Why Docvia exists (origin story for marketing)

User originally used Mintlify/MDX on portfolio, hit framework migration pain when moving React → Svelte (MDX is framework-locked). Built Docvia with directive-based components so markdown stays portable across renderers. This story should be the homepage hero — it's the sharpest pitch.

## Edition plan

- **OSS today**: MIT, self-hostable, full compiler/CLI/renderers on GitHub + npm
- **Team (2026)**: Managed cloud builds, branch previews, analytics, per-seat pricing
- **Enterprise (2026)**: VPC, SSO, SLA, custom support

## State

In beta. Used on user's own sites. Needs: more benchmarks, demo examples, polished user docs, edge-case testing. Remote content sources not yet supported (planned).

## How this affects Nexonauts integration

SSR mode + existing programmatic API means Docvia can be used as a library inside Nexonauts today — **no string-in/HTML-out refactor needed** (earlier worry was unfounded).

Integration shape: Nexonauts has `docvia.config.ts` + Svelte renderer + content in `src/content/guides/...`. SvelteKit load functions call `docs.getPage(slug)` per request, cached at edge. Custom gobyexample-style "side-by-side code + annotation" component registered as a Docvia directive — becomes both a Nexonauts feature and a Docvia example/tutorial.

## How to apply

- Don't suggest Docvia API refactors as Nexonauts prerequisites — SSR mode is already there.
- Push user toward shipping OSS adoption before building Team/Enterprise cloud features. Target market for OSS = devs/teams wanting Mintlify-style polish without lock-in.
- The Svelte renderer is the bottleneck for Nexonauts dogfooding — verify quality parity with the React renderer is a priority.
- Marketing angle to push: framework-portable markdown via directives, not generic "no lock-in." The migration story is the proof.

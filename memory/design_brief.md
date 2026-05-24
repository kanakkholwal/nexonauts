---
name: design_brief
description: Design direction captured from user for the upcoming Nexonauts redesign — UI consistency, animation, gradient surface, Recast subdomain
metadata:
  type: project
---

User flagged the following design direction (2026-05-23). Not scheduled for implementation yet; captured for the next design pass.

## Cross-cutting

- **Lack of UI consistency** across the site — landing, /guides, /learn, /recast, auth pages all feel like different applications. Needs a unified design system carried through every section.
- **Workspace too narrow on /guides and /learn pages** — current `max-w-3xl` (and `max-w-5xl` on the example detail page) is cramped. Increase available width on content-heavy routes.

## Landing page

- **Complete redesign** of homepage, navbar, footer.
- **Subtle animations / transitions** — emphasis on subtle. User mentioned Framer Motion as a reference point; the Svelte equivalent is **Motion One for Svelte (`motion`)** (the new "motion-svelte" package). Use sparingly, not as decoration.
- **Reuse the blue gradient hero surface** — the dark-with-blue-glow CTA block ("Ready to Build the Future?") on the old homepage had the right atmosphere. Extract that as a reusable section/component for use across the site, even though the original heading text doesn't fit the new direction.

## Recast

- **Recast is now deployed at its own site: `recast.nexonauts.com`.** The internal `/recast` route in this repo should be removed and replaced with an external link (target=_blank). Any nav, homepage CTA, or other reference to Recast should point at `https://recast.nexonauts.com` instead of `/recast`. See [[project_recast]] for the product context.

## Design system

- User wants a **centralized [DESIGN.md](../DESIGN.md)** that is the source of truth for tokens, components, spacing, type, motion. Current DESIGN.md is aspirational fiction (describes APK Galeria font, Motion Core system) that doesn't match what's installed (Geist + Tailwind 4 + Bits UI). Rewrite it to describe what the project actually uses and is going to use post-redesign.
- DESIGN.md is the discussion surface — the user wants to plan there before implementing.

## How to apply

When the redesign turn arrives:

1. Start by rewriting DESIGN.md to match the new direction, propose it for review, iterate.
2. Implement against the agreed DESIGN.md — don't redesign component-by-component without the system in place.
3. Pick **Motion One for Svelte** for animation (smaller bundle, native Svelte ergonomics) unless the user specifies otherwise.
4. Extract the blue-gradient hero block into a reusable Svelte component (`HeroGradient.svelte` or similar) before deleting the old homepage code that contains it.
5. Replace `/recast` internal route with an external link to `recast.nexonauts.com`; delete `src/routes/recast/`.
6. Widen `/guides` and `/learn/[lang]/[topic]` to a larger max-width (probably `max-w-6xl` or full-width with a focused inner content column) so the side-by-side step layout has room to breathe.

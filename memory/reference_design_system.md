---
name: design-system-tokens
description: Nexonauts editorial design system tokens, custom Tailwind colors, and component variants exposed by the rebrand.
metadata:
  type: reference
---

After the 2026-05-24 rebrand to the ElevenLabs-editorial style ([[design-brief]]), the system exposes a token vocabulary beyond standard shadcn:

**Color utilities (Tailwind classes, both `bg-` and `text-`):**
- Surfaces: `canvas`, `canvas-soft`, `canvas-deep`, `surface-card`, `surface-strong`, `surface-dark`, `surface-dark-elevated`
- Text/ink: `ink`, `body`, `body-strong`, `muted-ink`, `muted-soft`, `on-dark`, `on-dark-soft`, `on-primary`
- Hairlines (use as `border-*`): `hairline`, `hairline-soft`, `hairline-strong`
- Atmospheric (decoration only — never CTA fills): `gradient-mint`, `gradient-peach`, `gradient-lavender`, `gradient-sky`, `gradient-rose`
- Semantic: `success`, `warning`, `info` (each with `-foreground` pair)

**Radii:** `rounded-pill` (CTAs/badges), `rounded-xl` (cards), `rounded-2xl`/`rounded-3xl` (orb cards), `rounded-md` (inputs).

**Display typography (utility classes):** `display-mega`, `display-xl`, `display-lg`, `display-md`, `display-sm`, `eyebrow`, plus `font-display` for EB Garamond. Body inherits Inter.

**Atmospheric components:** `src/lib/components/surfaces/` exports `HeroGradient` (editorial | dark variant), `GradientOrb` (hue=mint|peach|lavender|sky|rose), `GradientOrbCard`. Use these instead of hand-rolled radial blobs.

**Button variants (extended beyond DESIGN.md):** default (ink pill), outline, secondary, ghost, link, destructive, destructive-solid, success, warning, glass, glass-ink, soft, soft-mint, soft-peach, soft-lavender, soft-sky, soft-rose, on-dark. Sizes: xs, sm, default, md, lg, xl, icon-xs, icon-sm, icon, icon-lg, icon-xl, icon-square.

**Badge variants:** default, solid, outline, secondary, ghost, link, soft-mint, soft-peach, soft-lavender, soft-sky, soft-rose, destructive(-solid), success(-solid), warning(-solid), info(-solid), dot, on-dark. Sizes: xs, sm, default, md, lg. Shape: pill, square.

**Don't:** introduce a saturated brand action color; bold the display serif; use gradient orbs as button fills or text colors; drop body Inter to weight 300.

Source of truth: [DESIGN.md](../DESIGN.md). Implemented in [src/app.css](../src/app.css), [src/lib/components/ui/button/button.svelte](../src/lib/components/ui/button/button.svelte), [src/lib/components/ui/badge/badge.svelte](../src/lib/components/ui/badge/badge.svelte), and the `surfaces/` directory.

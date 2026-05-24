---
name: reference-tailwind-v4-canonical
description: Nexonauts uses Tailwind v4 with canonical-class lint warnings — prefer shorthand forms when writing classes.
metadata:
  type: feedback
---

Nexonauts is on Tailwind v4 with the `suggestCanonicalClasses` lint rule on. The IDE will warn on legacy `[property:value]` syntax when a shorthand exists. Use the canonical forms when writing classes:

- `shadow-[var(--x)]` → `shadow-(--x)`
- `max-w-[var(--x)]` → `max-w-(--x)`
- `[background-image:linear-gradient(...)]` → `bg-[linear-gradient(...)]`
- `[background-size:24px_24px]` → `bg-size-[24px_24px]`
- `[mask-image:radial-gradient(...)]` → `mask-[radial-gradient(...)]`
- `data-[disabled]:...` → `data-disabled:...`
- `bottom-[-1px]` → `-bottom-px`

**Why:** Save the back-and-forth fixing warnings after the fact — every Edit/Write to a `.svelte` file passes through a postToolUse hook that surfaces these as IDE diagnostics.

**How to apply:** When writing Tailwind utilities in Svelte files in this repo, reach for the shorthand forms first. The CSS-variable shorthand `shadow-(--var)` / `max-w-(--var)` only works for variables — for inline values keep `[value]`.

Related: [[design-system-tokens]] (the design tokens this codebase exposes).

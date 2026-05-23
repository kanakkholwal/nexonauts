# Nexonauts Design System

A working document. Source of truth for tokens, components, motion, and layout discipline across the Nexonauts site and its sub-products. Updated in sync with the codebase — when something is described here and not present, it's a TODO; when something exists in code but isn't here, this doc is wrong.

---

## 1. The state we're in

The site has, today, **two coexisting visual systems**:

| Surface | Palette | Defined where |
|---|---|---|
| New homepage (`/`) | Warm sand / cream / sage. `--landing-bg: #f5f1ea`, `--landing-accent: #4a9168` | Inline in `src/routes/+page.svelte` `<style>` block |
| Everything else (`/guides`, `/learn`, `/auth`, `/dev-tools`, `/admin`) | Cool neutral, green primary (`hsl(161 94% 30%)`), light/dark via `data-theme` | `src/app.css` CSS variables + Tailwind 4 `@theme` mapping |

There is also an inherited "blue gradient hero" treatment (dark background, blue radial glow, faint grid) that appeared in early phase-1 work and the auth `+layout.svelte` left rail. The user wants this preserved as a **reusable surface** for hero / CTA / accent sections — but it doesn't fit either of the two palettes above as currently configured.

**These three styles need to collapse into one system before the redesign pass.** This document proposes how.

---

## 2. Proposed direction

> Everything from here down is a proposal. Each section ends with the implementation status — `[locked]`, `[proposed]`, `[open]`. The redesign pass shouldn't start until the `[proposed]`s in §3, §4, §10 are either accepted or replaced.

### 2.1. Brand voice → visual treatment

Nexonauts positions itself as a quiet, dev-focused studio that ships tools and writing. The visual language should read:

- **Calm.** Generous whitespace, restrained color, no decorative motion.
- **Tactile.** Real surfaces with real edges — borders and subtle shadow, not flat-everything.
- **Considered.** Typography does the heavy lifting; color and motion are accents, not the message.
- **Adaptive.** Light by default for content (read in daylight); dark accents for hero / CTA surfaces.

`[proposed]`

### 2.2. One palette, two surface treatments

- **Content surface** — light by default, dark optional via `data-theme="dark"`. Used on `/guides`, `/learn`, `/dev-tools`, `/auth`, `/admin`, and the body sections of the homepage. This is the existing `app.css` system. **Keep it.**
- **Accent surface** — dark background with a single blue radial glow and a faint grid. Used for the homepage hero, top-of-page CTA bands, and the left rail of `/auth`. Extracted to a `HeroGradient.svelte` (or similar) reusable component. Always dark, regardless of site theme.
- **Drop the warm-sand homepage palette.** It's beautiful but it doesn't compose with anything else we have, and the user has signalled the blue-gradient style is what should live on across the site. The homepage gets a redesign that uses the content surface for body sections and the accent surface for hero + CTA.

`[proposed]`

---

## 3. Foundations

### 3.1. Stack

| Concern | Library / tool | Version |
|---|---|---|
| Utility CSS | Tailwind 4 (`@tailwindcss/vite`) | 4.x |
| Component primitives | Bits UI (shadcn-svelte port) | 2.x |
| Typography (UI) | Geist Variable | 5.x (`@fontsource-variable/geist`) |
| Typography (code) | Geist Mono Variable | 5.x (`@fontsource-variable/geist-mono`) |
| Icons | `@lucide/svelte` | 1.x |
| Animation primitives | `tw-animate-css` (Tailwind-friendly keyframes) + `motion` (Motion One for Svelte) — see §10 | TBD |
| Code highlighting | Shiki via `@docvia/plugin-shiki` (build-time) | 0.2.x |
| Markdown / content | Docvia (`@docvia/cli`, `@docvia/renderer-svelte`, `@docvia/plugin-vite`) | 0.2.x |
| Markdown prose styles | `@tailwindcss/typography` (`prose` classes) | 0.5.x |

`[locked]` — these are what's installed today. Nothing here is up for replacement unless we hit a wall.

### 3.2. Token surface

All tokens live as CSS variables on `:root` and `[data-theme="dark"]` in `src/app.css`, then are mapped into Tailwind via `@theme inline { --color-foreground: var(--foreground); ... }`. Tailwind's `bg-foreground`, `text-muted-foreground`, `border-border`, etc. all resolve through these vars.

**Add new tokens in app.css, not inline in components.** When a token needs to exist, it goes in both the `:root` block and the `[data-theme="dark"]` block, then gets mapped under `@theme inline`.

`[locked]`

---

## 4. Color

### 4.1. Content surface tokens (already in app.css)

| Token | Light | Dark | Use |
|---|---|---|---|
| `--background` | `hsl(0 0% 96%)` | `hsl(0 0% 7%)` | Page background |
| `--foreground` | `hsl(0 0% 10%)` | `hsl(0 0% 92%)` | Body text, headings |
| `--card` | `hsl(0 0% 100%)` | `hsl(0 0% 10%)` | Elevated surfaces |
| `--muted` | `hsl(210 40% 98%)` | `hsl(0 0% 12%)` | Subtle backgrounds (eyebrows, badges) |
| `--muted-foreground` | `hsl(220 9% 46%)` | `hsl(218 11% 65%)` | Secondary text |
| `--border` | `hsl(220 13% 91%)` | `hsl(0 0% 14%)` | Hairlines |
| `--primary` | `oklch(0.18 0.012 270)` (near-black) | `oklch(0.96 0.003 270)` (near-white) | Primary CTA, focus ring, accent text |
| `--primary-foreground` | white | near-black | Text/icons on `bg-primary` |
| `--destructive` | `hsl(0 84% 60%)` | `hsl(0 63% 31%)` | Destructive actions only |

The full set is in `src/app.css` (sidebar, ring, popover, chart series, etc.). When in doubt, prefer `foreground` / `muted-foreground` / `border` over inventing greys.

### 4.2. Resolved color decisions

- Emerald (`hsl(161 94% 30%)`) is **Recast's brand color**, not Nexonauts'. Nexonauts adopts a sophisticated near-black primary that lets typography and spacing do the talking.
- Secondary cyan (`hsl(200 98% 39%)`) is **removed completely** — it had no defined role and sat too close to other accents.
- The `--shadow-button` multi-layer treatment is what makes the primary CTA feel "premium / shiny" without needing a chromatic accent. Keep it.

---

## 5. The accent surface (blue gradient hero block)

The block we want to canonicalize:

```
- Dark background (#0a0a0a-ish)
- One large radial blue glow positioned top-center (`bg-primary/20` at ~120px blur)
- Faint vertical+horizontal grid overlay, masked to fade at edges
- Optional rounded outer container with a 1px white/10 border
- White foreground text; muted-zinc supporting text
```

Used today (informally) in:
- The old phase-1 homepage CTA section (deleted)
- `src/routes/auth/+layout.svelte` left rail
- A few inline blocks in the new homepage's dark panels

**Extract as `src/lib/components/surfaces/HeroGradient.svelte`.** Props:
- `as?: "section" | "div"` (default `section`)
- `intensity?: "soft" | "strong"` — controls the blur radius / opacity of the radial
- `padded?: boolean` — adds standard internal padding, default true
- `children` snippet for content

Then use it for: homepage hero, any future "Coming Soon" CTA bands, the auth left rail. One source of truth.

`[proposed]` — implement in the redesign pass.

---

## 6. Typography

Geist for everything. Geist Mono for code.

### 6.1. Scale

| Role | Tailwind class | Size / line-height | Weight |
|---|---|---|---|
| Display | `text-5xl sm:text-6xl lg:text-7xl` | 48 / 60 / 72px | 600 |
| H1 (page) | `text-4xl sm:text-5xl` | 36 / 48px | 700 |
| H2 (section) | `text-3xl sm:text-4xl` | 30 / 36px | 600 |
| H3 (subsection) | `text-lg` to `text-xl` | 18–20px | 600 |
| Body | `text-base` | 16px / 1.6 | 400 |
| Body small | `text-sm` | 14px / 1.5 | 400 |
| Caption / eyebrow | `text-xs uppercase tracking-wide` | 12px | 600 |
| Code | `font-mono text-sm` | 14px / 1.6 | 400 |

`[proposed]` — these are the patterns used in the current codebase; codifying them.

### 6.2. Prose

Long-form content (guide bodies, blog posts) uses `@tailwindcss/typography` (`prose prose-zinc dark:prose-invert`). The Step component opts out of prose styling for layout reasons; check that the rest of long-form content still gets prose discipline.

`[locked]`

---

## 7. Spacing & layout

### 7.1. Spacing scale

Tailwind 4 default. Base unit `0.25rem` (4px). Use `gap-*`, `p-*`, `m-*`, never custom pixel values.

`[locked]`

### 7.2. Content widths per route family

Current state is inconsistent — `/guides` and `/learn/[lang]` use `max-w-3xl`, `/learn/[lang]/[topic]` uses `max-w-5xl`, the homepage shell uses `max-w-6xl`, auth uses a 2-column full-width grid.

Proposed:

| Route family | Outer shell | Inner content |
|---|---|---|
| Homepage (`/`) | full-bleed | `max-w-6xl` per section |
| Marketing (`/recast` if it stays, `/about`, `/pricing`) | full-bleed | `max-w-5xl` |
| Content list (`/guides`, `/learn`, `/learn/[lang]`) | `max-w-4xl` | — |
| Content detail (`/guides/[...slug]`, `/learn/[lang]/[topic]`) | `max-w-6xl` | the Step component handles its own 1.0fr / 1.15fr split |
| Auth | full-bleed 2-col grid | `max-w-[400px]` for the form card |
| Admin | sidebar shell | container, padded |

The user flagged that the current `/guides` and `/learn` are too narrow. The detail pages going to `max-w-6xl` should fix that — the Step component already uses `minmax(0, 1fr) minmax(0, 1.15fr)` so it'll expand to fill.

`[proposed]`

---

## 8. Radius

Defined in app.css as `--radius: 0.75rem` (12px), with Tailwind mappings:

| Token | Value | Use |
|---|---|---|
| `rounded-sm` (`--radius-sm`) | 8px | Inputs, small badges |
| `rounded-md` (`--radius-md`) | 10px | Buttons |
| `rounded-lg` (`--radius-lg`) | 12px | Cards, panels |
| `rounded-xl` (`--radius-xl`) | 16px | Hero panels, large surfaces |
| `rounded-full` | 9999px | Pills, pill-buttons, avatars |

`[locked]`

---

## 9. Shadow / elevation

Three levels — defined informally today, codify them:

| Level | Value | Use |
|---|---|---|
| 0 (flat) | none | Default for borders-only surfaces |
| 1 (subtle) | `0 1px 2px rgb(0 0 0 / 0.06)` | Cards on hover, dropdowns |
| 2 (raised) | `0 4px 16px rgb(0 0 0 / 0.08)` | Modals, popovers |
| `--shadow-button` (existing) | multi-layer inset+drop | Primary buttons. Keep as-is. |

`[proposed]` — add these as tokens in app.css under `@theme inline`.

---

## 10. Motion

### 10.1. Library choice

**Proposed: Motion One for Svelte** (`motion` npm package, the Svelte adapter). Reasons:

- Built on the same engine as Framer Motion's web target — same mental model.
- Native Svelte 5 ergonomics (`use:motion` action, runes-compatible).
- Smaller bundle than `svelte-motion` (community port of FM).
- Active maintenance by the Motion team.

Install: `bun add motion`.

Use cases: page enter (fade + slight Y translate), reveal on scroll, modal/drawer enter (already handled by Bits UI's tw-animate-css preset).

**Do not** use motion for: button hovers, link underlines, color transitions, focus rings. Those are CSS `transition` territory.

`[proposed]`

### 10.2. Motion grammar

| Interaction | Treatment | Timing |
|---|---|---|
| Page section enter | `opacity 0→1`, `translateY 8px→0` | 400ms ease-out, stagger 60ms |
| Hover (button/card) | `scale 1→1.02`, `shadow 0→1` | 150ms ease-out |
| Active (press) | `scale 1.02→0.98` | 80ms |
| Link underline | `text-decoration` reveal | 120ms |
| Reveal on scroll | once-only, threshold 0.2 | 600ms ease-out |
| Dark/light toggle | smooth color transition on `--background`, `--foreground` | 250ms |
| Reduced motion | respect `prefers-reduced-motion: reduce` everywhere; fall back to opacity only | — |

`[proposed]`

---

## 11. Components

### 11.1. Inventory

Already installed (Bits UI primitives in `src/lib/components/ui/`):

`accordion · alert · alert-dialog · avatar · badge · breadcrumb · button · calendar · card · carousel · checkbox · command · dialog · drawer · dropdown-menu · form · hover-card · input · input-group · label · navigation-menu · pagination · popover · progress · radio-group · scroll-area · select · separator · sheet · sidebar · skeleton · slider · sonner · switch · table · tabs · textarea · toggle · toggle-group · tooltip`

**Use these. Don't write custom replacements.** If a primitive is missing for a use case, add it via shadcn-svelte CLI rather than rolling your own.

`[locked]`

### 11.2. Custom components owned by the design system

| Component | Path | Status |
|---|---|---|
| `Logo` | `src/lib/components/logo.svelte` | Exists |
| `Navbar` | `src/lib/components/common/navbar.svelte` | Exists, needs redesign in pass |
| `Footer` | `src/lib/components/common/footer.svelte` | Exists, needs link-update pass already done |
| `Step` (gobyexample-style guide layout) | `src/lib/components/guides/step.svelte` | Done, CSS in app.css |
| `HeroGradient` (reusable accent surface) | `src/lib/components/surfaces/HeroGradient.svelte` | **TBD** — see §5 |
| `ContentShell` (page wrapper enforcing widths from §7.2) | `src/lib/components/surfaces/ContentShell.svelte` | **TBD** — consider |

`[proposed]`

---

## 12. Iconography

`@lucide/svelte` only. Default size `size-4` (16px) inline with text; `size-5` (20px) for standalone. Stroke 2 (default). Don't mix icon sets.

`[locked]`

---

## 13. Code surfaces

Code blocks in Markdown (Docvia + Shiki) render as `<div class="docvia-code-block"><pre class="shiki github-dark">…</pre></div>`.

- Theme: `github-dark` (matches the dark accent surfaces).
- Inline `<code>` in prose: rounded, subtle background — styled in app.css's existing `:not(pre) > code` rule.
- Within a `:::step` directive: layout is controlled by `.guide-step` rules in app.css (see §7.2 detail row).
- Output variant (`:::step{kind=output}`): adds a "terminal" eyebrow label and forces a dark panel regardless of theme.

`[locked]`

---

## 14. Accessibility floor

- Color contrast: WCAG AA minimum. Body text against background must be ≥ 4.5:1 in both light and dark themes.
- Focus indicators: visible ring on every interactive element. Bits UI provides this by default — don't override with `focus:outline-none` without replacement.
- Touch targets: 44×44px minimum on mobile (already enforced by button height + Bits UI defaults).
- `prefers-reduced-motion`: opt every page enter / scroll reveal out of motion when this is set.
- `aria-*` on directive components: `Step` should have a sensible aria-label or section semantics; revisit when redesigning.

`[locked]`

---

## 15. What changes when this doc is approved

The redesign pass becomes:

1. **Add the `HeroGradient` component** (§5) so existing usages can be unified.
2. **Strip the inline `<style>` block from `src/routes/+page.svelte`** — the warm-sand palette goes away.
3. **Rewrite the homepage** using `HeroGradient` for the hero, content-surface body sections, and the `Navbar` / `Footer` defined here.
4. **Widen `/guides` and `/learn` shells** per §7.2.
5. **Remove the internal `/recast` route** and replace every reference with an external link to `recast.nexonauts.com` (target=_blank). See [project_recast](memory/project_recast.md).
6. **Update `Navbar`** to match new system (remove the old NavigationMenu pattern if it doesn't fit, add proper mobile sheet).
7. **Update `Footer`** to match.
8. **Install `motion`** and adopt the §10.2 grammar on at least the homepage.
9. **Add the shadow/elevation tokens from §9** to app.css under `@theme inline`.

---

## 16. Open questions (resolve before the redesign starts)

1. **Brand palette** — ~~keep `--primary: hsl(161 94% 30%)` (emerald) or change to something else?~~ **Resolved (2026-05-23): emerald is reserved for Recast.** Nexonauts adopts a sophisticated near-black primary: `--primary: oklch(0.18 0.012 270)` (≈ `#1a1c25`) in light mode, inverted to `oklch(0.96 0.003 270)` in dark mode. The "shiny" quality comes from the existing `--shadow-button` multi-layer treatment, not from the base hue. Monochromatic discipline — contrast comes from typography and spacing, color is restraint. [resolved]
2. **Drop the warm-sand homepage palette** — ~~confirmed?~~ **Resolved: yes, drop completely.** The inline `<style>` block in `src/routes/+page.svelte` goes away. [resolved]
3. **Drop secondary cyan** — ~~assign it a purpose or remove?~~ **Resolved: remove completely.** It sits too close to other accents and has no defined role. [resolved]
4. **Motion library** — ~~Motion One for Svelte confirmed?~~ **Resolved: `motion` v12 (npm).** Note that this package has framework-agnostic primitives (`animate`, `inView`, `scroll`) but no Svelte-specific exports — we wrap them in a small Svelte action helper (`use:enterOnView`). [resolved]
5. **`/recast` page** — ~~delete or 301?~~ **Resolved: delete the page, add a server-side 308 permanent redirect to `https://recast.nexonauts.com`.** Same effect as keeping a stub but cleaner. [resolved]
6. **Default theme** — light, dark, or system? Today it's system (via mode-watcher). Keep system as default? [open]
7. **`HeroGradient` intensity** — single style, or multiple variants? Going with one variant + a `padded` prop for now; can split later if a second use case demands different intensity. [proposed]
8. **`ContentShell` component** — useful abstraction, or YAGNI? Skip for v1 — page-level layouts express widths directly. Revisit if a third route family appears with the same shell pattern. [proposed]
9. **`/about`, `/pricing`, `/contact`, `/tos`, `/privacy`** static pages — defer to a follow-up pass. The redesign focuses on landing + content + auth + admin shell. [proposed]
10. **DESIGN.md custodianship** — keep this file as the human-readable source of truth, update on every PR that touches design tokens. Revisit Storybook only when the component count justifies it. [proposed]

---

## 17. Not in scope of the system (intentionally)

- Marketing CMS / asset management
- Email templates
- The Cloudflare worker deployment config
- Recast's own UI (lives in its own repo)
- Docvia's own docs (lives at `docs.docvia.dev`)

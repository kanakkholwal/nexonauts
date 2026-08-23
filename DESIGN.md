# Nexonauts Web — Design System

The marketing and reference site for Nexonauts: an umbrella for developer tools that do
their work on your machine, and the home of the writing that comes out of building them.

> **Borders, not depth.** A container is a 1px hairline and a radius. If a surface needs a
> shadow stack to read, it needs better spacing instead.

**Where this comes from.** The surface system is Recast's, adopted wholesale rather than
reinvented: the same tokens, the same nine-step type scale, the same Satoshi/Inter pairing,
the same five radii, the same three permitted shadows, the same one ease. Two products by
the same person should not run two different definitions of a hairline. What stays
Nexonauts is the content, the page rhythm, the dotted-grid texture and the shell geometry.

**What this replaces.** The previous DESIGN.md was a find-and-replace copy of Recast's
document that contradicted the shipped `app.css` on almost every point: it specified Lucide
icons, glass cards, an indigo primary and a dark mode the stylesheet explicitly refused to
support.

---

## Binding rules

These override anything later in the file.

**Type.** Satoshi for h1 and h2 only, weight 700. Satoshi 500 for h3. Inter for everything
at 30px and below. Geist Mono for code, package names and numeric UI. Every size is a scale
step; no `text-[13px]`.

**Colour.** oklch only, never a hex in a component. `--primary` is reserved (see the list).
Filled commit actions are near-black, not accent. Never fade a text token with an opacity
modifier.

**Borders.** Full strength or not at all. `border-border-low/40` is banned. A card is
bordered on all four sides or none.

**Elevation.** Two permitted shadows on marketing surfaces, listed in §Elevation. No
`backdrop-filter`.

**Backgrounds are flat.** One texture (the dotted grid) in two places (hero shell, closing
CTA shell). Tonal separation is `bg-paper`, never a gradient.

**Motion.** One ease: `cubic-bezier(0.32, 0.72, 0, 1)` (`--ease-fluid`). Scroll reveals go
through `<Reveal>`, never a hand-rolled observer at a call site.

**Icons.** Phosphor, duotone for section and card glyphs, regular elsewhere. Never tinted
with `--primary`.

**Copy.** Sentence case. Real numbers or none. No fabricated logos or testimonials.

---

## Audience

1. **Developers looking for a specific tool.** They arrived from a search or a link, and
   want to know what it does and whether it uploads their file.
2. **Developers reading.** Guides, learn-by-example, package docs.
3. **People evaluating the umbrella.** Is this maintained, is it open, who is behind it.

If a sentence reads as if it targets an enterprise procurement team, rewrite it.

---

## Voice

| Do | Don't |
| --- | --- |
| Direct, specific, engineer to engineer. | Marketing-speak ("solutions", "leverage"). |
| Name the constraint ("Windows stable, macOS in beta"). | Imply everything is finished. |
| Say where the work happens ("inside the browser tab"). | "Privacy first, blazing fast". |
| Two-line headlines that fit on one thought. | Paragraph hero copy. |

**Two lines, everywhere.** Every body string is written to land in **at most two lines at
its own column width**. A three-line card body in a 3-up grid is a rewrite, not a layout
problem. In practice that means roughly 75 characters in a 3-up cell, 95 in a 2-up cell,
160 in a FAQ answer, and two lines at `max-w-xl` for the hero subhead.

**Through-line:** the work happens on your device.

---

## Colour

All values are oklch, in [app.css](src/app.css).

### Surfaces and ink

| Role | Light | Dark | Token |
| --- | --- | --- | --- |
| Canvas | `oklch(100% 0 0)` | `oklch(14.5% 0 0)` | `--background` |
| Card | `oklch(100% 0 0)` | `oklch(14.5% 0 0)` | `--card` |
| Paper (tonal band) | `oklch(97% 0 0)` | `oklch(18.5% 0 0)` | `--paper` |
| Hairline | `oklch(92.2% 0 0)` | `oklch(30% 0 0)` | `--border-low` |
| Emphasis border | `oklch(87% 0 0)` | `oklch(42% 0 0)` | `--border-strong` |
| Control boundary | `oklch(62% 0 0)` | `oklch(55% 0 0)` | `--border-control` |
| Input fill | `oklch(94.5% 0 0)` | `oklch(34% 0 0)` | `--input-surface` |
| Strong ink | `oklch(14.5% 0 0)` | `oklch(100% 0 0)` | `--ink-strong` |
| Text | `oklch(20.5% 0 0)` | `oklch(96% 0 0)` | `--foreground` |
| Muted text | `oklch(54.4% 0 0)` | `oklch(68% 0 0)` | `--muted-foreground` |

Light canvas is pure white and cards are pure white. They are told apart by the hairline,
not by tone. **That is the whole idea.**

**Dark mirrors it, and the mirror is the rule.** Card equals canvas in dark too, so a card
on a `bg-paper` band reads by its border, not by a lift. A card sitting *between* canvas
and paper made every panel on a band look sunken, which is what "dark mode feels muddy"
actually is.

`--border-control` exists because `--border-low` measures **1.31:1** on a white card. That
is fine for a decorative divider and unusable as the edge of an input. Inputs, selects,
checkboxes and outline buttons take `--border-control` (3.64:1 light, 3.11:1 dark).

### Accent

| Token | Light | Dark |
| --- | --- | --- |
| `--primary` | `oklch(0.52 0.20 264)` | `oklch(0.70 0.155 264)` |

Indigo, h264. It holds its hue from L0.45 to L0.75 and is the most separable candidate from
`--destructive` under protanopia and deuteranopia. 5.52:1 on white. Both values are inside
sRGB; the ceiling at L0.70 is C0.156.

**`--primary` is reserved for these, and nothing else:**

1. Links inside body copy.
2. The active route indicator in nav.
3. Focus rings and active input borders (`--ring` is `--primary`).
4. Selection and drop targets.
5. Toggle "on" states.
6. The primary data series in a chart.
7. The announcement pill's "New" chip.

**Blue highlights, black commits.** The filled action is `bg-foreground`, not `bg-primary`.
That is what holds the accent near 1% of pixels.

**Never** use `--primary` as a decorative tint. Section-header icons, card glyphs, marquee
items and hover text are all neutral. If an icon just labels a heading it takes
`text-muted-foreground`.

### Feature-tag accents

One hue per tag, never two on one component.

| Tag | Light | Dark | Token |
| --- | --- | --- | --- |
| Tangerine | `oklch(64.6% 0.1943 41.1)` | `oklch(74% 0.155 48)` | `--color-tag-tangerine` |
| Lavender | `oklch(54.1% 0.2466 293)` | `oklch(74% 0.135 291)` | `--color-tag-lavender` |
| Green | `oklch(62.7% 0.1699 149.2)` | `oklch(75% 0.16 152)` | `--color-tag-green` |

The dark values are lifted because the light-mode set sits at 54-64% L and goes to mud on a
14.5% canvas.

Icons render **duotone** (Phosphor `weight="duotone"`), so the glyph carries a translucent
fill under a full-strength stroke in one hue. No tinted background tile behind the icon.

Hue-wheel distance is **not** colour-blind distance. Tag identity must always be carried by
the label as well as the hue.

### Semantic

Status only, never decorative, and never carried by colour alone.

| Token | Light | Dark |
| --- | --- | --- |
| `--success` | `oklch(0.646 0.222 142.495)` | same |
| `--destructive` | `oklch(63.681% 0.20784 25.315)` | `oklch(63.575% 0.20881 25.397)` |
| `--warning` | `oklch(0.73 0.18 43.19)` | same |
| `--info` | `oklch(0.6 0.118 184.704)` | same |

### Colour ratio (60/30/10)

| Share | Role | Tokens |
| --- | --- | --- |
| **60%** | Canvas. The page ground. | `--background` |
| **30%** | Structure. Hairlines, paper bands, muted text, icons. | `--border-low`, `--paper`, `--muted-foreground`, `--foreground` |
| **10%** | Accent. `--primary` plus the three tag hues. | see the reserved list |

### Contrast floors

| Thing | Floor |
| --- | --- |
| Body text on its surface | 4.5:1 |
| Focus ring, control boundary, meaningful icon | 3:1 |
| Two controls distinguished by colour | 3:1 luminance **and** a non-colour cue |

**Never fade a text token with an opacity modifier.** If copy should be quieter it takes
`--muted-foreground`. `text-foreground/40` measures 2.49:1 and is how these floors get
broken.

Two failures were measured and repaired in this pass. Do not reintroduce them:

| Element | Was | Now |
| --- | --- | --- |
| Muted copy on a `bg-paper` band (hero subhead) | `55.6%` = **4.34:1** | `54.4%` = 4.56:1 on paper, 4.98:1 on white |
| Outline button border | `--border-low` = **1.26:1** | `--border-control` = 3.64:1 light, 4.08:1 dark |
| Focus ring, every variant | `ring-ring/50` = **1.70:1** | full-strength `ring-2 ring-ring` = 5.76:1 light, 7.29:1 dark |
| Secondary button on a paper band | paper fill on paper = **1.00:1**, invisible | `--input-surface` fill plus `--border-control` edge |
| Destructive label (light) | `oklch(63.681%)` = **3.76:1** | `oklch(0.56 0.21 25.3)` = 5.18:1 white, 4.75:1 paper |
| Destructive border | `/50` = **1.58:1** | full strength = 5.18:1 light, 5.23:1 dark |
| Destructive hover tint | `bg-destructive/10` label = **3.49:1** | fill flip = 5.18:1 light, 5.23:1 dark |
| Success / warning / info as text (light) | **3.03 / 2.55 / 3.75:1** | 5.16 / 4.98 / 5.25:1 |

The semantic hues are darker than the usual shadcn set because they are used as text and as
a border, not only as a fill. Contrast is symmetric, so one value clears both directions:
the colour on white measures the same as white on the colour. Their `-foreground` tokens
are per-mode, white on light and near-black on dark, the same way `--primary-foreground` is.

The second one is the rule, not the instance: **a decorative hairline is not a control
boundary.** `--border-low` divides cards at 1.26:1 and that is correct, because a card is
not a control and its label carries the meaning. A button, input, select or checkbox has
nothing but its edge, so it takes `--border-control`.

### Dark mode

`[data-theme="dark"]` on `<html>`, defaulting to `prefers-color-scheme`, with a manual
override persisted to `localStorage`. The stamp is written by an inline script in
[app.html](src/app.html) before first paint, so the page never flashes the wrong mode. The
store is [theme.svelte.ts](src/lib/theme.svelte.ts); the toggle sits in the island nav.

Test every new section in both modes. Do not derive dark from light with a filter.

---

## Typography

| Role | Face | Weight | Tracking |
| --- | --- | --- | --- |
| Display (h1, h2) | **Satoshi** | 700 | `-0.01em` |
| Subheads (h3) | **Satoshi** | 500 | `-0.008em` |
| Everything else | **Inter Variable** | 400 body, 500 UI, 600 for h4-h6 | `-0.011em` on h4-h6 |
| Mono | **Geist Mono Variable** | 400/500 | — |

Satoshi ships 400 / 500 / 700 with no 600. At display sizes 500 reads too light, so display
type is Bold; at h3 size 700 is too heavy, so subheads take 500.

Body carries `font-feature-settings: "ss01", "cv11"`, which is where Inter's optical
tighten comes from. Do not add a global letter-spacing on top of it.

### Satoshi is vendored

There is no `@fontsource/satoshi`. The ITF Free Font License woff2 files live in
[static/fonts](static/fonts) and are declared with `@font-face` in `app.css`. Bold is
preloaded from [app.html](src/app.html) because it draws the hero h1. Licence terms are
recorded in [THIRD-PARTY-LICENSES.md](THIRD-PARTY-LICENSES.md). Inter and Geist Mono come
from Fontsource as normal.

### Scale

Ten steps, no ad-hoc px. 16px/1.5 is the canonical body. `text-xs` (12px) survives as a
control-only step for small buttons and chips.

**Register every custom size step with tailwind-merge**, in
[utils.ts](src/lib/utils.ts). twMerge only knows Tailwind's built-in sizes, so an
unregistered step is classified as a text *colour*: `cn("text-background", "text-body")`
then looks like two colours and twMerge drops the first. That is how `variant="dark"`
shipped with no `text-background` at all, leaving a near-white button with an inherited
grey label. The custom radius and shadow names are registered for the same reason. If a
step is added to `@theme`, add it to `twMergeConfig` in the same commit.

**Never register a colour alias whose name collides with a size step.** `--color-body`
existed as a legacy alias and generated `text-body` as a *colour* utility, so `text-body`
silently painted muted grey instead of setting 16px, and every `size="lg"` button rendered
grey label text on a near-white fill. The alias is gone; legacy call sites use
`text-muted-foreground` and `text-foreground` directly. Line height rides along via
Tailwind v4's `--text-*--line-height` pairing, so `text-body` sets both and no call site
needs a `leading-` utility.

| Token | Size | Line height |
| --- | --- | --- |
| `text-caption` | 11px | 1.5 |
| `text-body-sm` | 14px | 1.43 |
| `text-body` | **16px** | 1.5 |
| `text-body-lg` | 18px | 1.56 |
| `text-subheading` | 20px | 1.4 |
| `text-heading-sm` | 24px | 1.33 |
| `text-heading` | 30px | 1.25 |
| `text-heading-lg` | 36px | 1.11 |
| `text-display` | 48px | 1.04 |
| `text-display-lg` | 60px | 1.02 |

Section h2 is `text-heading md:text-heading-lg`. Hero h1 is
`text-heading-lg md:text-display` and is the only place `--ink-strong` appears.

`text-balance` on every headline, `text-pretty` on every body paragraph, written at the
call site so it is visible where the text is.

### Eyebrows

Sentence-case `<SectionLabel>`, not an uppercase letter-spaced pill. At 11px, `uppercase`
plus `tracking-[0.08em]` costs legibility and reads as a tic when repeated down a page.

---

## Shape

Five radii. Nothing else.

| Element | Value | Utility |
| --- | --- | --- |
| Pills, badges, avatars | 9999px | `.pill` / `rounded-pill` |
| Inputs | 6px | `rounded-sm` |
| Buttons and cards | 12px | `rounded-lg` / `.surface` |
| Feature surfaces, mockups | 16px | `.surface-lg` / `.mockup-frame` |
| Hero and closing-CTA shells | 24px | `rounded-3xl` |

Nested radius: when the gap between an inner and outer shape is under 32px,
`inner = outer − gap`. Apply only when the result exceeds 2px.

---

## Elevation

Borders define containers. Shadows are allowed in exactly two places on a marketing surface:

| Use | Token |
| --- | --- |
| Filled button lift, announcement pill | `--shadow-craft-sm` = `0 1px 2px 0 rgba(0,0,0,0.05)` |
| Product mockup frame | `--shadow-craft-floating` = `0 0 0 4px` foreground at 6% |

`--shadow-craft-md/lg/xl` exist for product chrome (`/admin`, `/dev-tools/[slug]`). Do not
use them on the landing page.

**No `backdrop-filter`.** `.glass`, `.glass-card`, `.glass-chip` and `.glass-strong` are
retired: they still resolve, but to the border-first surfaces, so old markup degrades
rather than breaking.

---

## Surfaces

| Class | Use |
| --- | --- |
| `.surface` | Cards. Card fill, 1px hairline, 12px. |
| `.surface-lg` | Feature and showcase panels. Card fill, 1px hairline, 16px. |
| `.surface-alt` | Nested tonal panel. Paper fill, no border, 16px. |
| `.pill` | Badges and the announcement chip. Card fill, 1px hairline, 9999px. |
| `.mockup-frame` | Product screenshots. Card fill, hairline, 16px, 4px ring. |
| `.band-dark` | The always-dark band. Sets `--band-ink`, `--band-muted`, `--band-line`. |

### The @theme alias trap

Tailwind v4 `@theme` aliases are declared once, on `:root`:

```css
@theme { --color-background: var(--background); }
```

The inner `var()` resolves **against `:root`**, not against the element using the utility.
So a token overridden on a *nested* element can never reach an aliased utility.
`<div data-theme="dark" class="bg-background">` mid-page stays light, and it fails
silently: nothing errors, the colour just never changes.

That is why `.band-dark` sets literal oklch values and its own local vars. `.band-rule` and
`.band-gap` are split on purpose: a grid needs the line as a background (`gap-px`), a button
needs it as a border, and one class doing both would give an outlined button a fill.

**The rule:** a surface that flips colour mid-page must carry literal values.

### Background

Canvas is flat. Two textures, and no others:

- **`.bg-dots`** — a 20px dotted grid at 9% foreground, tinted with `color-mix` so it
  inverts with the theme instead of needing a second definition. Paired with
  `.bg-dots-fade` for the radial mask. It appears in exactly two places: the hero shell and
  the closing CTA shell that bookends it.
- **`bg-paper` bands** for tonal section separation.

`bg-aurora`, `bg-ambient`, the gradient orbs and the five `--gradient-*` stops are gone.

---

## Layout

### Column guides

Two hairlines at the content column's edges run the full viewport height, set once in
[+layout.svelte](src/routes/+layout.svelte), so every section reads as sitting on one ruled
page rather than floating independently.

```svelte
<div
  aria-hidden="true"
  class="pointer-events-none fixed inset-y-0 left-1/2 -z-10 w-full max-w-6xl -translate-x-1/2 border-x border-border-low"
></div>
```

### Full-bleed vs bounded

| Section has | Width |
| --- | --- |
| A tonal background (`bg-paper`) or a shell | **Full-bleed** to the viewport |
| No background | **Bounded**, `mx-auto max-w-6xl`, so it sits inside the column guides |

Mixing the two is what makes the rhythm read. A page where everything bleeds loses the
guides entirely.

- **`<Container>`** — `mx-auto w-full px-6 sm:px-8 lg:px-10`, `max-w-6xl` default, `narrow`
  (3xl), `wide` (7xl), `full`.
- **`<Section spacing="tight | default | loose | none">`** — default `py-16 md:py-24`.
- Section dividers are `border-t border-border-low` on the `<Section>` itself. No solid
  rules, no gradients.
- Pages end with `<Footer />`.

### Page rhythm

The sequence, unchanged:

1. **Hero shell.** Full-bleed band, `rounded-b-3xl`, hairline bottom edge, dotted grid.
   Inside: announcement pill, two-line h1, one-paragraph subhead at `text-body-lg`, one
   filled CTA, a meta line at `text-caption`.
2. **Hero showcase.** Three browser frames plus floating cards, inside the shell.
3. **Marquee.** The real properties and packages, never a fabricated customer strip.
4. **Products.** 2-up card grid, each card exiting to its own domain.
5. **Tagline reveal.** Word-by-word resolve on a full-bleed paper band.
6. **Thread.** 3-up, the shared assumption behind the products.
7. **Packages.** `gap-px` grid over the hairline colour.
8. **Writing.** 3-up: Learn, Guides, Dev tools.
9. **FAQ.** Title rail left (`md:col-span-4`), list right (`md:col-span-8`).
10. **Closing CTA.** Bookends the hero: same shell, same grid, inverted corners.
11. **Footer.**

The bookend is the structural signature. Do not give the closing CTA a different shape or
texture from the hero.

### Section header

```svelte
<Reveal>
  <SectionLabel icon={Stack} label="Four tools, four homes" />
</Reveal>
<Reveal delay={60} class="mt-5">
  <h2 class="text-balance text-heading md:text-heading-lg">Each one solves a single job</h2>
</Reveal>
<Reveal delay={120} class="mt-4">
  <p class="text-pretty text-body-lg text-muted-foreground">…</p>
</Reveal>
```

---

## Components

### Buttons

Six variants, and that is the ceiling.

| Variant | Style |
| --- | --- |
| `dark` | `bg-foreground`, background text, `shadow-craft-sm`. **Every marketing CTA.** |
| `default` | `bg-primary` fill. Product chrome only, never a marketing CTA. |
| `outline` | 1px `--border-control`, card fill, `hover:border-foreground`. |
| `secondary` | `--paper` fill, no border. |
| `ghost` | Transparent, muted text, `--paper` on hover. |
| `link` | Transparent, `--primary` text, underline on hover. |
| `destructive` | 1px `--destructive`, transparent. Confirmations only. |

Sizes: `sm` (h-8, 12px label) in the nav, `lg` (h-11, 16px label) for a page CTA,
`default` (h-9) everywhere else.

Avoid `ghost` next to a filled button; the weight difference is too uneven. Use `outline`.

### Cards are a hairline grid, not a row of rounded cards

```svelte
<div class="grid grid-cols-1 gap-px border-y border-border-low bg-border-low sm:grid-cols-3">
  <Reveal as="article" delay={i * 70} class="flex h-full flex-col bg-background px-6 py-8">
    <Icon class="size-5 text-muted-foreground" weight="duotone" />
    <h3 class="mt-4 font-display text-body font-medium text-foreground">{title}</h3>
    <p class="mt-2 text-body-sm text-muted-foreground">{body}</p>
  </Reveal>
</div>
```

`gap-px` over a border-coloured background draws every separator however the cells wrap,
and the cell keeps the canvas so nothing floats. Padding is `px-6 py-8`. The card heading is
`text-body` (16px) on the display face, not `text-subheading`.

A card that is also a link gets `hover:bg-paper` and nothing else. No border change, no
translate, no shadow, no scale.

`.surface` and its 12px radius remain for product chrome (`/dev-tools/[slug]`, `/admin`).
They are not the landing-page card.

Note: a cell class passed to `<Reveal>` must not carry a `transition-*` utility. Reveal
declares `transition-[opacity,transform]`, and a later `transition-colors` wins the merge
and kills the reveal. Keep the transition on the inner `<a>`.

### Navbar

A full-width bar, `h-16`, `max-w-6xl`, transparent over the hero and growing
`border-b border-border-low bg-background/85 backdrop-blur` only once `scrollY > 8`. Links
are `rounded-full px-3.5 py-2 text-body-sm`, muted until hover or current. The wordmark sits
next to a `size-7` ink tile. The CTA is `variant="dark" size="sm"`, not a full-size button.

### SectionLabel

The one section eyebrow: icon plus label at `text-body-sm` in full ink. The glyph is duotone
in a neutral, because an icon that only labels a heading is not an accent.

### Reveal

`<Reveal variant="up" delay={i * 60}>`. Stagger 60 to 80ms. It falls back to visible when
`IntersectionObserver` is missing, so a section is never stuck at `opacity-0` where JS does
not run. **Never hand-roll a local observer at a call site** for that reason.

### FaqList

Hairline-divided rows on `divide-y border-y`, one open at a time, first row open on load.
Plus-rotate is the only affordance: no card, no chevron column.

### Marquee

The track holds the list twice and translates exactly `-50%`, so the seam lands on an
identical frame. The second copy is `aria-hidden`. Both edges cross-fade via `mask-image`.
Hover or `focus-within` parks the animation so an item can be read.

**Reduced motion needs an explicit kill here.** The global guard collapses
`animation-duration` to `0.01ms`, which snaps the track straight to its end frame instead of
stopping it.

### Icons

Phosphor (`phosphor-svelte`). `weight="duotone"` for section and card glyphs, `regular`
elsewhere. 16px in UI, 20px in cards. Never accent-tinted.

### Trust and proof

Nexonauts is a personal umbrella, not a company. **Do not fabricate customer logos.** The
marquee of real properties and the public repositories are the honest proof. Licences differ
per project, so state them per project rather than claiming "open source" globally.

---

## Motion

One ease: `cubic-bezier(0.32, 0.72, 0, 1)`, `--ease-fluid`.

| Use | Duration |
| --- | --- |
| Hover and state colour change | 200ms |
| Card border change | 200ms |
| Overlay enter / exit | 200ms / 150ms |
| Sheet enter | 300ms |
| Scroll reveal | 500ms, 60 to 80ms stagger |
| Hero entrance (`animate-fade-up`) | 500ms, three steps: 60 / 140 / 220ms |

Scale deltas are 2% (`0.98`), never smaller; anything tighter reads as a pop. Slide is 4px
for popovers, 24px for sheets.

Svelte `transition:` directives use WAAPI and bypass the CSS reduced-motion guard. Gate them
in JS.

---

## Migration

**Done.** The token layer, the shared UI primitives and `/` are on this system.

1. **Tokens.** [app.css](src/app.css) rewritten in oklch with `[data-theme="dark"]`. Legacy
   names (`--ink`, `--canvas`, `--hairline`, `--surface-strong`, `.display-*`, `.eyebrow`)
   are kept as deprecated aliases remapped onto the new values, so the unmigrated routes
   still render correctly in both themes. New work must not use them.
2. **Dark mode.** Pre-paint script, store, and nav toggle.
3. **Type.** Satoshi vendored, Inter added, ten-step scale live.
4. **Shadows.** Every inline `shadow-[...]` on the homepage path is gone.
5. **Surfaces.** `.surface`, `.surface-lg`, `.surface-alt`, `.pill`, `.mockup-frame`,
   `.band-dark` added. `.glass*` neutralised.
6. **Components.** `Section`, `Container`, `Reveal`, `SectionLabel`, `FaqList` added under
   [surfaces](src/lib/components/surfaces).
7. **Buttons.** 17 variants down to 6. Badge and alert lost their pastel variants; badge is
   sentence case.
8. **Layout.** Column guides in the root layout; section top-rules on every bounded section.

**Still open.**

- `/learn`, `/guides`, `/dev-tools/[slug]`, `/admin`, `/auth` and the static pages use the
  legacy aliases and the old 14px scale. They render correctly in both themes but are not
  on the ten-step scale.
- `@lucide/svelte` remains in [learn/+page.svelte](src/routes/learn/+page.svelte) and
  [navbar.svelte](src/lib/components/common/navbar.svelte).
- The tag hues are defined but not yet used: nothing on the landing page carries a lane.

---

## Dos and Don'ts

**Do**

- Define containers with `border-border-low` at full strength.
- Keep Satoshi to h1 and h2; Inter handles everything at 30px and below.
- Reserve `--primary` to the listed roles; commit actions are near-black.
- Use `--border-control` on anything a user types into or clicks.
- Test every new section in both light and dark.
- State per-project licences and platform status honestly.

**Don't**

- Don't fade text with an opacity modifier; use `--muted-foreground`.
- Don't dilute a hairline (`border-border-low/60` and friends).
- Don't add `backdrop-filter` or `shadow-craft-md`+ to a marketing surface.
- Don't write `text-[13px]` or any other ad-hoc size.
- Don't use uppercase, letter-spaced eyebrows; use `<SectionLabel>`.
- Don't lift a card on hover. Change its border.
- Don't tint an icon with `--primary` to make a section feel more designed.
- Don't invert the theme mid-page except through `.band-dark`.

---

## Routes and section anchors

| Route | Sections |
| --- | --- |
| `/` | `#products`, `#thread`, `#packages`, `#writing`, `#faq` |
| `/learn` | language index |
| `/learn/[lang]` | topic index |
| `/learn/[lang]/[topic]` | side-by-side guide steps |
| `/guides` | guide index |
| `/dev-tools` | tool index |
| `/about`, `/contact`, `/privacy`, `/tos`, `/copyright` | static |

Keep the nav and footer in sync with these. Stale anchors are silent UX bugs.

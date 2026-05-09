# Design System Inspired by Motion Core

## 1. Visual Theme & Atmosphere

Motion Core's design system embodies a clean, technical aesthetic rooted in developer-friendly documentation and modern web component patterns. The visual language prioritizes clarity and functionality, using a carefully balanced palette of deep neutral tones paired with vibrant accent colors that signal interactivity and code elements. The atmosphere is professional yet approachable—deliberate in its minimalism, sophisticated in its use of subtle shadows and refined typography. The design communicates precision, reliability, and forward-thinking motion capabilities through controlled color choices, considered spacing, and purposeful elevation treatments. This is a system designed for engineers and designers who value both aesthetics and implementation clarity.

**Key Characteristics**
- Clean, documentation-focused aesthetic with strong visual hierarchy
- Subtle, refined shadow system creating depth without heaviness
- High contrast between neutral text and vibrant accent highlights
- Technical typography with monospace code elements
- Smooth spacing system enabling fluid layouts and breathing room
- Purposeful use of color to indicate function (danger, success, primary actions, code)
- Accessibility-conscious contrast ratios throughout

## 2. Color Palette & Roles

### Primary

- **Charcoal Dark** (`#24292E`): Primary text, headings, and dominant UI elements—the foundation of the typography system
- **Dark Neutral** (`#000000`): Secondary text, borders, and subtle UI dividers

### Accent Colors

- **Vibrant Purple** (`#6F42C1`): Code highlighting, special emphasis, and technical element markers
- **Deep Blue** (`#032F62`): Links, navigation focus, and secondary CTAs
- **Bright Blue** (`#005CC5`): Primary interactive elements and hover states
- **Forest Green** (`#22863A`): Success states and positive indicators
- **Light Lavender** (`#9ECBFF`): Background tints for code blocks and neutral highlights
- **Orange** (`#E36209`): Tertiary accents and secondary visual markers
- **Soft Purple** (`#B392F0`): Muted accent tints and background layers

### Interactive

- **Primary Action Blue** (`#005CC5`): Default CTA buttons and primary interactive states
- **Danger Red** (`#D73A49`): Error states, warnings, destructive actions, and validation errors

### Neutral Scale

- **Light Border** (`#E1E4E8`): Subtle dividers, input borders, and light separators
- **White** (`#FFFFFF`): Card backgrounds, page base, and content surfaces

### Surface & Borders

- **Off-White** (`#FFFFFF`): Primary surface for cards and containers
- **Light Divider** (`#E1E4E8`): Borders between sections and subtle visual separation

## 3. Typography Rules

### Font Family

**Primary Font:** APK Galeria (sans-serif)
Fallback: `-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif`

**Secondary Font:** Berkeley Mono (monospace)
Fallback: `"Courier New", Courier, monospace`

### Hierarchy

| Role | Font | Size | Weight | Line Height | Letter Spacing | Notes |
|------|------|------|--------|-------------|---|---|
| Display | APK Galeria | 30px | 500 | 36px | 0px | Page titles, major headings |
| Heading 1 | APK Galeria | 30px | 500 | 36px | 0px | Section headers |
| Heading 2 | APK Galeria | 24px | 500 | 32px | 0px | Subsection headers |
| Heading 3 | APK Galeria | 18px | 500 | 18px | 0px | Card titles, small section headers |
| Heading 4 | APK Galeria | 12px | 500 | 16px | 0px | Labels, small headings |
| Body | APK Galeria | 14px | 500 | 20px | 0px | Primary content paragraphs |
| Body Regular | APK Galeria | 14px | 400 | 20px | 0px | Secondary content, descriptions |
| Button Text | APK Galeria | 14px | 500 | 20px | 0px | Button labels |
| Link | APK Galeria | 14px | 400 | 20px | 0px | Inline links, navigation items |
| Caption | APK Galeria | 12px | 400 | 16px | 0px | Helper text, metadata |
| Code Inline | Berkeley Mono | 14px | 500 | 20px | 0px | Inline code snippets, keywords |
| Code Block | Berkeley Mono | 14px | 400 | 21px | 0px | Code blocks, terminal output |
| Badge | Berkeley Mono | 10px | 500 | 14.29px | 0px | Tag badges, version indicators |

### Principles

- **Hierarchy through weight:** Typography hierarchy is primarily achieved through font size and weight variation, not color manipulation
- **Generous line height:** All content uses a minimum line height of 1.4x font size to ensure readability and breathing room
- **Monospace for technical content:** Berkeley Mono is reserved exclusively for code, commands, and technical elements to create visual distinction
- **Semantic sizing:** Heading sizes follow a predictable scale (30px → 24px → 18px → 12px) enabling predictable layouts
- **Weight variation:** Display and heading content uses 500 weight for impact; body and secondary content uses 400 weight for reduced visual weight

## 4. Component Stylings

### Buttons

**Primary Button**
- Background: `oklch(0.9764 0.0013 265)` (very light neutral)
- Text Color: `oklab(0.5493 -0.000705961 -0.00806918 / 0.7)` (muted dark with transparency)
- Font: APK Galeria, `14px`, weight `500`, line-height `20px`
- Padding: `6px 12px 6px 12px`
- Border Radius: `8.8px`
- Height: `36px`
- Width: `auto` (min-width `320px`)
- Border: `0px solid oklab(0.5493 -0.000705961 -0.00806918 / 0.7)`
- Box Shadow: `rgba(0, 0, 0, 0.06) 0px 1px 1px -0.5px inset, rgba(0, 0, 0, 0.06) 0px 3px 3px -1.5px inset, rgba(0, 0, 0, 0.06) 0px 6px 6px -3px inset, rgba(255, 255, 255, 0.06) 0px -0.5px 0px 0px inset, oklch(0.4224 0.0013 265 / 0.08) 0px 0px 0px 0.5px inset`
- Hover: Increase inset shadow opacity to `0.08` for all rgba values
- Focus: Add outline `2px solid #005CC5` with `2px` offset

**Secondary Button (Ghost)**
- Background: `rgba(0, 0, 0, 0)` (transparent)
- Text Color: `oklch(0.5493 0.0081 265)` (muted blue-gray)
- Font: APK Galeria, `14px`, weight `500`, line-height `20px`
- Padding: `6px 12px 6px 12px`
- Border Radius: `8.8px`
- Height: `32px`
- Width: `auto` (min-width `320px`)
- Border: `0px solid oklch(0.5493 0.0081 265)`
- Box Shadow: `none`
- Hover: Background becomes `rgba(0, 0, 0, 0.04)`, text color brightens to `oklch(0.1881 0.006 265)`
- Focus: Add outline `2px solid #005CC5`

**Icon Button**
- Background: `rgba(0, 0, 0, 0)` (transparent)
- Text Color: `oklch(0.1881 0.006 265)` (dark neutral)
- Font: APK Galeria, `14px`, weight `400`, line-height `20px`
- Padding: `0px 0px 0px 0px`
- Border Radius: `8.8px`
- Height: `40px`
- Width: `40px`
- Border: `0px solid oklch(0.1881 0.006 265)`
- Box Shadow: `none`
- Hover: Background becomes `rgba(0, 0, 0, 0.06)`
- Focus: Add outline `2px solid #005CC5`

### Cards & Containers

**Card Default**
- Background: `oklch(1 0 0)` (white)
- Text Color: `oklch(0.1881 0.006 265)` (dark neutral)
- Font: APK Galeria, `14px`, weight `500`, line-height `20px`
- Padding: `8px 16px 8px 16px`
- Border Radius: `8.8px`
- Height: `36px`
- Width: `100%`
- Border: `0px solid oklch(0.1881 0.006 265)`
- Box Shadow: `rgba(255, 255, 255, 0.06) 0px -0.5px 0px 0px, rgba(0, 0, 0, 0.06) 0px 4px 8px 0px, oklch(0.4224 0.0013 265 / 0.08) 0px 0px 0px 0.5px, rgb(0, 0, 0) 0px 1px 6px -4px`
- Hover: Increase outer shadow to `0px 6px 12px 0px`

**Code Block Card**
- Background: `oklch(1 0 0)` (white)
- Text Color: `oklch(0.1881 0.006 265)` (dark neutral)
- Font: Berkeley Mono, `14px`, weight `400`, line-height `20px`
- Padding: `2px 4px 2px 4px`
- Border Radius: `5.5px`
- Height: `24px`
- Width: `auto`
- Border: `0px solid oklch(0.1881 0.006 265)`
- Box Shadow: `rgba(255, 255, 255, 0.06) 0px -0.5px 0px 0px, rgba(0, 0, 0, 0.06) 0px 4px 8px 0px, oklch(0.4224 0.0013 265 / 0.08) 0px 0px 0px 0.5px, rgb(0, 0, 0) 0px 1px 6px -4px`

**Badge Card**
- Background: `oklch(1 0 0)` (white)
- Text Color: `oklab(0.5493 -0.000705961 -0.00806918 / 0.7)` (muted dark)
- Font: Berkeley Mono, `10px`, weight `500`, line-height `14.29px`
- Padding: `0px 6px 0px 6px`
- Border Radius: `4.4px`
- Height: `20px`
- Width: `auto`
- Border: `0px solid oklab(0.5493 -0.000705961 -0.00806918 / 0.7)`
- Box Shadow: `rgba(255, 255, 255, 0.06) 0px -0.5px 0px 0px, rgba(0, 0, 0, 0.06) 0px 4px 8px 0px, oklch(0.4224 0.0013 265 / 0.08) 0px 0px 0px 0.5px, rgb(0, 0, 0) 0px 1px 6px -4px`

### Inputs & Forms

**Text Input**
- Background: `oklch(1 0 0)` (white)
- Text Color: `oklch(0.1881 0.006 265)` (dark neutral)
- Font: APK Galeria, `14px`, weight `400`, line-height `20px`
- Padding: `8px 12px 8px 12px`
- Border Radius: `8.8px`
- Height: `40px`
- Border: `1px solid #E1E4E8` (light border)
- Box Shadow: `none`
- Focus: Border becomes `1px solid #005CC5`, box-shadow becomes `0px 0px 0px 3px rgba(0, 92, 197, 0.1)`
- Placeholder Color: `oklab(0.5493 -0.000705961 -0.00806918 / 0.7)` (muted)

**Text Input Error**
- Border: `1px solid #D73A49` (danger red)
- Box Shadow: `0px 0px 0px 3px rgba(215, 58, 73, 0.1)`
- Helper Text Color: `#D73A49`
- Helper Font: APK Galeria, `12px`, weight `400`, line-height `16px`

**Text Input Success**
- Border: `1px solid #22863A` (forest green)
- Box Shadow: `0px 0px 0px 3px rgba(34, 134, 58, 0.1)`

### Navigation

**Sidebar Navigation**
- Background: `rgba(0, 0, 0, 0)` (transparent)
- Text Color: `oklch(0.1881 0.006 265)` (dark neutral)
- Font: APK Galeria, `16px`, weight `400`, line-height `24px`
- Padding: `0px 0px 0px 0px` (per-item padding applies at item level)
- Border Radius: `0px`
- Height: `436px` (flexible container)
- Width: `320px`
- Border: `none`
- Box Shadow: `none`

**Navigation Item (Default)**
- Background: `rgba(0, 0, 0, 0)` (transparent)
- Text Color: `oklch(0.1881 0.006 265)` (dark neutral)
- Font: APK Galeria, `14px`, weight `400`, line-height `20px`
- Padding: `8px 0px 8px 0px`
- Border Radius: `0px`
- Height: `auto`
- Width: `auto`
- Border: `0px`
- Box Shadow: `none`
- Hover: Background becomes `rgba(0, 0, 0, 0.03)`, text color becomes `#032F62`

**Navigation Item (Active)**
- Background: `rgba(0, 0, 0, 0)` (transparent)
- Text Color: `#E36209` (orange accent)
- Font: APK Galeria, `14px`, weight `500`, line-height `20px`
- Padding: `8px 0px 8px 0px`
- Border Radius: `0px`
- Border Left: `3px solid #E36209`
- Box Shadow: `none`

### Links

**Inline Link**
- Background: `rgba(0, 0, 0, 0)` (transparent)
- Text Color: `oklch(0.1881 0.006 265)` (dark neutral)
- Font: APK Galeria, `14px`, weight `400`, line-height `20px`
- Padding: `0px`
- Border Radius: `0px`
- Border Bottom: `1px solid transparent`
- Box Shadow: `none`
- Hover: Border bottom becomes `1px solid oklch(0.1881 0.006 265)`, text color becomes `#032F62`

**Primary Link Button**
- Background: `oklab(0.6996 0.144192 0.141408 / 0.1)` (soft orange tint)
- Text Color: `oklch(0.6996 0.201959 44.4414)` (orange)
- Font: APK Galeria, `14px`, weight `500`, line-height `20px`
- Padding: `6px 12px 6px 12px`
- Border Radius: `8.8px`
- Height: `32px`
- Width: `300px`
- Border: `0px solid oklch(0.6996 0.201959 44.4414)`
- Box Shadow: `none`
- Hover: Background becomes `oklab(0.6996 0.144192 0.141408 / 0.15)`, text color brightens
- Focus: Add outline `2px solid #005CC5`

## 5. Layout Principles

### Spacing System

**Base Unit:** `4px`

**Spacing Scale:**
- `4px`: Tight internal component padding (button text to edge)
- `8px`: Small spacing (component-to-component, tight padding)
- `12px`: Medium-small spacing (input labels, small gaps)
- `16px`: Standard spacing (card padding, common gaps)
- `20px`: Medium spacing (section padding, moderate separations)
- `24px`: Large-ish spacing (between form groups, feature sections)
- `32px`: Large spacing (gap between major sections)
- `36px`: Extra-large spacing (between distinct layout regions)
- `40px`: Extra spacing (major vertical spacing, breathing room)
- `48px`: Huge spacing (page-level vertical rhythm)
- `64px`: Maximum spacing (between major layout blocks, hero sections)

**Usage Context:**
- Button/Input padding: `8px`, `12px`, `16px`
- Card padding: `16px`, `20px`
- Section margins: `24px`, `32px`, `40px`, `48px`
- Page-level margins: `48px`, `64px`

### Grid & Container

**Max Width:** `1200px` (standard container max-width for content)

**Column Strategy:** 12-column grid with `16px` gutters

**Section Patterns:**
- Two-column: 50% | 50% (equal split with `16px` gap)
- Sidebar + Content: 320px (fixed) | 1fr (flexible)
- Hero: Full width with `64px` top/bottom padding
- Feature Grid: 3-column at desktop, 2-column at tablet, 1-column at mobile

### Whitespace Philosophy

Motion Core embraces generous whitespace as a core design principle. Spacing is used deliberately to create visual breathing room, establish hierarchy, and reduce cognitive load. Large margins between sections (40px–64px) signal major content transitions. Moderate spacing (24px–32px) creates logical grouping. Tight spacing (8px–12px) keeps related items cohesive. This creates a rhythm that feels intentional and navigable, allowing viewers to scan content quickly and focus without distraction.

### Border Radius Scale

- `0px`: Navigation dividers, full-width sections, underlines
- `4.4px`: Small badges, tight components
- `5.5px`: Code blocks, monospace containers
- `8.8px`: Buttons, standard cards, inputs, most interactive elements
- `13.2px`: Large cards, expanded containers
- `9999px`: Fully rounded pills (for circular/oval treatments)

## 6. Depth & Elevation

| Level | Treatment | Use |
|-------|-----------|-----|
| Flat | `none` (no shadow) | Navigation, sidebar, text-only content, ghost buttons |
| Base | `rgba(255, 255, 255, 0.06) 0px -0.5px 0px 0px, rgba(0, 0, 0, 0.06) 0px 4px 8px 0px, oklch(0.4224 0.0013 265 / 0.08) 0px 0px 0px 0.5px, rgb(0, 0, 0) 0px 1px 6px -4px` | Cards, code blocks, standard containers |
| Inset | `rgba(0, 0, 0, 0.06) 0px 1px 1px -0.5px inset, rgba(0, 0, 0, 0.06) 0px 3px 3px -1.5px inset, rgba(0, 0, 0, 0.06) 0px 6px 6px -3px inset, rgba(255, 255, 255, 0.06) 0px -0.5px 0px 0px inset, oklch(0.4224 0.0013 265 / 0.08) 0px 0px 0px 0.5px inset` | Pressed buttons, input fields, depressed states |
| Light | `oklab(0.999994 0.0000455678 0.0000200868) 0px 1px 0px 0px` | Minimal dividers, subtle emphasis |

**Shadow Philosophy**

Motion Core uses a carefully calibrated shadow system that combines multiple shadow layers to create nuanced depth without visual heaviness. The base card shadow uses a subtle combination of inset highlights (simulating light from above), a discrete drop shadow (creating separation), and a colored border shadow (tying shadow to the design system's color logic). This multi-layer approach creates perceived depth and hierarchy while maintaining a clean, refined aesthetic. Shadows are used sparingly—reserved for elevated content (cards, containers) and interactive states—rather than pervasive throughout the interface. This restraint keeps the visual focus on content and typography.

## 7. Do's and Don'ts

### Do

- **Use semantic colors consistently.** Danger red (`#D73A49`) for errors, green (`#22863A`) for success, blue (`#005CC5`) for primary actions.
- **Maintain generous spacing between sections.** Use minimum `24px` margins between distinct content blocks; `40px`–`64px` for major layout transitions.
- **Apply subtle, layered shadows to cards and containers.** Never use heavy, singular drop shadows; always combine inset highlights, discrete drops, and border shadows.
- **Use APK Galeria for all UI text and headings.** Berkeley Mono is exclusively for code, commands, and technical content.
- **Bold typography with weight variation.** Headings use weight `500`; body content uses weight `400` for visual contrast.
- **Ensure minimum `40px` height for touch targets.** Buttons, links, and interactive elements must accommodate comfortable finger/cursor interaction.
- **Create visual hierarchy through size and weight, not color manipulation.** Avoid using color alone to denote importance.
- **Test color contrast for WCAG AA compliance.** All text-to-background color pairs must exceed 4.5:1 contrast ratio.

### Don't

- **Mix serif and sans-serif fonts in the same component.** Maintain font consistency within logical units; only use Berkeley Mono for code.
- **Use heavy shadows on small components.** Icon buttons, badges, and tight-fit elements should use no shadow or inset shadow only.
- **Exceed `1200px` max-width for content containers.** This maintains optimal line length and readability.
- **Use colors outside the defined palette.** Custom colors dilute the system's cohesion and complicate future maintenance.
- **Apply padding less than `8px` to buttons and inputs.** This compromises touch target size and visual breathing room.
- **Use danger red (`#D73A49`) for primary CTAs or branding.** Red is reserved exclusively for errors, warnings, and destructive actions.
- **Combine multiple accent colors in a single component.** Limit accent usage to one per interactive element for clarity.
- **Use line heights less than `1.4x` font size for body text.** Tighter spacing impairs readability and accessibility.
- **Skip focus states or visual feedback for interactive elements.** Every button, link, and input must have a clear focus outline (`2px solid #005CC5`).

## 8. Responsive Behavior

### Breakpoints

| Name | Width | Key Changes |
|------|-------|-------------|
| Mobile | 320px – 639px | Single column, `16px` horizontal padding, stacked navigation, `14px` primary font size |
| Tablet | 640px – 1023px | Two-column grid where applicable, `24px` horizontal padding, collapsible navigation, `16px` heading size |
| Desktop | 1024px+ | Three-column+ grids enabled, `32px` horizontal padding, fixed sidebar navigation, `30px` heading size, full max-width `1200px` container |

### Touch Targets

- **Minimum size:** `40px × 40px` for all interactive elements (buttons, links, navigation items, form controls)
- **Spacing between targets:** Minimum `8px` between adjacent interactive elements to prevent accidental activation
- **Padding for text links:** Add `8px` vertical padding and `4px` horizontal padding to ensure adequate touch area

### Collapsing Strategy

**Navigation:**
- Desktop: Fixed 320px sidebar on left
- Tablet: Collapsible hamburger menu, overlay sidebar on activation
- Mobile: Full-screen hamburger menu, reveal/hide with animation

**Grid Layouts:**
- Desktop: Three-column feature grid (33% each)
- Tablet: Two-column feature grid (50% each) with `16px` gap
- Mobile: Single-column stacked layout with `24px` gaps

**Spacing:**
- Decrease margins from `64px` (desktop) → `48px` (tablet) → `24px` (mobile)
- Maintain base padding for components: buttons, cards, inputs remain consistent across breakpoints
- Increase heading sizes proportionally: reduce h1 from `30px` (desktop) to `24px` (tablet) to `20px` (mobile)

**Images & Media:**
- Max width: `100%` on all breakpoints
- Container-based scaling: maintain aspect ratio using `aspect-ratio` CSS property
- Lazy load below-fold content on mobile

## 9. Agent Prompt Guide

### Quick Color Reference

- **Primary CTA:** Bright Blue (`#005CC5`)
- **Secondary CTA:** Deep Blue (`#032F62`)
- **Success State:** Forest Green (`#22863A`)
- **Error/Danger:** Danger Red (`#D73A49`)
- **Primary Text:** Charcoal Dark (`#24292E`)
- **Secondary Text:** Dark Neutral (`#000000`)
- **Background:** White (`#FFFFFF`)
- **Card Surface:** White (`#FFFFFF`)
- **Border/Divider:** Light Border (`#E1E4E8`)
- **Code Highlight:** Vibrant Purple (`#6F42C1`)
- **Code Background Tint:** Light Lavender (`#9ECBFF`)
- **Accent Highlight:** Orange (`#E36209`)

### Iteration Guide

1. **Font Hierarchy:** Always use APK Galeria for UI; Berkeley Mono only for code. Heading sizes: 30px (h1) → 24px (h2) → 18px (h3) → 12px (h4). Body: 14px weight 400. All headings: weight 500.

2. **Spacing Consistency:** Base unit is `4px`. Apply multiples: `8px`, `12px`, `16px`, `20px`, `24px`, `32px`, `40px`, `48px`, `64px`. Never use arbitrary values outside this scale.

3. **Button Sizing:** Minimum height `32px` (ghost) or `36px` (primary). Width: `auto` with min-width `320px`. Always include visible focus outline: `2px solid #005CC5`.

4. **Card Elevation:** Use multi-layer shadow: inset highlights + discrete drop + border shadow. Exact value: `rgba(255, 255, 255, 0.06) 0px -0.5px 0px 0px, rgba(0, 0, 0, 0.06) 0px 4px 8px 0px, oklch(0.4224 0.0013 265 / 0.08) 0px 0px 0px 0.5px, rgb(0, 0, 0) 0px 1px 6px -4px`. Apply to cards and containers only; use `none` for flat components.

5. **Border Radius Strategy:** `8.8px` for buttons, standard cards, inputs. `4.4px` for badges. `5.5px` for code blocks. `0px` for navigation dividers. `9999px` for pill-shaped elements.

6. **Input Fields:** Height `40px`, padding `8px 12px`, border `1px solid #E1E4E8`. Focus state: `1px solid #005CC5` + box-shadow `0px 0px 0px 3px rgba(0, 92, 197, 0.1)`. Apply error state (`#D73A49`) or success state (`#22863A`) as needed.

7. **Navigation Styling:** Sidebar navigation is transparent background, `16px` line-height, no shadow. Active state: orange left border (`3px solid #E36209`), text orange (`#E36209`). Hover: subtle background tint `rgba(0, 0, 0, 0.03)`.

8. **Responsive Collapsing:** At tablet (`640px`), shift sidebar to collapsible hamburger. At mobile (`320px`), use single-column layout, reduce margins from `64px` → `48px` → `24px`. Maintain `40px` minimum touch target size across all breakpoints.

9. **Accessibility Compliance:** All text must meet WCAG AA contrast ratio (`4.5:1` minimum for normal text, `3:1` for large text). Every interactive element requires visible focus state. Use semantic HTML (`<button>`, `<a>`, `<input>`) to ensure screen reader compatibility.

10. **Color Usage Discipline:** Never deviate from the palette. Danger red is exclusively for errors; success green only for confirmations; primary blue only for primary CTAs. Respect semantic roles: these constraints enable coherent, predictable UI behavior and reduce decision fatigue.
# Design System Inspired by Motion Core

## 1. Visual Theme & Atmosphere

Motion Core embodies a modern, developer-focused design aesthetic that celebrates motion, interactivity, and technical sophistication. The visual language is clean and minimalist, with a predominantly neutral palette punctuated by vibrant accent colors that draw attention to interactive and primary elements. The design prioritizes clarity and usability while maintaining a contemporary, tech-forward personality. Soft shadows, refined typography, and generous whitespace create an approachable yet professional atmosphere that appeals to developers and designers alike. The system leverages subtle depth and motion-ready component styling to emphasize the toolkit's core purpose: delivering high-quality animated experiences.

**Key Characteristics:**
- Minimalist, developer-centric aesthetic
- Neutral foundation with bold accent highlights
- Soft, refined elevation and shadow treatment
- Type-forward hierarchy with distinct sizing scales
- Motion-ready component design language
- Emphasis on clarity, accessibility, and technical precision
- Contemporary, polished visual identity

## 2. Color Palette & Roles

### Primary
- **Accent Blue** (`#1D9BF0`): Primary interactive element, call-to-action buttons, links, and emphasis text. Used extensively for primary CTAs and focus states.

### Neutral Scale
- **White** (`#FFFFFF`): Primary background for cards, containers, and elevated surfaces. Used for high-contrast text and UI elements.
- **Black** (`#000000`): Primary text color, headings, and UI foreground elements. Used for maximum contrast and readability.
- **Transparent White** (`#FFF0`): Overlay and transparency effects, used sparingly for glass-morphism or fade transitions.

### Surface & Borders
- **Very Dark Gray** (`oklch(0.1881 0.006 265)`): Secondary text, subtle borders, and low-contrast UI elements. Represents deep neutral tones for visual hierarchy.
- **Medium Gray** (`oklch(0.5493 0.0081 265)`): Mid-tone text, tertiary UI elements, and muted interactive states.
- **Light Gray** (`oklch(0.9764 0.0013 265)`): Very light background variations, subtle accents, and minimal contrast overlays.
- **Border Accent** (`oklch(0.4224 0.0013 265)`): Subtle border definition and edge treatments on elevated components.

## 3. Typography Rules

### Font Family
- **Primary:** APK Galeria, system-ui, sans-serif
- **Secondary (Code):** Berkeley Mono, Courier New, monospace

### Hierarchy

| Role | Font | Size | Weight | Line Height | Letter Spacing | Notes |
|------|------|------|--------|-------------|----------------|-------|
| Display / H1 | APK Galeria | `60px` | `500` | `60px` | `0px` | Hero headings, page titles, maximum emphasis |
| Heading / H2 | APK Galeria | `36px` | `500` | `40px` | `0px` | Section headers, major divisions |
| Subheading / H3 | APK Galeria | `20px` | `500` | `28px` | `0px` | Subsection titles, card headers |
| Body | APK Galeria | `18px` | `400` | `28px` | `0px` | Primary content text, descriptions |
| Body Small | APK Galeria | `16px` | `400` | `24px` | `0px` | Secondary content, supporting text |
| Link | APK Galeria | `14px` | `400` | `20px` | `0px` | Hyperlinks, light interactive text |
| Button | APK Galeria | `14px` | `500` | `20px` | `0px` | Button labels, compact UI text |
| Code | Berkeley Mono | `14px` | `400` | `21px` | `0px` | Code blocks, technical snippets |

### Principles
- **Clear hierarchy:** Font weight and size create distinct visual separation between content levels.
- **Readability first:** All body text maintains minimum `24px` line height for comfortable reading.
- **Emphasis via weight:** Hierarchy is primarily achieved through font weight (`400` vs `500`) rather than radical size shifts.
- **Mono for code:** Berkeley Mono is reserved exclusively for code blocks and technical content to maintain visual distinction.
- **Consistent alignment:** All type scales maintain `0px` letter spacing for modern, tight typography.

## 4. Component Stylings

### Buttons

#### Primary Button
- **Background:** `rgba(0, 0, 0, 0)` (transparent)
- **Text Color:** `oklch(1 0 0)` (white)
- **Font Size:** `14px`
- **Font Weight:** `500`
- **Font Family:** APK Galeria
- **Padding:** `0px 10px`
- **Height:** `36px`
- **Border Radius:** `8.8px`
- **Border:** `0px solid oklch(1 0 0)`
- **Box Shadow:** `rgba(255, 255, 255, 0.22) 0px 1px 0px 0px inset, rgba(0, 0, 0, 0.06) 0px 1px 1px -0.5px, rgba(0, 0, 0, 0.06) 0px 3px 3px -1.5px, rgba(0, 0, 0, 0.06) 0px 6px 6px -3px`
- **Line Height:** `20px`
- **Hover State:** Increase opacity to `0.9`, scale to `1.02`
- **Active State:** Decrease opacity to `0.8`, scale to `0.98`

#### Secondary Button (Text-only)
- **Background:** `rgba(0, 0, 0, 0)` (transparent)
- **Text Color:** `oklch(0.1881 0.006 265)` (dark gray)
- **Font Size:** `14px`
- **Font Weight:** `500`
- **Font Family:** APK Galeria
- **Padding:** `10px 16px`
- **Height:** `40px`
- **Border Radius:** `0px`
- **Border:** `0px solid oklch(0.1881 0.006 265)`
- **Box Shadow:** `none`
- **Line Height:** `20px`
- **Hover State:** Text color shifts to `oklch(0.5493 0.0081 265)` (medium gray)
- **Active State:** Text color shifts to `oklch(0.9764 0.0013 265)` (light gray)

#### Tertiary Button (Ghost)
- **Background:** `rgba(0, 0, 0, 0)` (transparent)
- **Text Color:** `oklch(0.5493 0.0081 265)` (medium gray)
- **Font Size:** `14px`
- **Font Weight:** `500`
- **Font Family:** APK Galeria
- **Padding:** `10px 16px`
- **Height:** `40px`
- **Border Radius:** `0px`
- **Border:** `0px solid oklch(0.5493 0.0081 265)`
- **Box Shadow:** `none`
- **Line Height:** `20px`
- **Hover State:** Text color becomes `oklch(1 0 0)` (white), background becomes `oklch(0.1881 0.006 265)`
- **Active State:** Opacity decreases to `0.7`

### Cards & Containers

#### Default Card
- **Background:** `oklch(1 0 0)` (white)
- **Text Color:** `oklch(0.1881 0.006 265)` (dark gray)
- **Font Size:** `16px`
- **Font Weight:** `400`
- **Font Family:** APK Galeria
- **Padding:** `24px`
- **Height:** `288px`
- **Width:** `364px`
- **Border Radius:** `13.2px`
- **Border:** `0px solid oklch(0.1881 0.006 265)`
- **Box Shadow:** `rgba(255, 255, 255, 0.06) 0px -0.5px 0px 0px, rgba(0, 0, 0, 0.06) 0px 4px 8px 0px, oklch(0.4224 0.0013 265 / 0.08) 0px 0px 0px 0.5px, rgb(0, 0, 0) 0px 1px 6px -4px`
- **Line Height:** `24px`
- **Hover State:** Increase shadow depth, subtle scale to `1.02`
- **Border Treatment:** Subtle border with `0.5px` stroke for definition

#### Feature Card
- **Background:** `oklch(1 0 0)` (white)
- **Text Color:** `oklch(0.1881 0.006 265)` (dark gray)
- **Font Size:** `16px`
- **Font Weight:** `400`
- **Font Family:** APK Galeria
- **Padding:** `24px`
- **Border Radius:** `13.2px`
- **Box Shadow:** `rgba(255, 255, 255, 0.06) 0px -0.5px 0px 0px, rgba(0, 0, 0, 0.06) 0px 4px 8px 0px, oklch(0.4224 0.0013 265 / 0.08) 0px 0px 0px 0.5px, rgb(0, 0, 0) 0px 1px 6px -4px`
- **Line Height:** `24px`

### Links

#### Text Link
- **Background:** `oklch(0.1881 0.006 265)` (dark gray)
- **Text Color:** `oklch(0.9764 0.0013 265)` (light gray)
- **Font Size:** `14px`
- **Font Weight:** `400`
- **Font Family:** APK Galeria
- **Padding:** `8px 16px`
- **Height:** `16px`
- **Border Radius:** `0px`
- **Border:** `0px solid oklch(0.9764 0.0013 265)`
- **Box Shadow:** `none`
- **Line Height:** `20px`
- **Hover State:** Underline appears, opacity increases to `1`
- **Active State:** Color shifts to `#1D9BF0`

#### Button Link (Primary Style)
- **Background:** `rgba(0, 0, 0, 0)` (transparent)
- **Text Color:** `oklch(1 0 0)` (white)
- **Font Size:** `14px`
- **Font Weight:** `500`
- **Font Family:** APK Galeria
- **Padding:** `0px 10px`
- **Height:** `36px`
- **Border Radius:** `8.8px`
- **Border:** `0px solid oklch(1 0 0)`
- **Box Shadow:** `rgba(255, 255, 255, 0.22) 0px 1px 0px 0px inset, rgba(0, 0, 0, 0.06) 0px 1px 1px -0.5px, rgba(0, 0, 0, 0.06) 0px 3px 3px -1.5px, rgba(0, 0, 0, 0.06) 0px 6px 6px -3px`
- **Line Height:** `20px`

### Navigation

#### Top Navigation Bar
- **Background:** `oklch(1 0 0)` (white)
- **Height:** `60px` (inferred)
- **Padding:** `16px 32px`
- **Border Bottom:** `1px solid oklch(0.9764 0.0013 265)` (light gray)
- **Box Shadow:** `rgba(0, 0, 0, 0.06) 0px 1px 2px 0px`
- **Display:** Flex, space-between alignment

#### Navigation Links
- **Font Size:** `14px`
- **Font Weight:** `500`
- **Font Family:** APK Galeria
- **Text Color:** `oklch(0.1881 0.006 265)` (dark gray)
- **Padding:** `8px 16px`
- **Hover State:** Text color shifts to `#1D9BF0`, background becomes `oklch(0.9764 0.0013 265)`
- **Active State:** Underline appears with `#1D9BF0`, font weight becomes `600`

## 5. Layout Principles

### Spacing System
- **Base Unit:** `4px`
- **Scale:** `4px`, `8px`, `12px`, `16px`, `24px`, `32px`, `96px`, `112px`
- **Gap Usage:** `4px`, `8px`, `12px` for component internals; `16px`, `24px` for sections
- **Padding:** `16px` for standard container padding; `24px` for cards and featured sections; `32px` for major layout sections
- **Margin:** `96px` for hero sections; `112px` for page-level margins and spacing

### Grid & Container
- **Max Width:** `1200px` (inferred from card widths and layout patterns)
- **Column Strategy:** 12-column flexible grid for responsive layouts
- **Container Padding:** `32px` left/right at full width
- **Section Patterns:** Hero (full bleed), Content (max-width with padding), Footer (full width)
- **Card Grid:** 3-column layout on desktop (364px cards with 16px gaps), responsive to single column on mobile

### Whitespace Philosophy
Motion Core employs generous whitespace to support visual hierarchy and reduce cognitive load. Content sections are separated by `96px` vertical spacing at full scale, with proportional reduction on smaller screens. Component internal padding uses `24px` for breathing room, while gap spacing between adjacent elements follows the `4px`–`32px` scale. This approach creates visual rhythm and emphasizes each component's importance within the composition.

### Border Radius Scale
- **Cards & Containers:** `13.2px` (rounded, soft appearance)
- **Buttons (Primary/Secondary):** `8.8px` (slightly rounded, interactive affordance)
- **Navigation & Tertiary Elements:** `0px` (sharp, minimal styling)
- **Inset Elements:** `0px` (for borders, lines, dividers)

## 6. Depth & Elevation

| Level | Treatment | Use |
|-------|-----------|-----|
| Flat (0) | No shadow, `0px` elevation | Text links, ghost buttons, tertiary UI elements |
| Subtle (1) | `rgba(255, 255, 255, 0.22) 0px 1px 0px 0px inset, rgba(0, 0, 0, 0.06) 0px 1px 1px -0.5px, rgba(0, 0, 0, 0.06) 0px 3px 3px -1.5px, rgba(0, 0, 0, 0.06) 0px 6px 6px -3px` | Primary buttons, active interactive states |
| Raised (2) | `rgba(255, 255, 255, 0.06) 0px -0.5px 0px 0px, rgba(0, 0, 0, 0.06) 0px 4px 8px 0px, oklch(0.4224 0.0013 265 / 0.08) 0px 0px 0px 0.5px, rgb(0, 0, 0) 0px 1px 6px -4px` | Cards, feature containers, elevated content |
| Inset (3) | `rgba(0, 0, 0, 0.06) 0px 1px 1px -0.5px inset, rgba(0, 0, 0, 0.06) 0px 3px 3px -1.5px inset, rgba(0, 0, 0, 0.06) 0px 6px 6px -3px inset, rgba(255, 255, 255, 0.06) 0px -0.5px 0px 0px inset, oklch(0.4224 0.0013 265 / 0.08) 0px 0px 0px 0.5px inset` | Pressed/active button states, form inputs |

**Elevation Philosophy:**
Motion Core uses subtle, layered shadow treatments to create depth without visual heaviness. Shadows are composed of multiple layers: an inset highlight (white with low opacity) for top-light rendering, soft diffuse shadows for depth, and a crisp outline for edge definition. This multi-layered approach creates refined depth that supports motion and interaction while maintaining clarity. Shadows are kept minimal and intentional, avoiding drop shadows in favor of sophisticated inset and edge treatments that enhance rather than obscure content.

## 7. Do's and Don'ts

### Do
- Use `#1D9BF0` for primary CTAs, hover states, and critical interactive elements
- Maintain the `4px` base unit for all spacing decisions to ensure visual consistency
- Apply card shadows consistently across all elevated containers for unified depth
- Use APK Galeria for all UI text; reserve Berkeley Mono exclusively for code
- Maintain button height at `36px` for primary actions and `40px` for secondary actions
- Apply `13.2px` border radius to cards and container shapes for soft, modern appearance
- Use `oklch()` color model for semantic color tokens to ensure consistency across light and dark contexts
- Include inset highlights on elevated elements to suggest light source and refine depth perception
- Keep text contrast ratios above 4.5:1 for accessibility compliance
- Test all interactive states (hover, active, focus) for visual feedback clarity

### Don't
- Avoid mixing color models; use `oklch()` consistently for all semantic colors and `#HEX` for direct accent references
- Don't apply shadows to every element; reserve shadowing for cards, elevated containers, and interactive states
- Avoid button radius beyond `8.8px`; maintain consistency with the established scale
- Don't use serif fonts for body text; APK Galeria is the exclusive primary typeface
- Avoid text sizes outside the defined hierarchy scale without explicit design rationale
- Don't apply opacity below `0.06` for shadows; maintain minimum shadow visibility
- Avoid padding below `16px` on primary containers; use minimum spacing for comfortable interaction
- Don't mix rounded and sharp corners within the same component family
- Avoid high-saturation accent colors beyond `#1D9BF0`; maintain focused color hierarchy
- Don't apply vertical padding below `20px` on button elements; maintain touch target minimums

## 8. Responsive Behavior

### Breakpoints

| Name | Width | Key Changes |
|------|-------|------------|
| Mobile | `320px` | Single-column layout, full-width cards, `16px` container padding, h1 `40px`, h2 `24px` |
| Tablet | `768px` | 2-column card grid, `24px` container padding, h1 `48px`, h2 `28px`, spacing scale reduced by 20% |
| Desktop | `1024px` | 3-column card grid, `32px` container padding, full hierarchy scale, `96px` section spacing |
| Large | `1400px` | Max-width `1200px` centered container, 4-column optional layouts, maximum spacing scale |

### Touch Targets
- **Minimum button height:** `44px` (mobile) / `36px` (desktop)
- **Minimum button width:** `44px` touch target
- **Minimum link padding:** `8px` on all sides for comfortable tapping
- **Minimum spacing between interactive elements:** `8px` (mobile) / `4px` (desktop)
- **Icon touch targets:** `40px × 40px` minimum
- **Navigation link touch area:** `44px` height minimum on mobile

### Collapsing Strategy
- **Cards:** Stack vertically on mobile (single column), expand to 2-column at tablet, 3-column at desktop
- **Navigation:** Collapse to hamburger menu on mobile (`< 768px`), reveal full horizontal nav at desktop
- **Typography:** Reduce h1 from `60px` (desktop) to `40px` (mobile); h2 from `36px` to `24px`; body remains `16px` minimum for readability
- **Spacing:** Reduce `96px` section gaps to `64px` on tablet, `48px` on mobile
- **Padding:** Container padding scales from `16px` (mobile) to `32px` (desktop)
- **Hero section:** Full-bleed background image on desktop, constrained width on mobile with adjusted text sizing
- **Features grid:** Reflow from horizontal to vertical stacking below `768px`

## 9. Agent Prompt Guide

### Quick Color Reference
- **Primary CTA:** Accent Blue (`#1D9BF0`)
- **Button Text (Primary):** White (`oklch(1 0 0)`)
- **Body Text:** Dark Gray (`oklch(0.1881 0.006 265)`)
- **Secondary Text:** Medium Gray (`oklch(0.5493 0.0081 265)`)
- **Card Background:** White (`oklch(1 0 0)`)
- **Card Border:** Border Accent (`oklch(0.4224 0.0013 265)`)
- **Button Shadow:** `rgba(255, 255, 255, 0.22) 0px 1px 0px 0px inset, rgba(0, 0, 0, 0.06) 0px 1px 1px -0.5px, rgba(0, 0, 0, 0.06) 0px 3px 3px -1.5px, rgba(0, 0, 0, 0.06) 0px 6px 6px -3px`
- **Card Shadow:** `rgba(255, 255, 255, 0.06) 0px -0.5px 0px 0px, rgba(0, 0, 0, 0.06) 0px 4px 8px 0px, oklch(0.4224 0.0013 265 / 0.08) 0px 0px 0px 0.5px, rgb(0, 0, 0) 0px 1px 6px -4px`

### Iteration Guide

1. **Always use `4px` as the base spacing unit.** All padding, margin, and gap values must align to this scale (`4px`, `8px`, `12px`, `16px`, `24px`, `32px`, `96px`, `112px`).

2. **Typography hierarchy is strict: h1 `60px`, h2 `36px`, h3 `20px`, body `18px`, small `16px`, button `14px`.** Never deviate without explicit design change.

3. **Button styling requires consistent shadow treatment:** Primary buttons use inset highlight + diffuse shadow. Tertiary buttons remain flat with `box-shadow: none`.

4. **Card border radius is `13.2px`; button radius is `8.8px`.** All other sharp UI elements use `0px` radius.

5. **Apply `#1D9BF0` accent color exclusively to primary CTAs, links, and hover states.** Do not introduce secondary accent colors.

6. **All cards receive the same shadow stack:** `rgba(255, 255, 255, 0.06) 0px -0.5px 0px 0px, rgba(0, 0, 0, 0.06) 0px 4px 8px 0px, oklch(0.4224 0.0013 265 / 0.08) 0px 0px 0px 0.5px, rgb(0, 0, 0) 0px 1px 6px -4px`.

7. **Navigation and tertiary buttons use text-only styling** with `background: rgba(0, 0, 0, 0)` and no shadow; interactive state is text color shift from `oklch(0.1881 0.006 265)` to `oklch(0.5493 0.0081 265)`.

8. **All text must use APK Galeria except code blocks** (Berkeley Mono `14px` line-height `21px`).

9. **Responsive breakpoints are `320px` (mobile), `768px` (tablet), `1024px` (desktop).** Adjust spacing and typography sizing at each breakpoint per the Responsive Behavior section.

10. **Maintain minimum touch targets of `44px × 44px` on mobile; desktop interactive elements can reduce to `36px` height.**
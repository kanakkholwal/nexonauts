<script lang="ts" module>
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from "svelte/elements";
	import { type VariantProps, tv } from "tailwind-variants";

	/**
	 * Button — Nexonauts editorial pill.
	 *
	 * Primary CTA per DESIGN.md is the warm near-black ink pill; everything
	 * else is structural (outline/ghost/link/destructive) or atmospheric
	 * (soft pastel / glass) for use inside hero bands and gradient-orb cards.
	 *
	 * Defaults:
	 *   - variant: "default" (ink pill)
	 *   - size:    "default" (40px tall, pill geometry)
	 *
	 * Extra variants exist beyond DESIGN.md spec so the rest of the codebase
	 * can keep its call sites without losing semantics.
	 */
	export const buttonVariants = tv({
		base: [
			"group/button inline-flex shrink-0 items-center justify-center whitespace-nowrap",
			"font-sans text-sm font-medium tracking-[0.01em]",
			"border border-transparent bg-clip-padding",
			"transition-all duration-150 ease-out outline-none select-none",
			"focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
			"active:not-aria-[haspopup]:translate-y-px",
			"disabled:pointer-events-none disabled:opacity-50",
			"aria-invalid:ring-2 aria-invalid:ring-destructive/30",
			"[&_svg]:pointer-events-none [&_svg]:shrink-0",
			"[&_svg:not([class*='size-'])]:size-4",
		].join(" "),
		variants: {
			variant: {
				// Editorial ink pill — the single CTA per DESIGN.md.
				default:
					"bg-primary text-primary-foreground hover:bg-primary-active active:bg-primary-active",
				// Transparent pill with ink hairline — DESIGN.md button-outline.
				outline:
					"border-hairline-strong bg-transparent text-ink hover:bg-surface-strong/60 aria-expanded:bg-surface-strong",
				// Neutral surface — for secondary actions inside cards.
				secondary:
					"bg-surface-strong text-ink hover:bg-hairline aria-expanded:bg-hairline",
				// Faint ghost — nav/icon triggers.
				ghost:
					"bg-transparent text-ink hover:bg-surface-strong/70 aria-expanded:bg-surface-strong",
				// Tertiary text link — DESIGN.md button-tertiary-text.
				link: "bg-transparent text-ink underline-offset-4 hover:underline",
				// Destructive — soft red tint, not a hard fill.
				destructive:
					"bg-destructive/10 text-destructive hover:bg-destructive/15 focus-visible:ring-destructive/30 dark:bg-destructive/20 dark:text-destructive-foreground",
				// Destructive — strong fill (rare; confirm dialogs).
				"destructive-solid":
					"bg-destructive text-destructive-foreground hover:opacity-90",
				// Success — soft tint.
				success:
					"bg-success/12 text-success hover:bg-success/20 focus-visible:ring-success/30",
				// Warning — soft tint.
				warning:
					"bg-warning/12 text-warning hover:bg-warning/20 focus-visible:ring-warning/30",
				// Glass — for dark-hero overlays. Translucent white with hairline.
				glass:
					"bg-white/10 text-on-dark border-white/15 backdrop-blur-md hover:bg-white/15",
				// Inverted glass for light-canvas hero use.
				"glass-ink":
					"bg-ink/5 text-ink border-hairline backdrop-blur-md hover:bg-ink/10",
				// Atmospheric soft pills — one per gradient stop. Decoration-friendly.
				soft:
					"bg-surface-strong text-ink hover:bg-hairline",
				"soft-mint":
					"bg-gradient-mint/30 text-ink hover:bg-gradient-mint/45",
				"soft-peach":
					"bg-gradient-peach/30 text-ink hover:bg-gradient-peach/45",
				"soft-lavender":
					"bg-gradient-lavender/35 text-ink hover:bg-gradient-lavender/50",
				"soft-sky":
					"bg-gradient-sky/30 text-ink hover:bg-gradient-sky/45",
				"soft-rose":
					"bg-gradient-rose/30 text-ink hover:bg-gradient-rose/45",
				// Light-on-dark pill for use inside surface-dark/hero bands.
				"on-dark":
					"bg-on-dark text-ink hover:bg-on-dark/90",
			},
			size: {
				default: "h-10 gap-1.5 px-5 rounded-pill has-data-[icon=inline-end]:pr-4 has-data-[icon=inline-start]:pl-4",
				xs: "h-7 gap-1 px-2.5 text-xs rounded-pill in-data-[slot=button-group]:rounded-md has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 [&_svg:not([class*='size-'])]:size-3",
				sm: "h-8 gap-1.5 px-3.5 text-[0.8125rem] rounded-pill in-data-[slot=button-group]:rounded-md has-data-[icon=inline-end]:pr-2.5 has-data-[icon=inline-start]:pl-2.5 [&_svg:not([class*='size-'])]:size-3.5",
				md: "h-9 gap-1.5 px-4 rounded-pill has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3",
				lg: "h-11 gap-2 px-6 text-[0.9375rem] rounded-pill has-data-[icon=inline-end]:pr-5 has-data-[icon=inline-start]:pl-5",
				xl: "h-12 gap-2 px-7 text-base rounded-pill has-data-[icon=inline-end]:pr-6 has-data-[icon=inline-start]:pl-6",
				icon: "size-10 rounded-pill",
				"icon-xs": "size-7 rounded-pill in-data-[slot=button-group]:rounded-md [&_svg:not([class*='size-'])]:size-3",
				"icon-sm": "size-8 rounded-pill in-data-[slot=button-group]:rounded-md",
				"icon-lg": "size-11 rounded-pill",
				"icon-xl": "size-12 rounded-pill",
				// Square (non-pill) icon — for chrome inside dense toolbars.
				"icon-square": "size-8 rounded-md",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	});

	export type ButtonVariant = VariantProps<typeof buttonVariants>["variant"];
	export type ButtonSize = VariantProps<typeof buttonVariants>["size"];

	export type ButtonProps = WithElementRef<HTMLButtonAttributes> &
		WithElementRef<HTMLAnchorAttributes> & {
			variant?: ButtonVariant;
			size?: ButtonSize;
		};
</script>

<script lang="ts">
	let {
		class: className,
		variant = "default",
		size = "default",
		ref = $bindable(null),
		href = undefined,
		type = "button",
		disabled,
		children,
		...restProps
	}: ButtonProps = $props();
</script>

{#if href}
	<a
		bind:this={ref}
		data-slot="button"
		class={cn(buttonVariants({ variant, size }), className)}
		href={disabled ? undefined : href}
		aria-disabled={disabled}
		role={disabled ? "link" : undefined}
		tabindex={disabled ? -1 : undefined}
		{...restProps}
	>
		{@render children?.()}
	</a>
{:else}
	<button
		bind:this={ref}
		data-slot="button"
		class={cn(buttonVariants({ variant, size }), className)}
		{type}
		{disabled}
		{...restProps}
	>
		{@render children?.()}
	</button>
{/if}

<script lang="ts" module>
import type { HTMLAnchorAttributes, HTMLButtonAttributes } from "svelte/elements";
import type { VariantProps } from "tailwind-variants";
import { cn, tv, type WithElementRef } from "$lib/utils.js";

/**
 * Button. See DESIGN.md §Components.
 *
 * Marketing CTAs use `variant="dark"` — the near-black fill. `--primary` is
 * reserved for links, focus and active state, so a blue button only appears
 * inside product chrome. Blue highlights, black commits.
 */
export const buttonVariants = tv({
	base: [
		"group/button inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap",
		"font-sans font-medium select-none",
		"border border-border/40 bg-clip-padding outline-none",
		"ease-fluid transition-all duration-200 motion-reduce:transition-none",
		// Full strength, not /50. A 50% ring composites to 1.70:1 on white, which
		// is not a focus indicator. At full strength it measures 5.76:1 light and
		// 7.29:1 dark, so 2px is enough and 3px would only shout.
		"focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring",
		"aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive",
		"active:scale-[0.99]",
		"disabled:pointer-events-none disabled:opacity-50",
		"[&_svg]:pointer-events-none [&_svg]:shrink-0",
		"[&_svg:not([class*='size-'])]:size-4"
	].join(" "),
	variants: {
		variant: {
			// Accent fill. Product chrome only, never a marketing CTA.
			default:
				"border-transparent bg-primary text-primary-foreground shadow-craft-sm hover:bg-primary/95",
			// The commit action everywhere on the marketing surface.
			dark: "border-transparent bg-foreground text-background shadow-craft-sm hover:bg-foreground/90",
			// A button's border is the only thing identifying it, so it takes
			// --border-control (3.64:1) rather than the decorative hairline, which
			// measures 1.26:1 on white and would leave the control invisible.
			outline: "border-border-control bg-card text-foreground hover:border-foreground",
			// Neutral surface for secondary actions inside a card. It carries the
			// control border too: a paper fill on a paper band measures 1.00:1, so
			// without an edge the button is literally invisible there.
			secondary:
				"border-border-control bg-input-surface text-foreground hover:bg-border-low aria-expanded:bg-border-low",
			// Nav and icon triggers.
			ghost:
				"border-transparent bg-transparent text-muted-foreground hover:bg-paper hover:text-foreground aria-expanded:bg-paper",
			// Inline text action. The only variant that carries the accent as text.
			link: "border-transparent bg-transparent text-primary underline-offset-4 hover:underline",
			// Confirmations only. Hover flips to the solid fill rather than tinting
			// the background: a 10% tint drops the label to 3.49:1 light and 3.68:1
			// dark, while the flip holds 5.18:1 and 5.23:1.
			destructive:
				"border-destructive bg-transparent text-destructive hover:bg-destructive hover:text-destructive-foreground focus-visible:border-destructive focus-visible:ring-destructive"
		},
		size: {
			default: "h-9 rounded-lg px-5 py-2.5 text-body-sm",
			xs: "h-7 gap-1.5 rounded-md px-2.5 text-xs [&_svg:not([class*='size-'])]:size-3",
			sm: "h-8 gap-1.5 rounded-md px-3 text-xs [&_svg:not([class*='size-'])]:size-3.5",
			md: "h-9 rounded-lg px-5 text-body-sm",
			lg: "h-11 rounded-xl px-8 text-body",
			icon: "size-9 rounded-lg",
			"icon-sm": "size-8 rounded-md",
			// Landing-page CTAs.
			cta: "h-11 rounded-xl px-8 text-body",
			"cta-sm": "h-8 gap-1.5 rounded-md px-3 text-xs [&_svg:not([class*='size-'])]:size-3.5"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
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

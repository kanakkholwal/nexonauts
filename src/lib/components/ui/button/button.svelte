<script lang="ts" module>
import type { HTMLAnchorAttributes, HTMLButtonAttributes } from "svelte/elements";
import type { VariantProps } from "tailwind-variants";
import { cn, tv, type WithElementRef } from "$lib/utils.js";

/** Button. See .notes/DESIGN.md. Violet highlights, black commits: `default` is
 *  the near-black commit action, `primary` the one brand action per view. */
export const buttonVariants = tv({
	base: [
		"group/button inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap",
		"font-sans font-medium select-none border border-transparent bg-clip-padding outline-none",
		"ease-craft transition-colors duration-200 motion-reduce:transition-none",
		// Full strength, not /50: a 50% ring composites to 2.64:1 on white, under
		// the 3:1 floor. At full strength it is 5.87:1 light and 8.20:1 dark.
		"focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
		"aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive",
		"active:scale-[0.98] motion-reduce:active:scale-100",
		"disabled:pointer-events-none disabled:opacity-50",
		"[&_svg]:pointer-events-none [&_svg]:shrink-0",
		"[&_svg:not([class*='size-'])]:size-4"
	].join(" "),
	variants: {
		variant: {
			// The commit action. Near-black, flipping to near-white in dark.
			default: "bg-action text-action-foreground shadow-xs hover:bg-action/90",
			// Accent fill. The page's brand action, at most one per view.
			primary: "bg-primary text-primary-foreground shadow-xs hover:bg-primary-active",
			// A button's edge is the only thing identifying it, so it takes
			// --border-control (3.64:1), not the 1.26:1 decorative hairline.
			outline: "border-border-control bg-card text-foreground hover:bg-muted",
			ghost:
				"bg-transparent text-muted-foreground hover:bg-muted hover:text-foreground aria-expanded:bg-muted",
			// Violet edge and violet ink, no fill. A highlight action, never a commit.
			// Full-strength border because an edge is a control boundary at 3:1.
			accent: "border-primary bg-transparent text-primary hover:bg-primary/10",
			// Fixed in both themes, for use on a brand panel.
			ink: "bg-fixed-dark text-fixed-light shadow-xs hover:bg-fixed-dark/90",
			light: "bg-fixed-light text-fixed-dark shadow-xs hover:bg-fixed-light/90",
			// Confirmations only.
			destructive:
				"bg-destructive text-destructive-foreground shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive",
			// --- Legacy aliases. Kept so unmigrated call sites keep working. ---
			dark: "bg-action text-action-foreground shadow-xs hover:bg-action/90",
			brand: "bg-primary text-primary-foreground shadow-xs hover:bg-primary-active",
			secondary: "border-border-control bg-card text-foreground hover:bg-muted",
			link: "bg-transparent text-primary underline-offset-4 hover:underline"
		},
		size: {
			// 40 / 36 / 28. Controls that sit together share one height.
			default: "h-10 rounded-md px-4 text-body-sm",
			sm: "h-9 gap-1.5 rounded-md px-3 text-body-sm [&_svg:not([class*='size-'])]:size-3.5",
			// Dense chips only, never a primary touch target.
			xs: "h-7 gap-1.5 rounded-sm px-2.5 text-caption [&_svg:not([class*='size-'])]:size-3",
			lg: "h-11 rounded-xl px-8 text-body",
			icon: "size-10 rounded-md",
			"icon-sm": "size-9 rounded-md [&_svg:not([class*='size-'])]:size-3.5",
			"icon-xs": "size-7 rounded-sm [&_svg:not([class*='size-'])]:size-3",
			// --- Legacy aliases. ---
			md: "h-10 rounded-md px-4 text-body-sm",
			cta: "h-11 rounded-xl px-8 text-body",
			"cta-sm": "h-9 gap-1.5 rounded-md px-3 text-body-sm [&_svg:not([class*='size-'])]:size-3.5"
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

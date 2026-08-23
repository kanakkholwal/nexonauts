<script lang="ts" module>
import { tv, type VariantProps } from "tailwind-variants";

/**
 * Badge — sentence-case pill on a neutral surface. See DESIGN.md §Typography.
 * Uppercase letter-spaced micro-labels are retired; at 11px they cost
 * legibility and read as a tic when repeated down a page.
 */
export const badgeVariants = tv({
	base: [
		"group/badge inline-flex w-fit shrink-0 items-center justify-center gap-1 whitespace-nowrap",
		"font-sans font-medium",
		"border border-transparent",
		"transition-colors outline-none",
		"focus-visible:ring-2 focus-visible:ring-ring/30",
		"aria-invalid:ring-2 aria-invalid:ring-destructive/30",
		"[&>svg]:size-3 [&>svg]:pointer-events-none",
		"has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2"
	].join(" "),
	variants: {
		variant: {
			// Neutral paper pill. The default everywhere.
			default: "bg-paper text-foreground [a]:hover:bg-border-low",
			// Solid ink — the rare attention-grabber. Matches the filled button.
			solid: "bg-foreground text-background [a]:hover:bg-foreground/90",
			// Outline — transparent with a visible control boundary.
			outline: "border-border-control bg-transparent text-foreground [a]:hover:bg-paper",
			// Secondary alias of default for shadcn parity.
			secondary: "bg-paper text-foreground [a]:hover:bg-border-low",
			// Ghost — invisible until hover.
			ghost: "bg-transparent text-muted-foreground [a]:hover:bg-paper [a]:hover:text-foreground",
			// Link-styled badge.
			link: "bg-transparent text-primary underline-offset-2 hover:underline",

			// Semantic — soft tinted (default) and solid.
			destructive: "bg-destructive/12 text-destructive",
			"destructive-solid": "bg-destructive text-destructive-foreground",
			success: "bg-success/12 text-success",
			"success-solid": "bg-success text-success-foreground",
			warning: "bg-warning/12 text-warning",
			"warning-solid": "bg-warning text-warning-foreground",
			info: "bg-info/12 text-info",
			"info-solid": "bg-info text-info-foreground",

			// Dot-style: subtle bg with leading dot — see badge-dot.svelte.
			dot: "bg-paper text-foreground"
		},
		size: {
			xs: "h-5 rounded-pill px-1.5 text-caption",
			sm: "h-5 rounded-pill px-2 text-caption",
			default: "h-6 rounded-pill px-2.5 text-caption",
			md: "h-6 rounded-pill px-2.5 text-caption",
			lg: "h-7 rounded-pill px-3 text-body-sm"
		},
		shape: {
			pill: "rounded-pill",
			square: "rounded-md normal-case tracking-normal"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default",
		shape: "pill"
	}
});

export type BadgeVariant = VariantProps<typeof badgeVariants>["variant"];
export type BadgeSize = VariantProps<typeof badgeVariants>["size"];
export type BadgeShape = VariantProps<typeof badgeVariants>["shape"];
</script>

<script lang="ts">
	import type { HTMLAnchorAttributes } from "svelte/elements";
	import { cn, type WithElementRef } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		href,
		class: className,
		variant = "default",
		size = "default",
		shape = "pill",
		children,
		...restProps
	}: WithElementRef<HTMLAnchorAttributes> & {
		variant?: BadgeVariant;
		size?: BadgeSize;
		shape?: BadgeShape;
	} = $props();
</script>

<svelte:element
	this={href ? "a" : "span"}
	bind:this={ref}
	data-slot="badge"
	{href}
	class={cn(badgeVariants({ variant, size, shape }), className)}
	{...restProps}
>
	{@render children?.()}
</svelte:element>

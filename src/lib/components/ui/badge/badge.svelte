<script lang="ts" module>
	import { type VariantProps, tv } from "tailwind-variants";

	/**
	 * Badge — Nexonauts editorial pill.
	 *
	 * The brand badge is a small uppercase pill on a neutral surface (DESIGN.md
	 * §6 `badge-pill`). We expose a generous set of soft pastel variants —
	 * mint / peach / lavender / sky / rose — for category tags, status
	 * indicators, and the rare topical accent.
	 *
	 * Atmospheric soft tints stay non-saturated; they are the only place
	 * pastel orbs touch text, and even then very lightly.
	 */
	export const badgeVariants = tv({
		base: [
			"group/badge inline-flex w-fit shrink-0 items-center justify-center gap-1 whitespace-nowrap",
			"font-sans font-medium uppercase tracking-[0.08em]",
			"border border-transparent",
			"transition-colors outline-none",
			"focus-visible:ring-2 focus-visible:ring-ring/30",
			"aria-invalid:ring-2 aria-invalid:ring-destructive/30",
			"[&>svg]:size-3 [&>svg]:pointer-events-none",
			"has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
		].join(" "),
		variants: {
			variant: {
				// Editorial DEFAULT — neutral surface-strong pill with ink text.
				default: "bg-surface-strong text-ink [a]:hover:bg-hairline",
				// Solid ink — the rare attention-grabber. Matches button-primary.
				solid: "bg-primary text-primary-foreground [a]:hover:bg-primary-active",
				// Outline — transparent with hairline border.
				outline: "border-hairline-strong bg-transparent text-ink [a]:hover:bg-surface-strong/60",
				// Secondary alias of default for shadcn parity.
				secondary: "bg-surface-strong text-body-strong [a]:hover:bg-hairline",
				// Ghost — invisible until hover.
				ghost: "bg-transparent text-muted-ink [a]:hover:bg-surface-strong [a]:hover:text-ink",
				// Link-styled badge.
				link: "bg-transparent text-ink underline-offset-2 hover:underline",

				// Atmospheric soft tints — pure decoration, very low chroma.
				"soft-mint":     "bg-gradient-mint/30 text-ink",
				"soft-peach":    "bg-gradient-peach/35 text-ink",
				"soft-lavender": "bg-gradient-lavender/35 text-ink",
				"soft-sky":      "bg-gradient-sky/30 text-ink",
				"soft-rose":     "bg-gradient-rose/30 text-ink",

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
				dot: "bg-surface-strong text-body-strong",

				// Light-on-dark — for dark hero contexts.
				"on-dark": "bg-white/10 text-on-dark border-white/15",
			},
			size: {
				xs: "h-4 px-1.5 text-[10px] rounded-pill",
				sm: "h-5 px-2 text-[11px] rounded-pill",
				default: "h-5 px-2.5 py-0.5 text-[11px] rounded-pill",
				md: "h-6 px-2.5 text-xs rounded-pill",
				lg: "h-7 px-3 text-xs rounded-pill",
			},
			shape: {
				pill: "rounded-pill",
				square: "rounded-md normal-case tracking-normal",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
			shape: "pill",
		},
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

<script lang="ts">
import IconChevronRight from "@tabler/icons-svelte/icons/chevron-right";
import { Button } from "$lib/components/ui/button";
import { NotchedShelf } from "$lib/components/ui/notched-shelf";
import type { Product } from "$lib/data/products";
import { cn } from "$lib/utils";
import ProductArt from "./product-art.svelte";
import Stage from "./stage.svelte";

type Props = { product: Product & { href: string }; index: number; flip?: boolean };
let { product, index, flip = false }: Props = $props();

// Chapters alternate surface edge to edge, so the seam between two of them is what notches.
// Chapter one is untinted because the tinted hero sits above it, and a notch needs two surfaces.
const tinted = $derived(index % 2 === 1);
const ordinal = $derived(String(index + 1).padStart(2, "0"));
const label = $derived(`${ordinal} · ${product.name}`);
</script>

<section
	id="row-{product.slug}"
	aria-labelledby="row-{product.slug}-title"
	class={cn(
		"relative isolate flex min-h-[90dvh] scroll-mt-0 flex-col justify-center overflow-clip",
		tinted ? "bg-muted" : "bg-background"
	)}
	data-motion="row"
	data-row={index}
>
	<!-- The seam carries the chapter number, filled with the surface it is arriving from. -->
	<div class="pointer-events-none absolute inset-x-0 top-0 hidden md:block" data-motion="row-seam">
		<NotchedShelf fill={tinted ? "text-background" : "text-muted"} align={flip ? "end" : "start"}>
			<p
				class="px-5 font-mono text-caption tracking-wider whitespace-nowrap text-muted-foreground uppercase"
			>
				{label}
			</p>
		</NotchedShelf>
	</div>

	<!-- The chapter number at band scale, so a full screen has something holding its corners. -->
	<span
		class={cn("ghost", flip ? "right-[2vw]" : "left-[2vw]")}
		data-motion="row-ghost"
		aria-hidden="true">{ordinal}</span
	>

	<!-- Order alone would hand the stage the narrow column on a flipped chapter, so the
	     track sizes swap with it and the drawing keeps the wide side either way. -->
	<div
		class={cn(
			"mx-auto grid w-full max-w-page items-center gap-10 px-5 py-20 sm:px-10 md:gap-16 md:py-24 lg:px-14",
			flip
				? "md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]"
				: "md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]"
		)}
	>
		<div class={cn("min-w-0", flip && "md:order-2")} data-motion="row-copy">
			<p class="font-mono text-caption tracking-wider text-muted-foreground uppercase md:hidden">
				{label}
			</p>
			<h2
				id="row-{product.slug}-title"
				class="mt-2 text-heading-lg font-medium text-balance md:mt-0 lg:text-display"
				style:view-transition-name="product-{product.slug}"
			>
				{product.category}
				<span class="text-muted-foreground">{product.qualifier}</span>
			</h2>
			<p class="mt-4 max-w-[44ch] text-body-lg text-pretty text-muted-foreground">{product.line}</p>
			<p class="mt-6 font-mono text-caption tracking-wider text-muted-foreground uppercase">
				{product.runs} &middot; {product.status}
			</p>
			<div class="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
				<Button href={product.href} target="_blank" rel="noopener noreferrer" size="lg">
					{product.actionLabel ?? `Open ${product.name}`}
				</Button>
				{#if product.repo}
					<a
						href={product.repo}
						target="_blank"
						rel="noopener noreferrer"
						class="inline-flex h-11 items-center justify-center gap-1 rounded-md text-body-sm font-medium text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
					>
						Repository
						<IconChevronRight class="size-4" aria-hidden="true" />
					</a>
				{/if}
			</div>
		</div>

		<!-- The frame always takes the surface the band is not, so it reads on either chapter. -->
		<div class={cn("min-w-0 max-md:order-first", flip && "md:order-1")} data-motion="row-stage">
			<Stage class={cn(tinted ? "bg-card" : "bg-muted")}>
				<div
					class="absolute inset-0 grid place-items-center p-[4%]"
					style={tinted ? undefined : "--art-surface: var(--muted)"}
					data-motion="row-art"
				>
					<ProductArt slug={product.slug} title="What {product.name} does, drawn" />
				</div>
			</Stage>
		</div>
	</div>
</section>

<style>
	.ghost {
		position: absolute;
		bottom: -0.22em;
		z-index: -1;
		font-family: var(--font-heading);
		font-size: clamp(9rem, 26vw, 22rem);
		font-weight: 500;
		line-height: 1;
		color: color-mix(in srgb, var(--foreground) 5%, transparent);
		user-select: none;
	}
</style>

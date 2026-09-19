<script lang="ts">
import IconChevronRight from "@tabler/icons-svelte/icons/chevron-right";
import { Button } from "$lib/components/ui/button";
import type { Product } from "$lib/data/products";
import { cn } from "$lib/utils";
import ProductArt from "./product-art.svelte";
import Stage from "./stage.svelte";

type Props = { product: Product & { href: string }; flip?: boolean };
let { product, flip = false }: Props = $props();
</script>

<section
	id="row-{product.slug}"
	aria-labelledby="row-{product.slug}-title"
	class="grid scroll-mt-24 items-center gap-5 border-t border-border py-10 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-12 md:py-18"
	data-motion="row"
>
	<div class={cn("min-w-0", flip && "md:order-2")} data-motion="row-copy">
		<p class="font-mono text-caption tracking-wider text-muted-foreground uppercase">
			{product.name}
		</p>
		<h2
			id="row-{product.slug}-title"
			class="mt-2 text-heading-lg font-medium text-balance lg:text-display"
			style:view-transition-name="product-{product.slug}"
		>
			{product.category}
			<span class="text-muted-foreground">{product.qualifier}</span>
		</h2>
		<p class="mt-3 max-w-[44ch] text-body-lg text-pretty text-muted-foreground">{product.line}</p>
		<p class="mt-5 font-mono text-caption tracking-wider text-muted-foreground uppercase">
			{product.runs} &middot; {product.status}
		</p>
		<div class="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
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

	<div class={cn("min-w-0 max-md:order-first", flip && "md:order-1")} data-motion="row-stage">
		<Stage>
			<div class="absolute inset-0 grid place-items-center p-[8%]" data-motion="row-art">
				<ProductArt slug={product.slug} title="What {product.name} does, drawn" />
			</div>
		</Stage>
	</div>
</section>

<script lang="ts">
	import { Badge } from "$lib/components/ui/badge";
	import ArrowUpRight from "@lucide/svelte/icons/arrow-up-right";
	import type { MarketplaceProduct } from "$lib/server/marketplace";
	import { decodeHTMLEntities } from "src/utils/string";

	let { product, class: className = "" }: { product: MarketplaceProduct; class?: string } = $props();

	const displayPrice = $derived(product.price ? `$${product.price}` : "Free");
</script>

<a
	href={`/marketplace/products/${product.slug}`}
	class={`group flex w-full flex-col gap-3 rounded-xl transition-all duration-300 ${className}`}
>
	<div
		class="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-border/40 bg-muted shadow-sm transition-all duration-500 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5"
	>
		<img
			src={product.preview_url}
			alt={decodeHTMLEntities(product.name)}
			class="h-full w-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
		/>

		<div class="absolute top-3 right-3 z-10">
			<Badge
				variant="secondary"
				class={product.price ? "bg-white/90 text-black dark:bg-black/80 dark:text-white" : "bg-emerald-500/90 text-white"}
			>
				{displayPrice}
			</Badge>
		</div>
	</div>

	<div class="space-y-1">
		<div class="flex items-start justify-between gap-2">
			<h3 class="line-clamp-1 text-base leading-tight font-semibold transition-colors group-hover:text-primary">
				{decodeHTMLEntities(product.name)}
			</h3>
			<ArrowUpRight
				class="h-4 w-4 -translate-x-2 text-muted-foreground opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
			/>
		</div>

		{#if product.categories?.length}
			<p class="text-xs text-muted-foreground">{product.categories[0]}</p>
		{/if}
	</div>
</a>

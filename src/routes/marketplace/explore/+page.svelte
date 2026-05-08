<script lang="ts">
	import ProductCard from "$lib/components/marketplace/product-card.svelte";
	import { Badge } from "$lib/components/ui/badge";
	import { Button } from "$lib/components/ui/button";
	import Search from "@lucide/svelte/icons/search";
	import Sparkles from "@lucide/svelte/icons/sparkles";
	import X from "@lucide/svelte/icons/x";

	let { data } = $props();

	const hasActiveFilters = $derived(
		Boolean(data.filters.category || data.filters.tags || data.filters.price || data.filters.query)
	);

	const priceOptions = ["free", "paid", "under-20", "premium"];

	function buildHref(next: Record<string, string>) {
		const params = new URLSearchParams();
		for (const [key, value] of Object.entries({
			query: data.filters.query,
			category: data.filters.category,
			tags: data.filters.tags,
			price: data.filters.price,
			...next
		})) {
			if (value) params.set(key, value);
		}
		const query = params.toString();
		return query ? `/marketplace/explore?${query}` : "/marketplace/explore";
	}
</script>

<div class="min-h-screen bg-background selection:text-primary">
	<div class="pointer-events-none fixed inset-0 z-0">
		<div
			class="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px]"
		></div>
		<div class="absolute top-0 right-0 h-[600px] w-[600px] rounded-full bg-primary/5 blur-[150px]"></div>
	</div>

	<div class="relative z-10 mx-auto w-full max-w-[1600px] px-4 pt-24 pb-20 md:px-6 lg:px-8">
		<div class="mb-10">
			<div class="mb-6 flex items-center justify-between">
				<div>
					<h1 class="mb-2 text-3xl font-bold tracking-tight md:text-4xl">Explore Assets</h1>
					<p class="text-sm text-muted-foreground">{data.products.length} premium digital assets</p>
				</div>
			</div>

			<form action="/marketplace/explore" method="GET" class="relative max-w-2xl">
				<div class="pointer-events-none absolute inset-y-0 left-4 flex items-center">
					<Search class="h-4 w-4 text-muted-foreground" />
				</div>
				<input
					type="text"
					name="query"
					value={data.filters.query}
					placeholder="Search products"
					class="h-12 w-full rounded-full border border-border/50 bg-card/70 pr-4 pl-12 outline-none backdrop-blur-sm"
				/>
				<input type="hidden" name="category" value={data.filters.category} />
				<input type="hidden" name="tags" value={data.filters.tags} />
				<input type="hidden" name="price" value={data.filters.price} />
			</form>

			{#if hasActiveFilters}
				<div class="mt-4 flex flex-wrap items-center gap-2">
					<span class="text-xs font-medium text-muted-foreground">Active:</span>
					{#if data.filters.category}
						<a href={buildHref({ category: "" })} class="inline-flex">
							<Badge class="gap-1.5 bg-primary/10 text-primary">
								{data.filters.category}
								<X class="h-3 w-3" />
							</Badge>
						</a>
					{/if}
					{#if data.filters.price}
						<a href={buildHref({ price: "" })} class="inline-flex">
							<Badge class="gap-1.5 bg-primary/10 text-primary">
								{data.filters.price}
								<X class="h-3 w-3" />
							</Badge>
						</a>
					{/if}
					{#if data.filters.tags}
						<a href={buildHref({ tags: "" })} class="inline-flex">
							<Badge class="gap-1.5 bg-primary/10 text-primary">
								Tags
								<X class="h-3 w-3" />
							</Badge>
						</a>
					{/if}
					<a href="/marketplace/explore" class="text-xs text-muted-foreground underline underline-offset-2">
						Clear all
					</a>
				</div>
			{/if}
		</div>

		<div class="grid grid-cols-1 gap-8 lg:grid-cols-12">
			<aside class="hidden lg:col-span-3 lg:block lg:space-y-6">
				<div class="rounded-xl border border-border/50 bg-card/50 p-4 backdrop-blur-sm">
					<h3 class="mb-4 text-sm font-semibold">Categories</h3>
					<div class="flex flex-wrap gap-2">
						{#each data.categories as categoryName (categoryName)}
							<a href={buildHref({ category: categoryName })}>
								<Badge variant={data.filters.category === categoryName ? "default" : "outline"}>
									{categoryName}
								</Badge>
							</a>
						{/each}
					</div>
				</div>

				<div class="rounded-xl border border-border/50 bg-card/50 p-4 backdrop-blur-sm">
					<h3 class="mb-3 text-sm font-semibold">Price Range</h3>
					<div class="flex flex-wrap gap-2">
						{#each priceOptions as option (option)}
							<a href={buildHref({ price: option })}>
								<Badge variant={data.filters.price === option ? "default" : "outline"}>{option}</Badge>
							</a>
						{/each}
					</div>
				</div>

				<div class="rounded-xl border border-border/50 bg-card/50 p-4 backdrop-blur-sm">
					<div class="mb-3 flex items-center gap-2">
						<Sparkles class="h-3.5 w-3.5 text-amber-500" />
						<h3 class="text-sm font-semibold">Trending</h3>
					</div>
					<div class="flex flex-wrap gap-2">
						{#each data.popularTags.slice(0, 8) as tagMeta (tagMeta.tag)}
							<a href={buildHref({ tags: tagMeta.tag })}>
								<Badge variant={data.filters.tags === tagMeta.tag ? "default" : "outline"}>
									{tagMeta.tag}
								</Badge>
							</a>
						{/each}
					</div>
				</div>
			</aside>

			<main class="lg:col-span-9">
				{#if data.products.length === 0}
					<div
						class="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border/60 bg-card/20 py-24 text-center"
					>
						<div class="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-muted/50">
							<Search class="h-7 w-7 text-muted-foreground" />
						</div>
						<h3 class="mb-2 text-lg font-semibold">No results found</h3>
						<p class="mb-6 max-w-sm text-sm text-muted-foreground">
							Try adjusting your filters or search query.
						</p>
						<Button href="/marketplace/explore" variant="outline">Reset Filters</Button>
					</div>
				{:else}
					<div class="space-y-12">
						<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
							{#each data.products.slice(0, 6) as product (product._id)}
								<ProductCard {product} />
							{/each}
						</div>

						{#if data.products.length > 6}
							<div
								class="flex min-h-[180px] items-center justify-center rounded-2xl border border-border/40 bg-card/30 p-8 text-sm text-muted-foreground backdrop-blur-sm"
							>
								Marketplace sponsor slot
							</div>

							<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
								{#each data.products.slice(6) as product (product._id)}
									<ProductCard {product} />
								{/each}
							</div>
						{/if}
					</div>
				{/if}
			</main>
		</div>
	</div>
</div>

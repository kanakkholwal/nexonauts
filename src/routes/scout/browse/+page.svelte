<script lang="ts">
	import ToolCard from "$lib/components/scout/tool-card.svelte";
	import { Badge } from "$lib/components/ui/badge";
	import { Button } from "$lib/components/ui/button";
	import { Input } from "$lib/components/ui/input";
	import Grid2x2 from "@lucide/svelte/icons/grid-2x2";
	import List from "@lucide/svelte/icons/list";
	import Search from "@lucide/svelte/icons/search";
	import SearchX from "@lucide/svelte/icons/search-x";
	import Sparkles from "@lucide/svelte/icons/sparkles";
	import X from "@lucide/svelte/icons/x";

	let { data } = $props();
	const currentView = $derived(data.view === "list" ? "list" : "grid");

	const hasActiveFilters = $derived(
		Boolean(
			data.filter.category !== "all" ||
				data.filter.pricing_type !== "all" ||
				data.query ||
				data.offset
		)
	);

	function buildHref(next: Record<string, string | number>) {
		const params = new URLSearchParams();
		const entries: Record<string, string | number> = {
			query: data.query,
			page: data.page,
			offset: data.offset,
			view: data.view,
			category: data.filter.category,
			pricing_type: data.filter.pricing_type,
			...next
		};

		for (const [key, value] of Object.entries(entries)) {
			if (value === "" || value === "all" || value === 0) continue;
			params.set(key, String(value));
		}

		const query = params.toString();
		return query ? `/scout/browse?${query}` : "/scout/browse";
	}

	const paginationItems = $derived.by(() => {
		const start = Math.max(1, data.page - 2);
		const end = Math.min(data.totalPages, data.page + 2);
		return Array.from({ length: end - start + 1 }, (_, index) => start + index);
	});
</script>

<div class="min-h-screen bg-background">
	<div class="pointer-events-none fixed inset-0 z-0">
		<div
			class="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px]"
		></div>
		<div class="absolute top-20 right-0 h-[600px] w-[600px] rounded-full bg-primary/5 blur-[150px]"></div>
	</div>

	<div class="relative z-10 w-full border-b border-border/40 pt-20">
		<div class="mx-auto max-w-[1600px] px-4 py-10 sm:px-6">
			<div class="max-w-2xl">
				<div class="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
					<Sparkles class="h-3 w-3" />
					<span>Curated Tools</span>
				</div>
				<h1 class="mb-3 text-3xl font-bold tracking-tight md:text-4xl">{data.hero.title}</h1>
				<p class="text-base text-muted-foreground">{data.hero.description}</p>
			</div>
		</div>
	</div>

	<div class="relative z-10 mx-auto flex w-full max-w-[1600px] gap-8 px-4 py-8 sm:px-6">
		<aside class="hidden h-fit w-72 shrink-0 space-y-6 lg:block lg:sticky lg:top-24">
			<div class="rounded-xl border border-border/50 bg-card/50 p-4 backdrop-blur-sm">
				<h3 class="mb-4 text-sm font-semibold">Pricing</h3>
				<div class="flex flex-wrap gap-2">
					{#each data.pricingTypes as pricingType (pricingType)}
						<a href={buildHref({ pricing_type: pricingType, page: 1 })}>
							<Badge variant={data.filter.pricing_type === pricingType ? "default" : "outline"}>
								{pricingType}
							</Badge>
						</a>
					{/each}
				</div>
			</div>

			<div class="rounded-xl border border-border/50 bg-card/50 p-4 backdrop-blur-sm">
				<h3 class="mb-4 text-sm font-semibold">Categories</h3>
				<div class="flex flex-wrap gap-2">
					{#each data.categories as category (category.slug)}
						<a href={buildHref({ category: category.slug, page: 1 })}>
							<Badge variant={data.filter.category === category.slug ? "default" : "outline"}>
								{category.name}
							</Badge>
						</a>
					{/each}
				</div>
			</div>
		</aside>

		<main class="min-w-0 flex-1 space-y-6">
			<div class="sticky top-20 z-30 rounded-xl border border-border/50 bg-background/80 p-3 shadow-sm backdrop-blur-xl">
				<div class="flex flex-col gap-3 sm:flex-row sm:items-center">
					<form action="/scout/browse" method="GET" class="relative w-full sm:flex-1">
						<div class="pointer-events-none absolute inset-y-0 left-3 flex items-center">
							<Search class="h-4 w-4 text-muted-foreground" />
						</div>
						<Input
							name="query"
							value={data.query}
							placeholder="Search tools, categories, or tags"
							class="h-11 rounded-full border-border/50 bg-card/70 pr-4 pl-10 backdrop-blur-sm"
						/>
						<input type="hidden" name="category" value={data.filter.category} />
						<input type="hidden" name="pricing_type" value={data.filter.pricing_type} />
						<input type="hidden" name="view" value={data.view} />
					</form>

					<div class="flex items-center gap-2">
						<a href={buildHref({ view: "grid" })}>
							<Badge variant={data.view === "grid" ? "default" : "outline"} class="gap-1.5 px-3 py-2">
								<Grid2x2 class="h-3.5 w-3.5" />
								Grid
							</Badge>
						</a>
						<a href={buildHref({ view: "list" })}>
							<Badge variant={data.view === "list" ? "default" : "outline"} class="gap-1.5 px-3 py-2">
								<List class="h-3.5 w-3.5" />
								List
							</Badge>
						</a>
					</div>
				</div>
			</div>

			<div class="px-1 text-sm text-muted-foreground">
				{#if data.query}
					<span>
						<span class="font-semibold text-foreground">{data.totalResults}</span>
						results for "{data.query}"
					</span>
				{:else}
					<span>
						<span class="font-semibold text-foreground">{data.totalResults}</span>
						tools available
					</span>
				{/if}
			</div>

			{#if hasActiveFilters}
				<div class="flex flex-wrap items-center gap-2">
					<span class="text-xs font-medium text-muted-foreground">Active:</span>
					{#if data.filter.category !== "all"}
						<a href={buildHref({ category: "", page: 1 })} class="inline-flex">
							<Badge class="gap-1.5 bg-primary/10 text-primary">
								{data.filter.category}
								<X class="h-3 w-3" />
							</Badge>
						</a>
					{/if}
					{#if data.filter.pricing_type !== "all"}
						<a href={buildHref({ pricing_type: "", page: 1 })} class="inline-flex">
							<Badge class="gap-1.5 bg-primary/10 text-primary">
								{data.filter.pricing_type}
								<X class="h-3 w-3" />
							</Badge>
						</a>
					{/if}
					{#if data.query}
						<a href={buildHref({ query: "", page: 1 })} class="inline-flex">
							<Badge class="gap-1.5 bg-primary/10 text-primary">
								Search
								<X class="h-3 w-3" />
							</Badge>
						</a>
					{/if}
					<a href="/scout/browse" class="text-xs text-muted-foreground underline underline-offset-2">
						Clear all
					</a>
				</div>
			{/if}

			{#if data.tools.length === 0}
				<div class="flex justify-center py-20">
					<div class="rounded-2xl border border-dashed border-border/60 bg-card/20 px-8 py-16 text-center">
						<div class="mb-5 flex justify-center">
							<div class="flex h-16 w-16 items-center justify-center rounded-full bg-muted/50">
								<SearchX class="h-7 w-7 text-muted-foreground" />
							</div>
						</div>
						<h3 class="mb-2 text-lg font-semibold">No tools found</h3>
						<p class="mb-6 max-w-sm text-sm text-muted-foreground">
							Try adjusting your filters or search query.
						</p>
						<Button href="/scout/browse" variant="outline">Reset Filters</Button>
					</div>
				</div>
			{:else}
				<div
					class={currentView === "list"
						? "grid grid-cols-1 gap-4"
						: "grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3"}
				>
					{#each data.tools as tool (tool._id)}
						<ToolCard {tool} view={currentView} />
					{/each}
				</div>

				{#if data.totalPages > 1}
					<div class="flex flex-wrap items-center justify-center gap-2 border-t border-border/40 pt-8">
						<Button
							variant="outline"
							href={buildHref({ page: Math.max(1, data.page - 1) })}
							disabled={data.page <= 1}
						>
							Previous
						</Button>

						{#each paginationItems as pageNumber (pageNumber)}
							<a href={buildHref({ page: pageNumber })}>
								<Badge variant={pageNumber === data.page ? "default" : "outline"} class="px-3 py-2">
									{pageNumber}
								</Badge>
							</a>
						{/each}

						<Button
							variant="outline"
							href={buildHref({ page: Math.min(data.totalPages, data.page + 1) })}
							disabled={data.page >= data.totalPages}
						>
							Next
						</Button>
					</div>
				{/if}
			{/if}
		</main>
	</div>
</div>

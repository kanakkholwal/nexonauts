<script lang="ts">
	import ProductCard from "$lib/components/marketplace/product-card.svelte";
	import { Button } from "$lib/components/ui/button";
	import Search from "@lucide/svelte/icons/search";
	import Sparkles from "@lucide/svelte/icons/sparkles";
	import Tag from "@lucide/svelte/icons/tag";
	import ArrowRight from "@lucide/svelte/icons/arrow-right";

	let { data } = $props();
</script>

<main class="relative min-h-screen bg-background selection:text-primary">
	<div class="pointer-events-none fixed inset-0 z-0">
		<div
			class="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"
		></div>
		<div
			class="absolute top-0 left-1/2 h-96 w-full max-w-[1000px] -translate-x-1/2 rounded-full bg-indigo-500/10 blur-[120px]"
		></div>
	</div>

	<div class="relative z-10 mx-auto w-full max-w-7xl px-6 md:px-8">
		<div class="flex flex-col items-center space-y-8 py-24 text-center md:py-32">
			<div
				class="inline-flex animate-fade-in items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary backdrop-blur-xl"
			>
				<Sparkles class="h-3 w-3" />
				<span>New Assets Added Weekly</span>
			</div>

			<h1 class="max-w-4xl text-5xl font-bold tracking-tight text-foreground md:text-7xl">
				The Marketplace for <br />
				<span
					class="bg-linear-to-l from-indigo-400 via-sky-400 to-emerald-300 bg-clip-text text-transparent"
				>
					Frontend Craft.
				</span>
			</h1>

			<p class="max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
				Dive into a world of beautifully crafted themes, templates, and UI kits curated for
				your next big project.
			</p>

			<form action="/marketplace/explore" method="GET" class="group relative w-full max-w-lg">
				<div
					class="absolute -inset-1 rounded-full bg-linear-to-r from-primary/20 to-violet-500/20 opacity-25 blur transition duration-500 group-hover:opacity-50"
				></div>
				<div
					class="relative flex h-10 items-center rounded-full border border-border/50 bg-background/80 backdrop-blur-xl sm:h-14 sm:px-4"
				>
					<Search class="ml-2 hidden h-5 w-5 text-muted-foreground sm:inline-block" />
					<input
						type="text"
						name="query"
						placeholder="Search for templates, icons, or UI kits..."
						class="h-full flex-1 border-none bg-transparent px-4 text-foreground outline-none placeholder:text-muted-foreground/70"
					/>
					<Button type="submit" size="sm" class="h-8 w-8 rounded-full sm:h-10 sm:w-auto">
						<Search class="inline-block h-4 w-4 sm:hidden" />
						<span class="hidden sm:inline-block">Search</span>
					</Button>
				</div>
			</form>

			<div class="flex flex-wrap justify-center gap-2 text-sm text-muted-foreground">
				<span class="flex items-center gap-1"><Tag class="h-3 w-3" /> Popular:</span>
				{#each ["Templates", "Design", "Themes", "UI Kits"] as tagName (tagName)}
					<a
						href={`/marketplace/explore?query=${encodeURIComponent(tagName)}`}
						class="underline-offset-4 transition-colors hover:text-primary hover:underline"
					>
						{tagName}
					</a>
				{/each}
			</div>
		</div>

		<div class="grid grid-cols-1 gap-8 pb-20 xl:grid-cols-12">
			<div class="space-y-20 xl:col-span-9">
				{#each data.results as result, index (result.category)}
					<section id={result.category} class="scroll-mt-24">
						<div
							class="mb-8 flex flex-col gap-4 border-b border-border/40 pb-4 md:flex-row md:items-end md:justify-between"
						>
							<div class="space-y-1">
								<h2 class="text-3xl font-bold tracking-tight">{result.category}</h2>
								<p class="max-w-lg text-base text-muted-foreground">
									{data.categoryDescriptions[result.category]}
								</p>
							</div>
							<a
								href={`/marketplace/explore?category=${encodeURIComponent(result.category)}`}
								class="text-primary group inline-flex shrink-0 items-center"
							>
								View Collection
								<ArrowRight class="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
							</a>
						</div>

						<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 5xl:grid-cols-3">
							{#each result.products as product (product._id)}
								<ProductCard {product} />
							{/each}
						</div>

						{#if (index + 1) % 2 === 0 && index !== data.results.length - 1}
							<div
								class="mt-12 mb-4 flex min-h-[180px] items-center justify-center rounded-2xl border border-border/60 bg-card/30 p-8 text-sm text-muted-foreground backdrop-blur-sm"
							>
								Marketplace sponsor slot
							</div>
						{/if}
					</section>
				{/each}
			</div>

			<aside class="hidden xl:flex xl:col-span-3 xl:flex-col xl:gap-6">
				<div
					class="min-h-[600px] rounded-2xl border border-border/60 bg-card/40 p-6 text-sm text-muted-foreground shadow-lg backdrop-blur-sm"
				>
					Sponsored placement
				</div>

				<div
					class="relative overflow-hidden rounded-2xl border border-primary/20 bg-linear-to-br from-primary/10 via-primary/5 to-card p-6 shadow-lg"
				>
					<div class="relative z-10 space-y-4">
						<div
							class="inline-flex items-center gap-2 rounded-full bg-primary/20 px-3 py-1 text-xs font-semibold text-primary"
						>
							<Sparkles class="h-3 w-3" />
							<span>Premium</span>
						</div>
						<h3 class="text-lg font-bold">Become a Seller</h3>
						<p class="text-sm leading-relaxed text-muted-foreground">
							Share your creative work with developers and designers worldwide.
						</p>
						<Button href="/dashboard/products">Start Selling</Button>
					</div>
				</div>
			</aside>
		</div>
	</div>
</main>

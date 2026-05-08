<script lang="ts">
	import { Input } from "$lib/components/ui/input";
	import { cn } from "$lib/utils";
	import LayoutGrid from "@lucide/svelte/icons/layout-grid";
	import Search from "@lucide/svelte/icons/search";
	import Sparkles from "@lucide/svelte/icons/sparkles";
	import Terminal from "@lucide/svelte/icons/terminal";
	import { devTools, devToolCategories } from "./tools";

	let query = $state("");
	let activeCategory = $state("All");

	const filteredTools = $derived(
		devTools.filter((tool) => {
			const matchesCategory = activeCategory === "All" || tool.category === activeCategory;
			const q = query.trim().toLowerCase();
			const matchesQuery =
				q === "" ||
				tool.title.toLowerCase().includes(q) ||
				tool.description.toLowerCase().includes(q) ||
				tool.tags.some((t) => t.toLowerCase().includes(q));
			return matchesCategory && matchesQuery;
		})
	);
</script>

<svelte:head>
	<title>Developer Tools — Nexonauts</title>
	<meta
		name="description"
		content="A collection of tools that I have made to make your developer life easier."
	/>
</svelte:head>

<section class="relative py-12 md:py-20">
	<div class="mx-auto max-w-3xl space-y-4 text-center">
		<div
			class="bg-muted/50 text-muted-foreground inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs"
		>
			<Sparkles class="size-3" />
			Browser-first dev utilities
		</div>
		<h1 class="text-4xl font-bold tracking-tight md:text-5xl">Developer Tools</h1>
		<p class="text-muted-foreground mx-auto max-w-2xl text-base md:text-lg">
			A curated set of fast, private, browser-based tools to streamline your day.
		</p>
	</div>

	<div class="mt-10 flex w-full flex-col items-center gap-4">
		<div class="relative w-full max-w-md">
			<div
				class="text-muted-foreground pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
			>
				<Search class="size-4" />
			</div>
			<Input
				type="search"
				placeholder="Search tools…"
				bind:value={query}
				class="h-10 rounded-full pl-10"
			/>
		</div>

		<div class="flex flex-wrap justify-center gap-2">
			{#each devToolCategories as category (category)}
				<button
					type="button"
					onclick={() => (activeCategory = category)}
					class={cn(
						"rounded-full border px-3 py-1 text-xs font-medium transition-all",
						activeCategory === category
							? "bg-foreground text-background border-transparent"
							: "border-border bg-muted/50 text-muted-foreground hover:text-foreground"
					)}
				>
					{category}
				</button>
			{/each}
		</div>
	</div>

	{#if filteredTools.length === 0}
		<div class="text-muted-foreground mt-16 flex flex-col items-center gap-2 text-sm">
			<LayoutGrid class="size-8 opacity-50" />
			<p>No tools match your filters.</p>
		</div>
	{:else}
		<div class="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
			{#each filteredTools as tool (tool.slug)}
				<a
					href={`/dev-tools/${tool.slug}`}
					class="group bg-card hover:border-primary/30 flex flex-col gap-3 rounded-xl border p-5 transition-all hover:-translate-y-0.5 hover:shadow-md"
				>
					<div class="flex items-center justify-between">
						<div
							class="bg-muted group-hover:bg-primary/10 flex size-10 items-center justify-center rounded-lg transition-colors"
						>
							<Terminal class="text-muted-foreground group-hover:text-primary size-5" />
						</div>
						<span
							class="text-muted-foreground/70 rounded-full bg-muted px-2 py-0.5 text-[10px] uppercase tracking-wider"
						>
							{tool.category}
						</span>
					</div>
					<div class="space-y-1">
						<h3 class="font-semibold tracking-tight">{tool.title}</h3>
						<p class="text-muted-foreground text-sm leading-relaxed">{tool.description}</p>
					</div>
				</a>
			{/each}
		</div>
	{/if}
</section>

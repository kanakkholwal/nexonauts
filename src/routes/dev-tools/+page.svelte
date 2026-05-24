<script lang="ts">
	import { Input } from "$lib/components/ui/input";
	import { Badge } from "$lib/components/ui/badge";
	import GradientOrb from "$lib/components/surfaces/gradient-orb.svelte";
	import { cn } from "$lib/utils";
	import LayoutGrid from "@lucide/svelte/icons/layout-grid";
	import Search from "@lucide/svelte/icons/search";
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

	// Rotating soft tints for category chips and tool tags
	const hues = ["soft-mint", "soft-peach", "soft-lavender", "soft-sky", "soft-rose"] as const;
	const orbHues = ["mint", "peach", "lavender", "sky", "rose"] as const;
</script>

<svelte:head>
	<title>Developer Tools — Nexonauts</title>
	<meta
		name="description"
		content="A collection of tools to make your developer life easier."
	/>
</svelte:head>

<section class="relative isolate overflow-hidden py-20 md:py-24">
	<GradientOrb hue="mint" size="lg" opacity={0.35} class="-left-32 top-4" />
	<GradientOrb hue="lavender" size="md" opacity={0.3} class="-right-24 top-32" />

	<div class="relative z-10 mx-auto max-w-3xl space-y-5 text-center">
		<Badge variant="default" size="md">Browser-first dev utilities</Badge>
		<h1 class="display-xl text-ink">Developer Tools</h1>
		<p class="mx-auto max-w-2xl text-base leading-relaxed text-body md:text-lg">
			A curated set of fast, private, browser-based tools to streamline your day.
		</p>
	</div>

	<div class="relative z-10 mt-12 flex w-full flex-col items-center gap-5">
		<div class="relative w-full max-w-md">
			<div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-muted-ink">
				<Search class="size-4" />
			</div>
			<Input
				type="search"
				placeholder="Search tools…"
				bind:value={query}
				class="h-11 rounded-pill pl-11"
			/>
		</div>

		<div class="flex flex-wrap justify-center gap-2">
			{#each devToolCategories as category (category)}
				<button
					type="button"
					onclick={() => (activeCategory = category)}
					class={cn(
						"rounded-pill border px-3.5 py-1 text-xs font-medium uppercase tracking-[0.06em] transition-all",
						activeCategory === category
							? "bg-primary text-primary-foreground border-transparent"
							: "border-hairline-strong bg-canvas text-body hover:text-ink hover:bg-surface-strong"
					)}
				>
					{category}
				</button>
			{/each}
		</div>
	</div>

	{#if filteredTools.length === 0}
		<div class="relative z-10 mt-20 flex flex-col items-center gap-2 text-sm text-muted-ink">
			<LayoutGrid class="size-8 opacity-50" />
			<p>No tools match your filters.</p>
		</div>
	{:else}
		<div class="relative z-10 mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
			{#each filteredTools as tool, i (tool.slug)}
				{@const hue = hues[i % hues.length]}
				{@const orbHue = orbHues[i % orbHues.length]}
				<a
					href={`/dev-tools/${tool.slug}`}
					class="group relative isolate flex flex-col gap-4 overflow-hidden rounded-2xl border border-hairline bg-card p-6 transition-all hover:border-hairline-strong hover:shadow-(--shadow-soft-drop)"
				>
					<GradientOrb hue={orbHue} size="sm" opacity={0.22} class="-right-16 -top-12" />
					<div class="relative z-10 flex items-center justify-between">
						<div class="flex size-11 items-center justify-center rounded-xl bg-surface-strong">
							<Terminal class="size-5 text-ink" />
						</div>
						<Badge variant={hue} size="sm">{tool.category}</Badge>
					</div>
					<div class="relative z-10 space-y-2">
						<h3 class="text-lg font-medium tracking-tight text-ink">{tool.title}</h3>
						<p class="text-sm leading-relaxed text-body">{tool.description}</p>
					</div>
				</a>
			{/each}
		</div>
	{/if}
</section>

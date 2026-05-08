<script lang="ts">
	import ToolCard from "$lib/components/scout/tool-card.svelte";
	import { Badge } from "$lib/components/ui/badge";
	import { Button } from "$lib/components/ui/button";
	import * as Tabs from "$lib/components/ui/tabs";
	import { formatNumber } from "src/utils/formaters";
	import ArrowRight from "@lucide/svelte/icons/arrow-right";
	import ArrowUpDown from "@lucide/svelte/icons/arrow-up-down";
	import FolderOpen from "@lucide/svelte/icons/folder-open";
	import MonitorSmartphone from "@lucide/svelte/icons/monitor-smartphone";
	import ScanSearch from "@lucide/svelte/icons/scan-search";
	import Search from "@lucide/svelte/icons/search";
	import Sparkles from "@lucide/svelte/icons/sparkles";
	import Star from "@lucide/svelte/icons/star";
	import Zap from "@lucide/svelte/icons/zap";

	let { data } = $props();

	const features = [
		{
			name: "Effortless Search",
			description:
				"Powerful semantic search makes locating the perfect solution for your specific stack instant.",
			icon: Search
		},
		{
			name: "Curated Quality",
			description:
				"We manually verify every tool to ensure you only see best-in-class solutions, no vaporware.",
			icon: Star
		},
		{
			name: "Always Fresh",
			description:
				"Our database is updated daily with the latest AI breakthroughs and version updates.",
			icon: Zap
		},
		{
			name: "Developer Focused",
			description:
				"Filter by API availability, open-source license, and pricing models instantly.",
			icon: MonitorSmartphone
		},
		{
			name: "Smart Categories",
			description:
				"Navigate through specialized clusters like code assistants, workflow automation, and design tooling.",
			icon: FolderOpen
		},
		{
			name: "Community Ranked",
			description:
				"See what's trending based on real developer usage and popularity metrics.",
			icon: ArrowUpDown
		}
	];

	let activeCategory = $state("");
	$effect(() => {
		if (!activeCategory && data.categories[0]?.slug) {
			activeCategory = data.categories[0].slug;
		}
	});

	const activeGroup = $derived(
		data.categories.find((category) => category.slug === activeCategory) ?? data.categories[0]
	);
</script>

<div class="min-h-screen">
	<header class="relative overflow-hidden">
		<div class="relative mx-auto flex max-w-7xl flex-col items-center px-6 pt-32 pb-20 text-center lg:pt-48 lg:pb-32">
			<div class="mb-8 inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary backdrop-blur-sm">
				<Sparkles class="mr-2 h-3.5 w-3.5" />
				<span class="flex items-center gap-1">
					Database updated:
					<span class="font-bold">{new Date().toLocaleDateString()}</span>
				</span>
			</div>

			<h1 class="mb-6 text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-foreground to-foreground/60 md:text-7xl">
				The Knowledge Base for
				<br class="hidden md:block" />
				<span class="bg-linear-to-l from-indigo-400 from-10% via-sky-400 via-30% to-emerald-300 to-90% bg-clip-text text-transparent">
					AI & Dev Tools
				</span>
			</h1>

			<p class="mb-10 max-w-2xl text-xl leading-relaxed text-muted-foreground">
				Nexo Scout is the search engine for builders. Discover over
				<span class="font-semibold text-foreground">{formatNumber(data.totalTools)}+</span>
				curated tools, resources, and services to streamline your next project.
			</p>

			<div class="mb-20 flex w-full flex-col items-center justify-center gap-4 sm:flex-row">
				<Button size="lg" class="h-12 rounded-full px-8 text-base shadow-lg shadow-primary/20" href="/scout/browse">
					<ScanSearch class="mr-2 h-5 w-5" />
					Start Exploring
				</Button>
				<Button
					size="lg"
					variant="outline"
					class="h-12 rounded-full bg-background/50 px-8 text-base backdrop-blur-md"
					href="/dashboard/tools"
				>
					<Zap class="mr-2 h-5 w-5" />
					Submit a Tool
				</Button>
			</div>
		</div>
	</header>

	<section class="relative z-10 border-y border-border/50 bg-muted/20 px-6 py-24">
		<div class="mx-auto max-w-7xl">
			<div class="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
				<div>
					<h2 class="mb-2 text-3xl font-bold tracking-tight">Trending Collections</h2>
					<p class="text-muted-foreground">Most searched categories this week.</p>
				</div>
				<a href="/scout/browse" class="flex items-center gap-1 font-medium text-primary hover:underline">
					View all tools
					<ArrowRight class="h-4 w-4" />
				</a>
			</div>

			{#if data.categories.length > 0}
				<Tabs.Root bind:value={activeCategory} class="w-full">
					<div class="mb-4 overflow-x-auto pb-4 scrollbar-hide">
						<Tabs.List class="inline-flex h-12 w-auto items-center justify-start rounded-full border border-border/50 bg-background p-1 text-muted-foreground">
							{#each data.categories as category (category.slug)}
								<Tabs.Trigger
									value={category.slug}
									class="rounded-full px-6 py-2 text-sm font-medium transition-all data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm"
								>
									{category.name}
								</Tabs.Trigger>
							{/each}
						</Tabs.List>
					</div>

					{#each data.categories as category (category.slug)}
						<Tabs.Content value={category.slug} class="mt-0">
							<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
								{#each category.tools as tool (tool._id)}
									<ToolCard {tool} />
								{/each}
							</div>
						</Tabs.Content>
					{/each}
				</Tabs.Root>
			{:else}
				<div class="rounded-2xl border border-dashed border-border/60 bg-card/20 py-16 text-center">
					<p class="text-sm text-muted-foreground">Scout categories will appear here once tools are published.</p>
				</div>
			{/if}

			{#if activeGroup}
				<div class="mt-8 flex justify-center">
					<a href={`/scout/browse?category=${activeGroup.slug}`}>
						<Badge class="rounded-full px-4 py-1.5 text-sm">Browse all {activeGroup.name}</Badge>
					</a>
				</div>
			{/if}
		</div>
	</section>

	<section class="relative overflow-hidden px-6 py-24">
		<div class="pointer-events-none absolute top-[20%] left-[10%] h-[400px] w-[400px] rounded-full bg-primary/5 blur-[120px] mix-blend-screen"></div>

		<div class="mx-auto max-w-7xl">
			<div class="mx-auto mb-16 max-w-3xl text-center">
				<h2 class="mb-3 text-sm font-semibold tracking-widest text-primary uppercase">
					Why Nexo Scout?
				</h2>
				<p class="mb-6 text-3xl font-bold tracking-tight md:text-4xl">
					Built for the modern creator economy
				</p>
				<p class="text-lg text-muted-foreground">
					We stripped away the noise. No ads, no fluff, just the tools you need to build faster and better.
				</p>
			</div>

			<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
				{#each features as feature (feature.name)}
					{@const Icon = feature.icon}
					<div class="group relative rounded-3xl border border-border/50 bg-card/30 p-8 backdrop-blur-sm transition-colors hover:border-primary/20 hover:bg-card/60">
						<div class="absolute top-8 right-8 text-primary/10 transition-colors group-hover:text-primary/20">
							<Icon class="h-24 w-24 rotate-12" />
						</div>

						<div class="relative z-10">
							<div class="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">
								<Icon class="h-6 w-6" />
							</div>
							<h3 class="mb-3 text-xl font-bold text-foreground">{feature.name}</h3>
							<p class="leading-relaxed text-muted-foreground">{feature.description}</p>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</section>
</div>

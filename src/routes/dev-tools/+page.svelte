<script lang="ts">
import ArrowRight from "phosphor-svelte/lib/ArrowRight";
import MagnifyingGlass from "phosphor-svelte/lib/MagnifyingGlass";
import Wrench from "phosphor-svelte/lib/Wrench";
import { appConfig } from "@/project.config";
import { Container, Reveal, Section, SectionLabel } from "$lib/components/surfaces";
import { cn } from "$lib/utils";
import { categoryIcon } from "./icons";
import { devToolCategories, devTools } from "./tools";

let query = $state("");
let activeCategory = $state("All");

const filtered = $derived(
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

// Counts sit next to the filter so the index says how big it is before you click.
const countFor = (category: string) =>
	category === "All" ? devTools.length : devTools.filter((t) => t.category === category).length;

const title = "Dev tools · Nexonauts";
const description =
	"Single purpose browser utilities for the small jobs that interrupt real work. Nothing is uploaded.";
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href="{appConfig.url}/dev-tools" />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
</svelte:head>

<Section spacing="none" class="border-b border-border-low">
	<Container class="pt-28 pb-14 md:pt-32 md:pb-16">
		<div class="max-w-xl">
			<Reveal>
				<SectionLabel icon={Wrench} label="Dev tools" />
			</Reveal>
			<Reveal delay={60} class="mt-5">
				<h1 class="text-balance text-heading-lg text-ink-strong md:text-display">
					Small jobs, done in the tab
				</h1>
			</Reveal>
			<Reveal delay={120} class="mt-4">
				<p class="text-pretty text-body-lg text-muted-foreground">
					Single purpose utilities for the work that interrupts real work. Nothing is uploaded.
				</p>
			</Reveal>
		</div>
	</Container>
</Section>

<Section spacing="none" class="mx-auto max-w-6xl">
	<!-- Filter rail. A hairline row, not a floating toolbar. -->
	<Container class="flex flex-col gap-4 border-b border-border-low py-5 md:flex-row md:items-center">
		<label class="relative w-full md:max-w-xs">
			<span class="sr-only">Search tools</span>
			<MagnifyingGlass
				class="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
			/>
			<input
				type="search"
				placeholder="Search tools"
				bind:value={query}
				class={cn(
					"h-9 w-full rounded-lg border border-border-control bg-card pr-3 pl-9",
					"text-body-sm text-foreground placeholder:text-muted-foreground",
					"ease-fluid transition-colors duration-200",
					"focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
				)}
			/>
		</label>

		<div class="flex flex-wrap items-center gap-1 md:ml-auto">
			{#each devToolCategories as category (category)}
				<button
					type="button"
					onclick={() => (activeCategory = category)}
					aria-pressed={activeCategory === category}
					class={cn(
						"ease-fluid inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-body-sm font-medium",
						"transition-colors duration-200 motion-reduce:transition-none",
						"focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
						activeCategory === category
							? "bg-foreground text-background"
							: "text-muted-foreground hover:bg-paper hover:text-foreground"
					)}
				>
					{category}
					<span class={cn("font-mono text-caption tabular-nums", activeCategory === category ? "opacity-70" : "opacity-60")}>
						{countFor(category)}
					</span>
				</button>
			{/each}
		</div>
	</Container>

	<Container>
		{#if filtered.length === 0}
			<div class="flex flex-col items-center gap-3 py-24 text-center">
				<MagnifyingGlass class="size-6 text-muted-foreground" />
				<p class="text-body text-foreground">Nothing matches "{query}"</p>
				<p class="max-w-sm text-body-sm text-muted-foreground">
					Try a shorter word, or clear the category filter.
				</p>
				<button
					type="button"
					onclick={() => {
						query = "";
						activeCategory = "All";
					}}
					class="ease-fluid mt-2 text-body-sm font-medium text-primary underline-offset-4 transition-colors duration-200 hover:underline"
				>
					Reset filters
				</button>
			</div>
		{:else}
			<!-- Hairline grid, the same one the homepage uses. -->
			<div
				class="grid grid-cols-1 gap-px border-b border-border-low bg-border-low sm:grid-cols-2 lg:grid-cols-3"
			>
				{#each filtered as tool, i (tool.slug)}
					{@const Icon = categoryIcon(tool.category)}
					<Reveal as="article" delay={Math.min(i, 5) * 60} class="flex bg-background">
						<a
							href="/dev-tools/{tool.slug}"
							class={cn(
								"group ease-fluid flex w-full flex-col px-6 py-8 transition-colors duration-200",
								"hover:bg-paper focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
							)}
						>
							<div class="flex items-center justify-between">
								<Icon class="size-5 text-muted-foreground" weight="duotone" />
								<ArrowRight
									class="ease-fluid size-4 text-muted-foreground transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none"
								/>
							</div>

							<p class="mt-6 text-caption text-muted-foreground">{tool.category}</p>
							<h2 class="mt-1 font-display text-body font-medium text-foreground">
								{tool.title}
							</h2>
							<p class="mt-2 text-body-sm text-muted-foreground">{tool.description}</p>

							<p class="mt-auto flex flex-wrap gap-x-2 pt-5 font-mono text-caption text-muted-foreground">
								{#each tool.tags as tag (tag)}
									<span>{tag}</span>
								{/each}
							</p>
						</a>
					</Reveal>
				{/each}
			</div>

			<p class="py-6 font-mono text-caption text-muted-foreground tabular-nums">
				{filtered.length} of {devTools.length} tools
			</p>
		{/if}
	</Container>
</Section>

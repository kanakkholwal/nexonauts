<script lang="ts">
import ArrowRight from "@tabler/icons-svelte/icons/arrow-right";
import MagnifyingGlass from "@tabler/icons-svelte/icons/search";
import { appConfig } from "@/project.config";
import { PageHero } from "$lib/components/site";
import { NotchedShelf } from "$lib/components/ui/notched-shelf";
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

const filtering = $derived(query.trim() !== "" || activeCategory !== "All");
const seamLabel = $derived(
	filtering ? `${filtered.length} of ${devTools.length} tools` : `${devTools.length} tools`
);

const title = "Dev tools · Nexonauts";
const description =
	"Single purpose browser utilities for the small jobs that interrupt real work. Each one runs in the page.";
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href="{appConfig.url}/dev-tools" />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
</svelte:head>

<PageHero
	eyebrow="Dev tools"
	title="Small jobs, done in the tab"
	lede="Single purpose utilities for the work that interrupts real work. Each one runs in the page and keeps your file on your machine."
>
	<!-- The controls stay on the tinted band; the seam below divides them from the results. -->
	<div class="flex flex-col gap-4 md:flex-row md:items-center md:gap-6">
		<label class="relative w-full md:max-w-xs">
			<span class="sr-only">Search tools</span>
			<MagnifyingGlass
				class="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
				aria-hidden="true"
			/>
			<input
				type="search"
				placeholder="Search tools"
				bind:value={query}
				class="h-10 w-full rounded-md border border-border-control bg-background pr-3 pl-9 text-body-sm text-foreground transition-colors duration-(--duration-ui) ease-(--ease-out) placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none motion-reduce:transition-none"
			/>
		</label>

		<div class="flex flex-wrap items-center gap-1 md:ml-auto">
			{#each devToolCategories as category (category)}
				{@const on = activeCategory === category}
				<button
					type="button"
					onclick={() => (activeCategory = category)}
					aria-pressed={on}
					class={cn(
						"inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-full px-3.5 text-body-sm font-medium transition-colors duration-(--duration-ui) ease-(--ease-out) focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none motion-reduce:transition-none",
						on
							? "bg-action text-action-foreground"
							: "bg-transparent text-muted-foreground hover:bg-background hover:text-foreground"
					)}
				>
					{category}
					<span class="font-mono text-caption tabular-nums opacity-65">{countFor(category)}</span>
				</button>
			{/each}
		</div>
	</div>
</PageHero>

<section class="relative isolate bg-background pt-16 md:pt-24">
	<!-- The seam the homepage uses between two surfaces, carrying the live count. -->
	<div class="pointer-events-none absolute inset-x-0 top-0 hidden md:block">
		<NotchedShelf fill="text-muted" align="start">
			<p
				class="px-5 font-mono text-caption tracking-wider whitespace-nowrap text-muted-foreground uppercase tabular-nums"
			>
				{seamLabel}
			</p>
		</NotchedShelf>
	</div>

	{#if filtered.length === 0}
		<div class="flex flex-col items-center gap-3 px-5 py-32 text-center md:pt-40">
			<MagnifyingGlass class="size-6 text-muted-foreground" aria-hidden="true" />
			<p class="text-body font-medium text-foreground">Nothing matches that</p>
			<p class="max-w-[38ch] text-body-sm text-pretty text-muted-foreground">
				Try a shorter word, or clear the category.
			</p>
			<button
				type="button"
				onclick={() => {
					query = "";
					activeCategory = "All";
				}}
				class="mt-2 cursor-pointer bg-transparent text-body-sm font-medium text-primary underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
			>
				Clear the filters
			</button>
		</div>
	{:else}
		<!-- Hairline cells on the page column: the gap is the border, so no cell carries a box. -->
		<div class="mx-auto w-full max-w-page px-5 sm:px-10 lg:px-14">
			<ul
				class="grid grid-cols-1 gap-px border-y border-border bg-border sm:grid-cols-2 lg:grid-cols-3"
			>
			{#each filtered as tool, i (tool.slug)}
				{@const Icon = categoryIcon(tool.category)}
				<li class="tile relative isolate overflow-clip bg-background" style="--i: {Math.min(i, 8)}">
					<a
						href="/dev-tools/{tool.slug}"
						class="group flex h-full flex-col px-5 py-9 transition-colors duration-(--duration-ui) ease-(--ease-out) hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none motion-reduce:transition-none sm:px-7"
					>
						<span class="ghost" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>

						<div class="flex items-center justify-between">
							<span
								class="grid size-10 place-items-center rounded-md border border-border text-foreground"
								aria-hidden="true"
							>
								<Icon class="size-4.5" />
							</span>
							<ArrowRight
								class="size-4 text-muted-foreground transition-transform duration-(--duration-ui) ease-(--ease-out) group-hover:translate-x-0.5 motion-reduce:transition-none"
								aria-hidden="true"
							/>
						</div>

						<p class="mt-7 font-mono text-caption tracking-wider text-muted-foreground uppercase">
							{tool.category}
						</p>
						<h2 class="mt-2 font-heading text-body-lg font-medium text-foreground">{tool.title}</h2>
						<p class="mt-2 text-body-sm text-pretty text-muted-foreground">{tool.description}</p>

						<p
							class="mt-auto flex flex-wrap gap-x-2 pt-8 font-mono text-caption text-muted-foreground"
						>
							{#each tool.tags as tag (tag)}
								<span>{tag}</span>
							{/each}
						</p>
					</a>
				</li>
				{/each}
			</ul>

			<p class="py-6 font-mono text-caption text-muted-foreground">
				Every one of them runs in your browser. Nothing you open here is uploaded.
			</p>
		</div>
	{/if}
</section>

<style>
	/* The chapter numeral from the homepage, at cell scale. */
	.ghost {
		position: absolute;
		right: -0.06em;
		bottom: -0.3em;
		z-index: -1;
		font-family: var(--font-heading);
		font-size: 8.5rem;
		font-weight: 500;
		line-height: 1;
		color: color-mix(in srgb, var(--foreground) 4%, transparent);
		user-select: none;
	}

	/* Entrance without a hidden resting state: with no JS the grid simply sits. */
	@media (prefers-reduced-motion: no-preference) {
		.tile {
			transition:
				opacity var(--duration-enter) var(--ease-out),
				transform var(--duration-enter) var(--ease-out);
			transition-delay: calc(40ms * var(--i));
		}
		@starting-style {
			.tile {
				opacity: 0;
				transform: translateY(14px);
			}
		}
	}
</style>

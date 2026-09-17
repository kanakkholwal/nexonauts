<script lang="ts">
import IconArrowRight from "@tabler/icons-svelte/icons/arrow-right";
import IconSearch from "@tabler/icons-svelte/icons/search";
import { categoryIcon } from "@/routes/dev-tools/icons";
import { type DevTool, devTools } from "@/routes/dev-tools/tools";
import { goto } from "$app/navigation";
import { cn } from "$lib/utils";

let query = $state("");
let category = $state("All");

const categories = ["All", ...new Set(devTools.map((t) => t.category))];

const countFor = (c: string) =>
	c === "All" ? devTools.length : devTools.filter((t) => t.category === c).length;

function matches(tool: DevTool, q: string) {
	const haystack = `${tool.title} ${tool.description} ${tool.category} ${tool.tags.join(" ")}`;
	return haystack.toLowerCase().includes(q);
}

const results = $derived.by(() => {
	const q = query.trim().toLowerCase();
	return devTools
		.filter((t) => category === "All" || t.category === category)
		.filter((t) => q === "" || matches(t, q));
});

// Enter opens the best match, so the keyboard path never needs the mouse.
function onKeydown(event: KeyboardEvent) {
	if (event.key !== "Enter" || results.length === 0) return;
	event.preventDefault();
	goto(`/dev-tools/${results[0].slug}`);
}

function reset() {
	query = "";
	category = "All";
}
</script>

<div class="flex flex-col gap-6">
	<div class="relative">
		<IconSearch
			class="text-muted-foreground pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2"
			aria-hidden="true"
		/>
		<input
			bind:value={query}
			onkeydown={onKeydown}
			type="search"
			placeholder="Search {devTools.length} tools, or press Enter for the closest match"
			aria-label="Search the dev tools"
			class="border-border-control bg-background text-body text-foreground placeholder:text-placeholder focus:border-ring h-12 w-full rounded-xl border pr-4 pl-11 outline-none"
		/>
	</div>

	<div class="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
		{#each categories as c (c)}
			<button
				type="button"
				onclick={() => (category = c)}
				aria-pressed={category === c}
				class={cn(
					"ease-craft text-body-sm focus-visible:ring-ring inline-flex min-h-9 items-center gap-2 rounded-md border px-3 font-medium transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none motion-reduce:transition-none",
					category === c
						? "bg-action text-action-foreground border-transparent"
						: "border-border text-muted-foreground hover:text-foreground hover:bg-muted"
				)}
			>
				{c}
				<span class="text-caption tabular-nums opacity-70">{countFor(c)}</span>
			</button>
		{/each}
	</div>

	{#if results.length > 0}
		<ul class="border-border divide-border divide-y border-y">
			{#each results as tool (tool.slug)}
				{@const Glyph = categoryIcon(tool.category)}
				<li>
					<a
						href="/dev-tools/{tool.slug}"
						class="ease-craft hover:bg-muted focus-visible:ring-ring group flex min-h-16 items-center gap-4 px-2 py-3 transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none motion-reduce:transition-none sm:px-4"
					>
						<span
							class="border-border bg-card text-muted-foreground group-hover:text-primary flex size-10 shrink-0 items-center justify-center rounded-lg border"
						>
							<Glyph class="size-5" aria-hidden="true" />
						</span>
						<span class="min-w-0 flex-1">
							<span class="text-body text-foreground block font-medium">{tool.title}</span>
							<span class="text-body-sm text-muted-foreground line-clamp-1 block"
								>{tool.description}</span
							>
						</span>
						<IconArrowRight
							class="text-muted-foreground group-hover:text-foreground size-4 shrink-0"
							aria-hidden="true"
						/>
					</a>
				</li>
			{/each}
		</ul>
	{:else}
		<div class="border-border bg-card rounded-2xl border px-6 py-10 text-center">
			<p class="text-body text-foreground font-medium">
				Nothing matches {query.trim() ? `"${query.trim()}"` : "that filter"}
			</p>
			<p class="text-body-sm text-muted-foreground mt-2">
				All {devTools.length} tools run in the browser. Try a broader word, or clear the filter.
			</p>
			<button
				type="button"
				onclick={reset}
				class="text-body-sm text-primary focus-visible:ring-ring mt-4 inline-flex min-h-11 items-center font-medium underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:outline-none"
			>
				Clear search and filter
			</button>
		</div>
	{/if}
</div>

<script lang="ts">
	import { Badge } from "$lib/components/ui/badge";
	import type { ScoutTool } from "$lib/server/scout";
	import { getImages } from "$lib/scout";
	import { cn } from "$lib/utils";
	import ArrowUpRight from "@lucide/svelte/icons/arrow-up-right";
	import Hash from "@lucide/svelte/icons/hash";
	import Verified from "@lucide/svelte/icons/verified";
	import { decodeHTMLEntities } from "src/utils/string";

	type ViewMode = "grid" | "list";

	let {
		tool,
		view = "grid",
		class: className = ""
	}: {
		tool: ScoutTool;
		view?: ViewMode;
		class?: string;
	} = $props();

	const images = $derived(getImages(tool.link || ""));
	const isList = $derived(view === "list");
</script>

<a
	href={`/scout/tools/${tool.slug}`}
	class={cn(
		"group flex h-full rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5",
		isList ? "flex-row items-stretch" : "flex-col",
		className
	)}
>
	<div
		class={cn(
			"relative overflow-hidden bg-muted",
			isList ? "w-40 shrink-0 border-r border-border/50 md:w-56" : "aspect-video w-full border-b border-border/50"
		)}
	>
		<img
			src={images?.bannerURL || tool.coverImage || "/placeholder.png"}
			alt={decodeHTMLEntities(tool.name)}
			class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
			loading="lazy"
		/>

		{#if tool.verified}
			<div class="absolute top-2 right-2 rounded-full border border-border/50 bg-background/90 p-1.5 shadow-sm backdrop-blur-md">
				<Verified class="h-3.5 w-3.5 text-emerald-500" />
			</div>
		{/if}
	</div>

	<div class="flex flex-1 flex-col p-4">
		<div class="mb-2 flex items-start justify-between gap-2">
			<h3 class="line-clamp-1 text-base font-semibold text-foreground transition-colors group-hover:text-primary">
				{decodeHTMLEntities(tool.name)}
			</h3>
			<Badge
				variant="secondary"
				class={cn(
					"shrink-0 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider",
					tool.pricing_type === "free"
						? "border-emerald-500/20 bg-emerald-500/10 text-emerald-600"
						: "bg-muted text-muted-foreground"
				)}
			>
				{tool.pricing_type}
			</Badge>
		</div>

		<p class="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
			{tool.description}
		</p>

		<div class="mt-auto flex flex-wrap gap-1.5 pt-3">
			{#each (tool.categories ?? []).slice(0, 3) as category (category.slug)}
				<span
					class="inline-flex items-center gap-1 rounded-md border border-transparent bg-muted/50 px-2 py-1 text-xs text-muted-foreground transition-colors group-hover:border-border/50"
				>
					<Hash class="h-3 w-3 opacity-50" />
					{category.name}
				</span>
			{/each}
		</div>

		<div class="mt-3 flex items-center text-xs font-medium text-primary opacity-0 transition-all duration-300 group-hover:opacity-100">
			View details
			<ArrowUpRight class="ml-1 h-3 w-3" />
		</div>
	</div>
</a>


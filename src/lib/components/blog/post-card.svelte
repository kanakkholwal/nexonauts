<script lang="ts">
	import { Badge } from "$lib/components/ui/badge";
	import { cn } from "$lib/utils";
	import { decodeHTMLEntities } from "src/utils/string";
	import { format } from "date-fns";
	import ArrowUpRight from "@lucide/svelte/icons/arrow-up-right";
	import type { PostWithId } from "src/models/post";

	let {
		post,
		featured = false
	}: {
		post: PostWithId;
		featured?: boolean;
	} = $props();
</script>

<div
	class={cn(
		"group bg-card border-border/50 flex flex-col overflow-hidden rounded-xl border",
		"group-hover:border-primary/30 transition-all duration-300 group-hover:shadow-lg",
		featured ? "h-auto" : "h-full"
	)}
>
	<div class="relative aspect-video overflow-hidden">
		<img
			src={post.image || "/placeholder.svg"}
			alt={post.title}
			loading="lazy"
			class="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
		/>
		<div
			class="absolute inset-0 bg-linear-to-t from-black/70 to-transparent opacity-80"
		></div>
	</div>

	<div class={cn("flex flex-1 flex-col gap-2 p-4", featured && "md:p-6")}>
		<h3
			class={cn(
				"text-foreground line-clamp-2 font-semibold",
				featured ? "text-xl md:text-2xl" : "text-lg"
			)}
		>
			{decodeHTMLEntities(post.title)}
		</h3>

		<div class="mb-3 flex flex-wrap gap-2">
			{#each post.labels.slice(0, 2) as tag (tag)}
				<Badge variant="secondary" class="font-normal">{tag}</Badge>
			{/each}
		</div>

		<p
			class={cn(
				"text-muted-foreground mb-4 flex-1 text-pretty",
				featured ? "text-base md:text-lg" : "text-sm"
			)}
		>
			{(post.description ?? "").substring(0, featured ? 500 : 120)}…
		</p>

		<div class="mt-auto flex items-center justify-between">
			<span class="text-muted-foreground text-sm">
				{format(new Date(post.createdAt), "MMM dd, yyyy")}
			</span>
			<ArrowUpRight
				class="text-muted-foreground group-hover:text-primary h-4 w-4 transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1"
			/>
		</div>
	</div>
</div>

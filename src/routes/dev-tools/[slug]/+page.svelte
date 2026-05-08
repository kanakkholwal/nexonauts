<script lang="ts">
	import { Badge } from "$lib/components/ui/badge";
	import { Button } from "$lib/components/ui/button";
	import * as Card from "$lib/components/ui/card";
	import { Separator } from "$lib/components/ui/separator";
	import Sparkles from "@lucide/svelte/icons/sparkles";
	import Terminal from "@lucide/svelte/icons/terminal";

	let { data } = $props();
</script>

<svelte:head>
	<title>{data.tool.title} - Dev Tools</title>
</svelte:head>

<section class="space-y-8 py-12">
	<div class="space-y-3">
		<div class="flex items-center gap-3">
			<div class="bg-muted flex size-12 items-center justify-center rounded-xl">
				<Terminal class="text-muted-foreground size-6" />
			</div>
			<Badge variant="secondary" class="rounded-full">{data.tool.category}</Badge>
		</div>
		<h1 class="text-3xl font-bold tracking-tight">{data.tool.title}</h1>
		<p class="text-muted-foreground max-w-2xl text-base leading-relaxed">
			{data.tool.description}
		</p>
		{#if data.tool.tags.length}
			<div class="flex flex-wrap gap-1.5 pt-1">
				{#each data.tool.tags as tag (tag)}
					<span
						class="bg-muted text-muted-foreground rounded-full px-2 py-0.5 text-[11px] font-medium"
					>
						{tag}
					</span>
				{/each}
			</div>
		{/if}
	</div>

	<Separator />

	<div class="grid gap-6 lg:grid-cols-[1.4fr_0.8fr]">
		<Card.Root>
			<Card.Header>
				<Card.Title>Overview</Card.Title>
				<Card.Description>Current SvelteKit migration status for this tool.</Card.Description>
			</Card.Header>
			<Card.Content class="space-y-4">
				<p class="text-muted-foreground text-sm leading-relaxed">
					This route is live in SvelteKit and preserves the catalog metadata for the tool. The
					interactive browser implementation from the original Next.js app has not been ported yet,
					so this page currently serves as the canonical landing state during migration.
				</p>
				<p class="text-muted-foreground text-sm leading-relaxed">
					Tools in this collection depend on browser-only workflows such as file handling,
					transforms, and client-side processing. Those UIs need tool-by-tool Svelte rewrites rather
					than a direct framework translation.
				</p>
			</Card.Content>
		</Card.Root>

		<Card.Root>
			<Card.Header>
				<Card.Title>Next steps</Card.Title>
				<Card.Description>Where to go from here.</Card.Description>
			</Card.Header>
			<Card.Content class="space-y-3">
				<div class="flex items-center gap-2 text-sm">
					<Sparkles class="text-primary size-4" />
					<span>Catalog route is migrated</span>
				</div>
				<div class="flex items-center gap-2 text-sm">
					<Sparkles class="text-primary size-4" />
					<span>Interactive tool UI still pending</span>
				</div>
				<Button href="/dev-tools" variant="outline" class="w-full">Back to all tools</Button>
			</Card.Content>
		</Card.Root>
	</div>
</section>

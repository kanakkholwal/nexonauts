<script lang="ts">
	import { Badge } from "$lib/components/ui/badge";
	import { Separator } from "$lib/components/ui/separator";
	import Construction from "@lucide/svelte/icons/construction";
	import Terminal from "@lucide/svelte/icons/terminal";

	let { data } = $props();
</script>

<svelte:head>
	<title>{data.tool.title} — Dev Tools</title>
</svelte:head>

<section class="space-y-8 py-12">
	<div class="space-y-3">
		<div class="flex items-center gap-3">
			<div
				class="bg-muted flex size-12 items-center justify-center rounded-xl"
			>
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

	<div class="bg-card flex flex-col items-start gap-3 rounded-2xl border p-8">
		<Construction class="text-muted-foreground size-8" />
		<h2 class="text-lg font-semibold">Tool UI being migrated</h2>
		<p class="text-muted-foreground max-w-prose text-sm leading-relaxed">
			This dev tool's UI is being ported from Next.js to SvelteKit. The legacy implementation lives
			at
			<code class="rounded bg-muted px-1 py-0.5 text-xs">_legacy/app/dev-tools/(tools)/collection/{data.tool.slug}/</code>
			and uses browser APIs (canvas, FileReader, pdf-lib, etc.) that need a per-tool rewrite to
			Svelte 5 runes.
		</p>
		<a
			href="/dev-tools"
			class="text-primary text-sm font-medium hover:underline"
		>
			← Back to all tools
		</a>
	</div>
</section>

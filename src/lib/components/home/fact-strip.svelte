<script lang="ts">
type Props = { items: string[] };
let { items }: Props = $props();
</script>

<!-- Quiet by design: it sits directly under the panel and the one primary
     action, so an inverted band here would compete with both. No marquee. -->
<div class="border-border bg-paper border-b">
	<ul
		class="text-caption text-muted-foreground mx-auto flex max-w-7xl flex-wrap items-center gap-x-6 gap-y-2 px-6 py-3 font-mono tracking-wide uppercase sm:px-10"
	>
		{#each items as item, i (item)}
			<li class="flex items-center gap-6">
				{#if i > 0}
					<span aria-hidden="true" class="bg-border-strong size-1 rounded-full"></span>
				{/if}
				{item}
			</li>
		{/each}
	</ul>
</div>

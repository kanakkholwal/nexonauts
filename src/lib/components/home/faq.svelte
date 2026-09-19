<script lang="ts">
import IconPlus from "@tabler/icons-svelte/icons/plus";

type Item = { q: string; a: string };
type Props = { items: Item[] };
let { items }: Props = $props();
</script>

<!-- Native details with a shared name, so one answer is open at a time and the
     page reads with JavaScript off. -->
<div class="grid gap-3" data-motion="faq">
	{#each items as item, i (item.q)}
		<details
			name="faq"
			open={i === 0}
			class="group rounded-card border border-border bg-card open:border-border-strong"
		>
			<summary
				class="flex cursor-pointer list-none items-center justify-between gap-4 rounded-card px-5 py-4 text-body font-medium text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none [&::-webkit-details-marker]:hidden"
			>
				{item.q}
				<IconPlus
					class="size-4 shrink-0 text-muted-foreground transition-transform duration-(--duration-ui) ease-(--ease-out) group-open:rotate-45"
					aria-hidden="true"
				/>
			</summary>
			<p class="max-w-[64ch] px-5 pb-5 text-body text-pretty text-muted-foreground">{item.a}</p>
		</details>
	{/each}
</div>

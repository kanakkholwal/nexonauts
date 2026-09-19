<script lang="ts">
import Plus from "@tabler/icons-svelte/icons/plus";
import * as Accordion from "$lib/components/ui/accordion";

// One open at a time, first row open on load so the affordance reads without a
// click. Plus-rotate is the only affordance: no card, no chevron column.
let { items }: { items: Array<{ q: string; a: string }> } = $props();
</script>

<Accordion.Root
	type="single"
	value={items[0]?.q}
	class="divide-y divide-border border-y border-border"
>
	{#each items as item (item.q)}
		<Accordion.Item value={item.q} class="group/faq border-b-0">
			<Accordion.Trigger
				class="flex w-full items-center justify-between gap-6 py-5 text-left text-body font-medium text-foreground hover:no-underline **:data-[slot=accordion-trigger-icon]:hidden"
			>
				{item.q}
				<Plus
					class="ease-fluid size-4 shrink-0 text-muted-foreground transition-transform duration-200 group-data-[state=open]/faq:rotate-45 motion-reduce:transition-none"
				/>
			</Accordion.Trigger>
			<Accordion.Content class="max-w-2xl pr-10 pb-5 text-body-sm text-muted-foreground">
				{item.a}
			</Accordion.Content>
		</Accordion.Item>
	{/each}
</Accordion.Root>

<script lang="ts">
import IconPlus from "@tabler/icons-svelte/icons/plus";
import * as Accordion from "$lib/components/ui/accordion";

type Props = { items: Array<{ q: string; a: string }> };
let { items }: Props = $props();
</script>

<!-- Numbered to match the register above it. One open at a time, none open on
     load: the numbers already show how much there is to read. -->
<Accordion.Root type="single" class="border-border border-t">
	{#each items as item, i (item.q)}
		<Accordion.Item value={item.q} class="group/faq border-border border-b">
			<Accordion.Trigger
				class="text-body text-foreground flex w-full items-start gap-4 py-5 text-left font-medium hover:no-underline sm:gap-8 **:data-[slot=accordion-trigger-icon]:hidden"
			>
				<span class="text-caption text-muted-foreground w-6 shrink-0 pt-1 font-mono tabular-nums">
					{String(i + 1).padStart(2, "0")}
				</span>
				<span class="flex-1">{item.q}</span>
				<IconPlus
					class="ease-fluid text-muted-foreground mt-1 size-4 shrink-0 transition-transform duration-200 group-data-[state=open]/faq:rotate-45 motion-reduce:transition-none"
				/>
			</Accordion.Trigger>
			<Accordion.Content
				class="text-body-sm text-muted-foreground max-w-2xl pb-5 sm:pl-14 md:pr-10"
			>
				{item.a}
			</Accordion.Content>
		</Accordion.Item>
	{/each}
</Accordion.Root>

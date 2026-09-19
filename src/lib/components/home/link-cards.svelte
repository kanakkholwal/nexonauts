<script lang="ts">
import IconArrowUpRight from "@tabler/icons-svelte/icons/arrow-up-right";
import IconChevronRight from "@tabler/icons-svelte/icons/chevron-right";

type Card = { title: string; line: string; href: string; external?: boolean };
type Props = { cards: Card[] };
let { cards }: Props = $props();
</script>

<ul class="grid gap-4 md:grid-cols-3" data-motion="cards">
	{#each cards as card (card.href)}
		<li>
			<a
				href={card.href}
				target={card.external ? "_blank" : undefined}
				rel={card.external ? "noopener noreferrer" : undefined}
				class="group flex h-full flex-col gap-2 rounded-card border border-border bg-card p-7 md:p-8 transition-[border-color,transform] duration-(--duration-ui) ease-(--ease-out) hover:border-border-control focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none motion-safe:hover:-translate-y-0.5"
			>
				<span class="flex items-center justify-between font-heading text-heading-sm font-medium text-foreground">
					{card.title}
					{#if card.external}
						<IconArrowUpRight class="size-4 text-muted-foreground" aria-hidden="true" />
					{:else}
						<IconChevronRight
							class="size-4 text-muted-foreground transition-transform duration-(--duration-ui) ease-(--ease-out) group-hover:translate-x-0.5"
							aria-hidden="true"
						/>
					{/if}
				</span>
				<span class="text-body-sm text-muted-foreground">{card.line}</span>
			</a>
		</li>
	{/each}
</ul>

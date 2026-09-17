<script lang="ts">
import IconArrowRight from "@tabler/icons-svelte/icons/arrow-right";
import { cn } from "$lib/utils";

type Item = { label: string; body?: string; meta?: string; href?: string };
type Props = {
	items: Item[];
	/** Mono label column, for package names and other literal strings. */
	mono?: boolean;
	class?: string;
};

let { items, mono = false, class: className }: Props = $props();
</script>

<ul class={cn("border-border border-t", className)}>
	{#each items as item (item.label)}
		<li class="border-border border-b">
			<svelte:element
				this={item.href ? "a" : "div"}
				href={item.href}
				class={cn(
					"flex items-baseline justify-between gap-6 py-4",
					item.href &&
						"group hover:text-primary focus-visible:ring-ring rounded-sm focus-visible:ring-2 focus-visible:outline-none"
				)}
			>
				<div class="min-w-0">
					<span
						class={cn(
							"text-body text-foreground font-medium",
							item.href && "group-hover:text-primary",
							mono && "font-mono"
						)}
					>
						{item.label}
					</span>
					{#if item.body}
						<p class="text-body-sm text-muted-foreground mt-1 text-pretty">{item.body}</p>
					{/if}
				</div>

				<div class="flex shrink-0 items-center gap-4">
					{#if item.meta}
						<span class="text-caption text-muted-foreground font-mono whitespace-nowrap">
							{item.meta}
						</span>
					{/if}
					{#if item.href}
						<IconArrowRight
							class="text-border-strong group-hover:text-primary size-4"
							aria-hidden="true"
						/>
					{/if}
				</div>
			</svelte:element>
		</li>
	{/each}
</ul>

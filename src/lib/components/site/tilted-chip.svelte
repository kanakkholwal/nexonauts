<script lang="ts">
import IconCheck from "@tabler/icons-svelte/icons/check";
import type { Snippet } from "svelte";
import { cn } from "$lib/utils";

type Props = {
	label?: string;
	/** Omit the trailing glyph tile for a plain label chip. */
	glyph?: boolean;
	class?: string;
	children?: Snippet;
};

let { label, glyph = true, class: className, children }: Props = $props();
</script>

<!-- At most two per view. See .notes/DESIGN.md. -->
<span
	class={cn(
		"border-border text-caption text-foreground flex w-fit -rotate-2 items-center gap-2",
		"rounded-md border p-0.5 pl-2.5 font-semibold",
		className
	)}
>
	{#if children}{@render children()}{:else}{label}{/if}
	{#if glyph}
		<span class="border-border bg-background rounded-sm border p-1">
			<IconCheck class="size-3.5" aria-hidden="true" />
		</span>
	{/if}
</span>

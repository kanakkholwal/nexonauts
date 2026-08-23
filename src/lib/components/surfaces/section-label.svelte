<script lang="ts">
import type { IconComponentProps } from "phosphor-svelte";
import type { Component } from "svelte";
import { cn } from "$lib/utils";

/**
 * The one section eyebrow. Icon plus label at body-sm in full ink, not an
 * uppercase letter-spaced micro-pill.
 *
 * The icon is duotone in a neutral: a glyph that only labels a heading is not
 * an accent, and `--primary` is reserved for links, focus and active state.
 */
let {
	icon: Icon,
	label,
	class: className = ""
}: {
	icon?: Component<IconComponentProps>;
	label: string;
	class?: string;
} = $props();
</script>

<span
	class={cn(
		"inline-flex items-center gap-2 text-body-sm font-medium text-foreground",
		className
	)}
>
	{#if Icon}
		<Icon class="size-4 shrink-0 text-muted-foreground" weight="duotone" />
	{/if}
	{label}
</span>

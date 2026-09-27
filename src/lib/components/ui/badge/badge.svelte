<script lang="ts">
import type { Snippet } from "svelte";
import { cn } from "$lib/cn";
import { type BadgeSize, type BadgeVariant, badge } from "./variants";

type Props = {
	children?: Snippet;
	class?: string;
	variant?: BadgeVariant;
	size?: BadgeSize;
	dot?: boolean;
};

let { children, class: classProp, variant, size, dot = false }: Props = $props();
</script>

<span class={cn(badge({ variant, size }), classProp)} data-variant={variant}>
	{#if dot}<span class="size-1.5 shrink-0 rounded-full bg-current"></span>{/if}
	{@render children?.()}
</span>

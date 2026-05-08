<script lang="ts">
	import { cn } from "$lib/utils";
	import type { Snippet } from "svelte";

	type Props = {
		title: string;
		icon?: Snippet;
		children: Snippet;
		class?: string;
	};

	let { title, icon, children, class: className }: Props = $props();
</script>

<div
	class={cn(
		"bg-card border-border/60 flex flex-col gap-2 rounded-2xl border p-5 shadow-sm",
		className
	)}
>
	<div class="text-muted-foreground flex items-center text-sm font-medium">
		{#if icon}{@render icon()}{/if}
		{title}
	</div>
	{@render children()}
</div>

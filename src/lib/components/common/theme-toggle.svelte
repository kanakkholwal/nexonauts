<script lang="ts">
import Moon from "@tabler/icons-svelte/icons/moon";
import Sun from "@tabler/icons-svelte/icons/sun";
import { theme } from "$lib/theme.svelte";
import { cn } from "$lib/utils";

let { class: className }: { class?: string } = $props();
</script>

<button
	type="button"
	onclick={() => theme.toggle()}
	aria-label={theme.current === "dark" ? "Switch to light theme" : "Switch to dark theme"}
	class={cn(
		"inline-flex size-9 shrink-0 items-center justify-center rounded-lg text-muted-foreground",
		"transition-colors duration-(--duration-ui) ease-(--ease-out) hover:bg-paper hover:text-foreground motion-reduce:transition-none",
		"focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
		className
	)}
>
	{#if theme.current === "dark"}
		<Sun class="size-4" />
	{:else}
		<Moon class="size-4" />
	{/if}
</button>

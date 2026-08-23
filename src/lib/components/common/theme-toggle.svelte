<script lang="ts">
import Moon from "phosphor-svelte/lib/Moon";
import Sun from "phosphor-svelte/lib/Sun";
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
		"transition-colors duration-200 ease-fluid hover:bg-paper hover:text-foreground",
		"focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:outline-none",
		className
	)}
>
	{#if theme.current === "dark"}
		<Sun class="size-4" />
	{:else}
		<Moon class="size-4" />
	{/if}
</button>

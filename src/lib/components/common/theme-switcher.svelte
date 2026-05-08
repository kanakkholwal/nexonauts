<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import { setMode, mode } from "mode-watcher";
	import SunIcon from "@lucide/svelte/icons/sun";
	import MoonIcon from "@lucide/svelte/icons/moon";

	function toggle() {
		setMode(mode.current === "dark" ? "light" : "dark");
	}
</script>

<Button
	variant="ghost"
	size="icon-sm"
	class="switcher group rounded-full"
	aria-label="switch theme"
	onclick={toggle}
>
	{#if mode.current === "dark"}
		<SunIcon class="size-4 transition-transform duration-300 group-hover:rotate-180" />
	{:else}
		<MoonIcon class="size-4 transition-transform duration-300 group-hover:-rotate-90" />
	{/if}
</Button>

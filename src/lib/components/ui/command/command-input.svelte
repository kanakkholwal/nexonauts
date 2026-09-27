<script lang="ts">
import { Command as CommandPrimitive } from "bits-ui";
import { cn } from "$lib/cn";
import { getCommand } from "./context";

let {
	placeholder = "Type a command or search…",
	class: classProp,
	...rest
}: CommandPrimitive.InputProps = $props();

const command = getCommand();
let spoken = $state("");

// Debounced so a live region does not narrate every keystroke, only where it settles.
$effect(() => {
	const count = command.resultCount;
	const timer = setTimeout(() => {
		spoken =
			count === 0
				? "No commands match."
				: `${count} ${count === 1 ? "command" : "commands"} available.`;
	}, 400);
	return () => clearTimeout(timer);
});
</script>

<div class="flex shrink-0 items-center gap-2 border-border border-b px-3">
	<svg
		viewBox="0 0 16 16"
		fill="none"
		aria-hidden="true"
		class="size-4 shrink-0 text-muted-foreground"
	>
		<circle cx="7.2" cy="7.2" r="4.2" stroke="currentColor" stroke-width="1.4" />
		<path d="m10.4 10.4 3 3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" />
	</svg>
	<CommandPrimitive.Input
		autofocus
		data-slot="command-input"
		{placeholder}
		class={cn(
			"h-12 w-full bg-transparent text-foreground text-sm outline-none placeholder:text-muted-foreground",
			classProp,
		)}
		{...rest}
	/>
	<span
		class="min-w-[2ch] shrink-0 text-right font-mono text-[11px] text-muted-foreground tabular-nums"
		aria-hidden="true"
	>
		{command.resultCount}
	</span>
	<span role="status" aria-live="polite" class="sr-only">{spoken}</span>
</div>

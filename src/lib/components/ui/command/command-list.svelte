<script lang="ts">
import { Command as CommandPrimitive } from "bits-ui";
import { cn } from "$lib/cn";
import { COMMAND_MARKER, getCommand } from "./context";

let { class: classProp, children, ...rest }: CommandPrimitive.ListProps = $props();

const command = getCommand();
let el = $state<HTMLDivElement | null>(null);
let box = $state<{ x: number; y: number; w: number; h: number }>();

$effect(() => {
	void command.activeValue;
	const row = el?.querySelector<HTMLElement>("[data-selected]");
	box = row
		? { x: row.offsetLeft, y: row.offsetTop, w: row.offsetWidth, h: row.offsetHeight }
		: undefined;
});
</script>

<CommandPrimitive.List
	bind:ref={el}
	data-slot="command-list"
	class={cn(
		"scroll-area relative min-h-0 flex-1 overflow-y-auto overscroll-contain py-1.5",
		classProp,
	)}
	{...rest}
>
	{#if box}
		<span
			aria-hidden="true"
			class={COMMAND_MARKER}
			style:translate="{box.x}px {box.y}px"
			style:width="{box.w}px"
			style:height="{box.h}px"
		></span>
	{/if}
	{@render children?.()}
</CommandPrimitive.List>

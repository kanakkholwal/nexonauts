<script lang="ts">
import { Command as CommandPrimitive } from "bits-ui";
import type { Snippet } from "svelte";
import { cn } from "$lib/cn";
import { getCommandDialogState, setCommand } from "./context";
import { commandFrame } from "./variants";

let {
	children,
	value = $bindable(""),
	class: classProp,
	...rest
}: Omit<CommandPrimitive.RootProps, "value" | "onStateChange"> & {
	value?: string;
} = $props();

let resultCount = $state(0);
const dialogState = getCommandDialogState();
const variant = $derived(dialogState?.variant ?? "default");

setCommand({
	get resultCount() {
		return resultCount;
	},
	get activeValue() {
		return value;
	},
});
</script>

<CommandPrimitive.Root
	bind:value
	onStateChange={(state) => {
		resultCount = state.filtered.count;
	}}
	data-slot="command"
	data-variant={variant}
	class={cn(
		"relative flex min-h-0 flex-col overflow-hidden text-foreground",
		commandFrame({ variant }).body(),
		classProp,
	)}
	{...rest}
>
	{@render children?.()}
</CommandPrimitive.Root>

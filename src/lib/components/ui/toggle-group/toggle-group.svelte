<script lang="ts">
import { ToggleGroup as ToggleGroupPrimitive } from "bits-ui";
import type { Snippet } from "svelte";
import { cn } from "$lib/cn";
import { setToggleGroup, type ToggleGroupSize } from "./context";

let {
	children,
	value = $bindable<string | string[]>(""),
	type = "single",
	size = "md",
	disabled = false,
	label = "Options",
	class: classProp,
	...rest
}: {
	children?: Snippet;
	value?: string | string[];
	type?: "single" | "multiple";
	size?: ToggleGroupSize;
	disabled?: boolean;
	label?: string;
	class?: string;
} = $props();

setToggleGroup({
	get size() {
		return size;
	},
});

const rootClass = $derived(
	cn(
		"inline-flex items-center gap-0.5 rounded-xl border border-border bg-card p-1",
		disabled && "opacity-50",
		classProp,
	),
);
</script>

<!-- bits-ui's type/value form a discriminated union that can't narrow from a runtime variable. -->
{#if type === "multiple"}
	<ToggleGroupPrimitive.Root
		type="multiple"
		bind:value={value as string[]}
		{disabled}
		data-slot="toggle-group"
		aria-label={label}
		class={rootClass}
		{...rest}
	>
		{@render children?.()}
	</ToggleGroupPrimitive.Root>
{:else}
	<ToggleGroupPrimitive.Root
		type="single"
		bind:value={value as string}
		{disabled}
		data-slot="toggle-group"
		aria-label={label}
		class={rootClass}
		{...rest}
	>
		{@render children?.()}
	</ToggleGroupPrimitive.Root>
{/if}

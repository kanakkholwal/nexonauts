<script lang="ts">
import { Accordion as AccordionPrimitive } from "bits-ui";
import type { Snippet } from "svelte";
import { cn } from "$lib/cn";

let {
	children,
	type = "single",
	collapsible: _collapsible,
	value = $bindable(),
	onValueChange,
	class: classProp,
	...rest
}: {
	children?: Snippet;
	type?: "single" | "multiple";
	/** Ignored: bits-ui's single mode always allows closing the open item. Kept so
	 * existing callers passing `collapsible={false}` still compile. */
	collapsible?: boolean;
	value?: string | string[];
	onValueChange?: (value: string | string[]) => void;
	class?: string;
} = $props();
</script>

<AccordionPrimitive.Root
	{...rest}
	type={type as "single"}
	bind:value={value as string}
	onValueChange={onValueChange as (value: string) => void}
	data-slot="accordion"
	class={cn(
		"divide-y divide-border overflow-hidden rounded-xl border border-border",
		classProp,
	)}
>
	{@render children?.()}
</AccordionPrimitive.Root>

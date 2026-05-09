<!-- @migration-task Error while migrating Svelte code: Can only bind to an Identifier or MemberExpression or a `{get, set}` pair
https://svelte.dev/e/bind_invalid_expression -->
<script lang="ts">
	import { Accordion as AccordionPrimitive } from "bits-ui";
	import { cn } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		value = $bindable(),
		class: className,
		...restProps
	}: AccordionPrimitive.RootProps = $props();
</script>

<AccordionPrimitive.Root
	bind:ref
	bind:value={value as never}
	data-slot="accordion"
	class={cn("cn-accordion flex w-full flex-col", className)}
	{...restProps}
/>

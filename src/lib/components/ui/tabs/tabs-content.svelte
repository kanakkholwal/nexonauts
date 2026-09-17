<script lang="ts">
import { Tabs as TabsPrimitive } from "bits-ui";
import { cn } from "$lib/utils.js";

let {
	ref = $bindable(null),
	class: className,
	...restProps
}: TabsPrimitive.ContentProps = $props();
</script>

<TabsPrimitive.Content
	bind:ref
	data-slot="tabs-content"
	class={cn(
		// bits-ui puts this panel in the tab order, so it needs a visible indicator.
		"text-body-sm flex-1 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
		className
	)}
	{...restProps}
/>

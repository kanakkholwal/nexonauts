<script lang="ts">
import { Tooltip as TooltipPrimitive } from "bits-ui";
import { ANCHORED } from "$lib/anchor";
import { cn } from "$lib/cn";

let {
	class: classProp,
	side = "top",
	sideOffset = 6,
	...rest
}: TooltipPrimitive.ContentProps = $props();
</script>

<TooltipPrimitive.Portal>
	<TooltipPrimitive.Content
		{side}
		{sideOffset}
		{...rest}
		data-slot="tooltip-content"
		class={cn(
			ANCHORED,
			"static z-50 rounded-md border border-border bg-popover px-2 py-1 text-foreground text-xs shadow-lg",
			"data-[state=open]:pointer-events-none",
			classProp,
		)}
	/>
</TooltipPrimitive.Portal>

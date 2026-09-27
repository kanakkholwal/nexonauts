<script lang="ts">
import { Select as SelectPrimitive } from "bits-ui";
import { UNFOLD } from "$lib/anchor";
import { cn } from "$lib/cn";

let {
	class: classProp,
	children,
	sideOffset = 6,
	...rest
}: SelectPrimitive.ContentProps = $props();
</script>

<SelectPrimitive.Portal>
	<SelectPrimitive.Content
		{sideOffset}
		{...rest}
		data-slot="select-content"
		class={cn(
			UNFOLD,
			"static z-50 max-h-[min(16rem,var(--bits-select-content-available-height))] w-[var(--bits-select-anchor-width)] overflow-x-hidden overflow-y-auto",
			"scroll-area rounded-xl border border-border bg-popover p-1 shadow-2xl",
			classProp,
		)}
	>
		<SelectPrimitive.Viewport>
			{@render children?.()}
		</SelectPrimitive.Viewport>
	</SelectPrimitive.Content>
</SelectPrimitive.Portal>

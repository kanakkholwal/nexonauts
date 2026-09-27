<script lang="ts">
import { Dialog as SheetPrimitive } from "bits-ui";
import { DIALOG_BACKDROP } from "$lib/components/ui/dialog/context";
import { cn } from "$lib/cn";
import { type SheetSide, sheetPanel } from "./variants";

let {
	class: classProp,
	side = "right",
	ref = $bindable(null),
	...rest
}: SheetPrimitive.ContentProps & { side?: SheetSide } = $props();
</script>

<SheetPrimitive.Portal>
	<SheetPrimitive.Overlay data-slot="sheet-backdrop" class={DIALOG_BACKDROP} />
	<SheetPrimitive.Content
		bind:ref
		{...rest}
		data-slot="sheet-content"
		data-side={side}
		class={cn(sheetPanel({ side }), classProp)}
	/>
</SheetPrimitive.Portal>

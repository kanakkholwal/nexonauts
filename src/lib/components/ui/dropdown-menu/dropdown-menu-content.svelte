<script lang="ts">
import { DropdownMenu as DropdownMenuPrimitive } from "bits-ui";
import { stagger, UNFOLD } from "$lib/anchor";
import { cn } from "$lib/cn";
import { MENU_SURFACE } from "$lib/menu";

let {
	class: classProp,
	sideOffset = 4,
	align = "start",
	ref = $bindable(null),
	...rest
}: DropdownMenuPrimitive.ContentProps = $props();

$effect(() => {
	if (ref) stagger(ref.querySelectorAll<HTMLElement>("[role='menuitem']"));
});
</script>

<DropdownMenuPrimitive.Portal>
	<DropdownMenuPrimitive.Content
		bind:ref
		{sideOffset}
		{align}
		{...rest}
		data-slot="dropdown-menu-content"
		class={cn(UNFOLD, "static", MENU_SURFACE, classProp)}
	/>
</DropdownMenuPrimitive.Portal>

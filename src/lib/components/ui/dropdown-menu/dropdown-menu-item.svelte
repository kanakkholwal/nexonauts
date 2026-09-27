<script lang="ts">
import { DropdownMenu as DropdownMenuPrimitive } from "bits-ui";
import { UNFOLD_ITEM } from "$lib/anchor";
import { cn } from "$lib/cn";
import { menuItem } from "$lib/menu";

let {
	class: classProp,
	destructive = false,
	inset = false,
	...rest
}: DropdownMenuPrimitive.ItemProps & {
	destructive?: boolean;
	inset?: boolean;
} = $props();

const variant = $derived(destructive ? "destructive" : "default");
</script>

<DropdownMenuPrimitive.Item
	{...rest}
	data-slot="dropdown-menu-item"
	data-inset={inset || undefined}
	class={cn(UNFOLD_ITEM, menuItem({ variant }), classProp)}
/>

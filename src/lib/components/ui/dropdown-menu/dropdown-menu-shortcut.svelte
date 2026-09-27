<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import { cn } from "$lib/cn";
import { MENU_SHORTCUT } from "$lib/menu";

let {
	children,
	class: classProp,
	...rest
}: { children?: Snippet; class?: string } & HTMLAttributes<HTMLElement> = $props();
</script>

<kbd {...rest} data-slot="dropdown-menu-shortcut" class={cn(MENU_SHORTCUT, classProp)}>
	{@render children?.()}
</kbd>

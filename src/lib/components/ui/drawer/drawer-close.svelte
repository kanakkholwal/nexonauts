<script lang="ts">
import type { Snippet } from "svelte";
import { Drawer } from "vaul-svelte";
import { cn } from "$lib/cn";

let {
	children,
	class: classProp,
	...rest
}: { children?: Snippet; class?: string } & Omit<
	Drawer.CloseProps,
	"children"
> = $props();

const ICON_ONLY =
	"absolute top-3 right-3 grid size-8 place-items-center rounded-md text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring";
</script>

<Drawer.Close
	data-slot="drawer-close"
	aria-label={children ? undefined : "Close"}
	class={cn(!children && ICON_ONLY, classProp)}
	{...rest}
>
	{#if children}
		{@render children()}
	{:else}
		<svg viewBox="0 0 16 16" fill="none" aria-hidden="true" class="size-4">
			<path d="m4 4 8 8M12 4l-8 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
		</svg>
	{/if}
</Drawer.Close>

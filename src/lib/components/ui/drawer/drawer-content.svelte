<script lang="ts">
import type { Snippet } from "svelte";
import { Drawer } from "vaul-svelte";
import { cn } from "$lib/cn";
import { DRAWER_CONTENT, getDrawer, HANDLE_BAR_SIDES, HANDLE_SIDES } from "./context";
import { type DrawerVariant, drawerFrame } from "./variants";

let {
	children,
	class: classProp,
	handle = true,
	variant = "default",
	...rest
}: {
	children?: Snippet;
	class?: string;
	/** Hide the drag handle; only sensible with `dismissible={false}`. */
	handle?: boolean;
	variant?: DrawerVariant;
} & Omit<Drawer.ContentProps, "children"> = $props();

const drawer = getDrawer();
const frame = $derived(drawerFrame({ variant }));
</script>

<Drawer.Portal>
	<Drawer.Overlay
		data-slot="drawer-overlay"
		class="fixed inset-0 z-50 bg-black/40 backdrop-blur-[2px]"
	/>
	<!-- The frame is the rim (`framed`) or the surface itself (`default`). -->
	<Drawer.Content
		data-slot="drawer-content"
		data-variant={variant}
		class={cn(
			"group/drawer fixed z-50 flex flex-col text-foreground",
			frame.panel(),
			DRAWER_CONTENT[drawer.direction],
			classProp,
		)}
		{...rest}
	>
		{#if handle}
			{#if variant === "framed"}
				<Drawer.Handle
					class={cn(
						"shrink-0 cursor-grab! rounded-full! bg-muted-foreground/40! opacity-100! active:cursor-grabbing!",
						HANDLE_SIDES[drawer.direction],
					)}
				/>
			{:else}
				<div
					aria-hidden="true"
					class={cn(
						"shrink-0 cursor-grab rounded-full bg-muted active:cursor-grabbing",
						HANDLE_BAR_SIDES[drawer.direction],
					)}
				></div>
			{/if}
		{/if}
		<!-- data-vaul-no-drag: dragging should only start from the rail, not anywhere in the
		body, since vaul otherwise treats the whole panel as a drag target. -->
		<div data-slot="drawer-surface" data-vaul-no-drag class={frame.surface()}>
			{@render children?.()}
		</div>
	</Drawer.Content>
</Drawer.Portal>

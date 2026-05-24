<script lang="ts">
	import { NavigationMenu as NavigationMenuPrimitive } from "bits-ui";
	import { cn } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: NavigationMenuPrimitive.ViewportProps = $props();
</script>

<div class={cn("absolute inset-s-0 top-full isolate z-50 flex justify-center")}>
	<NavigationMenuPrimitive.Viewport
		bind:ref
		data-slot="navigation-menu-viewport"
		class={cn(
			"bg-popover text-popover-foreground border border-hairline shadow-(--shadow-elevation-2)",
			"data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-open:slide-in-from-top-1",
			"data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 data-closed:slide-out-to-top-1",
			"duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] origin-top-center",
			"rounded-xl relative mt-2 h-[calc(var(--bits-navigation-menu-viewport-height)+1rem)] w-full overflow-hidden md:w-[calc(var(--bits-navigation-menu-viewport-width)+1rem)]",
			className
		)}
		{...restProps}
	/>
</div>

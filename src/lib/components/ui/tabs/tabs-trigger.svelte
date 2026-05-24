<script lang="ts">
	import { Tabs as TabsPrimitive } from "bits-ui";
	import { cn } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: TabsPrimitive.TriggerProps = $props();
</script>

<TabsPrimitive.Trigger
	bind:ref
	data-slot="tabs-trigger"
	class={cn(
		"relative inline-flex flex-1 items-center justify-center whitespace-nowrap gap-1.5 py-1.5 px-3.5 text-sm font-medium",
		"font-sans tracking-[0.01em] text-muted-ink hover:text-ink",
		"transition-all outline-none focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
		"disabled:pointer-events-none disabled:opacity-50",
		"[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
		// Default & pill: fill-on-active capsule
		"group-data-[variant=default]/tabs-list:rounded-pill group-data-[variant=pill]/tabs-list:rounded-pill",
		"group-data-[variant=default]/tabs-list:data-active:bg-card group-data-[variant=default]/tabs-list:data-active:text-ink group-data-[variant=default]/tabs-list:data-active:shadow-(--shadow-elevation-1)",
		"group-data-[variant=pill]/tabs-list:data-active:bg-primary group-data-[variant=pill]/tabs-list:data-active:text-primary-foreground",
		// Line: underline-on-active
		"group-data-[variant=line]/tabs-list:px-1 group-data-[variant=line]/tabs-list:py-2.5 group-data-[variant=line]/tabs-list:rounded-none",
		"group-data-[variant=line]/tabs-list:data-active:text-ink",
		"after:absolute after:opacity-0 after:transition-opacity after:bg-ink",
		"group-data-[orientation=horizontal]/tabs:after:inset-x-0 group-data-[orientation=horizontal]/tabs:after:-bottom-px group-data-[orientation=horizontal]/tabs:after:h-[2px]",
		"group-data-[orientation=vertical]/tabs:after:inset-y-0 group-data-[orientation=vertical]/tabs:after:-right-1 group-data-[orientation=vertical]/tabs:after:w-[2px]",
		"group-data-[variant=line]/tabs-list:data-active:after:opacity-100",
		// Vertical orientation
		"group-data-[orientation=vertical]/tabs:w-full group-data-[orientation=vertical]/tabs:justify-start",
		className
	)}
	{...restProps}
/>

<script lang="ts" module>
	import { tv, type VariantProps } from "tailwind-variants";

	export const tabsListVariants = tv({
		base: "rounded-pill p-1 group-data-horizontal/tabs:h-9 data-[variant=line]:rounded-none data-[variant=line]:p-0 data-[variant=pill]:rounded-pill group/tabs-list text-muted-foreground inline-flex w-fit items-center justify-center group-data-[orientation=vertical]/tabs:h-fit group-data-[orientation=vertical]/tabs:flex-col",
		variants: {
			variant: {
				default: "cn-tabs-list-variant-default bg-surface-strong",
				pill: "cn-tabs-list-variant-pill bg-surface-strong",
				line: "cn-tabs-list-variant-line gap-4 bg-transparent border-b border-hairline",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	});

	export type TabsListVariant = VariantProps<typeof tabsListVariants>["variant"];
</script>

<script lang="ts">
	import { Tabs as TabsPrimitive } from "bits-ui";
	import { cn } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		variant = "default",
		class: className,
		...restProps
	}: TabsPrimitive.ListProps & {
		variant?: TabsListVariant;
	} = $props();
</script>

<TabsPrimitive.List
	bind:ref
	data-slot="tabs-list"
	data-variant={variant}
	class={cn(tabsListVariants({ variant }), className)}
	{...restProps}
/>

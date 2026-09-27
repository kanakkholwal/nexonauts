<script lang="ts">
import { Command as CommandPrimitive, useId } from "bits-ui";
import { cn } from "$lib/cn";

let {
	children,
	heading,
	value,
	class: classProp,
	...rest
}: Omit<CommandPrimitive.GroupProps, "value"> & {
	heading?: string;
	value?: string;
} = $props();
</script>

<CommandPrimitive.Group
	value={value ?? heading ?? `----${useId()}`}
	data-slot="command-group"
	class={classProp}
	{...rest}
>
	{#if heading}
		<CommandPrimitive.GroupHeading
			class="px-4 pt-2 pb-1 font-semibold text-[11px] text-muted-foreground uppercase tracking-wider"
		>
			{heading}
		</CommandPrimitive.GroupHeading>
	{/if}
	<CommandPrimitive.GroupItems class="px-1.5">
		{@render children?.()}
	</CommandPrimitive.GroupItems>
</CommandPrimitive.Group>

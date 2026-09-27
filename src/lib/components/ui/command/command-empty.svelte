<script lang="ts">
import { Command as CommandPrimitive } from "bits-ui";
import { cn } from "$lib/cn";

let { children, class: classProp, ...rest }: CommandPrimitive.EmptyProps = $props();
</script>

<CommandPrimitive.Empty
	data-slot="command-empty"
	class={cn("px-4 py-10 text-center text-muted-foreground text-sm", classProp)}
	{...rest}
>
	{@render children?.()}
</CommandPrimitive.Empty>

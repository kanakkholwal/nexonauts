<script lang="ts">
import { Command as CommandPrimitive } from "bits-ui";
import { cn } from "$lib/cn";

let { class: classProp, ...rest }: CommandPrimitive.SeparatorProps = $props();
</script>

<CommandPrimitive.Separator
	data-slot="command-separator"
	class={cn("my-1 border-border", classProp)}
	{...rest}
/>

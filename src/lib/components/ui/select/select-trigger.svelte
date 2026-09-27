<script lang="ts">
import { Select as SelectPrimitive } from "bits-ui";
import { cn } from "$lib/cn";

let { class: classProp, children, ...rest }: SelectPrimitive.TriggerProps = $props();
</script>

<SelectPrimitive.Trigger
	{...rest}
	data-slot="select-trigger"
	class={cn(
		"inline-flex h-9 w-full items-center justify-between gap-2 rounded-lg border border-input bg-background px-3 text-foreground text-sm outline-none transition-colors",
		"focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring",
		"disabled:cursor-not-allowed disabled:opacity-50",
		"[&>svg]:transition-[transform,scale,translate,rotate] [&>svg]:duration-[var(--duration-exit)] [&>svg]:ease-[var(--ease-out)] [&[data-state=open]>svg]:rotate-180 [&[data-state=open]>svg]:duration-[var(--duration-dropdown)] motion-reduce:[&>svg]:transition-none",
		classProp,
	)}
>
	{@render children?.()}
	<svg viewBox="0 0 16 16" fill="none" aria-hidden="true" class="size-3.5 shrink-0 text-muted-foreground">
		<path d="m4 6 4 4 4-4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
	</svg>
</SelectPrimitive.Trigger>

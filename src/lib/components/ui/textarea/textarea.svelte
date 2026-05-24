<script lang="ts">
	import { cn, type WithElementRef, type WithoutChildren } from "$lib/utils.js";
	import type { HTMLTextareaAttributes } from "svelte/elements";

	let {
		ref = $bindable(null),
		value = $bindable(),
		class: className,
		"data-slot": dataSlot = "textarea",
		...restProps
	}: WithoutChildren<WithElementRef<HTMLTextareaAttributes>> = $props();
</script>

<textarea
	bind:this={ref}
	data-slot={dataSlot}
	class={cn(
		"flex w-full field-sizing-content min-h-24 px-4 py-3 outline-none",
		"font-sans text-sm leading-relaxed tracking-[0.01em]",
		"bg-card text-foreground placeholder:text-muted-soft",
		"border border-hairline-strong rounded-md",
		"transition-[border-color,box-shadow] duration-150",
		"focus-visible:border-ink focus-visible:shadow-[inset_0_0_0_1px_var(--ink)]",
		"aria-invalid:border-destructive aria-invalid:focus-visible:shadow-[inset_0_0_0_1px_var(--destructive)]",
		"disabled:bg-surface-strong disabled:text-muted-soft disabled:cursor-not-allowed disabled:opacity-70",
		"dark:bg-card/60",
		className
	)}
	bind:value
	{...restProps}
></textarea>

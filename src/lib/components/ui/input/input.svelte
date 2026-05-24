<script lang="ts">
	import type { HTMLInputAttributes, HTMLInputTypeAttribute } from "svelte/elements";
	import { cn, type WithElementRef } from "$lib/utils.js";

	type InputType = Exclude<HTMLInputTypeAttribute, "file">;

	type Props = WithElementRef<
		Omit<HTMLInputAttributes, "type"> &
			({ type: "file"; files?: FileList } | { type?: InputType; files?: undefined })
	>;

	let {
		ref = $bindable(null),
		value = $bindable(),
		type,
		files = $bindable(),
		class: className,
		"data-slot": dataSlot = "input",
		...restProps
	}: Props = $props();

	/**
	 * Input — editorial text field.
	 *   - Surface-card background with hairline-strong border
	 *   - 44px height (DESIGN.md text-input)
	 *   - 8px radius (md)
	 *   - Focus thickens border to 2px ink; no glow halo
	 *   - Inter at body-md, +0.16px tracking
	 */
	const base = [
		"flex h-11 w-full min-w-0 px-4 py-2 outline-none",
		"font-sans text-sm tracking-[0.01em]",
		"bg-card text-foreground placeholder:text-muted-soft",
		"border border-hairline-strong rounded-md",
		"transition-[border-color,box-shadow] duration-150",
		"focus-visible:border-ink focus-visible:shadow-[inset_0_0_0_1px_var(--ink)]",
		"aria-invalid:border-destructive aria-invalid:focus-visible:shadow-[inset_0_0_0_1px_var(--destructive)]",
		"disabled:bg-surface-strong disabled:text-muted-soft disabled:cursor-not-allowed disabled:opacity-70",
		"file:inline-flex file:h-7 file:items-center file:rounded-pill file:border-0",
		"file:bg-primary file:text-primary-foreground file:px-3 file:mr-3 file:text-xs file:font-medium",
		"dark:bg-card/60",
	].join(" ");
</script>

{#if type === "file"}
	<input
		bind:this={ref}
		data-slot={dataSlot}
		class={cn(base, className)}
		type="file"
		bind:files
		bind:value
		{...restProps}
	/>
{:else}
	<input
		bind:this={ref}
		data-slot={dataSlot}
		class={cn(base, className)}
		{type}
		bind:value
		{...restProps}
	/>
{/if}

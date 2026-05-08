<script lang="ts">
	import { Badge } from "$lib/components/ui/badge";
	import { cn } from "$lib/utils";
	import ArrowRight from "@lucide/svelte/icons/arrow-right";
	import ArrowUpRight from "@lucide/svelte/icons/arrow-up-right";
	import Lock from "@lucide/svelte/icons/lock";
	import type { Component } from "svelte";

	type Props = {
		href: string;
		title: string;
		description: string;
		external?: boolean;
		Icon: Component<Record<string, unknown>>;
		disabled?: boolean;
		class?: string;
		style?: string;
	};

	let {
		href,
		title,
		description,
		external = false,
		Icon,
		disabled = false,
		class: className,
		style
	}: Props = $props();
</script>

<a
	href={disabled ? "#" : href}
	target={external && !disabled ? "_blank" : "_self"}
	rel={external && !disabled ? "noopener noreferrer" : undefined}
	{style}
	class={cn(
		"group bg-card border-border/50 relative flex flex-col justify-between overflow-hidden rounded-xl border p-6 transition-all duration-300",
		!disabled &&
			"hover:border-primary/20 hover:shadow-primary/5 hover:-translate-y-1 hover:shadow-lg",
		disabled && "bg-muted/20 cursor-not-allowed opacity-60 grayscale",
		className
	)}
	aria-disabled={disabled}
>
	<div class="flex w-full items-start justify-between">
		<div
			class={cn(
				"border-border/50 bg-muted/50 flex size-10 items-center justify-center rounded-lg border transition-colors",
				!disabled && "group-hover:bg-primary/10 group-hover:border-primary/20"
			)}
		>
			<Icon
				class={cn(
					"text-muted-foreground size-5 transition-colors",
					!disabled && "group-hover:text-primary"
				)}
			/>
		</div>

		<div
			class="text-muted-foreground/50 group-hover:text-primary transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
		>
			{#if disabled}
				<Lock class="size-5" />
			{:else if external}
				<ArrowUpRight class="size-5" />
			{:else}
				<ArrowRight class="size-5" />
			{/if}
		</div>
	</div>

	<div class="mt-4 flex flex-col gap-2">
		<div class="flex items-center gap-2">
			<h3 class="text-foreground font-semibold tracking-tight">{title}</h3>
			{#if disabled}
				<Badge
					variant="secondary"
					class="h-5 px-1.5 text-[10px] font-medium tracking-wide uppercase"
				>
					Soon
				</Badge>
			{/if}
		</div>
		<p class="text-muted-foreground text-sm leading-relaxed text-balance">{description}</p>
	</div>

	{#if !disabled}
		<span
			class="via-primary/40 absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
		></span>
		<span
			class="via-primary/20 absolute inset-x-0 bottom-0 h-[2px] bg-linear-to-r from-transparent to-transparent opacity-0 blur-sm transition-opacity duration-300 group-hover:opacity-100"
		></span>
	{/if}
</a>

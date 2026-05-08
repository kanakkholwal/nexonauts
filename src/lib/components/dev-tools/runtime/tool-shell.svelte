<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import { cn } from "$lib/utils";
	import type { Snippet } from "svelte";

	let {
		title,
		description,
		icon,
		clearLabel = "Clear",
		canClear = true,
		onClear,
		children,
		class: className = ""
	}: {
		title: string;
		description: string;
		icon?: string;
		clearLabel?: string;
		canClear?: boolean;
		onClear?: () => void;
		children?: Snippet;
		class?: string;
	} = $props();
</script>

<div class={cn("relative min-h-[720px] w-full pb-8", className)}>
	<div class="pointer-events-none absolute inset-0 z-0">
		<div class="absolute top-[-10%] left-[10%] h-[420px] w-[420px] rounded-full bg-primary/5 blur-[120px]"></div>
		<div class="absolute right-[10%] bottom-[10%] h-[420px] w-[420px] rounded-full bg-violet-500/5 blur-[120px]"></div>
	</div>

	<div class="relative z-10 space-y-6">
		<div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
			<div class="space-y-2">
				<h2 class="flex items-center gap-3 text-3xl font-bold tracking-tight">
					{#if icon}
						<span class="text-primary text-3xl">{icon}</span>
					{/if}
					{title}
				</h2>
				<p class="max-w-3xl text-sm leading-relaxed text-muted-foreground md:text-base">
					{description}
				</p>
			</div>

			<Button
				variant="outline"
				onclick={onClear}
				disabled={!canClear}
				class="text-muted-foreground hover:text-destructive hover:border-destructive/50"
			>
				{clearLabel}
			</Button>
		</div>

		{@render children?.()}
	</div>
</div>

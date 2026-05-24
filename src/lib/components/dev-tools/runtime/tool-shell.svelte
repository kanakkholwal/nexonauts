<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import { Badge } from "$lib/components/ui/badge";
	import { cn } from "$lib/utils";
	import type { Component, Snippet } from "svelte";

	/**
	 * ToolShell — chrome for an individual dev tool page.
	 *
	 * `icon` accepts any of:
	 *   - a string emoji or short glyph: `icon="📄"` / `icon="<>"` / `icon="🧬"`
	 *     (rendered with `{@html}` so HTML entities like `&lt;/&gt;` work too)
	 *   - a Lucide / Svelte component reference: `icon={ImageIcon}`
	 *   - or, for fully-custom SVG markup, pass `iconSnippet` instead:
	 *     `{#snippet iconSnippet()}<svg …>…</svg>{/snippet}`
	 *
	 * Whichever form is used, the icon sits in a 48px ink-tinted plate at the
	 * top of the title block, next to the category badge.
	 */
	type IconComponent = Component<{ class?: string; size?: number | string }>;

	let {
		title,
		description,
		icon,
		iconSnippet,
		clearLabel = "Clear",
		canClear = true,
		onClear,
		children,
		class: className = "",
		tags,
		category
	}: {
		title: string;
		description: string;
		icon?: string | IconComponent;
		iconSnippet?: Snippet;
		clearLabel?: string;
		canClear?: boolean;
		onClear?: () => void;
		children?: Snippet;
		class?: string;
		tags?: string[];
		category: string;
	} = $props();

	const isStringIcon = $derived(typeof icon === "string");
	const IconComponent = $derived(
		!isStringIcon && icon ? (icon as IconComponent) : null
	);
</script>

<div
	class={cn(
		"relative isolate min-h-[720px] w-full overflow-hidden pb-12",
		className
	)}
>
	<div class="relative z-10 space-y-8">
		<header class="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
			<div class="space-y-4">
				<div class="flex items-center gap-3">
					<!-- Single icon plate — no nested wrappers. -->
					<div
						class="flex size-12 shrink-0 items-center justify-center rounded-xl border border-hairline bg-canvas-soft text-ink"
					>
						{#if iconSnippet}
							<span class="[&_svg]:size-6">{@render iconSnippet()}</span>
						{:else if isStringIcon}
							<span class="text-xl leading-none">{@html icon}</span>
						{:else if IconComponent}
							<IconComponent class="size-6" />
						{/if}
					</div>
					<Badge variant="secondary" size="md">{category}</Badge>
				</div>

				<h1 class="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
					{title}
				</h1>
				<p class="max-w-2xl text-base leading-relaxed text-body">
					{description}
				</p>

				{#if tags && tags.length}
					<div class="flex flex-wrap gap-1.5 pt-1">
						{#each tags as tag (tag)}
							<Badge variant="outline" size="sm">{tag}</Badge>
						{/each}
					</div>
				{/if}
			</div>

			<Button
				variant="outline"
				size="md"
				onclick={onClear}
				disabled={!canClear}
				class="shrink-0 hover:border-destructive/40 hover:text-destructive"
			>
				{clearLabel}
			</Button>
		</header>

		{@render children?.()}
	</div>
</div>

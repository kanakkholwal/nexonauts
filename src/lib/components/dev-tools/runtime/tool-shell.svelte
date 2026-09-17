<script lang="ts">
import ArrowLeft from "@tabler/icons-svelte/icons/arrow-left";
import type { Snippet } from "svelte";
import { Container } from "$lib/components/surfaces";
import { Button } from "$lib/components/ui/button";
import type { IconComponent } from "$lib/icon";
import { cn } from "$lib/utils";

/** ToolShell: the chrome every dev tool page shares. `icon` takes a glyph
 *  string or a component; for custom SVG pass `iconSnippet` instead. */

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
const GlyphComponent = $derived(!isStringIcon && icon ? (icon as IconComponent) : null);
</script>

<div class={cn("relative w-full", className)}>
	<div class="border-b border-border-low">
		<Container class="pt-28 pb-10 md:pt-32 md:pb-12">
			<a
				href="/dev-tools"
				class="ease-fluid inline-flex items-center gap-1.5 text-body-sm font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
			>
				<ArrowLeft class="size-3.5" />
				All tools
			</a>

			<div class="mt-6 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
				<div class="max-w-xl">
					<span class="inline-flex items-center gap-2 text-body-sm font-medium text-foreground">
						{#if iconSnippet}
							<span class="[&_svg]:size-4 [&_svg]:text-muted-foreground">
								{@render iconSnippet()}
							</span>
						{:else if isStringIcon}
							<span class="text-body leading-none">{@html icon}</span>
						{:else if GlyphComponent}
							<GlyphComponent class="size-4 text-muted-foreground" />
						{/if}
						{category}
					</span>

					<h1 class="mt-4 text-balance text-heading text-ink-strong md:text-heading-lg">
						{title}
					</h1>
					<p class="mt-3 text-pretty text-body-lg text-muted-foreground">
						{description}
					</p>

					{#if tags?.length}
						<p class="mt-4 flex flex-wrap gap-x-2 font-mono text-caption text-muted-foreground">
							{#each tags as tag (tag)}
								<span>{tag}</span>
							{/each}
						</p>
					{/if}
				</div>

				<Button
					variant="outline"
					size="sm"
					onclick={onClear}
					disabled={!canClear}
					class="shrink-0 self-start hover:border-destructive hover:text-destructive md:self-auto"
				>
					{clearLabel}
				</Button>
			</div>
		</Container>
	</div>

	<Container class="py-10 md:py-12">
		{@render children?.()}
	</Container>
</div>

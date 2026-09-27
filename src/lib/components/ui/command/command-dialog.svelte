<script lang="ts">
import { Dialog as DialogPrimitive } from "bits-ui";
import type { Snippet } from "svelte";
import { DIALOG_BACKDROP } from "$lib/components/ui/dialog/context";
import { cn } from "$lib/cn";
import { COMMAND_PANEL, setCommandDialogState } from "./context";
import { commandFrame, type DialogVariant } from "./variants";

let {
	children,
	open = $bindable(false),
	label = "Command palette",
	description = "Search for a command to run…",
	variant = "default",
	class: classProp,
}: {
	children?: Snippet;
	open?: boolean;
	label?: string;
	description?: string;
	variant?: DialogVariant;
	class?: string;
} = $props();

let header = $state<{ children?: Snippet; class?: string }>();

setCommandDialogState({
	get open() {
		return open;
	},
	get variant() {
		return variant;
	},
	get header() {
		return header;
	},
	set header(next) {
		header = next;
	},
});
</script>

<DialogPrimitive.Root bind:open>
	<DialogPrimitive.Portal>
		<DialogPrimitive.Overlay
			data-slot="command-dialog-backdrop"
			class={cn(DIALOG_BACKDROP, "backdrop-blur-md backdrop-saturate-150")}
		/>
		<DialogPrimitive.Content
			data-slot="command-dialog"
			data-variant={variant}
			class={cn(
				"fixed top-[14vh] left-1/2 z-50 -translate-x-1/2 outline-none",
				COMMAND_PANEL,
				commandFrame({ variant }).panel(),
				"flex max-h-[min(30rem,70dvh)] w-[min(36rem,calc(100vw-2rem))] flex-col overflow-hidden",
				classProp,
			)}
		>
			<!-- Matches shadcn's own CommandDialog: a real Title/Description carries the
			accessible name/description, sr-only since the search input is the visible label. -->
			<DialogPrimitive.Title class="sr-only">{label}</DialogPrimitive.Title>
			<DialogPrimitive.Description class="sr-only">{description}</DialogPrimitive.Description>
			{#if variant === "framed" && header}
				<div
					data-slot="command-header"
					class={cn(commandFrame({ variant }).header(), header.class)}
				>
					<p class="font-medium text-foreground text-sm">{@render header.children?.()}</p>
					<span class="flex shrink-0 items-center gap-1.5 text-muted-foreground text-xs">
						<kbd
							class="inline-flex h-4 min-w-4 items-center justify-center rounded border border-border bg-card px-1 font-medium font-sans text-[10px]"
							>esc</kbd
						>
						close
					</span>
				</div>
			{/if}
			{@render children?.()}
		</DialogPrimitive.Content>
	</DialogPrimitive.Portal>
</DialogPrimitive.Root>

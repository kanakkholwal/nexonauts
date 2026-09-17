<script lang="ts">
import Check from "@tabler/icons-svelte/icons/check";
import Copy from "@tabler/icons-svelte/icons/copy";
import FileCode from "@tabler/icons-svelte/icons/file-code";
import FileCode2 from "@tabler/icons-svelte/icons/file-code-2";
import Maximize2 from "@tabler/icons-svelte/icons/maximize";
import Minimize2 from "@tabler/icons-svelte/icons/minimize";
import Wand2 from "@tabler/icons-svelte/icons/wand";
import pretty from "pretty";
import { toast } from "svelte-sonner";
import { Badge } from "$lib/components/ui/badge";
import { Button } from "$lib/components/ui/button";
import { Textarea } from "$lib/components/ui/textarea";
import ToolShell from "./tool-shell.svelte";

let input = $state("");
let output = $state("");
let mode = $state<"minify" | "prettify" | "">("");
let copied = $state(false);

function handleMinify() {
	if (!input.trim()) return;
	output = input.replace(/>\s+</g, "><").replace(/\n/g, "").trim();
	mode = "minify";
	toast.success("HTML minified");
}

function handlePrettify() {
	if (!input.trim()) return;
	output = pretty(input, { ocd: true });
	mode = "prettify";
	toast.success("HTML formatted");
}

async function handleCopy() {
	if (!output) return;
	await navigator.clipboard.writeText(output);
	copied = true;
	toast.success("Copied to clipboard");
	setTimeout(() => (copied = false), 2000);
}

function handleClear() {
	input = "";
	output = "";
	mode = "";
}

function formatBytes(bytes: number) {
	if (!bytes) return "0 B";
	return bytes < 1024 ? `${bytes} B` : `${(bytes / 1024).toFixed(2)} KB`;
}
</script>

<ToolShell
	title="HTML Minifier & Beautifier"
	description="Collapse markup for shipment or prettify it for edits and reviews."
	icon={FileCode}
	category="Web Tools"
	tags={["html", "format", "minify", "beautify"]}
	clearLabel="Clear workspace"
	canClear={Boolean(input)}
	onClear={handleClear}
>
	<div class="grid min-h-[600px] gap-6 lg:grid-cols-2">
		<div class="flex flex-col overflow-hidden rounded-xl border border-border-low bg-card">
			<div class="flex h-12 items-center justify-between border-b border-border-low bg-paper px-4">
				<div class="flex items-center gap-2 text-body-sm font-medium text-muted-foreground">
					<FileCode2 class="size-4" />
					Input HTML
					<Badge variant="outline" class="ml-2 text-caption">{formatBytes(new Blob([input]).size)}</Badge>
				</div>
			</div>
			<Textarea bind:value={input} class="min-h-[420px] flex-1 resize-none rounded-none border-0 bg-transparent p-4 font-mono text-body-sm focus-visible:ring-0" spellcheck={false} placeholder="<main>Hello</main>" />
			<div class="flex gap-3 border-t border-border-low bg-paper p-4">
				<Button class="flex-1 gap-2" onclick={handleMinify} disabled={!input}>
					<Minimize2 class="size-4" />
					Minify
				</Button>
				<Button variant="secondary" class="flex-1 gap-2" onclick={handlePrettify} disabled={!input}>
					<Maximize2 class="size-4" />
					Beautify
				</Button>
			</div>
		</div>

		<div class="flex flex-col overflow-hidden rounded-xl border border-border-low bg-card">
			<div class="flex h-12 items-center justify-between border-b border-border-low bg-paper px-4">
				<div class="text-body-sm font-medium text-muted-foreground">
					{mode === "minify" ? "Minified HTML" : mode === "prettify" ? "Beautified HTML" : "Output"}
				</div>
				{#if output}
					<Button size="sm" variant="ghost" class="gap-2 text-muted-foreground hover:bg-paper hover:text-foreground" onclick={handleCopy}>
						{#if copied}
							<Check class="size-3 text-success" />
							Copied
						{:else}
							<Copy class="size-3" />
							Copy
						{/if}
					</Button>
				{/if}
			</div>
			{#if !output}
				<div class="flex min-h-[420px] flex-1 flex-col items-center justify-center gap-4 text-muted-foreground">
					<div class="rounded-full bg-paper p-4">
						<Wand2 class="size-8 opacity-50" />
					</div>
					<p class="text-body-sm">Processed HTML will appear here</p>
				</div>
			{:else}
				<Textarea value={output} readonly class="min-h-[420px] flex-1 resize-none rounded-none border-0 bg-transparent p-4 font-mono text-body-sm text-foreground focus-visible:ring-0" />
			{/if}
		</div>
	</div>
</ToolShell>


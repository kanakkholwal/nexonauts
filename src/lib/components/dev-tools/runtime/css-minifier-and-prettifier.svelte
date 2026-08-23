<script lang="ts">
import Check from "@lucide/svelte/icons/check";
import Copy from "@lucide/svelte/icons/copy";
import FileCode from "@lucide/svelte/icons/file-code";
import Maximize2 from "@lucide/svelte/icons/maximize-2";
import Minimize2 from "@lucide/svelte/icons/minimize-2";
import Palette from "@lucide/svelte/icons/palette";
import Wand2 from "@lucide/svelte/icons/wand-2";
import cssbeautify from "cssbeautify";
import { toast } from "svelte-sonner";
import { Badge } from "$lib/components/ui/badge";
import { Button } from "$lib/components/ui/button";
import { Textarea } from "$lib/components/ui/textarea";
import ToolShell from "./tool-shell.svelte";

let input = $state("");
let output = $state("");
let mode = $state<"minify" | "beautify" | "">("");
let copied = $state(false);

const inputSize = $derived(new Blob([input]).size);
const outputSize = $derived(new Blob([output]).size);

function minifyCss(css: string) {
	return css
		.replace(/\/\*[\s\S]*?\*\//g, "")
		.replace(/\s+/g, " ")
		.replace(/\s*([{}:;,>])\s*/g, "$1")
		.replace(/;}/g, "}")
		.trim();
}

function handleMinify() {
	if (!input.trim()) return;
	output = minifyCss(input);
	mode = "minify";
	toast.success("CSS minified");
}

function handleBeautify() {
	if (!input.trim()) return;
	output = cssbeautify(input, { indent: "  ", autosemicolon: true });
	mode = "beautify";
	toast.success("CSS formatted");
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
	title="CSS Minifier & Beautifier"
	description="Shrink stylesheets for production or expand them back into readable source."
	icon={Palette}
	category="Web Tools"
	tags={["css", "format", "minify", "beautify"]}
	clearLabel="Clear workspace"
	canClear={Boolean(input)}
	onClear={handleClear}
>
	<div class="grid min-h-[600px] gap-6 lg:grid-cols-2">
		<div class="flex flex-col overflow-hidden rounded-xl border border-border-low bg-card">
			<div class="flex h-12 items-center justify-between border-b border-border-low bg-paper px-4">
				<div class="flex items-center gap-2 text-body-sm font-medium text-muted-foreground">
					<FileCode class="size-4" />
					Source CSS
					<Badge variant="outline" class="ml-2 text-caption">{formatBytes(inputSize)}</Badge>
				</div>
			</div>
			<Textarea bind:value={input} class="min-h-[420px] flex-1 resize-none rounded-none border-0 bg-transparent p-4 font-mono text-body-sm focus-visible:ring-0" spellcheck={false} placeholder="/* Paste CSS here */" />
			<div class="flex gap-3 border-t border-border-low bg-paper p-4">
				<Button class="flex-1 gap-2" onclick={handleMinify} disabled={!input}>
					<Minimize2 class="size-4" />
					Minify
				</Button>
				<Button variant="secondary" class="flex-1 gap-2" onclick={handleBeautify} disabled={!input}>
					<Maximize2 class="size-4" />
					Beautify
				</Button>
			</div>
		</div>

		<div class="flex flex-col overflow-hidden rounded-xl border border-border-low bg-card">
			<div class="flex h-12 items-center justify-between border-b border-border-low bg-paper px-4">
				<div class="flex items-center gap-2 text-body-sm font-medium text-muted-foreground">
					<Palette class="size-4" />
					{mode === "minify" ? "Minified CSS" : mode === "beautify" ? "Beautified CSS" : "Output"}
					{#if output}
						<Badge class="ml-2 border-border-low bg-paper text-caption text-foreground">
							{formatBytes(outputSize)}
						</Badge>
					{/if}
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
					<p class="text-body-sm">Processed CSS will appear here</p>
				</div>
			{:else}
				<Textarea value={output} readonly class="min-h-[420px] flex-1 resize-none rounded-none border-0 bg-transparent p-4 font-mono text-body-sm text-foreground focus-visible:ring-0" />
			{/if}
		</div>
	</div>
</ToolShell>

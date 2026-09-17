<script lang="ts">
import Check from "@tabler/icons-svelte/icons/check";
import Code2 from "@tabler/icons-svelte/icons/code";
import CodeXml from "@tabler/icons-svelte/icons/code";
import Copy from "@tabler/icons-svelte/icons/copy";
import ArrowRightLeft from "@tabler/icons-svelte/icons/exchange";
import FileCode from "@tabler/icons-svelte/icons/file-code";
import RefreshCcw from "@tabler/icons-svelte/icons/refresh";
import { toast } from "svelte-sonner";
import { Button } from "$lib/components/ui/button";
import { Textarea } from "$lib/components/ui/textarea";
import ToolShell from "./tool-shell.svelte";

let input = $state("");
let output = $state("");
let mode = $state<"encode" | "decode">("encode");
let copied = $state(false);

function processValue(value: string) {
	if (!value) return "";
	if (mode === "encode") {
		return value
			.replace(/&/g, "&amp;")
			.replace(/</g, "&lt;")
			.replace(/>/g, "&gt;")
			.replace(/"/g, "&quot;")
			.replace(/'/g, "&#039;");
	}
	return value
		.replace(/&lt;/g, "<")
		.replace(/&gt;/g, ">")
		.replace(/&quot;/g, '"')
		.replace(/&#039;/g, "'")
		.replace(/&amp;/g, "&");
}

$effect(() => {
	output = processValue(input);
});

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
}
</script>

<ToolShell
	title="HTML Entity Encoder"
	description="Escape raw markup for safe display, or decode HTML entities back into source."
	icon={CodeXml}
	category="Web Tools"
	tags={["html", "entities", "escape", "decode"]}
	clearLabel="Clear"
	canClear={Boolean(input)}
	onClear={handleClear}
>
	<div class="space-y-6">
		<div class="flex items-center gap-3">
			<div class="rounded-lg border border-border-low bg-card p-1">
				<Button size="sm" variant={mode === "encode" ? "secondary" : "ghost"} onclick={() => (mode = "encode")}>Encode</Button>
				<Button size="sm" variant={mode === "decode" ? "secondary" : "ghost"} onclick={() => (mode = "decode")}>Decode</Button>
			</div>
		</div>

		<div class="grid min-h-[600px] gap-6 lg:grid-cols-2">
			<div class="flex flex-col overflow-hidden rounded-xl border border-border-low bg-card">
				<div class="flex h-12 items-center border-b border-border-low bg-paper px-4 text-body-sm font-medium text-muted-foreground">
					<FileCode class="mr-2 size-4" />
					{mode === "encode" ? "Raw HTML input" : "Escaped string input"}
				</div>
				<Textarea bind:value={input} class="min-h-[420px] flex-1 resize-none rounded-none border-0 bg-transparent p-4 font-mono text-body-sm focus-visible:ring-0" spellcheck={false} placeholder={mode === "encode" ? "<div>markup</div>" : "&lt;div&gt;markup&lt;/div&gt;"} />
			</div>

			<div class="flex flex-col overflow-hidden rounded-xl border border-border-low bg-card">
				<div class="flex h-12 items-center justify-between border-b border-border-low bg-paper px-4">
					<div class="flex items-center gap-2 text-body-sm font-medium text-muted-foreground">
						<ArrowRightLeft class="size-4" />
						{mode === "encode" ? "Escaped output" : "Decoded HTML"}
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
							<RefreshCcw class="size-8 opacity-50" />
						</div>
						<p class="text-body-sm">Result will appear here</p>
					</div>
				{:else}
					<Textarea value={output} readonly class="min-h-[420px] flex-1 resize-none rounded-none border-0 bg-transparent p-4 font-mono text-body-sm text-foreground focus-visible:ring-0" />
				{/if}
			</div>
		</div>
	</div>
</ToolShell>


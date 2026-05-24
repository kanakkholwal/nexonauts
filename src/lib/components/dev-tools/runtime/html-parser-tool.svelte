<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import { Textarea } from "$lib/components/ui/textarea";
	import ArrowRightLeft from "@lucide/svelte/icons/arrow-right-left";
	import Check from "@lucide/svelte/icons/check";
	import Code2 from "@lucide/svelte/icons/code-2";
	import Copy from "@lucide/svelte/icons/copy";
	import FileCode from "@lucide/svelte/icons/file-code";
	import RefreshCcw from "@lucide/svelte/icons/refresh-ccw";
	import CodeXml from "@lucide/svelte/icons/code-xml";
	import { toast } from "svelte-sonner";
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
			<div class="rounded-lg border border-border/50 bg-card p-1">
				<Button size="sm" variant={mode === "encode" ? "secondary" : "ghost"} onclick={() => (mode = "encode")}>Encode</Button>
				<Button size="sm" variant={mode === "decode" ? "secondary" : "ghost"} onclick={() => (mode = "decode")}>Decode</Button>
			</div>
		</div>

		<div class="grid min-h-[600px] gap-6 lg:grid-cols-2">
			<div class="flex flex-col overflow-hidden rounded-xl border border-border/50 bg-card/50 shadow-xl backdrop-blur-sm">
				<div class="flex h-12 items-center border-b border-border/50 bg-muted/30 px-4 text-sm font-semibold text-muted-foreground">
					<FileCode class="mr-2 h-4 w-4" />
					{mode === "encode" ? "Raw HTML input" : "Escaped string input"}
				</div>
				<Textarea bind:value={input} class="min-h-[420px] flex-1 resize-none rounded-none border-0 bg-transparent p-4 font-mono text-sm focus-visible:ring-0" spellcheck={false} placeholder={mode === "encode" ? "<div>markup</div>" : "&lt;div&gt;markup&lt;/div&gt;"} />
			</div>

			<div class="flex flex-col overflow-hidden rounded-xl border border-border/50 bg-[#1e1e1e] shadow-2xl">
				<div class="flex h-12 items-center justify-between border-b border-white/10 bg-white/5 px-4">
					<div class="flex items-center gap-2 text-sm font-semibold text-gray-300">
						<ArrowRightLeft class="h-4 w-4" />
						{mode === "encode" ? "Escaped output" : "Decoded HTML"}
					</div>
					{#if output}
						<Button size="sm" variant="ghost" class="gap-2 text-gray-300 hover:bg-white/10 hover:text-white" onclick={handleCopy}>
							{#if copied}
								<Check class="h-3 w-3 text-green-500" />
								Copied
							{:else}
								<Copy class="h-3 w-3" />
								Copy
							{/if}
						</Button>
					{/if}
				</div>
				{#if !output}
					<div class="flex min-h-[420px] flex-1 flex-col items-center justify-center gap-4 text-gray-600">
						<div class="rounded-full bg-white/5 p-4">
							<RefreshCcw class="h-8 w-8 opacity-50" />
						</div>
						<p class="text-sm">Result will appear here</p>
					</div>
				{:else}
					<Textarea value={output} readonly class="min-h-[420px] flex-1 resize-none rounded-none border-0 bg-transparent p-4 font-mono text-sm text-blue-100 focus-visible:ring-0" />
				{/if}
			</div>
		</div>
	</div>
</ToolShell>


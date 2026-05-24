<script lang="ts">
	import { Badge } from "$lib/components/ui/badge";
	import { Button } from "$lib/components/ui/button";
	import { Textarea } from "$lib/components/ui/textarea";
	import AlertCircle from "@lucide/svelte/icons/alert-circle";
	import ArrowRightLeft from "@lucide/svelte/icons/arrow-right-left";
	import Braces from "@lucide/svelte/icons/braces";
	import Check from "@lucide/svelte/icons/check";
	import Copy from "@lucide/svelte/icons/copy";
	import FileJson from "@lucide/svelte/icons/file-json";
	import Maximize2 from "@lucide/svelte/icons/maximize-2";
	import Minimize2 from "@lucide/svelte/icons/minimize-2";
	import Wand2 from "@lucide/svelte/icons/wand-2";
	import { toast } from "svelte-sonner";
	import ToolShell from "./tool-shell.svelte";

	let input = $state("");
	let output = $state("");
	let error = $state("");
	let mode = $state<"minify" | "prettify" | "">("");
	let copied = $state(false);

	const inputSize = $derived(new Blob([input]).size);
	const outputSize = $derived(new Blob([output]).size);
	const savings = $derived(
		inputSize > 0 ? (((inputSize - outputSize) / inputSize) * 100).toFixed(1) : "0.0"
	);

	function handleMinify() {
		if (!input.trim()) return;
		error = "";
		try {
			output = JSON.stringify(JSON.parse(input));
			mode = "minify";
			toast.success("JSON minified");
		} catch (err) {
			error = err instanceof Error ? err.message : "Invalid JSON";
			output = "";
			toast.error("Invalid JSON format");
		}
	}

	function handleBeautify() {
		if (!input.trim()) return;
		error = "";
		try {
			output = JSON.stringify(JSON.parse(input), null, 2);
			mode = "prettify";
			toast.success("JSON formatted");
		} catch (err) {
			error = err instanceof Error ? err.message : "Invalid JSON";
			output = "";
			toast.error("Invalid JSON format");
		}
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
		error = "";
		mode = "";
	}

	function formatBytes(bytes: number) {
		if (bytes === 0) return "0 B";
		const units = ["B", "KB", "MB"];
		const power = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
		return `${(bytes / 1024 ** power).toFixed(power === 0 ? 0 : 2)} ${units[power]}`;
	}
</script>

<ToolShell
	title="JSON Minifier & Beautifier"
	description="Validate, compact, and format JSON payloads without leaving the browser."
	icon={Braces}
	category="Web Tools"
	tags={["json", "format", "minify", "validate"]}
	clearLabel="Clear workspace"
	canClear={Boolean(input)}
	onClear={handleClear}
>
	<div class="grid min-h-[600px] gap-6 lg:grid-cols-2">
		<div class="flex flex-col overflow-hidden rounded-xl border border-border/50 bg-card/50 shadow-xl backdrop-blur-sm">
			<div class="flex h-12 items-center justify-between border-b border-border/50 bg-muted/30 px-4">
				<div class="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
					<FileJson class="h-4 w-4" />
					Input JSON
					<Badge variant="outline" class="ml-2 text-[10px]">{formatBytes(inputSize)}</Badge>
				</div>
			</div>
			<Textarea
				bind:value={input}
				placeholder={`{ "paste": "json here" }`}
				class="min-h-[420px] flex-1 resize-none rounded-none border-0 bg-transparent p-4 font-mono text-sm leading-relaxed focus-visible:ring-0"
				spellcheck={false}
			/>
			<div class="flex gap-3 border-t border-border/50 bg-muted/10 p-4">
				<Button class="flex-1 gap-2" onclick={handleMinify} disabled={!input}>
					<Minimize2 class="h-4 w-4" />
					Minify
				</Button>
				<Button variant="secondary" class="flex-1 gap-2" onclick={handleBeautify} disabled={!input}>
					<Maximize2 class="h-4 w-4" />
					Beautify
				</Button>
			</div>
		</div>

		<div class="flex flex-col overflow-hidden rounded-xl border border-border/50 bg-[#1e1e1e] shadow-2xl">
			<div class="flex h-12 items-center justify-between border-b border-white/10 bg-white/5 px-4">
				<div class="flex items-center gap-2 text-sm font-semibold text-gray-300">
					<Braces class="h-4 w-4" />
					{error ? "Error" : mode === "minify" ? "Minified JSON" : mode === "prettify" ? "Beautified JSON" : "Output"}
					{#if output && !error}
						<Badge class="ml-2 border-white/10 bg-white/10 text-[10px] text-white">
							{formatBytes(outputSize)}
						</Badge>
					{/if}
				</div>
				{#if output && !error}
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
			{#if error}
				<div class="flex min-h-[420px] flex-1 flex-col items-center justify-center gap-3 bg-red-950/10 p-6 text-center text-red-300">
					<AlertCircle class="h-10 w-10" />
					<p class="font-semibold">Invalid JSON</p>
					<p class="max-w-md break-all font-mono text-xs opacity-80">{error}</p>
				</div>
			{:else if !output}
				<div class="flex min-h-[420px] flex-1 flex-col items-center justify-center gap-4 text-gray-600">
					<div class="rounded-full bg-white/5 p-4">
						<Wand2 class="h-8 w-8 opacity-50" />
					</div>
					<p class="text-sm">Processed JSON will appear here</p>
				</div>
			{:else}
				<Textarea
					value={output}
					readonly
					class="min-h-[420px] flex-1 resize-none rounded-none border-0 bg-transparent p-4 font-mono text-sm leading-relaxed text-blue-100 focus-visible:ring-0"
				/>
			{/if}
			{#if output && !error && mode === "minify"}
				<div class="flex h-10 items-center justify-end gap-4 border-t border-white/10 bg-white/5 px-4 text-xs font-mono text-gray-400">
					<span class="flex items-center gap-1.5">
						Original <span class="text-gray-200">{formatBytes(inputSize)}</span>
					</span>
					<ArrowRightLeft class="h-3 w-3 opacity-50" />
					<span class="flex items-center gap-1.5">
						Result <span class="text-green-400">{formatBytes(outputSize)}</span>
					</span>
					<span class="rounded border border-green-500/30 bg-green-500/20 px-2 py-0.5 font-bold text-green-400">
						-{savings}%
					</span>
				</div>
			{/if}
		</div>
	</div>
</ToolShell>

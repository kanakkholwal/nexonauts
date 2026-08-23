<script lang="ts">
import Atom from "@lucide/svelte/icons/atom";
import Check from "@lucide/svelte/icons/check";
import Code2 from "@lucide/svelte/icons/code-2";
import Copy from "@lucide/svelte/icons/copy";
import Flame from "@lucide/svelte/icons/flame";
import Trash2 from "@lucide/svelte/icons/trash-2";
import Wand2 from "@lucide/svelte/icons/wand-2";
import { toast } from "svelte-sonner";
import { Button } from "$lib/components/ui/button";
import { Input } from "$lib/components/ui/input";
import { Textarea } from "$lib/components/ui/textarea";
import ToolShell from "./tool-shell.svelte";

const defaultHtml = `<!-- Hello world -->
<div class="awesome">
  <label for="name">Enter your name:</label>
  <input type="text" id="name" />
</div>`;

let input = $state(defaultHtml);
let output = $state("");
let liveMode = $state(true);
let createComponent = $state(false);
let componentName = $state("MyComponent");
let hideComments = $state(false);
let copied = $state(false);

function convertHtmlToJsx(html: string) {
	let jsx = html
		.replace(/class=/g, "className=")
		.replace(/for=/g, "htmlFor=")
		.replace(/tabindex=/g, "tabIndex=")
		.replace(/autoplay=/g, "autoPlay=")
		.replace(/<!--/g, "{/*")
		.replace(/-->/g, "*/}");

	for (const tag of ["img", "input", "br", "hr", "meta", "link"]) {
		const regex = new RegExp(`<${tag}([^>]*?)(?<!/)>`, "g");
		jsx = jsx.replace(regex, `<${tag}$1 />`);
	}

	if (hideComments) {
		jsx = jsx.replace(/{\/\*[\s\S]*?\*\/}/g, "");
	}

	if (createComponent) {
		jsx = `const ${componentName} = () => {\n  return (\n    <>\n${jsx
			.split("\n")
			.map((line) => `      ${line}`)
			.join("\n")}\n    </>\n  );\n};`;
	}

	return jsx;
}

function handleConvert() {
	output = convertHtmlToJsx(input);
}

$effect(() => {
	if (liveMode) {
		handleConvert();
	}
});

async function handleCopy() {
	if (!output) return;
	await navigator.clipboard.writeText(output);
	copied = true;
	toast.success("JSX copied");
	setTimeout(() => (copied = false), 2000);
}

function handleClear() {
	input = "";
	output = "";
}
</script>

<ToolShell
	title="HTML to JSX Converter"
	description="Convert raw HTML into React-friendly JSX with browser-only transforms."
	icon={Atom}
	category="Web Tools"
	tags={["html", "jsx", "react", "converter"]}
	clearLabel="Clear"
	canClear={Boolean(input)}
	onClear={handleClear}
>
	<div class="space-y-6">
		<div class="rounded-xl border border-border-low bg-card p-4 shadow-sm">
			<div class="flex flex-wrap items-center gap-4">
				<div class="flex items-center gap-2 text-body-sm text-muted-foreground">
					<Flame class={liveMode ? "size-4 text-orange-500" : "size-4"} />
					<label class="cursor-pointer font-medium">
						<input type="checkbox" bind:checked={liveMode} class="mr-2" />
						Live mode
					</label>
				</div>
				<label class="cursor-pointer text-body-sm font-medium">
					<input type="checkbox" bind:checked={createComponent} class="mr-2" />
					Create functional component
				</label>
				<label class="cursor-pointer text-body-sm font-medium">
					<input type="checkbox" bind:checked={hideComments} class="mr-2" />
					Remove comments
				</label>
				<Input bind:value={componentName} disabled={!createComponent} class="h-8 w-40 bg-background/50 text-xs font-mono" />
				{#if !liveMode}
					<Button size="sm" class="gap-2" onclick={handleConvert}>
						<Wand2 class="size-4" />
						Convert
					</Button>
				{/if}
			</div>
		</div>

		<div class="grid min-h-[560px] gap-6 lg:grid-cols-2">
			<div class="flex flex-col overflow-hidden rounded-xl border border-border-low bg-card">
				<div class="flex h-10 items-center border-b border-border-low bg-paper px-4 text-xs font-bold tracking-wider text-muted-foreground uppercase">
					<Code2 class="mr-2 size-4" />
					HTML Source
				</div>
				<Textarea bind:value={input} class="min-h-[420px] flex-1 resize-none rounded-none border-0 bg-transparent p-4 font-mono text-body-sm focus-visible:ring-0" spellcheck={false} />
			</div>

			<div class="flex flex-col overflow-hidden rounded-xl border border-border-low bg-card">
				<div class="flex h-10 items-center justify-between border-b border-border-low bg-paper px-4">
					<div class="text-xs font-bold tracking-wider text-foreground uppercase">JSX Result</div>
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
				{#if output}
					<Textarea value={output} readonly class="min-h-[420px] flex-1 resize-none rounded-none border-0 bg-transparent p-4 font-mono text-body-sm text-foreground focus-visible:ring-0" />
				{:else}
					<div class="flex min-h-[420px] flex-1 items-center justify-center text-body-sm text-muted-foreground">
						Waiting for input…
					</div>
				{/if}
			</div>
		</div>
	</div>
</ToolShell>


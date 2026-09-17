<script lang="ts">
import IconArrowUpRight from "@tabler/icons-svelte/icons/arrow-up-right";
import IconFileText from "@tabler/icons-svelte/icons/file-text";
import IconFileTypePdf from "@tabler/icons-svelte/icons/file-type-pdf";
import IconMath from "@tabler/icons-svelte/icons/math";
import IconVideo from "@tabler/icons-svelte/icons/video";
import { enterOnView } from "$lib/motion/enter";

// Status and licence are stated per product, because they genuinely differ.
// Never soften these; an "open source" claim across the umbrella would be false.
const products = [
	{
		icon: IconFileTypePdf,
		name: "Orbit",
		kind: "PDF toolkit",
		body: "Merge, split, convert and compress. The whole PDF workflow, and it never uploads a file.",
		where: "In the browser",
		status: "Stable",
		licence: "Public repo",
		href: "https://orbit.nexonauts.com"
	},
	{
		icon: IconVideo,
		name: "Recast",
		kind: "Screen recorder",
		body: "Record once, ship a demo. Cursor smoothing, zoom and silence trimming apply as you capture.",
		where: "Desktop app",
		status: "Stable on Windows, beta elsewhere",
		licence: "GPLv3",
		href: "https://recast.li"
	},
	{
		icon: IconMath,
		name: "Glyphtex",
		kind: "LaTeX engine",
		body: "A LaTeX engine compiled to WebAssembly. Typeset a document with no TeX distribution on disk.",
		where: "In the browser",
		status: "Newest, moves fastest",
		licence: "Public repo",
		href: "https://glyphtex.nexonauts.com"
	},
	{
		icon: IconFileText,
		name: "Docvia",
		kind: "Docs compiler",
		body: "Write Markdown once with directive based components. Render it through React or Svelte.",
		where: "Build step",
		status: "Stable",
		licence: "MIT",
		href: "https://docvia.dev"
	}
];
</script>

<ul class="grid grid-cols-1 gap-4 sm:grid-cols-2">
	{#each products as product, i (product.name)}
		{@const Glyph = product.icon}
		<li use:enterOnView={{ delay: i * 0.06 }}>
			<a
				href={product.href}
				target="_blank"
				rel="noopener noreferrer"
				class="ease-craft border-border bg-card hover:bg-muted focus-visible:ring-ring group flex h-full flex-col rounded-2xl border p-6 transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none motion-reduce:transition-none"
			>
				<div class="flex items-start justify-between gap-4">
					<span
						class="border-border bg-background text-muted-foreground group-hover:text-primary flex size-10 shrink-0 items-center justify-center rounded-lg border"
					>
						<Glyph class="size-5" aria-hidden="true" />
					</span>
					<IconArrowUpRight
						class="text-muted-foreground group-hover:text-foreground size-4 shrink-0"
						aria-hidden="true"
					/>
				</div>

				<h3 class="text-subheading text-foreground mt-5 font-medium">{product.name}</h3>
				<p class="text-caption text-muted-foreground mt-1">{product.kind}</p>
				<p class="text-body-sm text-muted-foreground mt-3 text-pretty">{product.body}</p>

				<dl class="text-caption mt-5 flex flex-wrap items-center gap-x-3 gap-y-1">
					<dt class="sr-only">Runs</dt>
					<dd class="text-foreground font-medium">{product.where}</dd>
					<span aria-hidden="true" class="bg-border-strong size-1 rounded-full"></span>
					<dt class="sr-only">Status</dt>
					<dd class="text-muted-foreground">{product.status}</dd>
					<span aria-hidden="true" class="bg-border-strong size-1 rounded-full"></span>
					<dt class="sr-only">Licence</dt>
					<dd class="text-muted-foreground font-mono">{product.licence}</dd>
				</dl>
			</a>
		</li>
	{/each}
</ul>

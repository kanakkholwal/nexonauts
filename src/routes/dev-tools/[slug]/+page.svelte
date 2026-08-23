<script lang="ts">
import ArrowLeft from "phosphor-svelte/lib/ArrowLeft";
import ArrowRight from "phosphor-svelte/lib/ArrowRight";
import { appConfig } from "@/project.config";
import { hasRuntimeDevTool, runtimeDevToolComponents } from "$lib/components/dev-tools/runtime";
import { Container, Section, SectionLabel } from "$lib/components/surfaces";
import { Button } from "$lib/components/ui/button";
import { cn } from "$lib/utils";
import { categoryIcon } from "../icons";
import { devTools } from "../tools";

let { data } = $props();

const ToolComponent = $derived(
	hasRuntimeDevTool(data.tool.slug) ? runtimeDevToolComponents[data.tool.slug] : null
);

// Same category first, then anything else, capped at three.
const related = $derived(
	[
		...devTools.filter((t) => t.slug !== data.tool.slug && t.category === data.tool.category),
		...devTools.filter((t) => t.slug !== data.tool.slug && t.category !== data.tool.category)
	].slice(0, 3)
);

const canonical = $derived(`${appConfig.url}/dev-tools/${data.tool.slug}`);
</script>

<svelte:head>
	<title>{data.tool.title} · Dev tools · Nexonauts</title>
	<meta name="description" content={data.tool.description} />
	<link rel="canonical" href={canonical} />
	<meta property="og:title" content="{data.tool.title} · Nexonauts" />
	<meta property="og:description" content={data.tool.description} />
	<meta property="og:url" content={canonical} />
</svelte:head>

{#if ToolComponent}
	<ToolComponent />
{:else}
	<!-- No interactive implementation yet. Say so plainly rather than dressing a
	     migration note up as two cards of content. -->
	{@const Icon = categoryIcon(data.tool.category)}
	<div class="border-b border-border-low">
		<Container class="pt-28 pb-10 md:pt-32 md:pb-12">
			<a
				href="/dev-tools"
				class="ease-fluid inline-flex items-center gap-1.5 text-body-sm font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground"
			>
				<ArrowLeft class="size-3.5" />
				All tools
			</a>

			<div class="mt-6 max-w-xl">
				<SectionLabel icon={Icon} label={data.tool.category} />
				<h1 class="mt-4 text-balance text-heading text-ink-strong md:text-heading-lg">
					{data.tool.title}
				</h1>
				<p class="mt-3 text-pretty text-body-lg text-muted-foreground">
					{data.tool.description}
				</p>
			</div>
		</Container>
	</div>

	<Container class="py-16 md:py-20">
		<div class="max-w-xl">
			<p class="text-body text-foreground">This one is not built yet.</p>
			<p class="mt-3 text-body-sm text-muted-foreground">
				The catalogue entry is live, the browser implementation is not. Tools here run entirely on
				your machine, which means each needs its own rewrite rather than a framework translation.
			</p>
			<Button href="/dev-tools" variant="outline" size="sm" class="mt-6">
				Back to all tools
			</Button>
		</div>
	</Container>
{/if}

<!-- Related. Same hairline grid as the index, so a tool page ends in the
     catalogue rather than a dead end. -->
{#if related.length}
	<Section spacing="none" class="mx-auto max-w-6xl border-t border-border-low">
		<Container class="pt-12 pb-4">
			<SectionLabel label="More tools" />
		</Container>

		<Container>
			<div class="grid grid-cols-1 gap-px border-y border-border-low bg-border-low sm:grid-cols-3">
				{#each related as tool (tool.slug)}
					{@const Icon = categoryIcon(tool.category)}
					<a
						href="/dev-tools/{tool.slug}"
						class={cn(
							"group ease-fluid flex flex-col bg-background px-6 py-8 transition-colors duration-200",
							"hover:bg-paper focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
						)}
					>
						<div class="flex items-center justify-between">
							<Icon class="size-5 text-muted-foreground" weight="duotone" />
							<ArrowRight
								class="ease-fluid size-4 text-muted-foreground transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none"
							/>
						</div>
						<p class="mt-6 text-caption text-muted-foreground">{tool.category}</p>
						<h2 class="mt-1 font-display text-body font-medium text-foreground">{tool.title}</h2>
						<p class="mt-2 text-body-sm text-muted-foreground">{tool.description}</p>
					</a>
				{/each}
			</div>
		</Container>

		<Container class="py-10">
			<a
				href="/dev-tools"
				class="ease-fluid inline-flex items-center gap-1.5 text-body-sm font-medium text-primary underline-offset-4 transition-colors duration-200 hover:underline"
			>
				Browse all {devTools.length} tools
				<ArrowRight class="size-3.5" />
			</a>
		</Container>
	</Section>
{/if}

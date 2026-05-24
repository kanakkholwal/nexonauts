<script lang="ts">
	import { Badge } from "$lib/components/ui/badge";
	import { Button } from "$lib/components/ui/button";
	import { Input } from "$lib/components/ui/input";
	import { Textarea } from "$lib/components/ui/textarea";
	import * as Tabs from "$lib/components/ui/tabs";
	import Check from "@lucide/svelte/icons/check";
	import Copy from "@lucide/svelte/icons/copy";
	import ImageIcon from "@lucide/svelte/icons/image";
	import LayoutTemplate from "@lucide/svelte/icons/layout-template";
	import Tags from "@lucide/svelte/icons/tags";
	import Search from "@lucide/svelte/icons/search";
	import Share2 from "@lucide/svelte/icons/share-2";
	import MessageCircle from "@lucide/svelte/icons/message-circle";
	import { toast } from "svelte-sonner";
	import ToolShell from "./tool-shell.svelte";

	const defaultData = {
		google: {
			title: "Meta Tag Generator Tool",
			description:
				"Meta tags are used by search engines to help index and provide relevant search results.",
			image: "https://kkupgrader.github.io/tools/meta-tag-generator/meta-tag-generator.svg"
		},
		og: {
			title: "Meta Tag Generator Tool",
			description:
				"Meta tags are used by search engines to help index and provide relevant search results.",
			image: "https://kkupgrader.github.io/tools/meta-tag-generator/meta-tag-generator.svg",
			url: "https://nexonauts.com/",
			siteName: "Nexonauts",
			locale: "en_US"
		},
		twitter: {
			title: "Meta Tag Generator Tool",
			description:
				"Meta tags are used by search engines to help index and provide relevant search results.",
			image: "https://kkupgrader.github.io/tools/meta-tag-generator/meta-tag-generator.svg"
		}
	};

	let activeTab = $state("google");
	let copied = $state(false);
	let google = $state({ ...defaultData.google });
	let og = $state({ ...defaultData.og });
	let twitter = $state({ ...defaultData.twitter });

	const code = $derived(` <meta charset="utf-8" />
<title>${google.title}</title>
<meta name="description" content="${google.description}" />
<meta name="image" content="${google.image}" />

<meta itemprop="name" content="${google.title}" />
<meta itemprop="description" content="${google.description}" />
<meta itemprop="image" content="${google.image}" />

<meta property="og:title" content="${og.title}" />
<meta property="og:description" content="${og.description}" />
<meta property="og:image" content="${og.image}" />
<meta property="og:url" content="${og.url}" />
<meta property="og:site_name" content="${og.siteName}" />
<meta property="og:locale" content="${og.locale}" />
<meta property="og:type" content="website" />

<meta property="twitter:card" content="summary_large_image" />
<meta property="twitter:title" content="${twitter.title}" />
<meta property="twitter:description" content="${twitter.description}" />
<meta property="twitter:image:src" content="${twitter.image}" />`);

	async function handleCopy() {
		await navigator.clipboard.writeText(code);
		copied = true;
		toast.success("Meta tags copied");
		setTimeout(() => (copied = false), 2000);
	}

	function resetAll() {
		google = { ...defaultData.google };
		og = { ...defaultData.og };
		twitter = { ...defaultData.twitter };
	}
</script>

<ToolShell
	title="Meta Tag Generator"
	description="Generate Google, Open Graph, and Twitter metadata from a single browser-side form."
	icon={Tags}
	category="SEO"
	tags={["seo", "meta", "open-graph", "twitter-card"]}
	clearLabel="Reset defaults"
	canClear={true}
	onClear={resetAll}
>
	<div class="grid gap-8 lg:grid-cols-12">
		<div class="space-y-6 lg:col-span-7">
			<Tabs.Root bind:value={activeTab} class="w-full">
				<div class="overflow-x-auto pb-2">
					<Tabs.List class="h-auto justify-start gap-2 bg-transparent p-0">
						<Tabs.Trigger value="google" class="rounded-full border data-[state=inactive]:bg-background">
							<Search class="mr-2 h-4 w-4" />
							Google / SEO
						</Tabs.Trigger>
						<Tabs.Trigger value="og" class="rounded-full border data-[state=inactive]:bg-background">
							<Share2 class="mr-2 h-4 w-4" />
							Social (OG)
						</Tabs.Trigger>
						<Tabs.Trigger value="twitter" class="rounded-full border data-[state=inactive]:bg-background">
							<MessageCircle class="mr-2 h-4 w-4" />
							Twitter
						</Tabs.Trigger>
					</Tabs.List>
				</div>

				<div class="rounded-xl border border-border/50 bg-card/50 p-6 shadow-xl backdrop-blur-sm">
					<Tabs.Content value="google" class="space-y-4">
						<div class="flex items-center gap-2 border-b border-border/40 pb-2">
							<Search class="h-4 w-4 text-primary" />
							<h3 class="font-semibold">Search Engine Optimization</h3>
						</div>
						<label class="space-y-2 text-sm font-medium">
							Page title
							<Input bind:value={google.title} />
							<span class="block text-xs text-muted-foreground">{google.title.length} / 60</span>
						</label>
						<label class="space-y-2 text-sm font-medium">
							Meta description
							<Textarea bind:value={google.description} rows={3} />
							<span class="block text-xs text-muted-foreground">{google.description.length} / 160</span>
						</label>
						<label class="space-y-2 text-sm font-medium">
							Site image URL
							<div class="relative">
								<ImageIcon class="absolute top-2.5 left-3 h-4 w-4 text-muted-foreground" />
								<Input bind:value={google.image} class="pl-9" />
							</div>
						</label>
					</Tabs.Content>

					<Tabs.Content value="og" class="space-y-4">
						<div class="flex items-center gap-2 border-b border-border/40 pb-2">
							<LayoutTemplate class="h-4 w-4 text-primary" />
							<h3 class="font-semibold">Open Graph</h3>
						</div>
						<label class="space-y-2 text-sm font-medium">OG title<Input bind:value={og.title} /></label>
						<label class="space-y-2 text-sm font-medium">OG description<Textarea bind:value={og.description} rows={3} /></label>
						<div class="grid gap-4 md:grid-cols-2">
							<label class="space-y-2 text-sm font-medium">Site name<Input bind:value={og.siteName} /></label>
							<label class="space-y-2 text-sm font-medium">Locale<Input bind:value={og.locale} /></label>
						</div>
						<label class="space-y-2 text-sm font-medium">Canonical URL<Input bind:value={og.url} /></label>
						<label class="space-y-2 text-sm font-medium">OG image URL<Input bind:value={og.image} /></label>
					</Tabs.Content>

					<Tabs.Content value="twitter" class="space-y-4">
						<div class="flex items-center gap-2 border-b border-border/40 pb-2">
							<MessageCircle class="h-4 w-4 text-primary" />
							<h3 class="font-semibold">Twitter Card</h3>
						</div>
						<label class="space-y-2 text-sm font-medium">Twitter title<Input bind:value={twitter.title} /></label>
						<label class="space-y-2 text-sm font-medium">Twitter description<Textarea bind:value={twitter.description} rows={3} /></label>
						<label class="space-y-2 text-sm font-medium">Twitter image URL<Input bind:value={twitter.image} /></label>
					</Tabs.Content>
				</div>
			</Tabs.Root>
		</div>

		<div class="space-y-6 lg:col-span-5">
			<div class="space-y-2">
				<div class="text-sm font-semibold tracking-wider text-muted-foreground uppercase">Live Preview</div>
				<div class="rounded-xl border border-border/50 bg-card/50 p-4 shadow-sm">
					{#if activeTab === "google"}
						<div class="rounded-lg border border-border/20 bg-white p-4 font-sans text-black dark:bg-black dark:text-white">
							<div class="text-xl font-medium text-blue-700 dark:text-blue-300">{google.title}</div>
							<div class="mt-1 text-sm text-muted-foreground">{og.url}</div>
							<div class="mt-1 text-sm leading-relaxed text-gray-600 dark:text-gray-300">{google.description}</div>
						</div>
					{:else if activeTab === "og"}
						<div class="overflow-hidden rounded-lg border border-border/50">
							<div class="aspect-[1.91/1] bg-muted bg-cover bg-center" style={`background-image:url('${og.image}')`}></div>
							<div class="border-t border-border/10 bg-card p-3">
								<div class="mb-1 text-xs text-muted-foreground uppercase">{og.siteName}</div>
								<div class="font-semibold">{og.title}</div>
								<div class="text-xs text-muted-foreground">{og.description}</div>
							</div>
						</div>
					{:else}
						<div class="overflow-hidden rounded-xl border border-border/50 bg-card">
							<div class="aspect-[1.91/1] bg-muted bg-cover bg-center" style={`background-image:url('${twitter.image}')`}></div>
							<div class="p-3">
								<div class="font-semibold">{twitter.title}</div>
								<div class="text-xs text-muted-foreground">{twitter.description}</div>
								<div class="mt-2 text-xs text-muted-foreground">{og.url}</div>
							</div>
						</div>
					{/if}
				</div>
			</div>

			<div class="space-y-2">
				<div class="flex items-center justify-between">
					<div class="text-sm font-semibold tracking-wider text-muted-foreground uppercase">Generated HTML</div>
					<Button size="sm" variant="outline" class="gap-2" onclick={handleCopy}>
						{#if copied}
							<Check class="h-3 w-3 text-green-500" />
							Copied
						{:else}
							<Copy class="h-3 w-3" />
							Copy Code
						{/if}
					</Button>
				</div>
				<Textarea value={code} readonly class="min-h-[320px] bg-[#1e1e1e] font-mono text-xs leading-relaxed text-blue-100" />
			</div>
		</div>
	</div>
</ToolShell>

<script lang="ts">
	import ProductCard from "$lib/components/marketplace/product-card.svelte";
	import RenderPost from "$lib/components/blog/render-post.svelte";
	import { Badge } from "$lib/components/ui/badge";
	import { Button } from "$lib/components/ui/button";
	import ArrowUpRight from "@lucide/svelte/icons/arrow-up-right";
	import CalendarDays from "@lucide/svelte/icons/calendar-days";
	import Download from "@lucide/svelte/icons/download";
	import Edit from "@lucide/svelte/icons/edit";
	import Heart from "@lucide/svelte/icons/heart";
	import Share2 from "@lucide/svelte/icons/share-2";
	import ShieldCheck from "@lucide/svelte/icons/shield-check";
	import Sparkles from "@lucide/svelte/icons/sparkles";
	import TagIcon from "@lucide/svelte/icons/tag";
	import { decodeHTMLEntities, marketwiseLink } from "src/utils/string";
	import { appConfig } from "@root/project.config";
	import { toast } from "svelte-sonner";

	let { data } = $props();

	async function shareProduct() {
		const url = `${appConfig.url}/marketplace/products/${data.product.slug}`;
		try {
			if (navigator.share) {
				await navigator.share({ title: data.product.name, url });
			} else {
				await navigator.clipboard.writeText(url);
				toast.success("Product link copied");
			}
		} catch {
			/* dismissed */
		}
	}
</script>

<div class="min-h-screen bg-background selection:text-primary">
	<div class="pointer-events-none fixed inset-0 z-0">
		<div
			class="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px]"
		></div>
		<div class="absolute top-20 left-1/4 h-[500px] w-[500px] rounded-full bg-primary/5 blur-[150px]"></div>
	</div>

	<div class="relative z-10 mx-auto w-full max-w-[1400px] px-4 pt-24 pb-16 md:px-6 lg:px-8">
		<nav class="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
			<a href="/marketplace" class="transition-colors hover:text-foreground">Marketplace</a>
			<span>/</span>
			<span class="text-foreground">{decodeHTMLEntities(data.product.name)}</span>
		</nav>

		<div class="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
			<div class="space-y-8 lg:col-span-8">
				<div class="relative aspect-video w-full overflow-hidden rounded-2xl border border-border/50 bg-muted shadow-lg">
					<img
						src={data.product.preview_url}
						alt={decodeHTMLEntities(data.product.name)}
						class="h-full w-full object-cover"
					/>
					{#if data.product.categories?.[0]}
						<div class="absolute top-4 left-4">
							<Badge class="rounded-full border-border/50 bg-background/80 px-3 py-1.5 shadow-lg backdrop-blur-md">
								{data.product.categories[0]}
							</Badge>
						</div>
					{/if}
				</div>

				<div class="space-y-6">
					<div>
						<h1 class="mb-3 text-3xl font-bold tracking-tight md:text-4xl">
							{decodeHTMLEntities(data.product.name)}
						</h1>

						<div class="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
							<a
								href={`/profiles/${data.product.creator?.username}`}
								class="group flex items-center gap-2 font-medium text-foreground transition-colors hover:text-primary"
							>
								<div class="h-6 w-6 rounded-full bg-linear-to-br from-primary to-violet-500"></div>
								<span class="underline-offset-4 group-hover:underline">
									@{data.product.creator?.username}
								</span>
							</a>

							<span class="h-1 w-1 rounded-full bg-border"></span>

							<span class="flex items-center gap-1.5">
								<CalendarDays class="h-4 w-4" />
								{new Date(data.product.createdAt).toLocaleDateString("en-US", {
									month: "short",
									day: "numeric",
									year: "numeric"
								})}
							</span>
						</div>
					</div>

					<div class="rounded-xl border border-border/50 bg-card/50 p-6 backdrop-blur-sm">
						<h2 class="mb-4 flex items-center gap-2 text-lg font-semibold">
							<Sparkles class="h-5 w-5 text-primary" />
							About this Asset
						</h2>
						<RenderPost content={data.product.description} />
					</div>

					<div class="space-y-3">
						<h3 class="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
							<TagIcon class="h-4 w-4" />
							Tags
						</h3>
						<div class="flex flex-wrap gap-2">
							{#each data.product.tags.filter((tag) => tag.trim() !== "") as tag (tag)}
								<a
									href={`/marketplace/explore?tags=${encodeURIComponent(tag)}`}
									class="rounded-full border border-border/50 bg-card/50 px-3 py-1.5 text-sm text-muted-foreground transition-all hover:border-primary/50 hover:bg-primary/5 hover:text-foreground"
								>
									{tag}
								</a>
							{/each}
						</div>
					</div>

					<section class="border-t border-border/40 pt-8">
						<div class="mb-6 flex items-center justify-between">
							<h2 class="text-xl font-bold">
								More from {data.product.creator?.name ?? data.product.creator?.username}
							</h2>
							<a href={`/profiles/${data.product.creator?.username}`} class="text-primary inline-flex items-center">
								View Profile
								<ArrowUpRight class="ml-1 h-4 w-4" />
							</a>
						</div>

						{#if data.moreFromCreator.length === 0}
							<p class="text-sm text-muted-foreground">No other products from this creator yet.</p>
						{:else}
							<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
								{#each data.moreFromCreator as product (product._id)}
									<ProductCard {product} />
								{/each}
							</div>
						{/if}
					</section>
				</div>
			</div>

			<aside class="space-y-6 lg:col-span-4">
				<div class="sticky top-24 space-y-6">
					<div class="space-y-5 rounded-2xl border border-border/50 bg-card/80 p-6 shadow-lg backdrop-blur-sm">
						<div class="flex items-baseline justify-between border-b border-border/50 pb-4">
							<span class="text-sm font-medium text-muted-foreground">Price</span>
							<div class="text-right">
								<span class="text-3xl font-bold">
									{data.product.price ? `$${data.product.price}` : "Free"}
								</span>
								{#if data.product.price > 0}
									<p class="mt-1 ml-2 text-xs text-muted-foreground">One-time payment</p>
								{/if}
							</div>
						</div>

						<div class="space-y-3">
							<Button
								size="lg"
								class="h-12 w-full text-base font-semibold shadow-md"
								href={marketwiseLink(data.product.url, {
									utm_source: appConfig.url,
									utm_medium: "marketplace_product_page",
									utm_campaign: data.product.price ? "product_purchase" : "product_download"
								})}
								target="_blank"
							>
								{data.product.price ? "Buy Now" : "Download Free"}
								{#if data.product.price}
									<ArrowUpRight class="ml-2 h-4 w-4" />
								{:else}
									<Download class="ml-2 h-4 w-4" />
								{/if}
							</Button>

							<div class="grid grid-cols-2 gap-2">
								<Button variant="outline">
									<Heart class="mr-2 h-4 w-4" />
									Save
								</Button>
								<Button variant="outline" onclick={shareProduct}>
									<Share2 class="mr-2 h-4 w-4" />
									Share
								</Button>
							</div>
						</div>

						<div class="flex items-center justify-center gap-2 border-t border-border/50 pt-3 text-xs text-muted-foreground">
							<ShieldCheck class="h-4 w-4 text-emerald-500" />
							Secure & Instant Delivery
						</div>

						{#if data.isCreator}
							<div class="border-t border-border/50 pt-3">
								<Button variant="ghost" class="w-full text-muted-foreground hover:text-foreground" size="sm" href={`/dashboard/products`}>
									<Edit class="mr-2 h-4 w-4" />
									Manage Products
								</Button>
							</div>
						{/if}
					</div>

					<div class="space-y-4">
						<h3 class="text-lg font-semibold">Similar Assets</h3>
						{#if data.similarProducts.length === 0}
							<p class="text-sm text-muted-foreground">No similar products available.</p>
						{:else}
							<div class="space-y-4">
								{#each data.similarProducts.slice(0, 3) as product (product.slug)}
									<ProductCard {product} class="border-border/50 bg-card/50 shadow-sm hover:bg-card hover:shadow-md" />
								{/each}
							</div>
						{/if}
					</div>
				</div>
			</aside>
		</div>
	</div>
</div>

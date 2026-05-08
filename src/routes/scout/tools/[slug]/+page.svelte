<script lang="ts">
	import ToolCard from "$lib/components/scout/tool-card.svelte";
	import { Badge } from "$lib/components/ui/badge";
	import { Button } from "$lib/components/ui/button";
	import { Input } from "$lib/components/ui/input";
	import { Textarea } from "$lib/components/ui/textarea";
	import * as Tabs from "$lib/components/ui/tabs";
	import { getImages } from "$lib/scout";
	import { cn } from "$lib/utils";
	import { appConfig } from "@root/project.config";
	import ArrowUpRight from "@lucide/svelte/icons/arrow-up-right";
	import BarChart3 from "@lucide/svelte/icons/bar-chart-3";
	import Calendar from "@lucide/svelte/icons/calendar";
	import CheckCircle2 from "@lucide/svelte/icons/check-circle-2";
	import Eye from "@lucide/svelte/icons/eye";
	import Globe from "@lucide/svelte/icons/globe";
	import Hash from "@lucide/svelte/icons/hash";
	import Heart from "@lucide/svelte/icons/heart";
	import MessageSquare from "@lucide/svelte/icons/message-square";
	import Share2 from "@lucide/svelte/icons/share-2";
	import ShieldCheck from "@lucide/svelte/icons/shield-check";
	import Sparkles from "@lucide/svelte/icons/sparkles";
	import Star from "@lucide/svelte/icons/star";
	import Zap from "@lucide/svelte/icons/zap";
	import { toast } from "svelte-sonner";
	import { formatNumber } from "src/utils/formaters";
	import { decodeHTMLEntities, marketwiseLink } from "src/utils/string";

	let { data, form } = $props();

	const images = $derived(getImages(data.tool.link));
	const averageRatingLabel = $derived(data.averageRating.toFixed(1));
	const formMessage = $derived(form?.message ?? "");
	let activeTab = $state("all");
	$effect(() => {
		activeTab = form?.action === "review" ? "write" : "all";
	});

	async function shareTool() {
		const url = `${appConfig.url}/scout/tools/${data.tool.slug}`;
		try {
			if (navigator.share) {
				await navigator.share({ title: data.tool.name, url });
			} else {
				await navigator.clipboard.writeText(url);
				toast.success("Tool link copied");
			}
		} catch {
			/* user dismissed */
		}
	}

	function hostnameFor(url: string) {
		try {
			return new URL(url).hostname;
		} catch {
			return url;
		}
	}
</script>

<div class="min-h-screen bg-background">
	<div class="pointer-events-none fixed inset-0 z-0">
		<div
			class="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px]"
		></div>
		<div class="absolute top-20 left-1/4 h-[500px] w-[500px] rounded-full bg-primary/5 blur-[150px]"></div>
	</div>

	<div class="relative z-10 mx-auto w-full max-w-7xl px-4 pt-24 pb-16 sm:px-6 lg:px-8">
		<nav class="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
			<a href="/scout/browse" class="transition-colors hover:text-foreground">Browse</a>
			<span>/</span>
			<span class="text-foreground">{decodeHTMLEntities(data.tool.name)}</span>
		</nav>

		<div class="mb-8 flex flex-col items-start gap-5 md:flex-row">
			<div class="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-border/50 bg-muted shadow-md md:h-20 md:w-20">
				<img src={data.tool.coverImage} alt={decodeHTMLEntities(data.tool.name)} class="h-full w-full object-cover" />
			</div>

			<div class="flex-1 space-y-3">
				<div class="flex flex-wrap items-center gap-3">
					<h1 class="text-3xl font-bold tracking-tight md:text-4xl">
						{decodeHTMLEntities(data.tool.name)}
					</h1>
					{#if data.tool.verified}
						<Badge class="rounded-md border-emerald-500/20 bg-emerald-500/10 px-2 py-1 text-xs font-semibold text-emerald-600">
							<CheckCircle2 class="mr-1 h-3 w-3" />
							Verified
						</Badge>
					{/if}
				</div>

				<div class="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
					<div class="flex items-center gap-1.5">
						<Star class="h-4 w-4 fill-amber-500 text-amber-500" />
						<span class="font-semibold text-foreground">{averageRatingLabel}</span>
						<span>({data.reviewCount})</span>
					</div>
					<span class="h-1 w-1 rounded-full bg-border"></span>
					<div class="flex items-center gap-1.5">
						<Eye class="h-4 w-4" />
						<span class="font-medium text-foreground">{formatNumber(data.tool.views)}</span>
					</div>
					<span class="h-1 w-1 rounded-full bg-border"></span>
					<Badge variant="secondary" class="rounded-md bg-muted/50 px-2 py-0.5 text-xs capitalize">
						{data.tool.pricing_type}
					</Badge>
				</div>
			</div>
		</div>

		<div class="grid grid-cols-1 gap-8 lg:grid-cols-12">
			<main class="space-y-10 lg:col-span-8">
				<div class="relative aspect-video w-full overflow-hidden rounded-xl border border-border/50 bg-muted shadow-lg">
					<img
						src={images?.bannerURL || data.tool.bannerImage || data.tool.coverImage}
						alt={`${decodeHTMLEntities(data.tool.name)} screenshot`}
						class="h-full w-full object-cover"
					/>
				</div>

				<section class="space-y-4">
					<div class="flex items-center gap-2 border-b border-border/40 pb-3">
						<Zap class="h-5 w-5 text-primary" />
						<h2 class="text-xl font-semibold">About</h2>
					</div>
					<div class="rounded-xl border border-border/50 bg-card/40 p-5 text-sm leading-7 text-muted-foreground backdrop-blur-sm">
						{data.tool.description}
					</div>

					{#if data.tool.categories.length > 0}
						<div class="pt-4">
							<div class="flex flex-wrap gap-2">
								{#each data.tool.categories as category (category.slug)}
									<a
										href={`/scout/browse?category=${category.slug}`}
										class="flex items-center gap-1.5 rounded-full border border-border/50 bg-card/50 px-3 py-1.5 text-sm text-muted-foreground transition-all hover:border-primary/50 hover:bg-primary/5 hover:text-foreground"
									>
										<Hash class="h-3 w-3 opacity-50" />
										{category.name}
									</a>
								{/each}
							</div>
						</div>
					{/if}
				</section>

				<section id="reviews" class="border-t border-border/40 pt-8">
					<div class="mb-6 flex items-center gap-2">
						<MessageSquare class="h-5 w-5 text-primary" />
						<h2 class="text-xl font-semibold">Reviews</h2>
					</div>

					{#if formMessage}
						<div
							class={cn(
								"mb-6 rounded-xl border px-4 py-3 text-sm",
								form?.success
									? "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
									: "border-destructive/30 bg-destructive/10 text-destructive"
							)}
						>
							{formMessage}
						</div>
					{/if}

					<Tabs.Root bind:value={activeTab} class="w-full">
						<Tabs.List class="mb-6 border border-border/50 bg-muted/50">
							<Tabs.Trigger value="all">All ({data.ratings.length})</Tabs.Trigger>
							<Tabs.Trigger value="write">Write Review</Tabs.Trigger>
						</Tabs.List>

						<Tabs.Content value="all" class="space-y-5">
							{#if data.ratings.length > 0}
								<div class="space-y-5">
									{#each data.ratings as rating (rating._id)}
										<div class="rounded-xl border border-border/50 bg-card/30 p-5 backdrop-blur-sm">
											<div class="mb-3 flex items-start justify-between gap-4">
												<div>
													<p class="font-semibold text-foreground">{rating.userId.name}</p>
													<p class="text-xs text-muted-foreground">@{rating.userId.username}</p>
												</div>
												<div class="text-right">
													<div class="flex items-center gap-1 text-amber-500">
														{#each Array.from({ length: 5 }, (_, index) => index + 1) as value (value)}
															<Star
																class={cn(
																	"h-4 w-4",
																	value <= rating.rating ? "fill-current" : "text-muted-foreground/30"
																)}
															/>
														{/each}
													</div>
													<p class="mt-1 text-xs text-muted-foreground">
														{new Date(rating.createdAt ?? "").toLocaleDateString("en-US", {
															month: "short",
															day: "numeric",
															year: "numeric"
														})}
													</p>
												</div>
											</div>
											<p class="text-sm leading-relaxed text-muted-foreground">{rating.comment}</p>
										</div>
									{/each}
								</div>
							{:else}
								<div class="rounded-xl border border-dashed border-border/50 bg-muted/20 py-12 text-center">
									<Star class="mx-auto mb-3 h-10 w-10 text-muted-foreground/30" />
									<p class="text-sm text-muted-foreground">No reviews yet. Be the first.</p>
								</div>
							{/if}
						</Tabs.Content>

						<Tabs.Content value="write">
							{#if data.canReview}
								<form method="POST" action="?/review" class="space-y-4 rounded-xl border border-border/50 bg-card/40 p-5 backdrop-blur-sm">
									<div class="grid gap-4 sm:grid-cols-[140px,1fr] sm:items-start">
										<label for="rating" class="pt-2 text-sm font-medium">Rating</label>
										<Input id="rating" name="rating" type="number" min="1" max="5" step="1" placeholder="1 to 5" required />
									</div>

									<div class="grid gap-4 sm:grid-cols-[140px,1fr] sm:items-start">
										<label for="comment" class="pt-2 text-sm font-medium">Review</label>
										<Textarea
											id="comment"
											name="comment"
											required
											rows={5}
											minlength={10}
											maxlength={500}
											placeholder="What worked well, where does it fit, and who should use it?"
										/>
									</div>

									<div class="flex items-center justify-between gap-3">
										<p class="text-xs text-muted-foreground">Reviews require a signed-in, verified account with a profile.</p>
										<Button type="submit">Publish Review</Button>
									</div>
								</form>
							{:else}
								<div class="rounded-xl border border-border/50 bg-card/40 p-6 text-center backdrop-blur-sm">
									<p class="mb-4 text-sm text-muted-foreground">
										Sign in with a verified account and complete your profile to post reviews.
									</p>
									<Button href={`/auth/sign-in?callbackUrl=/scout/tools/${data.tool.slug}`} variant="outline">
										Sign In
									</Button>
								</div>
							{/if}
						</Tabs.Content>
					</Tabs.Root>
				</section>
			</main>

			<aside class="space-y-6 lg:col-span-4">
				<div class="sticky top-24 space-y-6">
					<div class="space-y-5 rounded-xl border border-border/50 bg-card/80 p-5 shadow-lg backdrop-blur-sm">
						<div class="flex items-baseline justify-between border-b border-border/50 pb-4">
							<span class="text-sm font-medium text-muted-foreground">Pricing</span>
							<span class="text-2xl font-bold capitalize">{data.tool.pricing_type}</span>
						</div>

						<div class="space-y-3">
							<Button
								size="lg"
								class="h-11 w-full text-base font-semibold shadow-md"
								href={marketwiseLink(data.tool.link, {
									utm_source: appConfig.url,
									utm_medium: "referral",
									utm_campaign: "tool_cta_button"
								})}
								target="_blank"
							>
								Visit Website
								<ArrowUpRight class="ml-2 h-4 w-4" />
							</Button>

							<div class="grid grid-cols-2 gap-2">
								<form method="POST" action="?/bookmark">
									<Button variant="outline" type="submit" class="w-full justify-center">
										<Heart class={cn("mr-2 h-4 w-4", data.isBookmarked && "fill-current text-rose-500")} />
										{data.isBookmarked ? "Saved" : "Save"}
									</Button>
								</form>
								<Button variant="outline" class="w-full justify-center" onclick={shareTool}>
									<Share2 class="mr-2 h-4 w-4" />
									Share
								</Button>
							</div>
						</div>

						<div class="flex items-center justify-center gap-2 border-t border-border/50 pt-3 text-xs text-muted-foreground">
							<ShieldCheck class="h-4 w-4 text-emerald-500" />
							Secure referral link tracking
						</div>

						<div class="space-y-3">
							<h4 class="text-xs font-bold tracking-wider text-muted-foreground uppercase">Details</h4>
							<div class="space-y-3 text-sm">
								<div class="flex items-center justify-between gap-4">
									<span class="flex items-center gap-2 text-muted-foreground">
										<Globe class="h-3.5 w-3.5" />
										Website
									</span>
									<span class="max-w-[150px] truncate font-medium" title={data.tool.link}>
										{hostnameFor(data.tool.link)}
									</span>
								</div>
								<div class="flex items-center justify-between">
									<span class="flex items-center gap-2 text-muted-foreground">
										<BarChart3 class="h-3.5 w-3.5" />
										Views
									</span>
									<span class="font-medium">{formatNumber(data.tool.views)}</span>
								</div>
								<div class="flex items-center justify-between">
									<span class="flex items-center gap-2 text-muted-foreground">
										<Calendar class="h-3.5 w-3.5" />
										Added
									</span>
									<span class="text-xs font-medium">
										{new Date(data.tool.createdAt ?? "").toLocaleDateString("en-US", {
											month: "short",
											day: "numeric",
											year: "numeric"
										})}
									</span>
								</div>
							</div>
						</div>
					</div>

					<div class="rounded-xl border border-border/50 bg-card/50 p-5 backdrop-blur-sm">
						<h3 class="mb-4 text-base font-semibold">Similar Tools</h3>
						{#if data.similarTools.length === 0}
							<p class="text-sm text-muted-foreground">No similar tools available.</p>
						{:else}
							<div class="space-y-4">
								{#each data.similarTools as tool (tool._id)}
									<ToolCard {tool} class="border-border/50 bg-card/50 shadow-sm hover:bg-card hover:shadow-md" />
								{/each}
							</div>
						{/if}
					</div>

					<div class="rounded-xl border border-border/40 bg-card/30 p-5 backdrop-blur-sm">
						<div class="mb-3 flex items-center gap-3">
							<Sparkles class="h-4 w-4 text-primary" />
							<span class="text-xs font-bold tracking-widest text-muted-foreground uppercase">
								Scout Insight
							</span>
						</div>
						<p class="text-sm leading-relaxed text-muted-foreground">
							Bookmarking and review posting are now live on this migrated route. Remaining parity work is focused on admin-side moderation flows.
						</p>
					</div>
				</div>
			</aside>
		</div>
	</div>
</div>

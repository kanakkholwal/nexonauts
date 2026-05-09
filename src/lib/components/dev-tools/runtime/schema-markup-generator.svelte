<!-- @migration-task Error while migrating Svelte code: Can only bind to an Identifier or MemberExpression or a `{get, set}` pair
https://svelte.dev/e/bind_invalid_expression -->
<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import { Input } from "$lib/components/ui/input";
	import { Label } from "$lib/components/ui/label";
	import { RadioGroup, RadioGroupItem } from "$lib/components/ui/radio-group";
	import * as Select from "$lib/components/ui/select";
	import { Switch } from "$lib/components/ui/switch";
	import * as Tabs from "$lib/components/ui/tabs";
	import Check from "@lucide/svelte/icons/check";
	import Copy from "@lucide/svelte/icons/copy";
	import FileText from "@lucide/svelte/icons/file-text";
	import Globe from "@lucide/svelte/icons/globe";
	import MapIcon from "@lucide/svelte/icons/map";
	import Plus from "@lucide/svelte/icons/plus";
	import Search from "@lucide/svelte/icons/search";
	import Settings2 from "@lucide/svelte/icons/settings-2";
	import ShoppingBag from "@lucide/svelte/icons/shopping-bag";
	import Trash2 from "@lucide/svelte/icons/trash-2";
	import User from "@lucide/svelte/icons/user";
	import { toast } from "svelte-sonner";
	import ToolShell from "./tool-shell.svelte";

	type WebsiteState = {
		name: string;
		alternateName: string;
		url: string;
		searchQuery: string;
		queryString: string;
	};

	type BreadcrumbItem = { name: string; url: string; image: string };

	type PersonState = {
		name: string;
		alternateName: string;
		url: string;
		image: string;
		jobTitle: string;
		worksFor: string;
		telephone: string;
		email: string;
		address: string;
		sameAs: string;
	};

	type ArticleState = {
		headline: string;
		isAMP: boolean;
		image: string;
		width: string;
		height: string;
		author: string;
		publisher: string;
		datePublished: string;
		dateModified: string;
		description: string;
		articleBody: string;
		url: string;
		sameAs: string;
	};

	type IdentifierKey = "sku" | "gtin8" | "gtin13" | "gtin14" | "mpn";

	type ProductIdentifier = { enable: boolean; value: string };

	type ProductBasic = { name: string; image: string; description: string; brand: string; url: string };

	type ProductOffers = {
		price: string;
		priceCurrency: string;
		priceValidUntil: string;
		lowPrice: string;
		type: "Offer" | "AggregateOffer";
		url: string;
		itemCondition: "New" | "Used" | "Refurbished" | "Damaged";
		availability: "InStock" | "OutOfStock" | "PreOrder" | "SoldOut" | "Discontinued";
	};

	type ProductRatings = {
		ratingValue: string;
		bestRating: string;
		worstRating: string;
		ratingCount: string;
	};

	const PRODUCT_IDENTIFIERS: { value: IdentifierKey; label: string }[] = [
		{ value: "sku", label: "SKU" },
		{ value: "gtin8", label: "GTIN-8" },
		{ value: "gtin13", label: "GTIN-13" },
		{ value: "gtin14", label: "GTIN-14" },
		{ value: "mpn", label: "MPN" }
	];

	const COMMON_CURRENCIES = [
		"USD",
		"EUR",
		"GBP",
		"INR",
		"JPY",
		"AUD",
		"CAD",
		"CHF",
		"CNY",
		"BRL",
		"MXN",
		"SGD",
		"NZD",
		"KRW",
		"AED"
	];

	let activeTab = $state("website");
	let copied = $state(false);

	let website = $state<WebsiteState>({
		name: "",
		alternateName: "",
		url: "",
		searchQuery: "",
		queryString: ""
	});

	let breadcrumbs = $state<BreadcrumbItem[]>([{ name: "", url: "", image: "" }]);

	let person = $state<PersonState>({
		name: "",
		alternateName: "",
		url: "",
		image: "",
		jobTitle: "",
		worksFor: "",
		telephone: "",
		email: "",
		address: "",
		sameAs: ""
	});

	let articleType = $state<"NewsArticle" | "BlogPosting">("NewsArticle");
	let article = $state<ArticleState>({
		headline: "",
		isAMP: false,
		image: "",
		width: "",
		height: "",
		author: "",
		publisher: "",
		datePublished: "",
		dateModified: "",
		description: "",
		articleBody: "",
		url: "",
		sameAs: ""
	});

	let productBasic = $state<ProductBasic>({
		name: "",
		image: "",
		description: "",
		brand: "",
		url: ""
	});
	let productIdentifiers = $state<Record<IdentifierKey, ProductIdentifier>>({
		sku: { enable: false, value: "" },
		gtin8: { enable: false, value: "" },
		gtin13: { enable: false, value: "" },
		gtin14: { enable: false, value: "" },
		mpn: { enable: false, value: "" }
	});
	let productOffers = $state<ProductOffers>({
		price: "",
		priceCurrency: "USD",
		priceValidUntil: "",
		lowPrice: "",
		type: "Offer",
		url: "",
		itemCondition: "New",
		availability: "InStock"
	});
	let productRatings = $state<ProductRatings>({
		ratingValue: "",
		bestRating: "5",
		worstRating: "1",
		ratingCount: ""
	});

	const websiteCode = $derived(`<script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "${website.name}",
      "alternateName": "${website.alternateName}",
      "url": "${website.url}"${
				website.searchQuery.length > 0
					? `,
      "potentialAction": {
        "@type": "SearchAction",
        "target": "${website.searchQuery}{search_term_string}${website.queryString}",
        "query-input": "required name=search_term_string"
      }`
					: ""
			}
    }
<\/script>`);

	const breadcrumbsCode = $derived(`<script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [${breadcrumbs
				.map(
					(item, index) => `
        {
          "@type": "ListItem",
          "position": ${index + 1},
          "name": "${item.name}",
          "item": "${item.url}",
          "image": "${item.image}"
        }`
				)
				.join(",")}
      ]
    }
<\/script>`);

	const personCode = $derived(`<script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "${person.name}",
      "alternateName": "${person.alternateName}",
      "url": "${person.url}",
      "image": "${person.image}",
      "jobTitle": "${person.jobTitle}",
      "worksFor": "${person.worksFor}",
      "telephone": "${person.telephone}",
      "email": "${person.email}",
      "address": "${person.address}",
      "sameAs": [${person.sameAs
				.split(",")
				.map((item) => `"${item.trim()}"`)
				.join(",")}]
    }
<\/script>`);

	const articleCode = $derived(`<script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "${articleType}",
      "headline": "${article.headline}",
      "image": {
          "@type": "ImageObject",
          "url": "${article.image}",
          "width": "${article.width}",
          "height": "${article.height}"
      }${
				article.isAMP
					? `,
      "author": {
          "@type": "Person",
          "name": "${article.author}"
      },
      "publisher": "${article.publisher}",
      "datePublished": "${article.datePublished}",
      "dateModified": "${article.dateModified}",
      "description": "${article.description}",
      "articleBody": "${article.articleBody}",
      "url": "${article.url}",
      "sameAs": [${article.sameAs
				.split(",")
				.map((item) => `"${item.trim()}"`)
				.join(",")}]`
					: ""
			}
    }
<\/script>`);

	const productCode = $derived.by(() => {
		const identifiers = (Object.keys(productIdentifiers) as IdentifierKey[])
			.filter((key) => productIdentifiers[key].enable && productIdentifiers[key].value.trim().length > 0)
			.map((key) => `"${key}": "${productIdentifiers[key].value.trim()}"`)
			.join(",\n      ");

		const offerStr =
			productOffers.type === "Offer"
				? `"priceValidUntil": "${productOffers.priceValidUntil}",\n      "url": "${productOffers.url}",\n      "availability": "http://schema.org/${productOffers.availability}",\n      "itemCondition": "http://schema.org/${productOffers.itemCondition}",`
				: "";

		return `<script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "${productBasic.name}",
      "image": "${productBasic.image}",
      "description": "${productBasic.description}",
      "brand": {
          "@type": "Brand",
          "name": "${productBasic.brand}"
      },
      "url": "${productBasic.url}",
      "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "${productRatings.ratingValue}",
          "bestRating": "${productRatings.bestRating}",
          "worstRating": "${productRatings.worstRating}",
          "ratingCount": "${productRatings.ratingCount}"
      },
      "offers": {
          "@type": "${productOffers.type}",
          "priceCurrency": "${productOffers.priceCurrency}",
          "lowPrice": "${productOffers.lowPrice}",
          ${offerStr}
      }${identifiers ? ",\n      " + identifiers : ""}
    }
<\/script>`;
	});

	const code = $derived.by(() => {
		switch (activeTab) {
			case "breadcrumbs":
				return breadcrumbsCode;
			case "person":
				return personCode;
			case "article":
				return articleCode;
			case "product":
				return productCode;
			default:
				return websiteCode;
		}
	});

	async function handleCopy() {
		await navigator.clipboard.writeText(code);
		copied = true;
		toast.success("Schema markup copied");
		setTimeout(() => (copied = false), 2000);
	}

	function resetAll() {
		website = { name: "", alternateName: "", url: "", searchQuery: "", queryString: "" };
		breadcrumbs = [{ name: "", url: "", image: "" }];
		person = {
			name: "",
			alternateName: "",
			url: "",
			image: "",
			jobTitle: "",
			worksFor: "",
			telephone: "",
			email: "",
			address: "",
			sameAs: ""
		};
		articleType = "NewsArticle";
		article = {
			headline: "",
			isAMP: false,
			image: "",
			width: "",
			height: "",
			author: "",
			publisher: "",
			datePublished: "",
			dateModified: "",
			description: "",
			articleBody: "",
			url: "",
			sameAs: ""
		};
		productBasic = { name: "", image: "", description: "", brand: "", url: "" };
		productIdentifiers = {
			sku: { enable: false, value: "" },
			gtin8: { enable: false, value: "" },
			gtin13: { enable: false, value: "" },
			gtin14: { enable: false, value: "" },
			mpn: { enable: false, value: "" }
		};
		productOffers = {
			price: "",
			priceCurrency: "USD",
			priceValidUntil: "",
			lowPrice: "",
			type: "Offer",
			url: "",
			itemCondition: "New",
			availability: "InStock"
		};
		productRatings = { ratingValue: "", bestRating: "5", worstRating: "1", ratingCount: "" };
	}

	function addBreadcrumb() {
		breadcrumbs = [...breadcrumbs, { name: "", url: "", image: "" }];
	}

	function removeBreadcrumb(index: number) {
		breadcrumbs = breadcrumbs.filter((_, i) => i !== index);
	}
</script>

<ToolShell
	title="Schema Markup Generator"
	description="Generate valid JSON-LD structured data for websites, breadcrumbs, people, articles, and products — all in your browser."
	icon="🧬"
	clearLabel="Reset all"
	canClear={true}
	onClear={resetAll}
>
	<div class="grid items-start gap-8 lg:grid-cols-12">
		<div class="space-y-6 lg:col-span-7">
			<Tabs.Root bind:value={activeTab} class="w-full">
				<div class="overflow-x-auto pb-2">
					<Tabs.List class="h-auto justify-start gap-2 bg-transparent p-0">
						<Tabs.Trigger value="website" class="rounded-full border data-[state=inactive]:bg-background">
							<Globe class="mr-2 h-4 w-4" />
							Website
						</Tabs.Trigger>
						<Tabs.Trigger value="breadcrumbs" class="rounded-full border data-[state=inactive]:bg-background">
							<MapIcon class="mr-2 h-4 w-4" />
							Breadcrumbs
						</Tabs.Trigger>
						<Tabs.Trigger value="person" class="rounded-full border data-[state=inactive]:bg-background">
							<User class="mr-2 h-4 w-4" />
							Person
						</Tabs.Trigger>
						<Tabs.Trigger value="article" class="rounded-full border data-[state=inactive]:bg-background">
							<FileText class="mr-2 h-4 w-4" />
							Article
						</Tabs.Trigger>
						<Tabs.Trigger value="product" class="rounded-full border data-[state=inactive]:bg-background">
							<ShoppingBag class="mr-2 h-4 w-4" />
							Product
						</Tabs.Trigger>
					</Tabs.List>
				</div>

				<div class="rounded-xl border border-border/50 bg-card/50 p-6 shadow-xl backdrop-blur-sm">
					<Tabs.Content value="website" class="space-y-8">
						<div class="space-y-4">
							<h3 class="border-b pb-2 text-lg font-semibold">Basic Identity</h3>
							<div class="grid gap-4 md:grid-cols-2">
								<div class="space-y-2">
									<Label for="ws-name">Website Name</Label>
									<Input id="ws-name" placeholder="e.g. Nexonauts" bind:value={website.name} />
								</div>
								<div class="space-y-2">
									<Label for="ws-alt">Alternate Name</Label>
									<Input id="ws-alt" placeholder="e.g. NX Tools" bind:value={website.alternateName} />
								</div>
								<div class="space-y-2 md:col-span-2">
									<Label for="ws-url">Website URL</Label>
									<Input id="ws-url" type="url" placeholder="https://..." bind:value={website.url} />
								</div>
							</div>
						</div>

						<div class="space-y-4">
							<div class="flex items-center gap-2 border-b pb-2">
								<Search class="h-4 w-4 text-primary" />
								<h3 class="text-lg font-semibold">Sitelinks Search Box</h3>
							</div>
							<div class="grid gap-4 md:grid-cols-2">
								<div class="space-y-2">
									<Label for="ws-sq">Search Query URL</Label>
									<Input
										id="ws-sq"
										placeholder="https://example.com/search?q="
										bind:value={website.searchQuery}
									/>
									<p class="text-[10px] text-muted-foreground">
										The URL that handles internal searches.
									</p>
								</div>
								<div class="space-y-2">
									<Label for="ws-qs">Query String Parameter</Label>
									<Input
										id="ws-qs"
										placeholder="Optional suffix"
										bind:value={website.queryString}
										disabled={website.searchQuery === ""}
									/>
								</div>
							</div>
						</div>
					</Tabs.Content>

					<Tabs.Content value="breadcrumbs" class="space-y-6">
						<div class="flex items-center justify-between border-b pb-2">
							<h3 class="text-lg font-semibold">Hierarchy Items</h3>
							<Button size="sm" onclick={addBreadcrumb}>
								<Plus class="mr-1 h-4 w-4" />
								Add Item
							</Button>
						</div>

						<div class="space-y-4">
							{#each breadcrumbs as item, index (index)}
								<div
									class="group relative rounded-xl border border-border/60 bg-muted/20 p-4 transition-colors hover:border-primary/30"
								>
									<div class="mb-4 flex items-center justify-between">
										<span class="text-xs font-bold tracking-wider text-muted-foreground uppercase">
											Position #{index + 1}
										</span>
										{#if breadcrumbs.length > 1}
											<Button
												size="icon"
												variant="ghost"
												class="h-6 w-6 text-destructive hover:bg-destructive/10"
												onclick={() => removeBreadcrumb(index)}
											>
												<Trash2 class="h-3 w-3" />
											</Button>
										{/if}
									</div>

									<div class="grid gap-4 md:grid-cols-2">
										<div class="space-y-2">
											<Label>Name</Label>
											<Input placeholder="Home" bind:value={item.name} />
										</div>
										<div class="space-y-2">
											<Label>URL</Label>
											<Input placeholder="https://..." bind:value={item.url} />
										</div>
										<div class="space-y-2 md:col-span-2">
											<Label>Image (Optional)</Label>
											<Input placeholder="https://..." bind:value={item.image} />
										</div>
									</div>
								</div>
							{/each}
						</div>
					</Tabs.Content>

					<Tabs.Content value="person" class="space-y-6">
						<h3 class="border-b pb-2 text-lg font-semibold">Personal Information</h3>
						<div class="grid gap-4 md:grid-cols-2">
							<div class="space-y-2">
								<Label>Name</Label>
								<Input placeholder="John Doe" bind:value={person.name} />
							</div>
							<div class="space-y-2">
								<Label>Job Title</Label>
								<Input placeholder="Software Engineer" bind:value={person.jobTitle} />
							</div>
							<div class="space-y-2">
								<Label>Email</Label>
								<Input type="email" placeholder="john@example.com" bind:value={person.email} />
							</div>
							<div class="space-y-2">
								<Label>Phone</Label>
								<Input type="tel" placeholder="+1-555-..." bind:value={person.telephone} />
							</div>
							<div class="space-y-2">
								<Label>Works For</Label>
								<Input placeholder="Company Name" bind:value={person.worksFor} />
							</div>
							<div class="space-y-2">
								<Label>Website / URL</Label>
								<Input placeholder="https://johndoe.com" bind:value={person.url} />
							</div>
							<div class="space-y-2 md:col-span-2">
								<Label>Address</Label>
								<Input placeholder="123 Main St, City, Country" bind:value={person.address} />
							</div>
							<div class="space-y-2 md:col-span-2">
								<Label>Social Profiles (Comma separated)</Label>
								<Input
									placeholder="https://twitter.com/john, https://linkedin.com/in/john"
									bind:value={person.sameAs}
								/>
							</div>
						</div>
					</Tabs.Content>

					<Tabs.Content value="article" class="space-y-6">
						<RadioGroup bind:value={articleType} class="grid grid-cols-2 gap-4">
							<div>
								<RadioGroupItem value="NewsArticle" id="news" class="peer sr-only" />
								<Label
									for="news"
									class="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary"
								>
									News Article
								</Label>
							</div>
							<div>
								<RadioGroupItem value="BlogPosting" id="blog" class="peer sr-only" />
								<Label
									for="blog"
									class="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary"
								>
									Blog Posting
								</Label>
							</div>
						</RadioGroup>

						<div class="space-y-2">
							<Label>Headline</Label>
							<Input placeholder="Article Title" bind:value={article.headline} />
						</div>

						<div class="grid gap-4 md:grid-cols-3">
							<div class="space-y-2 md:col-span-3">
								<Label>Image URL</Label>
								<Input placeholder="https://..." bind:value={article.image} />
							</div>
							<div class="space-y-2">
								<Label>Width (px)</Label>
								<Input type="number" placeholder="1200" bind:value={article.width} />
							</div>
							<div class="space-y-2">
								<Label>Height (px)</Label>
								<Input type="number" placeholder="630" bind:value={article.height} />
							</div>
						</div>

						<div class="flex items-center space-x-2 border-y border-border/50 py-4">
							<Switch id="isAmp" bind:checked={article.isAMP} />
							<Label for="isAmp">Enable Extended Fields (AMP / Rich Snippet)</Label>
						</div>

						{#if article.isAMP}
							<div class="grid gap-4 md:grid-cols-2">
								<div class="space-y-2">
									<Label>Author</Label>
									<Input bind:value={article.author} />
								</div>
								<div class="space-y-2">
									<Label>Publisher</Label>
									<Input bind:value={article.publisher} />
								</div>
								<div class="space-y-2">
									<Label>Date Published</Label>
									<Input type="date" bind:value={article.datePublished} />
								</div>
								<div class="space-y-2">
									<Label>Date Modified</Label>
									<Input type="date" bind:value={article.dateModified} />
								</div>
								<div class="space-y-2 md:col-span-2">
									<Label>Description</Label>
									<Input bind:value={article.description} />
								</div>
								<div class="space-y-2 md:col-span-2">
									<Label>Canonical URL</Label>
									<Input bind:value={article.url} />
								</div>
							</div>
						{/if}
					</Tabs.Content>

					<Tabs.Content value="product" class="space-y-8">
						<div class="space-y-4">
							<h3 class="border-b pb-2 text-lg font-semibold">Product Details</h3>
							<div class="grid gap-4 md:grid-cols-2">
								<div class="space-y-2">
									<Label>Product Name</Label>
									<Input bind:value={productBasic.name} />
								</div>
								<div class="space-y-2">
									<Label>Brand</Label>
									<Input bind:value={productBasic.brand} />
								</div>
								<div class="space-y-2">
									<Label>Image URL</Label>
									<Input bind:value={productBasic.image} />
								</div>
								<div class="space-y-2">
									<Label>Product URL</Label>
									<Input bind:value={productBasic.url} />
								</div>
								<div class="space-y-2 md:col-span-2">
									<Label>Description</Label>
									<Input bind:value={productBasic.description} />
								</div>
							</div>
						</div>

						<div class="space-y-4">
							<h3 class="border-b pb-2 text-lg font-semibold">Identifiers</h3>
							<div class="grid gap-4 md:grid-cols-2">
								{#each PRODUCT_IDENTIFIERS as identifier (identifier.value)}
									<div class="flex items-end gap-2 rounded-md border p-3">
										<div class="flex-1 space-y-2">
											<Label class="text-xs uppercase text-muted-foreground">{identifier.label}</Label>
											<Input
												class="h-8"
												placeholder="Value..."
												bind:value={productIdentifiers[identifier.value].value}
												disabled={!productIdentifiers[identifier.value].enable}
											/>
										</div>
										<Switch bind:checked={productIdentifiers[identifier.value].enable} />
									</div>
								{/each}
							</div>
						</div>

						<div class="space-y-4">
							<h3 class="border-b pb-2 text-lg font-semibold">Pricing & Offers</h3>
							<div class="grid gap-4 md:grid-cols-2">
								<div class="space-y-2">
									<Label>Offer Type</Label>
									<Select.Root type="single" bind:value={productOffers.type as string}>
										<Select.Trigger>
											{productOffers.type === "Offer" ? "Single Offer" : "Aggregate Offer"}
										</Select.Trigger>
										<Select.Content>
											<Select.Item value="Offer">Single Offer</Select.Item>
											<Select.Item value="AggregateOffer">Aggregate Offer</Select.Item>
										</Select.Content>
									</Select.Root>
								</div>
								<div class="space-y-2">
									<Label>Currency</Label>
									<Select.Root type="single" bind:value={productOffers.priceCurrency}>
										<Select.Trigger>{productOffers.priceCurrency}</Select.Trigger>
										<Select.Content>
											{#each COMMON_CURRENCIES as currency (currency)}
												<Select.Item value={currency}>{currency}</Select.Item>
											{/each}
										</Select.Content>
									</Select.Root>
								</div>

								{#if productOffers.type === "Offer"}
									<div class="space-y-2">
										<Label>Price</Label>
										<Input type="number" bind:value={productOffers.price} />
									</div>
									<div class="space-y-2">
										<Label>Valid Until</Label>
										<Input type="date" bind:value={productOffers.priceValidUntil} />
									</div>
									<div class="space-y-2">
										<Label>Availability</Label>
										<Select.Root type="single" bind:value={productOffers.availability as string}>
											<Select.Trigger>{productOffers.availability}</Select.Trigger>
											<Select.Content>
												{#each ["InStock", "OutOfStock", "PreOrder", "SoldOut", "Discontinued"] as state (state)}
													<Select.Item value={state}>{state}</Select.Item>
												{/each}
											</Select.Content>
										</Select.Root>
									</div>
									<div class="space-y-2">
										<Label>Condition</Label>
										<Select.Root type="single" bind:value={productOffers.itemCondition as string}>
											<Select.Trigger>{productOffers.itemCondition}</Select.Trigger>
											<Select.Content>
												{#each ["New", "Used", "Refurbished", "Damaged"] as condition (condition)}
													<Select.Item value={condition}>{condition}</Select.Item>
												{/each}
											</Select.Content>
										</Select.Root>
									</div>
								{:else}
									<div class="space-y-2 md:col-span-2">
										<Label>Low Price</Label>
										<Input type="number" bind:value={productOffers.lowPrice} />
									</div>
								{/if}
							</div>
						</div>

						<div class="space-y-4">
							<h3 class="border-b pb-2 text-lg font-semibold">Reviews</h3>
							<div class="grid grid-cols-2 gap-4 md:grid-cols-4">
								<div class="space-y-2">
									<Label>Score</Label>
									<Input type="number" bind:value={productRatings.ratingValue} />
								</div>
								<div class="space-y-2">
									<Label>Count</Label>
									<Input type="number" bind:value={productRatings.ratingCount} />
								</div>
								<div class="space-y-2">
									<Label>Best</Label>
									<Input type="number" bind:value={productRatings.bestRating} />
								</div>
								<div class="space-y-2">
									<Label>Worst</Label>
									<Input type="number" bind:value={productRatings.worstRating} />
								</div>
							</div>
						</div>
					</Tabs.Content>
				</div>
			</Tabs.Root>
		</div>

		<div class="space-y-4 lg:col-span-5 lg:sticky lg:top-8">
			<div class="flex items-center justify-between">
				<h3
					class="flex items-center gap-2 text-sm font-semibold tracking-wider text-muted-foreground uppercase"
				>
					<Settings2 class="h-4 w-4" />
					JSON-LD Preview
				</h3>
				<Button
					size="sm"
					variant="outline"
					onclick={handleCopy}
					class="h-8 gap-2 bg-background/50 text-xs hover:bg-background"
				>
					{#if copied}
						<Check class="h-3 w-3 text-green-500" />
						Copied
					{:else}
						<Copy class="h-3 w-3" />
						Copy Code
					{/if}
				</Button>
			</div>

			<div class="relative overflow-hidden rounded-xl border border-border/50 bg-[#1e1e1e] shadow-2xl">
				<div
					class="absolute top-0 right-0 left-0 flex h-10 items-center gap-2 border-b border-white/5 bg-[#252526] px-4"
				>
					<div class="h-3 w-3 rounded-full bg-red-500/80"></div>
					<div class="h-3 w-3 rounded-full bg-yellow-500/80"></div>
					<div class="h-3 w-3 rounded-full bg-green-500/80"></div>
				</div>
				<pre
					class="max-h-[calc(100vh-200px)] overflow-auto pt-12 pb-4 pr-4 pl-4 font-mono text-xs leading-relaxed text-blue-100"><code
						>{code}</code
					></pre>
			</div>

			<div class="rounded-lg border border-primary/10 bg-primary/5 p-4 text-sm text-muted-foreground">
				<p>
					Using
					<span class="font-semibold text-foreground">React or Next.js?</span>
					Convert this output using our
					<a href="/dev-tools/html-to-jsx-convertor" class="font-medium text-primary hover:underline">
						HTML to JSX Converter
					</a>.
				</p>
			</div>
		</div>
	</div>
</ToolShell>

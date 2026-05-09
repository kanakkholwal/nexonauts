<script lang="ts">
	import { untrack } from "svelte";
	import { enhance } from "$app/forms";
	import { Button } from "$lib/components/ui/button";
	import { Input } from "$lib/components/ui/input";
	import { Label } from "$lib/components/ui/label";
	import * as Select from "$lib/components/ui/select";
	import { Switch } from "$lib/components/ui/switch";
	import { Textarea } from "$lib/components/ui/textarea";
	import LoaderCircle from "@lucide/svelte/icons/loader-circle";
	import Plus from "@lucide/svelte/icons/plus";
	import X from "@lucide/svelte/icons/x";

	type Category = { name: string; slug: string };

	type Props = {
		formAction: string;
		submitLabel?: string;
		availableCategories: Category[];
		pricingTypes: readonly string[];
		statuses: readonly string[];
		showVerifiedToggle?: boolean;
		initial?: {
			name?: string;
			description?: string;
			link?: string;
			coverImage?: string;
			bannerImage?: string;
			tags?: string[];
			categories?: Category[];
			pricing_type?: string;
			status?: string;
			verified?: boolean;
		};
	};

	const {
		formAction,
		submitLabel = "Save changes",
		availableCategories,
		pricingTypes,
		statuses,
		showVerifiedToggle = false,
		initial = {}
	}: Props = $props();

	const seed = untrack(() => initial);
	const seedPricing = untrack(() => pricingTypes);
	const seedStatuses = untrack(() => statuses);

	let name = $state(seed.name ?? "");
	let description = $state(seed.description ?? "");
	let link = $state(seed.link ?? "");
	let coverImage = $state(seed.coverImage ?? "");
	let bannerImage = $state(seed.bannerImage ?? "");
	let tagsInput = $state((seed.tags ?? []).join(", "));
	let categories = $state<Category[]>(seed.categories ?? []);
	let pricingType = $state(seed.pricing_type ?? seedPricing[0]);
	let status = $state(seed.status ?? seedStatuses[0]);
	let verified = $state(seed.verified ?? false);
	let categoryPickerValue = $state("");
	let newCategoryName = $state("");
	let submitting = $state(false);

	function addCategoryFromPicker() {
		if (!categoryPickerValue) return;
		const found = availableCategories.find((c) => c.slug === categoryPickerValue);
		if (!found) return;
		if (categories.some((c) => c.slug === found.slug)) return;
		categories = [...categories, found];
		categoryPickerValue = "";
	}

	function addNewCategory() {
		const name = newCategoryName.trim();
		if (name.length < 2) return;
		const slug = name
			.toLowerCase()
			.replace(/[^a-z0-9\s-]/g, "")
			.replace(/\s+/g, "-")
			.replace(/-+/g, "-");
		if (!slug || categories.some((c) => c.slug === slug)) return;
		categories = [...categories, { name, slug }];
		newCategoryName = "";
	}

	function removeCategory(slug: string) {
		categories = categories.filter((c) => c.slug !== slug);
	}
</script>

<form
	method="POST"
	action={formAction}
	use:enhance={() => {
		submitting = true;
		return async ({ update }) => {
			await update({ reset: false });
			submitting = false;
		};
	}}
	class="bg-card grid gap-5 rounded-lg border p-4 md:grid-cols-3"
>
	<div class="flex flex-col gap-4 md:col-span-2">
		<div class="space-y-2">
			<Label for="tool-name">Name</Label>
			<Input id="tool-name" name="name" bind:value={name} placeholder="Awesome tool" required />
		</div>

		<div class="space-y-2">
			<Label for="tool-description">Description</Label>
			<Textarea
				id="tool-description"
				name="description"
				bind:value={description}
				rows={6}
				required
			/>
		</div>

		<div class="space-y-2">
			<Label for="tool-link">External link</Label>
			<Input
				id="tool-link"
				name="link"
				type="url"
				bind:value={link}
				placeholder="https://..."
				required
			/>
		</div>

		<div class="space-y-2">
			<Label for="tool-tags">Tags</Label>
			<Input
				id="tool-tags"
				name="tags"
				bind:value={tagsInput}
				placeholder="ai, productivity, automation"
			/>
			<p class="text-muted-foreground text-xs">Comma-separated.</p>
		</div>

		<div class="space-y-3">
			<Label class="text-base">Categories</Label>
			<div class="flex flex-wrap gap-2">
				{#each categories as category (category.slug)}
					<span
						class="bg-primary/10 text-primary inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs"
					>
						{category.name}
						<button
							type="button"
							onclick={() => removeCategory(category.slug)}
							aria-label="Remove category {category.name}"
						>
							<X class="h-3 w-3" />
						</button>
					</span>
				{/each}
				{#if categories.length === 0}
					<p class="text-muted-foreground text-xs">No categories selected.</p>
				{/if}
			</div>

			<div class="flex flex-col gap-2 sm:flex-row">
				<Select.Root type="single" bind:value={categoryPickerValue}>
					<Select.Trigger class="sm:w-72">
						{categoryPickerValue
							? (availableCategories.find((c) => c.slug === categoryPickerValue)?.name ?? "Pick existing")
							: "Pick existing"}
					</Select.Trigger>
					<Select.Content>
						{#each availableCategories as category (category.slug)}
							<Select.Item value={category.slug}>{category.name}</Select.Item>
						{/each}
					</Select.Content>
				</Select.Root>
				<Button type="button" variant="secondary" size="sm" onclick={addCategoryFromPicker}>
					Add
				</Button>
			</div>

			<div class="flex gap-2">
				<Input
					placeholder="Or type a new category"
					bind:value={newCategoryName}
					onkeydown={(e) => {
						if (e.key === "Enter") {
							e.preventDefault();
							addNewCategory();
						}
					}}
				/>
				<Button type="button" variant="secondary" size="sm" onclick={addNewCategory}>
					<Plus class="mr-1 h-3 w-3" />
					Create
				</Button>
			</div>

			{#each categories as category, index (category.slug)}
				<input type="hidden" name="categoryNames" value={category.name} />
				<input type="hidden" name="categorySlugs" value={category.slug} />
				<input type="hidden" name={`categoryIndex_${index}`} value={String(index)} />
			{/each}
		</div>
	</div>

	<aside class="bg-muted/30 flex h-fit flex-col gap-4 rounded-xl border p-5">
		<div class="space-y-2">
			<Label for="tool-cover">Cover image URL</Label>
			<Input
				id="tool-cover"
				name="coverImage"
				type="url"
				bind:value={coverImage}
				placeholder="https://example.com/cover.png"
				required
			/>
			{#if coverImage}
				<img src={coverImage} alt="Cover" class="aspect-video w-full rounded-md border object-cover" />
			{/if}
		</div>

		<div class="space-y-2">
			<Label for="tool-banner">Banner image URL</Label>
			<Input
				id="tool-banner"
				name="bannerImage"
				type="url"
				bind:value={bannerImage}
				placeholder="https://example.com/banner.png"
			/>
		</div>

		<div class="space-y-2">
			<Label>Pricing model</Label>
			<Select.Root type="single" bind:value={pricingType}>
				<Select.Trigger>{pricingType.replaceAll("_", " ")}</Select.Trigger>
				<Select.Content>
					{#each pricingTypes as type (type)}
						<Select.Item value={type}>{type.replaceAll("_", " ")}</Select.Item>
					{/each}
				</Select.Content>
			</Select.Root>
			<input type="hidden" name="pricing_type" value={pricingType} />
		</div>

		<div class="space-y-2">
			<Label>Status</Label>
			<Select.Root type="single" bind:value={status}>
				<Select.Trigger>{status}</Select.Trigger>
				<Select.Content>
					{#each statuses as state (state)}
						<Select.Item value={state}>{state}</Select.Item>
					{/each}
				</Select.Content>
			</Select.Root>
			<input type="hidden" name="status" value={status} />
		</div>

		{#if showVerifiedToggle}
			<div class="flex items-center justify-between gap-2 py-2">
				<Label for="tool-verified">Verified</Label>
				<Switch id="tool-verified" name="verified" bind:checked={verified} value="true" />
			</div>
		{/if}

		<Button type="submit" class="w-full" disabled={submitting}>
			{#if submitting}
				<LoaderCircle class="mr-2 h-4 w-4 animate-spin" />
				Saving...
			{:else}
				{submitLabel}
			{/if}
		</Button>
	</aside>
</form>

<script lang="ts">
	import { untrack } from "svelte";
	import { enhance } from "$app/forms";
	import ImageUpload from "$lib/components/common/image-upload.svelte";
	import { Button } from "$lib/components/ui/button";
	import { Checkbox } from "$lib/components/ui/checkbox";
	import { Input } from "$lib/components/ui/input";
	import { Label } from "$lib/components/ui/label";
	import { Switch } from "$lib/components/ui/switch";
	import { Textarea } from "$lib/components/ui/textarea";
	import LoaderCircle from "@lucide/svelte/icons/loader-circle";

	type Props = {
		formAction: string;
		submitLabel?: string;
		categories: readonly string[];
		initial?: {
			name?: string;
			description?: string;
			url?: string;
			preview_url?: string;
			tags?: string[];
			categories?: string[];
			price?: number;
			published?: boolean;
		};
	};

	const { formAction, submitLabel = "Save changes", categories, initial = {} }: Props = $props();

	const seed = untrack(() => initial);

	let name = $state(seed.name ?? "");
	let description = $state(seed.description ?? "");
	let url = $state(seed.url ?? "");
	let preview_url = $state(seed.preview_url ?? "");
	let tagsInput = $state((seed.tags ?? []).join(", "));
	let selectedCategories = $state<string[]>(seed.categories ?? []);
	let price = $state<number>(seed.price ?? 0);
	let published = $state(seed.published ?? false);
	let submitting = $state(false);

	function toggleCategory(category: string, checked: boolean) {
		if (checked) {
			if (!selectedCategories.includes(category)) {
				selectedCategories = [...selectedCategories, category];
			}
		} else {
			selectedCategories = selectedCategories.filter((c) => c !== category);
		}
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
			<Label for="product-name">Name</Label>
			<Input
				id="product-name"
				name="name"
				bind:value={name}
				placeholder="My Product"
				required
				minlength={3}
				maxlength={100}
			/>
		</div>

		<div class="space-y-2">
			<Label for="product-description">Description</Label>
			<Textarea
				id="product-description"
				name="description"
				bind:value={description}
				placeholder="Describe what this product is and who it's for."
				rows={8}
				required
				minlength={100}
				maxlength={5000}
			/>
		</div>

		<div class="space-y-2">
			<Label for="product-url">Buying URL</Label>
			<Input
				id="product-url"
				name="url"
				type="url"
				bind:value={url}
				placeholder="https://username.gumroad.com/l/product"
				required
			/>
		</div>

		<div class="space-y-2">
			<Label for="product-tags">Tags</Label>
			<Input
				id="product-tags"
				name="tags"
				bind:value={tagsInput}
				placeholder="tag1, tag2, tag3"
			/>
			<p class="text-muted-foreground text-xs">Comma-separated. Tags shorter than 2 chars are dropped.</p>
		</div>

		<div class="space-y-3">
			<div>
				<Label class="text-base">Categories</Label>
				<p class="text-muted-foreground text-xs">Pick the buckets that best describe the product.</p>
			</div>
			<div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
				{#each categories as category (category)}
					<label class="flex items-center gap-2 text-sm">
						<Checkbox
							checked={selectedCategories.includes(category)}
							onCheckedChange={(checked) => toggleCategory(category, checked === true)}
						/>
						{category}
					</label>
				{/each}
			</div>
			{#each selectedCategories as category (category)}
				<input type="hidden" name="categories" value={category} />
			{/each}
		</div>
	</div>

	<aside class="bg-muted/30 flex h-fit flex-col gap-4 rounded-xl border p-5">
		<div class="space-y-2">
			<Label for="product-preview">Preview image URL</Label>
			<Input
				id="product-preview"
				name="preview_url"
				type="url"
				bind:value={preview_url}
				placeholder="https://example.com/preview.png"
				required
			/>
			<ImageUpload onUpload={(url) => (preview_url = url)} label="Upload preview" />
			{#if preview_url}
				<img
					src={preview_url}
					alt="Preview"
					class="aspect-video w-full rounded-md border object-cover"
				/>
			{/if}
		</div>

		<div class="space-y-2">
			<Label for="product-price">Price (USD)</Label>
			<Input
				id="product-price"
				name="price"
				type="number"
				step="0.01"
				min="0"
				bind:value={price}
				placeholder="10.00"
			/>
			<p class="text-muted-foreground text-xs">Leave at 0 for free.</p>
		</div>

		<div class="flex items-center justify-between gap-2 py-2">
			<Label for="product-published">Published</Label>
			<Switch id="product-published" name="published" bind:checked={published} value="true" />
		</div>

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

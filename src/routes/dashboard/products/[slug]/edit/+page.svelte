<script lang="ts">
	import ProductForm from "$lib/components/dashboard/product-form.svelte";
	import { Separator } from "$lib/components/ui/separator";
	import { toast } from "svelte-sonner";

	let { data, form } = $props();

	$effect(() => {
		if (!form?.message) return;
		if (form.success) toast.success(form.message);
		else toast.error(form.message);
	});
</script>

<svelte:head>
	<title>Edit {data.product.name} - Dashboard</title>
</svelte:head>

<div class="space-y-6 p-4 pb-16 md:p-10">
	<div>
		<h1 class="text-lg font-semibold">Edit product</h1>
		<p class="text-muted-foreground text-sm font-medium">
			Update the details of <span class="font-mono">{data.product.slug}</span>.
		</p>
	</div>
	<Separator />

	<ProductForm
		formAction="?/update"
		submitLabel="Save changes"
		categories={data.categories}
		initial={{
			name: data.product.name,
			description: data.product.description,
			url: data.product.url,
			preview_url: data.product.preview_url,
			tags: data.product.tags,
			categories: data.product.categories,
			price: data.product.price,
			published: data.product.published
		}}
	/>
</div>

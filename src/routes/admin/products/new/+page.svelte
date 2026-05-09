<script lang="ts">
	import ProductForm from "$lib/components/dashboard/product-form.svelte";
	import { Separator } from "$lib/components/ui/separator";
	import { toast } from "svelte-sonner";

	let { data, form } = $props();

	$effect(() => {
		if (form?.message) toast.error(form.message);
	});
</script>

<svelte:head>
	<title>New product - Admin</title>
</svelte:head>

<div class="space-y-6 p-4 pb-16 md:p-10">
	<div>
		<h1 class="text-lg font-semibold">Create a new product</h1>
		<p class="text-muted-foreground text-sm font-medium">
			Publish a listing under the admin profile.
		</p>
	</div>
	<Separator />

	<ProductForm formAction="?/create" submitLabel="Publish product" categories={data.categories} />
</div>

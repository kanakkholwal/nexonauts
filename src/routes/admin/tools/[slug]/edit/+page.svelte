<script lang="ts">
	import ToolForm from "$lib/components/dashboard/tool-form.svelte";
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
	<title>Edit {data.tool.name} - Admin</title>
</svelte:head>

<div class="space-y-6 p-4 pb-16 md:p-10">
	<div>
		<h1 class="text-lg font-semibold">Edit tool</h1>
		<p class="text-muted-foreground text-sm font-medium">
			Moderate <span class="font-mono">{data.tool.slug}</span>.
		</p>
	</div>
	<Separator />

	<ToolForm
		formAction="?/update"
		submitLabel="Save changes"
		availableCategories={data.availableCategories}
		pricingTypes={data.pricingTypes}
		statuses={data.statuses}
		showVerifiedToggle
		initial={{
			name: data.tool.name,
			description: data.tool.description,
			link: data.tool.link,
			coverImage: data.tool.coverImage,
			bannerImage: data.tool.bannerImage,
			tags: data.tool.tags,
			categories: data.tool.categories.map((c) => ({ name: c.name, slug: c.slug })),
			pricing_type: data.tool.pricing_type,
			status: data.tool.status,
			verified: data.tool.verified
		}}
	/>
</div>

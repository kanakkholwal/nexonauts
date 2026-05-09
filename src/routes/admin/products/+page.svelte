<script lang="ts">
	import { enhance } from "$app/forms";
	import { Badge } from "$lib/components/ui/badge";
	import { Button } from "$lib/components/ui/button";
	import * as Card from "$lib/components/ui/card";
	import { Separator } from "$lib/components/ui/separator";
	import * as Table from "$lib/components/ui/table";
	import Trash2 from "@lucide/svelte/icons/trash-2";
	import { toast } from "svelte-sonner";

	let { data, form } = $props();

	$effect(() => {
		if (form?.message) {
			if (form.success === false) toast.error(form.message);
			else toast.success(form.message);
		}
	});
</script>

<svelte:head>
	<title>Products - Admin</title>
</svelte:head>

<div class="space-y-6 p-4 pb-16 md:p-10">
	<div>
		<h1 class="text-lg font-semibold">Products</h1>
		<p class="text-muted-foreground text-sm font-medium">Moderate marketplace listings.</p>
	</div>
	<Separator />

	<Card.Root>
		<Card.Header>
			<Card.Title>Marketplace listings</Card.Title>
			<Card.Description>Newest products available for moderation.</Card.Description>
		</Card.Header>
		<Card.Content>
			<Table.Root>
				<Table.Header>
					<Table.Row>
						<Table.Head>Name</Table.Head>
						<Table.Head>Creator</Table.Head>
						<Table.Head>Categories</Table.Head>
						<Table.Head>Price</Table.Head>
						<Table.Head>Status</Table.Head>
						<Table.Head class="text-right">Actions</Table.Head>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{#each data.products as product (product._id)}
						<Table.Row>
							<Table.Cell>
								<div class="flex flex-col">
									<span class="font-medium">{product.name}</span>
									<span class="text-muted-foreground text-xs">{product.slug}</span>
								</div>
							</Table.Cell>
							<Table.Cell>@{product.creator?.username ?? "unknown"}</Table.Cell>
							<Table.Cell>{product.categories.join(", ") || "Uncategorized"}</Table.Cell>
							<Table.Cell>${product.price}</Table.Cell>
							<Table.Cell>
								<Badge variant={product.published ? "default" : "secondary"}>
									{product.published ? "Published" : "Draft"}
								</Badge>
							</Table.Cell>
							<Table.Cell class="text-right">
								<form
									method="POST"
									action="?/delete"
									use:enhance={() => async ({ update }) => {
										await update();
									}}
									onsubmit={(event) => {
										if (!confirm(`Delete "${product.name}"? This cannot be undone.`)) {
											event.preventDefault();
										}
									}}
								>
									<input type="hidden" name="productId" value={product._id} />
									<Button
										type="submit"
										size="icon-sm"
										variant="ghost"
										class="text-destructive hover:bg-destructive/10"
										title="Delete product"
									>
										<Trash2 class="h-4 w-4" />
									</Button>
								</form>
							</Table.Cell>
						</Table.Row>
					{/each}
				</Table.Body>
			</Table.Root>
		</Card.Content>
	</Card.Root>
</div>

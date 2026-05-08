<script lang="ts">
	import { Badge } from "$lib/components/ui/badge";
	import * as Card from "$lib/components/ui/card";
	import { Separator } from "$lib/components/ui/separator";
	import * as Table from "$lib/components/ui/table";

	let { data } = $props();
</script>

<svelte:head>
	<title>Products - Dashboard</title>
</svelte:head>

<div class="space-y-6 p-4 pb-16 md:p-10">
	<div>
		<h1 class="text-lg font-semibold">Products</h1>
		<p class="text-muted-foreground text-sm font-medium">
			Manage your marketplace listings.
		</p>
	</div>
	<Separator />

	<Card.Root>
		<Card.Header>
			<Card.Title>Your products</Card.Title>
			<Card.Description>Marketplace listings attached to your profile.</Card.Description>
		</Card.Header>
		<Card.Content>
			{#if data.products.length === 0}
				<p class="text-muted-foreground text-sm">No products yet.</p>
			{:else}
				<Table.Root>
					<Table.Header>
						<Table.Row>
							<Table.Head>Name</Table.Head>
							<Table.Head>Categories</Table.Head>
							<Table.Head>Price</Table.Head>
							<Table.Head>Status</Table.Head>
							<Table.Head>Created</Table.Head>
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
								<Table.Cell>{product.categories.join(", ") || "Uncategorized"}</Table.Cell>
								<Table.Cell>${product.price}</Table.Cell>
								<Table.Cell>
									<Badge variant={product.published ? "default" : "secondary"}>
										{product.published ? "Published" : "Draft"}
									</Badge>
								</Table.Cell>
								<Table.Cell>{new Date(product.createdAt).toLocaleDateString()}</Table.Cell>
							</Table.Row>
						{/each}
					</Table.Body>
				</Table.Root>
			{/if}
		</Card.Content>
	</Card.Root>
</div>

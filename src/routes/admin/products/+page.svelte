<script lang="ts">
	import { Badge } from "$lib/components/ui/badge";
	import * as Card from "$lib/components/ui/card";
	import { Separator } from "$lib/components/ui/separator";
	import * as Table from "$lib/components/ui/table";

	let { data } = $props();
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
						</Table.Row>
					{/each}
				</Table.Body>
			</Table.Root>
		</Card.Content>
	</Card.Root>
</div>

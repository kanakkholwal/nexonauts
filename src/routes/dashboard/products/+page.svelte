<script lang="ts">
	import { enhance } from "$app/forms";
	import { Badge } from "$lib/components/ui/badge";
	import { Button, buttonVariants } from "$lib/components/ui/button";
	import * as Card from "$lib/components/ui/card";
	import { Separator } from "$lib/components/ui/separator";
	import * as Sheet from "$lib/components/ui/sheet";
	import * as Table from "$lib/components/ui/table";
	import Import from "@lucide/svelte/icons/import";
	import Pencil from "@lucide/svelte/icons/pencil";
	import Plus from "@lucide/svelte/icons/plus";
	import Trash2 from "@lucide/svelte/icons/trash-2";
	import { toast } from "svelte-sonner";

	let { data, form } = $props();

	let importSheetOpen = $state(false);

	$effect(() => {
		if (data.showImportPanel) importSheetOpen = true;
	});

	$effect(() => {
		if (!form?.message) return;
		if (form.success) toast.success(form.message);
		else toast.error(form.message);
	});
</script>

<svelte:head>
	<title>Products - Dashboard</title>
</svelte:head>

<div class="space-y-6 p-4 pb-16 md:p-10">
	<div class="flex flex-wrap items-start justify-between gap-3">
		<div>
			<h1 class="text-lg font-semibold">Products</h1>
			<p class="text-muted-foreground text-sm font-medium">Manage your marketplace listings.</p>
		</div>
		<div class="flex flex-wrap items-center gap-2">
			<Sheet.Root bind:open={importSheetOpen}>
				<Sheet.Trigger class={buttonVariants({ variant: "outline", size: "sm" })}>
					<Import class="mr-1 h-4 w-4" />
					Import from Gumroad
				</Sheet.Trigger>
				<Sheet.Content class="w-full overflow-y-auto sm:max-w-lg">
					<Sheet.Header>
						<Sheet.Title>Import from Gumroad</Sheet.Title>
						<Sheet.Description>
							Pull a product from your connected Gumroad library into Nexonauts.
						</Sheet.Description>
					</Sheet.Header>

					{#if !data.gumroad}
						<div class="space-y-3 p-6">
							<a
								href="?importFrom=gumroad"
								class={buttonVariants({ variant: "default" })}
								data-sveltekit-keepfocus
							>
								Load my Gumroad library
							</a>
							<p class="text-muted-foreground text-xs">
								You'll need a Gumroad access token connected under
								<a class="text-primary underline" href="/dashboard/settings/integrations">
									Settings → Integrations
								</a>.
							</p>
						</div>
					{:else if !data.gumroad.ok}
						<div class="space-y-3 p-6">
							<p class="text-destructive text-sm">{data.gumroad.message}</p>
							<a
								href="/dashboard/settings/integrations"
								class={buttonVariants({ variant: "outline", size: "sm" })}
							>
								Manage integrations
							</a>
						</div>
					{:else if data.gumroad.products.length === 0}
						<p class="text-muted-foreground p-6 text-sm">No importable products on Gumroad.</p>
					{:else}
						<div class="space-y-3 p-6">
							{#each data.gumroad.products as product (product.id)}
								<div class="flex items-start gap-3 rounded-lg border p-3">
									{#if product.preview_url}
										<img
											src={product.preview_url}
											alt={product.name}
											class="h-16 w-16 rounded-md border object-cover"
										/>
									{/if}
									<div class="min-w-0 flex-1">
										<p class="truncate text-sm font-medium">{product.name}</p>
										<p class="text-muted-foreground text-xs">${product.price}</p>
									</div>
									<form
										method="POST"
										action="?/importGumroad"
										use:enhance={() => async ({ update }) => {
											await update();
										}}
									>
										<input type="hidden" name="gumroadProductId" value={product.id} />
										<Button type="submit" size="sm">Import</Button>
									</form>
								</div>
							{/each}
						</div>
					{/if}
				</Sheet.Content>
			</Sheet.Root>

			<a href="/dashboard/products/new" class={buttonVariants({ size: "sm" })}>
				<Plus class="mr-1 h-4 w-4" />
				New product
			</a>
		</div>
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
								<Table.Cell>{product.categories.join(", ") || "Uncategorized"}</Table.Cell>
								<Table.Cell>${product.price}</Table.Cell>
								<Table.Cell>
									<Badge variant={product.published ? "default" : "secondary"}>
										{product.published ? "Published" : "Draft"}
									</Badge>
								</Table.Cell>
								<Table.Cell>{new Date(product.createdAt).toLocaleDateString()}</Table.Cell>
								<Table.Cell class="text-right">
									<div class="flex items-center justify-end gap-1">
										<a
											href="/dashboard/products/{product.slug}/edit"
											class={buttonVariants({ variant: "ghost", size: "icon-sm" })}
											title="Edit product"
										>
											<Pencil class="h-4 w-4" />
										</a>
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
									</div>
								</Table.Cell>
							</Table.Row>
						{/each}
					</Table.Body>
				</Table.Root>
			{/if}
		</Card.Content>
	</Card.Root>
</div>

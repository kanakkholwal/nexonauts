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
	<title>Tools - Dashboard</title>
</svelte:head>

<div class="space-y-6 p-4 pb-16 md:p-10">
	<div>
		<h1 class="text-lg font-semibold">Tools</h1>
		<p class="text-muted-foreground text-sm font-medium">
			Manage tools you've submitted to the directory.
		</p>
	</div>
	<Separator />

	<Card.Root>
		<Card.Header>
			<Card.Title>Your tools</Card.Title>
			<Card.Description>Directory submissions owned by your profile.</Card.Description>
		</Card.Header>
		<Card.Content>
			{#if data.tools.length === 0}
				<p class="text-muted-foreground text-sm">No tools submitted yet.</p>
			{:else}
				<Table.Root>
					<Table.Header>
						<Table.Row>
							<Table.Head>Name</Table.Head>
							<Table.Head>Categories</Table.Head>
							<Table.Head>Pricing</Table.Head>
							<Table.Head>Verification</Table.Head>
							<Table.Head>Status</Table.Head>
							<Table.Head class="text-right">Actions</Table.Head>
						</Table.Row>
					</Table.Header>
					<Table.Body>
						{#each data.tools as tool (tool._id)}
							<Table.Row>
								<Table.Cell>
									<div class="flex flex-col">
										<span class="font-medium">{tool.name}</span>
										<span class="text-muted-foreground text-xs">{tool.slug}</span>
									</div>
								</Table.Cell>
								<Table.Cell>
									{tool.categories.map((category) => category.name).join(", ") || "Uncategorized"}
								</Table.Cell>
								<Table.Cell class="uppercase">{tool.pricing_type.replaceAll("_", " ")}</Table.Cell>
								<Table.Cell>
									<Badge variant={tool.verified ? "default" : "outline"}>
										{tool.verified ? "Verified" : "Unverified"}
									</Badge>
								</Table.Cell>
								<Table.Cell>
									<Badge variant={tool.status === "published" ? "default" : "secondary"}>
										{tool.status}
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
											if (!confirm(`Delete "${tool.name}"? This cannot be undone.`)) {
												event.preventDefault();
											}
										}}
									>
										<input type="hidden" name="toolId" value={tool._id} />
										<Button
											type="submit"
											size="icon-sm"
											variant="ghost"
											class="text-destructive hover:bg-destructive/10"
											title="Delete tool"
										>
											<Trash2 class="h-4 w-4" />
										</Button>
									</form>
								</Table.Cell>
							</Table.Row>
						{/each}
					</Table.Body>
				</Table.Root>
			{/if}
		</Card.Content>
	</Card.Root>
</div>

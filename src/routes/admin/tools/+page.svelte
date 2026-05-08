<script lang="ts">
	import { Badge } from "$lib/components/ui/badge";
	import * as Card from "$lib/components/ui/card";
	import { Separator } from "$lib/components/ui/separator";
	import * as Table from "$lib/components/ui/table";

	let { data } = $props();
</script>

<svelte:head>
	<title>Tools - Admin</title>
</svelte:head>

<div class="space-y-6 p-4 pb-16 md:p-10">
	<div>
		<h1 class="text-lg font-semibold">Tools</h1>
		<p class="text-muted-foreground text-sm font-medium">Moderate the directory.</p>
	</div>
	<Separator />

	<Card.Root>
		<Card.Header>
			<Card.Title>Tool directory</Card.Title>
			<Card.Description>Moderate submitted tools and publication status.</Card.Description>
		</Card.Header>
		<Card.Content>
			<Table.Root>
				<Table.Header>
					<Table.Row>
						<Table.Head>Name</Table.Head>
						<Table.Head>Categories</Table.Head>
						<Table.Head>Pricing</Table.Head>
						<Table.Head>Verification</Table.Head>
						<Table.Head>Status</Table.Head>
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
						</Table.Row>
					{/each}
				</Table.Body>
			</Table.Root>
		</Card.Content>
	</Card.Root>
</div>

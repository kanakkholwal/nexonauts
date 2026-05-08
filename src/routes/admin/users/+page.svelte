<script lang="ts">
	import { Badge } from "$lib/components/ui/badge";
	import * as Card from "$lib/components/ui/card";
	import { Separator } from "$lib/components/ui/separator";
	import * as Table from "$lib/components/ui/table";

	let { data } = $props();
</script>

<svelte:head>
	<title>Users - Admin</title>
</svelte:head>

<div class="space-y-6 p-4 pb-16 md:p-10">
	<div>
		<h1 class="text-lg font-semibold">Users</h1>
		<p class="text-muted-foreground text-sm font-medium">
			Browse, audit, and review the latest users.
		</p>
	</div>
	<Separator />

	<Card.Root>
		<Card.Header>
			<Card.Title>Recent users</Card.Title>
			<Card.Description>Latest accounts across the platform.</Card.Description>
		</Card.Header>
		<Card.Content>
			<Table.Root>
				<Table.Header>
					<Table.Row>
						<Table.Head>User</Table.Head>
						<Table.Head>Email</Table.Head>
						<Table.Head>Role</Table.Head>
						<Table.Head>Status</Table.Head>
						<Table.Head>Joined</Table.Head>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{#each data.users as user (user._id)}
						<Table.Row>
							<Table.Cell>
								<div class="flex flex-col">
									<span class="font-medium">{user.name}</span>
									<span class="text-muted-foreground text-xs">@{user.username}</span>
								</div>
							</Table.Cell>
							<Table.Cell>{user.email}</Table.Cell>
							<Table.Cell>
								<Badge variant={user.role === "admin" ? "default" : "secondary"}>
									{user.role}
								</Badge>
							</Table.Cell>
							<Table.Cell>
								<Badge variant={user.verified ? "default" : "outline"}>
									{user.verified ? "Verified" : "Pending"}
								</Badge>
							</Table.Cell>
							<Table.Cell>{new Date(user.createdAt).toLocaleDateString()}</Table.Cell>
						</Table.Row>
					{/each}
				</Table.Body>
			</Table.Root>
		</Card.Content>
	</Card.Root>
</div>

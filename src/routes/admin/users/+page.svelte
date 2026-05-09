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
						<Table.Head class="text-right">Actions</Table.Head>
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
							<Table.Cell class="text-right">
								<form
									method="POST"
									action="?/delete"
									use:enhance={() => {
										return async ({ update }) => {
											await update();
										};
									}}
									onsubmit={(event) => {
										if (!confirm(`Delete ${user.name}? This cannot be undone.`)) {
											event.preventDefault();
										}
									}}
								>
									<input type="hidden" name="userId" value={user._id} />
									<Button
										type="submit"
										size="icon-sm"
										variant="ghost"
										class="text-destructive hover:bg-destructive/10"
										title="Delete user"
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

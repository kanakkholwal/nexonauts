<script lang="ts">
	import { Badge } from "$lib/components/ui/badge";
	import * as Card from "$lib/components/ui/card";
	import { Separator } from "$lib/components/ui/separator";

	let { data } = $props();
</script>

<svelte:head>
	<title>Account - Settings</title>
</svelte:head>

<div class="space-y-6 p-4 pb-16 md:p-10">
	<div>
		<h1 class="text-lg font-semibold">Account</h1>
		<p class="text-muted-foreground text-sm font-medium">Email, password, and security.</p>
	</div>
	<Separator />

	{#if data.account}
		<div class="grid gap-6 lg:grid-cols-2">
			<Card.Root>
				<Card.Header>
					<Card.Title>Identity</Card.Title>
					<Card.Description>Core account information from authentication.</Card.Description>
				</Card.Header>
				<Card.Content class="space-y-4">
					<div>
						<p class="text-sm font-medium">Name</p>
						<p class="text-muted-foreground text-sm">{data.account.name}</p>
					</div>
					<div>
						<p class="text-sm font-medium">Username</p>
						<p class="text-muted-foreground text-sm">@{data.account.username}</p>
					</div>
					<div>
						<p class="text-sm font-medium">Email</p>
						<p class="text-muted-foreground text-sm">{data.account.email}</p>
					</div>
				</Card.Content>
			</Card.Root>

			<Card.Root>
				<Card.Header>
					<Card.Title>Security and plan</Card.Title>
					<Card.Description>Read-only account status for the migrated dashboard.</Card.Description>
				</Card.Header>
				<Card.Content class="space-y-4">
					<div class="flex flex-wrap gap-2">
						<Badge variant={data.account.verified ? "default" : "outline"}>
							{data.account.verified ? "Email verified" : "Verification pending"}
						</Badge>
						<Badge variant="secondary">{data.account.role}</Badge>
						<Badge variant="secondary">{data.account.account_type}</Badge>
					</div>
					<div>
						<p class="text-sm font-medium">Created</p>
						<p class="text-muted-foreground text-sm">
							{new Date(data.account.createdAt).toLocaleString()}
						</p>
					</div>
					<div>
						<p class="text-sm font-medium">Last updated</p>
						<p class="text-muted-foreground text-sm">
							{new Date(data.account.updatedAt).toLocaleString()}
						</p>
					</div>
				</Card.Content>
			</Card.Root>
		</div>
	{/if}
</div>

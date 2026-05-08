<script lang="ts">
	import { Badge } from "$lib/components/ui/badge";
	import * as Card from "$lib/components/ui/card";
	import { Separator } from "$lib/components/ui/separator";
	import * as Table from "$lib/components/ui/table";

	let { data } = $props();
</script>

<svelte:head>
	<title>Messages - Admin</title>
</svelte:head>

<div class="space-y-6 p-4 pb-16 md:p-10">
	<div>
		<h1 class="text-lg font-semibold">Messages</h1>
		<p class="text-muted-foreground text-sm font-medium">Inbox of contact-form submissions.</p>
	</div>
	<Separator />

	<Card.Root>
		<Card.Header>
			<Card.Title>Inbound messages</Card.Title>
			<Card.Description>Most recent contact and system messages.</Card.Description>
		</Card.Header>
		<Card.Content>
			<Table.Root>
				<Table.Header>
					<Table.Row>
						<Table.Head>Sender</Table.Head>
						<Table.Head>Subject</Table.Head>
						<Table.Head>Type</Table.Head>
						<Table.Head>Read</Table.Head>
						<Table.Head>Received</Table.Head>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{#each data.messages as message (message._id)}
						<Table.Row>
							<Table.Cell>
								<div class="flex flex-col">
									<span class="font-medium">{message.name}</span>
									<span class="text-muted-foreground text-xs">{message.email}</span>
								</div>
							</Table.Cell>
							<Table.Cell>{message.subject}</Table.Cell>
							<Table.Cell>
								<Badge variant="secondary">{message.type}</Badge>
							</Table.Cell>
							<Table.Cell>
								<Badge variant={message.read ? "outline" : "default"}>
									{message.read ? "Read" : "Unread"}
								</Badge>
							</Table.Cell>
							<Table.Cell>{new Date(message.createdAt).toLocaleDateString()}</Table.Cell>
						</Table.Row>
					{/each}
				</Table.Body>
			</Table.Root>
		</Card.Content>
	</Card.Root>
</div>

<script lang="ts">
	import { enhance } from "$app/forms";
	import { Badge } from "$lib/components/ui/badge";
	import { Button } from "$lib/components/ui/button";
	import * as Card from "$lib/components/ui/card";
	import { Separator } from "$lib/components/ui/separator";
	import * as Table from "$lib/components/ui/table";
	import Mail from "@lucide/svelte/icons/mail";
	import MailOpen from "@lucide/svelte/icons/mail-open";
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
						<Table.Head class="text-right">Actions</Table.Head>
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
							<Table.Cell class="text-right">
								<div class="flex items-center justify-end gap-1">
									<form
										method="POST"
										action="?/toggleRead"
										use:enhance={() => async ({ update }) => {
											await update();
										}}
									>
										<input type="hidden" name="messageId" value={message._id} />
										<input type="hidden" name="read" value={String(!message.read)} />
										<Button
											type="submit"
											size="icon-sm"
											variant="ghost"
											title={message.read ? "Mark as unread" : "Mark as read"}
										>
											{#if message.read}
												<Mail class="h-4 w-4" />
											{:else}
												<MailOpen class="h-4 w-4" />
											{/if}
										</Button>
									</form>
									<form
										method="POST"
										action="?/delete"
										use:enhance={() => async ({ update }) => {
											await update();
										}}
										onsubmit={(event) => {
											if (!confirm("Delete this message? This cannot be undone.")) {
												event.preventDefault();
											}
										}}
									>
										<input type="hidden" name="messageId" value={message._id} />
										<Button
											type="submit"
											size="icon-sm"
											variant="ghost"
											class="text-destructive hover:bg-destructive/10"
											title="Delete message"
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
		</Card.Content>
	</Card.Root>
</div>

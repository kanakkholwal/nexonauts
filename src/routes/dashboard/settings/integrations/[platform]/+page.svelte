<script lang="ts">
	import { enhance } from "$app/forms";
	import { Badge } from "$lib/components/ui/badge";
	import { Button, buttonVariants } from "$lib/components/ui/button";
	import * as Card from "$lib/components/ui/card";
	import { Separator } from "$lib/components/ui/separator";
	import ArrowLeft from "@lucide/svelte/icons/arrow-left";
	import CheckCircle2 from "@lucide/svelte/icons/check-circle-2";
	import ShieldCheck from "@lucide/svelte/icons/shield-check";
	import { toast } from "svelte-sonner";

	let { data, form } = $props();

	$effect(() => {
		if (!form?.message) return;
		if (form.success) toast.success(form.message);
		else toast.error(form.message);
	});

	$effect(() => {
		if (data.exchangeError) toast.error(data.exchangeError);
	});
</script>

<svelte:head>
	<title>{data.descriptor.label} - Integrations</title>
</svelte:head>

<div class="space-y-6 p-4 pb-16 md:p-10">
	<a
		href="/dashboard/settings/integrations"
		class={buttonVariants({ variant: "ghost", size: "sm" })}
	>
		<ArrowLeft class="mr-2 h-4 w-4" />
		Back to integrations
	</a>

	<div class="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
		<div>
			<h1 class="flex items-center gap-3 text-2xl font-semibold tracking-tight capitalize">
				{data.descriptor.label}
				{#if data.status.integrated}
					<Badge variant="default" class="gap-1">
						<CheckCircle2 class="h-3.5 w-3.5" />
						Active
					</Badge>
				{/if}
			</h1>
			<p class="text-muted-foreground text-sm">{data.descriptor.description}</p>
		</div>
	</div>

	<Separator />

	<div class="grid gap-6 lg:grid-cols-3">
		<div class="space-y-4 lg:col-span-2">
			<Card.Root>
				<Card.Header>
					<Card.Title class="flex items-center gap-2 text-base">
						<ShieldCheck class="h-4 w-4 text-primary" />
						Capabilities
					</Card.Title>
				</Card.Header>
				<Card.Content class="grid gap-3 sm:grid-cols-2">
					{#each data.descriptor.usageCases as usage (usage.name)}
						<div class="rounded-lg border p-3">
							<p class="text-sm font-medium">{usage.name}</p>
							<p class="text-muted-foreground text-xs">{usage.description}</p>
						</div>
					{/each}
				</Card.Content>
			</Card.Root>
		</div>

		<Card.Root>
			<Card.Header>
				<Card.Title class="text-sm tracking-wider text-muted-foreground uppercase">
					Connection
				</Card.Title>
			</Card.Header>
			<Card.Content class="space-y-4">
				{#if data.status.integrated}
					<div class="space-y-1">
						<p class="text-muted-foreground text-xs">Connected since</p>
						<p class="text-sm font-medium">
							{data.status.lastAuthorized
								? new Date(data.status.lastAuthorized).toLocaleString()
								: "Just now"}
						</p>
					</div>
					<div class="space-y-1">
						<p class="text-muted-foreground text-xs">Scope</p>
						<p class="font-mono text-xs">{data.status.scope ?? data.descriptor.scope}</p>
					</div>

					<Separator />

					<form
						method="POST"
						action="?/revoke"
						use:enhance={() => async ({ update }) => {
							await update();
						}}
						onsubmit={(event) => {
							if (!confirm(`Disconnect ${data.descriptor.label}?`)) {
								event.preventDefault();
							}
						}}
					>
						<Button type="submit" variant="outline" class="w-full">Disconnect</Button>
					</form>
				{:else if data.authUrl}
					<p class="text-muted-foreground text-sm">
						Authorise Nexonauts to use {data.descriptor.label} on your behalf.
					</p>
					<a href={data.authUrl} class={buttonVariants({ variant: "default", class: "w-full" })}>
						Connect {data.descriptor.label}
					</a>
				{:else}
					<p class="text-destructive text-sm">
						{data.descriptor.label} OAuth credentials are not configured on this server.
					</p>
				{/if}
			</Card.Content>
		</Card.Root>
	</div>
</div>

<script lang="ts">
	import { Badge } from "$lib/components/ui/badge";
	import { buttonVariants } from "$lib/components/ui/button";
	import * as Card from "$lib/components/ui/card";
	import { Separator } from "$lib/components/ui/separator";

	let { data } = $props();

	const integrations = $derived(
		data.integrations ?? {
			github: { integrated: false, scope: null, lastAuthorized: null },
			gumroad: { integrated: false, scope: null, lastAuthorized: null }
		}
	);
</script>

<svelte:head>
	<title>Integrations - Settings</title>
</svelte:head>

<div class="space-y-6 p-4 pb-16 md:p-10">
	<div>
		<h1 class="text-lg font-semibold">Integrations</h1>
		<p class="text-muted-foreground text-sm font-medium">
			Connect GitHub, Gumroad, and other services.
		</p>
	</div>
	<Separator />

	<div class="grid gap-6 lg:grid-cols-2">
		{#each Object.entries(integrations) as [provider, integration] (provider)}
			<Card.Root>
				<Card.Header>
					<Card.Title class="capitalize">{provider}</Card.Title>
					<Card.Description>Connected service status for your account.</Card.Description>
				</Card.Header>
				<Card.Content class="space-y-4">
					<div class="flex gap-2">
						<Badge variant={integration.integrated ? "default" : "outline"}>
							{integration.integrated ? "Connected" : "Not connected"}
						</Badge>
						<Badge variant="secondary">{integration.scope ?? "No scope"}</Badge>
					</div>
					<div>
						<p class="text-sm font-medium">Last authorized</p>
						<p class="text-muted-foreground text-sm">
							{integration.lastAuthorized
								? new Date(integration.lastAuthorized).toLocaleString()
								: "Never"}
						</p>
					</div>
					<a
						href={`/dashboard/settings/integrations/${provider}`}
						class={buttonVariants({ variant: "outline", size: "sm" })}
					>
						{integration.integrated ? "Manage" : "Connect"}
					</a>
				</Card.Content>
			</Card.Root>
		{/each}
	</div>
</div>

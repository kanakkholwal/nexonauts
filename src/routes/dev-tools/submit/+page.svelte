<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import * as Card from "$lib/components/ui/card";
	import { Separator } from "$lib/components/ui/separator";
</script>

<svelte:head>
	<title>Submit a Tool - Dev Tools</title>
</svelte:head>

<section class="space-y-6 py-12">
	<div>
		<h1 class="text-2xl font-bold tracking-tight">Submit a Tool</h1>
		<p class="text-muted-foreground mt-1 text-sm">
			Submit your developer tool to be considered for the Nexonauts directory.
		</p>
	</div>
	<Separator />

	<Card.Root class="max-w-2xl">
		<Card.Header>
			<Card.Title>Submission intake</Card.Title>
			<Card.Description>
				The full browser submission workflow has not been rebuilt yet in SvelteKit.
			</Card.Description>
		</Card.Header>
		<Card.Content class="space-y-4">
			<p class="text-muted-foreground text-sm leading-relaxed">
				For now, use the contact form to submit the tool name, URL, category, and a short
				description. That preserves a working path for submissions without keeping the old Next.js
				form mounted inside the migrated app.
			</p>
			<Button href="/contact">Open contact form</Button>
		</Card.Content>
	</Card.Root>
</section>

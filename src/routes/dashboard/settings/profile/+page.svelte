<script lang="ts">
	import { Badge } from "$lib/components/ui/badge";
	import * as Card from "$lib/components/ui/card";
	import { Separator } from "$lib/components/ui/separator";

	let { data } = $props();
</script>

<svelte:head>
	<title>Profile - Settings</title>
</svelte:head>

<div class="space-y-6 p-4 pb-16 md:p-10">
	<div>
		<h1 class="text-lg font-semibold">Profile</h1>
		<p class="text-muted-foreground text-sm font-medium">Edit your public profile.</p>
	</div>
	<Separator />

	{#if data.profile}
		<div class="grid gap-6 lg:grid-cols-2">
			<Card.Root>
				<Card.Header>
					<Card.Title>Public profile</Card.Title>
					<Card.Description>How your profile appears to other users.</Card.Description>
				</Card.Header>
				<Card.Content class="space-y-4">
					<div>
						<p class="text-sm font-medium">Username</p>
						<p class="text-muted-foreground text-sm">@{data.profile.username}</p>
					</div>
					<div>
						<p class="text-sm font-medium">Bio</p>
						<p class="text-muted-foreground text-sm">{data.profile.bio || "No bio added yet."}</p>
					</div>
					<div>
						<p class="text-sm font-medium">Audience</p>
						<div class="flex gap-2 pt-2">
							<Badge variant="secondary">{data.profile.followers.length} followers</Badge>
							<Badge variant="secondary">{data.profile.following.length} following</Badge>
						</div>
					</div>
				</Card.Content>
			</Card.Root>

			<Card.Root>
				<Card.Header>
					<Card.Title>Interests and links</Card.Title>
					<Card.Description>Skills and external links on your profile.</Card.Description>
				</Card.Header>
				<Card.Content class="space-y-4">
					<div>
						<p class="text-sm font-medium">Interests</p>
						<div class="flex flex-wrap gap-2 pt-2">
							{#if data.profile.interests.length}
								{#each data.profile.interests as interest (interest)}
									<Badge variant="outline">{interest}</Badge>
								{/each}
							{:else}
								<p class="text-muted-foreground text-sm">No interests added yet.</p>
							{/if}
						</div>
					</div>
					<div>
						<p class="text-sm font-medium">Social links</p>
						<div class="space-y-2 pt-2">
							{#if data.profile.socials.length}
								{#each data.profile.socials as social (social.url)}
									<a
										href={social.url}
										target="_blank"
										rel="noopener noreferrer"
										class="text-primary block text-sm underline underline-offset-4"
									>
										{social.name}
									</a>
								{/each}
							{:else}
								<p class="text-muted-foreground text-sm">No social links added yet.</p>
							{/if}
						</div>
					</div>
				</Card.Content>
			</Card.Root>
		</div>
	{:else}
		<p class="text-muted-foreground text-sm">You do not have a public profile yet.</p>
	{/if}
</div>

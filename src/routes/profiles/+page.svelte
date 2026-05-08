<script lang="ts">
	import * as Avatar from "$lib/components/ui/avatar";
	import { Button } from "$lib/components/ui/button";
	import * as Card from "$lib/components/ui/card";
	import { Input } from "$lib/components/ui/input";
	import Search from "@lucide/svelte/icons/search";
	import UserPlus from "@lucide/svelte/icons/user-plus";
	import Users from "@lucide/svelte/icons/users";

	let { data } = $props();
	const profiles = $derived(data.profiles);

	type DirectoryProfile = (typeof data.profiles)[number];

	function initialsFor(profile: DirectoryProfile) {
		const src = profile.user?.name || profile.user?.username || profile.username || "??";
		return src.slice(0, 2).toUpperCase();
	}
</script>

<svelte:head>
	<title>Explore Developers — Nexonauts</title>
</svelte:head>

<div class="relative min-h-screen overflow-hidden">
	<div class="relative z-10 mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
		<div
			class="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end"
		>
			<div class="space-y-2">
				<div
					class="text-primary inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider"
				>
					<Users class="h-4 w-4" />
					Community Directory
				</div>
				<h1 class="text-foreground text-3xl font-bold tracking-tight md:text-4xl">
					Explore Developers
				</h1>
				<p class="text-muted-foreground max-w-xl text-lg">
					Discover talented builders, follow their journey, and collaborate on the next big thing.
				</p>
			</div>

			<form method="GET" class="w-full min-w-[300px] md:w-auto">
				<div class="relative">
					<Search
						class="text-foreground pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2"
					/>
					<Input
						name="query"
						placeholder="Search by name, username, or skills..."
						value={data.query}
						class="bg-background/50 border-border/60 focus-visible:ring-primary/20 h-11 pl-9 backdrop-blur-sm"
					/>
				</div>
			</form>
		</div>

		{#if profiles.length === 0}
			<div class="col-span-full flex flex-col items-center justify-center py-20 text-center">
				<div class="bg-muted mb-4 flex h-16 w-16 items-center justify-center rounded-full">
					<Search class="text-muted-foreground/50 h-8 w-8" />
				</div>
				<h3 class="text-lg font-medium">No developers found</h3>
				<p class="text-muted-foreground">Try adjusting your search query.</p>
			</div>
		{:else}
			<div class="5xl:grid-cols-4 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
				{#each profiles as profile (profile._id)}
					{@const user = profile.user ?? {}}
					<a href={`/profiles/${profile.username}`} class="group block h-full">
						<Card.Root
							class="bg-card/50 border-border/50 hover:shadow-primary/5 hover:border-primary/20 relative h-full overflow-hidden border backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
						>
							<div class="from-primary/10 h-20 bg-linear-to-r via-violet-500/5 to-transparent"></div>

							<div class="-mt-10 flex h-[calc(100%-5rem)] flex-col px-5 pb-5">
								<div class="mb-3 flex items-end justify-between">
									<Avatar.Root class="border-background bg-background h-20 w-20 border-4 shadow-sm">
										<Avatar.Image src={user.profilePicture ?? user.image} alt={profile.username} />
										<Avatar.Fallback class="bg-primary/5 text-primary font-bold">
											{initialsFor(profile)}
										</Avatar.Fallback>
									</Avatar.Root>

									<Button
										size="sm"
										variant="outline"
										class="hover:bg-primary hover:text-primary-foreground gap-1 rounded-full transition-colors"
									>
										<UserPlus class="h-3.5 w-3.5" />
										Follow
									</Button>
								</div>

								<div class="mb-3 space-y-1">
									<h2
										class="text-foreground group-hover:text-primary truncate text-lg font-bold transition-colors"
									>
										{user.name ?? "Anonymous"}
									</h2>
									<p class="text-muted-foreground text-sm font-medium">@{profile.username}</p>
								</div>

								<p
									class="text-muted-foreground/80 mb-4 line-clamp-2 h-10 text-sm"
								>
									{profile.bio || "Building cool things in the Nexonauts ecosystem."}
								</p>

								<div
									class="border-border/40 text-muted-foreground mt-auto flex items-center justify-between border-t pt-4 text-xs font-medium"
								>
									<div class="flex gap-4">
										<span class="hover:text-foreground flex items-center gap-1 transition-colors">
											<strong class="text-foreground">{profile.followers?.length ?? 0}</strong>
											Followers
										</span>
										<span class="hover:text-foreground flex items-center gap-1 transition-colors">
											<strong class="text-foreground">{profile.following?.length ?? 0}</strong>
											Following
										</span>
									</div>
								</div>
							</div>
						</Card.Root>
					</a>
				{/each}
			</div>
		{/if}
	</div>
</div>

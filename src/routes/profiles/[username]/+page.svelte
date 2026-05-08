<script lang="ts">
	import { enhance } from "$app/forms";
	import * as Avatar from "$lib/components/ui/avatar";
	import { Button } from "$lib/components/ui/button";
	import { Skeleton } from "$lib/components/ui/skeleton";
	import Loader2 from "@lucide/svelte/icons/loader-2";
	import Share2 from "@lucide/svelte/icons/share-2";
	import UserCheck from "@lucide/svelte/icons/user-check";
	import UserPlus from "@lucide/svelte/icons/user-plus";
	import { toast } from "svelte-sonner";

	let { data } = $props();
	const developer = $derived(data.developer);

	let following = $state(false);
	let followLoading = $state(false);

	$effect(() => {
		following = Boolean(data.isFollowing);
	});

	const initials = $derived(
		((developer.username ?? "??").slice(0, 2) || "??").toUpperCase()
	);

	async function copyShare() {
		try {
			const url = `${location.origin}/profiles/${developer.username}`;
			if (navigator.share) {
				await navigator.share({ title: developer.user?.name ?? developer.username, url });
			} else {
				await navigator.clipboard.writeText(url);
				toast.success("Profile link copied");
			}
		} catch {
			/* user dismissed share sheet */
		}
	}
</script>

<svelte:head>
	<title>{developer.user?.name ?? developer.username} — Nexonauts</title>
	<meta name="description" content={developer.bio ?? `Profile of @${developer.username}`} />
</svelte:head>

<div
	id="basic_info"
	class="mb-8 flex w-full flex-col items-start justify-center space-x-6 space-y-2 px-4 py-8 lg:flex-row"
>
	<Avatar.Root class="h-40 w-40 shadow-lg">
		<Avatar.Image
			src={developer.user?.image ?? developer.user?.profilePicture}
			alt={developer.username}
		/>
		<Avatar.Fallback class="h-40 w-40 text-xl uppercase">{initials}</Avatar.Fallback>
	</Avatar.Root>

	<div class="flex flex-col items-start justify-center space-y-2">
		<h1 class="text-4xl font-bold">{developer.user?.name ?? developer.username}</h1>
		<h3 class="text-gray-500 dark:text-slate-400">@{developer.username}</h3>

		<div class="text-muted-foreground flex gap-4 text-sm">
			<span>
				<strong class="text-foreground">{developer.followers?.length ?? 0}</strong> Followers
			</span>
			<span>
				<strong class="text-foreground">{developer.following?.length ?? 0}</strong> Following
			</span>
		</div>

		<p class="max-w-xl font-medium text-slate-500">{developer.bio ?? ""}</p>

		{#if developer.socials?.length}
			<div class="flex flex-wrap gap-2">
				{#each developer.socials as social (social.platform ?? social.url)}
					<a
						href={social.url}
						target="_blank"
						rel="noopener noreferrer"
						class="bg-muted hover:bg-muted/80 text-muted-foreground rounded-md px-3 py-1 text-xs transition-colors"
					>
						{social.platform ?? social.label ?? "Link"}
					</a>
				{/each}
			</div>
		{/if}

		<div class="flex w-full flex-row items-center justify-start space-x-2">
			{#if data.isOwner}
				<Button variant="outline" href="/dashboard/settings/profile">Edit profile</Button>
			{:else}
				<form
					method="POST"
					action="?/follow"
					use:enhance={() => {
						followLoading = true;
						return async ({ result, update }) => {
							if (result.type === "success") {
								following = !following;
								toast.success(following ? "Following" : "Unfollowed");
							} else if (result.type === "failure") {
								const msg = (result.data as { message?: string } | undefined)?.message;
								toast.error(msg ?? "Could not update follow state");
							}
							await update({ reset: false });
							followLoading = false;
						};
					}}
				>
					<Button type="submit" disabled={followLoading} class="gap-2 rounded-full">
						{#if followLoading}
							<Loader2 class="h-4 w-4 animate-spin" />
						{:else if following}
							<UserCheck class="h-4 w-4" />
						{:else}
							<UserPlus class="h-4 w-4" />
						{/if}
						{following ? "Following" : "Follow"}
					</Button>
				</form>
			{/if}

			<Button variant="outline" class="gap-2 rounded-full" onclick={copyShare}>
				<Share2 class="h-4 w-4" />
				Share
			</Button>
		</div>
	</div>
</div>

<div id="showcase" class="relative w-full space-y-2 px-4 py-8">
	<h2 class="text-2xl font-bold">Showcase</h2>
	<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
		{#each Array(6) as _, i (i)}
			<Skeleton class="h-48 w-full rounded-lg" />
		{/each}
	</div>
</div>

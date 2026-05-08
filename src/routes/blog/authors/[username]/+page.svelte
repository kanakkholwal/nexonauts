<script lang="ts">
	import * as Avatar from "$lib/components/ui/avatar";
	import { Badge } from "$lib/components/ui/badge";
	import PostCard from "$lib/components/blog/post-card.svelte";

	let { data } = $props();
	const profile = $derived(data.profile);
	const posts = $derived(data.posts);
</script>

<svelte:head>
	<title>{profile.user?.name ?? profile.username} — Nexonauts Blog</title>
</svelte:head>

<div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16">
	<section class="mt-5 mb-12 md:mb-16">
		<div class="flex flex-col items-center gap-4 text-center">
			<Avatar.Root class="size-24 md:size-32">
				<Avatar.Image
					src={profile.user?.profilePicture}
					alt={profile.user?.name || "Author"}
				/>
				<Avatar.Fallback>
					{profile.username?.charAt(0).toUpperCase() ?? "?"}
				</Avatar.Fallback>
			</Avatar.Root>

			<div class="space-y-2">
				<h3 class="text-lg font-semibold">{profile.user?.name ?? profile.username}</h3>
				<p class="text-muted-foreground -mt-2 text-sm">@{profile.username}</p>
				<p class="text-muted-foreground max-w-96 text-base font-medium">
					<Badge>
						{posts.length}
						{posts.length === 1 ? "article" : "articles"} published
					</Badge>
				</p>
			</div>
		</div>
	</section>

	<div class="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
		{#each posts as post (post.slug)}
			<a href={`/blog/articles/${post.slug}`} class="group">
				<PostCard {post} />
			</a>
		{/each}
	</div>
</div>

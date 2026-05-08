<script lang="ts">
	import PostCard from "$lib/components/blog/post-card.svelte";
	import Newsletter from "$lib/components/blog/newsletter.svelte";
	import { cn } from "$lib/utils";
	import type { PostWithId } from "src/models/post";

	let { data } = $props<{ data: { posts: PostWithId[] } }>();

	const featured = $derived(data.posts.slice(0, 3));
	const rest = $derived(data.posts.slice(3));
</script>

<svelte:head>
	<title>Blog — Nexonauts</title>
</svelte:head>

<div class="w-full">
	<section id="hero" class="px-4 py-16 text-center sm:px-6 md:py-24">
		<div class="mx-auto max-w-4xl">
			<h1 class="text-foreground mb-4 text-4xl font-bold sm:text-5xl md:text-6xl">
				Welcome to our Blog
			</h1>
			<p class="text-muted-foreground mx-auto max-w-2xl text-lg md:text-xl">
				Get the latest news, insights, and updates from our team
			</p>
		</div>
	</section>

	{#if featured.length > 0}
		<section class="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16">
			<div class="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
				{#each featured as post, index (post.slug)}
					<a
						href={`/blog/articles/${post.slug}`}
						class={cn("group", index === 0 && "md:col-span-2 md:row-span-2")}
					>
						<PostCard {post} featured={index === 0} />
					</a>
				{/each}
			</div>
		</section>
	{/if}

	{#if rest.length > 0}
		<section class="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16">
			<h2 class="mb-8 border-b border-border pb-2 text-2xl font-bold md:text-3xl">
				Latest Articles
			</h2>
			<div class="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
				{#each rest as post (post.slug)}
					<a href={`/blog/articles/${post.slug}`} class="group">
						<PostCard {post} />
					</a>
				{/each}
			</div>
		</section>
	{/if}

	<section class="px-4 py-16 sm:px-6 md:py-24">
		<div class="mx-auto max-w-6xl">
			<Newsletter />
		</div>
	</section>
</div>

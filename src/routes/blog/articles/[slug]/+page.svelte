<script lang="ts">
	import PostHeader from "$lib/components/blog/post-header.svelte";
	import RenderPost from "$lib/components/blog/render-post.svelte";
	import Sidebar from "$lib/components/blog/sidebar.svelte";

	let { data } = $props();
	const post = $derived(data.post);
</script>

<svelte:head>
	<title>{post.title}</title>
	<meta name="description" content={post.description ?? ""} />
</svelte:head>

<div class="w-full">
	<PostHeader
		title={post.title}
		image={post.image}
		author={post.author}
		createdAt={String(post.createdAt)}
	/>

	<main class="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6">
		<div class="flex flex-col gap-8 lg:flex-row lg:gap-12">
			<div class="flex-1">
				<RenderPost content={String(post.content ?? "")} />
			</div>
			<div class="lg:w-80">
				<Sidebar
					author={post.author}
					createdAt={String(post.createdAt)}
					content={String(post.content ?? "")}
				/>
			</div>
		</div>
	</main>
</div>

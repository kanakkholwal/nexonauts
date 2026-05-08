<script lang="ts">
	import * as Avatar from "$lib/components/ui/avatar";
	import type { Author } from "src/models/post";

	let {
		author,
		createdAt,
		content
	}: {
		author: Author;
		createdAt: string;
		content: string;
	} = $props();

	const wordCount = $derived((content ?? "").split(/\s+/).filter(Boolean).length);
	const readingTime = $derived(Math.max(1, Math.ceil(wordCount / 200)));
	const formatted = $derived(
		new Date(createdAt).toLocaleDateString("en-US", {
			month: "short",
			day: "numeric",
			year: "numeric"
		})
	);
</script>

<aside class="sticky top-6 mx-auto h-fit w-full max-w-md lg:ml-auto lg:max-w-xs">
	<div class="bg-card border-border/50 rounded-xl border p-6 shadow-sm">
		<div class="flex flex-col items-center gap-4 text-center">
			<Avatar.Root class="size-24 md:size-32">
				<Avatar.Image
					src={author?.user?.profilePicture}
					alt={author?.user?.name || "Author"}
				/>
				<Avatar.Fallback>
					{author?.username?.charAt(0).toUpperCase() ?? "?"}
				</Avatar.Fallback>
			</Avatar.Root>

			<div class="space-y-2">
				<h3 class="text-lg font-semibold">Written by {author?.user?.name ?? ""}</h3>
				<div class="text-muted-foreground text-sm">
					<p>{readingTime} min read • Published on {formatted}</p>
				</div>
				<a
					href={`/blog/authors/${author.username}`}
					class="text-primary inline-block text-sm hover:underline"
				>
					View author profile
				</a>
			</div>
		</div>
	</div>
</aside>

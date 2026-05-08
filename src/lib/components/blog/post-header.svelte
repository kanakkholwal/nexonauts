<script lang="ts">
	import * as Avatar from "$lib/components/ui/avatar";
	import { decodeHTMLEntities } from "src/utils/string";
	import type { Author } from "src/models/post";

	let {
		title,
		image,
		author,
		createdAt
	}: {
		title: string;
		image: string;
		author: Author;
		createdAt: string;
	} = $props();

	const cleanTitle = $derived(decodeHTMLEntities(title));
	const formatted = $derived(
		new Date(createdAt).toLocaleDateString("en-US", {
			year: "numeric",
			month: "long",
			day: "numeric"
		})
	);
</script>

<div class="mx-auto w-full max-w-7xl px-4 pt-16 pb-10 sm:px-6 md:pt-24 md:pb-16">
	<div class="flex flex-col gap-6 md:gap-8">
		<h1
			class="text-foreground w-full max-w-6xl text-3xl font-bold sm:text-4xl md:text-5xl lg:text-6xl"
		>
			{cleanTitle}
		</h1>

		<div class="flex items-center gap-4 border-b border-border pb-6">
			<Avatar.Root class="size-12 md:size-16">
				<Avatar.Image
					src={author.user?.profilePicture}
					alt={author.user?.name || "Author"}
				/>
				<Avatar.Fallback>
					{author?.username?.charAt(0).toUpperCase() ?? "?"}
				</Avatar.Fallback>
			</Avatar.Root>
			<div>
				<p class="text-foreground font-semibold">{author.user?.name ?? ""}</p>
				<p class="text-muted-foreground text-sm">Published on {formatted}</p>
			</div>
		</div>

		<div
			class="border-border/50 relative aspect-video w-full overflow-hidden rounded-xl border shadow-sm md:aspect-21/9"
		>
			<img
				src={image}
				alt={cleanTitle}
				loading="lazy"
				class="absolute inset-0 h-full w-full object-cover"
			/>
		</div>
	</div>
</div>

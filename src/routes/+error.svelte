<script lang="ts">
import { appConfig } from "@/project.config";
import { page } from "$app/state";
import { ErrorState, SiteFrame } from "$lib/components/site";

const copy: Record<number, { title: string; accent?: string; lede: string }> = {
	404: {
		title: "That page is not",
		accent: "here any more.",
		lede: "The link may be out of date, or the page moved when the site was rebuilt. Everything below still works."
	},
	500: {
		title: "Something broke",
		accent: "on our side.",
		lede: "This one is ours, not yours. Try again in a moment, and the repository is the fastest way to tell us."
	}
};

const fallback = $derived({
	title: "Something went",
	accent: "wrong.",
	lede: "The request could not be completed. Try again from the homepage."
});

const content = $derived(copy[page.status] ?? fallback);

const destinations = [
	{ label: "Homepage", href: "/" },
	{ label: "Learn by example", href: "/learn" },
	{ label: "Guides", href: "/guides" },
	{ label: "Dev tools", href: "/dev-tools" }
];
</script>

<svelte:head>
	<title>{page.status} · {appConfig.name}</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<SiteFrame>
	<ErrorState
		status={page.status}
		title={content.title}
		accent={content.accent}
		lede={content.lede}
		detail={page.error?.message}
		{destinations}
	/>
</SiteFrame>

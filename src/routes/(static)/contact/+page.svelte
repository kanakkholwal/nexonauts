<script lang="ts">
import ArrowUpRight from "@tabler/icons-svelte/icons/arrow-up-right";
import GithubLogo from "@tabler/icons-svelte/icons/brand-github";
import CalendarIcon from "@tabler/icons-svelte/icons/calendar";
import Mail from "@tabler/icons-svelte/icons/mail";
import { appConfig } from "@/project.config";
import { PageHero } from "$lib/components/site";
import { Button } from "$lib/components/ui/button";

const BOOKING_URL = "https://cal.com/kanakkholwal/book-a-call";

const routes = [
	{
		icon: CalendarIcon,
		title: "Book a call",
		line: "Thirty minutes, on the calendar, no form in between.",
		action: "Pick a time",
		href: BOOKING_URL,
		primary: true
	},
	{
		icon: GithubLogo,
		title: "Report something broken",
		line: "Bugs and feature requests belong in the repository they affect, where the work happens.",
		action: "Open GitHub",
		href: appConfig.socials.github
	},
	{
		icon: Mail,
		title: "Everything else",
		line: "Anything that does not fit the other two.",
		action: "Send an email",
		href: "mailto:adityapatil24680@gmail.com"
	}
];
</script>

<svelte:head>
	<title>Contact | {appConfig.name}</title>
	<meta
		name="description"
		content="Book a call, open an issue, or send an email. Three ways to reach the lab behind Orbit, Recast, Glyphtex and Docvia."
	/>
</svelte:head>

<PageHero
	eyebrow="Contact"
	title="Talk to the person who builds it"
	lede="There is one of me, so there is no queue and no support tier. Pick whichever of these fits what you need."
>
	<Button href={BOOKING_URL} target="_blank" rel="noopener noreferrer" size="lg">
		Book a call
		<ArrowUpRight class="size-4" aria-hidden="true" />
	</Button>
</PageHero>

<section class="mx-auto w-full max-w-page px-5 py-20 sm:px-10 md:py-28 lg:px-14">
	<ul class="grid gap-4 md:grid-cols-3">
		{#each routes as route (route.title)}
			{@const Icon = route.icon}
			<li>
				<a
					href={route.href}
					target="_blank"
					rel="noopener noreferrer"
					class="group flex h-full flex-col rounded-card border border-border bg-card p-7 transition-[border-color,transform] duration-(--duration-ui) ease-(--ease-out) hover:border-border-control focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none motion-safe:hover:-translate-y-0.5 motion-reduce:transition-none md:p-8"
				>
					<span
						class="grid size-10 place-items-center rounded-md border border-border text-foreground"
						aria-hidden="true"
					>
						<Icon class="size-5" />
					</span>
					<span class="mt-5 font-heading text-subheading font-medium text-foreground">
						{route.title}
					</span>
					<span class="mt-2 grow text-body-sm text-pretty text-muted-foreground">{route.line}</span>
					<span
						class="mt-6 inline-flex items-center gap-1 text-body-sm font-medium"
						class:text-primary={route.primary}
						class:text-foreground={!route.primary}
					>
						{route.action}
						<ArrowUpRight class="size-4" aria-hidden="true" />
					</span>
				</a>
			</li>
		{/each}
	</ul>
</section>

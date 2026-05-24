<script lang="ts">
	import { appConfig } from "@root/project.config";
	import { Badge } from "$lib/components/ui/badge";
	import { Button } from "$lib/components/ui/button";
	import { Alert } from "$lib/components/ui/alert";
	import GradientOrb from "$lib/components/surfaces/gradient-orb.svelte";
	import AlertTriangle from "@lucide/svelte/icons/alert-triangle";
	import ArrowRight from "@lucide/svelte/icons/arrow-right";
	import Ban from "@lucide/svelte/icons/ban";
	import ScrollText from "@lucide/svelte/icons/scroll-text";
	import Shield from "@lucide/svelte/icons/shield";

	const SITE = appConfig.name;

	const sections = [
		{ id: "terms", title: "General Terms" },
		{ id: "definitions", title: "Definitions" },
		{ id: "cookies", title: "Cookies" },
		{ id: "license", title: "License & Restrictions" },
		{ id: "hyperlinking", title: "Hyperlinking Policy" },
		{ id: "liability", title: "Content Liability" },
		{ id: "disclaimer", title: "Disclaimer" },
		{ id: "contact", title: "Contact Us" }
	];

	const prohibited = [
		"Republish material from our website",
		"Sell, rent, or sub-license material",
		"Reproduce, duplicate, or copy material",
		"Redistribute content from our platform"
	];

	const definitions = [
		{
			term: '"Client", "You", and "Your"',
			body:
				"Refers to you, the person accessing this website and accepting the Company's terms and conditions."
		},
		{
			term: '"The Company", "Ourselves", "We", "Our", and "Us"',
			body: `Refers to ${SITE}.`
		},
		{
			term: '"Party", "Parties", or "Us"',
			body: "Refers to both the Client and ourselves."
		}
	];
</script>

<svelte:head>
	<title>Terms of Service — {SITE}</title>
	<meta name="description" content="Terms of service governing the use of {SITE}." />
</svelte:head>

<section class="relative isolate overflow-hidden">
	<GradientOrb hue="lavender" size="lg" opacity={0.3} class="-left-32 -top-16" />
	<GradientOrb hue="rose" size="md" opacity={0.25} class="-right-24 top-40" />

	<div class="relative z-10 mb-12 max-w-3xl pt-20 sm:pt-24">
		<Badge variant="default" size="md" class="mb-5">Legal agreement</Badge>
		<h1 class="display-xl text-ink">Terms of Service</h1>
		<p class="mt-5 text-base leading-relaxed text-body">
			Please read these terms carefully before using our platform. They outline the rules for the
			use of <span class="font-medium text-ink">{SITE}</span>.
		</p>
	</div>

	<div class="relative z-10 grid gap-12 lg:grid-cols-12">
		<aside class="hidden lg:col-span-3 lg:block">
			<div class="sticky top-24 space-y-2">
				<p class="eyebrow mb-4 pl-4 text-muted-ink">Table of contents</p>
				<nav class="border-l border-hairline">
					{#each sections as section (section.id)}
						<a
							href={`#${section.id}`}
							class="-ml-px block border-l-2 border-transparent py-2 pl-4 text-sm text-body transition-all hover:border-ink hover:text-ink"
						>
							{section.title}
						</a>
					{/each}
				</nav>
			</div>
		</aside>

		<div class="col-span-12 lg:col-span-9">
			<div
				class="prose prose-zinc dark:prose-invert max-w-none
					prose-headings:font-display prose-headings:font-light prose-headings:tracking-tight prose-headings:text-ink prose-headings:scroll-mt-28
					prose-h2:text-3xl prose-h3:text-2xl prose-h4:text-xl
					prose-p:text-body prose-p:leading-relaxed
					prose-a:text-ink prose-a:underline-offset-4 prose-a:font-medium prose-a:no-underline hover:prose-a:underline
					prose-strong:text-ink"
			>
				<section id="terms">
					<p class="lead text-lg text-body">
						By accessing this website, we assume you accept these terms and conditions. Do not
						continue to use {SITE} if you do not agree to all the terms and conditions stated on
						this page.
					</p>
				</section>

				<hr class="my-10 border-hairline" />

				<section id="definitions">
					<div class="mb-4 flex items-center gap-2 text-ink">
						<ScrollText class="size-5" />
						<h3 class="m-0">Terminology</h3>
					</div>
					<p class="mb-5 text-sm text-body">
						The following terminology applies to these Terms and Conditions, Privacy Statement,
						and Disclaimer Notice and all Agreements:
					</p>
					<ul class="not-prose grid list-none gap-3 pl-0">
						{#each definitions as def (def.term)}
							<li class="rounded-xl border border-hairline bg-canvas-soft p-5 text-sm">
								<span class="font-medium text-ink">{def.term}</span>
								<p class="mt-1 text-body">{def.body}</p>
							</li>
						{/each}
					</ul>
				</section>

				<section id="cookies">
					<h3>Cookies</h3>
					<p>
						We employ the use of cookies. By accessing {SITE}, you agreed to use cookies in
						agreement with the {SITE}'s <a href="/privacy">Privacy Policy</a>.
					</p>
				</section>

				<section id="license">
					<h3>License &amp; restrictions</h3>
					<p>
						Unless otherwise stated, {SITE} and/or its licensors own the intellectual property
						rights for all material on {SITE}. All intellectual property rights are reserved. You
						may access this from {SITE} for your own personal use subjected to restrictions set in
						these terms and conditions.
					</p>

					<div
						class="not-prose mt-6 rounded-2xl border border-destructive/25 bg-destructive/5 p-6"
					>
						<div class="mb-4 flex items-center gap-2 font-medium text-destructive">
							<Ban class="size-5" />
							<span>Strictly prohibited</span>
						</div>
						<ul class="space-y-2.5">
							{#each prohibited as item (item)}
								<li class="flex items-start gap-3 text-sm text-body">
									<span class="mt-1.5 inline-block size-1.5 shrink-0 rounded-full bg-destructive/60"></span>
									{item}
								</li>
							{/each}
						</ul>
					</div>
				</section>

				<section id="hyperlinking">
					<h3>Reservation of rights &amp; links</h3>
					<p>
						We reserve the right to request that you remove all links or any particular link to
						our website. You approve to immediately remove all links to our website upon request.
						We also reserve the right to amend these terms and conditions and its linking policy
						at any time.
					</p>
					<h4>Removal of links from our website</h4>
					<p>
						If you find any link on our website that is offensive for any reason, you are free to
						contact and inform us at any moment. We will consider requests to remove links but we
						are not obligated to do so or to respond to you directly.
					</p>
				</section>

				<section id="liability">
					<h3>Content liability</h3>
					<div class="not-prose flex items-start gap-4 rounded-2xl border border-hairline bg-canvas-soft p-6">
						<Shield class="mt-1 size-6 shrink-0 text-ink" />
						<p class="m-0 text-sm leading-relaxed text-body">
							We shall not be held responsible for any content that appears on your website. You
							agree to protect and defend us against all claims that arise on your website. No
							link(s) should appear on any website that may be interpreted as libelous, obscene,
							or criminal, or which infringes any third party rights.
						</p>
					</div>
				</section>

				<section id="disclaimer">
					<h3>Disclaimer</h3>
					<Alert variant="warning" class="not-prose mt-2">
						<AlertTriangle />
						<div class="space-y-2">
							<p class="font-medium text-current">Legal disclaimer</p>
							<p class="text-sm text-current/85">
								To the maximum extent permitted by applicable law, we exclude all
								representations, warranties, and conditions relating to our website and the use
								of this website. Nothing in this disclaimer will:
							</p>
							<ul class="mb-0 list-disc space-y-1 pl-5 text-sm text-current/85">
								<li>Limit or exclude our or your liability for death or personal harm</li>
								<li>
									Limit or exclude our or your liability for fraud or fraudulent
									misrepresentation
								</li>
								<li>
									Limit any of our or your liabilities in any way that is not permitted under
									applicable law
								</li>
							</ul>
						</div>
					</Alert>
				</section>

				<section id="contact" class="not-prose mt-14">
					<div
						class="flex flex-col items-start justify-between gap-5 rounded-2xl border border-hairline bg-canvas-soft p-8 sm:flex-row sm:items-center"
					>
						<div class="max-w-md">
							<h3 class="font-display text-2xl font-light tracking-tight text-ink">
								Questions about the terms?
							</h3>
							<p class="mt-2 text-sm leading-relaxed text-body">
								If you have any inquiries regarding our terms of service, please contact us.
							</p>
						</div>
						<Button href="/contact" size="md">
							Contact support
							<ArrowRight class="size-4" />
						</Button>
					</div>
				</section>
			</div>
		</div>
	</div>
</section>

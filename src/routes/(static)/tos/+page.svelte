<script lang="ts">
	import { appConfig } from "@root/project.config";
	import AlertTriangle from "@lucide/svelte/icons/alert-triangle";
	import ArrowRight from "@lucide/svelte/icons/arrow-right";
	import Ban from "@lucide/svelte/icons/ban";
	import Gavel from "@lucide/svelte/icons/gavel";
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
</script>

<svelte:head>
	<title>Terms of Service — {SITE}</title>
	<meta name="description" content="Terms of service governing the use of {SITE}." />
</svelte:head>

<div class="bg-background relative min-h-screen selection:text-primary">
	<div class="pointer-events-none fixed inset-0 z-0">
		<div
			class="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"
		></div>
		<div
			class="absolute top-0 left-1/4 h-96 w-[90%] -translate-x-1/2 rounded-full bg-violet-500/10 blur-[120px]"
		></div>
	</div>

	<div class="relative z-10 mx-auto max-w-7xl px-6 py-20 md:py-28">
		<div class="mb-16 max-w-3xl">
			<div
				class="border-primary/20 bg-primary/5 text-primary mb-6 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm font-medium backdrop-blur-xl"
			>
				<Gavel class="h-3 w-3" />
				<span>Legal Agreement</span>
			</div>
			<h1 class="text-foreground mb-6 text-4xl font-bold tracking-tight md:text-5xl">
				Terms of Service
			</h1>
			<p class="text-muted-foreground text-lg leading-relaxed">
				Please read these terms carefully before using our platform. They outline the rules and
				regulations for the use of
				<span class="text-foreground font-semibold">{SITE}</span>.
			</p>
		</div>

		<div class="relative grid gap-12 lg:grid-cols-12">
			<aside class="hidden lg:col-span-3 lg:block">
				<div class="sticky top-24 space-y-2">
					<p class="text-foreground mb-4 pl-3 text-sm font-semibold uppercase tracking-wider">
						Table of Contents
					</p>
					<nav class="border-border/50 border-l">
						{#each sections as section (section.id)}
							<a
								href={`#${section.id}`}
								class="text-muted-foreground hover:text-primary hover:border-primary -ml-px block py-2 pl-4 text-sm transition-all hover:border-l-2"
							>
								{section.title}
							</a>
						{/each}
					</nav>
				</div>
			</aside>

			<div class="col-span-12 lg:col-span-9">
				<div
					class="prose prose-zinc dark:prose-invert prose-headings:scroll-mt-28 prose-headings:font-semibold prose-a:text-primary prose-a:no-underline hover:prose-a:underline max-w-none"
				>
					<section id="terms">
						<p class="lead">
							By accessing this website, we assume you accept these terms and conditions. Do not
							continue to use {SITE} if you do not agree to all the terms and conditions stated
							on this page.
						</p>
					</section>

					<hr class="border-border/50 my-10" />

					<section id="definitions">
						<div class="text-foreground mb-4 flex items-center gap-2">
							<ScrollText class="text-primary h-5 w-5" />
							<h3 class="m-0">Terminology</h3>
						</div>
						<p class="text-muted-foreground mb-4 text-sm">
							The following terminology applies to these Terms and Conditions, Privacy
							Statement, and Disclaimer Notice and all Agreements:
						</p>
						<ul class="grid list-none gap-4 pl-0">
							<li class="bg-card/50 border-border/50 rounded-lg border p-4">
								<span class="text-foreground font-semibold">"Client", "You", and "Your"</span>
								<br />
								Refers to you, the person accessing this website and accepting the Company's
								terms and conditions.
							</li>
							<li class="bg-card/50 border-border/50 rounded-lg border p-4">
								<span class="text-foreground font-semibold">
									"The Company", "Ourselves", "We", "Our", and "Us"
								</span>
								<br />
								Refers to {SITE}.
							</li>
							<li class="bg-card/50 border-border/50 rounded-lg border p-4">
								<span class="text-foreground font-semibold">"Party", "Parties", or "Us"</span>
								<br />
								Refers to both the Client and ourselves.
							</li>
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
						<h3>License & Restrictions</h3>
						<p>
							Unless otherwise stated, {SITE} and/or its licensors own the intellectual property
							rights for all material on {SITE}. All intellectual property rights are reserved.
							You may access this from {SITE} for your own personal use subjected to restrictions
							set in these terms and conditions.
						</p>

						<div
							class="not-prose mt-6 rounded-xl border border-red-500/20 bg-red-500/5 p-6"
						>
							<div
								class="mb-4 flex items-center gap-2 font-semibold text-red-600 dark:text-red-400"
							>
								<Ban class="h-5 w-5" />
								<span>Strictly Prohibited Actions</span>
							</div>
							<ul class="space-y-3">
								{#each prohibited as item (item)}
									<li class="text-muted-foreground flex items-start gap-3 text-sm">
										<div class="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-red-500/50"></div>
										{item}
									</li>
								{/each}
							</ul>
						</div>
					</section>

					<section id="hyperlinking">
						<h3>Reservation of Rights & Links</h3>
						<p>
							We reserve the right to request that you remove all links or any particular link
							to our website. You approve to immediately remove all links to our website upon
							request. We also reserve the right to amend these terms and conditions and it's
							linking policy at any time. By continuously linking to our website, you agree to
							be bound to and follow these linking terms and conditions.
						</p>
						<h4>Removal of links from our website</h4>
						<p>
							If you find any link on our website that is offensive for any reason, you are free
							to contact and inform us at any moment. We will consider requests to remove links
							but we are not obligated to do so or to respond to you directly.
						</p>
					</section>

					<section id="liability">
						<h3>Content Liability</h3>
						<div class="flex items-start gap-4">
							<Shield class="text-primary mt-1 h-6 w-6 shrink-0" />
							<p class="mt-0">
								We shall not be held responsible for any content that appears on your website.
								You agree to protect and defend us against all claims that arise on your
								website. No link(s) should appear on any website that may be interpreted as
								libelous, obscene, or criminal, or which infringes, otherwise violates, or
								advocates the infringement or other violation of, any third party rights.
							</p>
						</div>
					</section>

					<section id="disclaimer">
						<h3>Disclaimer</h3>
						<div class="bg-muted/30 border-border/50 rounded-xl border p-6">
							<div class="mb-2 flex items-center gap-2 text-orange-500">
								<AlertTriangle class="h-5 w-5" />
								<span class="font-semibold">Legal Disclaimer</span>
							</div>
							<p class="mt-2 mb-4 text-sm">
								To the maximum extent permitted by applicable law, we exclude all
								representations, warranties, and conditions relating to our website and the use
								of this website. Nothing in this disclaimer will:
							</p>
							<ul class="mb-0 space-y-1 text-sm">
								<li>Limit or exclude our or your liability for death or personal harm</li>
								<li>
									Limit or exclude our or your liability for fraud or fraudulent
									misrepresentation
								</li>
								<li>
									Limit any of our or your liabilities in any way that is not permitted under
									applicable law
								</li>
								<li>
									Exclude any of our or your liabilities that may not be excluded under
									applicable law
								</li>
							</ul>
						</div>
					</section>

					<section id="contact" class="not-prose mt-12">
						<div
							class="bg-muted/30 flex flex-col items-center justify-between gap-6 rounded-2xl border border-border p-8 md:flex-row"
						>
							<div>
								<h3 class="mb-2 text-xl font-semibold">Questions about the Terms?</h3>
								<p class="text-muted-foreground">
									If you have any inquiries regarding our Terms of Service, please contact our
									support team.
								</p>
							</div>
							<a
								href="/contact"
								class="bg-primary text-primary-foreground hover:bg-primary/90 shadow-primary/20 inline-flex shrink-0 items-center rounded-full px-6 py-3 font-medium shadow-lg transition-colors"
							>
								Contact Support
								<ArrowRight class="ml-2 h-4 w-4" />
							</a>
						</div>
					</section>
				</div>
			</div>
		</div>
	</div>
</div>

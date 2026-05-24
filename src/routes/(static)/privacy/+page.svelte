<script lang="ts">
	import { appConfig } from "@root/project.config";
	import { Badge } from "$lib/components/ui/badge";
	import { Button } from "$lib/components/ui/button";
	import GradientOrb from "$lib/components/surfaces/gradient-orb.svelte";
	import ArrowRight from "@lucide/svelte/icons/arrow-right";
	import CalendarDays from "@lucide/svelte/icons/calendar-days";

	const SITE = appConfig.name;

	const sections = [
		{ id: "collection", title: "Information We Collect" },
		{ id: "usage", title: "How We Use Information" },
		{ id: "logs", title: "Log Files" },
		{ id: "cookies", title: "Cookies & Web Beacons" },
		{ id: "advertising", title: "Advertising Partners" },
		{ id: "third-party", title: "Third-Party Policies" },
		{ id: "ccpa", title: "CCPA Privacy Rights" },
		{ id: "gdpr", title: "GDPR Data Protection" },
		{ id: "security", title: "Data Security" },
		{ id: "updates", title: "Updates to Policy" },
		{ id: "contact", title: "Contact Us" }
	];
</script>

<svelte:head>
	<title>Privacy Policy — {SITE}</title>
	<meta name="description" content="How {SITE} collects, uses, and protects your information." />
</svelte:head>

<section class="relative isolate overflow-hidden">

	<!-- Header -->
	<div class="relative z-10 mb-12 max-w-3xl pt-20 sm:pt-24">
		<Badge variant="default" size="md" class="mb-5">Legal center</Badge>
		<h1 class="display-xl text-ink">Privacy Policy</h1>
		<div class="mt-5 inline-flex items-center gap-2 text-sm text-muted-ink">
			<CalendarDays class="size-4" />
			<span>Last updated: November 27, 2025</span>
		</div>
	</div>

	<div class="relative z-10 grid gap-12 lg:grid-cols-12">
		<!-- TOC -->
		<aside class="hidden lg:col-span-3 lg:block">
			<div class="sticky top-24 space-y-2">
				<p class="eyebrow mb-4 pl-4 text-muted-ink">On this page</p>
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
					prose-h2:text-3xl prose-h3:text-2xl
					prose-p:text-body prose-p:leading-relaxed
					prose-a:text-ink prose-a:underline-offset-4 prose-a:font-medium prose-a:no-underline hover:prose-a:underline
					prose-strong:text-ink"
			>
				<p class="lead text-lg text-body">
					At <span class="font-medium text-ink">{SITE}</span>, we take your privacy seriously. This
					policy explains what we collect, how we use it, and how we protect it.
				</p>

				<hr class="my-10 border-hairline" />

				<section id="collection">
					<h3>Information we collect</h3>
					<p>
						We collect personal information that is necessary for us to provide our services to
						you. This includes the information you provide when you contact us, register for an
						account, and use our services. We may ask for your name, email address, phone number,
						company name, address, and other contact information.
					</p>
					<p>
						We may also collect information about how you use our website and services, including
						your IP address, browser type, internet service provider, date and time stamp,
						referring/exit pages, and the number of clicks. We use this information to analyze
						trends, administer the site, track user movements, and gather demographic information.
					</p>
				</section>

				<section id="usage">
					<h3>How we use your information</h3>
					<p>
						We use the information we collect to provide, operate, and maintain our website,
						improve and personalize your experience, develop new products and services, and
						communicate with you directly or through our partners. We may also use your
						information for customer service, fraud prevention, and marketing purposes.
					</p>
				</section>

				<section id="logs">
					<h3>Log files</h3>
					<p>
						We use log files to track the use of our website. These files include information such
						as your IP address, browser type, internet service provider, date and time stamp,
						referring/exit pages, and the number of clicks. This information is used to analyze
						trends, administer the site, track user movements, and gather demographic information.
						This information is not linked to any personally identifiable information.
					</p>
				</section>

				<section id="cookies">
					<h3>Cookies and web beacons</h3>
					<p>
						Like most websites, {SITE} uses cookies to store information about your preferences and
						the pages you visit. Cookies are small data files that are stored on your device.
					</p>
				</section>

				<section id="advertising">
					<h3>Our advertising partners</h3>
					<p>
						We work with third-party advertising partners, including Google, to serve ads to our
						site visitors. These partners may use cookies and web beacons to collect information
						about your browsing behavior on our website and other sites.
					</p>
				</section>

				<section id="third-party">
					<h3>Third-party privacy policies</h3>
					<p>
						Our privacy policy does not apply to third-party advertisers or websites. We advise
						you to consult the privacy policies of these third-party ad servers for more
						information about their practices.
					</p>
				</section>

				<section id="ccpa">
					<h3>CCPA privacy rights</h3>
					<p>
						Under the California Consumer Privacy Act (CCPA), California consumers have the right
						to request disclosure, deletion, and opt-out of sale of their personal data collected
						by a business.
					</p>
				</section>

				<section id="gdpr">
					<h3>GDPR data protection rights</h3>
					<p>
						Under the General Data Protection Regulation (GDPR), users have the right to access
						their personal data and request that it be corrected or erased. We take data
						protection seriously and will make every effort to respond to these requests in a
						timely manner.
					</p>
				</section>

				<section id="security">
					<h3>Data security</h3>
					<p>
						We take the security of your personal information seriously and use industry-standard
						practices to protect it from unauthorized access, disclosure, alteration, or
						destruction.
					</p>
				</section>

				<section id="updates">
					<h3>Updates to this policy</h3>
					<p>
						We reserve the right to update this policy at any time. We encourage you to review
						this policy periodically to stay informed about how we collect, use, and protect your
						personal information.
					</p>
				</section>

				<section id="contact" class="not-prose mt-14">
					<div
						class="flex flex-col items-start justify-between gap-5 rounded-2xl border border-hairline bg-canvas-soft p-8 sm:flex-row sm:items-center"
					>
						<div class="max-w-md">
							<h3 class="font-display text-2xl font-light tracking-tight text-ink">
								Still have questions?
							</h3>
							<p class="mt-2 text-sm leading-relaxed text-body">
								If you have any questions or concerns about our privacy policy, please don't
								hesitate to reach out.
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

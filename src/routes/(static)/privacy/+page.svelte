<script lang="ts">
	import { appConfig } from "@root/project.config";
	import ArrowRight from "@lucide/svelte/icons/arrow-right";
	import CalendarDays from "@lucide/svelte/icons/calendar-days";
	import ShieldCheck from "@lucide/svelte/icons/shield-check";

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

<div class="bg-background relative min-h-screen selection:text-primary">
	<div class="pointer-events-none fixed inset-0 z-0">
		<div
			class="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"
		></div>
		<div
			class="bg-primary/10 absolute top-0 left-1/2 h-96 w-[90%] -translate-x-1/2 rounded-full blur-[120px]"
		></div>
	</div>

	<div class="relative z-10 mx-auto max-w-7xl px-6 py-20 md:py-28">
		<div class="mb-16 max-w-3xl">
			<div class="text-primary mb-4 flex items-center gap-2 font-medium">
				<ShieldCheck class="h-5 w-5" />
				<span class="text-sm uppercase tracking-wider">Legal Center</span>
			</div>
			<h1 class="text-foreground mb-6 text-4xl font-bold tracking-tight md:text-5xl">
				Privacy Policy
			</h1>
			<div class="text-muted-foreground flex items-center gap-3 text-sm">
				<CalendarDays class="h-4 w-4" />
				<p>Last updated: November 27, 2025</p>
			</div>
		</div>

		<div class="relative grid gap-12 lg:grid-cols-12">
			<aside class="hidden lg:col-span-3 lg:block">
				<div class="sticky top-24 space-y-2">
					<p class="text-foreground mb-4 pl-3 font-semibold">On this page</p>
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
					class="prose prose-zinc dark:prose-invert prose-headings:scroll-mt-28 prose-a:text-primary prose-a:no-underline hover:prose-a:underline max-w-none"
				>
					<p class="lead text-muted-foreground text-lg">
						At <span class="text-foreground font-bold">{SITE}</span>, we understand the importance
						of protecting your privacy and personal information. This privacy policy explains the
						type of information we collect, how we use it, and how we protect it.
					</p>

					<hr class="border-border/50 my-10" />

					<section id="collection">
						<h3>Information We Collect</h3>
						<p>
							We collect personal information that is necessary for us to provide our services to
							you. This includes the information you provide when you contact us, register for
							an account, and use our services. We may ask for your name, email address, phone
							number, company name, address, and other contact information.
						</p>
						<p>
							We may also collect information about how you use our website and services,
							including your IP address, browser type, internet service provider, date and time
							stamp, referring/exit pages, and the number of clicks. We use this information to
							analyze trends, administer the site, track user movements, and gather demographic
							information.
						</p>
					</section>

					<section id="usage">
						<h3>How We Use Your Information</h3>
						<p>
							We use the information we collect to provide, operate, and maintain our website,
							improve and personalize your experience, develop new products and services, and
							communicate with you directly or through our partners. We may also use your
							information for customer service, fraud prevention, and marketing purposes.
						</p>
					</section>

					<section id="logs">
						<h3>Log Files</h3>
						<p>
							We use log files to track the use of our website. These files include information
							such as your IP address, browser type, internet service provider, date and time
							stamp, referring/exit pages, and the number of clicks. This information is used to
							analyze trends, administer the site, track user movements, and gather demographic
							information. This information is not linked to any personally identifiable
							information.
						</p>
					</section>

					<section id="cookies">
						<h3>Cookies and Web Beacons</h3>
						<p>
							Like most websites, {SITE} uses cookies to store information about your preferences
							and the pages you visit on our website. Cookies are small data files that are
							stored on your device. We use cookies to personalize your experience and optimize
							our website's performance.
						</p>
					</section>

					<section id="advertising">
						<h3>Our Advertising Partners</h3>
						<p>
							We work with third-party advertising partners, including Google, to serve ads to
							our site visitors. These partners may use cookies and web beacons to collect
							information about your browsing behavior on our website and other sites. This
							information is used to personalize advertising content and measure the
							effectiveness of advertising campaigns.
						</p>
					</section>

					<section id="third-party">
						<h3>Third-Party Privacy Policies</h3>
						<p>
							Our privacy policy does not apply to third-party advertisers or websites. We
							advise you to consult the privacy policies of these third-party ad servers for
							more information about their practices and instructions on how to opt-out of
							certain options.
						</p>
					</section>

					<section id="ccpa">
						<h3>CCPA Privacy Rights</h3>
						<p>
							Under the California Consumer Privacy Act (CCPA), California consumers have the
							right to request that a business that collects their personal data disclose the
							categories and specific pieces of personal data that the business has collected
							about them. They also have the right to request that the business delete any
							personal data about them that it has collected and to opt-out of the sale of their
							personal data.
						</p>
					</section>

					<section id="gdpr">
						<h3>GDPR Data Protection Rights</h3>
						<p>
							Under the General Data Protection Regulation (GDPR), users have the right to
							access their personal data and request that it be corrected or erased. We take
							data protection seriously and will make every effort to respond to these requests
							in a timely and efficient manner.
						</p>
					</section>

					<section id="security">
						<h3>Data Security</h3>
						<p>
							We take the security of your personal information seriously and use
							industry-standard practices to protect it from unauthorized access, disclosure,
							alteration, or destruction.
						</p>
					</section>

					<section id="updates">
						<h3>Updates to This Policy</h3>
						<p>
							We reserve the right to update this policy at any time. We encourage you to review
							this policy periodically to stay informed about how we collect, use, and protect
							your personal information.
						</p>
					</section>

					<section id="contact" class="not-prose mt-12">
						<div class="bg-muted/30 rounded-2xl border border-border p-8">
							<h3 class="mb-2 text-xl font-semibold">Still have questions?</h3>
							<p class="text-muted-foreground mb-6">
								If you have any questions or concerns about our privacy policy, please do not
								hesitate to reach out.
							</p>
							<a
								href="/contact"
								class="text-primary inline-flex items-center font-medium hover:underline"
							>
								Contact Support
								<ArrowRight class="ml-1 h-4 w-4" />
							</a>
						</div>
					</section>
				</div>
			</div>
		</div>
	</div>
</div>

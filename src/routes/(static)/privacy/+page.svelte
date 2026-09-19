<script lang="ts">
import { appConfig } from "@/project.config";
import { PageHero } from "$lib/components/site";
import LegalBody from "../legal-body.svelte";

const SITE = appConfig.name;

const sections = [
	{ id: "short", title: "The short version" },
	{ id: "site", title: "What this site collects" },
	{ id: "browser", title: "What is stored in your browser" },
	{ id: "third-party", title: "Third parties" },
	{ id: "products", title: "The products" },
	{ id: "rights", title: "Your rights" },
	{ id: "changes", title: "Changes" },
	{ id: "contact", title: "Contact" }
];
</script>

<svelte:head>
	<title>Privacy Policy | {SITE}</title>
	<meta
		name="description"
		content="{SITE} runs no analytics and no advertising script. One key in your browser stores the theme. Nothing else is collected."
	/>
</svelte:head>

<PageHero eyebrow="Legal" title="Privacy Policy" lede="Last updated 27 November 2025." />

<LegalBody {sections}>
	<p class="lead">
		This page is short because this site does little. It serves pages. It runs no analytics and
		no advertising script, it has no sign-up, and it asks for nothing.
	</p>

	<section id="short">
		<h2>The short version</h2>
		<p>
			{SITE} collects no personal information. There is no account to create, no form to fill in,
			and no tracking script on any page. One key in your browser remembers whether you chose the
			light or the dark theme, and that key never leaves your device.
		</p>
	</section>

	<section id="site">
		<h2>What this site collects</h2>
		<p>
			Nothing that identifies you. Earlier versions of this page said otherwise, listing names,
			phone numbers, company names and postal addresses. That was boilerplate, and it described a
			site that does not exist. There is no contact form; getting in touch means booking a call or
			sending an email, and in both cases you decide what to hand over.
		</p>
		<p>
			The host that serves these pages keeps its own request logs, as every web server does. Those
			logs are the host's, not ours, and we do not read, export or analyse them.
		</p>
	</section>

	<section id="browser">
		<h2>What is stored in your browser</h2>
		<p>
			One <code>localStorage</code> key, <code>nx-theme</code>, holding the word
			<code>light</code> or <code>dark</code>. It is written when you use the theme control in the
			footer and read on your next visit so the page does not flash the wrong colour. Clearing
			site data removes it.
		</p>
		<p>No cookies are set by this site.</p>
	</section>

	<section id="third-party">
		<h2>Third parties</h2>
		<p>
			The HTML carries a Google AdSense ownership tag, which is a claim of who owns the domain and
			loads nothing. <strong>No advertising or analytics script runs on this site today.</strong>
			If that changes, this page changes first and the date at the top of it moves.
		</p>
		<p>
			The typefaces and the product drawings are served from this domain, so no font or asset
			request goes to anyone else.
		</p>
	</section>

	<section id="products">
		<h2>The products</h2>
		<p>
			Orbit, Recast, Glyphtex and Docvia each have their own site, their own policy and their own
			behaviour. This page does not speak for them. Recast has an optional cloud tier with its own
			account, and that tier has its own terms.
		</p>
	</section>

	<section id="rights">
		<h2>Your rights</h2>
		<p>
			Where you live may give you the right to ask what is held about you, to correct it, or to
			have it deleted. Here the answer to the first question is nothing, so the other two have
			nothing to act on. Ask anyway if you want it in writing.
		</p>
	</section>

	<section id="changes">
		<h2>Changes</h2>
		<p>
			If what this site does changes, this page is updated before the change ships and the date at
			the top moves with it.
		</p>
	</section>

	<section id="contact">
		<h2>Contact</h2>
		<p>
			Questions about this page go to <a href="/contact">the contact page</a>, which has a booking
			link and an email address.
		</p>
	</section>
</LegalBody>

<script lang="ts">
import { appConfig } from "@/project.config";
import { PageHero } from "$lib/components/site";
import LegalBody from "../legal-body.svelte";

const SITE = appConfig.name;

const sections = [
	{ id: "scope", title: "What these terms cover" },
	{ id: "use", title: "Using this site" },
	{ id: "products", title: "The products" },
	{ id: "source", title: "Source and contributions" },
	{ id: "money", title: "Money" },
	{ id: "warranty", title: "No warranty" },
	{ id: "liability", title: "Liability" },
	{ id: "changes", title: "Changes" },
	{ id: "contact", title: "Contact" }
];
</script>

<svelte:head>
	<title>Terms of Service | {SITE}</title>
	<meta
		name="description"
		content="The terms for {SITE} itself. Each product carries its own terms on its own site."
	/>
</svelte:head>

<PageHero
	eyebrow="Legal"
	title="Terms of Service"
	lede="The rules for {SITE} itself. Each product carries its own terms on its own site."
/>

<LegalBody {sections}>
	<p class="lead">
		{SITE} is a site that describes four developer tools and links to them. These terms cover
		this site. They do not cover the tools.
	</p>

	<section id="scope">
		<h2>What these terms cover</h2>
		<p>
			Reading these pages, following the links, and using the booking link on the contact page.
			Nothing here is a contract for software, because this site does not ship any: Orbit, Recast,
			Glyphtex and Docvia live on their own domains and carry their own terms.
		</p>
	</section>

	<section id="use">
		<h2>Using this site</h2>
		<p>
			Read it, link to it, quote it with attribution. Do not scrape it into a service that
			republishes it as yours, and do not present it as though it were operated by someone else.
		</p>
	</section>

	<section id="products">
		<h2>The products</h2>
		<p>
			Each product decides its own terms, its own pricing and its own support. What this site says
			about them is a summary written from their own pages; where the two disagree, the product's
			own page wins. Recast has an optional cloud tier with its own account and its own agreement.
		</p>
	</section>

	<section id="source">
		<h2>Source and contributions</h2>
		<p>
			Each product has a public repository on GitHub. The terms for using, copying or modifying
			that code are in the repository, not here. Issues and pull requests are welcome there and
			are the fastest route to a fix.
		</p>
	</section>

	<section id="money">
		<h2>Money</h2>
		<p>
			The products are free to use today. Some may add a paid tier later. When that happens it
			will be said on the product itself, in plain words, before anything changes. This site takes
			no payment and stores no payment details.
		</p>
	</section>

	<section id="warranty">
		<h2>No warranty</h2>
		<p>
			This site and the tools it describes are provided as they are. Maturity differs and is
			stated per product: Recast, for instance, is stable on Windows and still beta on macOS and
			Linux. Check the product's own page before you depend on it for work that matters.
		</p>
	</section>

	<section id="liability">
		<h2>Liability</h2>
		<p>
			To the extent the law allows, the lab behind {SITE} is not liable for loss arising from use
			of this site or the tools it links to. Where the law does not allow that, the limit is the
			smallest amount the law permits.
		</p>
	</section>

	<section id="changes">
		<h2>Changes</h2>
		<p>
			These terms change when the site does. The date at the top of the privacy page moves with
			any change that affects what is collected; changes here are noted in the repository history.
		</p>
	</section>

	<section id="contact">
		<h2>Contact</h2>
		<p>
			Questions go to <a href="/contact">the contact page</a>. Anything about a specific product
			is better raised in that product's repository.
		</p>
	</section>
</LegalBody>

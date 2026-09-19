<script lang="ts">
import { appConfig } from "@/project.config";
import { PageHero } from "$lib/components/site";
import LegalBody from "../legal-body.svelte";

const SITE = appConfig.name;

const sections = [
	{ id: "ours", title: "What belongs to the lab" },
	{ id: "code", title: "The code" },
	{ id: "others", title: "What belongs to other people" },
	{ id: "use", title: "Using any of it" },
	{ id: "report", title: "Reporting a problem" }
];
</script>

<svelte:head>
	<title>Copyright | {SITE}</title>
	<meta
		name="description"
		content="Whose work is whose on {SITE}, what you may reuse, and how to tell us we got it wrong."
	/>
</svelte:head>

<PageHero
	eyebrow="Legal"
	title="Copyright Disclaimer"
	lede="Whose work is whose, where it came from, and how to tell us we got it wrong."
/>

<LegalBody {sections}>
	<p class="lead">
		Short, because there is not much on this site that belongs to anyone else.
	</p>

	<section id="ours">
		<h2>What belongs to the lab</h2>
		<p>
			The words on this site, the product drawings, the {SITE} name and the mark. The drawings are
			original vector work made for these pages; they are not stock, and no photograph appears
			anywhere on the site.
		</p>
	</section>

	<section id="code">
		<h2>The code</h2>
		<p>
			Each product has a public repository on GitHub, and the terms for reusing that code live in
			the repository. This page does not grant or restrict anything there. Where a repository and
			this page disagree, the repository wins.
		</p>
	</section>

	<section id="others">
		<h2>What belongs to other people</h2>
		<ul>
			<li>
				Satoshi, the typeface used for headings, and Inter and Source Code Pro for body and code.
				Each is used under its own licence, held by its own foundry.
			</li>
			<li>
				Tabler Icons, used throughout the interface.
			</li>
			<li>
				The names and marks of GitHub, and of any framework named on this site, which belong to
				their owners. Naming them describes compatibility; it does not imply endorsement.
			</li>
		</ul>
	</section>

	<section id="use">
		<h2>Using any of it</h2>
		<p>
			Quote the writing with a link back. Do not reuse the mark, the product names or the drawings
			in a way that suggests the lab made, endorsed or maintains something it did not. For
			anything else, ask: the answer is usually yes.
		</p>
	</section>

	<section id="report">
		<h2>Reporting a problem</h2>
		<p>
			If something here is yours and should not be, say so through
			<a href="/contact">the contact page</a> with a link to the original and a note on what you
			want done. It gets taken down while it is looked at, not after.
		</p>
	</section>
</LegalBody>

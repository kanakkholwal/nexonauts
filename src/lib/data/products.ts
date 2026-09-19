export type ProductSlug = "orbit" | "recast" | "glyphtex" | "docvia" | "specimen";

export type Product = {
	slug: ProductSlug;
	name: string;
	/** Category noun, in heading colour: "PDF toolkit". */
	category: string;
	/** Qualifier after the category, in muted colour: "for the browser." */
	qualifier: string;
	/** One sentence, derived from the product's own homepage. */
	line: string;
	/** Short kind for the nav sheet and the strip: "PDF toolkit, browser". */
	kind: string;
	runs: string;
	status: string;
	/** Absent while a product has no page to send anyone to. */
	href?: string;
	repo?: string;
	actionLabel?: string;
};

// Status is stated per product because it genuinely differs. Never soften it.
export const products: Product[] = [
	{
		slug: "recast",
		name: "Recast",
		category: "Screen recorder",
		qualifier: "that edits as you record.",
		line: "Record once and ship a demo. Zoom, cursor smoothing and silence cuts happen while you record.",
		kind: "Screen recorder, desktop",
		runs: "Desktop",
		status: "Stable on Windows, beta elsewhere",
		href: "https://recast.li",
		repo: "https://github.com/kanakkholwal/recast",
		actionLabel: "Get Recast"
	},
	{
		slug: "orbit",
		name: "Orbit",
		category: "PDF toolkit",
		qualifier: "for the browser.",
		line: "Merge, split, sign and compress without an upload. Each tool runs inside the page and saves back to your disk.",
		kind: "PDF toolkit, browser",
		runs: "Browser",
		status: "Stable",
		href: "https://orbit.nexonauts.com",
		repo: "https://github.com/kanakkholwal/orbit",
		actionLabel: "Open Orbit"
	},
	{
		slug: "glyphtex",
		name: "Glyphtex",
		category: "LaTeX editor",
		qualifier: "for the browser.",
		line: "Compiles in the tab. Projects stay on your device, keep working offline and carry their history in Git.",
		kind: "LaTeX editor, browser",
		runs: "Browser",
		status: "Newest",
		href: "https://glyphtex.nexonauts.com",
		repo: "https://github.com/kanakkholwal/glyphtex",
		actionLabel: "Open Glyphtex"
	},
	{
		slug: "docvia",
		name: "Docvia",
		category: "Build tool",
		qualifier: "for your docs.",
		line: "Compiles Markdown into typed, pre-rendered modules for React, Svelte and other frameworks through adapters.",
		kind: "Docs build tool",
		runs: "Build step",
		status: "Stable",
		href: "https://docvia.dev",
		repo: "https://github.com/kanakkholwal/docvia",
		actionLabel: "Read the Docvia docs"
	},
	{
		slug: "specimen",
		name: "Specimen",
		category: "Design system reader",
		qualifier: "",
		line: "In development.",
		kind: "Design system reader",
		runs: "Browser",
		status: "In development"
	}
];

/** The products that have a site to open, in homepage order. */
export const shippedProducts = products.filter((p): p is Product & { href: string } =>
	Boolean(p.href)
);

export type Product = {
	name: string;
	kind: string;
	where: string;
	status: string;
	licence: string;
	/** Absent while a product has no page to send anyone to. */
	href?: string;
};

// Status and licence are stated per product, because they genuinely differ.
// Never soften these; an "open source" claim across the umbrella would be false.
export const products: Product[] = [
	{
		name: "Orbit",
		kind: "PDF toolkit",
		where: "In the browser",
		status: "Stable",
		licence: "Public repo",
		href: "https://orbit.nexonauts.com"
	},
	{
		name: "Recast",
		kind: "Screen recorder",
		where: "Desktop app",
		status: "Stable on Windows",
		licence: "GPLv3",
		href: "https://recast.li"
	},
	{
		name: "Glyphtex",
		kind: "LaTeX engine",
		where: "In the browser",
		status: "Newest, moves fastest",
		licence: "Public repo",
		href: "https://glyphtex.nexonauts.com"
	},
	{
		name: "Docvia",
		kind: "Docs compiler",
		where: "Build step",
		status: "Stable",
		licence: "MIT",
		href: "https://docvia.dev"
	},
	{
		name: "Specimen",
		kind: "Design system reader",
		where: "In the browser",
		status: "In development",
		licence: "Not published yet"
	}
];

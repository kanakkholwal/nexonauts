export type DevTool = {
	slug: string;
	title: string;
	description: string;
	category: string;
	tags: string[];
	icon?: string;
};

export const devTools: DevTool[] = [
	{
		slug: "pdf-stripper",
		title: "PDF Page Stripper",
		description:
			"Remove specific pages from a PDF, entirely in your browser. Powered by pdf-lib — no uploads.",
		category: "Document Tools",
		tags: ["pdf", "privacy"]
	},
	{
		slug: "image-to-webp-convertor",
		title: "Image → WebP Convertor",
		description:
			"Convert PNG/JPEG to WebP locally. Adjust quality and download — no server round-trips.",
		category: "Image Tools",
		tags: ["image", "webp", "compress"]
	},
	{
		slug: "schema-markup-generator",
		title: "Schema Markup Generator",
		description: "Build JSON-LD structured data for SEO-friendly pages.",
		category: "SEO",
		tags: ["seo", "schema", "json-ld"]
	},
	{
		slug: "meta-tag-generator",
		title: "Meta Tag Generator",
		description: "Compose Open Graph + Twitter card meta tags from a few inputs.",
		category: "SEO",
		tags: ["seo", "meta", "og"]
	},
	{
		slug: "html-minifier-and-prettifier",
		title: "HTML Minifier / Prettifier",
		description: "Toggle between compact and human-readable HTML.",
		category: "Web Tools",
		tags: ["html", "format"]
	},
	{
		slug: "html-parser-tool",
		title: "HTML Parser",
		description: "Parse and inspect HTML element trees.",
		category: "Web Tools",
		tags: ["html", "parse"]
	},
	{
		slug: "json-minifier-tool",
		title: "JSON Minifier",
		description: "Compact JSON by stripping whitespace; reduce payload size for APIs.",
		category: "Web Tools",
		tags: ["json", "format"]
	},
	{
		slug: "css-minifier-and-prettifier",
		title: "CSS Minifier / Prettifier",
		description: "Collapse or expand stylesheets between minified and readable forms.",
		category: "Web Tools",
		tags: ["css", "format"]
	},
	{
		slug: "html-to-jsx-convertor",
		title: "HTML → JSX Convertor",
		description: "Rewrite HTML attributes (class, for, etc.) as React-compatible JSX.",
		category: "Web Tools",
		tags: ["html", "jsx", "react"]
	}
];

export const devToolCategories = ["All", ...new Set(devTools.map((t) => t.category))];

export const findDevTool = (slug: string) => devTools.find((t) => t.slug === slug);

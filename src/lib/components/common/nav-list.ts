export type NavItem = {
	title: string;
	href: string;
	description?: string;
	external?: boolean;
};

export type NavGroup = {
	title: string;
	items: NavItem[];
};

export const NAV_GROUPS: NavGroup[] = [
	{
		title: "Products",
		items: [
			{
				title: "Orbit",
				href: "https://orbit.nexonauts.com",
				description: "PDF toolkit that runs entirely in the browser.",
				external: true
			},
			{
				title: "Recast",
				href: "https://recast.li",
				description: "Screen recorder that edits the demo while you capture it.",
				external: true
			},
			{
				title: "Glyphtex",
				href: "https://glyphtex.nexonauts.com",
				description: "LaTeX engine compiled to WebAssembly. No TeX install.",
				external: true
			},
			{
				title: "Docvia",
				href: "https://docvia.dev",
				description: "Framework agnostic documentation compiler.",
				external: true
			}
		]
	},
	{
		title: "Developers",
		items: [
			{
				title: "Package docs",
				href: "https://docs.nexonauts.com",
				description: "Reference for the nexo packages and the patterns behind them.",
				external: true
			},
			{
				title: "Dev tools",
				href: "/dev-tools",
				description: "Single purpose browser utilities. Runs locally, nothing uploaded."
			}
		]
	},
	{
		title: "Learn",
		items: [
			{
				title: "By example",
				href: "/learn",
				description: "Short, self contained programs that show one idea at a time."
			},
			{
				title: "Guides",
				href: "/guides",
				description: "Longer walkthroughs. Code on one side, why it works on the other."
			}
		]
	}
];

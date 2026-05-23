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
				title: "Recast",
				href: "/recast",
				description: "Fast, local-first screen and webcam recorder. Windows desktop."
			},
			{
				title: "Docvia",
				href: "https://docvia.dev",
				description: "Markdown documentation compiler. Same docs, any framework.",
				external: true
			}
		]
	},
	{
		title: "Learn",
		items: [
			{
				title: "By example",
				href: "/learn",
				description: "Short, self-contained programs that show one idea at a time."
			},
			{
				title: "Guides",
				href: "/guides",
				description: "Topic-by-topic walkthroughs. Code on one side, why-it-works on the other."
			}
		]
	},
	{
		title: "Dev Tools",
		items: [
			{
				title: "Browse Dev Tools",
				href: "/dev-tools",
				description: "Single-purpose in-browser utilities — runs locally, nothing uploaded."
			}
		]
	}
];

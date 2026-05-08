export type NavItem = {
	title: string;
	href: string;
	description?: string;
};

export type NavGroup = {
	title: string;
	items: NavItem[];
};

export const NAV_GROUPS: NavGroup[] = [
	{
		title: "Nexo Scout",
		items: [
			{
				title: "Nexo Scout",
				href: "/scout",
				description: "Discover Essential Tools & Resources"
			},
			{
				title: "Find Perfect Tools",
				href: "/scout/browse",
				description: "Find the perfect tools for your business."
			}
		]
	},
	{
		title: "CreationsHub",
		items: [
			{
				title: "Browse & Sell Creations",
				href: "/marketplace",
				description: "Browse and sell your digital products."
			},
			{
				title: "Discover Digital Assets",
				href: "/marketplace/explore",
				description: "Discover digital assets for your business."
			}
		]
	},
	{
		title: "Dev Tools",
		items: [
			{
				title: "Find Dev Tools",
				href: "/dev-tools",
				description: "Find the dev tools for your project development."
			},
			{
				title: "Submit Your Tool",
				href: "/dev-tools/submit",
				description: "Submit your tool to our directory."
			}
		]
	}
];

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

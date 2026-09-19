import IconBook from "@tabler/icons-svelte/icons/book";
import IconBrandGithub from "@tabler/icons-svelte/icons/brand-github";
import IconFileText from "@tabler/icons-svelte/icons/file-text";
import IconPackage from "@tabler/icons-svelte/icons/package";
import IconSchool from "@tabler/icons-svelte/icons/school";
import IconTool from "@tabler/icons-svelte/icons/tool";
import { appConfig } from "@/project.config";
import { type Product, shippedProducts } from "$lib/data/products";

export type NavLink = { label: string; href: string; external?: boolean };

export type MenuItem = {
	label: string;
	href: string;
	description: string;
	/** A product slug renders its drawing; otherwise an icon component. */
	slug?: Product["slug"];
	// biome-ignore lint/suspicious/noExplicitAny: a Svelte component constructor, not worth a generic
	icon?: any;
	external?: boolean;
};

export type MenuGroup = {
	label: string;
	/** Where the trigger itself goes if someone clicks rather than hovers. */
	href: string;
	items: MenuItem[];
	/** Optional promoted row along the foot of the panel. */
	footer?: { label: string; href: string; hint: string };
};

/** The products, straight from the data file, so a new one appears here on its own. */
const productItems: MenuItem[] = shippedProducts.map((p) => ({
	label: p.name,
	href: p.href,
	description: p.kind,
	slug: p.slug,
	external: true
}));

export const menuGroups: MenuGroup[] = [
	{
		label: "Products",
		href: "/#products",
		items: productItems,
		footer: { label: "All four on one page", href: "/#products", hint: "What each one does" }
	},
	{
		label: "Resources",
		href: "/learn",
		items: [
			{
				label: "Lessons",
				href: "/learn",
				description: "Short programs, one idea each",
				icon: IconSchool
			},
			{
				label: "Guides",
				href: "/guides",
				description: "Longer walkthroughs, written while building",
				icon: IconBook
			},
			{
				label: "Dev tools",
				href: "/dev-tools",
				description: "Small utilities that run in the tab",
				icon: IconTool
			},
			{
				label: "Package docs",
				href: "https://docs.nexonauts.com",
				description: "References and architecture notes",
				icon: IconFileText,
				external: true
			}
		]
	}
];

/** Links that need no panel of their own. */
export const navLinks: NavLink[] = [{ label: "Contact", href: "/contact" }];

export const sheetExtras: MenuItem[] = [
	{
		label: "GitHub",
		href: appConfig.socials.github,
		description: "Every repository, and the issues",
		icon: IconBrandGithub,
		external: true
	},
	{
		label: "Packages",
		href: "https://docs.nexonauts.com",
		description: "What the products are built on",
		icon: IconPackage,
		external: true
	}
];

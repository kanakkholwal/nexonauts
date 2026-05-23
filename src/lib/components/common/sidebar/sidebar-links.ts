import type { Component } from "svelte";
import LayoutDashboard from "@lucide/svelte/icons/layout-dashboard";

export type AllowedRole = "admin" | "user" | "*" | string;

export type SidebarLink = {
	title: string;
	icon: Component<Record<string, unknown>>;
	path: string;
	allowed_roles: AllowedRole | AllowedRole[];
	category: "none" | "metrics" | "action" | "view";
	preserveParams?: boolean;
	items?: { title: string; path: string; allowed_roles: AllowedRole | AllowedRole[] }[];
};

export const sidebar_links: SidebarLink[] = [
	{
		title: "Dashboard",
		icon: LayoutDashboard,
		path: "",
		allowed_roles: "admin",
		category: "none"
	}
];

export function getSideNavLinks(role: string, prefixPath: string): SidebarLink[] {
	return sidebar_links
		.filter((l) => {
			const r = Array.isArray(l.allowed_roles) ? l.allowed_roles : [l.allowed_roles];
			return r.includes(role) || r.includes("*");
		})
		.map((l) => ({
			...l,
			path: `/${prefixPath}${l.path}`,
			items: l.items?.map((item) => ({
				...item,
				path: `/${prefixPath}${l.path}${item.path}`
			}))
		}));
}

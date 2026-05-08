import type { Component } from "svelte";
import LayoutDashboard from "@lucide/svelte/icons/layout-dashboard";
import Users from "@lucide/svelte/icons/users";
import Boxes from "@lucide/svelte/icons/boxes";
import Wrench from "@lucide/svelte/icons/wrench";
import MessageSquareText from "@lucide/svelte/icons/message-square-text";
import Settings2 from "@lucide/svelte/icons/settings-2";
import UserRoundCog from "@lucide/svelte/icons/user-round-cog";

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
		allowed_roles: "user",
		category: "none"
	},
	{
		title: "Dashboard",
		icon: LayoutDashboard,
		path: "",
		allowed_roles: "admin",
		category: "none"
	},
	{
		title: "Users",
		icon: Users,
		path: "/users",
		allowed_roles: "admin",
		category: "metrics",
		items: [{ title: "Create User", path: "/new", allowed_roles: "admin" }]
	},
	{
		title: "Products",
		icon: Boxes,
		path: "/products",
		allowed_roles: ["admin", "user"],
		category: "view"
	},
	{
		title: "Tools",
		icon: Wrench,
		path: "/tools",
		allowed_roles: ["admin", "user"],
		category: "view"
	},
	{
		title: "Messages",
		icon: MessageSquareText,
		path: "/messages",
		allowed_roles: "admin",
		category: "view"
	},
	{
		title: "Profile",
		icon: UserRoundCog,
		path: "/settings/profile",
		allowed_roles: "user",
		category: "action"
	},
	{
		title: "Settings",
		icon: Settings2,
		path: "/settings",
		allowed_roles: ["admin", "user"],
		category: "action"
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

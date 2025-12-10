import { MessageSquareText, Moon, Podcast, Settings, UserRoundCog, Users } from "lucide-react";
import { BsInstagram } from "react-icons/bs";
import { FiLinkedin } from "react-icons/fi";
import { LuGithub, LuLayoutDashboard } from "react-icons/lu";
import { RiTwitterXFill } from "react-icons/ri";
import type { Session } from "~/auth/client";
// import { TbServer2 } from "react-icons/tb";

import { TbDashboard } from "react-icons/tb";
import { ROLES } from "~/constants/index";

import { appConfig } from "@root/project.config";
import {
    Settings2,
    Swords
} from "lucide-react";
import { RiAppsLine } from "react-icons/ri";
import { toRegex } from "src/utils/string";
// import { TbServer2 } from "react-icons/tb";


export type AllowedRoleType = "admin" | "user" | "*" | string
//   | Session["user"]["role"]
//   | Session["user"]["other_roles"][number]
//   | "*"
//   | `!${Session["user"]["role"]}`
//   | `!${Session["user"]["other_roles"][number]}`;

export type rawLinkType = {
    title: string;
    path: string;
    allowed_roles: AllowedRoleType[] | AllowedRoleType;
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
    preserveParams?: boolean;
    category: "none" | "metrics" | "action" | "view"
    items?: {
        title: string;
        path: string;
        allowed_roles: AllowedRoleType[] | AllowedRoleType;
    }[];
};

export const sidebar_links: rawLinkType[] = [
    {
        title: "Dashboard",
        icon: TbDashboard,
        path: "",
        allowed_roles: "user",
        category: "none"
    },
    {
        title: "Dashboard",
        icon: TbDashboard,
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
        items: [
            {
                title: "Create User",
                path: "/new",

                allowed_roles: "admin",
            },
        ],
    },
    {
        title: "Products",
        icon: RiAppsLine,
        path: "/products",
        allowed_roles: ["admin", "user"],
        category: "view",
    },

    {
        title: "Tools",
        icon: Swords,
        path: "/tools",
        category: "view",
        allowed_roles: ["admin", "user"],
    },
    {
        title: "Messages",
        icon: MessageSquareText,
        path: "/messages",
        category: "view",
        allowed_roles: "admin",
    },

    //   user roles links


    {
        title: "Settings",
        icon: Settings,
        path: "/settings",
        category: "view",

        allowed_roles: "*",
        items: [
            {
                title: "Profile",
                path: "/profile",
                allowed_roles: "*",
            },
            {
                title: "Account",
                path: "/account",
                allowed_roles: "*",
            },
            {
                title: "Appearance",
                path: "/appearance",
                allowed_roles: "*",
            },
        ],
    },
];
interface SocialLink {
    href: string;
    icon: React.ElementType;
}

export const socials: SocialLink[] = [
    {
        href: appConfig.socials.twitter,
        icon: RiTwitterXFill,
    },
    {
        href: appConfig.socials.linkedin,
        icon: FiLinkedin,
    },
    {
        href: appConfig.socials.github,
        icon: LuGithub,
    },
    {
        href: appConfig.socials.instagram,
        icon: BsInstagram,
    },
];
export type RouterCardLink = {
    href: string;
    title: string;
    description: string;
    external?: boolean;
    Icon: React.FC<React.SVGProps<SVGSVGElement>>;
    allowed_roles: AllowedRoleType[] | AllowedRoleType;
    disabled?: boolean;
    category: string;
    isNew?: boolean;
};
export const getLinksByRole = <T extends rawLinkType | RouterCardLink>(
    role: string,
    links: T[]
): T[] => {
    return links.filter((link) =>
        checkRoleAccess(role, normalizeRoles(link.allowed_roles))
    );
};
// Helper function to normalize allowed_roles to array
const normalizeRoles = (
    roles: AllowedRoleType | AllowedRoleType[]
): string[] => {
    return Array.isArray(roles)
        ? ROLES.map((role) => String(role))
        : [String(roles)];
};
// Helper function to check role access with negation support
const checkRoleAccess = (userRole: string, allowedRoles: string[]): boolean => {
    // If allowed_roles is "*", allow access to everyone
    if (allowedRoles.includes("*")) return true;

    // Check for direct role match
    if (allowedRoles.includes(userRole)) return true;

    // Check for negation roles (starting with "!")
    // const positiveRoles = allowedRoles.filter((role) => !role.startsWith("!"));
    // const negatedRoles = allowedRoles.filter((role) => role.startsWith("!"));

    // // If there are positive roles specified, use standard inclusion logic
    // if (positiveRoles.length > 0) {
    //   return positiveRoles.includes(userRole);
    // }

    // If only negation roles are specified, allow access if user's role is not negated
    return !allowedRoles.some((roles) => toRegex(roles).test(userRole));
};

export const SUPPORT_LINKS = [];

export type NavLink = RouterCardLink & {
    items?: NavLink[];
};

export const getNavLinks = (user?: Session["user"]): NavLink[] => {
    const linksByRole = []
    // const linksByRole = [user?.role, ...(user?.other_roles || [])]
    //   .map((role) => getLinksByRole("*", quick_links))
    //   .flat() // filter out unique links
    //   .filter(
    //     (link, index, self) =>
    //       index ===
    //       self.findIndex((l) => l.href === link.href && l.title === link.title)
    //   );
    // console.log("Links by role:", linksByRole);

    if (user) {
        linksByRole.push({
            title: "Dashboard",
            href: "/" + user.other_roles?.[0],
            description: "Manage your account settings.",
            Icon: LuLayoutDashboard,
            category: "dashboard",
            allowed_roles: ["*"],
        })
        linksByRole.push({
            title: "Settings",
            href: user.other_roles?.[0] + "/settings",
            description: "Manage your account settings.",
            Icon: Settings,
            category: "dashboard",
            allowed_roles: ["*"]
        })
        linksByRole.push({
            title: "Account",
            href: user.other_roles?.[0] + "/settings/account",
            description: "Manage your account settings.",
            Icon: UserRoundCog,
            category: "dashboard",
            allowed_roles: ["*"]
        })
        linksByRole.push({
            title: "Appearance",
            href: user.other_roles?.[0] + "/settings/appearance",
            description: "Manage your account settings.",
            Icon: Moon,
            category: "dashboard",
            allowed_roles: ["*"]
        })


    }
    // if(process.env.NODE_ENV !== "production"){
    linksByRole.push({
        title: "Whisper Room",
        href: "/whisper-room",
        description: "Anonymous discussion forum for students.",
        Icon: Podcast,
        category: "community",
        allowed_roles: ["student"],
        isNew: true
    })
    // }
    return linksByRole

};
type MegaMenuLinks = {
    title: string;
    href: string;
    image?: string;
    Icon?: React.FC<React.SVGProps<SVGSVGElement>>;
    description: string;
};

export type MegaMenuNavLinksType = {
    title: string;
    type: "mega_menu";
    href?: string;
    items: MegaMenuLinks[];
}
export type DropdownNavLinksType = {
    title: string;
    type: "dropdown";
    href?: string;
    items: {
        title: string;
        href: string;
    }[];
}
export type LinkNavLinksType = {
    title: string;
    type: "link";
    href: string;


}
export type NavLinksType = MegaMenuNavLinksType | DropdownNavLinksType | LinkNavLinksType;


export const nav_list: NavLinksType[] = [
    {
        title: "Nexo Scout",
        type: "mega_menu",
        items: [
            {
                title: "Nexo Scout",
                href: "/scout",
                description: `Discover Essential Tools & Resources`,
            },
            {
                title: "Find Perfect Tools",
                href: "/scout/browse",
                description: `Find the perfect tools for your business.`,
            },
        ],
    },
    {
        title: "CreationsHub",
        type: "mega_menu",

        items: [
            {
                title: "Browse & Sell Creations",
                href: "/marketplace",
                description: `Browse and sell your digital products.`,
            },
            {
                title: "Discover Digital Assets",
                href: "/marketplace/discover",
                description: `Discover digital assets for your business.`,
            },
        ],
    },
    {
        title: "Dev Tools",
        type: "mega_menu",

        items: [
            {
                title: "Find Dev Tools",
                href: "/dev-tools",
                description: `Find the dev tools for your project development.`,
            },
            {
                title: "Submit Your Tool",
                href: "/dev-tools/submit",
                description: `Submit your tool to our directory.`,
            },
        ],
    },
    {
        title: "Support",
        type: "dropdown",
        items: [
            {
                title: "Find Support Articles",
                href: "/support/articles",
            },
            {
                title: "Contact Support",
                href: "/support/contact",
            },
        ]
    },
    {
        title: "About Us",
        type: "link",
        href: "/about",
    }
]


export type sideLinkType = {
    label: string;
    href: string;
    icon: React.ElementType;
};


const user_links: sideLinkType[] = [
    {
        label: "Dashboard",
        icon: TbDashboard,
        href: "/dashboard",
    },
    // {
    //     label: "Tools",
    //     icon: Swords,
    //     href: "/dashboard/tools",
    // },
    {
        label: "Account",
        icon: UserRoundCog,
        href: "/dashboard/settings/account",
    },
    {
        label: "Settings",
        icon: Settings2,
        href: "/dashboard/settings",
    },
];

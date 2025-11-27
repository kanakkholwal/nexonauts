import { MessageSquareText } from "lucide-react";

import {
    Settings,
    Settings2,
    Swords,
    UserRoundCog,
    Users
} from "lucide-react";
import { RiAppsLine } from "react-icons/ri";
import { TbDashboard } from "react-icons/tb";
// import { TbServer2 } from "react-icons/tb";


export type AllowedRoleType = "admin" | "user" | "*"
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
        path: "/admin",
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
        allowed_roles: "admin",
        category: "view",
    },

    {
        title: "Tools",
        icon: Swords,
        path: "/tools",
        category: "view",
        allowed_roles: "admin",
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

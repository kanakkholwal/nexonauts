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
import type { Metadata } from "next";

export const ROOT_METADATA: Metadata = {
  title: "Nexonauts | The Ultimate AI Ecosystem for Developers & Creators",
  description:
    "Nexonauts is the next-generation platform for developers and creators. Access specialized AI tools, manage your portfolio, and explore a vast marketplace of digital assets.",
  applicationName: "Nexonauts",
  keywords: [
    "Nexonauts",
    "AI Tools",
    "Developer Portfolio",
    "Digital Marketplace",
    "Fashion AI",
    "Content Automation",
    "Thumbnail Generator",
    "Open Source Tools",
    "Web Utilities",
    "SaaS",
    "Next.js",
    "React",
  ],
  authors: [{ name: "Kanak Kholwal", url: "https://kanakkholwal.eu.org" }],
  creator: "Kanak Kholwal",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://nexonauts.com/"),
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const FOOTER_LINKS = [
  {
    title: "Product",
    links: [
      {
        title: "Dev Tools",
        href: "/dev-tools",
      },
      {
        title: "Dev Profiles",
        href: "/devs",
      },
      {
        title: "Nexo Scout",
        href: "/scout",
      },
      {
        title: "MarketPlace",
        href: "/marketplace",
      },
    ],
  },
  {
    title: "Company",
    links: [
      {
        title: "About",
        href: "/about",
      },
      {
        title: "Pricing",
        href: "/pricing",
      },
      {
        title: "Privacy",
        href: "/privacy",
      },
      {
        title: "Term of Use",
        href: "/tos",
      },
    ],
  },
  {
    title: "Support",
    links: [
      {
        title: "Contact",
        href: "/contact",
      },
      {
        title: "Disclaimer",
        href: "/copyright",
      },
      {
        title: "Blog",
        href: "/blog",
      },
    ],
  },
];

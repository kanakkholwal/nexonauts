import type { Metadata } from "next";

export const ROOT_METADATA: Metadata = {
  title: "Nexonauts - One stop solution for all your developer needs.",
  description:
    "Nexonauts is an one stop solution for all your developer needs.",
  applicationName: "Nexonauts",
  keywords: [
    "Next.js",
    "React",
    "JavaScript",
    "Nexonauts",
    "AI Saas",
    "AI",
    "Saas",
    "developer",
    "developer tools",
    "developer resources",
    "developer",
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

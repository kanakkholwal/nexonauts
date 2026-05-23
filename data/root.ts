export const ROOT_METADATA = {
  title: "Nexonauts — Tools and writing for developers",
  description:
    "A small studio of developer tools and technical writing. Home of Recast and Docvia.",
  applicationName: "Nexonauts",
  keywords: [
    "Nexonauts",
    "Recast",
    "Docvia",
    "screen recorder",
    "documentation compiler",
    "developer tools",
    "developer resources",
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
    title: "Products",
    links: [
      { title: "Recast", href: "/recast" },
      { title: "Docvia", href: "https://docvia.dev" },
      { title: "Dev Tools", href: "/dev-tools" },
    ],
  },
  {
    title: "Read",
    links: [
      { title: "Guides", href: "/guides" },
    ],
  },
  {
    title: "Company",
    links: [
      { title: "About", href: "/about" },
      { title: "Contact", href: "/contact" },
      { title: "Privacy", href: "/privacy" },
      { title: "Terms", href: "/tos" },
    ],
  },
];

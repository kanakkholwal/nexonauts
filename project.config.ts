
// This file contains the configuration for the app and college
export const appConfig = {
  name: "Nexonauts",
  appDomain: "nexonauts.com",
  otherAppDomains: [
    "app.nexonauts.com",
  ],
  url: "https://nexonauts.com",
  logoSquare: "/logo-square.svg",
  logo: "/logo.svg",
  logoDark: "/logo-dark.svg",
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
  githubRepo:
    "https://github.com/kanakkholwal/nexonauts",
  githubUri: "kanakkholwal/nexonauts",
  socials: {
    twitter: "https://twitter.com/kanakkholwal?utm_source=nexonauts.com&utm_medium=direct&utm_campaign=personal_brand",
    linkedin: "https://linkedin.com/in/kanak-kholwal?utm_source=nexonauts.com&utm_medium=direct&utm_campaign=personal_brand",
    instagram: "https://instagram.com/kanakkholwal?utm_source=nexonauts.com&utm_medium=direct&utm_campaign=personal_brand",
    github: "https://github.com/kanakkholwal?utm_source=nexonauts.com&utm_medium=direct&utm_campaign=personal_brand",
    website: "https://kanak.eu.org/?utm_source=nexonauts.com&utm_medium=direct&utm_campaign=personal_brand",
  },

  verifications: {
    google_adsense: "ca-pub-6988693445063744",
    google_analytics: "G-DQ8920P13D",
  },
  // SEO-specific enhancements

  // Structured data templates
  jsonLds: {
    WebApplication: {
      "@type": "Website",
      name: "Nexonauts",
      url: "https://nexonauts.com",
      applicationCategory: "Internet",
      operatingSystem: "Web",
     
    },
  },

  flags: {
    enableOgImage: false, // Enable Open Graph image generation
  },
};


export default {
  appConfig,
} as const;

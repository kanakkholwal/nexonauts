export const NAME = "NexoMart";
export const TITLE = "NexoMart - Digital Products Marketplace by NexoNauts";
export const FULL_DESCRIPTION =
  "Discover an expansive universe of high-quality digital products, from stunning templates and UI kits to insightful e-books, powerful plugins, practical extensions, captivating themes, and visually impactful graphics and fonts. Whether you're a seasoned creative or a budding entrepreneur, our marketplace empowers you to find, purchase, and promote digital products that fuel your innovation and success. Join our vibrant community of creators and unlock the endless possibilities of the digital realm.";
export const SHORT_DESCRIPTION =
  "Discover an expansive universe of high-quality digital products and unleash your creative potential. Find everything from templates and UI kits to e-books, plugins, extensions, themes, graphics, and fonts. Join our thriving community and unlock the endless possibilities of the digital world.";

export const CATEGORIES = [
  "Course",
  "Design",
  "Productivity",
  "Templates",
  "Themes",
  "UI Kits",
] as const;

const CATEGORY_METADATA = {
  course: {
    label: "Course",
    description:
      "Learn new skills, gain valuable knowledge, and grow your expertise with our curated selection of courses.",
  },
  design: {
    label: "Design",
    description:
      "Enhance your creativity, elevate your designs, and bring your ideas to life with our design resources.",
  },
  productivity: {
    label: "Productivity",
    description:
      "Boost your efficiency, streamline your workflow, and achieve more with our productivity tools.",
  },
  templates: {
    label: "Templates",
    description:
      "Kickstart your projects, save time, and create stunning designs with our ready-to-use templates.",
  },
  themes: {
    label: "Themes",
    description:
      "Transform your websites, elevate your online presence, and captivate your audience with our themes.",
  },
  uikits: {
    label: "UI Kits",
    description:
      "Design beautiful interfaces, build engaging user experiences, and craft exceptional digital products with our UI kits.",
  },
} as const;

export const getCategoryByLabel = (
  label: string
): (typeof CATEGORY_METADATA)[keyof typeof CATEGORY_METADATA] | undefined => {
  return Object.values(CATEGORY_METADATA).find(
    (category) => category.label === label
  );
};

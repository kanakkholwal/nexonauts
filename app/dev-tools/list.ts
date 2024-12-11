import collection from "./(tools)/collection";

interface ToolProp {
  title: string;
  description: string;
  category: string;
  id: string;
  path: string;
}

export const allDevTools: ToolProp[] = collection.map((tool) => ({
  description: tool.description,
  id: tool.slug,
  category: tool.category,
  title: tool.title,
  path: `/dev-tools/${tool.slug}`,
}));

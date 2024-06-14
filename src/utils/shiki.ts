import { bundledLanguages, getHighlighter } from "shiki/bundle/web";

export const codeToHtml = async ({
  code,
  language,
  theme,
}: {
  code: string;
  language: string;
  theme: string;
}) => {
  const highlighter = await getHighlighter({
    themes: ["github-light-default", "github-dark-default"],
    langs: [...Object.keys(bundledLanguages)],
  });

  return highlighter.codeToHtml(code, {
    lang: language,
    theme:
      theme === ""
        ? "github-light-default"
        : theme === "dark"
          ? "github-dark-default"
          : "github-light-default",
  });
};

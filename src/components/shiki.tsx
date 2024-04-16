// import { cache } from "react";
// import { getHighlighter as shikiGetHighlighter } from "shiki";

// interface ShikiProps {
//     code: string;
//     lang: string;
//     theme: string;
// }

// export async function Shiki({ code, lang, theme }: ShikiProps) {
//     const highlighter = await getHighlighter(lang, theme);

//     const html = highlighter.codeToHtml(code, {
//         lang,
//         theme,
//     });

//     return <div dangerouslySetInnerHTML={{ __html: html }} />;
// }

// const highlighterPromise = shikiGetHighlighter({});

// const getHighlighter = cache(async (language: string, theme: string) => {
//     console.log("Loading highlighter", language, theme);
//     const highlighter = await highlighterPromise;
//     const loadedLanguages = highlighter.getLoadedLanguages();
//     const loadedThemes = highlighter.getLoadedThemes();

//     let promises = [];
//     // if (!loadedLanguages.includes(language as any)) {
//     //     promises.push(highlighter.loadLanguage(language as string));
//     // }

//     // if (!loadedThemes.includes(theme as any)) {
//     //     promises.push(highlighter.loadTheme(theme));
//     // }

//     // await Promise.all(promises);

//     return highlighter;
// });
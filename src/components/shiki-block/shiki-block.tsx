"use client";
import { Interweave } from "interweave";
import { useTheme } from "next-themes";
import React from "react";
import { codeToHtml } from "src/utils/shiki";
import "./shiki-block.css";

function ShikiBlock({ code, lang }) {
  const [innerHtml, setHtml] = React.useState("Loading...");
  const { theme } = useTheme();
  React.useEffect(() => {
    codeToHtml({
      code: code,
      language: lang,
      theme: (theme as string) || "light",
    }).then((html) => {
      setHtml(html);
    });
  }, [code, lang, theme]);
  return <Interweave content={innerHtml} tagName="div" />;
}
export default React.memo(ShikiBlock);

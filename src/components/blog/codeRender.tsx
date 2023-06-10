import React, { memo, useEffect } from "react";
import Prism from "prismjs";
import dynamic from "next/dynamic";

type Props = {
    data: any;
};

const CodeRenderer = ({ data }: Props) => {
  //first we split the lines, the first line will be reserved for the language definition.
  //the next lines will be reserved for the code itself.
//   console.log(data)
  const [lang, ...body] = data.code.split("\n");

  //get the language
  const language = lang.slice(1) ?? "javascript";
  //join the body
  const _body = body.join("\n");

  useEffect(() => {
    //create an async function to load the languages using import
    async function highlight() {
      if (typeof window !== "undefined" || !language) {
        //import the language dynamically using import statement
         dynamic(() => import(`prismjs/components/prism-${language}`));
        Prism.highlightAll();
      }
    }
    highlight();
  }, [language, data]);

  return (
    <pre tabIndex={0} className={`language-${language}`}>
      <code className={`language-${language}`}>{_body}</code>
    </pre>
  );
};

export default memo(CodeRenderer);
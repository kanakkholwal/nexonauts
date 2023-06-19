import React, { memo, useEffect } from "react";
import Prism from "prismjs";
import dynamic from "next/dynamic";

type Props = {
    data: any;
    language: string;
};

const CodeRenderer = ({ data,language }: Props) => {
  //first we split the lines, the first line will be reserved for the language definition.
  //the next lines will be reserved for the code itself.


  useEffect(() => {
    //create an async function to load the languages using import
    async function highlight() {
      if (typeof window !== "undefined") {
        //import the language dynamically using import statement
         dynamic(() => import(`prismjs/components/prism-${language}`));
        Prism.highlightAll();
      }
    }
    highlight();
  }, [language, data]);

  return (
    <pre tabIndex={0} className={`language-${language}`}>
      <code className={`language-${language}`}>{data}</code>
    </pre>
  );
};

export default memo(CodeRenderer);
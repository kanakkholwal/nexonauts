import copy from "copy-to-clipboard";
import dynamic from "next/dynamic";
import Prism from "prismjs";
import { memo, useEffect, useState } from "react";
import toast from "react-hot-toast";

type Props = {
  data: any;
  language: string;
  format?: string;
};

const CodeRenderer = ({ data, language, format }: Props) => {
  //first we split the lines, the first line will be reserved for the language definition.
  //the next lines will be reserved for the code itself.
  const [state, setState] = useState<string | "idle" | "copy">("idle");

  useEffect(() => {
    //create an async function to load the languages using import
    async function highlight() {
      if (typeof window !== "undefined") {
        //import the language dynamically using import statement
        await dynamic(() => import(`prismjs/components/prism-${language}`));
        Prism.highlightAll();
      }
    }
    highlight();
  }, [language, data]);

  return (
    <pre tabIndex={0} className={`language-${language} relative`}>
      <button
        type="button"
        className="absolute right-2 top-2 text-slate-600 font-bold  text-xs hover:text-primary"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          copy(data, {
            onCopy: () => {
              setState("copy");
              toast.success("Copied to clipboard");
              setTimeout(() => {
                setState("idle");
              }, 1000);
            },
          });
        }}
        disabled={state === "copy"}
      >
        {state === "idle" ? "Copy" : "Copied !!!"}
      </button>
      <code className={`language-${language} whitespace-pre-wrap`}>{data}</code>
    </pre>
  );
};

export default memo(CodeRenderer);

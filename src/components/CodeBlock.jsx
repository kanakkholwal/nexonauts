"use client";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";
import Prism from "prismjs";
import { useEffect, useState } from "react";
import { MdContentCopy, MdDoneAll, MdErrorOutline } from "react-icons/md";
import { toast } from "sonner";

const ParseString = (string) => {
  let replaced;
  replaced = string;
  replaced = replaced.replace(/&/gi, "&amp;");
  replaced = replaced.replace(/</gi, "&lt;");
  replaced = replaced.replace(/>/gi, "&gt;");
  replaced = replaced.replace(/"/gi, "&quot;");
  replaced = replaced.replace(/'/gi, "&#039;");
  replaced = replaced.replace(/&#177;/gi, "&plusmn;");
  replaced = replaced.replace(/&#169;/gi, "&copy;");
  replaced = replaced.replace(/&#174;/gi, "&reg;");
  replaced = replaced.replace(/ya'll/gi, "ya'll");

  return replaced;
};

function CodeBlock({ content, language, title, ...props }) {
  const [CopyState, SetCopyState] = useState("normal");



  function copyToClipboard(textToCopy) {
    // navigator clipboard api needs a secure context (https)
    if (navigator.clipboard && window.isSecureContext) {
      // navigator clipboard api method'
      return navigator.clipboard.writeText(textToCopy);
    }
      // text area method
      const textArea = document.createElement("textarea");
      textArea.value = textToCopy;
      // make the textarea out of viewport
      textArea.style.position = "fixed";
      textArea.style.left = "-999999px";
      textArea.style.top = "-999999px";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      return new Promise((res, rej) => {
        // here the magic happens
        document.execCommand("copy") ? res() : rej();
        toast.success("Copied to clipboard");
        textArea.remove();
      });
  }

  const Copy = (e, text) => {
    copyToClipboard(text)
      .then(() => {
        SetCopyState("done");
        toast.success("Copied to clipboard");
      })
      .catch((error) => {
        SetCopyState("error");
        toast.error("Error copying to clipboard");

        console.log("error", error);
      })
      .finally(() => {
        setTimeout(() => {
          SetCopyState("normal");
        }, 800);
      });
  };

  const HandleCopyState = ({ state }) => {
    if (state === "error")
      return (
        <>
          Error <MdErrorOutline className="w-3 h-3 ml-2" />
        </>
      );
    if (state === "done")
      return (
        <>
          Copied <MdDoneAll className="w-3 h-3 ml-2" />{" "}
        </>
      );
    if (state === "normal")
      return (
        <>
          Copy <MdContentCopy className="w-3 h-3 ml-2" />{" "}
        </>
      );
  };
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
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
  }, [language, content]);

  return (
    <>
      <div className="relative p-0">
        <Button
          type="button"
          className="absolute z-40 top-2 right-2 ml-auto left-auto h-8 bg-transparent text-slate-600 dark:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-white/5 backdrop-blur-sm"
          variant="secondary"
          size="sm"
          onClick={(e) => Copy(e, content.toString())}
        >
          <HandleCopyState state={CopyState} />
        </Button>
        <pre {...props} className="!m-0" >
          <code className={`language-${language}`}>{content}</code>
        </pre>
      </div>
    </>
  );
}

export default CodeBlock;

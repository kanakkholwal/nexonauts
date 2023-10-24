import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";
import Prism from "prismjs";
import { useEffect, useState } from "react";
import toast from 'react-hot-toast';
import { FiCodesandbox } from "react-icons/fi";
import { MdContentCopy, MdDoneAll, MdErrorOutline } from "react-icons/md";


const ParseString = (string) => {
    var replaced;
    replaced = string;
    replaced = replaced.replace(/&/ig, "&amp;");
    replaced = replaced.replace(/</ig, "&lt;");
    replaced = replaced.replace(/>/ig, "&gt;");
    replaced = replaced.replace(/"/ig, "&quot;");
    replaced = replaced.replace(/'/ig, "&#039;");
    replaced = replaced.replace(/&#177;/ig, "&plusmn;");
    replaced = replaced.replace(/&#169;/ig, "&copy;");
    replaced = replaced.replace(/&#174;/ig, "&reg;");
    replaced = replaced.replace(/ya'll/ig, "ya'll");

    return replaced;
}

function CodeBlock({ content, language, title, ...props }) {

    const [CopyState, SetCopyState] = useState("normal");


    useEffect(() => {

        Prism.highlightAll();
    }, [language, content]);



    function copyToClipboard(textToCopy) {
        // navigator clipboard api needs a secure context (https)
        if (navigator.clipboard && window.isSecureContext) {
            // navigator clipboard api method'
            return navigator.clipboard.writeText(textToCopy);
        } else {
            // text area method
            let textArea = document.createElement("textarea");
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
                document.execCommand('copy') ? res() : rej();
                toast.success("Copied to clipboard")
                textArea.remove();
            });
        }
    }

    const Copy = (e, text) => {
        copyToClipboard(text)
            .then(() => {
                SetCopyState("done")
                toast.success("Copied to clipboard")

            })
            .catch((error) => {
                SetCopyState("error");
                toast.error("Error copying to clipboard")

                console.log('error', error)
            }).finally(() => {
                setTimeout(() => {
                    SetCopyState("normal")
                }, 800);
            })
    }

    const HandleCopyState = ({ state }) => {

        if (state == "error")
            return (<>Error <MdErrorOutline /></>)
        else if (state == "done")
            return (<>Copied <MdDoneAll /> </>)
        else if (state == "normal")
            return (<>Copy <MdContentCopy /> </>)
    }
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
            <div className='flex justify-between items-center w-full truncate py-2 px-4 bg-primary/25 rounded-t '>
                <div className='flex gap-2 items-center justify-start'>

                <FiCodesandbox className='w-4 h-5 mr-2' />
                <h3 className='text-lg font-semibold' title={title ? title : "CodeBlock"}>
                    {title ? title : "CodeBlock"}
                </h3>
                </div>
                <Button type="button" variant="secondary" size="sm" onClick={(e) => Copy(e, content.toString())}><HandleCopyState state={CopyState} />
                </Button>
            </div>
            <div className=' p-0'>
                <pre {...props} className='!m-0' tabIndex={0}>
                    <code className={"language-" + language} >
                        {content}
                    </code>
                </pre>
            </div>
        </>
    )
}

export default CodeBlock;
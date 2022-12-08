import Prism from "prismjs"
import { useEffect } from "react";
import style from "./_CodeBlock.module.scss";


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


    useEffect(() => {
        Prism.highlightAll();
    }, [language, content])


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
                textArea.remove();
            });
        }
    }

    const Copy = (e, text) => {
        copyToClipboard(text)
            .then(() => {
                e.target.innerText = "Copied !!!";
            })
            .catch((error) => {
                e.target.innerText = "Error !!!";
                console.log('error', error)
            }).finally(() => {
                setTimeout(() => {
                    e.target.innerText = "Copy";
                }, 800);
            })
    }

    return (
        <div className={style.CodeBlock}>
            <div className={style.CodeBlock_Header} title={title ? title : "CodeBlock"}>
                <button className={style.Copy_Btn} type="button" onClick={(e) => Copy(e, content.toString())}>Copy</button>
            </div>
            <div className={style.CodeBlock_Body}>
                <pre {...props}>
                    <code className={"language-" + language} >
                        {content}
                    </code>
                </pre>
            </div>
        </div>
    )
}

export default CodeBlock;
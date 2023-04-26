import Prism from "prismjs";

import { useEffect, useState } from "react";
import styled, { keyframes } from 'styled-components';
import { FiCodesandbox } from "react-icons/fi";
import { MdContentCopy, MdDoneAll, MdErrorOutline } from "react-icons/md";
import Button from 'components/buttons'
const rotate = keyframes`
from {
    transform: rotateY(0deg) scale(1);
  }

  to {
    transform: rotateY(360deg) scale(1.2);
  }
`

const CodeBlockContainer = styled.div`
width: 100%;
height: auto;
margin: 0.5rem auto 0.75rem;
--radius:1rem;
@media (max-width:576px) {
    --size:0.75rem;
}
`;
const CodeIcon = styled(FiCodesandbox)`
font-size: var(--size);
color: var(--codeblock-header-text);
animation:${rotate} 3s cubic-bezier(0, 0, .2, 1) 0.25s infinite alternate;
`

const CodeBlockHeader = styled.div`
position: relative;
display: grid;
align-items: center;
margin-inline: auto;
grid-auto-flow: column;
grid-template-columns: 1fr 25fr auto;white-space: nowrap;
overflow: hidden;
border-radius: var(--radius) var(--radius) 0 0;
text-align: left;
color: var(--codeblock-header-text);
background: var(--codeblock-header-bg);
width: 100%;
padding: 0.5rem 0.75rem;
--size:1.75em;
@media (max-width:576px) {
    --size:1em;
}
`;
const CodeBlockTitle = styled.h2`
font-weight: 700;
text-overflow: ellipsis;
font-size: var(--size);
`;
const CopyButton = styled(Button)`
margin-left:auto;
`;
const CodeBlockBody = styled.div`
border-radius: 0 0 var(--radius) var(--radius);
overflow:hidden;
code{
    padding:1em;
}
`;

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
                textArea.remove();
            });
        }
    }

    const Copy = (e, text) => {
        copyToClipboard(text)
            .then(() => {
                SetCopyState("done")
            })
            .catch((error) => {
                SetCopyState("error")

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

    return (
        <CodeBlockContainer>
            <CodeBlockHeader>
                <CodeIcon />
                <CodeBlockTitle title={title ? title : "CodeBlock"}>
                    {title ? title : "CodeBlock"}
                </CodeBlockTitle>
                <CopyButton type="button" size="sm" onClick={(e) => Copy(e, content.toString())}><HandleCopyState state={CopyState} />
                </CopyButton>
            </CodeBlockHeader>
            <CodeBlockBody>
                <pre {...props}>
                    <code className={"language-" + language} >
                        {content}
                    </code>
                </pre>
            </CodeBlockBody>
        </CodeBlockContainer>
    )
}

export default CodeBlock;
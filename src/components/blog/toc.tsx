import Link from "next/link";
import styled from "styled-components";
import { AiOutlinePlus } from "react-icons/ai";
import React from "react";
import HTMLReactParser from 'html-react-parser';





const StyledTOC = styled.div`
    position: sticky;
    top: 80px;
    z-index: 99;
    padding: 1rem;
    margin: 1rem 0;
    border: 1px solid #eee;
    border-radius: 0.75rem;
    background-color: rgba(var(--light-rgb), 0.5);
    backdrop-filter: blur(10px);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    .Toc_Header{
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;
    }
    .Toc_Body{
        margin-top:1rem;
        padding-top:1rem;
        border-top: 1px solid rgba(var(--grey-rgb), 0.2);
        a{
            text-decoration:none;
            color: rgba(var(--secondary-rgb), 0.9);
            font-weight: 500;
            &:hover{
                color: rgba(var(--secondary-rgb),1);
                text-decoration:underline;
            }
        }
        ol{
            padding:0 0 0 16px;
            counter-reset: ify;
            &> li{
                counter-increment: ify;
                list-style:none;
                     &:before{
                      display:inline-block;
                      content:counters(ify,'.')'.';
                      margin:0 5px 0 0;
                     }
                
                }
            }
    }

    

`;
const StyledButton = styled.button`
    padding: 0.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    transition: all 0.2s ease-in-out;
    background-color: rgba(var(--secondary-rgb), 0.2);
    cursor: pointer;
    &:hover{
        background-color: rgba(var(--secondary-rgb), 0.3);
        scale: 1.1;
    }

`;
type Block = {
    id: string,
    type: string,
    data: {
        text: string,
        level: number
    }
    children?: Array<Block>
}


export default function TOC({ blocks }: {
    blocks: Block[]
}) {
    const [open, setOpen] = React.useState(false);



    return (
        <StyledTOC>
            <div className="Toc_Header">
                <h4>Table of Contents</h4>
                <StyledButton onClick={() => setOpen(!open)}><AiOutlinePlus /></StyledButton>
            </div>
            {open && <><div className="Toc_Body">
                <TOCList blocks={remapBlocks(blocks)} />
            </div></>}

        </StyledTOC>
    )

}
const TOCList = ({ blocks }) => {

    return <ol>
        {
            blocks.map((block: Block, i: number) => {
                return (
                    <li key={i}>
                        <Link href={`#${block.data.text?.toString().replace(/\s/g, "_").toLowerCase()}`}>{block.data.text.replace(/\d+\.\s/, '')}</Link>
                        {block.children && <TOCList blocks={block.children} />}
                    </li>
                )

            })
        }

    </ol>


}

const remapBlocks = (blocks: Block[], level: number = 2): Block[] => {
    const topLevelBlocks = blocks.filter((block) => block.data.level === level);

    return topLevelBlocks.map((block) => {
        const startIndex = blocks.indexOf(block);
        const endIndex = blocks.findIndex((b, index) => index > startIndex && b.data.level === level);
        const children = blocks.slice(startIndex + 1, endIndex);

        return {

            ...block,
            children: remapBlocks(children, level + 1),
        };
    });
};

export const HeaderRenderer = ({ data, className = '' }) => {
    const props: {
      [s: string]: string;
    } = {};
  
    if (className) {
      props.className = className;
    }
  
    const Tag = `h${data?.level || 1}` as keyof JSX.IntrinsicElements;
    return <Tag {...props} id={data.text.toString().replace(/\s/g, "_").toLowerCase()}>{data?.text && HTMLReactParser(data.text)}</Tag>;
  };
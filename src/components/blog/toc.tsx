import Link from "next/link";
import styled from "styled-components";
import { MdFormatListNumbered } from "react-icons/md";
import { AiOutlinePlus } from "react-icons/ai";
import React from "react";
import Collapse from "components/collapse";
import HTMLReactParser from 'html-react-parser';





const StyledTOC = styled.div`
    // position: sticky;
    // top: 80px;
    // z-index: 99;
    margin: 1rem 0;
    clear: both;
    border-radius: 0.5rem;
    background-color:rgba(var(--grey-rgb), 0.08);
    backdrop-filter: blur(10px);
    // box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    text-align:left;
    .Toc_Header{
        position: relative;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px 16px;
        gap:0.25rem;
        margin: 0;
        span,svg{
            font-size: 16px;
            font-weight: 700;
            color: var(--text-color);
        }
    }
    .Toc_Body{
        margin: 0;
        padding-block:12px;
        border-top: 1px solid rgba(var(--grey-rgb), 0.12);
        a{
            text-decoration:none;
            color: rgba(var(--blog-theme-rgb), 0.9);
            font-weight: 500;
            font-size:14px;
            &:hover{
                color: rgba(var(--blog-theme-rgb),1);
                text-decoration:underline;
            }
        }
        ol{
            padding:0 16px 0 16px;
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
const StyledButton = styled.button<{open: boolean}>`
    padding: 0.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    width: 28px;
    height: 28px;
    margin-left: 0.5rem;
    border-radius: 50%;
    transition: all 0.3s ease-in-out;
    background-color: rgba(var(--blog-theme-rgb), 0.2);
    cursor: pointer;
    &:hover{
        background-color: rgba(var(--blog-theme-rgb), 0.3);
        scale: 1.1;
    }
    ${({open}) => {
        if(open === true){
            return `
                transform: rotate(45deg);
            `
        }
    }}

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
                <MdFormatListNumbered size={20}/>
                <span>Table of Contents</span>
                <StyledButton open={open} onClick={() => setOpen(!open)}><AiOutlinePlus /></StyledButton>
            </div>
            <Collapse visible={open}>
                <div className="Toc_Body">
                    <TOCList blocks={remapBlocks(blocks)} />
                </div>
            </Collapse>

        </StyledTOC>
    )

}
const TOCList = ({ blocks }) => {

    return <ol>
        {
            blocks.map((block: Block, i: number) => {
                return (
                    <li key={i}>
                        <Link href={`#${block.data.text?.toString().replace(/\s/g, "_").toLowerCase()}`}>{block.data.text && HTMLReactParser(block.data.text.replace(/\d+\.\s/, ''))}</Link>
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
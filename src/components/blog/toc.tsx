import Link from "next/link";
import React from "react";
import { MdFormatListNumbered } from "react-icons/md";
// import Collapse from "components/collapse";
import HTMLReactParser from 'html-react-parser';


const remapHeadingsRecursive = (
    headings: Omit<Heading, "children">[],
    level: number = 1,
    lastIndex: number = -1
): Heading[] => {
    const topLevelHeadings = headings.filter(
        (heading, index) => heading.level === level && index > lastIndex
    );

    let currentIndex = lastIndex;

    return topLevelHeadings.map((heading, index) => {
        const children = remapHeadingsRecursive(headings, level + 1, currentIndex);

        if (children.length > 0) {
            currentIndex = headings.indexOf(topLevelHeadings[index + 1]);
            return {
                ...heading,
                children,
            };
        }

        return heading;
    }) as Heading[];
};

function extractHeadings(markdown: string) {
    const headings: Omit<Heading, "children">[] = [];
    const headingRegex = /^(#+)\s+(.*)$/gm;
    let match: RegExpExecArray | null;

    while ((match = headingRegex.exec(markdown)) !== null) {
        const level = match[1].length;
        let text = match[2].trim();
        text = text.replace(/\*\*/g, '');

        const heading: Omit<Heading, "children"> = { text, level };

        headings.push(heading);
    }

    return remapHeadingsRecursive(headings, (headings[0]?.level ?? 1));
}





type Block = {
    id: string,
    type: string,
    data: {
        text: string,
        level: number
    }
    children?: Array<Block>
}
type Heading = {
    id?: string,
    level: number,
    text: string,
    children: Array<Heading>
}

export default function TOC({ blocks }: {
    blocks: Block[]
}) {
    const [open, setOpen] = React.useState(false);



    return (
        <>
            {/* <div className="Toc_Header">
                <MdFormatListNumbered size={20} />
                <span>Table of Contents</span>
                <StyledButton open={open} onClick={() => setOpen(!open)}><AiOutlinePlus /></StyledButton>
            </div> */}
            {/* <Collapse visible={open}> */}
                {/* <div className="Toc_Body">
                    <TOCList blocks={remapBlocks(blocks)} />
                </div> */}
            {/* </Collapse> */}

        </>
    )

}
export const TOCMarkDown = ({ content }: {
    content: string
}) => {

    const headings = extractHeadings(content);
    const [open, setOpen] = React.useState(false);
    console.log(headings)

    return (
        <>
            <div className="Toc_Header">
                <MdFormatListNumbered size={20} />
                <span>Table of Contents</span>
                {/* <StyledButton open={open} onClick={() => setOpen(!open)}><AiOutlinePlus /></StyledButton> */}
            </div>
            {/* <Collapse visible={open}> */}
                <div className="Toc_Body">
                    <ol>
                        {
                            headings.map((heading: any, i: number) => {
                                return (
                                    <li key={i}>
                                        <Link href={`#${heading.text?.toString().replace(/\.\s/, ' ').replaceAll(" ","-").toLowerCase()}`}>
                                            {heading.text && HTMLReactParser(heading.text.replace(/\d+\.\s/, ''))}
                                        </Link>
                                        {heading.children && <TOCListMD headings={heading.children} />}
                                    </li>
                                )

                            })
                        }

                    </ol>
                </div>
            {/* </Collapse> */}

        </>
    )
}
const TOCListMD = ({ headings }:{
    headings: Heading[]
}) => {

    return <ol>
        {
            headings.map((heading: Heading, i: number) => {
                return (
                    <li key={i}>
                        <Link href={`#${heading.text?.toString().replace(/\d+\.\s/, '').replaceAll(" ","-").toLowerCase()}`}>
                            {heading.text && HTMLReactParser(heading.text.replace(/\d+\.\s/, ''))}
                        </Link>
                        {heading.children && <TOCListMD headings={heading.children} />}
                    </li>
                )

            })
        }

    </ol>


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
export const HeaderToc = (data) => {
    const props: {
        [s: string]: string;
    } = {};
    if (data.className) {
        props.className = data.className;
    }

    const Tag = `h${data?.level || 1}` as keyof JSX.IntrinsicElements;
    return <Tag {...props} id={data.text.toString().replace(/\s/g, "_").toLowerCase()}>{data?.text && HTMLReactParser(data.text)}</Tag>;
}
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
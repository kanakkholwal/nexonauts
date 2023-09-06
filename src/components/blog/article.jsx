import styled from "styled-components";
import { BlogBreadCrumb } from "components/breadcrumb";
import Badge from "components/topography/badge";
import { calculateReadTime } from "lib/scripts";

import { GrValidate } from 'react-icons/gr';
import { MdOutlineDateRange, MdOutlineLabel } from 'react-icons/md';
import { AiOutlineFieldTime } from 'react-icons/ai';
import { BiCommentDetail } from 'react-icons/bi';
import Image from "next/image";
import Comments from "./comments";
import ShareUI from "./share";
import RelatedPosts from "./RelatedPosts";
import { TOCMarkDown } from "./toc";
import { CodeBlockMarkdown } from './codeRender';
import Markdown from 'markdown-to-jsx'

const Tag = styled(Badge)`
    font-size:0.75rem;
    padding:0.25rem 0.5rem;
    border-radius: 4px;
`;
export const ArticleWrapper = styled.article`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    text-align:center;
    width:100%;

`;
const ArticleBody = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding:0.75rem;
    text-align:center;
    width:100%;
    margin-inline:auto;
    border-radius: 10px;
    background: var(--card-bg);
    ${'' /* box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1), 0px 2px 1px rgba(0, 0, 0, 0.06),
    0px 1px 1px rgba(0, 0, 0, 0.08); */}
    ${'' /* box-shadow: var(--card-shadow); */}
 
    .Article{
        text-align:initial;
        width:100%;
        max-width:var(--max-width);
        margin-inline:auto;
        display:block;
    }
`;
const ArticleThumbnail = styled.div`
margin-block:5px;
border-radius:10px;
overflow:hidden;
width:100%;
img{
    object-fit:cover;
    width:100%;
    height:100%;
    
}
`;
const ArticleTitle = styled.div`
margin-block:5px;
text-align:left;
padding:10px;
`;
const MetaData = styled.div`
display:flex;
align-items:center;
justify-content:space-between;
gap:0.5rem;
margin-block:5px;
padding-block:5px;
width:100%;
border-bottom:1px solid rgba(var(--mute-rgb),0.25);
span{
    font-weight:500;
}
svg{
    margin-inline:3px;
}
`;
const Author = styled.div`
display:flex;
align-items:stretch;
gap:0.5rem;
&>img{
    border-radius:50%;
    height:50px;
    aspect-ratio:1;
}
&>div{
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap:0.1rem;
    svg{
        font:inherit;
    }
    .authorName{
    position: relative;
    display: block;
    font-size: 18px;
    font-weight:600;
     svg{
        position: absolute;
        top:50%;
        left:100%;
        margin-left:5px;
        transform:translateY(-50%);
        }
    }
    .postDetail{
    position: relative;
    display: block;
    font-size: 15px;
    font-weight:500;
    svg{
        margin-top:-3px;
        margin-inline:3px;
    }
    }
}
`;
export function Article({ post }) {



    return (
        <ArticleWrapper>
            <ArticleBody>


                <BlogBreadCrumb slug={post.slug} title={post.title} category={post.labels[0]} />
                <ArticleThumbnail>
                    <Image src={post.image} height={480} width={920} alt={post.title} />
                </ArticleThumbnail>
                <ArticleTitle>
                    <h5>{post.title}</h5>
                </ArticleTitle>
                <MetaData>
                    <Author>
                        <Image src={post.author.profileURL} height={36} width={36} alt={post.author.name} />
                        <div>
                            <span className="authorName">{post.author.name} <GrValidate /></span>
                            <p className="postDetail">
                                <span>
                                    {/* <MdOutlineDateRange />{new Date(post.createdAt).toLocaleDateString()} */}
                                </span>
                                <span>
                                    <AiOutlineFieldTime />{calculateReadTime(JSON.stringify(post?.content)) + " read"}
                                </span>

                            </p>
                        </div>
                    </Author>
                    <div>
                        <span>
                            {post.comments.numberOfComments} <BiCommentDetail />
                        </span>
                    </div>
                </MetaData>
                <TOCMarkDown content={post.content} />
                <div className="ArticleBody">

                    {typeof post?.content === "string" ?
                        <Markdown
                            options={{
                                overrides: {
                                    pre: {
                                        component: CodeBlockMarkdown
                                    },

                                },
                            }}>
                            {post?.content}
                        </Markdown>
                        : null}
                </div>
                <div className="d-flex align-items-center flex-wrap gy-2  mt-2 pt-3" >
                    <Badge className="px-0 py-2" as="strong"><MdOutlineLabel /></Badge>
                    {post.labels.map((label, index) => (
                        <Tag key={index} nature={["success", "theme", "warning", "info", "secondary"][index > 6 ? parseInt(index % 6) + 1 : index]}>{label}</Tag>
                    ))}
                </div>
            </ArticleBody>
            <ShareUI post={post} />
            <Comments post={post} />
            <RelatedPosts postId={post._id} />
        </ArticleWrapper>
    )
}

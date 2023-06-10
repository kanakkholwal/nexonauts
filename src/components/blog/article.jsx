import styled from "styled-components";
import { BlogBreadCrumb } from "components/breadcrumb";
import Badge from "components/topography/badge";
import { calculateReadTime } from "lib/scripts";
import Blocks from 'editorjs-blocks-react-renderer';
import CodeRenderer from './codeRender';

import { GrValidate } from 'react-icons/gr';
import { MdOutlineDateRange, MdOutlineLabel } from 'react-icons/md';
import { AiOutlineFieldTime } from 'react-icons/ai';
import { BiCommentDetail } from 'react-icons/bi';
import Image from "next/image";
import Comments from "./comments";
import RelatedPosts from "./RelatedPosts";
import TOC ,{HeaderRenderer} from "./toc";

const Tag = styled(Badge)`
    font-size:0.75rem;
    padding:0.25rem 0.5rem;
    border-radius: 4px;
`;
const ArticleWrapper = styled.article`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    text-align:center;
    width:100%;
    margin-inline:auto;
    flex:1;
    border-radius: 10px;
    @media (min-width:1000px){
        padding:1rem;
        max-width:calc(var(--max-width) * 0.75);
    }
    .Article{
        text-align:initial;
        width:100%;
        max-width:var(--max-width);
        margin-inline:auto;
        display:block;
    }
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
    flex:1;
    border-radius: 10px;
    background: var(--card-bg);
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1), 0px 2px 1px rgba(0, 0, 0, 0.06),
    0px 1px 1px rgba(0, 0, 0, 0.08);
    @media (min-width:1000px){
        max-width:calc(var(--max-width) * 0.75);
    }
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
                    <Image src={post.image} height={400} width={600} alt={post.title} />
                </ArticleThumbnail>
                <ArticleTitle>
                    <h5>{post.title}</h5>
                </ArticleTitle>
                <MetaData>
                    <Author>
                        <Image src={post.author.profileURL} height={36} width={36} alt={post.author.name} />
                        <div>
                            <span className="authorName">{post.author.user.name} <GrValidate /></span>
                            <p className="postDetail">
                                <span>
                                    <MdOutlineDateRange />{new Date(post.createdAt).toLocaleDateString()}
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
                <TOC blocks={post?.content?.blocks.filter((block) => block.type === "header")} />
                <div className="ArticleBody">
               
                <Blocks data={post?.content} style={{
                        table: {
                            table: {
                                style: {
                                    width: "100%",
                                }
                            },
                            tr: {
                                style: {}
                            },
                            th: { style: {} },
                            td: { style: {} },
                        },
                        code: {
                            className: "language-js"
                        },
                }} 
                renderers={{
                    code: CodeRenderer,
                    header:HeaderRenderer,
                }}


                />
                </div>
                <div className="d-flex align-items-center flex-wrap gy-2  mt-2 pt-3" >
                    <Badge className="px-0 py-2" as="strong"><MdOutlineLabel /></Badge>
                    {post.labels.map((label, index) => (
                        <Tag key={index} nature={["success", "theme", "warning", "info", "secondary"][index > 6 ? parseInt(index % 6) + 1 : index]}>{label}</Tag>
                    ))}
                </div>
                {/* <div>
                <h5>Share Post</h5>
                <div>
                    <Badge>Copy Link</Badge>
                    <Badge nature="info" noBorder>Facebook</Badge>
                    <Badge nature="theme" noBorder>Twitter</Badge>
                    <Badge nature="success" asButton>Whatsapp</Badge>
                    <Badge nature="info" asButton>Telegram</Badge>

                </div>
            </div> */}
            </ArticleBody>
            <Comments post={post} />
            <RelatedPosts postId={post._id} />
        </ArticleWrapper>
    )
}

const style = {
    header: {
        h1: {
            color: 'lightseagreen',
            fontFamily: 'cursive'
        },
    },
    image: {
        img: {},
        figure: {},
        figcaption: {}
    },
    paragraph: {
        textAlign: 'justify',
        margin: '8px 0',
        fontSize: '18px',
        lineHeight: '1.7',
        fontWeight: 200,
    },
    list: {},
    table: {
        table: {},
        tr: {},
        th: {},
        td: {},
    },
    quote: {
        container: {},
        content: {},
        author: {},
        message: {}
    },
    codebox: {
        code: { lineHeight: '22px' },
    },
    warning: {
        icon: {
            width: '28px',
        },
        title: {
            marginRight: '10px'
        },
        message: {
            textAlign: 'left'
        },
    },
    avatar: {
        height: '40px',
        width: '40px',
        borderRadius: '20px',
        margin: '8px',
        boxShadow: '0 0 4px 0 rgba(0,0,0,0.5)',
        backgroundColor: '#1e242a'
    }
};
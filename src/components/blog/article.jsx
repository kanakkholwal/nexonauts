import styled from "styled-components";
import { BlogBreadCrumb } from "components/breadcrumb";
import { calculateReadTime } from "lib/scripts";
import { Interweave } from 'interweave';
import { GrValidate } from 'react-icons/gr';
import { MdOutlineDateRange } from 'react-icons/md';
import { AiOutlineFieldTime } from 'react-icons/ai';
import { BiCommentDetail } from 'react-icons/bi';
import Image from "next/image";
import Comments from "./comments";

const ArticleWrapper = styled.article`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding:1rem;
    text-align:center;
    width:100%;
    margin-inline:auto;
    flex:1;
    background:var(--card-bg);
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
                                <AiOutlineFieldTime />{calculateReadTime(post?.content) + " read"}
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
            <Interweave content={post?.content} tagName="div" className="Article"/>
            <Comments post={post} />
        </ArticleWrapper>
    )
}

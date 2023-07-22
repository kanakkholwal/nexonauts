import styled from "styled-components";
import LazyImage from "components/image";
import Badge from "components/topography/badge";
import Link from "next/link";


const Image = styled(LazyImage).attrs({
    itemProp: "image",
})`
width:100%;
height:auto;
aspect-ratio: 384/240;
border-radius: 16px;
object-fit: cover;

`;

const Heading = styled.h5.attrs({
    itemProp: "headline",
})`
text-transform:capitalize;
text-align:initial;
margin-bottom:0.5rem;
font-size:1.25rem;
a{
color:rgba(var(--text-rgb),0.95);
}
`;
const Description = styled.p.attrs({
    itemProp: "headline",
})`
text-align:initial;
font-size:0.9375rem;

&:first-letter{
    text-transform:capitalize;
}
color:rgba(var(--grey-rgb),0.95);
margin-bottom:1rem;
`;
const PostInfo = styled.div`
display:flex;
flex-direction:row;
align-items:center;
gap:0.5rem;
margin-block:0.75rem 0.25rem;
padding-left:0.5rem;
span{
    color:rgba(var(--blog-theme-rgb),1);
    font-size:0.875rem;
    font-weight:500;
}
`;
const Content = styled.div`
display:flex;
flex-direction:column;
align-items:flex-start;

`;
const Card = styled.article.attrs({
    itemType: "http://schema.org/BlogPosting",
    itemScope: "",

})`
display:flex;
flex-direction:column;
margin-bottom:10px;
padding:0.75rem 1rem;
max-width:480px;
width:100%;
text-align:initial;
background-color:rgba(var(--light-rgb),1);
border-radius:0.5rem;

.labels{
    text-align:left;
    font-size:14px;
}
`;

export function PostCard({ post}) {
    return (
        <Card>
            <Link title={post.title} href={"/blog/posts/" + post.slug}>
                <Image src={post.image} alt={post.title} width={600} height={400} />
            </Link>
            <Content>
            <PostInfo>
                <span>{post.author.name}</span>
                <span>{" • " +new Date(post.publishedAt).toDateString()}</span>
            </PostInfo>
                <Heading title={post.title}>
                <Link title={post.title} href={"/blog/posts/"+post.slug}>
                    {post.title}
                </Link>
                </Heading>
                <Description>
                    {post.description}
                </Description>
                <p className="labels">
                    {
                        post.labels.map((tag,index) => {
                            if(index > 2) return null;
                            
                            return (
                                <Badge key={tag} title={tag} nature={["success","theme","warning","info","blog-theme"][Math.round(5 % Math.floor(Math.random() * 5))]} pill>{tag}</Badge>
                            )
                        })
                    }
                </p>
            </Content>
        </Card>
    )
}
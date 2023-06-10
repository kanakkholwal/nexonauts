import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";

const Card = styled.div`
display:flex;
justify-content:space-between;
align-items:flex-start;
gap:1rem;
margin-inline:0.5rem;
width:100%;
&:not(:last-child){
padding-block:1rem;
    border-bottom:1px solid rgba(var(--grey-rgb),0.1);
    margin-bottom:1rem;
}
.Thumbnail{
    border: 1px solid #E8E8E8;
    border-radius: 8px;
    object-fit: cover;
    width: 80px;
    height: 80px;
}
`;
const Author = styled.div`
display:flex;
justify-content:flex-start;
align-items:center;
gap:0.25rem;
img{
    border-radius:50%;
    width:16px;
    object-fit:cover;
}
.AuthorName{
    font-weight: 500;
font-size: 0.8125rem;
line-height: 1.25rem;
    color:rgba(var(--secondary-rgb),0.85);
}
`;
const Body = styled.div`
display:flex;
justify-content:flex-start;
align-items:flex-start;
flex-direction:column;
h6{
    font-weight: 500;
    font-size: 1rem;
    line-height: 1.5rem;
    a{
        color:var(--text-color);
        &:hover{
            color:rgba(var(--secondary-rgb),1);
        }
    }
}
span{
    font-weight: 400;
font-size: 0.8125rem;
line-height: 1.25rem;
color: #969696;

&.Tag{
    letter-spacing: 0.04em;
text-transform: uppercase;
font-weight: 600;
font-size: 0.625rem;
line-height: 1rem;
    margin-inline-end:0.5rem;
    padding-right:0.5rem;
    border-right:1px solid rgba(var(--grey-rgb),0.2);
}
}
`;

export default function SideBarPostCard({ post }) {

    return (
        <Card>
            <Body>
            <Author>
                <Image src={post.author.profileURL} width={16} height={16} alt={post.author.name} />
                <span className="AuthorName">{post.author.name}</span>
            </Author>
                <div>
                    <h6 title={post.title}> <Link href={"/blog/posts/"+ post.slug}>{post.title}</Link></h6>
                    <div>
                    <span className="Tag">{post.labels[0]}</span>
                        <span>{new Date(post.publishedAt).toLocaleDateString('en-US', {
                            month: 'long', // Full month name (e.g., September)
                            day: 'numeric', // Day of the month (e.g., 29)
                            year: 'numeric', // 4-digit year (e.g., 2021)
                        })}</span>
                    </div>
                </div>
            </Body>
                <Image src={post.image} width={80} height={80} alt={post.title} className="Thumbnail" />
        </Card>
    )
}
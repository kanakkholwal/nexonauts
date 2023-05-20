import styled from "styled-components";
import LazyImage from "components/image";


const Image = styled(LazyImage).attrs({
    itemProp: "image",
})`
max-width:350px;
border-radius:8px;
`;

const Heading = styled.h3.attrs({
    itemProp: "headline",
})`
text-transform:capitalize;
font-size:1.4rem;
`;
const Description = styled.p.attrs({
    itemProp: "headline",
})`
&:first-letter{
    text-transform:capitalize;
}
margin-bottom:1rem;
`;
const Content = styled.div`
display:flex;
flex-direction:column;
align-items:flex-start;
gap:0.5rem;

`;
const Card = styled.article.attrs({
    itemType: "http://schema.org/BlogPosting",
    itemScope: "",

})`
display:flex;
align-items:stretch;
justify-content:center;
margin-bottom:10px;
gap:0.75rem;
padding:0.75rem 0.5rem;
margin-inline:auto;
max-width:728px;
border-radius:0.5rem;
background:var(--card-bg);
box-shadow:rgba(84,32,162,.11) 0px 8px 15px;
`;

export function PostCard({ imageSrc, title, description }) {
    return (
        <Card>
            <Image src={imageSrc} alt={title} width={600} height={400} />
            <Content>
                <Heading title={title}>
                    {title}
                </Heading>
                <Description>
                    {description}
                </Description>
            </Content>
        </Card>
    )
}
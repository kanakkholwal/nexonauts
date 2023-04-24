import styled from "styled-components";
import Button from "components/buttons";
import Link from "next/link";
import { ToolList } from "pages/tools/ToolsList";
import {
    ToolCard,
    CardContainer
} from "components/tools";
const Container = styled.div`
width:100%;
display:flex;
flex-direction:column;
margin-inline: auto;
max-width: var(--max-width);
padding-top:2.25rem;

`

const Header = styled.div`
width:100%;
display:flex;
align-items:center;
justify-content:space-between;
`;
const Title = styled.h3`
font-weight:bold;
`
const Body = styled.div`
width:100%;
padding-top:1.25rem;
gap:0.75rem;
display:flex;
align-items:center;
flex-direction:row;
scroll-snap-type: x mandatory;
overflow-x: auto;
scroll-behavior: smooth;
justify-content: flex-start;

&::-webkit-scrollbar {
    display: none;
}
`;

export default function SimilarTools({category}) {

    return (<Container>
        <Header>
            <Title>More Like this  ...</Title>
            <Button as={Link} href="/tools/">Use Them All</Button>
        </Header>
        <CardContainer>
            {ToolList.filter((tool) => tool.category === category).map((tool, index) => {
                return <ToolCard key={index} {...tool}/>
            })}
        </CardContainer>

    </Container>)
}
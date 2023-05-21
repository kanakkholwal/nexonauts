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
background:var(--card-bg);
padding:0.5rem;
border-radius:0.5rem;
`;
const Title = styled.h5`
font-weight:bold;
`
const Body = styled(CardContainer)`
padding:1rem 0;

`;

export default function SimilarTools({category}) {

    return (<Container>
        <Header>
            <Title>More Like this  ...</Title>
            <Button size="sm" low="true" as={Link} href="/tools/">Use Them All</Button>
        </Header>
        <Body>
            {ToolList.filter((tool) => tool.category === category).map((tool, index) => {
                return <ToolCard key={index} {...tool}/>
            })}
        </Body>

    </Container>)
}
import styled from "styled-components";
import Button from "@/components/Button";
import Link from "next/link";
const Container = styled.div`
width:100%;
display:flex;
flex-direction:column;

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
display:grid;
grid-template-columns: repeat(3,auto);
padding-top:1.25rem;
gap:0.75rem;
`;

export default function SimilarTools() {

    return (<Container>
        <Header>
            <Title>Similar Tools</Title>
            <Button as={Link} href="/tools/">Use Them All</Button>
        </Header>
        <Body>

        </Body>

    </Container>)
}
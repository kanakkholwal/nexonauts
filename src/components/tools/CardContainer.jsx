import styled from "styled-components";

const CardContainer = styled.div`
padding-block: 1.5rem;
margin-inline: auto;
display: grid;
gap: 1rem;

@media (min-width:576px) {
    padding: 1.25rem;
    grid-template-columns: repeat(auto-fill, minmax(480px, 1fr));
}
@media (min-width:768px) {
    padding: 1.5rem;
    grid-template-columns: repeat(2, 5fr);
}
@media (min-width:992px) {
    grid-template-columns: repeat(3, 3.3fr);
}

@media (min-width: 1400px) {
    grid-template-columns: repeat(4, 2.5fr);
}

`;

export default CardContainer;
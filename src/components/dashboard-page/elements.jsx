import styled from 'styled-components';

export const Header = styled.div`
padding: 1rem;
border-radius: 0.625rem;
background: #fff;
display: flex;
align-items: center;
width:${({width}) => width ? width : 'auto'};
justify-content: ${({align}) => align ? align : 'space-between'};
gap:0.75rem;
margin-bottom: 1rem;
font-size:100%;
svg{
    margin-inline:0.5rem;
}
`;

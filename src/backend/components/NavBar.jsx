import styled from 'styled-components';

const NavBarWrapper = styled.div`
background-color: rgb(244 247 254 / 20%);
position: fixed;
top: 0;
left: 0;
right: 0;
z-index: 999;
filter: none;
backdrop-filter: blur(20px);
border-radius: 16px;
border-width: 1.5px;
border-style: solid;
border-color: rgb(255 255 255 / 10%);
display: flex;
min-height: 75px;
margin-inline: auto;
margin-top: 0px;
padding-bottom: 8px;
right: 12px;
padding-top: 8px;
top: 12px;
width: calc(100vw - 6%);
align-items: center;
justify-content: ${({ align }) => align ? align : 'space-between'};
`;



export default function NavBar() {


    return (
        <NavBarWrapper>

        </NavBarWrapper>
    )
}
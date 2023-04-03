import styled from "styled-components";
import Button from "components/buttons";

export const NavBarWrapper = styled.div`
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
    max-width: var(--max-width);
    margin-inline: auto;
    margin-top: 0px;
    padding-bottom: 8px;
    right: 12px;
    padding-top: 8px;
    padding-inline: 15px 12px;
    top: 12px;
    width: calc(100vw - 6%);
    align-items: center;
    justify-content: ${({ align }) => align ? align : 'space-between'};
    font-size: 16px;
    box-shadow: 1px 1px 3rem 3px #6658d31c;
    a>img{
        margin-top:-12px;
    }
`;

export const MenuList = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
    gap: 1.5rem;
    list-style: none;
    margin: 0;
    padding: 0;
    width: 100%;
    max-width: 380px;
        a {
            color: rgba(var(--text-color), 0.5);
            font-size: 1.7rem;
            font-weight: 600;
            text-decoration: none;
            transition: all 0.3s ease;
            &:hover {
                color: rgba(var(--text-color), 0.8);
            }
        }
@media (max-width: 920px) {
    position: fixed;
    inset:-16px;
    right: auto;
    width: 25rem;
    max-width:calc(100% - 60px);
    height: calc(100vh + 60px);
    background-color: rgba(0,0,0,0.8);
    z-index: 999;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1.5rem;
    transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(-100%)'};
    transition: transform 0.3s ease-in-out;
    
}
`;
export const AuthButtonWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    list-style: none;
    margin: 0;
    padding: 0;
    `;
export const NavToggle = styled(Button)`
height: 40px;
padding: 0.75rem;
display: flex;
align-items: center;
justify-content: center;
border: none;
color: rgba(var(--text-rgb), 0.5);
cursor: pointer;
svg{
    width: 24px;
    height: 24px;
}
@media (min-width: 920px) {
    display: none;
}
`;

export const Logo = styled.div`
    font-size: 1.7rem;
    font-weight: 600;
    color: rgba(var(--text-color), 0.5);
    transition: all 0.3s ease;
    letter-spacing: 1px;
    &:hover {
        color: rgba(var(--text-color), 0.8);
    }
`;

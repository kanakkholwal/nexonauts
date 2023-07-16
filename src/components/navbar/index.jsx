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
    box-shadow:  0px 0px 9rem 0px #6658d31c;
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
            font-size: 1rem;
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
    .signup{
        @media (width <= 540px) {
            display: none;
        }
    }
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
    font-size: 1rem;
    color: rgba(var(--text-color), 0.5);
    transition: all 0.3s ease;
    letter-spacing: 1px;
    &:hover {
        color: rgba(var(--text-color), 0.8);
    }
`;

export const ProfileWrapper = styled.div`
position: relative;
margin-inline:0.75rem;
`;
export const Profile = styled.div`
display: flex;
align-items: center;
justify-content: center;
border-radius: 50%;
width: 40px;
height: 40px;
border: 1px solid rgba(var(--text-rgb), 0.1);
img{
    border-radius: 50%;
    width: 100%;
    height: 100%;
}`;
export const ProfileDropDown = styled.div`
position: absolute;
top: calc(100% + 2rem);
right: 0;
min-width: 200px;
width: fit-content;
box-shadow: 0px 4px 6px -2px rgba(16, 24, 40, 0.03),
 0px 12px 16px -4px rgba(16, 24, 40, 0.08);
 order-radius: 0.5rem;
border: 1px solid rgba(var(--grey-rgb,#EAECF0), 0.1);
background: var(--light, #FFF);

z-index: 999;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
gap: 0.2rem;
padding: 0.25rem 0.375rem;
transform-origin: top right;
transform: ${({ open }) => open ? 'scale(1)' : 'scale(0)'};
opacity: ${({ open }) => open ? '1' : '0'};
visibility: ${({ open }) => open ? 'visible' : 'hidden'};
${'' /* width: ${({ width }) => width ? width : '15rem'}; */}
border-radius: 0.5rem;
transition: all 0.3s ease-in-out;
`;
export const ProfileDropDownInfo = styled.div`
text-decoration: none;
transition: all 0.3s ease;
width: 100%;
&:not(:last-child){
    border-bottom: 1px solid rgba(var(--grey-rgb,#EAECF0), 0.1);
}

display: flex;
padding: 0.75rem;
align-items: flex-start;
gap:0.75rem;
.Avatar{
    border-radius: 12.5rem;
    width: 2.5rem;
    height: 2.5rem;
    img{
        border-radius:inherit;
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
    }
    overflow: hidden;
}
.Info{
    display: flex;
flex-direction: column;
align-items: flex-start;
flex: 1 0 0;
align-self: stretch;
    h6{
        font-size: 0.875rem;
font-weight: 600;
line-height: 1.25rem; 
align-self: stretch;
        color:rgba(var(--grey-rgb,#344054), 1)
    }
    p{
        font-size: 0.875rem;
font-weight: 500;
line-height: 1.25rem;
color:rgba(var(--grey-rgb,#344054), 0.75)

    }
}
`;
export const ProfileDropDownItem = styled.a`
font-size: 0.875rem;
font-style: normal;
font-weight: 500;
line-height: 1.25rem;
text-decoration: none;
transition: all 0.3s ease;
width: 100%;
border-radius: 5px;
color: rgba(var(--text-rgb,#344054), 0.9);
display: flex;
padding: 0.5625rem 0.625rem;
align-items: center;
gap: 0.75rem;
flex: 1 0 0;
align-self: stretch;
&:hover {
    color: rgba(var(--text-rgb,#344054), 0.8);
    background:rgba(var(--text-rgb,#344054), 0.05);
}
`;
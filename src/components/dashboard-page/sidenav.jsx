import styled from 'styled-components';
import { signOut } from 'next-auth/react';
import Button from 'components/buttons';
import NavLink from 'components/navLink';
import { GrClose } from "react-icons/gr";
import { MdLogout } from "react-icons/md";
import { useRef } from "react";

const SideNavWrapper = styled.div`
position: fixed;
inset-block: 0;
left:0;
width: var(--sidenav-width);
height: 100%;
display: flex;
flex-direction: column;
background-color: rgb(244 247 254 / 20%);
backdrop-filter: blur(20px);
box-shadow: 0px 0px 9rem 0px #6658d31c;
padding: 1.25rem;
font-weight: 600;
font-size: 1rem;
transition: all 0.3s ease-in-out;
transform: translateX(-100%);
z-index: 1000;
&.isOpen{
    transform: translateX(0);
}

@media (min-width: 1024px) {
    &.isOpen ~ .isSidenavOpen{
        padding-left:var(--sidenav-width);
    }
}


`;
const CloseButton = styled.button`
position: absolute;
left: 15px;
top: 15px;
cursor: pointer;
border-radius: 50%;
height: 1.5rem;
width: 1.5rem;
display: flex;
align-items: center;
justify-content: center;
border: none;
background-color: transparent;
transition: all 0.3s ease-in-out;
&:hover{
    background-color: rgba(0, 0, 0, 0.1);
}
@media (min-width: 1024px) {
    display: none;
}
`;

const SideNavHeader = styled.div`
padding: 1rem 0.5rem;
text-align: center;
border-bottom: 1px solid rgba(0, 0, 0, 0.1);
margin-bottom: 1rem;
@media (max-width: 1024px) {
    margin-top:1.5rem;
}
`;
const SectionTitle = styled.h5`
padding: 0.5rem 0;
`;

const LinkList = styled.div`
display:flex;
flex-direction:column;
align-items:center;
`;
const Icon = styled.span`
border-radius:inherit;
display:flex;
align-items:center;
justify-content:center;
margin-right:0.5rem;
aspect-ratio:1;
padding: 0.75rem;
border-radius: 2rem;
transition: all 0.3s ease-in-out;
color: rgba(var(--text-rgb), 0.8);
background: rgba(var(--theme-rgb), 0.1);

`;
const Title = styled.span`
font-size: 1rem;
font-weight: 600;
`;
const Link = styled.a`
display:flex;
gap:0.625rem;
padding:2px;
align-items:center;
justify-content:flex-start;
width:100%;
transition: all 0.3s ease-in-out;
border-radius: 2rem;
margin-bottom:0.25rem;
color: rgba(var(--text-rgb), 0.8);
background: rgba(var(--theme-rgb), 0.08);

&:hover,&.active{

    &>${Icon}{
        ${'' /* color: rgba(var(--theme-rgb), 0.8); */}
        background: rgba(var(--theme-rgb), 0.2);
        scale:1.1;
    }
    ${'' /* color: rgba(var(--theme-rgb), 0.8); */}
    background: rgba(var(--theme-rgb), 0.1);
}
`;
const LogoutButton = styled.button`
margin-top:auto;
width:100%;
font-size:1rem;
text-align:center;
`;


const RecursiveLinkList = ({ routes }) => {
    return (
        <LinkList>
            {routes?.map((item, index) => (<Link as={NavLink} key={index} href={item.path}>
                {item?.icon ? <Icon>{item?.icon}</Icon>:null}<Title>{item.title}</Title>{item.children?.length > 0 ? <RecursiveLinkList routes={item.children} /> : null}
            </Link>))}
        </LinkList>)
}

export default function SideNav({ routes, user }) {


    const sidenavRef = useRef(null);

    return (
        <SideNavWrapper id="sidenav_panel" ref={sidenavRef} className='isOpen'>
            <CloseButton onClick={() => sidenavRef.current.classList.toggle('isOpen')}><GrClose /></CloseButton>
            <SideNavHeader>
                <SectionTitle>
                    K K UPGRADER
                </SectionTitle>
            </SideNavHeader>
            {routes?.length > 0 ? <RecursiveLinkList routes={routes} /> : null}
            {user ? <LogoutButton as={Button} level="true" onClick={() => signOut()}>Sign Out <MdLogout /> </LogoutButton> : null}
        </SideNavWrapper>
    )
}

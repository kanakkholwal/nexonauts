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
left: 5px;
top: 5px;
cursor: pointer;
border-radius: 50%;
height: 2.5rem;
width: 2.5rem;
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
`;
const SectionTitle = styled.h3`
padding: 0.5rem 0;
`;

const LinkList = styled.div`
display:flex;
flex-direction:column;
align-items:center;
`;
const Link = styled.a`
display:flex;
gap:0.5rem;
font-weight: 600;
align-items:center;
justify-content:flex-start;
width:100%;
transition: all 0.3s ease-in-out;
padding: 0.75rem 1.5rem;
border-radius: 2rem;
margin-bottom:0.25rem;

&:hover,&.active{
    background-color: rgba(var(--theme-rgb), 0.2);
}
`;
const LogoutButton = styled.button`
margin-top:auto;
width:100%;
font-size:1.2rem;
text-align:center;
`;


const RecursiveLinkList = ({ links }) => {

    return (<LinkList>{links?.map((item, index) => (<Link as={NavLink} key={index} href={item.path}>{item?.icon}{item.title}{item.children?.length > 0 ? <RecursiveLinkList links={item.children} /> : null}</Link>))}</LinkList>)
}

export default function SideNav({ links, session }) {


    const sidenavRef = useRef(null);

    return (
        <SideNavWrapper id="sidenav_panel" ref={sidenavRef} className='isOpen'>
            <CloseButton onClick={() => sidenavRef.current.classList.toggle('isOpen')}><GrClose /></CloseButton>
            <SideNavHeader>
                <SectionTitle>
                    K K UPGRADER
                </SectionTitle>
            </SideNavHeader>
            {links?.length > 0 ? <RecursiveLinkList links={links} /> : null}
            {session ? <LogoutButton as={Button} level="true" onClick={() => signOut()}>Sign Out <MdLogout /> </LogoutButton> : null}
        </SideNavWrapper>
    )
}

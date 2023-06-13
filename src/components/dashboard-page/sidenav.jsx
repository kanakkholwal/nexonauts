import styled from 'styled-components';
import { signOut } from 'next-auth/react';
import NavLink from 'components/navLink';
import Collapse from 'components/collapse';
import { GrClose } from "react-icons/gr";
import { MdLogout } from "react-icons/md";
import { HiOutlineChevronDown } from "react-icons/hi";
import { VscCircle } from "react-icons/vsc";
import { useRef ,useState} from "react";

const SideNavWrapper = styled.div`
position: fixed;
inset-block: 0;
left:0;
width: var(--sidenav-width);
height: 100%;
display: flex;
flex-direction: column;
background-color: rgb(255 255 255 / 80%);
backdrop-filter: blur(20px);
box-shadow: 0px 0px 9rem 0px #6658d31c;
padding: 1.25rem;
font-weight: 500;
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
`;
const SectionTitle = styled.h5`
padding: 0.5rem 0;
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
const DropdownIcon = styled(Icon)`
margin-left:auto;
margin-right:0.25rem;

`;
const Title = styled.span`
font-size: 1rem;
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
    &>${DropdownIcon}{
        ${'' /* color: rgba(var(--theme-rgb), 0.8); */}
        background: rgba(var(--theme-rgb), 0.2);
        scale:1;
    }
    ${'' /* color: rgba(var(--theme-rgb), 0.8); */}
    background: rgba(var(--theme-rgb), 0.1);
}

`;
const LogoutButton = styled(Link)`
margin-top:auto;
`;
const LinkList = styled.div`
display:flex;
flex-direction:column;
align-items:stretch;
&  &{
    margin-block:0 0.75rem;
    padding-left:0.75rem;
    ${Link}{
        gap:0.25rem;
        background:none;
        box-sizing: border-box;
       text-align: left;
    transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    padding: 4px 8px 4px 12px;
    border-radius: 8px;
    min-height: 36px;
    color: rgb(99, 115, 129);
        ${Title}{
            line-height: 1.57143;
             font-size: 0.875rem;
             font-weight: 500;
        }
        ${Icon}{
            background:none;
            padding:0.5rem;
            font-size: 0.875rem;
            margin:0;
        }
        &:hover,&.active{
            ${Icon}{
                scale:1;
            }
            text-decoration: none;
    background-color: rgba(145, 158, 171, 0.08);
        }
        
    }
}
`;

const RecursiveLinkList = ({ routes,nested = false }) => {
    const [open, setOpen] = useState(false);
    return (
        <LinkList>
            {routes?.map((item, index) => (
                <div key={index}>
                <Link as={NavLink}  href={item.path}>
                {item?.icon ? <Icon>{nested === false ? item?.icon :<VscCircle/>}</Icon>:null}<Title>{item.title}</Title>
                {item.children?.length > 0 ? <DropdownIcon onClick={(e) =>{
                    e.preventDefault();
                    e.stopPropagation();
                    setOpen(!open);
                }} style={{
                    transform: open ? 'rotate(-180deg)' : 'rotate(0deg)'
                }}> <HiOutlineChevronDown/></DropdownIcon> : null}
            </Link>
                {item.children?.length > 0 ? <Collapse visible={open}><RecursiveLinkList routes={item.children} nested={true}/></Collapse>  : null}
            </div>))
            }
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
            {user ? <LogoutButton as={"button"}  onClick={() => signOut()}>
            <Icon><MdLogout /></Icon>
            <Title> Sign Out </Title>
               
            </LogoutButton> : null}
                    </SideNavWrapper>
    )
}

import styled from 'styled-components';
import { signOut } from 'next-auth/react';
import NavLink from 'components/navLink';
import Collapse from 'components/collapse';
import { GrClose } from "react-icons/gr";
import { MdLogout } from "react-icons/md";
import { HiOutlineChevronDown } from "react-icons/hi";
import { VscCircle } from "react-icons/vsc";
import { BiChevronRight } from "react-icons/bi";
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
z-index: 1000;
& ~ .isSidenavOpen{
     padding-left:var(--sidenav-width);
}


@media (max-width: 1024px) {
    transform: translateX(0);
    
    transform: translateX(-100%);
    &.isOpen{
        transform: translateX(0);
    }
    & ~ .isSidenavOpen{
     padding-left:0;
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
aspect-ratio:1;
transition: all 0.3s ease-in-out;
color:inherit;
font:inherit;
padding:0.625rem 0.75rem;

`;
const DropdownIcon = styled(Icon)`
margin-left:auto;
margin-right:0.25rem;

`;
const Title = styled.span`
padding:0.625rem 0.75rem;

`;
const Link = styled.a`
display:flex;
align-items:center;
justify-content:flex-start;
width:100%;
height:40px;
transition: all 0.3s ease-in-out;
border-radius: 0.5rem;
font-weight: 500;
font-size: 0.875rem;
margin-bottom:0.25rem;
color: rgba(var(--text-rgb), 0.75);
background: rgba(var(--grey-rgb), 0);

&:hover,&.active{
    color: rgba(var(--text-rgb),1);
    background: rgba(var(--grey-rgb), 0.08);
}

`;
const LogoutButton = styled(Link)`
margin-top:auto;
--text-rgb:var(--danger-rgb);
&:hover,&.active{
    --text-rgb:var(--danger-rgb);
}
`;
const LinkList = styled.div`
display:flex;
flex-direction:column;
align-items:stretch;
&  &{
    margin-block:0 0.75rem;
    padding-left:0.75rem;
    ${Link}{
        isolation: isolate;
        font-size: 0.75rem; 
        font-weight: 500;      
        height:32px; 
        ${Icon}{
            padding:0.5rem;
            font-size: 0.75rem;
            svg{
                font-size: 1rem;
            }
        }
        ${Title}{
            padding:0.5rem;
            font-size: 0.75rem;
        }
    }
}
`;

const RecursiveLinkList = ({ routes,nested = false }) => {
    const [openIndex, setOpenIndex] = useState(-1);
    return (
        <LinkList>
            {routes?.map((item, index) => (
                <div key={index}>
                <Link as={NavLink}  href={item.path} className={openIndex === index ? 'active':''}>
                {item?.icon ? <Icon>{nested === false ? item?.icon :<BiChevronRight/>}</Icon>:null}<Title>{item.title}</Title>
                {item.children?.length > 0 ? <DropdownIcon onClick={(e) =>{
                    e.preventDefault();
                    e.stopPropagation();
                    
                    (openIndex === index) ? setOpenIndex(-1):setOpenIndex(index);
                }} style={{
                    transform: openIndex === index  ? 'rotate(-180deg)' : 'rotate(0deg)'
                }}> <HiOutlineChevronDown/></DropdownIcon> : null}
            </Link>
                {item.children?.length > 0 ? <Collapse visible={openIndex === index }><RecursiveLinkList routes={item.children} nested={true}/></Collapse>  : null}
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

import styled from 'styled-components';
import { signOut } from 'next-auth/react';
import NavLink from 'components/navLink';
import Collapse from 'components/collapse';
import { GrClose } from "react-icons/gr";
import { MdLogout } from "react-icons/md";
import { HiOutlineChevronDown } from "react-icons/hi";
import { TbSwitchHorizontal } from "react-icons/tb";
import { BiChevronRight } from "react-icons/bi";
import { useRef ,useState} from "react";
import Logo from 'components/Logo';
import Image from 'next/image';

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
padding: 1.25rem;
font-weight: 500;
font-size: 1rem;
transition: all 0.3s ease-in-out;
z-index: 1000;
& ~ .isSidenavOpen{
     padding-left:var(--sidenav-width);
}


@media (width <= 1400px) {     
    box-shadow: 0px 0px 1rem 0px #6658d31c;
    transform: translateX(-100%);
    &.isOpen{
        transform: translateX(0);
    }
    & ~ .isSidenavOpen{
     padding-left:0;
    }
}
@media (width >=1400px) {
    box-shadow: none;
    border-right: 1px solid rgba(var(--text-rgb),0.1);
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
@media (min-width: 1400px) {
    display: none;
}
`;

const SideNavHeader = styled.div`
padding:0.5rem;
text-align: center;
border-bottom: 1px solid rgba(0, 0, 0, 0.1);
margin-bottom: 1rem;
`;
const Profile = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: space-around;
  width: 100%;
  padding: 0.25rem;
  align-items: center;
  font-weight: 500;
  font-size: 1rem;
  flex-shrink: 0;
  border: none;
  color:inherit;
  gap:0.125rem;
  border-radius: 0.75rem;
  background: var(--card-bg);
  border: 1px solid rgba(var(--grey-rgb), 0.2);
  transition: all 0.3s ease-in-out;
  margin-bottom:10px;
  .Avatar{
        aspect-ratio:1;
        border-radius:50%;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left:0.5rem;
        img{
            width: 100%;
            height: 100%;
            max-width: 32px;
            max-height: 32px;
        }
  }
  .Details{
        text-align:left;
        padding:0.125rem;
        margin-inline:0.5rem auto;
        .Name{
            font-size: 1rem;
            line-height: 1rem;
            font-weight: 600;
            color: rgba(var(--text-rgb), 1);
        }
        .Email{
            font-size: 0.875rem;
            font-weight: 500;
            color: rgba(var(--text-rgb), 0.8);
        }
  }
  .Actions{
        ${'' /* margin-left:auto; */}
        display:flex;
        align-items:center;
        gap:0.5rem;
        justify-content:center;
        a{
            border-radius:50%;
            aspect-ratio:1;
            display:flex;
            align-items:center;
            justify-content:center;
            border: none;
            margin:auto;
            font-size: 1rem;
        }
  }
  
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
color: rgba(var(--text-rgb), 0.8);
background: rgba(var(--grey-rgb), 0);
    transition: all 0.3s ease-in-out;

&:hover{
    color: rgba(var(--text-rgb),1);
    background: rgba(var(--grey-rgb), 0.08);
}
&.active{
    color: rgba(var(--theme-rgb),1);
    background: rgba(var(--theme-rgb), 0.08);
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
                    <Link as={NavLink} href={item.path} className={openIndex === index ? 'active' : ''}>
                        <Icon>
                            {item?.icon ? item.icon:nested === true ? <BiChevronRight /> : null}
                        </Icon><Title>{item.title}</Title>
                        {item.children?.length > 0 ? <DropdownIcon onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();

                            (openIndex === index) ? setOpenIndex(-1) : setOpenIndex(index);
                        }} style={{
                            transform: openIndex === index ? 'rotate(-180deg)' : 'rotate(0deg)'
                        }}> <HiOutlineChevronDown /></DropdownIcon> : null}
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
                {/* <SectionTitle>
                    K K UPGRADER
                </SectionTitle> */}
                <Logo />    
            </SideNavHeader>
            <Profile>
                <div className='Avatar'>
                    <Image src={user?.profileURL} alt={user?.name} 
                    width={40} height={40}  />
                </div>
                <div className='Details'>
                    <p className='Name'>{user?.name}</p>
                    <p className='Email'>@{user?.username}</p>
                </div>
                <div className='Actions'>
                {user?.role === 'admin' ? <Link href='/dashboard/admin' title='Switch to Admin Panel'><TbSwitchHorizontal/></Link> : null}
                </div>
            </Profile>
            {routes?.length > 0 ? <RecursiveLinkList routes={routes.filter(route =>{
                if(route?.sessionRequired === true){
                    return user ? true : false;
                }
                return true;
            })} /> : null}
            {user ? <LogoutButton as={"button"}  onClick={() => signOut()}>
            <Icon><MdLogout /></Icon>
            <Title> Sign Out </Title>
               
            </LogoutButton> : null}
        </SideNavWrapper>
    )
}

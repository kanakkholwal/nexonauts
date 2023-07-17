import { NavBarWrapper as Wrapper, ProfileDropDownInfo, ProfileWrapper, Profile, ProfileDropDown, ProfileDropDownItem ,AuthButtonWrapper} from "components/navbar";
import styled from "styled-components";
import Link from "next/link";
import { signOut } from 'next-auth/react';
import Button from "components/buttons";
// import Badge from "components/topography/badge";
import { useState, useEffect, useRef } from "react";
import { IoSettingsOutline } from "react-icons/io5";
import { TbTools, TbLayoutSidebarRightCollapse, TbLayoutSidebarRightExpand ,TbCrown} from "react-icons/tb";
import { FaRegUser } from "react-icons/fa";
import { CgSearch, CgClose } from "react-icons/cg";
import {  MdLogout } from "react-icons/md";
import {useRouter} from "next/router";
import Image from "next/image";

export const NavBarWrapper = styled(Wrapper)`
max-width: 100%;
width: 100%;
position: sticky;
top: 0;
inset-inline: 0;  
border-radius: 0;
@media (width <= 1400px) {
    box-shadow:  0px 0px 9rem 0px #6658d31c;
}
@media (width >=1400px) {
    box-shadow: none;
    border-bottom: 1px solid rgba(var(--text-rgb),0.1);
    background:#fbfbfb;
}
`;
const Children = styled.div`
    margin-inline: 0.5rem auto;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    width: auto;
    span{
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
`;

const Toggler = styled(Button)`
padding: 0;
margin-inline-end: 0.75rem;
border-radius: 0.5rem;
aspect-ratio: 1;
height: 40px;
font-size:1.25rem;
@media (width >= 1400px) {
    display:none;
}
`;
const SearchToggler = styled(Button)`
padding: 0;
margin-inline-end: 0.75rem;
border-radius: 0.5rem;
aspect-ratio: 1;
height: 40px;
font-size:1.25rem;
`;
const NoSearchResult = styled.div`
width:100%;
display:flex;
align-items:center;
justify-content:center;
flex-direction:column;
margin:3rem auto;
text-align:center;
h6{
    font-size:1.25rem;
    font-weight:600;
    color:rgba(var(--text-rgb),1);
    margin-bottom:0.75rem;

}
p{
    font-size:1rem;
    font-weight:500;
    color:rgba(var(--text-rgb),0.6);
    strong{
        color:rgba(var(--text-rgb),1);
    }
}
`;
const SearchResultItem = styled(Link)`
width:100%;
display:flex;
align-items:flex-start;
flex-direction:column;
gap:0.5rem;
border:1px dashed transparent;
border-radius:0.5rem;
padding:0.5rem;
h6{
    font-size:0.875rem;
    font-weight:600;
    color:rgba(var(--text-rgb),0.8);
}
p{
    font-size:0.75rem;
    font-weight:500;
    color:rgba(var(--text-rgb),0.5);
}
&:hover{
    background-color:rgba(var(--theme-rgb),0.1);
    cursor:pointer;
    border-color:rgba(var(--theme-rgb),0.9);
}

`;
const SearchDropDown = styled.div`
position: absolute;
top: calc(100% + 1rem);
inset-inline: 0;
margin-inline: auto;
min-width: 200px;
width: 100%;
max-width: calc(100% - 10px);
min-height:80px;
background-color: rgb(255 255 255 / 90%);
border-radius: 0.5rem;
max-height: 500px;
overflow-y: auto;
backdrop-filter: blur(20px);
box-shadow:rgba(145, 158, 171, 0.24) 0px 0px 2px 0px, rgba(145, 158, 171, 0.24) -20px 20px 40px -4px;
padding: 0.75rem 0.5rem;
transform-origin: center top;
transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
transform: ${({ open }) => open ? 'scaleY(1)' : 'scaleY(0)'};
opacity: ${({ open }) => open ? '1' : '0'};
visibility: ${({ open }) => open ? 'visible' : 'hidden'};
`;
const SearchDropDownList = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
gap: 0.5rem;
`;
const SearchInput = styled.input`
border:none;
outline:none;
background-color:transparent;
color:rgba(var(--text-rgb),0.8);
font-size:1rem;
font-weight:500;
border-right:1px solid var(--border-color);

&::placeholder{
    color:rgba(var(--text-rgb),0.5);
    font-size:1rem;
    font-family:inherit;
}
    `;

const SearchWrapper = styled.div`
display:flex;
align-items:center;
justify-content:space-between;
width:100%;
gap:0.75rem;
padding:0.75rem;
border-radius:inherit;
position:absolute;
inset:0;
background:var(--card-bg);
z-index:15;
transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);
${({open}) =>{
    if(open){
        return `
        transform:translateY(0);
        opacity:1;
        `
    }else{
        return `
        transform:translateY(-100%);
        opacity:0;
        `
    }
}}
&>svg{
    cursor:pointer;
    color:rgba(var(--text-rgb),0.8);
    transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);
    border-radius:50%;
    font-size:1.5rem;
    &:hover{
        color:rgba(var(--text-rgb),1);
    }
}
`;
const Logo = styled.div`
font-size: 1rem;
color: rgba(var(--text-color), 0.5);
transition: all 0.3s ease;
letter-spacing: 1px;
font-weight: 600;
&:hover {
    color: rgba(var(--text-color), 0.8);
}
`;
export default function Header({ user, routes, children }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchPath, setSearchPath] = useState("");
    const [searchResults, setSearchResults] = useState(false);
    const [open, setOpen] = useState(false);
    let NavRef = useRef(null);
    const router = useRouter();

   
    useEffect(() => {
        let sidenavPanel = document.body.querySelector("#sidenav_panel");
        let MainPanel = document.body.querySelector("#main_wrapper");

        if (!sidenavPanel.classList.contains('isOpen')) {
            sidenavPanel.classList.add('isOpen');
            MainPanel.classList.add('isSidenavOpen')
        }
        else {
            sidenavPanel.classList.remove('isOpen');
            MainPanel.classList.remove('isSidenavOpen')
        }

    }, [isSidebarOpen]);
 useEffect(() => {
    
        const HandleOutSide = (e) =>{
            if (e.target.id === "sidenav_panel" || e.target.id === "main_wrapper") {
                setIsSidebarOpen(false);
            }
            if (NavRef.current && !NavRef.current.contains(e.target)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", HandleOutSide)

        return () => {
            document.removeEventListener("mousedown", HandleOutSide)
        }
    }, []);



    return (
        <>
            <NavBarWrapper ref={NavRef}>
                <Toggler level="true"
                    rounded
                    onClick={() => setIsSidebarOpen((state) => !state)}>
                    {isSidebarOpen ? <TbLayoutSidebarRightExpand /> : <TbLayoutSidebarRightCollapse />}
                </Toggler>
                <Children>
                    {children ? children : <Logo>K K UPGRADER</Logo>}
                </Children>
                {routes && routes.length > 0 ? <SearchWrapper open={isSearchOpen}>
                    <CgSearch />
                    <SearchInput type="text" placeholder="Search" value={searchPath} onChange={(e) => setSearchPath(e.target.value)} onClick={() => setSearchResults(true)} />
                    <CgClose onClick={() => {
                        setIsSearchOpen(false);
                        setSearchResults(false);
                    }} />
                    {
                        searchResults ?
                            <SearchDropDown open={searchResults}>
                                <SearchDropDownList>

                                    {
                                        routes?.filter((route) => route.path.toLowerCase().includes(searchPath.toLowerCase())).length > 0 ?

                                            routes?.filter((route) => route.path.toLowerCase().includes(searchPath.toLowerCase())).map((route) => (
                                                <SearchResultItem href={route.path} key={route.path}>
                                                    <h6>{route.title}</h6>
                                                    <p>{route.path}</p>
                                                </SearchResultItem>
                                            )) : <NoSearchResult>
                                                <h6>Not Found </h6>
                                                <p>No results found for <strong>{`"${searchPath}"`}</strong>.</p>
                                                <p>Try Checking for Typos or use complete words.</p>

                                            </NoSearchResult>}
                                </SearchDropDownList>

                            </SearchDropDown> : null
                    }
                </SearchWrapper> : null}
 

                <SearchToggler level="true" low="true"
                    rounded onClick={() => setIsSearchOpen((state) => !state)}>
                    <CgSearch />
                </SearchToggler>
                {user ? <ProfileWrapper>
                    <Profile onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setOpen(!open)
                    }} role="button" tabIndex="0">
                        <Image src={user.profileURL ? user.profileURL : "https://res.cloudinary.com/kanakkholwal-portfolio/image/upload/v1680632194/kkupgrader/placeholder_rwezi6.png"} height={40} width={40} alt={user?.name ?? "User Profile"} />
                    </Profile>
                    <ProfileDropDown open={open} >
                        <ProfileDropDownInfo>
                            <div className="Avatar">
                                <Image src={user.profileURL ? user.profileURL : "https://res.cloudinary.com/kanakkholwal-portfolio/image/upload/v1680632194/kkupgrader/placeholder_rwezi6.png"} height={40} width={40} alt={user?.name ?? "User Profile"} />
                            </div>
                            <div className="Info">
                                <h6>
                                    {user?.name ?? "User Name"}
                                </h6>
                                <p>
                                    @{user.username ?? "User name"}
                                </p>

                            </div>
                        </ProfileDropDownInfo>
                        <ProfileDropDownItem as={Link} href={"/dashboard/profile"}>
                            <FaRegUser size={14}/>
                            Your Profile
                        </ProfileDropDownItem>
                        {/* <ProfileDropDownItem as={Link} href={"/dashboard/profile"}>
                            <FaRegUser size={14}/>
                            Edit Profile
                        </ProfileDropDownItem> */}
                        <ProfileDropDownItem as={Link} href="/dashboard/settings">
                            <IoSettingsOutline  size={14}/>
                            Settings
                        </ProfileDropDownItem>
                        <ProfileDropDownItem as={Link} href="/pricing">
                            <TbCrown    size={16}/>
                            Upgrade Account</ProfileDropDownItem>
                        <ProfileDropDownItem as={"button"} onClick={(e) => {
                            e.preventDefault();
                            signOut();
                        }}>
                            <MdLogout />
                            Log Out
                        </ProfileDropDownItem>
                    </ProfileDropDown>
                </ProfileWrapper> : <AuthButtonWrapper>
                            <Button level="true" as={Link} href={"/login?continue="+ router.asPath}>Log In</Button>
                            <Button as={Link} className="signup" href="/signup">Sign Up</Button>
                        </AuthButtonWrapper>}
            </NavBarWrapper>

        </>
    )
}

import Link from "next/link";
import styled from "styled-components";
import { CgMenu, CgSearch, CgClose } from "react-icons/cg";
import { useState } from "react";
import { ProfileDropDownInfo, ProfileWrapper, Profile, ProfileDropDown, ProfileDropDownItem } from "components/navbar";

const Wrapper = styled.div`
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  box-sizing: border-box;
  margin-inline:auto;
  padding-block:1rem;
background:rgba(var(--light-rgb),0.8);
backdrop-filter:blur(10px);

  `;



const NavLogo = styled(Link)`
display:inline-flex;
align-items:center;
justify-content:flex-start;
margin-inline-start:0.5rem;
font-size: 1.5rem;
font-weight: 700;
line-height: 1.7;
letter-spacing:1px;
min-width: 8.875rem;
color:rgba(var(--text-color),1);
text-decoration:none;
`;
const NavItem = styled.li`
  display: inline-block;
  text-align: center;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  `;

const NavLink = styled(Link)`
  display: inline-block;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  font-weight: 500;
  text-align: center;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  text-decoration: none;
  color:rgba(var(--grey-rgb),1);
        &:hover{
        color:rgba(var(--text-color),0.8);
        }  
`;
const NavMenu = styled.ul`
  display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 0.625rem;
margin-inline:1.75rem 0.75rem;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  @media (max-width: 992px){
    flex-direction:column;
    position:absolute;
    top:calc(100% + 1.75em);
    right:0;
    background:#fbfbfb;
    border-radius:0.5rem;
    padding:0.75rem;
    box-shadow:rgba(84,32,162,.11) 0px 8px 15px;
    transition:all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    overflow:hidden;
    max-width:300px;
    ${NavLink},${NavItem}{
        width:100%;
    }
    ${NavLink}{
        border-radius:5px;
     &:hover{
        background:rgba(var(--theme-rgb),0.1);

     }   
    }
    ${({ active }) => {
        if (active) {
            return `
            translate:0 0;
            `
        } else {
            return `
            translate:calc(100% + 2rem) 0;

            `
        }
    }}
    }
    
  `;


const MenuToggle = styled.button`
border:0;
outline:0;
padding:0.5rem 0.75rem;
background:rgba(var(--theme-rgb),0.1);
border-radius:0.5rem;
cursor:pointer;
aspect-ratio:1;
@media (min-width: 992px){
    display:none;
}
`;

const NavWrapper = styled.nav`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px 32px;
  height: 2.75rem;
  position: relative;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  max-width:var(--max-width);
  margin-inline:auto;
  position:relative;
  @media (max-width: 468px){
    padding: 0px 1rem;
  }
  
`;

export function NavBar() {
    const [isMenuOpen, setMenuOpen] = useState(false);

    return (
        <Wrapper>
            <NavWrapper>
                <NavLogo href="/blog">
                    K K UPGRADER
                </NavLogo>
                <NavMenu active={isMenuOpen}>
                    <NavItem>
                        <NavLink href="/">Home</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="/blog">Blog</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="/tools">Tools</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="/contact">Contact</NavLink>
                    </NavItem>
                </NavMenu>
                <ProfileWrapper className="ms-auto">
                    <NavLink href="/login">
                        Login
                    </NavLink>
                </ProfileWrapper>
                <MenuToggle onClick={() => setMenuOpen(!isMenuOpen)}>
                    <CgMenu />
                </MenuToggle>

            </NavWrapper>
        </Wrapper>)
}
const SearchWrapper = styled.form`
position: relative;
margin-inline:0.75rem;
display:inline-flex;
align-items:center;
height:3rem;
width:3rem;
--width:300px;
`;

const SearchInput = styled.input.attrs({ type: "text" })`
height:3rem;
border:none;
outline:none;
padding:0.5rem;
font-size:1rem;
background:rgba(var(--theme-rgb),0.1);
border-radius:3rem;
padding-inline:calc(3rem + 2px);
padding-block:2px;
flex: 1 1 100%;
position:absolute;
top:50%;
right:0;
transform:translateY(-50%);
backdrop-filter:blur(20px);
transform-origin:center right;
transition:all 1s cubic-bezier(0.645,0.045,0.355,1);
&:placeholder{
    color:rgba(var(--text-color),1);
    font-family:inherit;
}

${({ active }) => {
        if (active) {
            return `
        visibility:visible;
        opacity:1;
        width:var(--width);
 
        `
        } else {
            return `
        visibility:hidden;
        opacity:0;
        width:0;

        `;
        }
    }}
`;
const Icon = styled.button`
position:absolute;
inset-block:2px;
border:none;
outline:none;
display:flex;
align-items:center;
justify-content:center;
font-size:1.5rem;
cursor:pointer;
aspect-ratio:1;
height:calc(100% - 2px);
background:rgba(var(--theme-rgb),0.12);
border-radius:2.75rem;
transition:all 1s cubic-bezier(0.645,0.045,0.355,1);
&:hover{
    background:rgba(var(--theme-rgb),0.2);
}
`;
const SearchIcon = styled(Icon)`
left:2px;
z-index:2;
top:50%;

${({ active }) => {
        if (active) {
            return `
        visibility:visible;
        opacity:1;
        transform:translateY(-50%) translateX(calc((-1 * var(--width)) + 100% + 2px));

        `
        } else {
            return `
        visibility:hidden;
        opacity:0;
        transform:translateY(-50%) translateX(0);

        `;
        }
    }}
`;
const Toggle = styled(Icon)`
z-index:2;
transition:all 1s cubic-bezier(0.645,0.045,0.355,1);

${({ active }) => {
        if (active) {
            return `
        
            transform:rotate(-360deg);
        
        `
        } else {
            return `
            transform:rotate(0deg);
    
        `;
        }
    }}

`;
const DropDownWrapper = styled.div`
position:absolute;
top:calc(100% + 2px);
inset-inline:0;
z-index:99;
border-radius:1rem 1rem 1.5rem 1.5rem;
padding:0.75rem 0.5rem;
background:rgba(var(--theme-rgb),0.1);
box-shadow:0 0.5rem 1rem rgba(var(--theme-rgb),0.1);
overflow:hidden;
transition:all 1s cubic-bezier(0.645,0.045,0.355,1);
${({ open }) => {
        if (open) {
            return `
        visibility:visible;
        opacity:1;
        min-height:5rem;
        `
        } else {
            return `
        visibility:hidden;
        opacity:0;
        height:0rem;
        `;
        }
    }}
`;

const Skeleton = styled.div`
animation:skeleton 1.5s infinite cubic-bezier(0.645,0.045,0.355,1);
animation-delay:${({ animationDelay }) => animationDelay};
height:${({ height }) => height};
width:${({ width }) => width};
border-radius:${({ radius }) => radius};
margin:${({ margin }) => margin};
`;
const ResultCard = styled.div`
display:flex;
align-items:center;
gap:0.5rem;
width:100%;
padding:0.5rem;
border-radius:0.5rem;
&:not(:has(${Skeleton})):hover{
    background:rgba(var(--theme-rgb),0.2)
}
&:not(:last-child){overflow-x:hidden;
    margin-bottom:0.75rem;
}
&>div:not([class]){
    flex:1 1 auto;
}
&>h6:not([class]){
    text-align:center;
}
h6,p{
    margin-bottom:0;
    line-height:1.6;
}
img{
    max-height:5rem;
}
`;
const shimmer = (w, h) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#eee" offset="20%" />
      <stop stop-color="#ccc" offset="50%" />
      <stop stop-color="#eee" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#eee" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`
const toBase64 = (str) =>
    typeof window === 'undefined'
        ? Buffer.from(str).toString('base64')
        : window.btoa(str)

export default function NavBarSearch() {
    const [value, setValue] = useState("");
    const [loading, setLoading] = useState(false);
    const [isDropOpen, setDropOpen] = useState(false);
    const [isSearchActive, setSearchActive] = useState(false);
    const [result, setResult] = useState([]);
    const [error, setError] = useState("");

    const handleSearch = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        setResult([])
        setDropOpen(true);
        setLoading(true);
        setSearchActive(true);

        if (value.length === 0) {
            setLoading(false);
            setSearchActive(false);
            setDropOpen(false);
            return;
        }

        await fetch("")
            .then((res) => res.json())
            .then((json) => {
                setResult(json.map(({ title, short_description, link, service_name }) => {
                    return ({ title, short_description, link, service_name })
                }))
                setDropOpen(true)
            }).catch((err) => {
                setError(err.detail[0].msg)
            }).finally(() => {
                setLoading(false);
            })

    }


    return (
        <SearchWrapper onSubmit={handleSearch}>
            <SearchIcon active={isSearchActive} onClick={handleSearch} type="submit"><CgSearch /></SearchIcon>
            <SearchInput active={isSearchActive} value={value} onChange={(e) => setValue(e.target.value)} placeholder="What are you looking for ?" />
            <Toggle onClick={() => {
                setSearchActive(!isSearchActive);
                setDropOpen(false);
            }} active={isSearchActive} type="reset">
                {isSearchActive ? <CgClose /> : <CgSearch />}
            </Toggle>

            <DropDownWrapper open={isDropOpen}>
                {loading ? <>
                    <ResultCard>
                        <Skeleton height="5rem" width="5rem" radius="0.5rem" animationDelay="0s" />
                        <div>
                            <Skeleton height="1rem" width="calc(100% - 10px)" radius="0.5rem" animationDelay="0s" margin="0 auto 0.25rem 0px" />
                            <Skeleton height="1rem" width="calc(100% - 30px)" radius="0.5rem" animationDelay="0s" margin="0 auto 0.25rem 0px" />
                            <Skeleton height="1rem" width="calc(100% - 50px)" radius="0.5rem" animationDelay="0s" margin="0 auto 0.25rem 0px" />
                        </div>
                    </ResultCard>
                    <ResultCard>
                        <Skeleton height="5rem" width="5rem" radius="0.5rem" animationDelay="0s" />
                        <div>
                            <Skeleton height="1rem" width="calc(100% - 10px)" radius="0.5rem" animationDelay="0s" margin="0 auto 0.25rem 0px" />
                            <Skeleton height="1rem" width="calc(100% - 30px)" radius="0.5rem" animationDelay="0s" margin="0 auto 0.25rem 0px" />
                            <Skeleton height="1rem" width="calc(100% - 50px)" radius="0.5rem" animationDelay="0s" margin="0 auto 0.25rem 0px" />
                        </div>
                    </ResultCard>
                </> : null}
                {result.length > 0 ? result?.map((item, index) => {
                    return <Result key={index} tool={item} />
                }) :
                    error.length > 0 ?
                        <h6>
                            {error}
                        </h6> : result.length === 0 && (error.length === 0 && loading === false) && <h6>No result Found !!!</h6>
                }
            </DropDownWrapper>
        </SearchWrapper>)

}


function Result({ tool }) {
    const { title, short_description, link, service_name } = tool;

    return <ResultCard as={Link} href={`${link}`}>
        <Image height={80} width={80} alt={title}
            loading="lazy"
            placeholder="blur"
            blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}

            src={'/icons/' + service_name + '.svg'} />
        <div>
            <h6>
                {title}
            </h6>
            <p>
                {short_description}
            </p>
        </div>
    </ResultCard>

}
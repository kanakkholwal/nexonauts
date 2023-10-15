import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const menu = [
    {
        name: "Home",
        link: "/",
    },
    {
        name: "About",
        link: "/about",
    },
    {
        name: "Blog",
        link: "/blog",
    },
    {
        name: "Contact",
        link: "/contact",
    },
    {
        name: "Pricing",
        link: "/pricing",
    },

] as {
    name: string;
    link: string;
}[];


export default function Header() {
    const headerRef = useRef<HTMLElement>(null);
    const [isScrolled, setIsScrolled] = useState(false);
    useEffect(() => {
        if (!headerRef.current) return;

        const sticky = headerRef.current?.offsetTop;
        const scrollCallBack =(e) => {
                setIsScrolled(window.scrollY > sticky!);
        }
        window.addEventListener("scroll", scrollCallBack);
        return () => {
            window.removeEventListener("scroll", scrollCallBack);
        };
    },[])
    return (
        <header className={"fixed left-0 top-0 w-full z-9999 py-7 lg:py-0 z-50 " + (isScrolled ? " bg-primary/5 backdrop-blur-lg shadow":"")} ref={headerRef}>
            <div className="max-w-[1170px] mx-auto px-4 sm:px-8 xl:px-0 lg:flex items-center justify-between relative">
                <div className="w-full lg:w-1/4 flex items-center justify-between">
                    <Link href="/" className="text-3xl font-extrabold sm:text-3xl xl:text-heading-3">
                        {process.env.NEXT_PUBLIC_WEBSITE_NAME}
                    </Link>
                    </div>
                <div className="w-full lg:w-3/4 h-0 lg:h-auto invisible lg:visible lg:flex items-center justify-between ">
                    <nav>
                        <ul className="flex lg:items-center flex-col lg:flex-row gap-5 lg:gap-2">
                        {menu.map((item,index:number) =>{
                            return (<li className="nav__menu group relative lg:py-7" key={index}>
                            <Link href={item.link} className="relative text-sm py-1.5 px-4 border border-transparent  hover:bg-primary/5 rounded-full  hover:border-primary/5">
                                {item.name}
                            </Link>
                        </li>)})}
                        </ul>
                    </nav>
                    <div className="flex items-center gap-6 mt-7 lg:mt-0">
                        <Link href="/login" className=" text-sm hover:text-opacity-75">
                            SignIn
                        </Link>
                        <Link href="/signup" className="bg-primary text-white px-3 relative rounded-lg  text-sm flex items-center gap-1.5 py-2 px-4.5 shadow-button">
                            Sign up
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
}
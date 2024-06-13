'use client';
// import { Button } from "@/components/ui/button";
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { BiChevronDown } from 'react-icons/bi';
// import { RiMenuFill } from "react-icons/ri";

type MenuLinkType = {
  name: string;
  link: string;
  items?: MenuLinkType[];
};
const menu = [
  {
    name: 'Home',
    link: '/',
  },
  {
    name: 'About Us',
    link: '/about',
  },
  {
    name: 'Contact',
    link: '/contact',
  },
  {
    name: 'Pricing',
    link: '/pricing',
  },
  {
    name: 'More',
    link: '#',
    items: [
      {
        name: 'Apps',
        link: '/apps',
      },
      {
        name: 'Tools',
        link: '/apps',
      },
      {
        name: 'ToolBox',
        link: '/toolbox',
      },
      // {
      //     name: "Store",
      //     link: "/store"
      // },
    ],
  },
] as MenuLinkType[];

export default function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const { data: session } = useSession();
  useEffect(() => {
    if (!headerRef.current) return;

    const sticky = headerRef.current?.offsetTop;
    const scrollCallBack = (e) => {
      setIsScrolled(window.scrollY > sticky!);
    };
    window.addEventListener('scroll', scrollCallBack);
    return () => {
      window.removeEventListener('scroll', scrollCallBack);
    };
  }, []);
  return (
    <header
      className={
        'fixed left-0 top-0 w-full z-9999 py-7 lg:py-0 z-50 ' +
        (isScrolled ? ' bg-slate-50 backdrop-blur-lg shadow' : '')
      }
      ref={headerRef}
    >
      <div className="max-w-[1170px] mx-auto px-4 sm:px-8 xl:px-0 lg:flex items-center justify-between relative">
        <div className="w-full lg:w-1/4 flex items-center justify-between">
          <Link
            href="/"
            className="text-3xl font-extrabold sm:text-3xl xl:text-heading-3"
          >
            {process.env.NEXT_PUBLIC_WEBSITE_NAME}
          </Link>
        </div>
        <div className="w-full lg:w-3/4 h-0 lg:h-auto invisible lg:visible lg:flex items-center justify-between ">
          <nav>
            <ul className="flex lg:items-center flex-col lg:flex-row gap-5 lg:gap-2">
              {menu.map((item: MenuLinkType, index: number) => {
                return (
                  <li className="nav__menu grow relative lg:py-7" key={index}>
                    <Link
                      href={item.link}
                      className="relative flex gap-1 items-center text-sm py-1.5 px-4 border border-transparent  hover:bg-primary/10 rounded-full  hover:border-primary/50"
                    >
                      {item.name}
                      {item?.items && item.items.length ? (
                        <BiChevronDown className="w-3 h-3" />
                      ) : null}
                    </Link>
                    {item?.items && item.items.length > 0 ? (
                      <div className="navdrop_menu z-[9999]">
                        {item.items.map((item: MenuLinkType, index: number) => {
                          return (
                            <Link
                              href={item.link}
                              className="nav__menu group relative py-1 px-4 hover:bg-slate-200 rounded-lg w-full  text-sm"
                              key={index}
                            >
                              {item.name}
                            </Link>
                          );
                        })}
                      </div>
                    ) : null}
                  </li>
                );
              })}
            </ul>
          </nav>
          <div className="flex items-center gap-2 mt-7 lg:mt-0">
            {session?.user ? (
              <Link
                href="/dashboard"
                className=" text-sm hover:opacity-95 bg-primary text-white py-2  px-3 relative rounded-lg  flex items-center gap-1.5"
              >
                Dashboard
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  className=" text-sm hover:text-opacity-75 hover:bg-slate-200  py-2  px-3 relative rounded-lg  flex items-center gap-1.5"
                >
                  SignIn
                </Link>
                <Link
                  href="/signup"
                  className="bg-primary text-white py-2  px-3 relative rounded-lg  text-sm flex items-center gap-1.5 shadow-button"
                >
                  Sign up
                </Link>
              </>
            )}
            {/* <Button variant="ghost" size="icon" className="flex lg:hidden">
                            <RiMenuFill className="w-4 h-4"/>
                        </Button> */}
          </div>
        </div>
      </div>
    </header>
  );
}

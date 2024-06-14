"use client";
// import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import * as React from "react";
import { NAME } from "src/constants/marketplace";
import { SessionUserType } from "src/types/user";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

import { signOut } from "next-auth/react";

const product_types = [
  {
    title: "Templates",
    href: "/marketplace/explore?type=template",
    description:
      "Templates are pre-built websites that you can use as a starting point for your own website.",
  },
  {
    title: "UI Kits",
    href: "/marketplace/explore?type=uikit",
    description:
      "UI Kits are collections of components that can be used to build a website.",
  },
  {
    title: "E-Books",
    href: "/marketplace/explore?type=ebook",
    description:
      "E-Books are digital books that can be read on your computer, tablet, or phone.",
  },
  {
    title: "Plugins",
    href: "/marketplace/explore?type=plugin",
    description:
      "Plugins are software components that add specific features to an existing program.",
  },
  {
    title: "Themes",
    href: "/marketplace/explore?type=theme",
    description:
      "Themes are pre-built websites that you can use as a starting point for your own website.",
  },
  {
    title: "Graphics",
    href: "/marketplace/explore?type=graphic",
    description:
      "Graphics are pre-built websites that you can use as a starting point for your own website.",
  },
  {
    title: "Fonts",
    href: "/marketplace/explore?type=font",
    description:
      "Fonts are pre-built websites that you can use as a starting point for your own website.",
  },
  // { title: 'Videos', href: '/marketplace/explore?type=video',description:"Videos are pre-built websites that you can use as a starting point for your own website." },
  {
    title: "Courses",
    href: "/marketplace/explore?type=course",
    description:
      "Courses are pre-built websites that you can use as a starting point for your own website.",
  },
  // { title: 'Audio', href: '/marketplace/explore?type=audio' ,description:"Audio are pre-built websites that you can use as a starting point for your own website."},
  // { title: '3D Assets', href: '/marketplace/explore?type=3d' ,description:"3D Assets are pre-built websites that you can use as a starting point for your own website."},
  // { title: 'Tools', href: '/marketplace/explore?type=tool',description:"Tools are pre-built websites that you can use as a starting point for your own website." },
  {
    title: "Mobile Apps",
    href: "/marketplace/explore?type=mobileapp",
    description:
      "Mobile Apps are pre-built websites that you can use as a starting point for your own website.",
  },
  {
    title: "Desktop Apps",
    href: "/marketplace/explore?type=desktopapp",
    description:
      "Desktop Apps are pre-built websites that you can use as a starting point for your own website.",
  },
  // { title: 'SaaS', href: '/marketplace/explore?type=saas',description:"SaaS are pre-built websites that you can use as a starting point for your own website." },
  // { title: 'Games', href: '/marketplace/explore?type=game' ,description:"Games are pre-built websites that you can use as a starting point for your own website."},
  // { title: 'Websites', href: '/marketplace/explore?type=website' ,description:"Websites are pre-built websites that you can use as a starting point for your own website."},
  // { title: 'Jobs', href: '/marketplace/explore?type=job',description:"Jobs are pre-built websites that you can use as a starting point for your own website." },
  {
    title: "Services",
    href: "/marketplace/explore?type=service",
    description:
      "Services are pre-built websites that you can use as a starting point for your own website.",
  },
  {
    title: "Other",
    href: "/marketplace/explore?type=other",
    description:
      "Other are pre-built websites that you can use as a starting point for your own website.",
  },
];

export function Navbar({
  user,
  title,
}: {
  user: SessionUserType | null;
  title: React.ReactNode | null;
}) {
  return (
    <nav
      role="navbar"
      className="w-full flex flex-1 justify-between items-center py-5 px-6 bg-white dark:bg-grey-600 z-20 relative lg:sticky lg:top-0 shadow-sm"
    >
      <Link href="/marketplace" className="flex items-center gap-3 shrink-0 ">
        <Image
          src="/logo-sqaure.svg"
          alt="Nexo"
          className="w-12 h-12"
          height={150}
          width={180}
        />
        <span className="text-2xl font-bold sr-only">Nexo</span>
      </Link>
      <div className=" ml-7">
        {title ? (
          title
        ) : (
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            {NAME}
          </h1>
        )}
      </div>

      <NavigationMenuBar />

      <button
        role="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          // setOpen((open) => !open)
        }}
        className="ml-auto mr-2 inline-flex w-full items-center whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-slate-100 shadow-sm hover:bg-slate-200 h-9 px-4 py-2  rounded-xl relative justify-start text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-96"
      >
        <span className="hidden lg:inline-flex">
          Search templates, ui kits, e-books, and more...
        </span>
        <span className="inline-flex lg:hidden">Search...</span>

        <kbd className="pointer-events-none absolute right-1.5 top-[50%] translate-y-[-50%] hidden h-5 select-none items-center gap-1 rounded border bg-muted text-slate-600 px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>J
        </kbd>
      </button>
      {user ? (
        <div className="flex items-center space-x-2 px-3 py-1.5 shrink-0">
          <span className="text-slate-500 text-md mr-2 font-semibold sm:inline-block hidden">
            Hi, {user.name}
          </span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-8 w-8 rounded-full ring-transparent focus:ring-transparent"
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={user.profilePicture.toString()}
                    height={80}
                    width={80}
                    alt="avatar"
                    className="w-8 h-8 rounded-full shadow-sm"
                  />
                  <AvatarFallback>SC</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {user.name}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    @{user.username}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem asChild>
                  <Link href={`/marketplace/profiles/${user.username}`}>
                    Profile
                    <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href={`/marketplace/my/products`}>
                    My Products
                    <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href={`/marketplace/my/seller-dashboard`}>
                    Seller Dashboard
                    <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <button
                  className="w-full"
                  onClick={(e) => {
                    signOut({
                      callbackUrl: `/marketplace`,
                    });
                  }}
                >
                  Log out
                  <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                </button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ) : (
        <div className="flex items-center space-x-2 px-3 py-1.5">
          <Link href="/login" passHref>
            <a className="text-slate-500 text-md mr-2 font-semibold sm:inline-block hidden">
              Login
            </a>
          </Link>
          <Link href="/signup" passHref>
            <a className="text-slate-500 text-md mr-2 font-semibold sm:inline-block hidden">
              Signup
            </a>
          </Link>
          <Link href="/signup" passHref>
            <a className="text-slate-500 text-md mr-2 font-semibold sm:inline-block hidden">
              Get Started
            </a>
          </Link>
        </div>
      )}
    </nav>
  );
}

export function NavigationMenuBar() {
  const router = useRouter();
  return (
    <NavigationMenu className="mx-auto flex-auto">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-blue-100 via-violet-200 to-fuchsia-200 p-6 no-underline outline-none focus:shadow-md"
                    href="/"
                  >
                    <Image
                      src="/logo-sqaure.svg"
                      alt="NexoNauts"
                      className="w-12 h-12"
                      height={150}
                      width={180}
                    />
                    <div className="mb-2 mt-4 text-lg font-medium">
                      NexoMart
                    </div>
                    <p className="text-sm leading-tight text-slate-600">
                      A marketplace for buying, selling and promoting digital
                      products.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <ListItem href="/marketplace/learn-more" title="Learn More">
                Learn more about NexoMart.
              </ListItem>
              <ListItem href="/marketplace/faqs" title="FAQ">
                Frequently asked questions.
              </ListItem>
              <ListItem href="/about-us" title="About NexoNauts">
                Learn more about NexoNauts.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Products</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {product_types.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Categories</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {product_types.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link
            href={"/signup?continue=" + encodeURIComponent(router.asPath)}
            legacyBehavior
            passHref
          >
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Get Started
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

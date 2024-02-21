"use client";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import ThemeSwitcher from "./theme-switcher";

type NavLinksType = {
  title: string
  href: string
  description: string
}
const ai_applications: NavLinksType[] = [
  {
    title: "Find AI-Powered Apps",
    href: "/apps",
    description: `Find the perfect tools for your business.`,
  },
  {
    title: "Create Your Own App",
    href: "/apps/",
    description: `Create your own AI-powered app.`,
  }
]
const marketplace_components: NavLinksType[] = [
  {
    title: "Browse & Sell Creations",
    href: "/marketplace",
    description: `Browse and sell your digital products.`,
  },
  {
    title: "Discover Digital Assets",
    href: "/marketplace/discover",
    description: `Discover digital assets for your business.`,

  }

]
const search_components: NavLinksType[] = [
  {
    title: "Find Perfect Tools",
    href: "/tool-scout",
    description: `Find the perfect tools for your business.`,
  },
  {
    title: "Submit Your Tool",
    href: "/tool-scout/submit",
    description: `Submit your tool to our toolbox.`,
  }
]
const dev_components: NavLinksType[] = [
  {
    title: "Find Dev Tools",
    href: "/dev-tools",
    description: `Find the dev tools for your project development.`,
  },
  {
    title: "Submit Your Tool",
    href: "/dev-tools/submit",
    description: `Submit your tool to our directory.`,
  }
]


export default function Navbar() {
  const [open, setOpen] = React.useState(false);


  return (<div aria-label="NavMenu" id="navbar" className="absolute inset-x-0 top-0 z-50  w-full">
    <div className="relative flex flex-wrap items-center justify-between gap-6 py-2 lg:gap-0 lg:py-4 mx-auto px-4 sm:px-12 xl:max-w-7xl xl:px-0 lg:px-8" aria-label="Global">
      <div className="flex lg:flex-1">
        <Link href="/" aria-label="NexoNauts Logo" className="p-1.5">
          <span className="sr-only">Nexonauts</span>
          <Image height={40} width={280} className="h-10 dark:invert w-auto" src="/assets/logo.svg" alt="logo" priority loading="eager"/>
        </Link>

      </div>
      <div id="layer" aria-hidden={open ? "false" : "true"} className="fixed inset-0 z-10 h-screen w-screen origin-bottom scale-y-0 bg-white/70 backdrop-blur-2xl transition duration-500 dark:bg-gray-900/70 lg:hidden" />
      <NavigationMenu id="navlinks" className={cn(
        "fixed lg:relative  lg:scale-y-100 inset-x-0 top-20 lg:top-auto z-20 origin-top scale-y-0 transform-gpu  transition duration-500",
        "h-auto w-screen max-w-xl mx-auto rounded-lg sm:rounded-full py-4 lg:py-1.5 px-6 lg:px-3 ",
        (open ? "scale-y-100 " : ""),
        "backdrop-blur-sm bg-white/10 dark:bg-slate-100/5 border border-border/50 shadow-lg md:shadow-none"
      )}>
        <NavigationMenuList className="flex-col sm:flex-row flex sm:justify-around w-full">
          <NavigationMenuItem>
            <NavigationMenuTrigger className="rounded-full">Getting started</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <a
                      className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                      href="/"
                    >
                      <img className="h-12 dark:invert" src="/assets/logo.svg" alt="logo" />
                      <div className="mb-2 mt-4 text-lg font-medium">
                        Nexonauts.com
                      </div>
                      <p className="text-sm leading-tight text-muted-foreground">
                        Your Development Hub
                      </p>
                    </a>
                  </NavigationMenuLink>
                </li>
                <ListItem href="/about" title="About Us">
                  Learn more about us.
                </ListItem>
                <ListItem href="/pricing" title="Pricing">
                  See our pricing plans.
                </ListItem>
                <ListItem href="/contact" title="Contact Us">
                  Contact Us
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="rounded-full">Tool Scout</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                {search_components.map((component) => (
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
            <NavigationMenuTrigger className="rounded-full">
              CreationsHub
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                {marketplace_components.map((component) => (
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
            <NavigationMenuTrigger className="rounded-full">
              Dev Tools
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                {dev_components.map((component) => (
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
        </NavigationMenuList>
      </NavigationMenu>

      <div className="flex gap-2 items-center justify-end flex-1">
        <Link
          className="relative ml-auto hidden md:flex  h-9 items-center justify-center before:absolute before:inset-0 before:rounded-full  before:transition-transform before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 dark:before:border-gray-700 dark:before:bg-primaryLight sm:px-4 before:border before:border-gray-200 before:bg-primary/10 dark:before:bg-gray-800"
          href="/signup?ref=navbar-button">
          <span className="relative text-sm font-semibold  text-primary dark:text-white">Get Started</span>
        </Link>
        <ThemeSwitcher/>
        <button aria-label="humburger" id="hamburger" className="relative lg:hidden h-10 w-10"
          onClick={() => setOpen(!open)}
        >
          <div aria-hidden="true" className={"m-auto h-0.5 w-5 rounded bg-sky-900 transition duration-300 dark:bg-gray-300" + (open ? " translate-y-[0.375rem] rotate-[45deg]" : "")} />
          <div aria-hidden="true" className={"m-auto mt-2 h-0.5 w-5 rounded bg-sky-900 transition duration-300 dark:bg-gray-300" + (open ? " translate-y-[-0.25rem] rotate-[-45deg]" : "")} />
        </button>

      </div>
    </div>
  </div>)
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
  )
})
ListItem.displayName = "ListItem"
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
import React from "react";
import { create } from "zustand";


type State = {
  open: boolean
}

export const useStore = create<State>((set) => ({
  open: false,
}))

export const ToggleButton = () => {
  const open = useStore(state => state.open)

  return <button aria-label="humburger" id="hamburger" className="relative lg:hidden h-10 w-10"
    onClick={() => useStore.setState({ open: !open })}
  >
    <div aria-hidden="true" className={"m-auto h-0.5 w-5 rounded bg-sky-900 transition duration-300 dark:bg-gray-300" + (open ? " translate-y-[0.375rem] rotate-[45deg]" : "")} />
    <div aria-hidden="true" className={"m-auto mt-2 h-0.5 w-5 rounded bg-sky-900 transition duration-300 dark:bg-gray-300" + (open ? " translate-y-[-0.25rem] rotate-[-45deg]" : "")} />
  </button>
}
type NavLinksType = {
  title: string
  href: string
  description: string
}

const list = [
  {
    name: "Nexo Scout",
    links: [
      {
        title: "Find Perfect Tools",
        href: "/scout",
        description: `Find the perfect tools for your business.`,
      },
      {
        title: "Submit Your Tool",
        href: "/scout/submit",
        description: `Submit your tool to our toolbox.`,
      }
    ]
  },
  {
    name: "CreationsHub",
    links: [
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
  },
  {
    name: "Dev Tools",
    links: [
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
  }
] as {
  name: string
  links: NavLinksType[]
}[]

export const NavList = () => {
  const { open } = useStore(state => state)

  return <>
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
        {list.map((item) => {
          return (
            <NavigationMenuItem key={item.name}>
              <NavigationMenuTrigger className="rounded-full">
                {item.name}
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                  {item.links.map((component) => (
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
          )
        })}
      </NavigationMenuList>
    </NavigationMenu>
  </>
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
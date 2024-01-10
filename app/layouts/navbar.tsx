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
import { useTheme } from "next-themes";
import Link from "next/link";
import React from "react";

type NavLinksType = {
  title: string
  href: string
  description: string
}
const ai_applications: NavLinksType[] = [
  {
    title: "Find AI-Powered Apps",
    href: "/ai-applications",
    description: `Find the perfect tools for your business.`,
  },
  {
    title: "Create Your Own App",
    href: "/ai-applications/submit",
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
    href: "/toolzen",
    description: `Find the perfect tools for your business.`,
  },
  {
    title: "Submit Your Tool",
    href: "/toolzen/submit",
    description: `Submit your tool to our toolbox.`,
  }
]


export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = React.useState(false);


  return (<nav id="navbar" className="fixed inset-x-0 z-20 w-full border-b border-gray-100 bg-white/80 backdrop-blur dark:border-gray-700/30 dark:bg-gray-900/80">
    <div className="mx-auto px-4 sm:px-12 xl:max-w-6xl xl:px-0">
      <div className="relative flex flex-wrap items-center justify-between gap-6 lg:gap-0 lg:py-4">
        <div className="relative z-20 flex w-full justify-between md:px-0 lg:w-max">
          <a href="/" aria-label="logo" className="flex items-center space-x-2">
            <img className="h-10 dark:invert" src="/logo.svg" alt="logo" />
          </a>
          <button aria-label="humburger" id="hamburger" className="relative -mr-6 p-6 lg:hidden"
            onClick={() => setOpen(!open)}
          >
            <div aria-hidden="true" className={"m-auto h-0.5 w-5 rounded bg-sky-900 transition duration-300 dark:bg-gray-300" + (open ? " translate-y-[0.375rem] rotate-[45deg]" : "")} />
            <div aria-hidden="true" className={"m-auto mt-2 h-0.5 w-5 rounded bg-sky-900 transition duration-300 dark:bg-gray-300" + (open ? " translate-y-[-0.25rem] rotate-[-45deg]" : "")} />

          </button>
        </div>
        <div id="layer" aria-hidden={open ? "false" : "true"} className="fixed inset-0 z-10 h-screen w-screen origin-bottom scale-y-0 bg-white/70 backdrop-blur-2xl transition duration-500 dark:bg-gray-900/70 lg:hidden" />
        <div id="navlinks" className={"invisible absolute top-full left-0 z-20 w-full origin-top-right translate-y-1 scale-90 flex-col flex-wrap justify-end gap-6 rounded-3xl border border-gray-100 bg-white p-8 opacity-0 shadow-2xl shadow-gray-600/10 transition-all duration-300 dark:border-gray-700 dark:bg-gray-800 dark:shadow-none lg:visible lg:relative lg:flex lg:w-auto lg:translate-y-0 lg:scale-100 lg:flex-row lg:items-center lg:gap-0 lg:border-none lg:bg-transparent lg:p-0 lg:opacity-100 lg:shadow-none lg:peer-checked:translate-y-0 dark:lg:bg-transparent" + (open ? " !visible !scale-100 !opacity-100 !lg:translate-y-0" : "")}>
          <div className="text-gray-600 dark:text-gray-300 lg:pr-4">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <a
                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                            href="/"
                          >
                            <img className="h-12 dark:invert" src="/logo.svg" alt="logo" />
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
                  <NavigationMenuTrigger>Tool Zen</NavigationMenuTrigger>
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
                  <NavigationMenuTrigger>
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
                  <NavigationMenuTrigger>
                    AppForge
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                      {ai_applications.map((component) => (
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
          </div>
          <div className="mt-6 -ml-1 flex w-full flex-col space-y-2 border-primary/10 dark:border-gray-700 sm:flex-row md:w-max lg:mt-0 lg:mr-6 lg:space-y-0 lg:border-l lg:pl-6">
            <Link
              className="relative ml-auto flex  h-12 lg:h-9 w-full items-center justify-center before:absolute before:inset-0 before:rounded-full before:bg-primary before:transition-transform before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 dark:before:border-gray-700 dark:before:bg-primaryLight sm:px-4 lg:before:border lg:before:border-gray-200 lg:before:bg-primary/10 lg:dark:before:bg-gray-800"
              href="/signup?ref=navbar-button">
              <span className="relative text-sm font-semibold text-white dark:text-gray-900 lg:text-primary lg:dark:text-white">Get Started</span>
            </Link>
          </div>
          <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="switch theme" className="switcher group relative hidden h-9 w-9 rounded-full before:absolute before:inset-0 before:rounded-full before:border before:border-gray-200 before:bg-gray-50 before:bg-gradient-to-b before:transition-transform before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 dark:before:border-gray-700 dark:before:bg-gray-800 lg:flex">
            <svg xmlns="http://www.w3.org/2000/svg" className="transistion relative m-auto hidden h-5 w-5 fill-gray-500 duration-300 group-hover:rotate-180 group-hover:fill-yellow-400 dark:block dark:fill-gray-300" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" className="transistion relative m-auto h-5 w-5 fill-gray-500 duration-300 group-hover:-rotate-90 group-hover:fill-blue-900 dark:hidden" viewBox="0 0 20 20" fill="currentColor">
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
          </button>
        </div>
        <div className="fixed top-3 right-14 z-20 sm:right-24 lg:hidden">
          <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="switche theme" className="switcher group relative flex h-9 w-9 rounded-full before:absolute before:inset-0 before:rounded-full before:border before:border-gray-200 before:bg-gray-50 before:bg-gradient-to-b before:transition-transform before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 dark:before:border-gray-700 dark:before:bg-gray-800">
            <svg xmlns="http://www.w3.org/2000/svg" className="transistion relative m-auto hidden h-5 w-5 fill-gray-500 duration-300 group-hover:rotate-180 group-hover:fill-yellow-400 dark:block dark:fill-gray-300" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" className="transistion relative m-auto h-5 w-5 fill-gray-500 duration-300 group-hover:-rotate-90 group-hover:fill-blue-900 dark:hidden" viewBox="0 0 20 20" fill="currentColor">
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </nav>)
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
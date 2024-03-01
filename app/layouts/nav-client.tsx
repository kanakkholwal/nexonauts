"use client";
import { useState } from "react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger
} from "@/components/ui/navigation-menu";
import {
  Calculator,
  Calendar,
  CreditCard,
  Search,
  Settings,
  Smile,
  User,
} from "lucide-react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import React from "react";
import { create } from "zustand";

export function QuickLinks() {
  const [open, setOpen] = useState(false)

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  return (
    <>

      <button aria-label="search" role="button"
        onClick={() => setOpen(!open)}
        className="inline-flex w-full items-center whitespace-nowrap rounded-full font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-slate-100 dark:bg-slate-800 shadow-sm hover:bg-slate-200 dark:hover:bg-slate-700 h-9 px-4 py-2 relative justify-start text-sm text-muted-foreground md:pr-12 md:w-20">
        <span className="inline-flex">
          <Search className="w-4 h-4 dark:text-gray-400" />
        </span>
        {/* <span className="hidden ml-2 lg:inline-flex">
          Quick Links ...</span>
        <span className="inline-flex lg:hidden">Quick Links...</span> */}
        <kbd className="pointer-events-none absolute right-1.5 top-[50%] translate-y-[-50%] hidden h-5 select-none items-center gap-1 rounded border bg-muted text-slate-600 px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>J</kbd>
      </button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem>
              <Calendar className="mr-2 h-4 w-4" />
              <span>Calendar</span>
            </CommandItem>
            <CommandItem>
              <Smile className="mr-2 h-4 w-4" />
              <span>Search Emoji</span>
            </CommandItem>
            <CommandItem>
              <Calculator className="mr-2 h-4 w-4" />
              <span>Calculator</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Settings">
            <CommandItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
              <CommandShortcut>⌘P</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <CreditCard className="mr-2 h-4 w-4" />
              <span>Billing</span>
              <CommandShortcut>⌘B</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
              <CommandShortcut>⌘S</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}
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
    href: "/scout",
    description: `Find the perfect tools for your business.`,
  },
  {
    title: "Submit Your Tool",
    href: "/scout/submit",
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
        <NavigationMenuItem>
          <NavigationMenuTrigger className="rounded-full">Nexo Scout</NavigationMenuTrigger>
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
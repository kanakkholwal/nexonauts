"use client";
import { Button } from "@/components/ui/button";
import { LayoutDashboard } from "lucide-react";
import { useState } from "react";

import { Search, Settings, User } from "lucide-react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const loggedInList = [
  {
    path: "/dashboard",
    title: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    path: "/dashboard/settings",
    title: "Settings",
    icon: Settings,
  },
];
const defaultList = [
  {
    title: "Nexo Scout",
    path: "/scout",
  },
  {
    title: "Marketplace",
    path: "/marketplace",
  },
  {
    title: "Dev Tools",
    path: "/dev-tools",
  },
];

export function QuickLinks() {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();

  const isLoggedIn = !!session?.user;

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <Button
        aria-label="search"
        role="button"
        onClick={() => setOpen(!open)}
        variant="glass"
        title="Search for anything (Ctrl + J)"
        size="icon_sm"
        rounded="full"
      >
        <Search />
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            {defaultList.map((item, index) => {
              return (
                <CommandItem key={`command-item-${index}`}>
                  <Link href={item.path} className="flex items-center w-full">
                    <span>{item.title}</span>
                  </Link>
                </CommandItem>
              );
            })}
            {!isLoggedIn && (
              <CommandItem>
                <Link href={`/signup`} className="flex items-center w-full">
                  <span>Sign Up</span>
                </Link>
              </CommandItem>
            )}
          </CommandGroup>
          <CommandSeparator />
          {isLoggedIn && (
            <CommandGroup heading="Go To">
              <CommandItem>
                <Link
                  href={`/devs/` + session?.user?.username!}
                  className="flex items-center  w-full"
                >
                  <User className="mr-2 h-4 w-4" />
                  <span>Your Profile</span>
                </Link>
              </CommandItem>
              {loggedInList.map((item, index) => {
                return (
                  <CommandItem key={`command-item-${index}`}>
                    <Link href={item.path} className="flex items-center w-full">
                      <item.icon className="mr-2 h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
}

const list = [...defaultList];

export function NavList() {
  return (
    <div
      className="hidden xl:flex items-center justify-start flex-1 mx-auto gap-3"
      id="nav_links"
    >
      {list.map((item, index) => {
        return (
          <Link
            key={`nav_link-${index}`}
            className={cn(
              "text-sm leading-5 transition font-semibold whitespace-nowrap",
              "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
            )}
            href={item.path}
          >
            {item.title}
          </Link>
        );
      })}
    </div>
  );
}

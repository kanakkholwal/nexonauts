"use client";
import { Button } from "@/components/ui/button";
import { LayoutDashboard } from "lucide-react";
import { useState } from "react";

import { Search, Settings, User } from "lucide-react";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import React from "react";
import { authClient } from "~/auth/client";

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
  const { data: session } = authClient.useSession();

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

// Centralized navigation data
const NAV_ITEMS = [
  { title: "Scout", path: "/scout" },
  { title: "Marketplace", path: "/marketplace" },
  { title: "Dev Tools", path: "/dev-tools" },
];

interface NavListProps {
  className?: string;
  mobile?: boolean;
}

export function NavList({ className, mobile = false }: NavListProps) {
  const pathname = usePathname();

  return (
    <nav
      className={cn(
        "flex",
        mobile ? "flex-col space-y-1 w-full" : "items-center gap-6",
        className
      )}
    >
      {NAV_ITEMS.map((item) => {
        const isActive = pathname?.startsWith(item.path);

        return (
          <Link
            key={item.path}
            href={item.path}
            className={cn(
              "text-sm font-medium transition-colors duration-200",
              mobile
                ? "block py-3 px-4 rounded-xl w-full" // Mobile style
                : "relative py-1", // Desktop style
              isActive
                ? mobile
                  ? "bg-primary/10 text-primary"
                  : "text-foreground"
                : mobile
                  ? "text-muted-foreground hover:bg-muted hover:text-foreground"
                  : "text-muted-foreground hover:text-foreground"
            )}
          >
            {item.title}
            {/* Desktop Active Dot Indicator */}
            {!mobile && isActive && (
              <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full" />
            )}
          </Link>
        );
      })}
    </nav>
  );
}

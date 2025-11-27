"use client";
import ProfileDropdown from "@/components/common/profile-dropdown";
import { Button } from "@/components/ui/button";
import {
  NavLink,
  getNavLinks
} from "@/constants/links";
import { LayoutDashboard, LogIn, Search, Settings, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import type { Session } from "~/auth";
import { ThemeSwitcher } from "../theme-switcher";


import { Icon } from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";
import toast from "react-hot-toast";
import { authClient } from "~/auth/client";

interface NavbarProps {
  user: Session["user"];
  impersonatedBy?: string | null;
}
export default function AppNavbar({
  user,
  impersonatedBy,
}:NavbarProps) {
  const pathname = usePathname();
  const navLinks = getNavLinks(user);

  const handleStopImpersonation = async () => {
    toast.promise(
      authClient.admin.stopImpersonating(),
      {
        loading: "Stopping impersonation...",
        success: "Impersonation stopped successfully",
        error: "Failed to stop impersonation",
      },
      {
        position: "top-right",
        duration: 3000,
      }
    );
  };

  return (
    <nav className="w-full p-4 backdrop-blur border-b border-dashed flex items-center lg:px-6 z-2">
      <SidebarTrigger className="mx-2" />
      <div className="flex items-start flex-col">
        <h3 className="text-sm font-semibold">
          Dashboard
        </h3>
        <p className="text-xs text-muted-foreground font-normal truncate max-w-28 lg:max-w-80">
          {pathname}
        </p>
      </div>
      <div className="ml-auto inline-flex gap-2 items-center">
        {impersonatedBy && (
          <div className="flex items-center bg-background border rounded-md py-1 h-8 px-2">
            <Badge size="sm">
              <Icon name="eye" />
              <span className="font-medium">
                Viewing as <span className="text-primary">{user?.name}</span>
              </span>
            </Badge>

            <Button
              variant="warning_light"
              size="icon_xs"
              onClick={handleStopImpersonation}
              title="Stop impersonation"
            >
              <Icon name="X" />
            </Button>
          </div>
        )}

        <QuickLinks user={user} publicLinks={navLinks} />
        <ThemeSwitcher />
        <ProfileDropdown user={user} />
      </div>
    </nav>
  );
}
interface QuickLinksProps extends NavbarProps {
  publicLinks: NavLink[];
}
export function QuickLinks({ user, publicLinks }: QuickLinksProps) {
  const [open, setOpen] = useState(false);

  const isLoggedIn = !!user;

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
        aria-label="Search for anything (Ctrl + J)"
        role="button"
        onClick={() => setOpen(!open)}
        title="Search for anything (Ctrl + J)"
        aria-labelledby="search"
        size="icon_sm"
        variant="outline"
        rounded="full"
      >
        <Search />
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            {publicLinks.map((item, index) => {
              return (
                <CommandItem key={`command-item-${index}`} asChild>
                  <Link
                    href={item.href}
                    className="flex items-center w-full flex-wrap cursor-pointer group"
                  >
                    {item.Icon && <item.Icon className="size-3 mr-2" />}
                    <span>
                      <span className="text-sm">{item.title}</span>
                      <span className="block text-xs opacity-75 w-full">
                        {item.description}
                      </span>
                    </span>
                  </Link>
                </CommandItem>
              );
            })}
            {!isLoggedIn && (
              <CommandItem>
                <Link
                  href={`/auth/sign-in`}
                  className="flex items-center w-full"
                >
                  <LogIn className="size-3 mr-3" />
                  <span>
                    <span className="text-sm">Sign In</span>
                    <span className="block text-xs  opacity-75 w-full">
                      Sign in to your account
                    </span>
                  </span>
                </Link>
              </CommandItem>
            )}
          </CommandGroup>
          <CommandSeparator />
          {isLoggedIn && (
            <CommandGroup heading="Go To">
              <CommandItem>
                <Link
                  href={`/u/` + user?.username!}
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
"use client";
import ProfileDropdown from "@/components/common/profile-dropdown";
import { Button } from "@/components/ui/button";
import {
  NavLink,
  getNavLinks
} from "@/constants/links";
import { ArrowUpRight, LayoutDashboard, LogIn, Search, Settings, User } from "lucide-react";
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

// --- QUICK LINKS (COMMAND PALETTE) ---

interface QuickLinksProps extends NavbarProps {
  publicLinks: NavLink[];
}

export function QuickLinks({ user, publicLinks }: QuickLinksProps) {
  const [open, setOpen] = useState(false);
  const isLoggedIn = !!user;

  // Handle Ctrl/Cmd + K
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      {/* Desktop Trigger (Input Look) */}
      <button
        onClick={() => setOpen(true)}
        className="hidden md:flex items-center w-56 h-9 px-3 rounded-lg border border-border/50 bg-card/50 hover:bg-card/80 dark:bg-muted/20 dark:hover:bg-muted/50 hover:border-border transition-all text-sm text-muted-foreground group"
      >
        <Search className="size-3.5 mr-2 opacity-50 group-hover:opacity-100 transition-opacity" />
        <span className="flex-1 text-left">Search...</span>
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>

      {/* Mobile Trigger (Icon Only) */}
      <Button
        onClick={() => setOpen(true)}
        size="icon_sm"
        variant="ghost"
        className="md:hidden text-muted-foreground"
      >
        <Search className="size-5" />
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type to search ecosystem..." />
        <CommandList className="py-2">
          <CommandEmpty>No results found.</CommandEmpty>
          
          <CommandGroup heading="Suggestions">
            {publicLinks.map((item, index) => (
              <CommandItem key={`cmd-${index}`} asChild>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between group cursor-pointer"
                >
                  <div className="flex items-center">
                    {item.Icon ? <item.Icon className="mr-3 size-4 text-muted-foreground group-hover:text-primary transition-colors" /> : <ArrowUpRight className="mr-3 size-4" />}
                    <div className="flex flex-col">
                        <span className="font-medium">{item.title}</span>
                        {item.description && <span className="text-xs text-muted-foreground font-normal line-clamp-1">{item.description}</span>}
                    </div>
                  </div>
                  <ArrowUpRight className="size-3 opacity-0 group-hover:opacity-50 -translate-x-2 group-hover:translate-x-0 transition-all" />
                </Link>
              </CommandItem>
            ))}
          </CommandGroup>
          
          <CommandSeparator className="my-2"/>

          {isLoggedIn ? (
             <CommandGroup heading="Account">
                <CommandItem onSelect={() => setOpen(false)}>
                    <Link href={`/u/${user.username}`} className="flex items-center w-full">
                        <User className="mr-2 size-4" /> Profile
                    </Link>
                </CommandItem>
                {loggedInList.map((item, i) => (
                    <CommandItem key={i} onSelect={() => setOpen(false)}>
                        <Link href={item.path} className="flex items-center w-full">
                            <item.icon className="mr-2 size-4" /> {item.title}
                        </Link>
                    </CommandItem>
                ))}
             </CommandGroup>
          ) : (
             <CommandGroup heading="Authentication">
                <CommandItem onSelect={() => setOpen(false)}>
                     <Link href="/auth/sign-in" className="flex items-center w-full">
                        <LogIn className="mr-2 size-4" /> Sign In
                     </Link>
                </CommandItem>
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
"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ThemeSwitcher from "app/layouts/theme-switcher";
import {
  ChevronLeftCircle,
  ChevronRightCircle,
  LogOut,
  Rss,
  Search,
  Settings2,
  ShoppingCart,
  UserRound,
} from "lucide-react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { RiApps2Line } from "react-icons/ri";
import { SessionUserType } from "src/types/user";

export type sideLinkType = {
  label: string;
  href: string;
  icon: React.ElementType;
};

const user_links: sideLinkType[] = [
  {
    label: "Dashboard",
    icon: Rss,
    href: "/",
  },
  {
    label: "My Products",
    icon: ShoppingCart,
    href: "/dashboard/products",
  },
  {
    label: "My Tools",
    icon: RiApps2Line,
    href: "/dashboard/tools",
  },
  {
    label: "Profile",
    icon: UserRound,
    href: "/dashboard/settings/profile",
  },
  {
    label: "Settings",
    icon: Settings2,
    href: "/dashboard/settings",
  },
];

export default function SideBar({ user }: { user: SessionUserType }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname() as string;
  const links = user_links;

  return (
    <div
      aria-label="Sidenav"
      className={
        "fixed top-0 left-0 bottom-0 z-50 flex flex-col w-80 min-h-screen space-y-6 bg-glasss " +
        (open ? " translate-x-0" : " -translate-x-full lg:translate-x-0") +
        " transition-transform duration-200 ease-in-out"
      }
    >
      <button
        aria-label="Toggle Sidenav"
        className={
          "absolute top-5 -right-3 p-2 rounded-xl bg-white dark:bg-slate-800 border border-transparent dark:border-slate-700 shadow-md transition-colors duration-200 ease-in-out" +
          (open ? " translate-x-0" : " translate-x-full") +
          " lg:translate-x-0 lg:hidden"
        }
        onClick={() => setOpen(!open)}
      >
        {open ? (
          <ChevronLeftCircle className="w-4 h-4" />
        ) : (
          <ChevronRightCircle className="w-4 h-4" />
        )}
      </button>
      <div className="flex items-center justify-between px-6 py-2">
        <Image
          height={120}
          width={300}
          className="h-14 w-14 dark:invert"
          src="/logo-square-with-bg.svg"
          alt="logo"
        />
      </div>
      <div className="flex-1 px-6">
        <div className="relative flex items-center mb-4 search group">
          <Input
            className="rounded-lg pl-8 focus:pl-3 transition-all peer focus:outline-0 ring-0 focus:border-primary"
            type="search"
            placeholder="Search..."
          />

          <Search className="h-4 w-4 absolute inset-y-0 my-3 left-2 scale-1 opacity-1 peer-focus:scale-0 peer-focus:opacity-0 transition-all" />
        </div>
        <h6 className="mb-2 ml-2 font-semibold text-xs text-slate-500 dark:text-slate-400 uppercase">
          Dashboard
        </h6>
        <div className="flex flex-col justify-start items-start gap-1">
          {links.map((link: sideLinkType, index) => (
            <SideBarLink
              link={link}
              active={pathname === link.href}
              key={`sidenav_links_${index}`}
            />
          ))}
        </div>
      </div>
      <SidenavFooter user={user} />
    </div>
  );
}

export function SidenavFooter({ user }: { user: SessionUserType }) {
  return (
    <div className="flex self-stretch items-center gap-3 border-t border-t-border py-6 px-2 rounded-md mx-4 dark:border-t-slate-700">
      <Avatar>
        <AvatarImage
          src={user.profilePicture.toString()}
          alt={"@" + user.username}
        />
        <AvatarFallback className="uppercase">
          {user.name[0] + user.name[1]}
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col items-start justify-start">
        <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200">
          {user.name}
        </h3>
        <p className="text-xs text-slate-600 dark:text-slate-300">
          <Link href={"/devs/" + user.username} target="_blank">
            @{user.username}
          </Link>
        </p>
      </div>
      <div className="flex gap-2 items-center ml-auto">
        <ThemeSwitcher />
        <Button
          variant="destructive_light"
          size="icon"
          className="rounded-full"
          onClick={(e) => {
            e.preventDefault();
            signOut({ callbackUrl: "/login" });
          }}
        >
          <LogOut className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}

export function SideBarLink({
  link,
  active,
}: {
  link: sideLinkType;
  active: boolean;
}) {
  return (
    <Link
      href={link.href}
      aria-label={link.label}
      className={cn(
        "flex items-center justify-start gap-2 px-3 py-2 rounded-lg self-stretch font-semibold  group transition-colors duration-200 ease-in-out ",
        " text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-300",
        active
          ? "text-primary/70 hover:text-primary dark:text-primary/70 dark:hover:text-primary"
          : ""
      )}
    >
      <link.icon className="w-5 h-5" />
      <span className="truncate text-sm">{link.label}</span>
    </Link>
  );
}

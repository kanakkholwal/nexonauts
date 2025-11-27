"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ResponsiveDialog } from "@/components/ui/responsive-dialog";
import { socials } from "@/constants/links";
import { ArrowTopRightIcon } from "@radix-ui/react-icons";
import { Home, LogOut } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Session } from "~/auth/client";
import { authClient } from "~/auth/client";

interface ProfileDropdownProps {
  user: Session["user"];
}

export default function ProfileDropdown({ user }: ProfileDropdownProps) {
  const router = useRouter();


  return (
    <ResponsiveDialog
      title={"Your Profile"}
      description="How you appear across the platform"
      btnProps={{
        size: "icon",
        rounded: "full",
        variant: "outline",
        children: (
          <Avatar className="size-8 rounded-full" suppressHydrationWarning>
            <AvatarImage
              alt={user.username}
              width={32}
              height={32}
              src={
                user.image &&
                user.image !== "null" &&
                user.image.trim().length > 0
                  ? user.image
                  : `https://api.dicebear.com/5.x/initials/svg?seed=${user.name}`
              }
              // src={
              //   user.image
              //     ? (user.image as string)
              //     : user.gender !== "non_specified"
              //       ? `/assets/avatars/${user.gender}_user.png`
              //       : ""
              // }
            />
            <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
        ),
      }}
    >
      <div className="flex gap-4 mx-auto">
        <Avatar className="size-16 rounded-full bg-muted border">
          <AvatarImage
            src={
              user.image
                ? user.image
                : `https://api.dicebear.com/5.x/initials/svg?seed=${user.name}`
            }
            alt={user.username}
            className="size-16"
          />
          <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col justify-center items-start">
          <h4 className="font-semibold tracking-wide text-base">{user.name}</h4>
          <p className="text-muted-foreground font-medium text-sm">
            {user.email}
            <Link
              href={`/devs/${user.username}`}
              className="text-primary hover:underline ml-2 text-xs"
            >
              View Profile
              <ArrowTopRightIcon className="inline-block size-3 ml-1" />
            </Link>
          </p>
          <p>
            <Badge size="sm" variant="default_light" className="capitalize">{user.account_type}</Badge>
          </p>
        </div>
      </div>
     
    
      <div className="flex items-center justify-between gap-4 w-full flex-wrap mt-2">
        <div className="flex gap-2">
          {socials.map((link) => {
            return (
              <Link
                href={link.href}
                target="_blank"
                key={link.href}
                className="hover:text-primary hover:-translate-y-1 ease-in duration-300 flex justify-center items-center h-12 icon"
              >
                <link.icon className="size-4" />
              </Link>
            );
          })}
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href="/">
              <Home />
              Go to Home
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={async () => {
              await authClient.signOut({
                fetchOptions: {
                  onSuccess: () => {
                    router.push("/auth/sign-in"); // redirect to login page
                  },
                },
              });
            }}
          >
            <LogOut />
            Log out
          </Button>
        </div>
      </div>
    </ResponsiveDialog>
  );
}

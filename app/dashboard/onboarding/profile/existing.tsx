import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { SessionUserType } from "~/auth";

export default function AlreadyProfile({ user }: { user: SessionUserType }) {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex items-center justify-between px-6 py-2 mx-auto">
        <Image
          height={120}
          width={300}
          className="h-24 w-24 dark:invert"
          src="/logo-square-with-bg.svg"
          alt="logo"
        />
      </div>
      <h1 className="text-3xl font-bold ">You already have a profile</h1>

      <div className="mt-4 flex justify-center items-center gap-4">
        <Button variant="default_light" asChild>
          <Link href="/settings/profile">Edit Profile</Link>
        </Button>
        <Button asChild>
          <Link
            href={`/devs/${user.username}`}
            target="_blank"
            rel={"noopener noreferrer"}
          >
            View Profile
            <ArrowUpRight size={16} className="ml-2" />
          </Link>
        </Button>
      </div>
    </div>
  );
}

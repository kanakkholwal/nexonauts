"use client";

import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function GoToBtn() {
  const { data: session } = useSession();
  const isSignedIn = !!session?.user;

  return (
    <Button variant="default_light" size="sm" rounded="full" asChild>
      <Link href={isSignedIn ? "/dashboard" : "/login?ref=navbar-button"}>
        {isSignedIn ? (
          <>
            Go to Feed <ArrowUpRight />
          </>
        ) : (
          "Sign In"
        )}
      </Link>
    </Button>
  );
}

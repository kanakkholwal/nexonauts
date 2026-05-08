"use client";

import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { authClient } from "~/auth/client";

export default function GoToBtn() {
  const { data: session } = authClient.useSession();
  const isSignedIn = !!session?.user;

  return (
    <Button variant="default_light" size="sm" rounded="full" asChild>
      <Link href={isSignedIn ? "/dashboard" : "/auth/sign-in?ref=navbar-button"}>
        {isSignedIn ? (
          <>
            Go to Dashboard <ArrowUpRight />
          </>
        ) : (
          "Sign In"
        )}
      </Link>
    </Button>
  );
}

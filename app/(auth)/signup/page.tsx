import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowRightToLine } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "src/lib/auth";
import { registerUser } from "./action";
import { RegisterForm } from "./register-form";

export const metadata: Metadata = {
  title: "Signup | NexoNauts",
  description: "Register for an account on " + process.env.NEXT_PUBLIC_APP_NAME,
  keywords: "register, account, " + process.env.NEXT_PUBLIC_APP_NAME,
};

interface PageProps {
  searchParams: Promise<{
    redirect?: string;
  }>
}

export default async function Page({ searchParams }: PageProps) {
  const session = await getSession();
  if (session) return redirect("/dashboard");
  const redirect_path = (await searchParams)?.redirect

  const IsWaitingList = true;

  return (
    <>
      <Button
        className="absolute right-4 top-4 md:right-8 md:top-8"
        variant="link"
        asChild
      >
        <Link
          href={`/login${redirect_path ? `?redirect=${redirect_path}` : ""}`}
        >
          Log in
        </Link>
      </Button>

      <main className="flex flex-col items-center justify-center w-full p-4 space-y-4">
        {!IsWaitingList ? (
          <RegisterForm registerUser={registerUser} />
        ) : (
          <>
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Welcome to {process.env.NEXT_PUBLIC_WEBSITE_NAME}!
              </h1>
              <p className="text-sm text-muted-foreground">
                Signup is currently by invitation only.
              </p>
            </div>
            <div className="w-full flex flex-col items-center justify-center space-x-2 gap-4 mt-4">
              <Button variant="default_light" width="sm" asChild>
                <Link href="/login">
                  Login to your account
                  <ArrowRight />
                </Link>
              </Button>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="px-2 text-muted-foreground">
                    Or join the waiting list
                  </span>
                </div>
              </div>
              <Button width="sm" asChild>
                <Link href="/waitlist">
                  Join the waiting list
                  <ArrowRightToLine />
                </Link>
              </Button>
            </div>
          </>
        )}
      </main>
    </>
  );
}

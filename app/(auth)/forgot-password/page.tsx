import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "~/auth/server";
import { UserAuthForm } from "./forgot-form";

export const metadata: Metadata = {
  title: "Signin | NexoNauts",
  description: "Login to an account on " + process.env.NEXT_PUBLIC_APP_NAME,
  keywords: "register, account, " + process.env.NEXT_PUBLIC_APP_NAME,
};

export default async function Page() {
  const session = await getSession();
  if (session) return redirect("/dashboard");

  return (
    <>
      <Button
        className="absolute right-4 top-4 md:right-8 md:top-8"
        variant="link"
        asChild
      >
        <Link href="/signup">Sign Up</Link>
      </Button>
      <header className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Forgot Password
        </h1>
        <p className="text-sm text-muted-foreground">
          Enter your email to reset your password.
        </p>
      </header>
      <main className="flex flex-col items-center justify-center w-full p-4 space-y-4">
        <UserAuthForm key={"form"} />
      </main>
    </>
  );
}

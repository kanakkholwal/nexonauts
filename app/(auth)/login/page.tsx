
import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "src/lib/auth";
import { UserAuthForm } from './login-form';


export const metadata: Metadata = {
    title: "Signin | NexoNauts",
    description: "Login to an account on " + process.env.NEXT_PUBLIC_APP_NAME,
    keywords: "register, account, " + process.env.NEXT_PUBLIC_APP_NAME,
}


export default async function Page() {
    const session = await getSession();
    if (session) return redirect("/feed")

    return (
        <>
            <Button className="absolute right-4 top-4 md:right-8 md:top-8" variant="link" asChild>
                <Link href="/signup">
                    Sign Up
                </Link>
            </Button>
            <header className="flex flex-col space-y-2 text-center">
                <h1 className="text-2xl font-semibold tracking-tight">
                    Welcome back!
                </h1>
                <p className="text-sm text-muted-foreground">
                    Log in for a seamless experience.
                </p>
            </header>
            <main className="flex flex-col items-center justify-center w-full p-4 space-y-4">

                <UserAuthForm className="flex-auto w-full" key={"form"} />

                <p className="px-8 text-center text-sm text-muted-foreground">
                    By logging in, you agree to our{" "}
                    <Link
                        href="/terms"
                        className="underline underline-offset-4 hover:text-primary"
                    >
                        Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link
                        href="/privacy"
                        className="underline underline-offset-4 hover:text-primary"
                    >
                        Privacy Policy
                    </Link>
                    .
                </p>
            </main>

        </>
    )
}


import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowRightToLine } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "src/lib/auth";
import dbConnect from "src/lib/dbConnect";
import User from "src/models/user";
import { RegisterForm } from './register-form';

export const metadata: Metadata = {
    title: "Signup | NexoNauts",
    description: "Register for an account on " + process.env.NEXT_PUBLIC_APP_NAME,
    keywords: "register, account, " + process.env.NEXT_PUBLIC_APP_NAME,
}

const cache = new Map<string, boolean>();

export default async function Page() {
    const session = await getSession();
    if (session) return redirect("/feed")
    await dbConnect();

    const IsWaitingList = false;

    const validateEmail = async (email: string): Promise<boolean> => {
        "use server";
        return new Promise(async (resolve, reject) => {
            if (cache.has(email as string)) {
                return resolve(cache.get(email) as boolean)
            }
            const existingUser = await User.findOne({ email: email.toLowerCase() });
            if (existingUser) {
                cache.set(email, false);
                return resolve(false);
            } else {
                cache.set(email, true);
                return resolve(true);
            }
        })
    }
    const validateUsername = async (username: string): Promise<boolean> => {
        "use server";
        return new Promise(async (resolve, reject) => {
            if (cache.has(username as string)) {
                return resolve(cache.get(username) as boolean)
            }
            const existingUser = await User.findOne({ username: username.toLowerCase() });
            if (existingUser) {
                cache.set(username, false);
                return resolve(false);
            } else {
                cache.set(username, true);
                return resolve(true);
            }
        })
    }
    return (
        <>
            <Button className="absolute right-4 top-4 md:right-8 md:top-8" variant="link" asChild>
                <Link href="/login">
                    Log in
                </Link>
            </Button>

            <header className="mb-2xl text-center mt-10 p-4 space-y-2">
                <h1 className="text-[32px] font-extrabold leading-heading tracking-[-1px] lg:text-4xl lg:tracking-[-2px] mb-md">
                    Create an account
                </h1>
                <p className="text-concrete text-xl">
                    Start your journey with {process.env.NEXT_PUBLIC_WEBSITE_NAME}
                </p>
            </header>
            <main className="flex flex-col items-center justify-center w-full p-4 space-y-4">

                {!IsWaitingList ? <RegisterForm validateEmail={validateEmail} validateUsername={validateUsername} /> : <>
                    <div className="flex flex-col items-center justify-center space-x-2 gap-4">
                        <p className="text-lg text-accent-foreground font-medium mb-5">
                            Signup is currently by invitation only.
                        </p>


                        <Button size="lg" variant="default_light" asChild>
                            <Link href="/login">
                                Login to your account
                                <ArrowRight className="w-6 h-6 ml-2" />
                            </Link>
                        </Button>
                        <p>
                            or
                        </p>
                        <Button size="lg" asChild>
                            <Link href="/waitlist">
                                Join the waiting list
                                <ArrowRightToLine className="w-6 h-6 ml-2" />
                            </Link>
                        </Button>
                    </div>
                </>}

            </main>



        </>
    )
}


import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowRightToLine } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "src/lib/auth";
import { registerUser } from "./action";
import { RegisterForm } from './register-form';

export const metadata: Metadata = {
    title: "Signup | NexoNauts",
    description: "Register for an account on " + process.env.NEXT_PUBLIC_APP_NAME,
    keywords: "register, account, " + process.env.NEXT_PUBLIC_APP_NAME,
}


export default async function Page() {
    const session = await getSession();
    if (session) return redirect("/feed")

    const IsWaitingList = false;

    return (<>
        <Button className="absolute right-4 top-4 md:right-8 md:top-8" variant="link" asChild>
            <Link href="/login">
                Log in
            </Link>
        </Button>

       
        <main className="flex flex-col items-center justify-center w-full p-4 space-y-4">

            {!IsWaitingList ?
                <RegisterForm registerUser={registerUser} /> :
                <>
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

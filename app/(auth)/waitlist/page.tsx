
import { customAlphabet } from 'nanoid';

import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import Link from "next/link";
import dbConnect from "src/lib/dbConnect";
import User from "src/models/user";
import WaitListForm from "./form";

export const metadata: Metadata = {
    title: "Waitlist | NexoNauts",
    description: "Waitlist for an account on " + process.env.NEXT_PUBLIC_APP_NAME,
    keywords: "Waitlist, account, " + process.env.NEXT_PUBLIC_APP_NAME,
}

export const dynamic = 'force-dynamic';

export default async function Page() {

    async function joinWaitList(data: { name: string, email: string }): Promise<boolean> {
        "use server"

        await dbConnect();
        const existingUser = await User.findOne({ email: data.email.toLowerCase() });
        if (existingUser) {
            return Promise.reject("Email already exists");
        }
        const user = new User({
            name: data.name,
            email: data.email,
            username: customAlphabet("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz", 8)(),
            role: "waitlist",
            account_type: "free",
            verificationToken: null,
            password: customAlphabet("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz", 8)(),
            verified: false,
            providers: [],
            additional_info: {},
        });
        await user.save();

        return Promise.resolve(true)
    }

    return (
        <>
            <Button className="absolute right-4 top-4 md:right-8 md:top-8" variant="link" asChild>
                <Link href="/login">
                    Login
                </Link>
            </Button>
            <header className="flex flex-col space-y-2 text-center">
                <h1 className="text-2xl font-semibold tracking-tight">
                    Join {process.env.NEXT_PUBLIC_WEBSITE_NAME}
                </h1>
                <p className="text-sm text-muted-foreground">
                    It's quick and easy.
                </p>
            </header>
            <main className="flex flex-col items-center justify-center w-full p-4 space-y-4">

                <WaitListForm className="flex-auto w-full" key={"form"} joinWaitList={joinWaitList} />

            </main>

        </>
    )
}

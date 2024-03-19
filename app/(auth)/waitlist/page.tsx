
import { customAlphabet } from 'nanoid';
import { Metadata } from "next";

import dbConnect from "src/lib/dbConnect";
import User from "src/models/user";
import WaitListForm from "./form";

export const metadata: Metadata = {
    title: "Waitlist | NexoNauts",
    description: "Waitlist for an account on " + process.env.NEXT_PUBLIC_APP_NAME,
    keywords: "Waitlist, account, " + process.env.NEXT_PUBLIC_APP_NAME,
}


export default async function Page() {

    async function joinWaitList(data: {name:string,email: string}): Promise<boolean> {
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
            <header className="mb-2xl text-center mt-10 p-4 space-y-2">
                <h1 className="text-[32px] font-extrabold leading-heading tracking-[-1px] lg:text-4xl lg:tracking-[-2px] mb-md">
                    Join {process.env.NEXT_PUBLIC_WEBSITE_NAME}

                </h1>
                <p className="text-concrete text-xl">
                    It's quick and easy.
                </p>
            </header>
            <main className="flex flex-col items-center justify-center w-full p-4 space-y-4">

                <WaitListForm className="flex-auto w-full" key={"form"} joinWaitList={joinWaitList}/>

            </main>

        </>
    )
}

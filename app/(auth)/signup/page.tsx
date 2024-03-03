
import { authOptions } from "app/api/auth/[...nextauth]/options";
import { Metadata } from "next";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
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
    const session = await getServerSession(authOptions);
    if (session) return redirect("/feed")
    await dbConnect();

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

            <header className="mb-2xl text-center mt-10 p-4 space-y-2">
                <h1 className="text-[32px] font-extrabold leading-heading tracking-[-1px] lg:text-4xl lg:tracking-[-2px] mb-md">
                    Join {process.env.NEXT_PUBLIC_WEBSITE_NAME}
                </h1>
                <p className="text-concrete text-xl">
                    It's quick and easy.
                </p>
            </header>
            <main className="flex flex-col items-center justify-center w-full p-4 space-y-4">

            <RegisterForm validateEmail={validateEmail} validateUsername={validateUsername} />

            </main>



        </>
    )
}

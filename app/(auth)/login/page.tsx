
import { Metadata } from "next";
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
            <header className="mb-2xl text-center mt-10 p-4 space-y-2">
                <h1 className="text-[32px] font-extrabold leading-heading tracking-[-1px] lg:text-4xl lg:tracking-[-2px] mb-md">
                    Welcome Back

                </h1>
                <p className="text-concrete text-xl">
                    Log in to {process.env.NEXT_PUBLIC_WEBSITE_NAME}!
                </p>
            </header>
            <main className="flex flex-col items-center justify-center w-full p-4 space-y-4">

                <UserAuthForm className="flex-auto w-full" key={"form"} />

            </main>

        </>
    )
}

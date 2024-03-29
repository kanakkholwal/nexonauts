import { Metadata } from "next";
import { getSession } from "src/lib/auth";
import { UserAuthForm } from './verify-form';


export const metadata: Metadata = {
    title: "Verify Email | NexoNauts",
    description: "Login to an account on NexoNauts",
    keywords: "register, account, NexoNauts",
    publisher:"noindex, nofollow"
}


export default async function Page({ searchParams }: {
    searchParams: {
        token?: string
    };
}) {
    const session = await getSession();

    

    return (<UserAuthForm className="flex-auto w-full" key={"form"} loggedIn={!!session?.user}/>)
}

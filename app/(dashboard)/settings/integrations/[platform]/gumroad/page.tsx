import { Metadata } from "next";
import { saveAccessToken } from "./actions";
import Authorisor from "./authorisor";

export const metadata: Metadata = {
    title: "My Products",
    description: "My Products page"
}

interface Props {
    searchParams?: {
        code?: string;
        scope?: string;
    };
}
export default async function MyProducts({ searchParams }: Props) {

    const code = searchParams?.code as string;
    const scope = searchParams?.scope as string;


    


    return (<div className="space-y-6 p-10 mt-5">


    <Authorisor code={code} scope={scope} saveToken={saveAccessToken} />
    </div>)
}
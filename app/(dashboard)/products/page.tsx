import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "My Products",
    description: "My Products page"
}


export default async function MyProducts() {

    const getAuthorizeUrl = (scope: string) => {
        const GUMROAD_CLIENT_ID = process.env.NEXT_PUBLIC_GUMROAD_APP_ID;
        if (!GUMROAD_CLIENT_ID) {
            throw new Error("GUMROAD_CLIENT_ID is not set");
        }
        const redirect_uri = process.env.NEXT_PUBLIC_WEBSITE_URL + "/products/import-from-gumroad?scope=" + scope;
        // https://gumroad.com/oauth/authorize?client_id=CLIENT_ID&redirect_uri=REDIRECT_URI&scope=SCOPE
        const url = new URL("https://gumroad.com/oauth/authorize");
        url.searchParams.append("client_id", GUMROAD_CLIENT_ID);
        url.searchParams.append("scope", scope);
        url.searchParams.append("redirect_uri", redirect_uri);
        return url.toString();
    }


    return (<div className="space-y-6 p-10 pb-16 w-full bg-white dark:bg-slate-800 rounded-3xl mt-5">
        <Button asChild>
            <Link
                href={getAuthorizeUrl("edit_products")}>
                View & Edit Access
            </Link>
        </Button>
        <Button asChild>
            <Link
                href={getAuthorizeUrl("view_profile")}>
                View Only Access
            </Link>
        </Button>


    </div>)
}
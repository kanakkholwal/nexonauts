
import dbConnect from 'lib/dbConnect';
import { getAllApps } from "src/utils/app";

import { authOptions } from "app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";
import { SessionUserType } from "src/types/user";

import { AppPageUI } from "./ui";

export default async function AppsPage() {
    const session = await getServerSession(authOptions);

    await dbConnect();
    const { apps, popularApps } = await getAllApps();



    return (<div className="max-full grow">
        <h1 className="text-3xl font-bold">
            All Applications
        </h1>
        <p className="text-slate-500 mt-2 line-clamp-3">
            Find perfect apps for your needs
        </p>

        <AppPageUI
            apps={JSON.parse(JSON.stringify(apps)) || []} popularApps={JSON.parse(JSON.stringify(popularApps)) || []}
            user={session?.user as SessionUserType || null}
        />
    </div>)
}
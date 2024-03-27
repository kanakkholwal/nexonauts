import CreateProfile from "app/(dashboard)/components/create-profile";
import { authOptions } from "app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";
import { sessionType } from "src/types/session";

export default async function FeedPage() {
    const session = await getServerSession(authOptions) as sessionType;

    console.log(session);
    if (!session.user.profile) {
        return (<div className="space-y-6 my-5">
            <h2 className="text-3xl font-semibold">
                Your Feed
            </h2>
            <div className="flex justify-center items-center w-full">
                <CreateProfile />
            </div>
        </div>)
    }

    return (<div className="space-y-6 my-5">
        <h2 className="text-3xl font-semibold">
            Your Feed
        </h2>
        

    </div>)
}
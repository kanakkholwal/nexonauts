import { authOptions } from "app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";
import { sessionType } from "src/types/session";


export default async function DashboardPage() {
    const session = await getServerSession(authOptions) as sessionType;



    return (<div className="space-y-6 my-5">


    </div>)
}
import { authOptions } from "app/api/auth/[...nextauth]/options";
import AppBuilder from "layouts/apps/builder/index";
import { getServerSession } from "next-auth/next";

import dbConnect from "src/lib/dbConnect";
import AppModel from "src/models/app";
import { AppType } from "src/types/app";
import { sessionType } from "src/types/session";

export default async function EditApplicationPage({params}:{
    params: {
        slug: string
    }
}) {
    const session = await getServerSession(authOptions) as sessionType;

    await dbConnect();

    const app = await AppModel.findOne({
        appId: params.slug,
        developer: {
            userId: session.user._id
        }
    }).lean();
    console.log(app);



    return (
        <div>
            <AppBuilder user={session.user} app={JSON.parse(JSON.stringify(app)) as AppType} mode="edit"/>
        </div>
    );
}
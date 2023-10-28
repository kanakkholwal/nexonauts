import { getSession } from "next-auth/react";
import dbConnect from "src/lib/dbConnect";
import User from "src/models/user";
import { sessionType } from "src/types/session";
import { SessionUserType } from "src/types/user";
import { getAppsOfUser } from "src/utils/app";

export default function Developer({ clientUser, user }) {

    if (!clientUser) return null;
    return <h1>{clientUser.username}</h1>;
}


export async function getServerSideProps(context) {
    const session = await getSession(context) as sessionType | null;

    await dbConnect();
    const { username } = context.params;
    if (!username) return {
        notFound: true, 
        props: {
            clientUser: null,
            user: session?.user || null
        },
    };

    const user = await User.findOne({
        username: username,
        verified: true,
    }).select("-password -email -verified -verificationToken -role -__v");

    if (!user) return {
        notFound: true,
        props: {
            clientUser: null,
            user: session?.user || null
        },
    };
    const { apps } = await getAppsOfUser(user._id);
    user.apps = apps;


    return {
        props: {
            clientUser: JSON.parse(JSON.stringify(user ?? {})) ?? {},
            user: session?.user || null
        },
    };
}

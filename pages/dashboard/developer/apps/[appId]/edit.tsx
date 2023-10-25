import Layout from 'layouts/apps/layout';
import dbConnect from "lib/dbConnect";
import { GetSessionParams, getSession } from "next-auth/react";
import { NextSeo } from 'next-seo';
import AppBuilder from "pages/app-builder";
import { AppTypeViewOnly } from "src/types/app";
import { sessionType } from "src/types/session";
import { SessionUserType } from "src/types/user";
import { getAppOfUserByAPPID } from 'src/utils/app';

type PageProps = {
    user: SessionUserType
    app: AppTypeViewOnly
}
export default function Dashboard({ user, app }: PageProps) {

    console.log(app);


    return (<Layout user={user}>
        <NextSeo
            title={"Editing | " + app.name + " | Developer Dashboard"}
            description={app.description}
        />
        <div className="max-full grow">
            <h1 className="text-3xl font-bold">
                Edit :   {app.name}
            </h1>
            <p className="text-slate-500 mt-2 line-clamp-3">
                {app.description}
            </p>
            {app ? <AppBuilder user={user} app={app}  type="update"/> :null}



        </div>
    </Layout>)

}

export async function getServerSideProps(context: GetSessionParams & {
    params: {
        appId: string
    }
}) {


    const session = (await getSession(context)) as sessionType | null;

    if (!session)
        return {
            redirect: {
                destination: '/login',
                permanent: false
            }
        }
    const { appId } = context.params;

    await dbConnect();
    const { app } = await getAppOfUserByAPPID(session.user.id, appId);

    if (!app) {
        return {
            notFound: true
        }
    }
    // console.log(apps);




    return {
        props: {
            user: session.user,
            app: JSON.parse(JSON.stringify(app))
        }
    }







}
import AppBuilder from "layouts/apps/builder/index";
import Layout from 'layouts/apps/layout';
import dbConnect from "lib/dbConnect";
import { GetSessionParams, getSession } from "next-auth/react";
import { NextSeo } from 'next-seo';
import { AppType } from "src/types/app";
import { sessionType } from "src/types/session";
import { SessionUserType } from "src/types/user";
import { getAppOfUserByAPPID } from 'src/utils/app';

type PageProps = {
    user: SessionUserType
    app: AppType
}
export default function Dashboard({ user, app }: PageProps) {

    console.log(app);


    return (<Layout user={user}>
        <NextSeo
            title={"Editing | " + app.name + " | Developer Dashboard"}
            description={app.description}
        />
        <div className="max-full grow">
     
            {app ? <AppBuilder user={user} app={app} mode="edit" /> : <>
                Something went wrong
            </>}



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
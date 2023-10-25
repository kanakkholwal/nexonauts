import { buttonVariants } from "@/components/ui/button";
import Layout from 'layouts/apps/layout';
import dbConnect from "lib/dbConnect";
import { GetSessionParams, getSession } from "next-auth/react";
import { NextSeo } from 'next-seo';
import Link from "next/link";
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
            title={app.name + " | Developer Dashboard"}
            description={app.description}
        />
        <div className="max-full grow">
            <h1 className="text-3xl font-bold">
                {app.name}
            </h1>
            <p className="text-slate-500 mt-2 line-clamp-3">
                {app.description}
            </p>
            <section className="mt-8">
                <div className="flex  items-center justify-between w-full">
                    <h2 className="text-2xl font-bold">
                        App Usage Statistics
                    </h2>
                    <Link className={buttonVariants({ variant: "outline", size: "sm" })} href={`/dashboard/developer/apps/${app.appId}/edit`}>
                        Edit App
                    </Link>
                </div>
                <hr className="mt-5" />
                <div className="mt-5 w-full flex flex-col items-center justify-center p-5 gap-2">
                    <h2 className="text-2xl font-bold">
                        App Analytics
                    </h2>
                    <h3 className="text-sm font-bold text-muted-foreground">
                        Coming Soon
                    </h3>
                </div>
            </section>



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
import Layout from 'layouts/apps/layout';
import dbConnect from "lib/dbConnect";
import AppModel from "models/app";
import { GetSessionParams, getSession } from "next-auth/react";
import { sessionType } from "src/types/session";
import { SessionUserType } from 'src/types/user';
import { NextSeo } from 'next-seo';
import Link from 'next/link';
import TextInputToTextOutput from 'src/layouts/apps/view/text_input_to_text_output';
import { AppType } from 'src/types/app';

const AppView = ({ app, user }) => {
    if (app.type === "text_input_to_text_output") {
        return (<TextInputToTextOutput app={app} user={user} />)
    }
    return (<div>
        App Type : {app.type}
    </div>)
}


export default function App({ app,user }:{
    app:AppType,
    user:SessionUserType|null
}) {


    console.log(app);
    if (!app) return null;


    return (
        <Layout user={user}>
            <NextSeo
                title={app.name}
                description={app.shortDescription}
                canonical={`${process.env.NEXT_PUBLIC_WEBSITE_URL}${app.path}`}
                openGraph={{
                    url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}${app.path}`,
                    title: app.name,
                    description: app.shortDescription,
                    images: [
                        {
                            url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/images/logo.png`,
                            width: 800,
                            height: 600,
                            alt: app.name,
                        },
                    ],
                }}
            />
            <div className="max-w-5xl">
                    <h1 className="text-3xl font-bold">
                        {app.name}
                    </h1>
                    <p className="text-slate-500 mt-2 line-clamp-3">
                        {app.description}
                    </p>
                    <div className='mt-2 text-sm font-medium w-full rounded-lg text-slate-500 bg-slate-100 p-2'>
                        Created by <span className="text-accent-foreground font-semibold cursor-pointer hover:underline">{app.author.name}</span>
                        {" "} in <Link className="text-primary font-semibold px-2 py-1 rounded-md bg-primary/10 hover:bg-primary/20 capitalize ml-1" href={`/apps?category=${app.category}`}>{app.category.replaceAll("_"," ")}</Link>
                    </div>
                </div>
            <AppView app={app} user={user} />

        </Layout>
    )
}

export async function getServerSideProps(context: GetSessionParams & { params: { appPath: string } }) {
    const session = (await getSession(context)) as sessionType | null;


    const appPath = context.params.appPath;
    if (!appPath) {
        return {
            notFound: true,
        }
    }
    await dbConnect();
    const app = await AppModel.findOne({ path: "/apps/" + appPath });

    if (!app) {
        return {
            notFound: true,
        }
    }

    return {
        props: {
            app: JSON.parse(JSON.stringify(app)),
            user:session?.user || null
        }
    }
}
